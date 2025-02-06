/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { Eye, EyeOff } from '@untitled-ui/icons-react'
import { useLogin } from './context'
import { LoginSchema } from './schema'
import mainLogo from './assets/Image.png'
import PLNLogo from './assets/logo_PLN.svg'
import heroLogin from './assets/heroLogin.png'
import { handleError, checkErrorYup } from '../../services/Helper'
import MyTextField from '../../components/TextField/MyTextField'
import MyCheckbox from '../../components/Checkbox/MyCheckbox'
import MyButton from '../../components/Button/MyButton'

function Login() {
  const { login } = useLogin()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()

  const isScan = searchParams.get('isScan')
  const assetId = searchParams.get('asset_id')

  useEffect(() => {
    if (isScan === 'true' && assetId) {
      console.log('Processing scan:', { isScan, assetId })

      // Handle the query parameters logic here
      // when user login from scan QR and not login yet
      localStorage.setItem('isScan', isScan)
      localStorage.setItem('assetId', assetId)
    }
  }, [isScan, assetId])

  // when user login from scan QR and already logged in
  if (isScan) {
    nav('stock-adjustment')
  }

  const [show, setShow] = useState(false)

  const localRememberMe = localStorage.getItem('rv5zzc9noTdU5AD2In')

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  useEffect(() => {
    if (localRememberMe) {
      const rememberMeData = JSON.parse(
        CryptoJS.AES.decrypt(
          localRememberMe,
          import.meta.env.VITE_APP_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      )
      const emailFromLocalStorage = rememberMeData?.email
      const passwordFromLocalStorage = rememberMeData?.password

      const bytes = CryptoJS.AES.decrypt(
        passwordFromLocalStorage,
        import.meta.env.VITE_APP_SECRET_KEY
      )
      const decryptedLocalPass = bytes.toString(CryptoJS.enc.Utf8)

      setValue('email', emailFromLocalStorage)
      setValue('password', decryptedLocalPass)
      setValue('remember_me', true)
    } else setValue('remember_me', false)
  }, [localRememberMe, setValue])

  const { email, password, remember_me } = watch()

  const onSubmit = handleSubmit(handleError(login, control), checkErrorYup)

  return (
    <main className="flex h-screen w-full items-center justify-evenly px-7 sm:px-0">
      {/* LEFT SECTION */}
      <div className="flex items-center justify-center">
        <div className="w-full sm:mx-7 md:w-[360px]">
          {/* HEADER */}
          <header className="mb-6 flex flex-col items-center gap-4">
            <div className="h-30 w-20">
              <img src={PLNLogo} alt="plnLogo" />
            </div>
            <div>
              <p className="text-md-regular text-gray-light/600">
                Welcome back! Please enter your details.
              </p>
            </div>
          </header>

          {/* CONTENT */}
          <div className="mb-8">
            <div className="hidden size-24" />
            <form className="z-20" onSubmit={onSubmit}>
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm-medium flex flex-row items-start justify-start text-gray-light/700"
                    >
                      Email
                    </label>
                    <MyTextField
                      name="email"
                      // type="email"
                      trigger={trigger}
                      placeholder="Enter your email"
                      control={control}
                      value={email}
                      errors={errors?.email?.message}
                    />
                  </div>
                  <section className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="password"
                      className="text-sm-medium flex flex-row items-start justify-start text-gray-light/700"
                    >
                      Password
                    </label>
                    <MyTextField
                      type={show ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter your password"
                      control={control}
                      value={password}
                      errors={errors?.password?.message}
                      endAdornment={
                        <span
                          onClick={() => setShow(!show)}
                          style={{
                            padding: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          {show ? (
                            <Eye width={17} height={17} />
                          ) : (
                            <EyeOff width={17} height={17} />
                          )}
                        </span>
                      }
                    />
                  </section>
                </div>
                <section className="flex items-center">
                  <div className="flex flex-1 gap-x-2">
                    <MyCheckbox
                      name="remember_me"
                      control={control}
                      onChangeForm={(e) => {
                        setValue('remember_me', e.target.checked)
                      }}
                      checked={remember_me}
                    />
                    <p className="text-sm-medium text-gray-light/700">
                      Remember me
                    </p>
                  </div>
                  {/* <MyButton
                    color="primary"
                    variant="text"
                    onClick={() => nav('/forget-password')}
                  >
                    <p className="text-sm-semibold">Forgot password</p>
                  </MyButton> */}
                </section>
                <MyButton
                  type="submit"
                  color="primary"
                  variant="filled"
                  size="lg"
                  expanded
                  disabled={isSubmitting}
                >
                  <p className="text-md-semibold">Sign in</p>
                </MyButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="my-6 h-auto max-w-full max-sm:hidden">
        <img
          src={heroLogin}
          alt="mainLogo"
          width="532px"
          height="950px"
          className="rounded-2xl"
        />
      </div>
    </main>
  )
}

export default Login
