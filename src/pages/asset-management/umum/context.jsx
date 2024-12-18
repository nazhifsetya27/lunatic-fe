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

  const searchUmumType = useCallback(
    (searchParams) => Service.searchUmumType(searchParams).catch(myToaster),
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

  const showUmum = useCallback(
    (id) =>
      Service.showUmum(id)
        .then((res) => res.data)
        .catch(myToaster),
    []
  )

  const getUmumDetail = useCallback(
    (id) =>
      Service.getUmumDetail(id)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  const createUmum = useCallback(
    (body) =>
      Service.createUmum(body)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUmums),
    [getUmums, handleCurrentSlider]
  )

  const updateUmum = useCallback(
    (body) =>
      Service.updateUmum(currentSlider?.id, body)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUmums),
    [currentSlider, getUmums, handleCurrentSlider]
  )

  const restoreUmum = useCallback(
    (id) =>
      Service.restoreUmum(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUmums)
        .catch(myToaster),
    [getUmums, handleCurrentSlider]
  )

  //   const bulkDeleteUmum = useCallback(
  //     (data) =>
  //       Service.bulkDeleteUmum({ sim_card_ids: data })
  //         .then(myToaster)
  //         .then(getUmums)
  //         .catch(myToaster),
  //     [getUmums]
  //   )

  const deleteUmum = useCallback(
    (id) => {
      if (window.confirm('Anda yakin ingin menghapus data ini?')) {
        return Service.deleteUmum(id)
          .then(myToaster)
          .then(() => handleCurrentSlider({ status: false, current: null }))
          .then(getUmums)
          .catch(myToaster)
      }
      return Promise.resolve()
    },
    [getUmums, handleCurrentSlider]
  )

  //   const importUmum = useCallback((values, config) => {
  //     const formData = new FormData()
  //     formData.append('Umums', values.Umums)
  //     return Service.importUmum(formData, config)
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
      searchUmumType,
      searchRack,
      getUmums,
      showUmum,
      getUmumDetail,
      createUmum,
      updateUmum,
      deleteUmum,
      restoreUmum,
      //   bulkDeleteUmum,
      //   importUmum,
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
      searchUmumType,
      umums,
      showUmum,
      getUmumDetail,
      createUmum,
      updateUmum,
      deleteUmum,
      restoreUmum,
    ]
  )

  return (
    <UmumContext.Provider value={contextValue}>{children}</UmumContext.Provider>
  )
}

const useUmum = () => {
  const context = useContext(UmumContext)
  if (!context) throw new Error('useUmum must be used within UmumProvider')
  return context
}

export { UmumProvider, useUmum }
