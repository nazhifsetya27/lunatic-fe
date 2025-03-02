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

const ElektronikContext = createContext()

function ElektronikProvider({ children }) {
  const { setSlider } = useApp()

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const [elektronics, setElektronics] = useState({
    data: [],
    meta: [],
    filter: [],
  })
  const [params, setParams] = useState({
    page: 1,
    filter: [],
    archive: 0,
    detailtab: 'general',
    category: 'Elektronik',
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

  const searchElektronikType = useCallback(
    (searchParams) =>
      Service.searchElektronikType(searchParams).catch(myToaster),
    []
  )

  const searchRack = useCallback(
    (searchParams) => Service.searchRack(searchParams).catch(myToaster),
    []
  )

  const getElektronics = useCallback(
    () =>
      Service.getElektronics(params)
        .then((res) => {
          setElektronics({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  const showElektronik = useCallback(
    (id) =>
      Service.showElektronik(id)
        .then((res) => res.data)
        .catch(myToaster),
    []
  )

  const getElektronikDetail = useCallback(
    (id) =>
      Service.getElektronikDetail(id)
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

  const createElektronik = useCallback(
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

      Service.createElektronik(formData)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getElektronics)
        .catch(myToaster)
    },
    [getElektronics, handleCurrentSlider]
  )

  const updateElektronik = useCallback(
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

      Service.updateElektronik(currentSlider?.id, formData)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getElektronics)
        .catch(myToaster)
    },
    [currentSlider, getElektronics, handleCurrentSlider]
  )

  const restoreElektronik = useCallback(
    (id) =>
      Service.restoreElektronik(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getElektronics)
        .catch(myToaster),
    [getElektronics, handleCurrentSlider]
  )

  //   const bulkDeleteElektronik = useCallback(
  //     (data) =>
  //       Service.bulkDeleteElektronik({ sim_card_ids: data })
  //         .then(myToaster)
  //         .then(getElektronics)
  //         .catch(myToaster),
  //     [getElektronics]
  //   )

  const deleteElektronik = useCallback(
    (id) =>
      Service.deleteElektronik(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getElektronics)
        .catch(myToaster),
    [getElektronics, handleCurrentSlider]
  )

  const downloadTemplateImport = useCallback(() => {
    const url = Service.downloadTemplateImport()
    window.open(url, '_blank').focus()
  }, [])

  const importElektronik = useCallback((values, config) => {
    const formData = new FormData()
    formData.append('electronics', values.electronics)
    return Service.importElektronik(formData, config)
  }, [])

  const downloadExport = useCallback(() => {
    const url = Service.downloadExport({ category: 'Elektronik' })
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
    getElektronics()
  }, [getElektronics])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      elektronics,
      setElektronics,
      searchCustomer,
      searchElektronikType,
      searchRack,
      getElektronics,
      showElektronik,
      getElektronikDetail,
      restoreElektronik,
      createElektronik,
      downloadTemplateImport,
      downloadExport,
      updateElektronik,
      deleteElektronik,
      searchUnitList,
      searchBuildingList,
      searchFloorList,
      searchRoomList,
      getPrint,
      print,
      importElektronik,
      setConfirmModalOpen,
      isConfirmModalOpen,
      searchKodeList,
    }),
    [
      params,
      currentSlider,
      getElektronics,
      handleCurrentSlider,
      searchCustomer,
      searchRack,
      searchElektronikType,
      elektronics,
      showElektronik,
      getElektronikDetail,
      restoreElektronik,
      createElektronik,
      updateElektronik,
      deleteElektronik,
      downloadTemplateImport,
      downloadExport,
      searchUnitList,
      searchBuildingList,
      searchFloorList,
      searchRoomList,
      downloadTemplateImport,
      importElektronik,
      setConfirmModalOpen,
      isConfirmModalOpen,
      searchKodeList,
    ]
  )

  return (
    <ElektronikContext.Provider value={contextValue}>
      {children}
    </ElektronikContext.Provider>
  )
}

const useElektronik = () => {
  const context = useContext(ElektronikContext)
  if (!context)
    throw new Error('useElektronik must be used within ElektronikProvider')
  return context
}

export { ElektronikProvider, useElektronik }
