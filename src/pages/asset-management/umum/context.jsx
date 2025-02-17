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

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const [umums, setUmums] = useState({
    data: [],
    meta: [],
    filter: [],
  })
  const [params, setParams] = useState({
    page: 1,
    filter: [],
    archive: 0,
    detailtab: 'general',
    category: 'Umum',
  })
  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })
  const [print, setPrint] = useState()

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

  const getPrint = useCallback(
    (id) =>
      Service.getPrint(id)
        .then((res) => setPrint(res?.data))
        .catch(myToaster),
    []
  )

  const createUmum = useCallback(
    (body) => {
      const formData = new FormData()

      formData.append('name', body?.name)
      formData.append('kode', body?.kode?.kode)
      if (body.acquisition_date) {
        formData.append(
          'acquisition_date',
          new Date(body.acquisition_date).toISOString()
        )
      }
      if (body.price) {
        formData.append('price', body?.price)
      }
      formData.append('unit_id', body?.unit?.id)
      formData.append('building_id', body?.building?.id)

      if (body?.floor?.id) formData.append('floor_id', body.floor.id)
      if (body?.room?.id) formData.append('room_id', body.room.id)

      Service.createUmum(formData)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUmums)
        .catch(myToaster)
    },
    [getUmums, handleCurrentSlider]
  )

  const updateUmum = useCallback(
    (body) => {
      const formData = new FormData()

      formData.append('name', body?.name)
      formData.append('kode', body?.kode?.kode)
      if (body.acquisition_date) {
        formData.append(
          'acquisition_date',
          new Date(body.acquisition_date).toISOString()
        )
      }
      if (body.price) {
        formData.append('price', body?.price)
      }
      formData.append('unit_id', body?.unit?.id)
      formData.append('building_id', body?.building?.id)

      if (body?.floor?.id) formData.append('floor_id', body.floor.id)
      if (body?.room?.id) formData.append('room_id', body.room.id)

      Service.updateUmum(currentSlider?.id, formData)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUmums)
        .catch(myToaster)
    },
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
    (id) =>
      Service.deleteUmum(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getUmums)
        .catch(myToaster),
    [getUmums, handleCurrentSlider]
  )

  const downloadTemplateImport = useCallback(() => {
    const url = Service.downloadTemplateImport()
    window.open(url, '_blank').focus()
  }, [])

  const importUmum = useCallback((values, config) => {
    const formData = new FormData()
    formData.append('umums', values.umums)
    return Service.importUmum(formData, config)
  }, [])

  const downloadExport = useCallback(() => {
    const url = Service.downloadExport({ category: 'Umum' })
    window.open(url, '_blank').focus()
  }, [params])

  const searchUnitList = async (param) =>
    Service.searchUnitList(param).catch(myToaster)
  const searchBuildingList = async (param) =>
    Service.searchBuildingList(param).catch(myToaster)
  const searchFloorList = async (param) =>
    Service.searchFloorList(param).catch(myToaster)
  const searchRoomList = async (param) =>
    Service.searchRoomList(param).catch(myToaster)
  const searchKodeList = async (param) =>
    Service.searchKodeList(param).catch(myToaster)

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
      searchUnitList,
      searchBuildingList,
      searchFloorList,
      searchRoomList,
      downloadTemplateImport,
      downloadExport,
      getPrint,
      print,
      importUmum,
      isConfirmModalOpen,
      setConfirmModalOpen,
      searchKodeList,
    }),
    [
      params,
      currentSlider,
      getUmums,
      handleCurrentSlider,
      downloadTemplateImport,
      downloadExport,
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
      searchUnitList,
      searchBuildingList,
      searchFloorList,
      searchRoomList,
      downloadTemplateImport,
      importUmum,
      isConfirmModalOpen,
      setConfirmModalOpen,
      searchKodeList,
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
