import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { XClose, Plus } from '@untitled-ui/icons-react'
import { useStorageManagement } from '../context'
import { StorageManagementSchema } from '../schema'

import { handleError, checkErrorYup } from '../../../services/Helper'
import MyAsyncDropdown from '../../../components/Autocomplete/MyAsyncDropdown'
import MyButton from '../../../components/Button/MyButton'

function FormSliderNewRackManagement() {
  const {
    currentSlider,
    createStorageManagement,
    updateRackManagement,
    handleCurrentSlider,
    searchBuildingList,
  } = useStorageManagement()

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(StorageManagementSchema),
  })

  const onSubmit = handleSubmit(
    handleError(
      currentSlider.id ? updateRackManagement : createStorageManagement,
      control
    ),
    checkErrorYup
  )
  const { buildings } = watch()

  const [title, setTitle] = useState('Tambah Gedung')

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
          <section className="flex flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">{title}</p>
            <p className="text-sm-regular text-gray-light/600">
              Tambahkan gedung baru
            </p>
          </section>
          <hr className="w-100% border-gray-light/200" />
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form className="flex h-full flex-col gap-8" onSubmit={onSubmit}>
            <section className="flex flex-col gap-6 px-4">
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm-medium text-gray-light/700"
                >
                  Gedung*
                </label>
                <MyAsyncDropdown
                  trigger={trigger}
                  name="buildings"
                  control={control}
                  error={errors?.buildings?.message}
                  placeholder="Pilih gedung"
                  multiple
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e.name}
                  value={buildings}
                  asyncFunction={searchBuildingList}
                  extraData={{ unit_id: currentSlider?.data?.unit_id }}
                  onChange={(e, value) => {
                    if (
                      value.some(
                        (obj) =>
                          obj.id === '97424fda-70f1-44ae-b4f5-29ba854ab71e' // All warehouse
                      )
                    ) {
                      setValue('buildings', null)
                      setValue('buildings', [value[value.length - 1]])
                    } else {
                      setValue('buildings', value)
                    }
                  }}
                />
              </div>
            </section>
            <footer className="flex items-center justify-center gap-4 border-t border-gray-light/200 px-4 py-4">
              <MyButton
                expanded
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="filled"
                size="md"
              >
                <Plus className="size-5" stroke="currentColor" />
                <p className="text-sm-semibold">Tambah gedung</p>
              </MyButton>
            </footer>
          </form>
        </SimpleBar>
      </div>
    </div>
  )
}

export default FormSliderNewRackManagement
