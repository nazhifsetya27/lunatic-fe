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
  // const isScan = searchParams.get('isScan')
  // const asset_id = searchParams.get('asset_id')
  const isScan = localStorage.getItem('isScan')
  const asset_id = localStorage.getItem('assetId')

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
        } else {
          localStorage.removeItem('rv5zzc9noTdU5AD2In')
        }

        // if isScan create SA and redirect to SA
        if (isScan) {
          let createSAFromQR
          try {
            createSAFromQR =
              await LoginService.createStockAdjustmentFromQR(asset_id)
            // console.log(createSAFromQR) // Log the response here

            nav(`/stock-adjustment/${createSAFromQR?.data?.id}`, {
              state: {
                stock_adjustment_id: createSAFromQR?.data?.id,
                name: createSAFromQR?.data?.name,
              },
            })

            localStorage.removeItem('isScan')
            localStorage.removeItem('assetId')

            myToaster({
              status: 200,
              title: 'success create stock adjustment',
              message: 'please adjust your inventory',
            })
          } catch (error) {
            console.error('Error creating stock adjustment:', error)
            localStorage.removeItem('isScan')
            localStorage.removeItem('assetId')
            myToaster(error)
          }
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
