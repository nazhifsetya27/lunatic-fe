/* eslint-disable react/self-closing-comp */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react'
import {
  FilterLines,
  Edit01,
  Plus,
  UploadCloud02,
  LinkExternal02,
  DownloadCloud02,
  RefreshCcw01,
  SearchLg,
} from '@untitled-ui/icons-react'
import { debounce } from 'lodash'
import { Box, Stack } from '@mui/material'
import { useUser } from './context'
import MyTextField from '../../components/TextField/MyTextField'
import MyDataTable from '../../components/Table/MyDataTable'
import MyColumn from '../../components/Table/MyColumn'
import MySwicth from '../../components/Switch/MySwitch'
import MyAvatar from '../../components/Avatar/MyAvatar'
// import MyFilterModal from '../../components/Modal/MyFilterModal'
import MyPagination from '../../components/Pagination/MyPagination'
// import { default as MUser } from './modal'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import MyButtonGroup from '../../components/Button/MyButtonGroup'
// import DetailSlider from './Sliders/DetailSlider'
// import ImportSlider from './Sliders/ImportSlider'
import MyArchiveButton from '../../components/Button/MyArchiveButton'
import MyChip from '../../components/Chip/MyChip'
import MyButton from '../../components/Button/MyButton'
import DetailSlider from './Sliders/DetailSlider'
import { default as MUser } from './modal'

const User = () => {
  const {
    currentSlider,
    users,
    getUsers,
    setUsers,
    params,
    setParams,
    handleCurrentSlider,
    setCurrentTabs,
  } = useUser()

  useEffect(() => {
    getUsers()
  }, [params])

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'user'}
        element={<MUser />}
        onClose={() => handleCurrentSlider(null)}
      />
      <MyModalSlider
        open={currentSlider?.current === 'details-slider'}
        element={<DetailSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      {/* <MyModalSlider
        open={currentSlider?.current === 'import-slider'}
        element={<ImportSlider />}
        onClose={() => handleCurrentSlider(null)}
      /> */}
      <main className="flex flex-col gap-6 px-8">
        <header className="mt-8">
          <Stack className="gap-1">
            <Box className="display-sm-semibold text-gray-light/900">
              User management
            </Box>
            <Box className="text-gray-light/600">
              Manage user on the system.
            </Box>
          </Stack>
        </header>
        <div className="w-full">
          <div className="w-full rounded-xl border border-gray-light/200 shadow-shadows/shadow-xs">
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 px-4 pt-5">
                <div className="flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg-semibold text-gray-light/900">User</p>
                    <MyChip
                      label={`${users?.meta?.total ?? ''} user`}
                      rounded="lg"
                      color="modern"
                      variant="outlined"
                      size="sm"
                    />
                  </div>
                  <p className="text-sm-regular text-gray-light/600">
                    List of individuals role and reporting.
                  </p>
                </div>

                <div className="flex items-start justify-start gap-3">
                  {/* <MyButton
                    // onClick={handleDownloadExport}
                    color="primary"
                    variant="outlined"
                    size="md"
                  >
                    <DownloadCloud02 size={20} stroke="currentColor" />
                    <p className="text-sm-semibold">Export</p>
                  </MyButton> */}
                  {/* <div>
                    <MyButton
                      color="secondary"
                      variant="outlined"
                      size="md"
                      onClick={() =>
                        handleCurrentSlider({
                          status: true,
                          current: 'import-slider',
                        })
                      }
                    >
                      <UploadCloud02 size={20} stroke="currentColor" />
                      <p className="text-sm-semibold">Import</p>
                    </MyButton>
                  </div> */}

                  <div>
                    <MyButton
                      onClick={() =>
                        handleCurrentSlider({ status: true, current: 'user' })
                      }
                      color="primary"
                      variant="filled"
                      size="md"
                    >
                      <Plus size={20} stroke="currentColor" />
                      <p className="text-sm-semibold">New user</p>
                    </MyButton>
                  </div>
                </div>
              </div>
              <hr className="border-gray-light/200" />
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-gray-light/200 px-4 py-3">
              <MyArchiveButton
                value={params}
                onChange={(e) => {
                  setParams((value) => ({ ...value, archive: e, page: 1 }))
                }}
              />
              <div className="flex flex-1 items-center justify-end gap-3">
                <div className="w-full max-w-[400px]">
                  <MyTextField
                    placeholder="Search"
                    id="input-search"
                    startAdornment={
                      <SearchLg
                        size={20}
                        className="text-gray-light/500"
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
                      800
                    )}
                  />
                </div>
                {/* <MyFilterModal
                id={'filter-ticketing'}
                currentFilters={users?.filter}
                onChange={(filter) => {
                  setParams((params) => {
                    return { ...params, filter, page: 1, search: '' }
                  })
                }}
                target={(open, handleClick) => (
                  <MyButton
                    removeWhite
                    onClick={handleClick}
                    color={'secondary'}
                    variant={'outlined'}
                    size={'md'}
                  >
                    <FilterLines size={20} stroke={'currentColor'} />
                    <p className="text-sm-semibold">Filters</p>
                  </MyButton>
                )}
              /> */}
              </div>
            </div>
            <div>
              <MyDataTable
                paginator
                values={users}
                // onDeleteAll={bulkDeleteUser}
                selectionMode="multiple"
                onSelectionChange={(value) => setUsers(value)}
                onChangePagination={(page) => {
                  setParams((value) => ({ ...value, page }))
                }}
                // onClick={(value) => {
                //   params.archive &&
                //     1 &&
                //     handleCurrentSlider(
                //       { status: true, current: 'user' },
                //       value.id
                //     )
                // }}
              >
                <MyColumn
                  field="name"
                  header="Name"
                  isArchived={params.archive}
                  body={({ role, name, photo_url }) => (
                    <div className="flex items-center gap-3">
                      <MyAvatar photo={photo_url} size={40} />
                      <div className="flex flex-col">
                        <p className="text-sm-medium text-gray-light/900">
                          {name || ''}
                        </p>
                        <p className="text-sm-regular text-gray-light/600">
                          {role || ''}
                        </p>
                      </div>
                    </div>
                  )}
                ></MyColumn>
                <MyColumn
                  field="email"
                  header="Email"
                  body={({ email }) => (
                    <p className="text-sm-regular text-gray-light/600">
                      {email || '-'}
                    </p>
                  )}
                ></MyColumn>
                <MyColumn
                  field="role"
                  header="Role"
                  body={(value) => (
                    <p className="text-sm-regular text-gray-light/600">
                      {value?.role ? value?.role : '-'}
                    </p>
                  )}
                ></MyColumn>
                <MyColumn
                  field="role"
                  header="Role"
                  body={(value) => (
                    <p className="text-sm-regular text-gray-light/600">
                      {value?.role ? value?.role : '-'}
                    </p>
                  )}
                ></MyColumn>
                <MyColumn
                  field="unit"
                  header="Unit"
                  body={(value) => (
                    <p className="text-sm-regular text-gray-light/600">
                      {value?.unit?.name ? value?.unit?.name : '-'}
                    </p>
                  )}
                ></MyColumn>
                <MyColumn
                  alignment="right"
                  body={(user) => (
                    <div className="flex items-center justify-end gap-1">
                      <MyButton
                        onClick={() => {
                          handleCurrentSlider(
                            {
                              status: true,
                              current: 'details-slider',
                            },
                            user.id
                          )
                          setCurrentTabs({
                            type: 'general',
                            search: '',
                            filter: '',
                          })
                        }}
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
                ></MyColumn>
              </MyDataTable>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default User
