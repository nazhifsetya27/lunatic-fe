// import {
//   DownloadCloud02,
//   FilterLines,
//   LinkExternal02,
//   Package,
//   Plus,
//   RefreshCcw01,
//   SearchLg,
//   UploadCloud02,
// } from '@untitled-ui/icons-react'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import moment from 'moment'
// import {
//   MyArchiveButton,
//   MyButton,
//   MyChip,
//   MyColumn,
//   MyDataTable,
//   MyFilterModal,
//   MyModalSlider,
//   MyTextField,
//   MyTooltip,
// } from '@interstellar-component'
import { Box, Divider, Stack } from '@mui/material'
import { Download, Plus, Search, Upload } from '@icon-park/react'
import { LinkExternal02 } from '@untitled-ui/icons-react'
import MyChip from '../../../components/Chip/MyChip'
import MyButton from '../../../components/Button/MyButton'
import MyTextField from '../../../components/TextField/MyTextField'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'

// import FormSlider from './Sliders/FormSlider'
import { useFurniture } from './context'
// import DetailSlider from './Sliders/DetailSlider'
// import ImportSlider from './Sliders/ImportSlider'
// import { useApp } from '../../../AppContext'

function Furniture() {
  const nav = useNavigate()

  const { handleCurrentSlider, params, setParams, furnitures, setTerminals } =
    useFurniture()

  return (
    <>
      {/* <MyModalSlider
        open={currentSlider?.current === 'form-slider'}
        element={<FormSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'detail-slider'}
        element={<DetailSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'import-slider'}
        element={<ImportSlider />}
        onClose={() => handleCurrentSlider(null)}
      /> */}

      <Stack className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
        <Stack direction="row" className="gap-4 p-5">
          <Stack className="flex-1 gap-1">
            <Stack direction="row" className="items-center gap-2">
              <Box className="text-lg-semibold text-gray-light/900">
                Furniture management
              </Box>
              <MyChip
                // label={`${terminals.meta?.total ?? '-'} item`}
                label="0 item"
                rounded="full"
                color="modern"
                variant="outlined"
                size="sm"
              />
            </Stack>
            <Box className="text-sm-regular text-gray-light/600">
              List of furniture on the system.
            </Box>
          </Stack>

          <Stack direction="row" className="gap-3">
            <MyButton
              // onClick={downloadExport}
              color="primary"
              variant="outlined"
              size="md"
            >
              <Download className="size-5" stroke="currentColor" />
              <span className="text-sm-semibold">Export</span>
            </MyButton>

            <MyButton
              // onClick={() =>
              //   handleCurrentSlider({
              //     status: true,
              //     current: 'import-slider',
              //   })
              // }
              color="secondary"
              variant="outlined"
              size="md"
            >
              <Upload className="size-5" stroke="currentColor" />
              <span className="text-sm-semibold">Import</span>
            </MyButton>
            <MyButton
              // onClick={() =>
              //   handleCurrentSlider({
              //     status: true,
              //     current: 'form-slider',
              //   })
              // }
              color="primary"
              variant="filled"
              size="md"
            >
              <Plus className="size-5" stroke="currentColor" />
              <span className="text-sm-semibold">New furniture</span>
            </MyButton>
          </Stack>
        </Stack>

        <Divider className="border-gray-light/200" />

        <Stack direction="row" className="items-center justify-start gap-3 p-4">
          {/* <MyArchiveButton
            isUnavailable
            value={params}
            onChange={(e) => {
              setParams((value) => ({ ...value, archive: e, page: 1 }))
            }}
          /> */}
          <Stack
            direction="row"
            className="flex-1 items-center justify-end gap-3"
          >
            <div className="w-full max-w-[375px]">
              <MyTextField
                placeholder="Search"
                id="input-search"
                startAdornment={
                  <Search
                    className="size-5 text-gray-light/500"
                    stroke="currentColor"
                  />
                }
                // onChangeForm={debounce(
                //   (e) =>
                //     setParams((value) => ({
                //       ...value,
                //       search: e.target.value,
                //       page: 1,
                //     })),
                //   300
                // )}
              />
            </div>
            {/* <MyFilterModal
              id="filter-terminal"
              currentFilters={terminals?.filter}
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
          </Stack>
        </Stack>

        <div>
          <MyDataTable
            paginator
            values={furnitures}
            selectionMode="multiple"
            // onDeleteAll={bulkDeleteTerminal}
            // onSelectionChange={(value) => setTerminals(value)}
            // onClick={(value) => {
            //   if (params.archive)
            //     handleCurrentSlider(
            //       { status: true, current: 'form-slider' },
            //       value.id
            //     )
            // }}
            // onChangePagination={(page) => {
            //   setParams((value) => ({ ...value, page }))
            // }}
          >
            <MyColumn
              header="Name"
              // hideCheckBoxHeader
              // isArchived={params.archive}
              body={({ name }) => (
                <Box className="text-sm-medium text-gray-light/900">
                  {name ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Kode"
              hideCheckBoxHeader
              // isArchived={params.archive}
              body={({ kode }) => (
                <Box className="text-sm-medium text-gray-light/900">
                  {kode ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Quantity"
              body={({ quantity }) => (
                <Box className="text-sm-regular text-gray-light/600">
                  {quantity ?? '-'}
                </Box>
              )}
            />
            {/* <MyColumn
              alignment="right"
              body={(value) =>
                params.archive !== 1 ? (
                  <MyButton
                    // onClick={() => {
                    //   handleCurrentSlider(
                    //     { status: true, current: 'detail-slider' },
                    //     value?.id
                    //   )
                    // }}
                    size="md"
                    variant="text"
                  >
                    <LinkExternal02
                      className="size-5 text-gray-light/600"
                      stroke="currentColor"
                    />
                  </MyButton>
                ) : (
                  <MyButton
                    onClick={(e) => {
                      e.stopPropagation()
                      restoreTerminal(value?.id)
                    }}
                    size="md"
                    variant="text"
                  >
                    <RefreshCcw01
                      className="size-5 text-gray-light/600"
                      stroke="currentColor"
                    />
                  </MyButton>
                )
              }
            /> */}
          </MyDataTable>
        </div>
      </Stack>
    </>
  )
}

export default Furniture