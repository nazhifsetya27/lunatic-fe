import { RefreshCcw01, Trash01 } from '@untitled-ui/icons-react'
import { useStockAdjustmentInventory } from '../context'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'
import MyButton from '../../../components/Button/MyButton'
import MyChip from '../../../components/Chip/MyChip'

function UmumStockAdjustment() {
  const {
    stockAdjustmentInventory,
    handleCurrentSlider,
    deleteStockAdjustmentInventory,
    setStockAdjustmentInventory,
    setParams,
  } = useStockAdjustmentInventory()
  // console.log('sam', stockAdjustmentInventory.data)
  const params = { archive: 0 }

  return (
    <div>
      <MyDataTable
        values={stockAdjustmentInventory}
        paginator
        onDeleteAll={deleteStockAdjustmentInventory}
        selectionMode="multiple"
        onSelectionChange={(value) => setStockAdjustmentInventory(value)}
        onChangePagination={(page) => {
          setParams((value) => ({ ...value, page }))
        }}
      >
        <MyColumn
          sortable
          field="name"
          header="Name"
          body={({ asset }) => (
            <p className="text-sm-medium text-gray-light/900">{asset?.name}</p>
          )}
        />
        <MyColumn
          sortable
          field="name"
          header="Code"
          body={({ asset }) => (
            <p className="text-sm-medium text-gray-light/900">{asset.kode}</p>
          )}
        />
        <MyColumn
          sortable
          field="name"
          header="adjustment status"
          body={(value) => (
            <div>
              {value.current_condition_id === null ? (
                <MyChip
                  label="not adjusted"
                  // endAdornment={<AlertCircle className="size-5 text-warning/500" />}
                  color="warning"
                  variant="filled"
                  rounded="full"
                  size="lg"
                />
              ) : (
                <MyChip
                  label="adjusted"
                  // endAdornment={<AlertCircle className="size-5 text-warning/500" />}
                  color="success"
                  variant="filled"
                  rounded="full"
                  size="lg"
                />
              )}
            </div>
          )}
        />
        <MyColumn
          sortable
          field="name"
          header=""
          body={(value) => (
            <MyButton
              variant="text"
              color="primary"
              size="md"
              onClick={() => {
                handleCurrentSlider(
                  { status: true, current: 'form-slider-furniture' },
                  value
                )
              }}
            >
              <p className="text-sm-semibold text-brand/700">Adjust</p>
            </MyButton>
          )}
        />

        <MyColumn
          alignment="right"
          body={(value) => (
            <div className="flex items-center justify-end gap-1">
              <MyButton
                onClick={() => deleteStockAdjustmentInventory(value?.id)}
                size="md"
                variant="text"
              >
                <Trash01
                  className="size-5 text-gray-light/600"
                  stroke="currentColor"
                />
              </MyButton>
            </div>
          )}
        />
      </MyDataTable>
    </div>
  )
}

export default UmumStockAdjustment
