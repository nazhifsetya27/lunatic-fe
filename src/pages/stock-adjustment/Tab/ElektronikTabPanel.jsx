import { useEffect } from 'react'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'
import MyButton from '../../../components/Button/MyButton'
import MyImageToPdf from '../../../components/Document/MyImageToPdf'

function ElektronikTabPanel({
  setParams,
  params,
  detailStockAdjustmentResult,
  handleCurrentSlider,
  getDetailStockAdjustmentResult,
  data,
}) {
  useEffect(() => {
    getDetailStockAdjustmentResult(data, { category: data.category })
  }, [params])
  // console.log('detail', detailStockAdjustmentResult?.data)

  return (
    <>
      <MyDataTable
        values={detailStockAdjustmentResult}
        paginator
        onChangePagination={(page) => {
          setParams((value) => ({
            ...value,
            page_detail: page,
          }))
        }}
        onClick={null}
      >
        <MyColumn
          field="id"
          header="Asset name"
          isArchived={params.archive}
          body={({ asset }) => (
            <p className="text-sm-medium text-gray-light/900">
              {asset?.name ?? '-'}
            </p>
          )}
        />
        <MyColumn
          field="id"
          header="Kode"
          isArchived={params.archive}
          body={({ asset }) => (
            <p className="text-sm-medium text-gray-light/900">
              {asset?.kode ?? '-'}
            </p>
          )}
        />
        <MyColumn
          field="id"
          header="From"
          isArchived={params.archive}
          body={({ previous_condition }) => (
            <p className="text-sm-medium text-gray-light/900">
              {previous_condition?.name ?? '-'}
            </p>
          )}
        />
        <MyColumn
          field="id"
          header="To"
          isArchived={params.archive}
          body={({ current_condition }) => (
            <p className="text-sm-medium text-gray-light/900">
              {current_condition?.name ?? '-'}
            </p>
          )}
        />
        {/* <MyColumn
          alignment="right"
          body={(value) => (
            <div className="flex items-center justify-end gap-1">
              <MyButton
                onClick={() =>
                  handleCurrentSlider(
                    {
                      status: true,
                      current: 'details-slider-terminal',
                      origin: 'approval',
                    },
                    value.terminal_id
                  )
                }
                size="md"
                variant="text"
              >
                <LinkExternal02
                  className="size-4 text-gray-light/600"
                  stroke="currentColor"
                />
              </MyButton>
            </div>
          )}
        /> */}
      </MyDataTable>
      {detailStockAdjustmentResult?.data.length >= 1 && (
        <div className="px-4">
          <MyImageToPdf
            srcImages={detailStockAdjustmentResult?.data
              ?.map((item) => item?.evidence_url)
              ?.filter((item) => !!item)}
          >
            <MyButton
              color="primary"
              variant="text"
              className="text-nowrap rounded-md"
            >
              Photo evidence
            </MyButton>
          </MyImageToPdf>
        </div>
      )}
    </>
  )
}

export default ElektronikTabPanel
