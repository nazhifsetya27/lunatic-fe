/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useState, useEffect } from 'react'
import Service from './service'
import { useApp } from '../../AppContext'
import { myToaster } from '../../components/Toaster/MyToaster'

const UserContext = createContext()

const UserProvider = (props) => {
  const { setSlider, hasPermission } = useApp()

  const [currentModal, setCurrentModal] = useState({
    status: false,
    current: null,
  })
  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })
  const [currentTabs, setCurrentTabs] = useState({
    type: 'general',
    search: '',
    page: 1,
    filter: [],
  })

  const [initialUsername, setInitialusername] = useState()

  //STATES
  const [users, setUsers] = useState({ data: [], meta: [], filter: [] })
  const [params, setParams] = useState({ page: 1, filter: [], archive: 0 })

  const [createdPassword, setCreatedPassword] = useState(null)

  const handleCurrentSlider = (slider, id) => {
    if (slider && slider.current) {
      setCurrentSlider({ status: true, current: slider.current, id })
    } else {
      setCurrentSlider((value) => ({ ...value, current: null }))
      setTimeout(() => {
        setCurrentSlider({ current: null })
      }, 200)
    }
  }

  //Home Page
  const getUsers = async () => {
    return await Service.getUsers(params)
      .then((res) => {
        setUsers({ data: res.data, meta: res.meta, filter: res.filter })
      })
      .catch(myToaster)
  }

  //user detail

  const getUserDetail = async (id) =>
    await Service.getUserDetail(id, currentTabs)
      .then((res) => res)
      .catch(myToaster)

  const createUser = async (body) => {
    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('password', body.password)
    formData.append('email', body.email)
    formData.append('role', body.role)
    formData.append('unit_id', body.unit_id.id)

    return await Service.createUser(formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getUsers)
  }

  const showUser = async (id) => {
    return await Service.showUser(id)
      .then((res) => res.data)
      .catch(myToaster)
  }

  const unitList = async (query) => {
    return Service.unitList(query).catch(myToaster)
  }

  const searchRole = async ({ search }) => {
    return {
      data: ['Administrator', 'User', 'Approver'].filter((e) =>
        search ? e.toLowerCase().includes(search.toLowerCase()) : true
      ),
    }
  }

  const updateUser = async (body) => {
    const formData = new FormData()
    if (body.photo) formData.append('photo', body.photo)
    formData.append('role', body.role)
    if (body.password) {
      formData.append('password', body.password)
    }
    formData.append('name', body.name)
    formData.append('email', body.email)
    formData.append('unit_id', body.unit_id.id)
    await Service.updateUser(currentSlider?.id, formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getUsers)
  }

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this data?'))
      return await Service.deleteUser(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUsers)
        .catch(myToaster)
  }

  const restoreUser = async (id) => {
    if (window.confirm('Are you sure you want to restore this data?'))
      return await Service.restoreUser(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUsers)
        .catch(myToaster)
  }

  useEffect(() => {
    setSlider(currentSlider.status)
    setCreatedPassword(null)
  }, [currentSlider])

  return (
    <UserContext.Provider
      value={{
        currentSlider,
        setCurrentSlider,
        currentModal,
        setCurrentModal,
        setCurrentTabs,
        users,
        setUsers,
        handleCurrentSlider,
        getUsers,
        getUserDetail,
        createUser,
        searchRole,
        unitList,
        showUser,
        updateUser,
        deleteUser,
        setParams,
        restoreUser,
        params,
      }}
    >
      {' '}
      {props.children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
