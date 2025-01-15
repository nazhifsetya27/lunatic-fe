import React, { useEffect } from 'react'
import { XClose } from '@untitled-ui/icons-react'
import SimpleBar from 'simplebar-react'
import moment from 'moment'
import { useStockAdjustment } from '../context'
import MyButton from '../../../components/Button/MyButton'
import MyDetailView from '../../../components/DetailView/MyDetailView'

function DetailSlider() {
  const {
    handleCurrentSlider,
    currentSlider,
    getstockAdjustmentDetails,
    stockAdjustmentDetails,
  } = useStockAdjustment()

  useEffect(() => {
    if (currentSlider.id) {
      getstockAdjustmentDetails(currentSlider.id)
    }
  }, [])

  return (
    <div className="flex h-screen w-[375px] flex-col">
      <header className="gap- relative flex flex-col pl-4">
        <div className="relative flex items-start gap-x-4 pb-4 pt-8">
          <button className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400">
            <XClose
              onClick={() => handleCurrentSlider(null)}
              size={24}
              stroke="currentColor"
            />
          </button>
          <div className="flex flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">
              Stock adjustment
            </p>
            <p className="text-md-regular text-gray-light/600">
              {stockAdjustmentDetails?.raw?.code}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <MyButton
            color="primary"
            variant="outlined"
            size="md"
            onClick={() =>
              handleCurrentSlider(
                {
                  status: true,
                  current: 'details-item',
                  data: stockAdjustmentDetails?.raw,
                  origin: 'stock-adjustment',
                  category: 'stock-adjustment',
                },
                currentSlider?.id
              )
            }
          >
            <p className="text-sm-semibold">Details</p>
          </MyButton>
        </div>
        <hr className="border-gray-light/200" />
      </header>

      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <div className="flex flex-1 flex-col gap-8 pb-8 pt-4">
            <div className="flex flex-col gap-6">
              <div className="flex-col px-4">
                <p className="text-sm-semibold text-gray-light/700">
                  General information
                </p>
                <p className="text-sm-regular text-gray-light/600">
                  Detail general information.
                </p>
              </div>
              <div className="flex flex-1 flex-col">
                <MyDetailView
                  datas={stockAdjustmentDetails || {}}
                  func={{
                    'Created date': (value) =>
                      moment(value).format('DD MMM YYYY • HH:mm'),
                  }}
                />
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default DetailSlider
