import React, { useEffect, useState } from 'react'
import { Check, XClose } from '@untitled-ui/icons-react'
import SimpleBar from 'simplebar-react'
import moment from 'moment'
import MyButton from '../../../components/Button/MyButton'
import { useApproval } from '../context'
import { useApp } from '../../../AppContext'
import MyDetailView from '../../../components/DetailView/MyDetailView'
import { Access } from '../../../services/Helper'
import { default as PActionMenu } from '../sliders/Menu'

function DetailSlider() {
  const { getAccess } = useApp()
  // const access = getAccess(Access?.APPROVAL)

  const {
    handleCurrentSlider,
    setCurrentModalTabs,
    currentTabs,
    currentSlider,
    getDetail,
    approvalDetail,
    approve,
  } = useApproval()

  const data = currentSlider.id

  useEffect(() => {
    if (data.id) getDetail(data?.id)
  }, [])

  return (
    <div className="flex h-screen w-[375px] flex-col">
      <header className="gap- relative flex flex-col px-4">
        <div className="relative flex items-start gap-x-4 pb-4 pt-8">
          <button className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400">
            <XClose
              onClick={() => handleCurrentSlider(null)}
              size={24}
              stroke="currentColor"
            />
          </button>
          <div className="flex flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">
              Stock adjustment
            </p>
            <p className="text-md-regular text-gray-light/600">{data?.name}</p>
          </div>
        </div>
        <div className="flex">
          {/* <div className="mb-4 flex-1">
            <MyButton
              color="primary"
              variant="outlined"
              size="md"
              onClick={() =>
                handleCurrentSlider(
                  {
                    status: true,
                    current:
                      category === 'stock-adjustment'
                        ? 'details-item'
                        : 'summary-slider-open',
                    data,
                    origin: 'approval',
                    category,
                  },
                  data?.id
                )
              }
            >
              <p className="text-sm-semibold">Details</p>
            </MyButton>
          </div> */}
          <div
            className={`mb-4 ${data?.status === 'Waiting for approval' ? 'visible' : 'hidden'} flex gap-2`}
            // className={`mb-4 ${access?.add && data.status === 'open' ? 'visible' : 'hidden'}`}
          >
            <PActionMenu
              target={(open, handleClick) => (
                <MyButton
                  onClick={handleClick}
                  color={'primary'}
                  variant={'filled'}
                  size={'sm'}
                  disabled={data?.status !== 'Waiting for approval'}
                >
                  <Check size={20} stroke={'currentColor'} />
                  <p className="text-sm-semibold">Approve</p>
                </MyButton>
              )}
              data={{ status: 'Approved' }}
            />
            <PActionMenu
              target={(open, handleClick) => (
                <MyButton
                  onClick={handleClick}
                  color={'error'}
                  variant={'filled'}
                  size={'sm'}
                  disabled={data?.status !== 'Waiting for approval'}
                >
                  <XClose size={20} stroke={'currentColor'} />
                  <p className="text-sm-semibold">Reject</p>
                </MyButton>
              )}
              data={{ status: 'Rejected' }}
            />
          </div>
        </div>

        <hr className="border-gray-light/200" />
      </header>

      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <div className="flex flex-1 flex-col gap-8 pb-8 pt-4">
            <div className="flex flex-col gap-6">
              <div className="flex-col px-4">
                <p className="text-sm-semibold text-gray-light/700">
                  General information
                </p>
                <p className="text-sm-regular text-gray-light/600">
                  Detail general information.
                </p>
              </div>
              <div className="flex flex-1 flex-col">
                <MyDetailView
                  datas={approvalDetail?.general_information || {}}
                  field="serial_number"
                  func={{
                    'Created at': (value) =>
                      moment(value).format('DD MMM YYYY • HH:mm'),
                    'Updated at': (value) =>
                      moment(value).format('DD MMM YYYY • HH:mm'),
                  }}
                />
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default DetailSlider
