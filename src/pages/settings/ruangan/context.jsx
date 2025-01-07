import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import Service from './service'
import { useApp } from '../../../AppContext'
import { myToaster } from '../../../components/Toaster/MyToaster'

const RoomContext = createContext()

function RoomProvider({ children }) {
  const { setSlider } = useApp()

  const [rooms, setRooms] = useState({
    data: [],
    meta: [],
    filter: [],
  })

  const [params, setParams] = useState({ page: 1, filter: [], archive: 0 })

  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })

  useEffect(() => {
    setSlider(currentSlider.status)
  }, [currentSlider])

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

  const getRoom = useCallback(
    () =>
      Service.getRoom(params)
        .then((res) => {
          setRooms({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  const showRoom = async (id) =>
    await Service.showRoom(id)
      .then((res) => res.data)
      .catch(myToaster)

  const createRoom = async (body) => {
    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('kode', body.kode)
    formData.append('description', body.description)

    await Service.createRoom(formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getRoom)
  }

  const updateRoom = async (body) => {
    const formData = new FormData()

    formData.append('name', body.name)
    formData.append('kode', body.kode)
    formData.append('description', body.description)

    await Service.updateRoom(currentSlider?.id, formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getRoom)
  }

  const deleteRoom = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus data ini?'))
      return await Service.deleteRoom(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getRoom)
        .catch(myToaster)
  }

  const restoreRoom = async (id) => {
    await Service.restoreRoom(id)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getRoom)
      .catch(myToaster)
  }

  useEffect(() => {
    getRoom()
  }, [getRoom])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      rooms,
      showRoom,
      createRoom,
      updateRoom,
      deleteRoom,
      restoreRoom,
    }),
    [
      params,
      currentSlider,
      rooms,
      showRoom,
      createRoom,
      updateRoom,
      deleteRoom,
      restoreRoom,
    ]
  )

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  )
}

const useRoom = () => {
  const context = useContext(RoomContext)
  if (context === undefined) {
    throw new Error('userForgotPassword must be used within a RoomProvider')
  }
  return context
}

export { RoomProvider, useRoom }
