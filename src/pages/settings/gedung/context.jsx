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

const BuildingContext = createContext()

function BuildingProvider({ children }) {
  const { setSlider } = useApp()

  const [buildings, setBuildings] = useState({
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

  const getBuilding = useCallback(
    () =>
      Service.getBuildings(params)
        .then((res) => {
          setBuildings({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  const showBuilding = async (id) =>
    await Service.showBuilding(id)
      .then((res) => res.data)
      .catch(myToaster)

  const createBuilding = async (body) => {
    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('kode', body.kode)

    await Service.createBuilding(formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getBuilding)
  }

  const updateBuilding = async (body) => {
    const formData = new FormData()

    formData.append('name', body.name)
    formData.append('kode', body.kode)

    await Service.updateBuilding(currentSlider?.id, formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getBuilding)
  }

  const deleteBuilding = async (id) => {
    if (window.confirm('Anda yakin ingin menghapus data ini?'))
      return await Service.deleteBuilding(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getBuilding)
        .catch(myToaster)
  }

  const restoreBuilding = async (id) => {
    await Service.restoreBuilding(id)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getBuilding)
      .catch(myToaster)
  }

  useEffect(() => {
    getBuilding()
  }, [getBuilding])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      buildings,
      showBuilding,
      createBuilding,
      updateBuilding,
      deleteBuilding,
      restoreBuilding,
    }),
    [
      params,
      currentSlider,
      buildings,
      showBuilding,
      createBuilding,
      updateBuilding,
      deleteBuilding,
      restoreBuilding,
    ]
  )

  return (
    <BuildingContext.Provider value={contextValue}>
      {children}
    </BuildingContext.Provider>
  )
}

const useBuilding = () => {
  const context = useContext(BuildingContext)
  if (context === undefined) {
    throw new Error('userForgotPassword must be used within a BuildingProvider')
  }
  return context
}

export { BuildingProvider, useBuilding }
