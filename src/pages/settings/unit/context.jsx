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

const UnitContext = createContext()

function UnitProvider({ children }) {
  const { setSlider } = useApp()

  const [units, setUnits] = useState({
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

  const getUnit = useCallback(
    () =>
      Service.getUnits(params)
        .then((res) => {
          setUnits({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  const showUnit = async (id) =>
    await Service.showUnit(id)
      .then((res) => res.data)
      .catch(myToaster)

  const createUnit = useCallback(
    (body) =>
      Service.createUnit(body)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUnit),
    [getUnit, handleCurrentSlider]
  )

  const updateUnit = useCallback(
    (body) =>
      Service.updateUnit(currentSlider?.id, body)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUnit),
    [currentSlider, getUnit, handleCurrentSlider]
  )

  const deleteUnit = useCallback(
    (id) => {
      if (window.confirm('Anda yakin ingin menghapus data ini?')) {
        return Service.deleteUnit(id)
          .then(myToaster)
          .then(() => handleCurrentSlider({ status: false, current: null }))
          .then(getUnit)
          .catch(myToaster)
      }
      return Promise.resolve()
    },
    [getUnit, handleCurrentSlider]
  )

  const restoreUnit = useCallback(
    (id) =>
      Service.restoreUnit(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUnit)
        .catch(myToaster),
    [getUnit, handleCurrentSlider]
  )

  useEffect(() => {
    getUnit()
  }, [getUnit])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      units,
      showUnit,
      createUnit,
      updateUnit,
      deleteUnit,
      restoreUnit,
    }),
    [
      params,
      currentSlider,
      units,
      showUnit,
      createUnit,
      updateUnit,
      deleteUnit,
      restoreUnit,
    ]
  )

  return (
    <UnitContext.Provider value={contextValue}>{children}</UnitContext.Provider>
  )
}

const useUnit = () => {
  const context = useContext(UnitContext)
  if (context === undefined) {
    throw new Error('userForgotPassword must be used within a UnitProvider')
  }
  return context
}

export { UnitProvider, useUnit }
