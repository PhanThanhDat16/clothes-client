import { LOGIN_PAGE } from '@/constants'
import { NavLink } from 'react-router-dom'

const Register = () => {
  return (
    <div className="bg-slate-100 max-w-2xl mx-auto mt-5 mb-5">
      <div className="max-w-md text-center mx-auto py-10">
        <h1 className=" text-3xl text-[var(--primary-color)] font-semibold pb-10">Đăng ký</h1>
        <div className="py-2">
          <input className="w-full border-2 p-4 focus:border-black" type="text" placeholder="Họ & đệm" />
        </div>
        <div className="py-2">
          <input className="w-full border-2 p-4 focus:border-black" type="text" placeholder="Tên" />
        </div>
        <div className="py-2">
          <input className="w-full border-2 p-4 focus:border-black " type="email" placeholder="E-mail" />
        </div>
        <div className="py-2">
          <input className="w-full border-2 p-4 focus:border-black" type="password" placeholder="Mật khẩu" />
        </div>

        <div className=" border-2 border-[var(--primary-color)] my-5">
          <button className="text-white bg-[var(--primary-color)] w-full font-semibold py-5 hover:opacity-85">
            Tạo tài khoản
          </button>
        </div>

        <NavLink to={LOGIN_PAGE} className="text-[var(--primary-color)]/80 hover:underline">
          Đăng nhập
        </NavLink>
      </div>
    </div>
  )
}

export default Register
