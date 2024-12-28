// Libraries
import React, { createContext, useContext, useState, useEffect } from 'react'
import { boolean } from 'yup'
import { validate as uuidValidate } from 'uuid'
import Service from './service'
import { useApp } from '../../AppContext'
import { myToaster } from '../../components/Toaster/MyToaster'

const StorageManagementContext = createContext()

function StorageManagementProvider({ children }) {
  const { setSlider } = useApp()

  const [unit, setUnit] = useState()

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
        console.log('res: ', res)

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

  const showStorageManagement = async () =>
    await Service.showStorageManagement(currentSlider.id)
      .then((res) => res.data)
      .catch(myToaster)

  const createStorageManagement = async (body) => {
    const parent_id = body.id || null
    let is_child = boolean
    parent_id ? (is_child = true) : (is_child = false)
    const rack_category_id = body?.type?.id
    if (!params?.warehouse?.id) throw new Error('Please select warehouse first')
    const warehouse_id = params?.warehouse?.id
    const data = {
      ...body,
      rack_category_id,
      warehouse_id,
      parent_id,
      is_child,
    }

    await Service.createStorageManagement(data)
      .then(myToaster)
      .then(() => handleCurrentSlider(null))
      .then(getStorageManagement)
  }

  const updateStorageManagement = async (body) => {
    const data = body
    const { id } = body
    delete body.id
    await Service.updateStorageManagement(id, data)
      .then(myToaster)
      .then(() => handleCurrentSlider(null))
      .then(getStorageManagement)
  }

  const deleteStorageManagement = async (id) => {
    await Service.deleteStorageManagement(id)
      .then(myToaster)
      .then(getStorageManagement)
      .catch(myToaster)
  }
  const bulkDeleteStorageManagement = async (data) => {
    data = data.filter((e) => uuidValidate(e))
    await Service.bulkDeleteStorageManagement({
      StorageManagement_ids: data,
    })
      .then(myToaster)
      .then(getStorageManagement)
      .catch(myToaster)
  }

  const validateRack = async (id) => {
    try {
      const response = await Service.validateRack(id)
      myToaster(response)
    } catch (error) {
      myToaster(error)
      throw error
    }
  }

  const restoreStorageManagement = async (id) => {
    await Service.restoreRack(id)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getStorageManagement)
      .catch(myToaster)
  }
  const importStorageManagement = async (data, config) => {
    const formData = new FormData()
    data.terminals.map((e) => {
      formData.append('terminals', e)
    })
    return Service.importStorageManagement(formData, config)
  }

  const getStatus = async (query) => Service.getStatus(query).catch(myToaster)
  const downloadTemplateImport = () => Service.downloadTemplateImport()
  const downloadExport = () => Service.downloadExport(params)
  const searchUnitList = async (params) =>
    Service.searchUnitList(params).catch(myToaster)
  const searchBuildingList = async (params) =>
    Service.searchBuildingList(params).catch(myToaster)

  const searchRackCategoryList = async (params) =>
    Service.searchRackCategoryList(params).catch()

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
        deleteStorageManagement,
        restoreStorageManagement,
        importStorageManagement,
        getStatus,
        downloadTemplateImport,
        bulkDeleteStorageManagement,
        searchUnitList,
        searchRackCategoryList,
        validateRack,
        unit,
        searchBuildingList,
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
