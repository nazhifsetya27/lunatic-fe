// import { MyButton, MyColumn, MyDataTable } from '@interstellar-component'
import { RefreshCcw01, Trash01 } from '@untitled-ui/icons-react'
import { useEffect } from 'react'
import { useStockAdjustmentInventory } from '../context'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'
import MyButton from '../../../components/Button/MyButton'

function FurnitureStockAdjustment() {
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
          body={(value) =>
            params.archive === 0 ? (
              <div className="flex items-center justify-end gap-1">
                <MyButton
                  onClick={() => deleteStockAdjustmentInventory([value?.id])}
                  size="md"
                  variant="text"
                >
                  <Trash01
                    className="size-5 text-gray-light/600"
                    stroke="currentColor"
                  />
                </MyButton>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-1">
                <MyButton
                  onClick={(e) => {
                    e.stopPropagation()
                    // restoreTerminalStatus(value.id)
                  }}
                  size="md"
                  variant="text"
                >
                  <RefreshCcw01
                    className="size-5 text-gray-light/600"
                    stroke="currentColor"
                  />
                </MyButton>
              </div>
            )
          }
        />
      </MyDataTable>
    </div>
  )
}

export default FurnitureStockAdjustment
