import { REGISTER_PAGE } from '@/constants'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div className="bg-slate-100 max-w-2xl mx-auto">
      <div className="max-w-md text-center mx-auto py-10">
        <h1 className=" text-3xl text-[var(--primary-color)] font-semibold pb-10">Đăng nhập</h1>
        <div className="py-2 ">
          <input className="w-full border p-4 focus:border-black " type="email" placeholder="E-mail" />
        </div>
        <div className="py-2">
          <input className="w-full border p-4 focus:border-black" type="password" placeholder="Mật khẩu" />
        </div>
        <div className="text-start">
          <a href="#" className="hover:underline text-blue-950/80 text-sm">
            Quên mật khẩu
          </a>
        </div>
        <div className="border-2 border-[var(--primary-color)] my-5">
          <button className="text-white bg-[var(--primary-color)] w-full font-semibold py-5 hover:bg-white hover:text-[var(--primary-color)]">
            Đăng nhập
          </button>
        </div>

        <NavLink to={REGISTER_PAGE} className="text-blue-950/80 hover:underline">
          Đăng ký
        </NavLink>
      </div>
    </div>
  )
}

export default Login
