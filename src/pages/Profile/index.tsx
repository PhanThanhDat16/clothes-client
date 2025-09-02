import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    // Chuyển hướng về login
    navigate('/login')
  }

  return (
    <div className="p-4">
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Đăng xuất
      </button>
    </div>
  )
}

export default Profile
