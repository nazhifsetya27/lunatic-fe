// Libraries
import { useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI Icons
import { XClose } from '@untitled-ui/icons-react'

// Shared Components
import MyTextField from '../../../components/TextField/MyTextField'
import MyButton from '../../../components/Button/MyButton'
import MyAsyncDropdown from '../../../components/Autocomplete/MyAsyncDropdown'

// Context
import { useStockAdjustment } from '../context'

// schema
import { stockAdjustmentSchema } from '../schema'
import { checkErrorYup, handleError } from '../../../services/Helper'

function FormSlider() {
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(stockAdjustmentSchema),
  })

  const {
    handleCurrentSlider,
    currentSlider,
    createstockAdjustment,
    updatestockAdjustment,
    searchWarehouse,
  } = useStockAdjustment()

  const { stock_adjustment_id, deleted_at, warehouse } = watch()
  const [title, setTitle] = useState('Add stock adjustment')

  const onSubmit = handleSubmit(
    handleError(
      currentSlider.id ? updatestockAdjustment : createstockAdjustment,
      control
    ),
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
            <p className="text-xl-semibold text-gray-light/900">{title}</p>
            <p className="text-sm-regular text-gray-light/600">
              {currentSlider.id
                ? 'Edit the information below.'
                : 'Complete the information below.'}
            </p>
          </div>
          <hr className="border-gray-light/200" />
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form className="flex h-full flex-col gap-8" onSubmit={onSubmit}>
            <section className="flex flex-1 flex-col gap-6 px-4">
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm-medium text-gray-light/700"
                >
                  Stock adjustment name
                </label>
                <MyTextField
                  disabled={Boolean(deleted_at)}
                  name="name"
                  control={control}
                  placeholder="Input stock adjustment name"
                  errors={errors?.stock_adjustment_name?.message}
                />
              </div>
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

export default FormSlider
