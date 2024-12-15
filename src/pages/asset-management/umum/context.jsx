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

const UmumContext = createContext()

function UmumProvider({ children }) {
  const { setSlider } = useApp()

  const [umums, setUmums] = useState({
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

  const handleCurrentSlider = useCallback((slider, id) => {
    if (slider && slider.current)
      setCurrentSlider({ status: true, current: slider.current, id })
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

  const getUmums = useCallback(
    () =>
      Service.getUmums(params)
        .then((res) => {
          setUmums({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  //   const showFurniture = useCallback(
  //     (id) =>
  //       Service.showFurniture(id)
  //         .then((res) => res.data)
  //         .catch(myToaster),
  //     []
  //   )

  //   const getFurnitureDetail = useCallback(
  //     (id) =>
  //       Service.getFurnitureDetail(id)
  //         .then((res) => res)
  //         .catch(myToaster),
  //     []
  //   )

  //   const createFurniture = useCallback(
  //     (body) =>
  //       Service.createFurniture(body)
  //         .then(myToaster)
  //         .then(() => handleCurrentSlider({ status: false, current: null }))
  //         .then(getUmums),
  //     [getUmums, handleCurrentSlider]
  //   )

  //   const updateSimcard = useCallback(
  //     (body) =>
  //       Service.updateFurniture(currentSlider?.id, body)
  //         .then(myToaster)
  //         .then(() => handleCurrentSlider({ status: false, current: null }))
  //         .then(getUmums),
  //     [currentSlider, getUmums, handleCurrentSlider]
  //   )

  //   const restoreFurniture = useCallback(
  //     (id) =>
  //       Service.restoreFurniture(id)
  //         .then(myToaster)
  //         .then(() => handleCurrentSlider({ status: false, current: null }))
  //         .then(getUmums)
  //         .catch(myToaster),
  //     [getUmums, handleCurrentSlider]
  //   )

  //   const bulkDeleteFurniture = useCallback(
  //     (data) =>
  //       Service.bulkDeleteFurniture({ sim_card_ids: data })
  //         .then(myToaster)
  //         .then(getUmums)
  //         .catch(myToaster),
  //     [getUmums]
  //   )

  //   const deleteFurniture = useCallback(
  //     (id) => {
  //       if (window.confirm('Anda yakin ingin menghapus data ini?')) {
  //         return Service.deleteFurniture(id)
  //           .then(myToaster)
  //           .then(() => handleCurrentSlider({ status: false, current: null }))
  //           .then(getUmums)
  //           .catch(myToaster)
  //       }
  //       return Promise.resolve()
  //     },
  //     [getUmums, handleCurrentSlider]
  //   )

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
    getUmums()
  }, [getUmums])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      umums,
      setUmums,
      searchCustomer,
      searchFurnitureType,
      searchRack,
      getUmums,
      //   showFurniture,
      //   getFurnitureDetail,
      //   createFurniture,
      //   updateSimcard,
      //   deleteFurniture,
      //   restoreFurniture,
      //   bulkDeleteFurniture,
      //   importFurniture,
      //   downloadTemplateImport,
      //   downloadExport,
    }),
    [
      params,
      currentSlider,
      getUmums,
      handleCurrentSlider,
      searchCustomer,
      searchRack,
      searchFurnitureType,
      umums,
      //   bulkDeleteFurniture,
      //   createFurniture,
      //   deleteFurniture,
      //   downloadExport,
      //   downloadTemplateImport,
      //   getFurnitureDetail,
      //   importFurniture,
      //   restoreFurniture,
      //   showFurniture,
      //   updateSimcard,
    ]
  )

  return (
    <UmumContext.Provider value={contextValue}>
      {children}
    </UmumContext.Provider>
  )
}

const useElektronik = () => {
  const context = useContext(UmumContext)
  if (!context)
    throw new Error('useElektronik must be used within UmumProvider')
  return context
}

export { UmumProvider, useElektronik }
