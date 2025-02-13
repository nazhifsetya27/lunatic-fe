// Libraries
import React, { createContext, useContext, useState, useEffect } from 'react'
import Service from './service'
import { useApp } from '../../AppContext'
import { myToaster } from '../../components/Toaster/MyToaster'

const StorageManagementContext = createContext()

function StorageManagementProvider({ children }) {
  const { setSlider } = useApp()

  const [unit, setUnit] = useState()
  const [category, setcategory] = useState()

  const [storageManagement, setStorageManagement] = useState({
    data: [],
    meta: [],
    filter: [],
    warehouse: null,
  })
  const [params, setParams] = useState({
    page: 1,
    filter: [],
    warehouse: null,
    search: null,
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
      setCurrentSlider({
        status: true,
        current: slider.current,
        id,
        data: slider.data,
      })
    } else {
      setCurrentSlider((value) => ({ ...value, current: null }))
      setTimeout(() => {
        setCurrentSlider({ current: null })
      }, 200)
    }
  }

  const getStorageManagement = async (unit_id) => {
    await Service.getStorageManagement(unit_id, params)
      .then((res) => {
        setStorageManagement({
          uniqueChildren: res.uniqueChildren,
          data: res.data,
          filter: res.filter,
          meta: res.meta,
        })
      })
      .catch(myToaster)
  }

  const getUnit = async () => {
    await Service.getUnit(params)
      .then((res) => {
        setUnit(res.data)
      })
      .catch(myToaster)
  }

  const showStorageManagement = async (id) =>
    await Service.showStorageManagement(params?.unit?.id, id)
      .then((res) => res)
      .catch(myToaster)

  const createStorageManagement = async (body) => {
    const formData = new FormData()
    formData.append('unit_id', params?.unit?.id)

    body.buildings.map((building, index) =>
      formData.append(`building_ids[${index}]`, building.id)
    )

    await Service.createStorageManagement(formData)
      .then(myToaster)
      .then(() => handleCurrentSlider(null))
      .then(() => getStorageManagement(params?.unit?.id))
  }

  const updateStorageManagement = async (body) => {
    console.log('body: ', body)

    const formData = new FormData()
    formData.append('unit_id', params?.unit?.id)

    if (category === 'Lantai') {
      body.level.map((lv, index) =>
        formData.append(`floor_ids[${index}]`, lv.id)
      )
      formData.append('current_building_id', currentSlider?.id)
    } else if (category === 'Ruangan') {
      body.level.map((lv, index) =>
        formData.append(`room_ids[${index}]`, lv.id)
      )
      formData.append(
        'current_building_id',
        currentSlider?.data?.previous_building_id
      )
      formData.append('current_floor_id', currentSlider?.id)
    }

    // throw 'yahaha'
    await Service.updateStorageManagement(formData)
      .then(myToaster)
      .then(() => handleCurrentSlider(null))
      .then(() => getStorageManagement(params?.unit?.id))
  }

  const deleteStorageManagement = async (id) => {
    await Service.deleteStorageManagement(id)
      .then(myToaster)
      .then(getStorageManagement)
      .catch(myToaster)
  }
  // const bulkDeleteStorageManagement = async (data) => {
  //   data = data.filter((e) => uuidValidate(e))
  //   await Service.bulkDeleteStorageManagement({
  //     StorageManagement_ids: data,
  //   })
  //     .then(myToaster)
  //     .then(getStorageManagement)
  //     .catch(myToaster)
  // }

  // const restoreStorageManagement = async (id) => {
  //   await Service.restoreRack(id)
  //     .then(myToaster)
  //     .then(() => handleCurrentSlider({ status: false, current: null }))
  //     .then(getStorageManagement)
  //     .catch(myToaster)
  // }
  // const importStorageManagement = async (data, config) => {
  //   const formData = new FormData()
  //   data.terminals.map((e) => {
  //     formData.append('terminals', e)
  //   })
  //   return Service.importStorageManagement(formData, config)
  // }

  // const getStatus = async (query) => Service.getStatus(query).catch(myToaster)
  // const downloadTemplateImport = () => Service.downloadTemplateImport()
  // const downloadExport = () => Service.downloadExport(params)

  const searchUnitList = async (param) =>
    Service.searchUnitList(param).catch(myToaster)
  const searchBuildingList = async (param) =>
    Service.searchBuildingList(param).catch(myToaster)
  const searchFloorList = async (param) =>
    Service.searchFloorList(param).catch(myToaster)
  const searchRoomList = async (param) =>
    Service.searchRoomList(param).catch(myToaster)

  useEffect(() => {
    getUnit()
    // getStorageManagement()
  }, [])

  return (
    <StorageManagementContext.Provider
      value={{
        currentSlider,
        setCurrentSlider,
        // currentModal,
        // setCurrentModal,
        handleCurrentSlider,
        params,
        setParams,
        storageManagement,
        setStorageManagement,
        getStorageManagement,
        showStorageManagement,
        createStorageManagement,
        updateStorageManagement,
        // deleteStorageManagement,
        // restoreStorageManagement,
        // importStorageManagement,
        // downloadTemplateImport,
        // bulkDeleteStorageManagement,
        searchUnitList,
        unit,
        searchBuildingList,
        searchFloorList,
        searchRoomList,
        category,
        setcategory,
        deleteStorageManagement,
      }}
    >
      {children}
    </StorageManagementContext.Provider>
  )
}

const useStorageManagement = () => {
  const context = useContext(StorageManagementContext)
  if (context === undefined) {
    throw new Error('useRack must be used within a RackProvider')
  }
  return context
}

export { StorageManagementProvider, useStorageManagement }
