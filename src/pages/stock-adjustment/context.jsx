// Libraries
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

// Shared Components

// Utils
import { useNavigate } from 'react-router-dom'
import Service from './service'
import { myToaster } from '../../components/Toaster/MyToaster'

const StockAdjustmentContext = createContext()

function StockAdjustmentProvider({ children }) {
  const navigate = useNavigate()

  const [currentModal, setCurrentModal] = useState({
    status: false,
    current: null,
  })
  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })

  const [stockAdjustmentDetails, setstockAdjustmentDetails] = useState()
  const [detailStockAdjustmentResult, setDetailStockAdjustmentResult] =
    useState({ data: [], meta: [] })

  const [params, setParams] = useState({
    page: 1,
    page_detail: 1,
    type: 'view all',
    filter: [],
    archive: 0,
    detailTab: 'terminal',
  })
  const [currentModalTabs, setCurrentModalTabs] = useState({
    page: 1,
    type: 'general',
    search: '',
  })

  const [stockAdjustment, setstockAdjustment] = useState({
    data: [],
    meta: [],
    filter: [],
  })

  const handleCurrentSlider = (slider, id) => {
    if (slider && slider.current) {
      setCurrentSlider({
        status: true,
        current: slider.current,
        id,
        origin: slider.origin,
        data: slider.data,
        category: slider.category,
      })
    } else {
      setCurrentSlider((value) => ({ ...value, current: null }))
      setTimeout(() => {
        setCurrentSlider({ current: null })
      }, 200)
    }
  }

  const handleModalChangeTabs = (value) => {
    setCurrentModalTabs({ page: 1, type: value, search: '' })
  }

  /* ------------------------------------------------------- */

  // GET
  const getStockAdjustment = async () =>
    await Service.getStockAdjustment(params)
      .then((res) => {
        setstockAdjustment({
          data: res.data,
          filter: res.filter,
          meta: res.meta,
        })
      })
      .catch(myToaster)

  const getstockAdjustmentDetails = async (id, _) =>
    await Service.getStockAdjustmentDetail(id, params)
      .then((res) => setstockAdjustmentDetails(res.data))
      .catch(myToaster)

  const getDetailStockAdjustmentResult = async (id) =>
    await Service.getDetailStockAdjustmentResult(id, params)
      .then((res) => {
        setDetailStockAdjustmentResult({ data: res.data, meta: res.meta })
      })
      .catch(myToaster)

  // CREATE, UPDATE
  const createstockAdjustment = async (body) => {
    console.log('createstockAdjustment body', body)
    const formData = new FormData()

    formData.append('name', body.name)

    return await Service.createStockAdjustment(formData)
      .then((res) => {
        console.log('res: ', res)

        handleCurrentSlider(null)
        navigate(`/stock-adjustment/${res.data.id}`, {
          //   state: {
          //     code: body.stock_adjustment_id,
          //     warehouse_id: body.warehouse.id,
          //     stock_adjustment_id: res.data.id,
          //   },
        })
        return res
      })
      .then(myToaster)
    // .then(getStockAdjustment)
  }

  const updatestockAdjustment = async (body, config) => {
    const formData = new FormData()

    formData.append('code', body.name)

    return await Service.updateStockAdjustment(
      currentSlider?.id,
      formData,
      config
    )
      .then(myToaster)
      .then(() => handleCurrentSlider(null))
      .then(getStockAdjustment)
  }

  const downloadExport = useCallback(
    (id) => {
      const url = Service.downloadExport(id, params)
      window.open(url, '_blank').focus()
    },
    [params]
  )

  /* Details-Item */
  const getTerminalDetail = useCallback(
    (id, terminalDetailParams) =>
      Service.getTerminalDetail(id, terminalDetailParams)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  const getSamCardDetail = useCallback(
    (id) =>
      Service.getSamCardDetail(id)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  const getSimCardDetail = useCallback(
    (id) =>
      Service.getSimCardDetail(id)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  const getPeripheralDetail = useCallback(
    (id) =>
      Service.getPeripheralDetail(id)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  const getThermalDetail = useCallback(
    (id) =>
      Service.getThermalDetail(id)
        .then((res) => res)
        .catch(myToaster),
    []
  )

  useEffect(() => {
    getStockAdjustment()
  }, [params])

  const contextValue = useMemo(
    () => ({
      currentSlider,
      setCurrentSlider,
      currentModal,
      setCurrentModal,
      handleCurrentSlider,
      currentModalTabs,
      setCurrentModalTabs,
      handleModalChangeTabs,
      params,
      setParams,
      getStockAdjustment,
      stockAdjustment,
      createstockAdjustment,
      updatestockAdjustment,
      getstockAdjustmentDetails,
      stockAdjustmentDetails,
      getDetailStockAdjustmentResult,
      detailStockAdjustmentResult,
      getSamCardDetail,
      getSimCardDetail,
      getTerminalDetail,
      getPeripheralDetail,
      getThermalDetail,
      downloadExport,
    }),
    [
      currentSlider,
      setCurrentSlider,
      currentModal,
      setCurrentModal,
      handleCurrentSlider,
      currentModalTabs,
      setCurrentModalTabs,
      handleModalChangeTabs,
      params,
      setParams,
      getStockAdjustment,
      stockAdjustment,
      createstockAdjustment,
      updatestockAdjustment,
      getstockAdjustmentDetails,
      stockAdjustmentDetails,
      getDetailStockAdjustmentResult,
      detailStockAdjustmentResult,
      getSamCardDetail,
      getSimCardDetail,
      getTerminalDetail,
      getPeripheralDetail,
      getThermalDetail,
      downloadExport,
    ]
  )

  return (
    <StockAdjustmentContext.Provider value={contextValue}>
      {children}
    </StockAdjustmentContext.Provider>
  )
}

const useStockAdjustment = () => {
  const context = useContext(StockAdjustmentContext)
  if (context === undefined) {
    throw new Error(
      'Stock adjustment must be used within a StockAdjustmentProvider'
    )
  }
  return context
}

export { StockAdjustmentProvider, useStockAdjustment }
