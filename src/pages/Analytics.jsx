import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { db } from '../services/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Analytics(){
  const [stats, setStats] = useState({ total:0, available:0, collected:0, donated:0 })
  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'foodPosts'), snap => {
      const all = snap.docs.map(d => d.data())
      const total = all.length
      const available = all.filter(x=>x.status==='available').length
      const collected = all.filter(x=>x.status==='collected').length
      const donated = all.filter(x=>x.status==='donated').length
      setStats({ total, available, collected, donated })
    })
    return ()=>unsub()
  },[])
  return (<>
    <Navbar />
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-orange-600">Impact Overview</h2>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Total Posts" value={stats.total} />
        <Stat label="Available" value={stats.available} />
        <Stat label="Collected" value={stats.collected} />
        <Stat label="Donated" value={stats.donated} />
      </div>
    </div>
  </>)
}
function Stat({label, value}){
  return (
    <div className="bg-white text-black rounded shadow p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}
