import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LogOut04,
  Users01,
  ReceiptCheck,
  Bank,
  Settings02,
} from '@untitled-ui/icons-react'
import { useCookies } from 'react-cookie'
import { AllApplication } from '@icon-park/react'
import MyConfirmModal from '../Modal/MyConfirmModal'
import MyTooltip from '../Tooltip/MyTooltip'
import MyButton from '../Button/MyButton'
import MyAvatar from '../Avatar/MyAvatar'

// import MyAvatar from './MyAvatar'
// import MyButton from './MyButton'
// import MyTooltip from './MyTooltip'
// import MyConfirmModal from './MyConfirmModal'

function SideNavbar({ childs }) {
  const location = useLocation()

  const [loading, setLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('email_forget_password')
    localStorage.removeItem('countdown_to_new_otp')
    removeCookie('token')
  }

  return (
    <>
      <MyConfirmModal
        open={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={logout}
        message="Are you sure want to logout?"
        icon={<LogOut04 className="text-warning/600" />}
        bgColor="bg-error/100"
      />
      <div className="flex h-screen w-20 min-w-[80px] flex-col justify-between border-r border-gray-light/200">
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-full w-full flex-col items-center gap-y-6 pt-8">
            <div className="flex w-full justify-center px-4 py-[7px]">
              {/* <Ingenico /> */} Logo
            </div>
            {/* TOP */}
            <div className="flex h-full flex-1 flex-col">
              <Link to="/asset">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/asset')
                          ? 'bg-gray-light/50 text-gray-light/700'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <AllApplication theme="outline" size="24" fill="#333" />
                    </div>
                  }
                >
                  <p className="text-xs-semibold text-white">
                    Asset management
                  </p>
                </MyTooltip>
              </Link>
              <Link to="/user">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/user')
                          ? 'bg-gray-light/50 text-gray-light/700'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <Users01 size={24} stroke="currentColor" />
                    </div>
                  }
                >
                  <p className="text-xs-semibold text-white">User reconcile</p>
                </MyTooltip>
              </Link>
            </div>

            {/* bottom */}
            <div className="flex w-full flex-col items-center gap-y-6 pb-6">
              <div className="flex flex-col gap-y-2">
                {/* <Link to="/profile">
                  <MyTooltip
                    placement="right"
                    target={
                      <div
                        className={`${
                          location?.pathname === '/terminal'
                            ? 'bg-gray-light/50 text-gray-light/700'
                            : 'text-gray-light/500'
                        } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                      >
                        <Signal01 size={24} stroke="currentColor" />
                      </div>
                    }
                  >
                    <span className="text-xs-semibold text-white">
                      Terminal diagnostic
                    </span>
                  </MyTooltip>
                </Link> */}
                <Link to="/settings">
                  <MyTooltip
                    placement="right"
                    target={
                      <div
                        className={`${
                          location?.pathname.includes('/settings')
                            ? 'bg-gray-light/50 text-gray-light/700'
                            : 'text-gray-light/500'
                        } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                      >
                        <Settings02
                          data-test="btn-nav-setting"
                          size={24}
                          stroke="currentColor"
                        />
                      </div>
                    }
                  >
                    <span className="text-xs-semibold text-white">
                      Settings
                    </span>
                  </MyTooltip>
                </Link>
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${'text-gray-light/500'} flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <MyButton
                        // onClick={() => {
                        //   if (window.confirm('Anda yakin ingin logout?'))
                        //     logout()
                        // }}
                        onClick={() => setConfirmModalOpen(true)}
                      >
                        <LogOut04
                          data-test="btn-nav-setting"
                          size={24}
                          stroke="currentColor"
                        />
                      </MyButton>
                    </div>
                  }
                >
                  <span className="text-xs-semibold text-white">Log Out</span>
                </MyTooltip>
              </div>
              <Link to="/profile">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/profile')
                          ? 'bg-gray-light/50 text-gray-light/700'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <MyAvatar
                        size={48}
                        stroke="currentColor"
                        // photo={
                        //   user?.photo_url
                        //     ? // ? `${user?.photo_url}?time=${new Date().getTime()}`
                        //       user?.photo_url
                        //     : null
                        // }
                      />
                    </div>
                  }
                >
                  <span className="text-xs-semibold text-white">
                    My Profile
                  </span>
                </MyTooltip>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {childs}
    </>
  )
}

export default SideNavbar
