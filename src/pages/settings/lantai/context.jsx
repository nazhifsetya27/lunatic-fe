import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import FormData from 'form-data'
import Service from './service'
import { useApp } from '../../../AppContext'
import { myToaster } from '../../../components/Toaster/MyToaster'

const FloorContext = createContext()

function FloorProvider({ children }) {
  const { setSlider } = useApp()

  const [floors, setFloors] = useState({
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

  const getFloor = useCallback(
    () =>
      Service.getFloor(params)
        .then((res) => {
          setFloors({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  const showFloor = async (id) =>
    await Service.showFloor(id)
      .then((res) => res.data)
      .catch(myToaster)

  const createFloor = async (body) => {
    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('kode', body.kode)

    await Service.createFloor(formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getFloor)
  }

  const updateFloor = async (body) => {
    const formData = new FormData()

    formData.append('name', body.name)
    formData.append('kode', body.kode)

    await Service.updateFloor(currentSlider?.id, formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getFloor)
  }

  const deleteFloor = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus data ini?'))
      return await Service.deleteFloor(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFloor)
        .catch(myToaster)
  }

  const restoreFloor = async (id) => {
    await Service.restoreFloor(id)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getFloor)
      .catch(myToaster)
  }

  useEffect(() => {
    getFloor()
  }, [getFloor])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      floors,
      showFloor,
      createFloor,
      updateFloor,
      deleteFloor,
      restoreFloor,
    }),
    [
      params,
      currentSlider,
      floors,
      showFloor,
      createFloor,
      updateFloor,
      deleteFloor,
      restoreFloor,
    ]
  )

  return (
    <FloorContext.Provider value={contextValue}>
      {children}
    </FloorContext.Provider>
  )
}

const useFloor = () => {
  const context = useContext(FloorContext)
  if (context === undefined) {
    throw new Error('userForgotPassword must be used within a FloorProvider')
  }
  return context
}

export { FloorProvider, useFloor }
