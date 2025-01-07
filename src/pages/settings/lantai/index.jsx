import React, { useEffect } from 'react'
import { debounce } from 'lodash'
import {
  Edit01,
  Plus,
  SearchLg,
  FilterLines,
  RefreshCcw01,
} from '@untitled-ui/icons-react'

import { Refresh } from '@icon-park/react'
import FormSlider from './Sliders/FormSlider'
import { useFloor } from './context'
import MyModalSlider from '../../../components/ModalSlider/MyModalSlider'
import MyChip from '../../../components/Chip/MyChip'
import MyButton from '../../../components/Button/MyButton'
import MyArchiveButton from '../../../components/Button/MyArchiveButton'
import MyTextField from '../../../components/TextField/MyTextField'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'

function Floor() {
  const {
    currentSlider,
    handleCurrentSlider,
    floors,
    params,
    setParams,
    setFloors,
    restoreFloor,
    bulkDeleteFloor,
  } = useFloor()

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'form-slider'}
        element={<FormSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <div className="w-full px-8">
        <div className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 px-4 pt-5">
              <div className="flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg-semibold text-gray-light/900">
                    Database lantai
                  </p>
                  <MyChip
                    label={`${floors?.meta?.total ?? ''} item`}
                    rounded="full"
                    color="modern"
                    variant="outlined"
                    size="sm"
                  />
                </div>
                <p className="text-sm-regular text-gray-light/600">
                  List of lantai databases.
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
                >
                  <Plus className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">New Floor</span>
                </MyButton>
              </div>
            </div>
            <hr className="border-gray-light/200" />
          </div>
          <div className="flex items-center justify-start gap-3 border-b border-gray-light/200 px-4 py-3">
            <MyArchiveButton
              value={params}
              onChange={(e) => {
                setParams((value) => ({ ...value, archive: e, page: 1 }))
              }}
            />
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
              {/* <MyFilterModal
                id="filter-ticketing"
                currentFilters={floors?.filter}
                onChange={(filter) => {
                  setParams((prev) => ({
                    ...prev,
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
                    <FilterLines className="size-5" stroke="currentColor" />
                    <span className="text-sm-semibold">Filters</span>
                  </MyButton>
                )}
              /> */}
            </div>
          </div>
          <div>
            <MyDataTable
              values={floors}
              onClick={(value) => {
                if (params.archive)
                  handleCurrentSlider(
                    { status: true, current: 'form-slider' },
                    value.id
                  )
              }}
              paginator
              onChangePagination={(page) => {
                setParams((value) => ({ ...value, page }))
              }}
              onDeleteAll={bulkDeleteFloor}
              selectionMode="multiple"
              onSelectionChange={(value) => setFloors(value)}
            >
              <MyColumn
                field="name"
                header="Name"
                isArchived={params.archive}
                body={({ name }) => (
                  <p className="text-sm-medium text-gray-light/900">{name}</p>
                )}
              />

              <MyColumn
                field=""
                header="Kode"
                body={({ kode }) => (
                  <p className="text-sm-regular text-gray-light/600">{kode}</p>
                )}
              />

              <MyColumn
                alignment="right"
                body={(warehouse) =>
                  params.archive === 0 ? (
                    <div className="flex items-center justify-end gap-1">
                      <MyButton
                        onClick={() =>
                          handleCurrentSlider(
                            { status: true, current: 'form-slider' },
                            warehouse.id
                          )
                        }
                        size="md"
                        variant="text"
                      >
                        <Edit01
                          className="size-5 text-gray-light/600"
                          stroke="currentColor"
                        />
                      </MyButton>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1">
                      <MyButton
                        onClick={(e) => {
                          e.stopPropagation()
                          restoreFloor(warehouse.id)
                        }}
                        size="md"
                        variant="text"
                      >
                        <Refresh
                          className="size-5 text-gray-light/600"
                          stroke="currentColor"
                        />
                      </MyButton>
                    </div>
                  )
                }
              />
            </MyDataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default Floor
