import { ArrowLeft, DownloadCloud01, XClose } from '@untitled-ui/icons-react'
import SimpleBar from 'simplebar-react'
import { useMediaQuery } from '@mui/material'
import MyButton from '../../../components/Button/MyButton'
import MyHorizontalTab from '../../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../../components/HorizontalTab/MyTabButton'
import FurnituretabPanel from '../Tab/FurnituretabPanel'
import ElektronikTabPanel from '../Tab/ElektronikTabPanel'
import UmumTabPanel from '../Tab/UmumTabPanel'
// import { MyButton, MyHorizontalTab, MyTabButton } from '@interstellar-component'
// import TerminaltabPanel from '../Tabs/TerminaltabPanel'
// import SimCardTabPanel from '../Tabs/SimcardTabPanel'
// import SamcardtabPanel from '../Tabs/SamcardtabPanel'
// import PeripheralTabPanel from '../Tabs/PeripheralTabPanel'
// import ThermalTabPanel from '../Tabs/ThermalTabPanel'

function DetailsItem({ context = {}, data }) {
  const {
    handleCurrentSlider,
    currentSlider,
    params,
    setParams,
    detailStockAdjustmentResult,
    getDetailStockAdjustmentResult,
    downloadExport,
    downloadExportStockOpname,
  } = context

  const isMobile = useMediaQuery('(max-width:640px)')

  return (
    <div
      className={`flex h-screen ${isMobile ? 'w-[360px]' : 'w-[50vw]'} flex-col`}
    >
      <header className="relative flex flex-col pl-4">
        <div className="relative flex items-start gap-x-4 pb-4 pt-8">
          <button className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400">
            <XClose
              onClick={() => handleCurrentSlider(null)}
              size={24}
              stroke="currentColor"
            />
          </button>

          <div className="flex flex-col gap-4">
            <div>
              <MyButton
                color="secondary"
                variant="text"
                onClick={() =>
                  handleCurrentSlider(
                    {
                      status: true,
                      current: 'details-slider',
                    },
                    currentSlider.origin === 'approval'
                      ? currentSlider?.data
                      : currentSlider?.id
                  )
                }
              >
                <div className="flex gap-1.5">
                  <ArrowLeft className="size-5" stroke="currentColor" />
                  <p className="text-sm-semibold">Back</p>
                </div>
              </MyButton>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xl-semibold text-gray-light/900">
                Stock adjustment
              </p>
              <p className="text-md-regular text-gray-light/600">
                {currentSlider?.data?.code}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="mb-4">
          <MyButton
            color="primary"
            variant="outlined"
            size="md"
            onClick={() =>
              currentSlider.category === 'stock-adjustment'
                ? downloadExport(data)
                : downloadExportStockOpname(data)
            }
          >
            <DownloadCloud01 size="20" />
            <p className="text-sm-semibold">Export</p>
          </MyButton>
        </div> */}
      </header>

      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <div className="flex flex-1 flex-col gap-8 pb-8 pt-4">
            <div className="flex flex-col gap-6">
              <div className="px-4">
                <MyHorizontalTab
                  type="underline"
                  value={params.detailTab}
                  onChange={(value) =>
                    setParams((prev) => ({
                      ...prev,
                      detailTab: value,
                    }))
                  }
                >
                  <MyTabButton value="furniture">Furniture</MyTabButton>
                  <MyTabButton value="elektronik">Elektronik</MyTabButton>
                  <MyTabButton value="umum">Umum</MyTabButton>
                </MyHorizontalTab>
                <hr />
              </div>

              <div className="flex flex-col gap-4">
                <div className="px-4">
                  <p className="text-sm-semibold text-gray-700">
                    List of adjusted
                  </p>
                  <p className="text-sm-regular text-gray-light/600">
                    List of adjusted {params.detailTab}.
                  </p>
                </div>

                {params.detailTab === 'furniture' && (
                  <FurnituretabPanel
                    setParams={setParams}
                    params={params}
                    detailStockAdjustmentResult={detailStockAdjustmentResult}
                    handleCurrentSlider={handleCurrentSlider}
                    getDetailStockAdjustmentResult={
                      getDetailStockAdjustmentResult
                    }
                    data={data}
                  />
                )}
                {params.detailTab === 'elektronik' && (
                  <ElektronikTabPanel
                    setParams={setParams}
                    params={params}
                    detailStockAdjustmentResult={detailStockAdjustmentResult}
                    handleCurrentSlider={handleCurrentSlider}
                    getDetailStockAdjustmentResult={
                      getDetailStockAdjustmentResult
                    }
                    data={data}
                  />
                )}
                {params.detailTab === 'umum' && (
                  <UmumTabPanel
                    setParams={setParams}
                    params={params}
                    detailStockAdjustmentResult={detailStockAdjustmentResult}
                    handleCurrentSlider={handleCurrentSlider}
                    getDetailStockAdjustmentResult={
                      getDetailStockAdjustmentResult
                    }
                    data={data}
                  />
                )}
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default DetailsItem
