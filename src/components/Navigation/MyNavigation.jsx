/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LogOut04,
  Users01,
  Settings02,
  CheckDone01,
  HomeLine,
} from '@untitled-ui/icons-react'
import { useCookies } from 'react-cookie'
import { AdProduct, AllApplication, StorageCardOne } from '@icon-park/react'
import MyConfirmModal from '../Modal/MyConfirmModal'
import MyTooltip from '../Tooltip/MyTooltip'
import MyButton from '../Button/MyButton'
import MyAvatar from '../Avatar/MyAvatar'
import { useApp } from '../../AppContext'
import PLNLogo from '../Icon/logo_PLN.svg'

const mediaUrl = import.meta.env.VITE_API_MEDIA_URL

function SideNavbar({ childs }) {
  const location = useLocation()
  const { user } = useApp()
  const role = user?.role
  const nav = useNavigate()

  const [loading, setLoading] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('email_forget_password')
    localStorage.removeItem('countdown_to_new_otp')
    localStorage.removeItem('isScan')
    localStorage.removeItem('assetId')
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
      <div className="flex h-dvh w-20 min-w-[80px] flex-col justify-between border-r border-gray-light/200">
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-full w-full flex-col items-center gap-y-6 pt-8">
            <div
              className="flex w-full cursor-pointer justify-center px-4 py-[7px]"
              onClick={() => nav('/')}
            >
              <img src={PLNLogo} alt="PLNLogo" />
            </div>
            {/* TOP */}
            <div className="flex h-full flex-1 flex-col">
              <Link to="/">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname === '/'
                          ? 'bg-gray-light/50 text-gray-light/700'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <HomeLine size={24} stroke="currentColor" />
                    </div>
                  }
                >
                  <p className="text-xs-semibold text-white">Dashboard</p>
                </MyTooltip>
              </Link>
              <Link to="/asset">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/asset')
                          ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
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
              <Link to="/approval">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/approval')
                          ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md ${role === 'User' ? 'hidden' : ''}`}
                    >
                      <CheckDone01 size={24} stroke="currentColor" />
                    </div>
                  }
                >
                  <span className="text-xs-semibold text-white">Approval</span>
                </MyTooltip>
              </Link>
              <Link to="/user">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/user')
                          ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md ${role === 'Administrator' ? '' : 'hidden'}`}
                    >
                      <Users01 size={24} stroke="currentColor" />
                    </div>
                  }
                >
                  <p className="text-xs-semibold text-white">User management</p>
                </MyTooltip>
              </Link>
              <Link to="/storage-management">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/storage')
                          ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md ${role === 'User' ? 'hidden' : ''}`}
                    >
                      <StorageCardOne size={24} stroke="currentColor" />
                    </div>
                  }
                >
                  <p className="text-xs-semibold text-white">
                    Storage management
                  </p>
                </MyTooltip>
              </Link>
              <Link to="/stock-adjustment">
                <MyTooltip
                  placement="right"
                  target={
                    <div
                      className={`${
                        location?.pathname.includes('/stock-adjustment')
                          ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <AdProduct size={24} stroke="currentColor" />
                    </div>
                  }
                >
                  <p className="text-xs-semibold text-white">
                    Stock adjustment
                  </p>
                </MyTooltip>
              </Link>
            </div>

            {/* bottom */}
            <div className="flex w-full flex-col items-center gap-y-6 pb-6">
              <div className="flex flex-col gap-y-2">
                <Link to="/settings">
                  <MyTooltip
                    placement="right"
                    target={
                      <div
                        className={`${
                          location?.pathname.includes('/settings')
                            ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
                            : 'text-gray-light/500'
                        } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md ${role === 'User' ? 'hidden' : ''}`}
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
                      onClick={() => setConfirmModalOpen(true)}
                    >
                      <MyButton onClick={() => setConfirmModalOpen(true)}>
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
                          ? 'bg-gray-light/200 text-gray-light/700 shadow-lg'
                          : 'text-gray-light/500'
                      } flex h-12 w-12 min-w-[48px] cursor-pointer items-center justify-center rounded-md`}
                    >
                      <MyAvatar
                        size={48}
                        stroke="currentColor"
                        photo={
                          user?.photo_url
                            ? `${mediaUrl}${user?.photo_url}?time=${new Date().getTime()}`
                            : null
                        }
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
