import { Outlet, useNavigate } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import { Box, Stack } from '@mui/material'
import { Download, Upload } from '@icon-park/react'
import { useCallback, useState } from 'react'
import MyHorizontalTab from '../../components/HorizontalTab/MyHorizontalTab'
import MyTabButton from '../../components/HorizontalTab/MyTabButton'
import MyButton from '../../components/Button/MyButton'
import MyModalSlider from '../../components/ModalSlider/MyModalSlider'
import ImportSlider from './ImportSlider'
import { download } from '../../services/NetworkUtils'

function AssetManagement() {
  const navigate = useNavigate()

  const [currentSlider, setCurrentSlider] = useState({
    status: false,
    current: null,
  })

  const handleCurrentSlider = useCallback((slider, id, data) => {
    if (slider && slider.current)
      setCurrentSlider({ status: true, current: slider.current, id, data })
    else {
      setCurrentSlider((value) => ({ ...value, current: null }))
      setTimeout(() => {
        setCurrentSlider({ current: null })
      }, 200)
    }
  }, [])

  const Service = {
    downloadExportAll: (params) =>
      download(`/asset/furniture/exportAll`, params),
  }

  const downloadExportAll = useCallback(() => {
    const url = Service.downloadExportAll()
    window.open(url, '_blank').focus()
  }, [])

  return (
    <>
      <MyModalSlider
        open={currentSlider?.current === 'import-slider'}
        element={<ImportSlider />}
        onClose={() => handleCurrentSlider(null)}
      />
      <SimpleBar
        forceVisible="y"
        className="flex-1"
        style={{ height: '100vh' }}
      >
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

            <div className="flex justify-between">
              <div>
                <MyHorizontalTab
                  selectedIsMatchPath
                  type="underline"
                  onChange={(value) => navigate(value)}
                >
                  <MyTabButton value="furniture">Furniture</MyTabButton>
                  <MyTabButton value="elektronik">Elektronik</MyTabButton>
                  <MyTabButton value="umum">Umum</MyTabButton>
                </MyHorizontalTab>
              </div>
              <div className="flex gap-4">
                <MyButton
                  onClick={downloadExportAll}
                  color="primary"
                  variant="outlined"
                  size="md"
                >
                  <Download className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">Export all category</span>
                </MyButton>
                <MyButton
                  onClick={() =>
                    handleCurrentSlider({
                      status: true,
                      current: 'import-slider',
                    })
                  }
                  color="secondary"
                  variant="outlined"
                  size="md"
                >
                  <Upload className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">Import all category</span>
                </MyButton>
              </div>
            </div>
          </Stack>
          <Outlet />
        </main>
      </SimpleBar>
    </>
  )
}

export default AssetManagement
