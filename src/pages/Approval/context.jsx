/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useState, useEffect } from 'react'
import Service from './service'
import { useApp } from '../../AppContext'
import { myToaster } from '../../components/Toaster/MyToaster'

const ApprovalContext = createContext()

function ApprovalProvider(props) {
  const { setSlider, hasPermission } = useApp()
  const [currentModal, setCurrentModal] = useState({
    status: false,
    current: null,
  })
  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
    id: null,
    origin: null,
    data: null,
    category: null,
  })

  const [params, setParams] = useState({
    page: 1,
    page_detail: 1,
    filter: [],
    archive: 0,
    status: 'view all',
  })

  const [currentModalTabs, setCurrentModalTabs] = useState({
    page: 1,
    type: 'general',
    search: '',
  })

  const [approval, setApproval] = useState({
    data: [],
    meta: [],
    filter: [],
  })
  const [approvalDetail, setApprovalDetail] = useState()
  const [tranferOrderDetails, setTranferOrderDetails] = useState()
  const [detailStockAdjustmentResult, setDetailStockAdjustmentResult] =
    useState({ data: [], meta: [] })

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

  const getApproval = async () =>
    await Service.getApproval(params)
      .then((res) => {
        setApproval({
          data: res.data,
          filter: res.filter,
          meta: res.meta,
        })
      })
      .catch(myToaster)

  const getDetail = async (id) =>
    await Service.getDetail(id)
      .then((res) => {
        setApprovalDetail(res.data)
      })
      .catch(myToaster)

  const updateApproval = async (body) => {
    const formData = new FormData()

    formData.append('status', body.status)
    formData.append('description', body.description)
    await Service.updateApproval(currentSlider?.id.id, formData)
      .then(myToaster)
      .then(() => handleCurrentSlider({ status: false, current: null }))
      .then(getApproval)
  }

  return (
    <ApprovalContext.Provider
      value={{
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
        getApproval,
        approval,
        getDetail,
        approvalDetail,
        updateApproval,
      }}
    >
      {' '}
      {props.children}
    </ApprovalContext.Provider>
  )
}

const useApproval = () => {
  const context = useContext(ApprovalContext)
  if (context === undefined) {
    throw new Error('Approval warehouse must be used within a ApprovalProvider')
  }
  return context
}

export { ApprovalProvider, useApproval }
