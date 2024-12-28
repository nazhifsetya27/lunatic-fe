/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { XClose, RefreshCcw01, Plus, Trash01 } from '@untitled-ui/icons-react'

import { handleError, checkErrorYup } from '../../../../services/Helper'

import { useUnit } from '../context'
import { Schema as WareHouseSchema } from '../schema'
import { useApp } from '../../../../AppContext'
import MyTextField from '../../../../components/TextField/MyTextField'
import MyButton from '../../../../components/Button/MyButton'

function FormSlider() {
  const [title, setTitle] = useState('Add warehouse')

  const {
    currentSlider,
    createUnit,
    updateUnit,
    handleCurrentSlider,
    showUnit,
    deleteUnit,
    restoreUnit,
  } = useUnit()
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(WareHouseSchema),
    defaultValues: {
      technician: [null],
    },
  })
  const { immune, deleted_at } = watch()

  const onSubmit = handleSubmit(
    handleError(currentSlider.id ? updateUnit : createUnit, control),
    checkErrorYup
  )

  useEffect(() => {
    if (currentSlider.id) {
      showUnit(currentSlider.id).then((data) => {
        setTitle(data.name)
        setValue('name', data.name)
        setValue('kode', data.kode)
      })
    }
  }, [])
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
          <section className="flex w-[310px] flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">{title}</p>
            <p className="text-sm-regular text-gray-light/600">
              {currentSlider.id
                ? 'Edit the information below.'
                : 'Complete the information below.'}
            </p>
          </section>
          <hr className="w-100% border-gray-light/200" />
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form className="flex h-full flex-col gap-8" onSubmit={onSubmit}>
            <section className="flex flex-1 flex-col gap-6 px-4">
              <div className="flex flex-col gap-y-1">
                <p className="text-sm-medium text-gray-light/700">
                  Unit information.
                </p>
                <p className="text-sm-regular text-gray-light/600">
                  Detailed unit information.
                </p>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm-medium text-gray-light/700"
                >
                  Unit name*
                </label>
                <MyTextField
                  disabled={Boolean(deleted_at)}
                  name="name"
                  control={control}
                  placeholder="Input warehouse name"
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="kode"
                  className="text-sm-medium text-gray-light/700"
                >
                  Kode*
                </label>
                <MyTextField
                  disabled={Boolean(deleted_at)}
                  name="kode"
                  control={control}
                  placeholder="Input kode"
                />
              </div>
            </section>

            <footer className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-gray-light/200 bg-white px-4 py-4">
              <div
                className={`flex-1 items-start ${
                  currentSlider.id && !deleted_at ? '' : 'hidden'
                }`}
              >
                <MyButton
                  disabled={immune || isSubmitting}
                  onClick={() => deleteUnit(currentSlider.id)}
                  variant="text"
                  size="md"
                >
                  <p
                    className={`text-sm-semibold ${
                      immune ? 'text-gray-light/400' : 'text-error/700'
                    }`}
                  >
                    Delete
                  </p>
                </MyButton>
              </div>
              <MyButton
                disabled={isSubmitting}
                type="reset"
                onClick={() => handleCurrentSlider(null)}
                color="secondary"
                variant="outlined"
                size="md"
              >
                <p className="text-sm-semibold">Cancel</p>
              </MyButton>
              {deleted_at ? (
                <MyButton
                  onClick={() => restoreUnit(currentSlider.id)}
                  type="reset"
                  color="primary"
                  variant="outlined"
                  size="md"
                >
                  <RefreshCcw01 className="size-5" stroke="currentColor" />
                  <p className="text-sm-semibold">Restore</p>
                </MyButton>
              ) : (
                <MyButton
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                  variant="filled"
                  size="md"
                >
                  <p className="text-sm-semibold">Submit</p>
                </MyButton>
              )}
            </footer>
          </form>
        </SimpleBar>
      </div>
    </div>
  )
}

export default FormSlider
