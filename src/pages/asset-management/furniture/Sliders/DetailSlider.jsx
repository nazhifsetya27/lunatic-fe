import { useEffect, useState } from 'react'
import { Edit01, XClose, RefreshCcw01 } from '@untitled-ui/icons-react'
import { useFurniture } from '../context'
import MyButton from '../../../../components/Button/MyButton'
import General from '../Tabs/General'
import MyHorizontalTab from '../../../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../../../components/HorizontalTab/MyTabButton'
import Print from '../Tabs/Print'

function DetailSlider() {
  const {
    currentSlider,
    handleCurrentSlider,
    getFurnitureDetail,
    restoreFurniture,
    setParams,
    params,
    getPrint,
    print,
    setConfirmModalOpen,
  } = useFurniture()

  const { data } = currentSlider

  const [furnitureDetail, setFurnitureDetail] = useState({})

  useEffect(() => {
    if (currentSlider.id) {
      getFurnitureDetail(currentSlider.id).then((detail) => {
        setFurnitureDetail(detail.data)
      })
      getPrint(currentSlider.id)
    }
  }, [currentSlider.id, getFurnitureDetail])

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      detailtab: 'general',
    }))
  }, [])

  return (
    <div className="flex h-screen w-[375px] flex-col">
      <header className="relative flex flex-col px-4">
        <div className="relative flex items-start gap-x-4 pb-4 pt-8">
          <button
            type="button"
            aria-label="Close"
            className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
          >
            <XClose
              onClick={() => handleCurrentSlider(null)}
              className="size-6"
              stroke="currentColor"
            />
          </button>
          <div className="flex flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">
              {furnitureDetail?.nama ?? '-'}
            </p>
            <p className="text-md-regular text-gray-light/600">Furniture</p>
          </div>
        </div>
      </header>

      <div className="px-3">
        <MyHorizontalTab
          type="underline"
          value={params?.detailtab}
          onChange={(value) =>
            setParams((prev) => ({
              ...prev,
              detailtab: value,
            }))
          }
        >
          <MyTabButton value="general">General</MyTabButton>
          <MyTabButton value="print">Print</MyTabButton>
        </MyHorizontalTab>
      </div>

      {params?.detailtab === 'general' && (
        <General furnitureDetail={furnitureDetail} />
      )}
      {params?.detailtab === 'print' && <Print print={print} />}

      <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
        {furnitureDetail.raw?.deleted_at ? (
          <MyButton
            onClick={() => restoreFurniture(currentSlider.id)}
            color="primary"
            variant="outlined"
            size="md"
          >
            <RefreshCcw01 className="size-5" stroke="currentColor" />
            <span className="text-sm-semibold">Restore</span>
          </MyButton>
        ) : (
          <>
            <MyButton
              onClick={() => setConfirmModalOpen(true)}
              variant="text"
              size="md"
            >
              <span className="text-sm-semibold text-error/700">Delete</span>
            </MyButton>
            <MyButton
              color="secondary"
              variant="outlined"
              size="sm"
              onClick={() =>
                handleCurrentSlider(
                  { current: 'form-slider' },
                  currentSlider.id
                )
              }
            >
              <Edit01
                className="size-5 text-gray-light/600"
                stroke="currentColor"
              />
              <span className="text-sm-semibold">Edit</span>
            </MyButton>
          </>
        )}
      </footer>
    </div>
  )
}

export default DetailSlider
