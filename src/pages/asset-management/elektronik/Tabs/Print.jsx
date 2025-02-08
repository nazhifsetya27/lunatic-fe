import React, { useRef } from 'react'
import SimpleBar from 'simplebar-react'
import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas'
import MyTextField from '../../../../components/TextField/MyTextField'
import MyButton from '../../../../components/Button/MyButton'

const baseUrl = import.meta.env.VITE_API_BARCODE_URL

function Print({ print }) {
  const qrStickerRef = useRef()

  const handleDownloadSticker = async () => {
    const element = qrStickerRef.current

    // Use html2canvas to capture the sticker at high resolution
    const canvas = await html2canvas(element, {
      scale: 4, // Scale for HD quality
      useCORS: true, // Enable cross-origin images
      backgroundColor: '#FFFFFF', // Ensure a white background
    })

    // Convert canvas to PNG
    const pngFile = canvas.toDataURL('image/png')

    // Trigger download
    const link = document.createElement('a')
    link.href = pngFile
    link.download = print?.printCode
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  console.log(`${baseUrl}/login?isScan=true&asset_id=${print?.assetId}`)

  return (
    <div className="flex-1 overflow-hidden">
      <SimpleBar forceVisible="y" style={{ height: '100%' }}>
        <div className="flex flex-1 flex-col gap-8 pb-8 pt-4">
          <div className="flex flex-col gap-6">
            <div className="flex-col px-4">
              <p className="text-sm-semibold text-gray-light/700">
                Print information
              </p>
              <p className="text-sm-regular text-gray-light/600">
                Detail print information.
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center gap-6 px-3">
              {/* <div className="flex flex-col gap-1">
                <p className="text-sm-semibold text-gray-light/700">
                  Naming convention:
                </p>
                <MyTextField
                  name="print"
                  value="nomor id/kode excomp/kode gedung/kode lantai/kode ruangan/UNIT/EXCOMP/2024"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm-semibold text-gray-light/700">
                  Print code
                </p>
                <MyTextField name="print" value={print} disabled />
              </div> */}

              {/* Sticker Section */}
              <div
                ref={qrStickerRef}
                style={{
                  width: '350px',
                  height: '300x',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                }}
              >
                {/* Text Above QR
                <p
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                  }}
                >
                  Scan Me!
                </p> */}

                {/* QR Code */}
                <QRCode
                  value={`${baseUrl}/login?isScan=true&asset_id=${print?.assetId}`}
                  size={150}
                />

                {/* Text Below QR */}
                <p
                  style={{
                    fontSize: '14px',
                    marginTop: '20px',
                    textAlign: 'center',
                    // wordBreak: 'break-word',
                  }}
                >
                  {print?.printCode}
                </p>
              </div>

              <MyButton
                variant="filled"
                color="primary"
                size="sm"
                onClick={handleDownloadSticker}
              >
                Download QR code
              </MyButton>
            </div>
          </div>
        </div>
      </SimpleBar>
    </div>
  )
}

export default Print
