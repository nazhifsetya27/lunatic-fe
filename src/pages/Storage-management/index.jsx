import React, { useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import { Box, Stack } from '@mui/material'
import { debounce, pick } from 'lodash'
import {
  Edit01,
  Plus,
  UploadCloud02,
  SearchLg,
  RefreshCcw01,
  Trash01,
  LinkExternal02,
  FilterLines,
} from '@untitled-ui/icons-react'

import FormSliderNewRackManagement from './Sliders/FormSlider'
import DetailSlider from './Sliders/DetailSlider'
import { useStorageManagement } from './context'
import FormSliderDetailRackManagement from './Sliders/DetailSlider'
import { useApp } from '../../AppContext'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import MyAsyncDropdown from '../../components/Autocomplete/MyAsyncDropdown'
import MyChip from '../../components/Chip/MyChip'
import MyTextField from '../../components/TextField/MyTextField'
import MyDataTable from '../../components/Table/MyDataTable'
import MyColumn from '../../components/Table/MyColumn'
import MyButton from '../../components/Button/MyButton'
import MyBgPatternDecorativeCircle from '../../components/Decorative/MyBgPatternDecorativeCircle'

function StorageManagement() {
  const { user } = useApp()
  const {
    storageManagement,
    setRackManagement,
    setParams,
    currentSlider,
    handleCurrentSlider,
    params,
    getRackManagement,
    bulkDeleteRackManagement,
    searchUnitList,
    deleteRackManagement,
    createRackManagement,
    unit,
    getStorageManagement,
  } = useStorageManagement()

  // console.log('storageManagement: ', storageManagement)

  useEffect(() => {
    setParams((value) => ({
      ...value,
      unit: pick(unit?.find((e) => e) ?? {}, ['id', 'name']),
    }))
  }, [unit])

  useEffect(() => {
    getStorageManagement(params?.unit?.id)
  }, [params])

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'detail-slider'}
        element={<DetailSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'form-new-rack-type'}
        element={<FormSliderNewRackManagement />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'form-detail-slider'}
        element={<FormSliderDetailRackManagement />}
        onClose={() => handleCurrentSlider(null)}
      />
      {/* <MyModalSlider
        open={currentSlider?.current === 'import-slider'}
        element={<ImportSlider />}
        onClose={() => handleCurrentSlider(null)}
      /> */}
      <SimpleBar
        forceVisible="y"
        className="flex-1"
        style={{ height: '100vh' }}
      >
        <main className="flex h-full flex-col gap-8 p-8 pb-12">
          <Stack className="gap-6">
            <Stack className="gap-1">
              <div className="flex gap-8">
                <Box className="display-sm-semibold text-gray-light/900">
                  Storage management
                </Box>
                <div className="flex-1">
                  <MyAsyncDropdown
                    // disableClearable
                    name="unit"
                    placeholder="Select unit"
                    value={params?.unit}
                    onChange={(e, value) => {
                      setParams((p) => ({
                        ...p,
                        unit: value,
                        page: 1,
                      }))
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(e) => e?.name}
                    asyncFunction={searchUnitList}
                    extraData={{ user_id: user?.id }}
                    disabled={user?.warehouses?.length < 2}
                  />
                </div>
              </div>
              <Box className="text-gray-light/600">
                Manage Storage in this unit.
              </Box>
            </Stack>
          </Stack>
          {storageManagement?.data?.length > 0 || params.search ? (
            <div className="w-full justify-center">
              <div className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 px-4 pt-5">
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg-semibold text-gray-light/900">
                          List of storage
                        </p>
                        <MyChip
                          label={`${storageManagement?.meta?.total ?? '-'} item`}
                          rounded="md"
                          color="modern"
                          variant="outlined"
                          size="sm"
                        />
                      </div>
                      <p className="text-sm-regular text-gray-light/600">
                        Manage storage in this unit.
                      </p>
                    </div>
                    <div className="flex flex-1 items-start justify-start gap-3">
                      <div className="flex-1" />
                      <div
                      // className={${access?.add ? 'visible' : 'invisible'}}
                      />
                    </div>
                    <div className="flex items-start justify-start gap-3">
                      {/* <MyButton
                        onClick={() =>
                          handleCurrentSlider({
                            status: true,
                            current: 'import-slider',
                          })
                        }
                        color="secondary"
                        variant="outlined"
                        size="md"
                      >
                        <UploadCloud02
                          className="size-5"
                          stroke="currentColor"
                        />
                        <span className="text-sm-semibold">Import</span>
                      </MyButton> */}
                    </div>
                  </div>
                  <hr className="border-gray-light/200" />
                </div>

                <div className="flex items-center justify-start gap-3 border-b border-gray-light/200 px-4 py-3">
                  <div className="flex flex-1 items-center justify-end gap-3">
                    <div className="w-full max-w-[375px]">
                      <MyTextField
                        placeholder="Search"
                        id="input-search"
                        startAdornment={
                          <SearchLg
                            className="size-5 text-gray-light/500"
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
                  </div>
                </div>
                <div>
                  <MyDataTable
                    values={storageManagement ?? []}
                    paginator
                    onChangePagination={(page) => {
                      setParams((value) => ({ ...value, page }))
                    }}
                    onDeleteAll={bulkDeleteRackManagement}
                    selectionMode={
                      storageManagement?.data?.length != 0 ? 'multiple' : false
                    }
                    onSelectionChange={(value) => setRackManagement(value)}
                  >
                    {storageManagement?.uniqueChildren?.map((child, index) => (
                      <MyColumn
                        key={index}
                        field={child}
                        header={child}
                        body={(value) => (
                          <p className="text-sm-medium text-gray-light/900">
                            {value[child]?.name ? (
                              value[child].name
                            ) : value[child] ? (
                              <MyChip
                                label={`${value[child]} ${child}`}
                                rounded="md"
                                color="modern"
                                variant="outlined"
                                size="sm"
                              />
                            ) : (
                              '-'
                            )}
                          </p>
                        )}
                      />
                    )) ?? (
                      <MyColumn
                        // key={index}
                        sortable
                        field=""
                        header=""
                        body={(value) => (
                          <p className="text-sm-medium text-gray-light/900">
                            ssds
                          </p>
                        )}
                      />
                    )}
                    <MyColumn
                      alignment="right"
                      body={(value) => (
                        <div className="flex items-center justify-end gap-1">
                          <MyButton
                            onClick={() => deleteRackManagement(value.id)}
                            size="md"
                            variant="text"
                          >
                            <Trash01
                              className="size-5 text-gray-light/600"
                              stroke="currentColor"
                            />
                          </MyButton>
                          <MyButton
                            onClick={() =>
                              handleCurrentSlider(
                                {
                                  status: true,
                                  current: 'form-detail-slider',
                                  data: { category: 'Lantai' },
                                },
                                value.Gedung.id
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
                <div className="flex items-center justify-start gap-3 border-b border-gray-light/200 px-4 py-3">
                  <MyButton
                    // onClick={async () => {
                    //   try {
                    //     const uniqueChild = storageManagement.uniqueChildren[0]
                    //     const childData = storageManagement.data[0][uniqueChild]
                    //     const data = {
                    //       index: 1,
                    //       rack_category_id: childData.id,
                    //       type: childData.category,
                    //       warehouse_id: params?.warehouse_id,
                    //     }

                    //     await createRackManagement(data)

                    //     // handleCurrentSlider({
                    //     //   status: true,
                    //     //   current: 'form-new-rack-type',
                    //     // });
                    //   } catch (error) {
                    //     console.error('Error creating rack management:', error)
                    //   }
                    // }}
                    onClick={() =>
                      handleCurrentSlider({
                        status: true,
                        current: 'form-new-rack-type',
                        data: { unit_id: params?.unit?.id },
                      })
                    }
                    color="primary"
                    variant="text"
                    size="md"
                  >
                    <Plus className="size-5" stroke="currentColor" />
                    <span className="text-sm-semibold">Tambah gedung</span>
                  </MyButton>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-gray-light/200 shadow-shadows/shadow-xs">
              <div className="flex max-w-[375px] flex-col items-center gap-2.5">
                <div>
                  <MyBgPatternDecorativeCircle>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-light/200 text-gray-light/700">
                      <SearchLg size={28} stroke="currentColor" />
                    </div>
                  </MyBgPatternDecorativeCircle>
                </div>
                <div className="z-20 flex flex-col gap-2 text-center">
                  <p className="text-xl-semibold text-gray-light/900">
                    Database storage tidak ditemukan
                  </p>
                  <p className="text-md-regular text-gray-light/600">
                    Tidak ada data storage yang ditemukan. Silahkan tambahkan
                    terlebih dahulu.
                  </p>
                </div>
                <div className="z-10">
                  <MyButton
                    onClick={() =>
                      handleCurrentSlider({
                        status: true,
                        current: 'form-new-rack-type',
                      })
                    }
                    color="primary"
                    variant="filled"
                    size="md"
                  >
                    <Plus className="size-5" stroke="currentColor" />
                    <span className="text-sm-semibold">Tambah gedung</span>
                  </MyButton>
                </div>
              </div>
            </div>
          )}
        </main>
      </SimpleBar>
    </>
  )
}

export default StorageManagement
