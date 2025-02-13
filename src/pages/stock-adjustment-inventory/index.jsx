import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import { ArrowLeft, Save03, SearchLg } from '@untitled-ui/icons-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useStockAdjustmentInventory } from './context'
import MySuggestionField from '../../components/Autocomplete/MySuggestionField'
import MyButton from '../../components/Button/MyButton'
import MyChip from '../../components/Chip/MyChip'
import MyHorizontalTab from '../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../components/HorizontalTab/MyTabButton'

// sliders
import FormSliderFurniture from './furniture/Sliders/FormSlider'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import MyConfirmModal from '../../components/Modal/MyConfirmModal'

function StockAdjustmentInventory() {
  const {
    params,
    searchInventoryList,
    getStockAdjustmentInventory,
    setParams,
    createStockAdjustmentInventory,
    getStockAdjustment,
    currentSlider,
    handleCurrentSlider,
    stockAdjustmentInventory,
    submitInventory,
    setIsLoading,
    isLoading,
  } = useStockAdjustmentInventory()

  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useLocation()
  const { stock_adjustment_id } = useParams()
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const stockAdjustmentState = JSON.parse(
    localStorage.getItem('stockAdjustmentState')
  )

  // console.log('stockAdjustmentState: ', stockAdjustmentState)

  useEffect(() => {
    if (params.type || isLoading)
      getStockAdjustmentInventory(stock_adjustment_id)
    // getStockAdjustment()
  }, [params, stock_adjustment_id, isLoading])

  useEffect(() => {
    if (stock_adjustment_id !== state?.stock_adjustment_id) {
      navigate('/stock-adjustment', { replace: true })
    }
  }, [])

  useEffect(() => {
    const path = location.pathname
    const pathIndex = path.lastIndexOf('/')
    if (pathIndex !== -1) {
      const pathname = path.slice(pathIndex).replace('/', '')
      if (
        pathname === 'furniture' ||
        pathname === 'elektronik' ||
        pathname === 'umum'
      ) {
        setParams((value) => ({
          ...value,
          type: pathname,
        }))
      }
    }

    if (state) {
      localStorage.setItem('stockAdjustmentState', JSON.stringify(state))
    }
  }, [location, state, setParams])

  const isMobile = useMediaQuery('(max-width:640px)')
  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'form-slider-furniture'}
        element={<FormSliderFurniture />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() =>
          submitInventory(stockAdjustmentState.stock_adjustment_id)
        }
        message="Are you sure want to submit?"
        icon={<Save03 className="text-warning/600" />}
        bgColor="bg-error/100"
      />
      <SimpleBar
        forceVisible="y"
        className="flex-1"
        style={{ height: '100vh' }}
      >
        <section className={`flex ${isMobile ? '' : 'flex-col'}`}>
          <div className="flex h-max w-full flex-row justify-between">
            <div className="flex flex-col">
              <div className="px-4 pb-3 pt-4">
                <MyButton
                  onClick={() =>
                    navigate('/stock-adjustment', { replace: true })
                  }
                  color="primary"
                  variant="text"
                  size="md"
                >
                  <ArrowLeft className="size-5" stroke="currentColor" />
                  <p className="text-sm-semibold">Back</p>
                </MyButton>
              </div>
              <div className="px-8">
                <p className="text-xl-semibold text-gray-light/900">
                  {stockAdjustmentState?.name}
                </p>
                <p className="text-gray-light/600">
                  Adjust your stock inventory.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-8 mt-8 flex flex-col gap-6 rounded-lg border p-3">
          <div className="flex flex-col gap-5">
            <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg-semibold text-gray-light/900">
                    List of Inventory
                  </p>
                  <MyChip
                    label={`${stockAdjustmentInventory.meta.total ?? '-'} item`}
                    rounded="md"
                    color="modern"
                    variant="outlined"
                    size="sm"
                  />
                </div>
                <p className="text-sm-regular text-gray-light/600">
                  Manage your inventory.
                </p>
              </div>
              <div
                className={`${isMobile ? '' : 'mx-5'} flex items-center justify-center gap-3`}
              >
                <div className="flex w-72 flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-y-1.5">
                    <MySuggestionField
                      placeholder="Add inventory"
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      startAdornment={
                        <SearchLg
                          className="size-5 text-gray-light/600"
                          stroke="currentColor"
                        />
                      }
                      getOptionLabel={(e) => e?.name}
                      getOptionValue={(e) => e?.name}
                      asyncFunction={(e) => searchInventoryList({ ...e })}
                      // extraData={{ isStockAdjustment: true }}
                      isSearchInventory
                      // onClick={(value) => console.log(value)}
                      onChangeInput={(e, value, rawValue) => {
                        // console.log(rawValue)
                        if (rawValue) {
                          setIsLoading(true)
                          createStockAdjustmentInventory(
                            rawValue,
                            stock_adjustment_id
                          )
                        }
                      }}
                      showResult
                      renderOption={(option) => (
                        <div className="flex flex-col gap-1">
                          {/* BARIS 1 */}
                          <div className="flex gap-3">
                            <div className="flex flex-col gap-1">
                              <p className="text-sm-semibold text-center text-gray-light/700">
                                {option?.name ?? '-'}
                              </p>
                              <MyChip
                                label={option.kode ?? '-'}
                                rounded="lg"
                                variant="filled"
                                color="gray"
                                size="sm"
                              />
                            </div>
                            <div className="flex w-[100px] flex-col items-center">
                              <p className="text-sm-bold text-gray-light/700">
                                {option?.category ?? '-'}
                              </p>
                              <p className="text-sm-bold text-gray-light/700">
                                <span className="text-sm-semibold">nomor:</span>
                                &nbsp;
                                {option?.nomor ?? '-'}
                              </p>
                            </div>
                          </div>
                          <hr className="mb-1 mt-3 border-gray-light/200" />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <MyButton
                  onClick={() => setConfirmModalOpen(true)}
                  color="primary"
                  variant="filled"
                  size="md"
                >
                  <p className="text-sm-semibold">Submit</p>
                </MyButton>
              </div>
            </div>

            <MyHorizontalTab
              selectedIsMatchPath
              type="button-white-border"
              value={params.category}
              onChange={(value) => navigate(value)}
            >
              <MyTabButton value="furniture">Furniture</MyTabButton>
              <MyTabButton value="elektronik">Elektronik</MyTabButton>
              <MyTabButton value="umum">Umum</MyTabButton>
            </MyHorizontalTab>
          </div>
          <Outlet />
        </div>
      </SimpleBar>
    </>
  )
}

export default StockAdjustmentInventory
