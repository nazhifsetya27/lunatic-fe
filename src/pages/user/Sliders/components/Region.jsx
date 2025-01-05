// Libraries
import React from 'react'

// UI Icons
import { SearchLg } from '@untitled-ui/icons-react'

// Shared Components
import MyColumn from '../../../../components/Table/MyColumn'
import MyDataTable from '../../../../components/Table/MyDataTable'
import MyMiniPagination from '../../../../components/Pagination/MyMiniPagination'
import { useUser } from '../../context'
import { debounce } from 'lodash'
import SimpleBar from 'simplebar-react'
import MyTextField from '../../../../components/TextField/MyTextField'

const Region = ({ userDetails }) => {
  const { setCurrentTabs } = useUser()
  return (
    <SimpleBar forceVisible="y" style={{ height: '100%' }}>
      <div className="flex flex-1 flex-col gap-8 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex-col px-4">
            <p className="text-sm-semibold text-gray-light/700">
              Territory information
            </p>
            <p className="text-sm-regular text-gray-light/600">
              Detailed of territory information.
            </p>
          </div>
          <div className="flex flex-col gap-3 px-4">
            <MyTextField
              name="search"
              placeholder={'Search'}
              startAdornment={
                <SearchLG
                  size={20}
                  className={'text-gray-light/500'}
                  stroke={'currentColor'}
                />
              }
              onChangeForm={debounce(
                (e) =>
                  setCurrentTabs((value) => {
                    return {
                      ...value,
                      search: e.target.value,
                      page: 1,
                    }
                  }),
                800
              )}
            />
          </div>
          <div>
            <MyDataTable
              values={{
                data: userDetails?.region?.length ? userDetails?.region : [],
              }}
            >
              <MyColumn
                field={'stock'}
                header={'Coverage'}
                body={(value) => (
                  <div className="flex flex-col">
                    <p className="text-sm-medium text-gray-light/900">
                      {value?.teritory_type === 'Zip code'
                        ? value?.coverage?.code_pos
                        : value?.coverage?.name}
                    </p>
                  </div>
                )}
              ></MyColumn>
              <MyColumn
                field={'stock'}
                header={'Territory type'}
                alignment={'left'}
                body={(value) => (
                  <div className="flex flex-col">
                    <p className="text-sm-regular capitalize text-gray-light/600">
                      {value?.teritory_type}
                    </p>
                  </div>
                )}
              ></MyColumn>
            </MyDataTable>
          </div>
          {userDetails?.meta?.total_page != 1 && (
            <div className="mx-4 flex-col border-t border-gray-light/200 pt-4">
              <MyMiniPagination
                meta={userDetails?.meta}
                onChange={(page) => {
                  setCurrentTabs((value) => {
                    return { ...value, page: page }
                  })
                }}
              />
            </div>
          )}
        </div>
      </div>
    </SimpleBar>
  )
}

export default Region
