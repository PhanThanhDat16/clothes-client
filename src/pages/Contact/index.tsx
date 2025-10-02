import zaloIcon from '@/assets/zalo.png'
import messengerIcon from '@/assets/messenger.png'
import contactIcon from '@/assets/contact.png'

const Contact = () => {
  return (
    <div className="w-[90%] max-w-[var(--max-width)] mx-auto">
      <div className="flex gap-10 my-20">
        <div className="w-[40%] text-[var(--primary-color)] font-semibold">
          <h2 className="text-3xl pb-8">Bạn cần hỗ trợ điều gì?</h2>
          <p className="">
            Bạn có câu hỏi về sản phẩm, đơn hàng hoặc chính sách đổi trả? Hãy để lại tin nhắn, chúng tôi sẽ hỗ trợ bạn
            nhanh nhất có thể!
          </p>
        </div>
        <div className="w-[60%]">
          <div className="bg-slate-50 p-12">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Tên" className="border p-4" />
              <input type="email" placeholder="Email" className="border p-4" />
              <input type="text" placeholder="Tin nhắn" className="col-span-2 border p-4" />
            </div>
            <button className="bg-[var(--primary-color)] font-semibold text-white mt-4 hover:bg-white hover:text-[var(--primary-color)]">
              <div className="border-2 border-blue-950 py-4 px-8">Gửi tin nhắn</div>
            </button>
          </div>

          <div className="text-center">
            <div className=" text-[var(--primary-color)] text-xl my-3">Hoặc liên hệ ngay</div>
            <div className="flex justify-center">
              <button>
                <img src={zaloIcon} alt="Zalo" className="w-8 rounded-full" />
              </button>
              <button className="mx-3">
                <img src={messengerIcon} alt="Zalo" className="w-8" />
              </button>
              <button>
                <img src={contactIcon} alt="Zalo" className="w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
