import { useEffect, useState } from 'react'
import { Mail01 } from '@untitled-ui/icons-react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileSchema } from './schema'
import { useProfile } from './context'
import { handleError, checkErrorYup } from '../../services/Helper'
import Password from './components/Password'
import MyButton from '../../components/Button/MyButton'
import MyTextField from '../../components/TextField/MyTextField'
import MyAvatar from '../../components/Avatar/MyAvatar'
import { WhatsApp } from '../../components/Icon/MediaSosial'
import { myToaster } from '../../components/Toaster/MyToaster'

function Profile() {
  const { getProfile, updateProfile } = useProfile()
  const mediaUrl = import.meta.env.VITE_API_MEDIA_URL

  const [initialValues, setInitialValues] = useState({
    name: '',
    username: '',
    email: '',
    whatsapp: '',
    photo: '',
    role: '',
  })

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  })

  const { photo, name } = watch()
  const [role, setRole] = useState(null)

  console.log('photo', photo)

  const onSubmit = handleSubmit(
    handleError(updateProfile, control),
    checkErrorYup
  )

  useEffect(() => {
    getProfile().then((data) => {
      setInitialValues({
        name: data?.name ?? '',
        email: data?.email ?? '',
        photo: data?.photo_url ?? '',
        role: data?.role ?? '',
      })
      setValue('name', data?.name)
      setValue('email', data?.email)
      setValue('photo', data?.photo_url ? `${mediaUrl}${data?.photo_url}` : '')
      setValue('role', data?.role)
      setRole(data?.role)
    })
  }, [])

  const handleCancel = () => {
    Object.keys(initialValues).forEach((key) => {
      setValue(key, initialValues[key])
    })
  }

  return (
    <SimpleBar forceVisible="y" style={{ height: '100%' }}>
      <div className="relative -top-28 mb-12 bg-brand/600">
        <div className="relative top-28 mx-10 mt-20 flex gap-6 max-sm:flex-col max-sm:items-center">
          <div className="rounded-full p-1 ring-4 ring-inset ring-white max-sm:ring-transparent">
            <MyAvatar size={160} iconSize={10} photo={photo} />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg-semibold mt-10 text-gray-light/900">
              {name ?? ''}
            </p>
            <p className="text-sm-regular">{role ?? ''}</p>
          </div>
        </div>
        <hr className="h-3 border-t-0 bg-brand/900" />
      </div>

      <div className="px-8">
        <form className="flex gap-8 max-sm:flex-col" onSubmit={onSubmit}>
          <div className="w-[340px]">
            <p className="text-md-semibold">Personal Info</p>
            <p className="text-sm-regular">
              Update your photo and personal details.
            </p>
          </div>
          <div className="flex w-full flex-col rounded-xl border-2">
            <div className="flex flex-col gap-y-6 border-b-2 p-6">
              <div>
                {/* username */}
                <label
                  htmlFor="username"
                  className="text-sm-medium text-gray-light/700"
                >
                  Name
                </label>
                <MyTextField
                  name="name"
                  control={control}
                  errors={errors?.name}
                />
              </div>
              <div>
                {/* name */}
                <label
                  htmlFor="role"
                  className="text-sm-medium text-gray-light/700"
                >
                  Role
                </label>
                <MyTextField
                  name="role"
                  control={control}
                  errors={errors?.role}
                  disabled
                />
              </div>

              <div>
                {/* email */}
                <label
                  htmlFor="email"
                  className="text-sm-medium text-gray-light/700"
                >
                  Email address
                </label>
                <MyTextField
                  name="email"
                  trigger={trigger}
                  control={control}
                  errors={errors?.email}
                  startAdornment={<Mail01 stroke="grey" />}
                />
              </div>

              <div className="flex flex-1 items-end">
                <label htmlFor="fileInput" />
                <MyAvatar id="newLogo" size={64} photo={photo} />
                <div className="ml-5 flex flex-1 justify-start gap-5">
                  <MyButton
                    color="gray"
                    variant="text"
                    onClick={() => {
                      setValue('photo', null)
                      setValue('delete_photo', true)
                    }}
                  >
                    <p className="text-sm-semibold">Delete</p>
                  </MyButton>
                  <input
                    accept=".png,.jpeg,.jpg"
                    id="photo"
                    type="file"
                    className="hidden"
                    multiple={false}
                    onChange={(e) => {
                      const file = e.target.files[0]
                      const maxSize = 5 * 1024 * 1024 // 5MB in bytes

                      if (file && file.size > maxSize) {
                        // alert(
                        //   'File size exceeds 5MB. Please upload a smaller file.'
                        // )
                        myToaster({
                          status: 500,
                          title: 'Error upload image',
                          message:
                            'File size exceeds 5MB. Please upload a smaller file.',
                        })
                        e.target.value = '' // Clear the input
                        return
                      }

                      setValue('photo', file)
                    }}
                  />
                  <MyButton
                    color="primary"
                    variant="text"
                    onClick={() => {
                      setValue('delete_photo', false)
                    }}
                  >
                    <label
                      htmlFor="photo"
                      className="text-sm-semibold hover:cursor-pointer"
                    >
                      Update
                    </label>
                  </MyButton>
                </div>
              </div>
            </div>

            <footer className="flex justify-end gap-3 px-6 py-4">
              <MyButton
                color="secondary"
                variant="outlined"
                size="sm"
                onClick={handleCancel}
              >
                <p className="text-sm-semibold">Cancel</p>
              </MyButton>
              <MyButton
                color="primary"
                variant="filled"
                size="sm"
                type="submit"
                disabled={isSubmitting}
              >
                <p className="text-sm-semibold">Save changes</p>
              </MyButton>
            </footer>
          </div>
        </form>

        {/* <hr className="my-5" />
        <Password /> */}
      </div>
    </SimpleBar>
  )
}

export default Profile
