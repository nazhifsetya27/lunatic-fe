import React, { useEffect } from 'react'
import { useStockAdjustment } from '../context'
import DetailsItem from './DetailsItem'

function Modal() {
  const context = useStockAdjustment()
  const { params, currentSlider, getDetailStockAdjustmentResult, setParams } =
    context
  const data = currentSlider?.id

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      detailTab: 'furniture',
    }))
  }, [])

  useEffect(() => {
    getDetailStockAdjustmentResult(data, { category: data.category })
  }, [params.detailTab])

  return <DetailsItem context={context} data={data} />
}

export default Modal
