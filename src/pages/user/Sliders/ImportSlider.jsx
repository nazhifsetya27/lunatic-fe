// Libraries
import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import Papa from 'papaparse'

// UI Icons
import { DownloadCloud01, XClose } from '@untitled-ui/icons-react'

// Shared Components
import MyDropzone from '../../../components/Dropzone/MyDropzone'

// Context

//schema
import { ImportValidator } from '../Schema'
// import { socket } from "../../../../services/NetworkUtils";
import { myToaster } from '../../../components/Toaster/MyToaster'
import socketio from 'socket.io-client'
import { useUser } from '../context'
import MyButton from '../../../components/Button/MyButton'

const baseURL = process.env.REACT_APP_SOCKET_HOST

const ImportSlider = () => {
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(ImportValidator) })

  const [socket, setSocket] = useState(null)

  const { handleCurrentSlider, downloadTemplateImport, importUser, getUsers } =
    useUser()
  const [progressUpload, setProgressUpload] = useState(null)
  const [failedFile, setFailedFile] = useState()

  const onSubmit = handleSubmit(async (data) => {
    await importUser(data, {
      onUploadProgress: (progressEvent) => {
        setProgressUpload(progressEvent)
      },
    })
      .then((res) => {
        setProgressUpload({ progress: 0, import: true })
        const socketOff = () => {
          socket.off(res?.data?.progress)
          socket.off(res?.data?.result)
          console.log('socket off')
        }
        var timeout = setTimeout(socketOff, 1 * 60 * 1000)
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
          getUsers()
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
      })
      .then()
      .catch(myToaster)
  })
  const handleDownload = async () => {
    const url = downloadTemplateImport()
    window.open(url, '_blank').focus()
  }
  useEffect(() => {
    const socket = socketio.connect(baseURL + '/v1', {
      path: '/backoffice-api/socket.io',
      upgrade: false,
    })
    setSocket(socket)
    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <div className="flex h-screen w-[375px] flex-col gap-8">
      <header className="relative flex items-start gap-x-4 px-4 pt-6">
        <button
          onClick={() => handleCurrentSlider(null)}
          className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
        >
          <XClose size={24} stroke={'currentColor'} />
        </button>
        <div className="flex flex-col gap-4">
          <p className="text-xl-semibold text-gray-light/900">Import data</p>
          <MyButton
            onClick={handleDownload}
            type={'submit'}
            color={'secondary'}
            variant={'outlined'}
            size={'md'}
          >
            <div className="flex items-center gap-1">
              <DownloadCloud01
                className={'text-gray-light/900'}
                size={24}
                stroke={'currentColor'}
              />
              <p className="text-sm-semibold">Download template</p>
            </div>
          </MyButton>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-8">
            <section className="flex flex-1 flex-col gap-6 px-4">
              <MyDropzone
                multiple={false}
                maxSize={209715200}
                accept={['.xlsx']}
                onChange={(files) => {
                  console.log(files)
                }}
                progressUpload={progressUpload}
                onDrop={(acceptedFiles, rejectedFiles, e) => {
                  console.log(acceptedFiles, rejectedFiles, e)
                }}
                onDropAccepted={(acceptedFiles, handleDeleteFile) => {
                  setValue('users', acceptedFiles)
                }}
                onDropRejected={(rejectedFiles, e) => {}}
                failedFile={failedFile}
              ></MyDropzone>
            </section>
            <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
              <MyButton
                onClick={() => handleCurrentSlider(null)}
                type={'reset'}
                color={'secondary'}
                variant={'outlined'}
                size={'md'}
              >
                <p className="text-sm-semibold">Cancel</p>
              </MyButton>
              <MyButton
                disabled={
                  (progressUpload?.progress * 100 >= 0 &&
                    progressUpload?.progress * 100 < 100) ||
                  isSubmitting
                }
                type={'submit'}
                color={'primary'}
                variant={'filled'}
                size={'md'}
              >
                <p className="text-sm-semibold">Submit</p>
              </MyButton>
            </footer>
          </form>
        </SimpleBar>
      </div>
    </div>
  )
}

export default ImportSlider
