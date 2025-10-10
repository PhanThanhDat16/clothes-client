import { useState, useEffect } from 'react'
import messengerIcon from '@/assets/messenger.png'
import { useAuthStore } from '@/store/authStore'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { createConversation, getCheckConversationByUser } from '@/apis/conversation'
import { createMessage, getMessageConversation } from '@/apis/message'
import { IMessage } from '@/models/message'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PAGE } from '@/constants'

const ModalChat = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [currentRoom, setCurrentRoom] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

  const { socket } = useStoreSocketIO()
  const { user, fetchUser } = useAuthStore((state) => state)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  // Load messages của room
  const loadRoomMessages = async (conversationId: string) => {
    try {
      const res = await getMessageConversation(conversationId)
      setMessages(res.data || [])
    } catch (err) {
      console.error('loadRoomMessages error:', err)
    }
  }

  const handleStartNewChat = async () => {
    if (!user) {
      navigate(LOGIN_PAGE)
      return
    }
    try {
      const res = await createConversation(user._id)
      const conversation = res.data
      setCurrentRoom(conversation)
      if (socket) {
        socket.emit('join-conversation', { conversationId: conversation._id })
      }
      await loadRoomMessages(conversation._id)
    } catch (err) {
      console.error('handleStartNewChat error:', err)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentRoom) return

    const newMsg = {
      conversationId: currentRoom._id,
      content: message.trim(),
      senderId: user?._id,
      receiverId: currentRoom.userId // giống admin
    }

    try {
      setSending(true)
      await createMessage(newMsg as IMessage)

      // Emit socket
      if (socket) {
        socket.emit('send-message', newMsg)
      }

      setMessage('')
      // gọi lại API để cập nhật messages =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> xử lý khúc load message ni lại đi công
      await loadRoomMessages(currentRoom._id)
    } catch (err) {
      console.error('handleSendMessage error:', err)
    } finally {
      setSending(false)
    }
  }

  const handleCheckConversationUser = async () => {
    try {
      if (user?._id) {
        const res = await getCheckConversationByUser(user?._id as string)
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

  useEffect(() => {
    if (open) {
      handleCheckConversationUser()
    }
  }, [open])

  useEffect(() => {
    if (socket) {
      socket.on('send-message', (data) => {
        console.log('new message from socket:', data)
        if (currentRoom?._id) {
          loadRoomMessages(currentRoom._id)
        }
      })

      if (currentRoom) {
        socket.emit('join-conversation', { conversationId: currentRoom._id })
      }
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
            {messages.length > 0 ? (
              messages.map((msg) => {
                const userId = user?._id
                const getId = (id: any) => (typeof id === 'string' ? id : id?._id)
                const isMine = getId(msg.senderId) === userId
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
            ) : !currentRoom ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="text-center text-sm text-gray-500">Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</div>
                <button
                  onClick={handleStartNewChat}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Bắt đầu trò chuyện
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="text-center text-sm text-gray-500">Chưa có tin nhắn nào trong phòng chat này.</div>
              </div>
            )}
          </div>

          {currentRoom && (
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
