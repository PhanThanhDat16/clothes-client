import { useState } from 'react'
import messengerIcon from '@/assets/messenger.png'

const ModalChat = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed right-5 bottom-5 z-50">
        <button
          aria-expanded={open}
          aria-label={open ? 'Đóng chat' : 'Mở chat'}
          onClick={() => setOpen((s) => !s)}
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
                <div className="text-sm font-medium">Hỗ trợ trực tuyến</div>
                <div className="text-xs text-gray-500"> Thông thường trả lời trong vài phút</div>
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
            {/* Placeholder messages */}
            <div className="space-y-3">
              <div className="text-xs text-gray-500">Bắt đầu trò chuyện với chúng tôi</div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[80%]">Xin chào! Tôi có thể giúp gì cho bạn?</div>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // TODO: xử lý gửi tin nhắn
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalChat
