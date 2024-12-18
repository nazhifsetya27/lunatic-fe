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

const ConditionContext = createContext()

function ConditionProvider({ children }) {
  const { setSlider } = useApp()

  const [conditions, setConditions] = useState({
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

  const getCondition = useCallback(
    () =>
      Service.getConditions(params)
        .then((res) => {
          setConditions({ data: res.data, filter: res.filter, meta: res.meta })
        })
        .catch(myToaster),
    [params]
  )

  // const showCondition = async (id) =>
  //   await Service.showCondition(id)
  //     .then((res) => res.data)
  //     .catch(myToaster)

  // const createCondition = async (body) => {
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
  //   await Service.createCondition(formData)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getCondition)
  // }
  // const updateCondition = async (body) => {
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
  //   await Service.updateCondition(currentSlider?.id, formData, {
  //     previous_technician_ids: currentTechnicianIds,
  //   })
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getCondition)
  // }
  // const deleteCondition = async (id) => {
  //   if (window.confirm('Anda yakin ingin menghapus data ini?'))
  //     return await Service.deleteCondition(id)
  //       .then(myToaster)
  //       .then(() => handleCurrentSlider({ status: false, current: null }))
  //       .then(getCondition)
  //       .catch(myToaster)
  // }
  // const restoreCondition = async (id) => {
  //   await Service.restoreCondition(id)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getCondition)
  //     .catch(myToaster)
  // }

  useEffect(() => {
    getCondition()
  }, [getCondition])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      handleCurrentSlider,
      params,
      setParams,
      conditions,
    }),
    [params, currentSlider, conditions]
  )

  return (
    <ConditionContext.Provider value={contextValue}>
      {children}
    </ConditionContext.Provider>
  )
}

const useCondition = () => {
  const context = useContext(ConditionContext)
  if (context === undefined) {
    throw new Error(
      'userForgotPassword must be used within a ConditionProvider'
    )
  }
  return context
}

export { ConditionProvider, useCondition }
