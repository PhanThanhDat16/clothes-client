import { useState, useEffect, useCallback } from 'react'
import messengerIcon from '@/assets/messenger.png'
import { useAuthStore } from '@/store/authStore'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { getCheckConversationByUser, createConversation } from '@/apis/conversation'
import { createMessage, getMessageConversation } from '@/apis/message'
import { IMessage } from '@/models/message'

// Types
import type { IConversationMessage } from '@/models/conversation'
import type { IConversation } from '@/models/conversation'

const ModalChat = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [currentRoom, setCurrentRoom] = useState<IConversation | null>(null)
  const [messages, setMessages] = useState<IConversationMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [checkingConversation, setCheckingConversation] = useState(false)

  const { socket } = useStoreSocketIO()
  const { user, fetchUser } = useAuthStore((state) => state)

  // load user khi mở chat
  useEffect(() => {
    if (open) fetchUser()
  }, [open])

  // Load messages của room
  const loadRoomMessages = useCallback(async (conversationId: string) => {
    setLoading(true)
    try {
      const res = await getMessageConversation(conversationId)
      setMessages(res.data || [])
    } catch (err) {
      console.error('loadRoomMessages error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentRoom) return

    const newMsg: IMessage = {
      conversationId: currentRoom._id,
      content: message.trim(),
      senderId: user?.data._id ?? '',
      receiverId: currentRoom.userId
    }

    try {
      setSending(true)

      // Gửi API
      const res = await createMessage(newMsg)
      const savedMsg = res.data ?? newMsg // ưu tiên dữ liệu server trả về

      // Emit qua socket
      socket?.emit('send-message', savedMsg)

      // Append trực tiếp vào state
      setMessages((prev) => [...prev, savedMsg])
      await loadRoomMessages(currentRoom._id)
      // Clear input
      setMessage('')
    } catch (err) {
      console.error('handleSendMessage error:', err)
    } finally {
      setSending(false)
    }
  }

  const handleCheckConversationUser = async () => {
    try {
      if (user?.data._id) {
        const res = await getCheckConversationByUser(user?.data._id as string)
        const conversation = res.data
        if (conversation) {
          setCurrentRoom(conversation)
          await loadRoomMessages(conversation._id)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateConversation = async () => {
    if (!user?.data._id) return
    setCheckingConversation(true)
    try {
      const res = await createConversation(user.data._id)
      if (res.data) {
        setCurrentRoom(res.data)
        await loadRoomMessages(res.data._id)
      }
    } catch (error) {
      console.error('handleCreateConversation error:', error)
    } finally {
      setCheckingConversation(false)
    }
  }

  useEffect(() => {
    if (open) {
      handleCheckConversationUser()
    }
  }, [open])

  useEffect(() => {
    if (!socket) return
    const onMessage = (data: IConversationMessage) => {
      if (currentRoom?._id === data.conversationId) {
        setMessages((prev) => [...prev, data])
      }
    }
    socket.on('send-message', onMessage)
    if (currentRoom) {
      socket.emit('join-conversation', { conversationId: currentRoom._id })
    }
    return () => {
      socket.off('send-message', onMessage)
    }
  }, [socket, currentRoom])

  return (
    <>
      <div className="fixed right-5 bottom-5 z-50">
        <button
          aria-expanded={open}
          aria-label={open ? 'Đóng chat' : 'Mở chat'}
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white ring-1 ring-gray-200 hover:scale-105 transition-transform"
        >
          <img src={messengerIcon} alt="Messenger" className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Chat Box */}
      <div
        className={`fixed right-6 bottom-20 z-50 transform transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        style={{ width: 400, height: 600 }}
        role="dialog"
        aria-modal="true"
        aria-label="Chat box"
      >
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-gray-200">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <img src={messengerIcon} alt="Messenger" className="w-8 h-8" />
              <div>
                <div className="text-sm font-medium">
                  {currentRoom ? `Phòng chat #${currentRoom._id.slice(-6)}` : 'Hỗ trợ trực tuyến'}
                </div>
                <div className="text-xs text-gray-500">
                  {currentRoom ? 'Đang hoạt động' : 'Thông thường trả lời trong vài phút'}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Đóng">
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {!user?.data._id ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-4 text-gray-500">Bạn cần đăng nhập để bắt đầu trò chuyện.</div>
                <button
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => {
                    window.location.href = '/login'
                  }}
                >
                  Đăng nhập để bắt đầu
                </button>
              </div>
            ) : !currentRoom ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-4 text-gray-500">Bấm để bắt đầu cuộc trò chuyện mới với admin.</div>
                <button
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={handleCreateConversation}
                  disabled={checkingConversation}
                >
                  {checkingConversation ? 'Đang tạo...' : 'Bắt đầu trò chuyện'}
                </button>
              </div>
            ) : loading ? (
              <div className="text-center text-sm text-gray-500">Đang tải tin nhắn...</div>
            ) : messages.length > 0 ? (
              messages.map((msg) => {
                let senderId: string = ''
                if (typeof msg.senderId === 'string') {
                  senderId = msg.senderId
                } else if (msg.senderId && typeof msg.senderId === 'object' && '_id' in msg.senderId) {
                  senderId = (msg.senderId as any)._id
                }
                const isMine = senderId === user?.data._id
                return (
                  <div key={msg._id} className={`flex mb-3 ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg ${
                        isMine ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="text-sm">{msg.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center text-sm text-gray-500">Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</div>
            )}
          </div>

          {currentRoom && user?.data._id && (
            <div className="p-3 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  disabled={sending}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Đang gửi...' : 'Gửi'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ModalChat
