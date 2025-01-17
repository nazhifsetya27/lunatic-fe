import { Link } from '@mui/material'
import {
  BlobProvider,
  Document,
  Image,
  Page,
  Text,
  View,
} from '@react-pdf/renderer'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export default function MyImageToPdf({
  children,
  isDownloaded = false,
  fileName = '',
  srcImages = [],
  data,
  ...props
}) {
  // console.log('src images: ', srcImages)
  // console.log(data)

  return (
    <BlobProvider document={<PdfDocument srcImages={srcImages} data={data} />}>
      {({ url }) => (
        <Link
          href={url}
          download={isDownloaded ? fileName : null}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </Link>
      )}
    </BlobProvider>
  )
}

function PdfDocument({ srcImages = [], data }) {
  // console.log('src images: ', srcImages)

  return (
    <Document>
      {srcImages.map((src, index) => (
        <Page key={src} size="A4" style={{ padding: '1cm' }}>
          <View
            style={{
              position: 'absolute',
              height: '1px',
              right: '1cm',
              left: '1cm',
              top: '1cm',
              backgroundColor: 'black',
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: '1px',
              right: '1cm',
              left: '1cm',
              bottom: '1cm',
              backgroundColor: 'black',
            }}
          />
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            style={{
              fontSize: '0.3cm',
              position: 'absolute',
              bottom: '0.5cm',
              right: '1.5cm',
            }}
          />
          <Text
            style={{
              fontSize: '1cm',
              marginBottom: '0.5cm',
              textAlign: 'center',
            }}
          >
            {data[index].asset?.name || 'No Name Provided'}
          </Text>
          <Image src={`${baseUrl}/${src}`} style={{ maxHeight: '90%' }} />
        </Page>
      ))}
    </Document>
  )
}
