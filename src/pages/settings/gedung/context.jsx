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

const BuildingContext = createContext()

function BuildingProvider({ children }) {
  const { setSlider } = useApp()

  const [buildings, setBuildings] = useState({
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

  const getBuilding = useCallback(
    () =>
      Service.getBuildings(params)
        .then((res) => {
          setBuildings({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  // const showBuilding = async (id) =>
  //   await Service.showBuilding(id)
  //     .then((res) => res.data)
  //     .catch(myToaster)

  // const createBuilding = async (body) => {
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
  //   await Service.createBuilding(formData)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getBuilding)
  // }
  // const updateBuilding = async (body) => {
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
  //   await Service.updateBuilding(currentSlider?.id, formData, {
  //     previous_technician_ids: currentTechnicianIds,
  //   })
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getBuilding)
  // }
  // const deleteBuilding = async (id) => {
  //   if (window.confirm('Anda yakin ingin menghapus data ini?'))
  //     return await Service.deleteBuilding(id)
  //       .then(myToaster)
  //       .then(() => handleCurrentSlider({ status: false, current: null }))
  //       .then(getBuilding)
  //       .catch(myToaster)
  // }
  // const restoreBuilding = async (id) => {
  //   await Service.restoreBuilding(id)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getBuilding)
  //     .catch(myToaster)
  // }

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
    }),
    [params, currentSlider, buildings]
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
    throw new Error(
      'userForgotPassword must be used within a BuildingProvider'
    )
  }
  return context
}

export { BuildingProvider, useBuilding }
