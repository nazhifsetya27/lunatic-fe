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
import { appendFormdata } from '../../../services/Helper'
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

  const [currentModal, setCurrentModal] = useState({
    status: false,
    current: null,
  })

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
      Service.getRooms(params)
        .then((res) => {
          setRooms({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  // const showRoom = async (id) =>
  //   await Service.showRoom(id)
  //     .then((res) => res.data)
  //     .catch(myToaster)

  // const createRoom = async (body) => {
  //   console.log('create body: ', body)

  //   const formData = new FormData()
  //   formData.append('name', body.name)
  //   formData.append('code', body.code)
  //   formData.append('phone_number', body.phone_number)
  //   formData.append('province_id', body.province.id)
  //   formData.append('city_id', body.city.id)
  //   formData.append('district_id', body.district.id)
  //   formData.append('sub_district_id', body.zip_code.id)
  //   formData.append('zip_code_id', body.zip_code.id)
  //   formData.append('address', body.address)
  //   if (body.technician[0] !== null) {
  //     body.technician.map((technisi, index) =>
  //       formData.append(`technician_ids[${index}]`, technisi.id)
  //     )
  //   }
  //   // formData.append('territory_type', body.territory_type)
  //   // body.adm_areas.map((area, index) =>
  //   //   formData.append(`adm_areas[${index}]`, area.id)
  //   // )
  //   await Service.createRoom(formData)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getRoom)
  // }
  // const updateRoom = async (body) => {
  //   const formData = new FormData()
  //   console.log('update body: ', body)

  //   formData.append('name', body.name)
  //   formData.append('code', body.code)
  //   formData.append('phone_number', body.phone_number)
  //   formData.append('province_id', body.province.id)
  //   formData.append('city_id', body.city.id)
  //   formData.append('district_id', body.district.id)
  //   formData.append('sub_district_id', body.zip_code.id)
  //   formData.append('zip_code_id', body.zip_code.id)
  //   formData.append('address', body.address)
  //   if (body.technician[0] !== null) {
  //     body.technician.map((technisi, index) =>
  //       formData.append(`technician_ids[${index}]`, technisi.id)
  //     )
  //   }
  //   // formData.append('territory_type', body.territory_type)
  //   // body.adm_areas.map((area, index) =>
  //   //   formData.append(`adm_areas[${index}]`, area.id)
  //   // )
  //   await Service.updateRoom(currentSlider?.id, formData, {
  //     previous_technician_ids: currentTechnicianIds,
  //   })
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getRoom)
  // }
  // const deleteRoom = async (id) => {
  //   if (window.confirm('Anda yakin ingin menghapus data ini?'))
  //     return await Service.deleteRoom(id)
  //       .then(myToaster)
  //       .then(() => handleCurrentSlider({ status: false, current: null }))
  //       .then(getRoom)
  //       .catch(myToaster)
  // }
  // const restoreRoom = async (id) => {
  //   await Service.restoreRoom(id)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getRoom)
  //     .catch(myToaster)
  // }

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
    }),
    [params, currentSlider, rooms]
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
