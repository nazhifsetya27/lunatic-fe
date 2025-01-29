import React, { useEffect, useMemo, useState } from 'react'
import SimpleBar from 'simplebar-react'

// Custom components
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDashboard } from './context'
import MyButtonGroupV2 from '../../components/Button/MyButtonGroupV2'
import MyHorizontalTab from '../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../components/HorizontalTab/MyTabButton'
import MyDateRange from '../../components/DatePicker/MyDateRange'
import MyChartPieDonut from '../../components/Chart/MyChartPieDonut'
import MyChartBarHorizontal from '../../components/Chart/MyChartBarHorizontal'
import MyChip from '../../components/Chip/MyChip'
import MyButton from '../../components/Button/MyButton'
import {
  Calendar,
  XClose,
} from '@untitled-ui/icons-react'
import moment from 'moment'

const Dashboard = () => {
  const location = useLocation()
  const page = React.useMemo(() => {
    const path = location.pathname
    const pathIndex = path.lastIndexOf('/')
    if (pathIndex !== -1) {
      const roleValue = path.slice(pathIndex).replace('/', '')
      return roleValue
    }

    return 'user'
  }, [location])

  const { params, setParams, performance, getPerformance, searchJobCategory } =
    useDashboard()
  useEffect(() => {
    getPerformance()
  }, [params])

  return (
    <SimpleBar forceVisible="y" className="flex-1" style={{ height: '100vh' }}>
      <main className="flex flex-col gap-8 pb-12 pt-8">
        <div className="flex flex-col gap-6 px-8">
          <div className="flex flex-col gap-1">
            <p className="display-sm-semibold text-gray-light/900">
              Performance dashboard
            </p>
            <p className="text-gray-light/600">
              Tracking key performance indicators in real-time.
            </p>
          </div>
        </div>
        <Outlet />
        <div className="flex flex-col gap-8 px-8">
          <div className="flex flex-col gap-5">
            <p className="text-lg-semibold text-gray-light/900">
              Monitoring job order
            </p>
            <hr className="border-gray-light/200" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MyDateRange
                target={(open, handleClick) => (
                  <MyButton
                    onClick={handleClick}
                    color={'secondary'}
                    variant={'outlined'}
                    customClassname={'flex items-center gap-1 px-4 py-2.5'}
                  >
                    <Calendar size={20} stroke={'currentColor'} />
                    <p className="text-sm-semibold">
                      {params?.date_range?.[0]
                        ? moment(params.date_range[0]).format('D MMM YY') +
                          ' - ' +
                          moment(params.date_range[1]).format('D MMM YY')
                        : 'Select dates'}
                    </p>
                    {params?.date_range && (
                      <MyButton
                        variant={'text'}
                        color={'secondary'}
                        onClick={(e) => {
                          e.stopPropagation()
                          setParams({
                            ...params,
                            date_range: undefined,
                          })
                        }}
                      >
                        <XClose className="size-5" />
                      </MyButton>
                    )}
                  </MyButton>
                )}
                onChange={(startDate, endDate) => {
                  // console.log("startDate", startDate);
                  // console.log("endDate", endDate);
                  setParams({
                    ...params,
                    date_range: [
                      moment(startDate).format('YYYY-MM-DD'),
                      moment(endDate).format('YYYY-MM-DD'),
                    ],
                  })
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-[100px]">
              <div className="flex h-full w-[375px] flex-col gap-5">
                <div className="flex flex-col gap-5">
                  <p className="text-lg-semibold text-gray-light/900">
                    Stock adjustment summary
                  </p>
                  <hr className="border-gray-light/200" />
                </div>
                <div className="flex w-full flex-1 gap-4">
                  <div className="flex-1">
                    <MyChartPieDonut
                      values={[
                        performance?.data?.job_order_summary?.approved ?? 0,
                        performance?.data?.job_order_summary?.rejected ?? 0,
                        performance?.data?.job_order_summary
                          ?.waiting_for_approval ?? 0,
                        performance?.data?.job_order_summary?.in_progress ?? 0,
                      ]}
                      labels={[
                        'Approved',
                        'Rejected',
                        'Waiting for approval',
                        'In progress',
                      ]}
                      colors={['#106F96', '#AD2F2F', '#B5EAFF', '#55B3D9']}
                      type="donut"
                      height={500}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs-medium text-gray-light/600">
                      Approved
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      <p className="display-xs-semibold text-gray-light/900">
                        {(
                          performance?.data?.job_order_summary?.approved ?? 0
                        ).toLocaleString()}
                      </p>
                      <MyChip
                        label={(
                          performance?.data?.job_order_summary
                            ?.approved_percentage ?? `0%`
                        ).toLocaleString()}
                        rounded={'full'}
                        color={`primary`}
                        variant={'filled'}
                        size={'sm'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs-medium text-gray-light/600">
                      Rejected
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      <p className="display-xs-semibold text-gray-light/900">
                        {(
                          performance?.data?.job_order_summary?.rejected ?? 0
                        ).toLocaleString()}
                      </p>
                      <MyChip
                        label={(
                          performance?.data?.job_order_summary
                            ?.rejected_percentage ?? `0%`
                        ).toLocaleString()}
                        rounded={'full'}
                        color={`primary`}
                        variant={'filled'}
                        size={'sm'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs-medium text-gray-light/600">
                      Waiting for approval
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      <p className="display-xs-semibold text-gray-light/900">
                        {(
                          performance?.data?.job_order_summary
                            ?.waiting_for_approval ?? 0
                        ).toLocaleString()}
                      </p>
                      <MyChip
                        label={(
                          performance?.data?.job_order_summary
                            ?.waiting_for_approval_percentage ?? `0%`
                        ).toLocaleString()}
                        rounded={'full'}
                        color={`primary`}
                        variant={'filled'}
                        size={'sm'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs-medium text-gray-light/600">
                      In progress
                    </p>
                    <div className="flex flex-row items-center gap-2">
                      <p className="display-xs-semibold text-gray-light/900">
                        {(
                          performance?.data?.job_order_summary?.in_progress ?? 0
                        ).toLocaleString()}
                      </p>
                      <MyChip
                        label={(
                          performance?.data?.job_order_summary
                            ?.in_progress_percentage ?? `0%`
                        ).toLocaleString()}
                        rounded={'full'}
                        color={`primary`}
                        variant={'filled'}
                        size={'sm'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 h-full flex flex-col justify-between gap-8">
          {performance?.data?.asset_summary &&
            Object.entries(performance.data.asset_summary).map(
              ([category, data]) => (
                <div
                  key={category}
                  className="flex flex-col gap-6 rounded-xl border p-6 shadow-shadows/shadow-xs"
                >
                  {/* Nama Kategori */}
                  <div  className="flex flex-1 gap-3 rounded-xl">
                  <p className="text-md-semibold text-gray-light/900">
                    {category}
                  </p>
                  <MyChip
                        label={`Total ${data.total}`}
                        rounded={"lg"}
                        color={"modern"}
                        variant={"outlined"}
                        size={"sm"}
                      />
                  </div>
                  <hr className="border-gray-light/200" />

                  {/* List Kondisi */}
                  <div className="flex w-full gap-6">
                    {Object.entries(data.conditions).map(([condition, details]) => (
                      <div
                        key={condition}
                        className="flex flex-1 flex-col gap-2 border-b-4 border-brand/600 pb-3"
                      >
                        {/* Nama Kondisi */}
                        <p className="text-sm-medium text-gray-light/600">{condition}</p>

                        {/* Jumlah & Persentase */}
                        <div className="flex gap-4">
                          <p className="text-xl-semibold text-gray-light/900">
                            {details.count}
                          </p>
                          <MyChip
                            label={details.percentage}
                            rounded="full"
                            color={details.count > 0 ? "success" : "error"}
                            variant="filled"
                            size="sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
        </div>
            </div>
            <hr className="mx-8 border-gray-light/200" />
          </div>
        </div>
      </main>
    </SimpleBar>
  )
}

export default Dashboard
