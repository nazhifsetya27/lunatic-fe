import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import Service from './service'
import { useApp } from '../../../AppContext'
import { myToaster } from '../../../components/Toaster/MyToaster'

const FurnitureContext = createContext()

function FurnitureProvider({ children }) {
  const { setSlider } = useApp()

  const [furnitures, setFurnitures] = useState({
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
  }, [currentSlider, setSlider])

  const handleCurrentSlider = useCallback((slider, id, data) => {
    if (slider && slider.current)
      setCurrentSlider({ status: true, current: slider.current, id, data })
    else {
      setCurrentSlider((value) => ({ ...value, current: null }))
      setTimeout(() => {
        setCurrentSlider({ current: null })
      }, 200)
    }
  }, [])

  const searchCustomer = useCallback(
    (searchParams) => Service.searchCustomer(searchParams).catch(myToaster),
    []
  )

  const searchFurnitureType = useCallback(
    (searchParams) =>
      Service.searchFurnitureType(searchParams).catch(myToaster),
    []
  )

  const searchRack = useCallback(
    (searchParams) => Service.searchRack(searchParams).catch(myToaster),
    []
  )

  const getFurnitures = useCallback(
    () =>
      Service.getFurnitures(params)
        .then((res) => {
          setFurnitures({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  const showFurniture = useCallback(
    (id) =>
      Service.showFurniture(id)
        .then((res) => res.data)
        .catch(myToaster),
    []
  )

  const getFurnitureDetail = useCallback(
    (id) =>
      Service.getFurnitureDetail(id)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  const createFurniture = useCallback(
    (body) =>
      Service.createFurniture(body)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFurnitures),
    [getFurnitures, handleCurrentSlider]
  )

  const updateFurniture = useCallback(
    (body) =>
      Service.updateFurniture(currentSlider?.id, body)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFurnitures),
    [currentSlider, getFurnitures, handleCurrentSlider]
  )

  const restoreFurniture = useCallback(
    (id) =>
      Service.restoreFurniture(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFurnitures)
        .catch(myToaster),
    [getFurnitures, handleCurrentSlider]
  )

  //   const bulkDeleteFurniture = useCallback(
  //     (data) =>
  //       Service.bulkDeleteFurniture({ sim_card_ids: data })
  //         .then(myToaster)
  //         .then(getFurnitures)
  //         .catch(myToaster),
  //     [getFurnitures]
  //   )

  const deleteFurniture = useCallback(
    (id) => {
      if (window.confirm('Anda yakin ingin menghapus data ini?')) {
        return Service.deleteFurniture(id)
          .then(myToaster)
          .then(() => handleCurrentSlider({ status: false, current: null }))
          .then(getFurnitures)
          .catch(myToaster)
      }
      return Promise.resolve()
    },
    [getFurnitures, handleCurrentSlider]
  )

  //   const importFurniture = useCallback((values, config) => {
  //     const formData = new FormData()
  //     formData.append('simcards', values.simcards)
  //     return Service.importFurniture(formData, config)
  //   }, [])

  //   const downloadTemplateImport = useCallback(() => {
  //     const url = Service.downloadTemplateImport()
  //     window.open(url, '_blank').focus()
  //   }, [])

  //   const downloadExport = useCallback(() => {
  //     const url = Service.downloadExport(params)
  //     window.open(url, '_blank').focus()
  //   }, [params])

  useEffect(() => {
    getFurnitures()
  }, [getFurnitures])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      furnitures,
      setFurnitures,
      searchCustomer,
      searchFurnitureType,
      searchRack,
      getFurnitures,
      getFurnitureDetail,
      showFurniture,
      createFurniture,
      updateFurniture,
      deleteFurniture,
      restoreFurniture,
    }),
    [
      params,
      currentSlider,
      getFurnitures,
      handleCurrentSlider,
      searchCustomer,
      searchRack,
      searchFurnitureType,
      furnitures,
      getFurnitureDetail,
      showFurniture,
      createFurniture,
      updateFurniture,
      deleteFurniture,
      restoreFurniture,
    ]
  )

  return (
    <FurnitureContext.Provider value={contextValue}>
      {children}
    </FurnitureContext.Provider>
  )
}

const useFurniture = () => {
  const context = useContext(FurnitureContext)
  if (!context)
    throw new Error('useFurniture must be used within FurnitureProvider')
  return context
}

export { FurnitureProvider, useFurniture }
