import { Edit04, XClose } from '@untitled-ui/icons-react'
import MyAvatar from '../../../components/Avatar/MyAvatar'
import SimpleBar from 'simplebar-react'
import MyButton from '../../../components/Button/MyButton'
import { useUser } from '../context'
import MyHorizontalTab from '../../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../../components/HorizontalTab/MyTabButton'
import { useEffect, useState } from 'react'
import General from './components/General'
import Region from './components/Region'
import MyTabView from '../../../components/TabView/MyTabView'
import MyTabPanel from '../../../components/TabView/MyTabPanel'

const DetailSlider = () => {
  const {
    handleCurrentSlider,
    currentTabs,
    handleChangeTabs,
    currentSlider,
    getUserDetail,
    deleteUser,
    hasPermission,
  } = useUser()
  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    if (currentSlider.id) {
      getUserDetail(currentSlider.id).then((userDetail) => {
        setUserDetails(userDetail)
      })
    }
  }, [currentTabs])

  return (
    <div className="flex h-screen w-[375px] flex-col">
      <header className="relative flex items-start gap-x-4 px-4 pt-8">
        <button
          className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-xl p-2 text-gray-light/400"
          onClick={() => {
            handleCurrentSlider(null)
          }}
        >
          <XClose size={24} stroke={'currentColor'} />
        </button>
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <MyAvatar
                photo={userDetails?.data?.photo_url ?? null}
                size={55}
              />
              <div>
                <p className="text-xl-bold text-gray-light/900">
                  {userDetails?.data?.name ?? 'null'}
                </p>
                <p className="text-md text-gray-light/900">
                  {userDetails?.data?.role ?? 'null'}
                </p>
              </div>
            </div>
          </div>
          {/* <MyHorizontalTab
            value={currentTabs.type}
            type={'underline'}
            onChange={(value) => {
              handleChangeTabs({ type: value, search: '' })
            }}
          > */}
          {/* <MyTabButton value={'general'}>General</MyTabButton> */}
          {/* <MyTabButton value={'region'}>Region</MyTabButton> */}
          {/* </MyHorizontalTab> */}
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        {/* <MyTabView>
          <MyTabPanel value="general"> */}
        <General userDetails={userDetails} />
        {/* </MyTabPanel>
        </MyTabView> */}
      </div>
      <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
        {/* <div className={hasPermission('Backoffice - User & Team', 'Edit')}>
          <MyButton
            type={'reset'}
            variant={''}
            size={'md'}
            onClick={() => {
              deleteUser(currentSlider.id)
              handleCurrentSlider(null)
            }}
          >
            <p className="text-sm-semibold text-error/700">Delete</p>
          </MyButton>
        </div> */}
        <div className="test">
          <MyButton
            color={'secondary'}
            variant={'outlined'}
            size={'md'}
            onClick={() => {
              handleCurrentSlider(
                {
                  status: true,
                  current: 'user',
                },
                currentSlider.id
              )
            }}
          >
            <Edit04
              size={20}
              className={'text-gray-light/600'}
              stroke={'currentColor'}
            />
            <p className="text-sm-semibold">Edit</p>
          </MyButton>
        </div>
      </footer>
    </div>
  )
}

export default DetailSlider
