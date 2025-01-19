// import {
//   MyButton,
//   MyChip,
//   MyHorizontalTab,
//   MyModalSlider,
//   MyTabButton,
// } from '@interstellar-component'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import { ArrowLeft, SearchLg } from '@untitled-ui/icons-react'
import { useEffect } from 'react'
import { useStockAdjustmentInventory } from './context'
import MySuggestionField from '../../components/Autocomplete/MySuggestionField'
import MyButton from '../../components/Button/MyButton'
import MyChip from '../../components/Chip/MyChip'
import MyHorizontalTab from '../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../components/HorizontalTab/MyTabButton'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import FormSliderFurniture from './furniture/Sliders/FormSlider'

// sliders
// import FormSliderTerminal from './terminal/Sliders/FormSlider'
// import FormSliderSimCard from './sim-card/Sliders/FormSlider'
// import FormSliderSamCard from './sam-card/Sliders/FormSlider'
// import FormSliderPeripheral from './peripheral/Sliders/FormSlider'
// import FormSliderThermal from './thermal/Sliders/FormSlider'

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

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'form-slider-furniture'}
        element={<FormSliderFurniture />}
        onClose={() => handleCurrentSlider(null)}
      />
      {/* <MyModalSlider
          open={currentSlider?.current === 'form-slider-simCard'}
          element={<FormSliderSimCard />}
          onClose={() => handleCurrentSlider(null)}
        />
        <MyModalSlider
          open={currentSlider?.current === 'form-slider-samCard'}
          element={<FormSliderSamCard />}
          onClose={() => handleCurrentSlider(null)}
        />
        <MyModalSlider
          open={currentSlider?.current === 'form-slider-peripheral'}
          element={<FormSliderPeripheral />}
          onClose={() => handleCurrentSlider(null)}
        />
        <MyModalSlider
          open={currentSlider?.current === 'form-slider-thermal'}
          element={<FormSliderThermal />}
          onClose={() => handleCurrentSlider(null)}
        /> */}
      <SimpleBar forceVisible="y" style={{ height: '100%' }}>
        <div>
          <section className="flex flex-col">
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
              <div className="flex">
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
                <div className="mx-5 flex items-center justify-center gap-3">
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
                        extraData={{ isStockAdjustment: true }}
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
                              <p className="text-sm-bold text-gray-light/700">
                                {option?.category ?? '-'}
                              </p>
                            </div>
                            <hr className="mb-1 mt-3 border-gray-light/200" />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <MyButton
                    onClick={() =>
                      submitInventory(stockAdjustmentState.stock_adjustment_id)
                    }
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
        </div>
      </SimpleBar>
    </>
  )
}

export default StockAdjustmentInventory
