import React, { useEffect } from 'react'

// UI Icons
import {
  FilterLines,
  SearchLg,
  LinkExternal02,
  RefreshCcw01,
  Loading01,
  AlertCircle,
  Check,
  XClose,
} from '@untitled-ui/icons-react'

import SimpleBar from 'simplebar-react'
import { debounce } from 'lodash'
import MyTextField from '../../components/TextField/MyTextField'
import MyDataTable from '../../components/Table/MyDataTable'
import MyColumn from '../../components/Table/MyColumn'
import MySwicth from '../../components/Switch/MySwitch'
import MyAvatar from '../../components/Avatar/MyAvatar'
import MyPagination from '../../components/Pagination/MyPagination'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import MyButtonGroup from '../../components/Button/MyButtonGroup'
import MyArchiveButton from '../../components/Button/MyArchiveButton'
import MyChip from '../../components/Chip/MyChip'
import MyButton from '../../components/Button/MyButton'
import MyButtonGroupV2 from '../../components/Button/MyButtonGroupV2'
import MyFilterModal from '../../components/Modal/MyFilterModal'
import DetailSlider from './sliders/DetailSlider'
import { useApproval } from './context'

const getChip = (status) => {
  if (status === 'Rejected') {
    return (
      <MyChip
        label="Rejected"
        endAdornment={<XClose className="size-4 text-error/500" />}
        color="error"
        variant="filled"
        rounded="full"
        size="lg"
      />
    )
  }
  if (status === 'Approved') {
    return (
      <MyChip
        label="Approved"
        endAdornment={<Check className="size-4 text-success/500" />}
        color="success"
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
        endAdornment={<Loading01 className="size-4 text-gray-500" />}
        color="gray"
        variant="filled"
        rounded="full"
        size="lg"
      />
    )
  }
  return null
}

function Approval() {
  const {
    currentSlider,
    setCurrentModalTabs,
    handleCurrentSlider,
    params,
    setParams,
    getApproval,
    approval,
  } = useApproval()

  useEffect(() => {
    getApproval()
    return () => {}
  }, [params])

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'details-slider'}
        element={<DetailSlider />}
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
                Approval inventory management
              </p>
              <p className="text-gray-light/600">
                Stock opname, stock adjustment and transfer order with attention
                from your team.
              </p>
            </div>
            <div className="w-full">
              <div className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 px-4 pt-5">
                    <div className="flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg-semibold text-gray-light/900">
                          List of stock attention
                        </p>
                        <MyChip
                          label={`${approval?.meta?.total ?? ''} item`}
                          color="modern"
                          variant="outlined"
                          size="sm"
                          rounded="md"
                        />
                      </div>
                      <p className="text-sm-regular text-gray-light/600">
                        List of attention from your team.
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-light/200" />
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-gray-light/200 px-4 py-3">
                  <MyButtonGroupV2
                    buttons={[
                      {
                        label: 'Waiting for approval',
                        value: 'Waiting for approval',
                      },
                      { label: 'Approved', value: 'approved' },
                      { label: 'Rejected', value: 'Rejected' },
                      { label: 'View all', value: 'view all' },
                    ]}
                    value={params.status}
                    onChange={(e) => {
                      setParams((value) => ({ ...value, status: e, page: 1 }))
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
                      currentFilters={approval?.filter}
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
                    values={approval}
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
                      field="name"
                      header="Name"
                      hideCheckBoxHeader
                      isArchived={1}
                      body={(value) => (
                        <p className="text-sm-medium text-gray-light/900">
                          {value?.stock_adjustment.name ?? '-'}
                        </p>
                      )}
                    />
                    <MyColumn
                      field="status"
                      header="Status"
                      body={({ status }) => (
                        <p className="text-sm-regular text-gray-light/600">
                          {/* {value?.category ?? '-'} */}
                          {/* <MyChip
                            label={value?.status}
                            size="lg"
                            rounded="lg"
                            variant="outlined"
                            color="modern"
                          /> */}
                          {getChip(status)}
                        </p>
                      )}
                    />
                    <MyColumn
                      field="approver"
                      header="Approver"
                      body={(value) => (
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              display: value?.approver?.name ? '' : 'none',
                            }}
                          >
                            <MyAvatar
                              photo={value?.approver?.photo_url ?? null}
                              size={40}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm-medium text-gray-light/900">
                              {value?.approver?.name ?? ''}
                            </p>
                            <p className="text-sm-regular text-gray-light/600">
                              {value?.approver?.role ?? ''}
                            </p>
                          </div>
                        </div>
                      )}
                    />
                    <MyColumn
                      field="requester"
                      header="Requester"
                      body={(value) => (
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              display: value?.requester?.name ? '' : 'none',
                            }}
                          >
                            <MyAvatar
                              photo={value?.requester?.photo_url ?? null}
                              size={40}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm-medium text-gray-light/900">
                              {value?.requester?.name ?? ''}
                            </p>
                            <p className="text-sm-regular text-gray-light/600">
                              {value?.requester?.role ?? ''}
                            </p>
                          </div>
                        </div>
                      )}
                    />
                    <MyColumn
                      alignment="right"
                      body={(approval) => (
                        <div className="flex items-center justify-end gap-1">
                          <MyButton
                            onClick={() =>
                              handleCurrentSlider(
                                {
                                  status: true,
                                  current: 'details-slider',
                                },
                                approval
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
                        </div>
                      )}
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

export default Approval
