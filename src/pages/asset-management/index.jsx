import { Outlet, useNavigate } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import { Box, Stack } from '@mui/material'
import MyHorizontalTab from '../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../components/HorizontalTab/MyTabButton'

function AssetManagement() {
  const navigate = useNavigate()

  return (
    <SimpleBar forceVisible="y" className="flex-1" style={{ height: '100vh' }}>
      <main className="flex flex-col gap-8 p-8 pb-12">
        <Stack className="gap-6">
          <Stack className="gap-1">
            <Box className="display-sm-semibold text-gray-light/900">
              Asset management
            </Box>
            <Box className="text-gray-light/600">
              Manage asset on the system.
            </Box>
          </Stack>

          <MyHorizontalTab
            selectedIsMatchPath
            type="underline"
            onChange={(value) => navigate(value)}
          >
            <MyTabButton value="furniture">Furniture</MyTabButton>
            <MyTabButton value="elektronik">Elektronik</MyTabButton>
            <MyTabButton value="umum">Umum</MyTabButton>
          </MyHorizontalTab>
        </Stack>
        <Outlet />
      </main>
    </SimpleBar>
  )
}

export default AssetManagement
