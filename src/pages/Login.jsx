import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  async function googleLogin(){
    await signInWithPopup(auth, provider)
    navigate('/browse')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">FoodConnectSU</h1>
        <p className="mb-6">Reduce campus food waste. Get real-time surplus posts.</p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded font-semibold" onClick={googleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
