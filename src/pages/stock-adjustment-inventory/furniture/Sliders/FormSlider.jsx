/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */

// Libraries
import React, { useEffect, useMemo, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI Icons
import { XClose } from '@untitled-ui/icons-react'

// import { MyButton, MyAsyncDropdown, MyDropzone } from '@interstellar-component'

// Context
import { useStockAdjustmentInventory } from '../../context'

// schema
import { assetSchema } from '../../schema'
import { checkErrorYup, handleError } from '../../../../services/Helper'
import MyAsyncDropdown from '../../../../components/Autocomplete/MyAsyncDropdown'
import MyDropzone from '../../../../components/Dropzone/MyDropzone'
import MyButton from '../../../../components/Button/MyButton'
import MyTextField from '../../../../components/TextField/MyTextField'

function FormSliderFurniture() {
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(assetSchema),
  })

  const {
    handleCurrentSlider,
    currentSlider,
    searchConditionList,
    stockAdjustmentInventory,
    adjustInventory,
  } = useStockAdjustmentInventory()

  const data = currentSlider.id
  console.log(data)

  const { deleted_at, condition, current_condition, previous_condition } =
    watch()
  const [progressUpload, setProgressUpload] = useState(null)

  useEffect(() => {
    setValue('sam_card_id', data?.sam_card_id)
    setValue('stock_adjustment_inventory_id', data.id)
    setValue('previous_condition', data.previous_condition.name)
    setValue('current_condition', data.current_condition)
  }, [])

  const onSubmit = handleSubmit(
    handleError(adjustInventory, control),
    checkErrorYup
  )

  return (
    <div className="flex h-screen w-[375px] flex-col gap-8">
      <header className="relative flex items-start gap-x-4 px-4 pt-6">
        <button
          onClick={() => handleCurrentSlider(null)}
          className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
        >
          <XClose size={24} stroke="currentColor" />
        </button>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">
              {data?.asset?.name}
            </p>
          </div>
          <hr className="border-gray-light/200" />
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form className="flex h-full flex-col gap-8" onSubmit={onSubmit}>
            <section className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-y-1.5 px-4">
                <p className="text-sm-medium text-gray/700">Adjust condition</p>
                <p className="text-sm-regular text-gray-light/600">
                  Set the condition of your inventory.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <hr className="border-gray-light/200" />
                <div className="px-4">
                  <p className="text-xs-medium text-gray-light/600">
                    Condition
                  </p>
                </div>
                <hr className="border-gray-light/200" />
              </div>

              <div className="flex flex-col gap-y-1.5 px-4">
                <label
                  htmlFor="customer"
                  className="text-sm-medium text-gray-light/700"
                >
                  From:
                </label>
                <MyTextField
                  name="previous_condition"
                  value={previous_condition}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-y-1.5 px-4">
                <label
                  htmlFor="customer"
                  className="text-sm-medium text-gray-light/700"
                >
                  To:
                </label>
                <MyAsyncDropdown
                  trigger={trigger}
                  disabled={Boolean(deleted_at)}
                  name="current_condition"
                  value={current_condition}
                  placeholder="Select condition"
                  control={control}
                  error={errors?.condition?.message}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e?.name}
                  asyncFunction={searchConditionList}
                  getOnRender={false}
                  extraData={{
                    existing_ids: [data.asset.condition.id],
                  }}
                  onChange={(e, value) => {
                    setValue('current_condition', value)
                  }}
                />
              </div>
              <hr className="border-gray-light/200" />

              <section className="flex flex-1 flex-col gap-3 px-6">
                <p className="text-sm-medium text-gray-700">Photo evidence</p>
                <div>
                  <MyDropzone
                    multiple={false}
                    errors={errors?.evidence?.message}
                    progressUpload={progressUpload}
                    maxSize={157286400}
                    accept={['.jpeg', '.png', '.jpg']}
                    // onDrop={(acceptedFiles, rejectedFiles, e) => {
                    //   console.log(acceptedFiles, rejectedFiles, e)
                    // }}
                    onDropAccepted={(acceptedFiles, e) => {
                      // recalculate();
                      setValue('evidence', acceptedFiles[0])
                      setValue(
                        'date_evidence',
                        acceptedFiles[0]?.lastModifiedDate
                      )
                    }}
                    onChange={(e) => {
                      if (e.length === 0) {
                        setValue('evidence', null)
                        setValue('date_evidence', null)
                      }
                    }}
                    // onDropRejected={(rejectedFiles, e) => {}}
                    // showImage={false}
                  />
                </div>
              </section>
            </section>

            <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
              <MyButton
                disabled={isSubmitting}
                onClick={() => handleCurrentSlider(null)}
                type="reset"
                color="secondary"
                variant="outlined"
                size="md"
              >
                <p className="text-sm-semibold">Cancel</p>
              </MyButton>
              <MyButton
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="filled"
                size="md"
              >
                <p className="text-sm-semibold">Submit</p>
              </MyButton>
            </footer>
          </form>
        </SimpleBar>
      </div>
    </div>
  )
}

export default FormSliderFurniture
