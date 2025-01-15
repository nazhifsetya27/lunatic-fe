// Libraries
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// UI Icons
import {
  FilterLines,
  Plus,
  SearchLg,
  LinkExternal02,
  RefreshCcw01,
  AlertCircle,
} from '@untitled-ui/icons-react'

// Shared Components
import SimpleBar from 'simplebar-react'
import { debounce } from 'lodash'

// Sliders
import FormSlider from './slider/FormSlider'
import DetailSlider from './slider/DetailSlider'

// Context
import { useStockAdjustment } from './context'
import { formatDate } from '../../services/Helper'
import MyChip from '../../components/Chip/MyChip'
import MyButton from '../../components/Button/MyButton'
import MyDataTable from '../../components/Table/MyDataTable'
import MyColumn from '../../components/Table/MyColumn'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import MyTextField from '../../components/TextField/MyTextField'
import MyFilterModal from '../../components/Modal/MyFilterModal'
import MyAvatar from '../../components/Avatar/MyAvatar'
import MyButtonGroupV2 from '../../components/Button/MyButtonGroupV2'
import DetailsItem from './slider/DetailsItem'
import Modal from './slider/DetailsItemOpen'

const getChip = (status) => {
  if (status === 'done-with-attention') {
    return (
      <MyChip
        label="Attention"
        endAdornment={<AlertCircle className="size-5 text-warning/500" />}
        color="warning"
        variant="filled"
        rounded="full"
        size="lg"
      />
    )
  }
  if (status === 'Waiting for approval') {
    return (
      <MyChip
        label="Waiting for approval"
        endAdornment={<AlertCircle className="size-5 text-warning/500" />}
        color="warning"
        variant="filled"
        rounded="full"
        size="lg"
      />
    )
  }
  if (status === 'On progress') {
    return (
      <MyChip
        label="On progress"
        endAdornment={<AlertCircle className="size-5 text-gray-500" />}
        color="gray"
        variant="filled"
        rounded="full"
        size="lg"
      />
    )
  }
  return null
}

function StockAdjustment() {
  const {
    currentSlider,
    handleCurrentSlider,
    params,
    setParams,
    stockAdjustment,
  } = useStockAdjustment()

  const navigate = useNavigate()

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'form-slider'}
        element={<FormSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'details-slider'}
        element={<DetailSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'details-item'}
        element={<Modal />}
        onClose={() => handleCurrentSlider(null)}
      />

      <SimpleBar
        forceVisible="y"
        className="flex-1"
        style={{ height: '100vh' }}
      >
        <main className="flex flex-col gap-8 pb-12 pt-8">
          <div className="flex flex-col gap-6 px-8">
            <div className="flex flex-col gap-1">
              <p className="display-sm-semibold text-gray-light/900">
                Stock adjustment
              </p>
              <p className="text-gray-light/600">
                Manage inventory by stock adjustment here.
              </p>
            </div>
            <div className="w-full">
              <div className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 px-4 pt-5">
                    <div className="flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg-semibold text-gray-light/900">
                          List of stock adjustment
                        </p>
                        <MyChip
                          label={`${stockAdjustment?.meta?.total ?? ''} item`}
                          color="modern"
                          variant="outlined"
                          size="sm"
                          rounded="md"
                        />
                      </div>
                      <p className="text-sm-regular text-gray-light/600">
                        List of your stock adjustment history.
                      </p>
                    </div>
                    <div className="flex items-start justify-start gap-3">
                      <MyButton
                        onClick={() =>
                          handleCurrentSlider({
                            status: true,
                            current: 'form-slider',
                          })
                        }
                        color="primary"
                        variant="filled"
                        size="md"
                        // disabled={!access?.add}
                      >
                        <Plus className="size-5" stroke="currentColor" />
                        <p className="text-sm-semibold">New stock adjustment</p>
                      </MyButton>
                    </div>
                  </div>
                  <hr className="border-gray-light/200" />
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-gray-light/200 px-4 py-3">
                  {/* <MyArchiveButton
                    value={params}
                    onChange={(e) => {
                      setParams({ archive: e, page: 1, search: '' })
                    }}
                  /> */}
                  <MyButtonGroupV2
                    buttons={[
                      { label: 'View all', value: 'view_all' },
                      { label: 'On progress', value: 'on_progress' },
                    ]}
                    value={params.type}
                    onChange={(e) => {
                      setParams((value) => ({ ...value, type: e, page: 1 }))
                    }}
                  />
                  <div className="flex flex-1 items-center justify-end gap-3">
                    <div className="w-full max-w-[375px]">
                      <MyTextField
                        placeholder="Search"
                        id="input-search"
                        value={params.search}
                        startAdornment={
                          <SearchLg
                            className="size-5 text-gray-light/600"
                            stroke="currentColor"
                          />
                        }
                        onChangeForm={debounce(
                          (e) =>
                            setParams((value) => ({
                              ...value,
                              search: e.target.value,
                              page: 1,
                            })),
                          1000
                        )}
                      />
                    </div>
                    <MyFilterModal
                      id="filter-ticketing"
                      currentFilters={stockAdjustment?.filter}
                      onChange={(filter) => {
                        setParams((value) => ({
                          ...value,
                          filter,
                          page: 1,
                          search: '',
                        }))
                      }}
                      target={(open, handleClick) => (
                        <MyButton
                          removeWhite
                          onClick={handleClick}
                          color="secondary"
                          variant="outlined"
                          size="md"
                        >
                          <FilterLines
                            className="size-5"
                            stroke="currentColor"
                          />
                          <p className="text-sm-semibold">Filters</p>
                        </MyButton>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <MyDataTable
                    values={stockAdjustment}
                    paginator
                    // onDeleteAll={bulkDeleteTerminal}
                    selectionMode="multiple"
                    // onSelectionChange={(value) => setTerminalList(value)}
                    onChangePagination={(page) => {
                      setParams((value) => ({ ...value, page }))
                    }}
                    onClick={(value) => {
                      if (params.archive) {
                        handleCurrentSlider(
                          { status: true, current: 'details-slider' },
                          value.id
                        )
                      }
                    }}
                  >
                    <MyColumn
                      field="id"
                      header="Name"
                      hideCheckBoxHeader
                      isArchived={1}
                      body={({ name }) => (
                        <p className="text-sm-medium text-gray-light/900">
                          {name ?? '-'}
                        </p>
                      )}
                    />
                    <MyColumn
                      field="created_date"
                      header="Created date"
                      body={(value) => (
                        <p className="text-sm-regular text-gray-light/600">
                          {formatDate(value?.created_at)}
                        </p>
                      )}
                    />
                    <MyColumn
                      field="created_by"
                      header="Created by"
                      body={({ created_by }) => (
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              display: created_by?.name ? '' : 'none',
                            }}
                          >
                            <MyAvatar
                              photo={created_by?.photo_url ?? null}
                              size={40}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm-medium text-gray-light/900">
                              {created_by?.name ?? ''}
                            </p>
                            <p className="text-sm-regular text-gray-light/600">
                              {created_by?.role ?? ''}
                            </p>
                          </div>
                        </div>
                      )}
                    />
                    <MyColumn
                      field="status"
                      header="Status"
                      body={({ status }) => (
                        <p className="text-sm-regular text-gray-light/600">
                          {getChip(status)}
                        </p>
                      )}
                    />
                    <MyColumn
                      alignment="right"
                      body={(value) => {
                        // console.log('value: ', value)
                        const a = 'temp'

                        return (
                          <div className="flex items-center justify-end gap-1">
                            {value?.status === 'On progress' && (
                              <MyButton
                                onClick={() =>
                                  navigate(`/stock-adjustment/${value?.id}`, {
                                    state: {
                                      stock_adjustment_id: value?.id,
                                      name: value?.name,
                                    },
                                  })
                                }
                                size="md"
                                variant="text"
                              >
                                <LinkExternal02
                                  className="size-5 text-gray-light/600"
                                  stroke="currentColor"
                                />
                              </MyButton>
                            )}

                            {value?.status !== 'On progress' && (
                              <MyButton
                                onClick={() =>
                                  handleCurrentSlider(
                                    {
                                      status: true,
                                      current: 'details-slider',
                                    },
                                    value.id
                                  )
                                }
                                size="md"
                                variant="text"
                              >
                                <LinkExternal02
                                  className="size-5 text-gray-light/600"
                                  stroke="currentColor"
                                />
                              </MyButton>
                            )}
                          </div>
                        )
                      }}
                    />
                  </MyDataTable>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SimpleBar>
    </>
  )
}

export default StockAdjustment
