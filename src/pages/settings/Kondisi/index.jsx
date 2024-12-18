import React, { useEffect } from 'react'
import { debounce } from 'lodash'
import {
  Edit01,
  Plus,
  UploadCloud02,
  SearchLg,
  FilterLines,
  DownloadCloud02,
  RefreshCcw01,
} from '@untitled-ui/icons-react'

import FormSlider from './Sliders/FormSlider'
import ImportSlider from './Sliders/ImportSlider'
import { useCondition } from './context'
import { useApp } from '../../../AppContext'
import { Access } from '../../../services/Helper'
import MyModalSlider from '../../../components/ModalSlider/MyModalSlider'
import MyChip from '../../../components/Chip/MyChip'
import MyButton from '../../../components/Button/MyButton'
import MyArchiveButton from '../../../components/Button/MyArchiveButton'
import MyTextField from '../../../components/TextField/MyTextField'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'

function Condition() {
  const {
    currentSlider,
    handleCurrentSlider,
    conditions,
    params,
    setParams,
    setWarehouses,
    restoreWarehouse,
    bulkDeleteWarehouse,
  } = useCondition()

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'form-slider'}
        element={<FormSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      {/* <MyModalSlider
        open={currentSlider?.current === 'import-slider'}
        element={<ImportSlider />}
        onClose={() => handleCurrentSlider(null)}
      /> */}
      <div className="w-full px-8">
        <div className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 px-4 pt-5">
              <div className="flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg-semibold text-gray-light/900">
                    Database kondisi
                  </p>
                  <MyChip
                    label={`${conditions?.meta?.total ?? ''} item`}
                    rounded="full"
                    color="modern"
                    variant="outlined"
                    size="sm"
                  />
                </div>
                <p className="text-sm-regular text-gray-light/600">
                  List of condition databases.
                </p>
              </div>
              <div className="flex items-start justify-start gap-3">
                {/* <MyButton
                  // onClick={handleDownloadExport}
                  color="primary"
                  variant="outlined"
                  size="md"
                >
                  <DownloadCloud02 className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">Export</span>
                </MyButton> */}

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
                  <UploadCloud02 className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">Import</span>
                </MyButton>
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
                  <span className="text-sm-semibold">New warehouse</span>
                </MyButton> */}
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
                currentFilters={conditions?.filter}
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
              values={conditions}
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
              onDeleteAll={bulkDeleteWarehouse}
              selectionMode="multiple"
              onSelectionChange={(value) => setWarehouses(value)}
            >
              <MyColumn
                field="name"
                header="Name"
                isArchived={params.archive}
                body={({ name }) => (
                  <p className="text-sm-medium text-gray-light/900">{name}</p>
                )}
              />
              {/* <MyColumn
                field="Warehouse name"
                header="Code"
                isArchived={params.archive}
                body={(warehouse) => (
                  <p className="text-sm-medium text-gray-light/900">
                    {warehouse?.code ?? '-'}
                  </p>
                )}
              /> */}
              <MyColumn
                field=""
                header="Deskripsi"
                body={({ description }) => (
                  <p className="text-sm-regular text-gray-light/600">
                    {description}
                  </p>
                )}
              />
              {/* <MyColumn
                field="technician"
                header="Technician"
                body={(value) => {
                  const techniciannames = value?.warehouse_users
                    ?.map((val) => val?.user?.name)
                    .filter(Boolean)

                  const maxChipsToShow = 3
                  const additionalCount =
                    techniciannames.length - maxChipsToShow

                  return techniciannames.length > 0 ? (
                    <>
                      {techniciannames
                        .slice(0, maxChipsToShow)
                        .map((name, index) => (
                          <MyChip
                            key={index}
                            label={name}
                            rounded="lg"
                            color="modern"
                            variant="outlined"
                            size="sm"
                          />
                        ))}
                      {additionalCount > 0 && (
                        <MyChip
                          label={`+${additionalCount}`}
                          rounded="lg"
                          color="modern"
                          variant="outlined"
                          size="sm"
                        />
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign: 'left', width: '100%' }}>-</div>
                  )
                }}
              /> */}
              <MyColumn
                field="Data property"
                header="Data property"
                body={(warehouse) => (
                  <p className="text-sm-regular text-gray-light/600">
                    {warehouse.immune === true
                      ? 'Immutable identifier'
                      : 'Mutable'}
                  </p>
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
                          restoreWarehouse(warehouse.id)
                        }}
                        size="md"
                        variant="text"
                      >
                        <RefreshCcw01
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

export default Condition
