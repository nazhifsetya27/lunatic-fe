import React, { createContext, useContext, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import CryptoJS from 'crypto-js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoginService } from './service'
import { myToaster } from '../../components/Toaster/MyToaster'

const LoginContext = createContext()

function LoginProvider({ children }) {
  const [cookies, setCookie] = useCookies(['token'])
  const [searchParams, setSearchParams] = useSearchParams()
  const nav = useNavigate()

  // from scan QR
  const isScan = searchParams.get('isScan')
  const asset_id = searchParams.get('asset_id')

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
      .then(async (result) => {
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

          // if isScan redirect to SA
          if (isScan) {
            const createSAFromQR =
              await LoginService.createStockAdjustmentFromQR(asset_id)

            nav(`/stock-adjustment/${createSAFromQR?.data?.id}`, {
              state: {
                stock_adjustment_id: createSAFromQR?.data?.id,
                name: createSAFromQR?.data?.name,
              },
            })

            myToaster({
              status: 200,
              title: 'success create stock adjustment',
              message: 'please adjust your inventory',
            })
          }
        } else {
          localStorage.removeItem('rv5zzc9noTdU5AD2In')
        }
      })
  }

  const contextValue = useMemo(
    () => ({
      login,
      isScan,
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
