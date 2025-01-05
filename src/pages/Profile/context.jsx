import React, { createContext, useContext, useMemo } from 'react'
import ProfileService from './service'
import { useApp } from '../../AppContext'
import { myToaster } from '../../components/Toaster/MyToaster'

const ProfileContext = createContext()

function ProfileProvider({ children }) {
  const { getSession } = useApp()

  const getProfile = async () =>
    await ProfileService.getProfile()
      .then((res) => res.data)
      // .then(getSession())
      .catch(myToaster)

  const updateProfile = async (body) => {
    // console.log(body)

    const formData = new FormData()
    formData.append('photo', body.photo)
    if (body.delete_photo) formData.append('delete_photo', body.delete_photo)
    formData.append('name', body.name)
    formData.append('email', body.email)
    return await ProfileService.updateProfile(formData)
      .then(myToaster)
      .then(getProfile)
      .then(getSession)
      .catch(myToaster)
  }

  const contextValue = useMemo(
    () => ({ updateProfile, getProfile }),
    [updateProfile, getProfile]
  )

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

export { ProfileProvider, useProfile }
