/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { XClose, RefreshCcw01, Plus, Trash01 } from '@untitled-ui/icons-react'

import { handleError, checkErrorYup, Access } from '../../../../services/Helper'

import { useCondition } from '../context'
import { Schema as WareHouseSchema } from '../schema'
import { useApp } from '../../../../AppContext'
import MyTextField from '../../../../components/TextField/MyTextField'
import MyButton from '../../../../components/Button/MyButton'

function FormSlider() {
  const { getAccess } = useApp()
  const access = getAccess(Access?.SETTING)

  const {
    currentSlider,
    createWarehouse,
    updateWarehouse,
    handleCurrentSlider,
    showWarehouse,
    deleteWarehouse,
    searchRegionProvince,
    searchRegionCity,
    searchRegionDistrict,
    searchRegionSubDistrict,
    searchRegionZipCode,
    searchCoverage,
    searchTechnician,
    restoreWarehouse,
    searchTerritoryType,
    setCurrentTechnicianIds,
    maxLengthDropdowntechnician,
  } = useCondition()
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
  const {
    province,
    city,
    district,
    sub_district,
    zip_code,
    immune,
    deleted_at,
    adm_areas,
    territory_type,
  } = watch()
  const onSubmit = handleSubmit(
    handleError(currentSlider.id ? updateWarehouse : createWarehouse, control),
    checkErrorYup
  )

  const { technician } = watch()
  // console.log('t l: ', technician.length)
  // console.log('m l d d: ', maxLengthDropdowntechnician)

  const selected_technician_ids = technician?.map((val) => val?.id)

  const [title, setTitle] = useState('Add warehouse')
  useEffect(() => {
    if (currentSlider.id) {
      showWarehouse(currentSlider.id).then((data) => {
        setTitle(data.name)
        setValue('name', data.name)
        setValue('code', data.code)
        setValue('phone_number', data.phone_number)
        setValue('province', data.province)
        setValue('city', data.city)
        setValue('district', data.district)
        setValue('sub_district', data.sub_district)
        setValue('zip_code', data.sub_district)
        setValue('address', data.address)
        setValue('territory_type', data.territory_type)
        setValue('adm_areas', data.adm_areas)
        setValue('immune', data.immune)
        setValue('deleted_at', data.deleted_at)
        data.data.warehouse_users?.map((val, idx) =>
          setValue(`technician.${idx}`, val)
        )
        const technicianIds = data?.data?.warehouse_users?.map((val) => val.id)
        setCurrentTechnicianIds(technicianIds)
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
            <section className="flex flex-col gap-6 px-4">
              <div className="flex flex-col gap-y-1">
                <p className="text-sm-medium text-gray-light/700">
                  Warehouse information.
                </p>
                <p className="text-sm-regular text-gray-light/600">
                  Detailed warehouse information.
                </p>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm-medium text-gray-light/700"
                >
                  Warehouse name*
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
                  htmlFor="code"
                  className="text-sm-medium text-gray-light/700"
                >
                  Code*
                </label>
                <MyTextField
                  disabled={Boolean(deleted_at)}
                  name="code"
                  control={control}
                  placeholder="Input code"
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm-medium text-gray-light/700"
                >
                  Phone number*
                </label>
                <MyTextField
                  disabled={Boolean(deleted_at)}
                  type="number"
                  name="phone_number"
                  trigger={trigger}
                  control={control}
                  placeholder="Input phone number"
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="city"
                  className="text-sm-medium text-gray-light/700"
                >
                  Province*
                </label>
                {/* <MyAsyncDropdown
                  trigger={trigger}
                  disabled={Boolean(deleted_at)}
                  name="province"
                  placeholder="Select province"
                  control={control}
                  error={errors?.province?.message}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e.name}
                  value={province}
                  asyncFunction={searchRegionProvince}
                  mergeOnChange={false}
                  onClearable={(e, value) => {
                    setValue('zip_code', null)
                    setValue('sub_district', null)
                    setValue('district', null)
                    setValue('city', null)
                    setValue('province', value)
                    trigger('zip_code')
                    trigger('sub_district')
                    trigger('district')
                    trigger('city')
                  }}
                  onChange={(e, value) => {
                    setValue('province', value)
                    setValue('city', null)
                    setValue('district', null)
                    setValue('sub_district', null)
                    setValue('zip_code', null)
                  }}
                /> */}
              </div>
            </section>
            {/* <section className="flex flex-col gap-6 px-4">
              <div className="flex flex-col gap-y-1">
                <p className="text-sm-medium text-gray-light/700">
                  Service point
                </p>
                <p className="text-sm-regular text-gray-light/600">
                  Manage coverage of the warehouse service point.
                </p>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm-medium text-gray-light/700"
                >
                  Territory type*
                </label>
                <MyAsyncDropdown
                  trigger={trigger}
                  disabled={Boolean(deleted_at)}
                  name="territory_type"
                  placeholder="Select territory type*"
                  control={control}
                  error={errors?.territory_type?.message}
                  isOptionEqualToValue={(option, value) => option === value}
                  getOptionLabel={(e) => e}
                  value={territory_type}
                  asyncFunction={searchTerritoryType}
                  onChange={(e, value) => {
                    setValue('territory_type', value)
                    setValue('adm_areas', null)
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label
                  htmlFor="coverage"
                  className="text-sm-medium text-gray-light/700"
                >
                  Coverage*
                </label>
                <MyAsyncDropdown
                  trigger={trigger}
                  disabled={
                    Boolean(deleted_at) || Boolean(territory_type == null)
                  }
                  name="adm_areas"
                  error={errors?.adm_areas?.message}
                  control={control}
                  placeholder="Select coverage"
                  multiple
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) =>
                    territory_type === 'Zip code' ? e.code_pos : e.name
                  }
                  value={adm_areas}
                  asyncFunction={(e) =>
                    searchCoverage({ ...e, territory_type })
                  }
                  onChange={(e, value) => {
                    setValue('adm_areas', value)
                  }}
                />
              </div>
            </section> */}
            {/* <section className="flex flex-col">
              <div className="mb-3 flex flex-col gap-6 px-4">
                <div className="flex flex-col gap-y-1">
                  <p className="text-sm-medium text-gray-light/700">
                    Technician
                  </p>
                  <p className="text-sm-regular text-gray-light/600">
                    Assign technicians based on responsibilities at this
                    warehouse or servicepoint
                  </p>
                </div>
                <label className="text-sm-medium flex w-full flex-col gap-1.5 text-gray-light/700">
                  <span>Technician</span>
                  {technician?.map((element, i) => (
                    <div
                      key={i}
                      className={`flex items-center ${i === 0 ? '' : 'mt-3'} gap-y-1.5`}
                    >
                      <div className="flex-1">
                        <MyAsyncDropdown
                          trigger={trigger}
                          disabled={Boolean(deleted_at)}
                          name={`technician.${i}`}
                          placeholder="Select technician"
                          control={control}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                          getOptionLabel={(e) => e.name}
                          value={element}
                          extraData={{
                            selected_technician_ids,
                            isDropDownWarehouse: true,
                          }}
                          asyncFunction={searchTechnician}
                          onChange={(e, value) => {
                            setValue(`technician.${i}`, value)
                          }}
                          getOnRender={false}
                        />
                      </div>
                      {technician.length > 1 && (
                        <div className="mx-4">
                          <MyButton
                            onClick={() => {
                              const newList = [...technician]
                              newList.splice(i, 1)
                              setValue(`technician`, newList)
                            }}
                            disabled={Boolean(deleted_at)}
                          >
                            <Trash01
                              className={`${deleted_at ? 'text-gray-light/400' : 'text-gray-light/600'}`}
                              stroke="currentColor"
                            />
                          </MyButton>
                        </div>
                      )}
                    </div>
                  ))}
                </label>
              </div>
              <div className="">
                <MyButton
                  // disabled={isArchived || isDisabled}
                  onClick={() => {
                    setValue('technician', [...technician, null])
                  }}
                  disabled={
                    technician.length === maxLengthDropdowntechnician ||
                    Boolean(deleted_at)
                  }
                  color="primary"
                  variant="text"
                  size="md"
                >
                  <Plus className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">Add more technician</span>
                </MyButton>
              </div>
            </section> */}
            <footer className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-gray-light/200 bg-white px-4 py-4">
              {access?.delete && (
                <div
                  className={`flex-1 items-start ${
                    currentSlider.id && !deleted_at ? '' : 'hidden'
                  }`}
                >
                  <MyButton
                    disabled={immune || isSubmitting || !access?.delete}
                    onClick={() => deleteWarehouse(currentSlider.id)}
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
              )}
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
              {deleted_at
                ? access.edit && (
                    <MyButton
                      onClick={() => restoreWarehouse(currentSlider.id)}
                      type="reset"
                      color="primary"
                      variant="outlined"
                      size="md"
                      disabled={!access?.edit}
                    >
                      <RefreshCcw01 className="size-5" stroke="currentColor" />
                      <p className="text-sm-semibold">Restore</p>
                    </MyButton>
                  )
                : access?.edit && (
                    <MyButton
                      disabled={isSubmitting || !access?.edit}
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
