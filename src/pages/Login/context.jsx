import React, { createContext, useContext, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import CryptoJS from 'crypto-js'
import { LoginService } from './service'
import { myToaster } from '../../components/Toaster/MyToaster'

const LoginContext = createContext()

function LoginProvider({ children }) {
  const [cookies, setCookie] = useCookies(['token'])

  const login = async (body) => {
    const formData = new FormData()
    const encryptedPassword = CryptoJS.AES.encrypt(
      body.password,
      import.meta.env.VITE_APP_SECRET_KEY
    ).toString()

    formData.append('email', body.email)
    formData.append('password', body.password)

    return await LoginService.login(formData)
      .then(myToaster)
      .then((result) => {
        setCookie('token', result.data.token, {
          path: '/',
        })
        if (body?.remember_me === true) {
          const rememberMeData = {
            email: body.email,
            password: encryptedPassword,
          }
          localStorage.setItem(
            'rv5zzc9noTdU5AD2In', // remember_me
            CryptoJS.AES.encrypt(
              JSON.stringify(rememberMeData),
              import.meta.env.VITE_APP_SECRET_KEY
            ).toString()
          )
        } else {
          localStorage.removeItem('rv5zzc9noTdU5AD2In')
        }
      })
  }

  const contextValue = useMemo(
    () => ({
      login,
    }),
    []
  )
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  )
}

const useLogin = () => {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
}

export { LoginProvider, useLogin }
