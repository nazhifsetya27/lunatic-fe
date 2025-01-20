import { useCallback, useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DownloadCloud01, XClose } from '@untitled-ui/icons-react'
import io from 'socket.io-client'
// import { MyButton, MyDropzone, myToaster } from '@interstellar-component'
import { useElektronik } from '../context'
import { schemaImport } from '../schema'
import { checkErrorYup } from '../../../../services/Helper'
import MyButton from '../../../../components/Button/MyButton'
import MyDropzone from '../../../../components/Dropzone/MyDropzone'
import { myToaster } from '../../../../components/Toaster/MyToaster'

const baseURL = import.meta.env.VITE_API_SOCKET_URL

function ImportSlider() {
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(schemaImport) })

  const [socket, setSocket] = useState(null)

  const {
    handleCurrentSlider,
    importPartNumber,
    downloadTemplateImport,
    getPartNumbers,
  } = useElektronik()

  const [progressUpload, setProgressUpload] = useState(null)
  const [failedFile, setFailedFile] = useState()

  const onSubmit = useCallback(
    async (data) => {
      try {
        const res = await importPartNumber(data, {
          onUploadProgress: (progressEvent) => {
            setProgressUpload(progressEvent)
          },
        })

        setProgressUpload({ progress: 0, import: true })
        const socketOff = () => {
          socket.off(res?.data?.progress)
          socket.off(res?.data?.result)
          console.log('socket off')
        }
        let timeout = setTimeout(socketOff, 1 * 60 * 1000)
        socket.on(res?.data?.progress, (a) => {
          clearTimeout(timeout)
          timeout = setTimeout(socketOff, 1 * 60 * 1000)
          console.log(a)
          setProgressUpload({ progress: a.progress / 100, import: true })
        })
        socket.on(res?.data?.result, (b) => {
          console.log(b.result)
          setFailedFile(b?.result)
          setProgressUpload({ progress: 100, import: true })
          clearTimeout(timeout)
          socketOff()
          getPartNumbers()
          if (b?.result?.failed?.length === 0) {
            myToaster({
              status: 200,
              title: 'Your data has been successfully imported',
              message:
                'Your data has been imported and is now ready to be utilized',
            })
            handleCurrentSlider(null)
          }
        })
      } catch (error) {
        myToaster(error)
      }
    },
    [getPartNumbers, handleCurrentSlider, importPartNumber, socket]
  )

  useEffect(() => {
    const newSocket = io.connect(`${baseURL}/v1`, {
      path: '/warehouse-api/socket.io',
      transports: ['websocket'],
      upgrade: false,
    })
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <div className="flex h-screen w-[375px] flex-col gap-8">
      <header className="relative flex items-start gap-x-4 px-4 pt-6">
        <button
          onClick={() => handleCurrentSlider(null)}
          className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
        >
          <XClose className="size-6" stroke="currentColor" />
        </button>
        <div className="flex flex-col gap-4">
          <p className="text-xl-semibold text-gray-light/900">Import data</p>
          <MyButton
            onClick={downloadTemplateImport}
            type="submit"
            color="secondary"
            variant="outlined"
            size="md"
          >
            <div className="flex items-center gap-1">
              <DownloadCloud01
                className="size-5 text-gray-light/900"
                stroke="currentColor"
              />
              <span className="text-sm-semibold">Download template</span>
            </div>
          </MyButton>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form
            onSubmit={handleSubmit(onSubmit, checkErrorYup)}
            className="flex h-full flex-col gap-8"
          >
            <section className="flex flex-1 flex-col gap-6 px-4">
              <MyDropzone
                multiple={false}
                maxSize={209715200}
                accept={['.xlsx']}
                progressUpload={progressUpload}
                // onChange={(files) => {
                //   console.log(files)
                // }}
                // onDrop={(acceptedFiles, rejectedFiles, e) => {
                //   console.log(acceptedFiles, rejectedFiles, e)
                // }}
                // onDropRejected={(rejectedFiles, e) => {}}
                // eslint-disable-next-line no-unused-vars
                onDropAccepted={(acceptedFiles, handleDeleteFile) => {
                  const file = acceptedFiles?.find((item) => item)
                  setValue('partnumbers', file)
                }}
                failedFile={failedFile}
              />
            </section>
            <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
              <MyButton
                onClick={() => handleCurrentSlider(null)}
                type="reset"
                color="secondary"
                variant="outlined"
                size="md"
              >
                <span className="text-sm-semibold">Cancel</span>
              </MyButton>
              <MyButton
                disabled={!!progressUpload || isSubmitting}
                type="submit"
                color="primary"
                variant="filled"
                size="md"
              >
                <span className="text-sm-semibold">Submit</span>
              </MyButton>
            </footer>
          </form>
        </SimpleBar>
      </div>
    </div>
  )
}

export default ImportSlider
