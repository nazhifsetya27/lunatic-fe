import { debounce } from 'lodash'
import { Box, Divider, Stack } from '@mui/material'
import { Download, Plus, Refresh, Search, Upload } from '@icon-park/react'
import { FilterLines, LinkExternal02, Save03 } from '@untitled-ui/icons-react'
import MyChip from '../../../components/Chip/MyChip'
import MyButton from '../../../components/Button/MyButton'
import MyTextField from '../../../components/TextField/MyTextField'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'

// import FormSlider from './Sliders/FormSlider'
import { useElektronik } from './context'
import MyArchiveButton from '../../../components/Button/MyArchiveButton'
import MyModalSlider from '../../../components/ModalSlider/MyModalSlider'
import DetailSlider from './Sliders/DetailSlider'
import FormSlider from './Sliders/FormSlider'
import MyFilterModal from '../../../components/Modal/MyFilterModal'
import { useApp } from '../../../AppContext'
// import DetailSlider from './Sliders/DetailSlider'
import ImportSlider from './Sliders/ImportSlider'
import MyConfirmModal from '../../../components/Modal/MyConfirmModal'
// import { useApp } from '../../../AppContext'

function Elektronik() {
  const { user } = useApp()

  const {
    handleCurrentSlider,
    params,
    setParams,
    elektronics,
    restoreElektronik,
    currentSlider,
    downloadExport,
    isConfirmModalOpen,
    setConfirmModalOpen,
    deleteElektronik,
  } = useElektronik()

  return (
    <>
      <MyModalSlider
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
      />
      <MyConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          deleteElektronik(currentSlider.id)
          setConfirmModalOpen(false)
        }}
        message="Are you sure want to delete?"
        icon={<Save03 className="text-warning/600" />}
        bgColor="bg-error/100"
      />
      <Stack className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
        <Stack direction="row" className="gap-4 p-5">
          <Stack className="flex-1 gap-1">
            <Stack direction="row" className="items-center gap-2">
              <Box className="text-lg-semibold text-gray-light/900">
                Elektronik management
              </Box>
              <MyChip
                label={`${elektronics.meta?.total ?? '-'} item`}
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
              onClick={downloadExport}
              color="primary"
              variant="outlined"
              size="md"
            >
              <Download className="size-5" stroke="currentColor" />
              <span className="text-sm-semibold">Export</span>
            </MyButton>

            <MyButton
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
              <Upload className="size-5" stroke="currentColor" />
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
              <span className="text-sm-semibold">Asset elektronik</span>
            </MyButton>
          </Stack>
        </Stack>

        <Divider className="border-gray-light/200" />

        <Stack direction="row" className="items-center justify-start gap-3 p-4">
          <MyArchiveButton
            value={params}
            onChange={(e) => {
              setParams((value) => ({ ...value, archive: e, page: 1 }))
            }}
          />
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
                onChangeForm={debounce(
                  (e) =>
                    setParams((value) => ({
                      ...value,
                      search: e.target.value,
                      page: 1,
                    })),
                  300
                )}
              />
            </div>
            <MyFilterModal
              id="filter-terminal"
              currentFilters={elektronics?.filter}
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
            />
          </Stack>
        </Stack>

        <div>
          <MyDataTable
            paginator
            values={elektronics}
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
              header="Code"
              hideCheckBoxHeader
              // isArchived={params.archive}
              body={({ kode }) => (
                <Box className="text-sm-medium text-gray-light/900">
                  {kode ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Condition"
              body={({ condition }) => (
                <Box className="text-sm-regular text-gray-light/600">
                  {condition?.name ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Unit"
              body={({ storage }) => (
                <Box className="text-sm-regular text-gray-light/600">
                  {storage?.unit?.name ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Building"
              body={({ storage }) => (
                <Box className="text-sm-regular text-gray-light/600">
                  {storage?.building?.name ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Floor"
              body={({ storage }) => (
                <Box className="text-sm-regular text-gray-light/600">
                  {storage?.storage_floor?.name ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              header="Room"
              body={({ storage }) => (
                <Box className="text-sm-regular text-gray-light/600">
                  {storage?.storage_room?.name ?? '-'}
                </Box>
              )}
            />
            <MyColumn
              alignment="right"
              body={(value) =>
                params.archive !== 1 ? (
                  <MyButton
                    onClick={() => {
                      handleCurrentSlider(
                        { status: true, current: 'detail-slider' },
                        value?.id
                      )
                    }}
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
                      restoreElektronik(value?.id)
                    }}
                    size="md"
                    variant="text"
                  >
                    <Refresh
                      className="size-5 text-gray-light/600"
                      stroke="currentColor"
                    />
                  </MyButton>
                )
              }
            />
          </MyDataTable>
        </div>
      </Stack>
    </>
  )
}

export default Elektronik
