// Libraries
import React from 'react'
import moment from 'moment'
import MyChip from '../../../../components/Chip/MyChip'
import MyAvatar from '../../../../components/Avatar/MyAvatar'
import SimpleBar from 'simplebar-react'
import MyDetailView from '../../../../components/DetailView/MyDetailView'

const General = ({ userDetails }) => {
  return (
    <SimpleBar forceVisible="y" style={{ height: '100%' }}>
      <div className="flex flex-col gap-8 py-6">
        <div className="flex flex-col gap-6">
          {/* SECTION 1 */}
          <div className="w-max-[280px] flex w-full flex-col gap-1 px-4">
            <p className="text-sm-semibold text-gray-light/700">
              Personal information
            </p>
            <p className="text-sm-regular text-gray-light/600">
              Detailed personal information
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <MyDetailView
              datas={
                userDetails?.general?.personal
                  ? userDetails?.general?.personal
                  : {}
              }
              func={{
                Coverage: (value) => (
                  <div className="flex flex-wrap justify-end gap-3">
                    {value.map((e, i) => {
                      return (
                        <div>
                          <MyChip
                            color={'modern'}
                            variant={'outlined'}
                            size={'md'}
                            rounded={'md'}
                            label={e.name}
                          />
                        </div>
                      )
                    })}
                  </div>
                ),
              }}
            />
          </div>
          {/* SECTION 2 */}
          {userDetails?.general?.manager?.Manager && (
            <div className="flex w-full flex-col gap-4 px-4">
              <p className="text-sm-medium text-gray-light/700">Report to</p>
              <div className="flex items-center gap-3">
                <MyAvatar
                  photo={
                    userDetails?.general?.manager?.Manager?.photo_url ?? null
                  }
                  size={40}
                />
                <div>
                  <p className="text-md-semibold text-gray-light/700">
                    {userDetails?.general?.manager?.Manager?.name ?? null}
                  </p>
                  <p className="text-sm-regular text-gray-light/700">
                    {userDetails?.general?.manager?.Manager?.role?.name ?? null}
                  </p>
                </div>
              </div>
            </div>
          )}
          <hr className="mx-4 border-gray-light/200" />
          {/* SECTION 3 */}
          <div className="w-max-[280px] flex w-full flex-col gap-1 px-4">
            <p className="text-sm-semibold text-gray-light/700">
              General information
            </p>
            <p className="text-sm-regular text-gray-light/600">
              Detailed general information
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <MyDetailView
              datas={
                userDetails?.general?.general
                  ? userDetails?.general?.general
                  : {}
              }
              func={{
                Status: (value) => (value ? 'Active' : 'Inactive'),
                'Tanggal dibuat': (value) =>
                  moment(value).format('DD MMM YYYY • HH:mm'),
                'Terakhir diperbarui' : (value) =>
                  moment(value).format('DD MMM YYYY • HH:mm'),
              }}
            />
          </div>
          <div className="px-4">
            <hr className="border-gray-light/200" />
          </div>
        </div>
      </div>
    </SimpleBar>
  )
}

export default General
