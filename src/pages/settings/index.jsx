import React from 'react'
import SimpleBar from 'simplebar-react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from '@untitled-ui/icons-react'
import MyButton from '../../components/Button/MyButton'
import MyHorizontalTab from '../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../components/HorizontalTab/MyTabButton'

function Settings() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <SimpleBar forceVisible="y" className="flex-1" style={{ height: '100vh' }}>
      <main className="flex flex-col gap-8 pb-12 pt-8">
        <div className="flex flex-col gap-6 px-8">
          <div className="flex h-max w-full flex-row justify-between">
            <div className="flex flex-col gap-1">
              <div
                className={`${
                  location.pathname !== '/settings/omnisearch' ? 'hidden' : ''
                }`}
              >
                <MyButton
                  disabled={location.pathname !== '/settings/omnisearch'}
                  onClick={() => {
                    navigate(-1)
                  }}
                  color="primary"
                  variant="text"
                  size="md"
                >
                  <ArrowLeft className="size-5" stroke="currentColor" />
                  <p className="text-sm-semibold">Back to settings</p>
                </MyButton>
              </div>
              <p className="display-sm-semibold text-gray-light/900">
                Settings
              </p>
              <p className="text-gray-light/600">
                Configuration of all aspects of the system.
              </p>
            </div>
            {/* <div>
              <MyTextField
                placeholder={"Search"} id={"input-search"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate("omnisearch");
                  }
                }}
                startAdornment={
                  <SearchLg
                    className="size-5"
                    className={"text-gray-light/500"}
                    stroke={"currentColor"}
                  />
                }
              />
            </div> */}
          </div>
          <MyHorizontalTab
            selectedIsMatchPath
            type="underline"
            onChange={(value) => navigate(value)}
          >
            <MyTabButton value="gedung">Gedung</MyTabButton>
            <MyTabButton value="lantai">Lantai</MyTabButton>
            <MyTabButton value="ruangan">Ruangan</MyTabButton>
            <MyTabButton value="kondisi">Kondisi</MyTabButton>
            <MyTabButton value="unit">Unit</MyTabButton>
          </MyHorizontalTab>
        </div>
        <Outlet />
      </main>
    </SimpleBar>
  )
}

export default Settings
