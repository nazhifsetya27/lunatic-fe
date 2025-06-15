import React, { useEffect, useRef, useState } from 'react'
import {
  XClose,
  Copy03,
  Mail01,
  RefreshCcw01,
  RefreshCw05,
} from '@untitled-ui/icons-react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import $ from 'jquery'
import MyButton from '../../components/Button/MyButton'
import MyAsyncDropDown from '../../components/Autocomplete/MyAsyncDropdown'
import MyAvatar from '../../components/Avatar/MyAvatar'
import MySwicth from '../../components/Switch/MySwitch'
import { handleError, checkErrorYup } from '../../services/Helper'
import MyTooltip from '../../components/Tooltip/MyTooltip'
import { useApp } from '../../AppContext'
import MyTextField from '../../components/TextField/MyTextField'
import UserSchema from './Schema'
import { useUser } from './context'

function Modal() {
  const { user } = useApp()
  const formRef = useRef(null)
  const {
    handleCurrentSlider,
    currentSlider,
    updateUser,
    createUser,
    showUser,
    searchRole,
    unitList,
    // searchReportTo,
    generatePassword,
    createdPassword,
    copyToClipboard,
    searchReportTo,
    deleteUser,
    restoreUser,
    setInitialusername,
  } = useUser()

  const [clicked, setClicked] = useState(false)
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(UserSchema),
    // defaultValues: {
    //   login_access: true,
    // },
  })

  const { role, deleted_at, login_access, photo, unit_id, report_to } = watch()

  const onSubmit = handleSubmit(
    handleError(currentSlider.id ? updateUser : createUser, control),
    checkErrorYup
  )

  // const handleGeneratePassword = () => {
  //   generatePassword((field, value) => {
  //     setValue(field, value)
  //   })
  // }

  useEffect(() => {
    if (currentSlider.current === 'user' && !currentSlider.id) {
      // handleGeneratePassword()
      console.log('jalan')
    }
  }, [currentSlider])

  const [title, setTitle] = useState('Add user')
  const [deletedAtUser, setDeletedAtUser] = useState(null)

  useEffect(() => {
    // setValue('delete_photo', false)
    if (currentSlider.id) {
      showUser(currentSlider.id).then((data) => {
        setTitle(data.name)
        setValue('id', currentSlider.id)
        setValue('name', data.name)
        setValue('email', data.email)
        setValue('role', data.role)
        setValue('unit_id', data.unit)
        setDeletedAtUser(data.deleted_at)
      })
    }
  }, [currentSlider.id])

  useEffect(() => {
    // Scroll to the first error element upon submission
    if (Object.keys(errors).length > 0) {
      const errorElement = $(`[name="${Object.keys(errors)[0]}"]`)
      if (errorElement.length > 0) {
        errorElement
          ?.get(0)
          ?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }, [errors])

  return (
    <div className="flex h-screen w-[375px] flex-col gap-6">
      {/* Header */}
      <header className="relative flex items-start gap-x-4 px-4 pt-6">
        <button
          onClick={() => handleCurrentSlider(null)}
          className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
        >
          <XClose size={24} stroke="currentColor" />
        </button>
        <section className="flex w-[310px] flex-col gap-1">
          <p className="text-xl-semibold text-gray-light/900">{title}</p>
          <p className="text-sm-regular text-gray-light/600">
            {currentSlider.id
              ? 'Edit the information below.'
              : 'Please provide the details for a new user.'}
          </p>
        </section>
      </header>
      {/* end of header */}

      <div className="flex-1 overflow-hidden">
        <form className="flex h-full flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex-1 overflow-hidden">
            <SimpleBar forceVisible="y" style={{ height: '100%' }}>
              <div className="flex flex-1 flex-col gap-5 px-4">
                <hr className="border-gray-light/200" />

                {/* PERSONAL INFORMATION */}
                <div className="flex flex-col gap-5">
                  <section className="">
                    <p className="text-sm-semibold text-gray-light/700">
                      Personal information
                    </p>
                    <p className="text-sm-regular text-gray-light/600">
                      Please complete the user personal data.
                    </p>
                  </section>

                  {/* fullname */}
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm-medium text-gray-light/700"
                    >
                      Name*
                    </label>
                    <MyTextField
                      placeholder="Input name"
                      disabled={Boolean(deleted_at)}
                      name="name"
                      control={control}
                    />
                  </div>
                  {/* email */}
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm-medium text-gray-light/700"
                    >
                      Email*
                    </label>
                    <MyTextField
                      startAdornment={<Mail01 stroke="grey" />}
                      name="email"
                      trigger={trigger}
                      disabled={Boolean(deleted_at)}
                      control={control}
                      placeholder="Input email"
                    />
                  </div>
                  {/* role */}
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm-medium text-gray-light/700"
                    >
                      Role*
                    </label>
                    <MyAsyncDropDown
                      trigger={trigger}
                      disabled={Boolean(deleted_at)}
                      name="role"
                      placeholder="Select role"
                      control={control}
                      error={errors?.role?.message}
                      isOptionEqualToValue={(option, value) => option === value}
                      getOptionLabel={(e) => e}
                      value={role}
                      asyncFunction={searchRole}
                      onChange={(e, value) => {
                        setValue('role', value)
                      }}
                    />
                  </div>
                  {/* unit */}
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm-medium text-gray-light/700"
                    >
                      Unit*
                    </label>
                    <MyAsyncDropDown
                      trigger={trigger}
                      // disabled={!notification?.ticket_approaching_sla}
                      name="unit_id"
                      control={control}
                      error={errors?.unit_id?.message}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value?.id
                      }
                      getOptionLabel={(e) => e.name}
                      value={unit_id}
                      placeholder="Select unit"
                      asyncFunction={unitList}
                      onChange={(e, value) => {
                        setValue(`unit_id`, value)
                      }}
                    />
                  </div>
                </div>
                {/* END OF PERSONAL INFORMATION */}

                {/* <hr className="border-gray-light/200" /> */}

                {/* AVATAR PROFILE */}
                {/* <section className="">
                  <p className="text-sm-semibold text-gray-light/700">
                    Photo profile
                  </p>
                  <p className="text-sm-regular text-gray-light/600">
                    This will be displayed on user profile picture.
                  </p>
                </section> */}
                {/* <div className="flex flex-1 gap-0.5">
                  <label htmlFor="fileInput"></label>
                  <MyAvatar id={'newLogo'} size={64} photo={photo} />
                  <div className="flex flex-1 justify-end gap-4">
                    <MyButton
                      onClick={() => {
                        setValue('photo', null)
                        setValue('delete_photo', true)
                      }}
                      color={'gray'}
                      variant={'text'}
                      disabled={deleted_at}
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
                        setValue('photo', e.target.files[0])
                      }}
                      disabled={deleted_at}
                    />
                    <MyButton
                      color={'primary'}
                      variant={'text'}
                      disabled={deleted_at}
                    >
                      <label
                        htmlFor="photo"
                        className={`text-sm-semibold cursor-${
                          deleted_at ? 'not-allowed' : 'pointer'
                        }`}
                      >
                        Update
                      </label>
                    </MyButton>
                  </div>
                </div> */}
                {/* <hr className="border-gray-light/200" /> */}
                {/* END OF AVATAR PROFILE */}

                {/* <hr className="border-gray-light/200" /> */}

                <div className="flex flex-col gap-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm-medium text-gray-light/700"
                  >
                    Password*
                  </label>
                  <MyTextField
                    name="password"
                    // disabled={true}
                    // value={createdPassword}
                    control={control}
                  />
                </div>
              </div>
            </SimpleBar>
          </div>
          <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
            <div
              className={`flex-1 items-start ${
                currentSlider.id && !deletedAtUser ? '' : 'hidden'
              }`}
            >
              <MyButton
                // disabled={isSubmitting}
                onClick={() => deleteUser(currentSlider.id)}
                variant="text"
                size="md"
              >
                <p className="text-sm-semibold text-error/700">Delete</p>
              </MyButton>
            </div>
            <MyButton
              color="secondary"
              variant="outlined"
              size="md"
              onClick={() => handleCurrentSlider(null)}
            >
              <p className="text-sm-semibold">Close</p>
            </MyButton>
            {deletedAtUser ? (
              <MyButton
                onClick={(e) => {
                  e.stopPropagation()
                  restoreUser(currentSlider.id)
                }}
                type="reset"
                color="primary"
                variant="outlined"
                size="md"
              >
                <RefreshCcw01 size={20} stroke="currentColor" />
                <p className="text-sm-semibold">Restore</p>
              </MyButton>
            ) : (
              <MyButton
                type="submit"
                color="primary"
                variant="filled"
                size="md"
                disabled={isSubmitting}
              >
                <p className="text-sm-semibold">Submit</p>
              </MyButton>
            )}
          </footer>
        </form>
      </div>
    </div>
  )
}

export default Modal
