import QRCode from 'qrcode.react'
export default function QR({ value, size = 164 }) {
  return <div className="bg-white p-3 rounded shadow inline-block"><QRCode value={value} size={size} /></div>
}
