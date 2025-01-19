import React, { useEffect, useState } from 'react'
import { Check, XClose } from '@untitled-ui/icons-react'
import SimpleBar from 'simplebar-react'
import moment from 'moment'
import MyDetailView from '../../../components/TabView/MyTabView'
import MyButton from '../../../components/TabView/MyTabPanel'
import { useApproval } from '../context'
import { useApp } from '../../../AppContext'
import { Access } from '../../../services/Helper'

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

  const [approvalDetails, setApprovalDetails] = useState()

  const data = currentSlider?.id
  // const category = data?.category
  console.log(data, '<<<annnan')

  useEffect(() => {
    if (data.id) {
      getDetail(data.id).then((approval) => {
        setApprovalDetails(approval)
      })
    }
  }, [currentTabs])

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
            className={`mb-4 ${data?.status !== 'Approved' ? 'visible' : 'hidden'}`}
            // className={`mb-4 ${access?.add && data.status === 'open' ? 'visible' : 'hidden'}`}
          >
            <MyButton
              color="primary"
              variant="filled"
              size="md"
              // onClick={() => approve(data.id, { category: data.category })}
              disabled={data?.status === 'Approved'}
            >
              <Check />
              <p className="text-sm-semibold">Approve</p>
            </MyButton>
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
                  datas={approvalDetails?.general_information || {}}
                  field="serial_number"
                  func={{
                    'Created date': (value) =>
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
