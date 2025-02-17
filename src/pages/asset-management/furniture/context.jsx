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

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const [furnitures, setFurnitures] = useState({
    data: [],
    meta: [],
    filter: [],
  })
  const [params, setParams] = useState({
    page: 1,
    filter: [],
    archive: 0,
    detailtab: 'general',
    category: 'Furniture',
  })
  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })
  const [print, setPrint] = useState()

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
  const getPrint = useCallback(
    (id) =>
      Service.getPrint(id)
        .then((res) => {
          setPrint(res?.data)
        })
        .catch(myToaster),
    []
  )

  const createFurniture = useCallback(
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

      Service.createFurniture(formData)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFurnitures)
        .catch(myToaster)
    },
    [getFurnitures, handleCurrentSlider]
  )

  const updateFurniture = useCallback(
    (body) => {
      const formData = new FormData()

      formData.append('name', body?.name)
      formData.append('kode', body?.kode?.kode)
      formData.append('unit_id', body?.unit?.id)
      formData.append('building_id', body?.building?.id)
      if (body.acquisition_date) {
        formData.append(
          'acquisition_date',
          new Date(body.acquisition_date).toISOString()
        )
      }
      if (body.price) {
        formData.append('price', body?.price)
      }
      if (body?.floor?.id) formData.append('floor_id', body.floor.id)
      if (body?.room?.id) formData.append('room_id', body.room.id)

      Service.updateFurniture(currentSlider?.id, formData)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFurnitures)
        .catch(myToaster)
    },
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
    (id) =>
      Service.deleteFurniture(id)
        .then(myToaster)
        .then(() => handleCurrentSlider({ status: false, current: null }))
        .then(getFurnitures)
        .catch(myToaster),
    [getFurnitures, handleCurrentSlider]
  )

  const downloadTemplateImport = useCallback(() => {
    const url = Service.downloadTemplateImport()
    window.open(url, '_blank').focus()
  }, [])

  const importFurniture = useCallback((values, config) => {
    const formData = new FormData()
    formData.append('furnitures', values.furnitures)
    return Service.importFurniture(formData, config)
  }, [])

  const downloadExport = useCallback(() => {
    const url = Service.downloadExport({ category: 'Furniture' })
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
      downloadExport,
      downloadTemplateImport,
      restoreFurniture,
      searchUnitList,
      searchBuildingList,
      searchFloorList,
      searchRoomList,
      getPrint,
      print,
      importFurniture,
      setConfirmModalOpen,
      isConfirmModalOpen,
      searchKodeList,
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
      downloadExport,
      downloadTemplateImport,
      restoreFurniture,
      searchUnitList,
      searchBuildingList,
      searchFloorList,
      searchRoomList,
      importFurniture,
      downloadTemplateImport,
      setConfirmModalOpen,
      isConfirmModalOpen,
      searchKodeList,
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
