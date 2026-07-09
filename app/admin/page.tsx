'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function AdminPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  useEffect(() => {
    // Get the current domain
    const currentUrl = window.location.origin
    setQrCodeUrl(currentUrl)

    // Generate QR code
    QRCode.toDataURL(currentUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1e1b4b',
        light: '#FFFFFF'
      }
    }).then(setQrCodeDataUrl)
  }, [])

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>R.I.S.E. Program — Badge QR</h1>
        <p>QR code linking to the interactive scientific agenda</p>
      </div>

      <div className="qr-section">
        <h2>QR Code for Badges</h2>
        <p>Use this QR code on the event badges. It always points to the live agenda on this domain.</p>

        {qrCodeDataUrl && (
          <div className="qr-code">
            <img src={qrCodeDataUrl} alt="QR Code" />
          </div>
        )}

        <div className="qr-url">
          <strong>URL:</strong> {qrCodeUrl}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3>How to update the agenda:</h3>
          <ol style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>Edit <code>app/agenda/data.ts</code> with the updated program</li>
            <li>Commit, push, and Vercel redeploys automatically</li>
            <li>No need to reprint badges — the QR code stays the same!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
