import { useMemo } from 'react'
// import { MyChip, MyStep, MyStepper, MyTextField } from '@interstellar-component'
import { Box, Stack } from '@mui/material'
import { Clock, SearchLg } from '@untitled-ui/icons-react'
import { debounce } from 'lodash'
import moment from 'moment'
import MyChip from '../../../../components/Chip/MyChip'
import MyStep from '../../../../components/Stepper/MyStep'
import MyStepper from '../../../../components/Stepper/MyStepper'
import MyTextField from '../../../../components/TextField/MyTextField'

function HistoryTabPanel({ assetHistory }) {
  const conditionLocationHistories = useMemo(
    () => assetHistory ?? [],
    [assetHistory]
  )

  return (
    <Stack className="gap-6 px-4 py-6 text-sm text-gray-light/600">
      <Stack>
        <Box className="font-semibold">Asset condition history</Box>
        <Box>Condition history of asset.</Box>
      </Stack>

      <Stack className="w-full flex-col gap-1">
        <MyStepper activeStep={1}>
          {conditionLocationHistories?.map((item, index) => (
            <MyStep
              key={item?.id ?? index}
              value={item?.id ?? index}
              stepIcon={<Clock className="size-4" stroke="currentColor" />}
            >
              <Stack className="gap-3">
                <Stack>
                  <Stack direction="row" className="items-center gap-2">
                    {/* <Box className="font-medium">{item?.meta?.date ?? '-'}</Box> */}
                    <Box className="font-medium">
                      {item?.stock_adjustment_inventory_created_at
                        ? moment(
                            item?.stock_adjustment_inventory_created_at
                          ).format('DD MMM YYYY • HH:mm')
                        : '-'}
                    </Box>
                    {/* <Box className="text-xs">
                      {item?.meta?.date_from_now ?? '-'}
                    </Box> */}
                  </Stack>

                  <Box className="font-bold">
                    {item?.stock_adjustment_created_by ?? '-'}
                  </Box>
                </Stack>

                <Stack direction="row" className="flex-wrap items-center gap-1">
                  <MyChip
                    label={item?.asset_previous_condition ?? '-'}
                    rounded="md"
                    color="gray"
                    variant="filled"
                    size="sm"
                  />
                  <p>-- to --</p>
                  <MyChip
                    label={item?.asset_current_condition ?? '-'}
                    rounded="md"
                    color="gray"
                    variant="filled"
                    size="sm"
                  />
                </Stack>
              </Stack>
            </MyStep>
          ))}
        </MyStepper>
      </Stack>
    </Stack>
  )
}

export default HistoryTabPanel
