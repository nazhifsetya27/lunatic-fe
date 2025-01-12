/* eslint-disable react/jsx-no-constructed-context-values */
// Libraries
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'

// Context
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../AppContext'

// Utils
import Service from './service'
import { myToaster } from '../../components/Toaster/MyToaster'

const StockAdjustmentInventoryContext = createContext()
function StockAdjustmentInventoryProvider({ children }) {
  const { setSlider } = useApp()

  const [stockAdjustmentInventory, setStockAdjustmentInventory] = useState({
    data: [],
    meta: [],
    filter: [],
  })
  const [stockAdjustmentDetail, setStockAdjustmentDetail] = useState()
  const [stockAdjustment, setStockAdjustment] = useState({ data: [] })

  const [params, setParams] = useState({
    category: null,
    page: 1,
    filter: [],
    archive: 0,
    type: '',
  })

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

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  // console.log('isLoading: ', isLoading)
  const { stock_adjustment_id } = useParams()

  /* ----------------------------------------------------- */

  const searchInventoryList = async (query) =>
    Service.searchInventoryList(query).catch(myToaster)
  const searchTerminalSNList = async (query) =>
    Service.searchTerminalSNList(query).catch(myToaster)
  const searchConditionList = async (query) =>
    Service.searchConditionList(query).catch(myToaster)
  const searchRackList = async (query) =>
    Service.searchRackList(query).catch(myToaster)

  // eslint-disable-next-line no-shadow
  const getStockAdjustmentInventory = async (stock_adjustment_id) => {
    // console.log(stock_adjustment_id)
    await Service.getStockAdjustmentInventory(params, stock_adjustment_id)
      .then((res) => {
        setStockAdjustmentInventory({
          data: res.data,
          filter: res.filter,
          meta: res.meta,
        })
      })
      .catch(myToaster)
  }

  const getStockAdjustment = async () => {
    await Service.getStockAdjustment(params)
      .then((res) => {
        setStockAdjustment({
          data: res.data,
        })
      })
      .catch(myToaster)
  }

  const getStockAdjustmentDetail = async (SA_id, inventory_id) => {
    await Service.getStockAdjustmentDetail(SA_id, inventory_id)
      .then((res) => {
        setStockAdjustmentDetail(res.data)
      })
      .catch(myToaster)
  }

  // eslint-disable-next-line no-shadow
  const createStockAdjustmentInventory = async (body, stock_adjustment_id) => {
    console.log('create body adjustment', body)
    const formData = new FormData()

    formData.append('stock_adjustment_id', stock_adjustment_id)
    console.log(body)

    formData.append('asset_id', body.id)
    formData.append('previous_condition_id', body.condition.id)

    return await Service.createStockAdjustmentInventory(formData)
      .then(myToaster)
      .then(() => {
        getStockAdjustmentInventory(stock_adjustment_id)
        setIsLoading(false)
      })
      .catch(myToaster)
  }

  const adjustInventory = async (body) => {
    // console.log('adjust body: ', body)
    const formData = new FormData()

    if (body?.evidence) {
      formData.append('photo', body?.evidence)
    }
    formData.append('current_condition_id', body.current_condition.id)

    return await Service.adjustInventory(
      formData,
      body.stock_adjustment_inventory_id
    )
      .then(myToaster)
      .then(() => {
        getStockAdjustmentInventory(stock_adjustment_id)
        handleCurrentSlider({ status: false, current: null })
      })
      .catch(myToaster)
  }
  // eslint-disable-next-line no-shadow, consistent-return
  const submitInventory = async (stock_adjustment_id) => {
    if (window.confirm('Are you sure want to submit?')) {
      return Service.submitInventory(stock_adjustment_id)
        .then(myToaster)
        .then(() => navigate('/stock-adjustment'))
        .catch(myToaster)
    }
  }

  const deleteStockAdjustmentInventory = async (
    stock_adjustment_inventory_ids
  ) => {
    if (window.confirm('Anda yakin ingin menghapus data ini?')) {
      return Service.deleteStockAdjustmentInventory({
        stock_adjustment_inventory_ids,
      })
        .then(myToaster)
        .then(() => getStockAdjustmentInventory(stock_adjustment_id))
        .catch(myToaster)
    }
    return Promise.resolve()
  }
  const showRackManagementList = async (params) =>
    await Service.showRackManagementList(params)
      .then((res) => res.data)
      .catch(myToaster)

  return (
    <StockAdjustmentInventoryContext.Provider
      value={{
        currentSlider,
        setCurrentSlider,
        currentModal,
        setCurrentModal,
        handleCurrentSlider,
        params,
        setParams,
        searchInventoryList,
        getStockAdjustmentInventory,
        stockAdjustmentInventory,
        createStockAdjustmentInventory,
        getStockAdjustment,
        searchTerminalSNList,
        searchConditionList,
        getStockAdjustmentDetail,
        stockAdjustmentDetail,
        searchRackList,
        adjustInventory,
        deleteStockAdjustmentInventory,
        submitInventory,
        stockAdjustment,
        setIsLoading,
        isLoading,
        setStockAdjustmentInventory,
        showRackManagementList,
      }}
    >
      {children}
    </StockAdjustmentInventoryContext.Provider>
  )
}

const useStockAdjustmentInventory = () => {
  const context = useContext(StockAdjustmentInventoryContext)
  if (context === undefined) {
    throw new Error(
      'useStockAdjustmentInventory must be used within a StockAdjustmentInventoryProvider'
    )
  }
  return context
}

export { StockAdjustmentInventoryProvider, useStockAdjustmentInventory }
