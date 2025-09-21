import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import messengerIcon from '@/assets/messenger.png'
import { useAuthStore, useChatStore } from '@/store'
import { LOGIN_PAGE } from '@/constants'

const ModalChat = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const { user, fetchUser } = useAuthStore()
  const {
    currentRoom,
    messages,
    isLoading,
    isCreatingRoom,
    isSendingMessage,
    checkExistingRoom,
    createNewRoom,
    loadRoomMessages,
    sendNewMessage
  } = useChatStore()

  // Check authen when component mounts
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  // Check existing room when user is authenticated and modal opens
  useEffect(() => {
    if (user && open && !currentRoom) {
      checkExistingRoom(user.data._id)
    }
  }, [user, open, currentRoom, checkExistingRoom])

  // load tn khi room hiện tại thay đổi
  useEffect(() => {
    if (currentRoom) {
      loadRoomMessages(currentRoom._id)
    }
  }, [currentRoom, loadRoomMessages])

  const handleOpenChat = () => {
    setOpen(true)
  }

  const handleStartNewChat = async () => {
    if (!user) {
      // chuyển trang login nếu user = null
      navigate(LOGIN_PAGE)
      return
    }
    await createNewRoom(user.data._id)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentRoom || isSendingMessage) return

    await sendNewMessage(currentRoom._id, message.trim())
    setMessage('')
  }

  return (
    <>
      <div className="fixed right-5 bottom-5 z-50">
        <button
          aria-expanded={open}
          aria-label={open ? 'Đóng chat' : 'Mở chat'}
          onClick={handleOpenChat}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white ring-1 ring-gray-200 hover:scale-105 transition-transform"
        >
          <img src={messengerIcon} alt="Messenger" className="w-6 h-6" />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
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
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <img src={messengerIcon} alt="Messenger" className="w-8 h-8" />
              <div>
                <div className="text-sm font-medium">
                  {currentRoom ? `Phòng chat #${currentRoom._id.slice(-6)}` : 'Hỗ trợ trực tuyến'}
                </div>
                <div className="text-xs text-gray-500">
                  {currentRoom
                    ? currentRoom.status === 'waiting'
                      ? 'Chờ phản hồi'
                      : currentRoom.status === 'active'
                        ? 'Đang hoạt động'
                        : 'Đã đóng'
                    : 'Thông thường trả lời trong vài phút'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Đóng">
                ✕
              </button>
            </div>
          </div>

          {/* Chat body */}
          <div className="flex-1 p-4 overflow-y-auto">
            {!currentRoom ? (
              // No room selected - show room list or start new chat
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-4">
                    {isLoading
                      ? 'Đang kiểm tra cuộc trò chuyện...'
                      : isCreatingRoom
                        ? 'Đang tạo cuộc trò chuyện...'
                        : !user
                          ? 'Chào mừng đến với hỗ trợ trực tuyến'
                          : 'Chào mừng đến với hỗ trợ trực tuyến'}
                  </div>

                  {!user && (
                    <div className="text-xs text-gray-500 mb-4">
                      Vui lòng đăng nhập để có thể trò chuyện với chúng tôi
                    </div>
                  )}

                  {!isLoading && !isCreatingRoom && (
                    <button
                      onClick={handleStartNewChat}
                      className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      {!user ? 'Đăng nhập để bắt đầu trò chuyện' : 'Bắt đầu trò chuyện'}
                    </button>
                  )}

                  {(isLoading || isCreatingRoom) && (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Room selected - show messages
              <div className="space-y-3">
                {isLoading ? (
                  <div className="text-center text-sm text-gray-500">Đang tải tin nhắn...</div>
                ) : messages.length > 0 ? (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg ${
                          msg.senderType === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="text-sm">{msg.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500">Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          {currentRoom && (
            <div className="p-3 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  disabled={isSendingMessage}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSendingMessage || !message.trim()}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingMessage ? 'Đang gửi...' : 'Gửi'}
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
