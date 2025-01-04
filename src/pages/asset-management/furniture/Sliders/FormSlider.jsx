import { useState, useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, RefreshCcw01, Trash01, XClose } from '@untitled-ui/icons-react'
import { useFurniture } from '../context'
import { schema } from '../schema'
import { handleError, checkErrorYup } from '../../../../services/Helper'
import MyTextField from '../../../../components/TextField/MyTextField'
import MyButton from '../../../../components/Button/MyButton'
import MyAsyncDropdown from '../../../../components/Autocomplete/MyAsyncDropdown'

function FormSlider() {
  const {
    currentSlider,
    handleCurrentSlider,
    createFurniture,
    showFurniture,
    updateFurniture,
    deleteFurniture,
    restoreFurniture,
    setParams,
    params,
    searchUnitList,
    searchBuildingList,
    searchFloorList,
    searchRoomList,
  } = useFurniture()

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  })

  const [title, setTitle] = useState('Add furniture')

  useEffect(() => {
    if (currentSlider.id) {
      showFurniture(currentSlider.id).then((furniture) => {
        // console.log('furniture: ', furniture)

        setTitle(furniture.name)
        setValue('name', furniture.name)
        setValue('kode', furniture.kode)
        setValue('unit', furniture?.storage?.unit)
        setValue('building', furniture?.storage?.building)
        setValue('floor', furniture?.storage?.storage_floor)
        setValue('room', furniture?.storage?.storage_room)
        if (furniture.deleted_at)
          setParams((value) => ({
            ...value,
            archived: true,
          }))
      })
    }
  }, [currentSlider.id, setValue, showFurniture])

  const { unit, building, floor, room } = watch()

  const onSubmit = handleSubmit(
    handleError(currentSlider.id ? updateFurniture : createFurniture, control),
    checkErrorYup
  )

  return (
    <div className="flex h-screen w-[375px] flex-col gap-6">
      <header className="relative flex items-start gap-x-4 px-4 pt-6">
        <button
          type="button"
          aria-label="Close"
          onClick={() => handleCurrentSlider(null)}
          className="absolute right-[12px] top-[12px] flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
        >
          <XClose className="size-6" stroke="currentColor" />
        </button>

        <div className="flex flex-1 flex-col gap-6">
          <section className="flex flex-col gap-1">
            <p className="text-xl-semibold text-gray-light/900">{title}</p>
            <p className="text-sm-regular text-gray-light/600">
              {currentSlider.id
                ? 'Edit the information below.'
                : 'Complete the information below.'}
            </p>
          </section>
        </div>
      </header>

      <hr className="border-gray-light/200" />

      <section className="flex-1 overflow-hidden">
        <SimpleBar forceVisible="y" style={{ height: '100%' }}>
          <form className="flex h-full flex-col gap-6 px-4" onSubmit={onSubmit}>
            <div className="flex flex-1 flex-col gap-4">
              <label className="text-sm-medium flex flex-col gap-1.5 text-gray-light/700">
                <span className="after:ml-0.5 after:content-['*']">Name</span>
                <MyTextField
                  disabled={params?.archived}
                  name="name"
                  control={control}
                  placeholder="Masukkan nama furniture"
                  errors={errors?.name?.message}
                />
              </label>

              <label className="text-sm-medium flex flex-col gap-1.5 text-gray-light/700">
                <span className="after:ml-0.5 after:content-['*']">Kode</span>
                <MyTextField
                  disabled={params?.archived}
                  name="kode"
                  control={control}
                  placeholder="Masukkan kode furniture"
                  errors={errors?.name?.message}
                />
              </label>

              <label className="text-sm-medium flex flex-col gap-1.5 text-gray-light/700">
                <span className="after:ml-0.5 after:content-['*']">Unit</span>
                <MyAsyncDropdown
                  getOnRender={false}
                  trigger={trigger}
                  // disabled={isArchived}
                  name="unit"
                  placeholder="Pilih unit"
                  control={control}
                  error={errors?.unit?.message}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e?.name}
                  value={unit}
                  asyncFunction={searchUnitList}
                  onChange={(e, value) => {
                    setValue('unit', value)
                  }}
                />
              </label>

              <label className="text-sm-medium flex flex-col gap-1.5 text-gray-light/700">
                <span className="after:ml-0.5 after:content-['*']">Gedung</span>
                <MyAsyncDropdown
                  getOnRender={false}
                  trigger={trigger}
                  disabled={!unit}
                  name="building"
                  placeholder="Pilih gedung"
                  control={control}
                  error={errors?.building?.message}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e?.name}
                  value={building}
                  asyncFunction={searchBuildingList}
                  extraData={{ unit_id: unit?.id }}
                  onChange={(e, value) => {
                    setValue('building', value)
                  }}
                />
              </label>

              <label className="text-sm-medium flex flex-col gap-1.5 text-gray-light/700">
                <span className="after:ml-0.5 after:content-['*']">Lantai</span>
                <MyAsyncDropdown
                  getOnRender={false}
                  trigger={trigger}
                  disabled={!building}
                  name="floor"
                  placeholder="Pilih lantai"
                  control={control}
                  error={errors?.floor?.message}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e?.name}
                  value={floor}
                  asyncFunction={searchFloorList}
                  extraData={{ unit_id: unit?.id, building_id: building?.id }}
                  onChange={(e, value) => {
                    setValue('floor', value)
                  }}
                />
              </label>

              <label className="text-sm-medium flex flex-col gap-1.5 text-gray-light/700">
                <span className="after:ml-0.5 after:content-['*']">
                  Ruangan
                </span>
                <MyAsyncDropdown
                  getOnRender={false}
                  trigger={trigger}
                  disabled={!floor}
                  name="room"
                  placeholder="Pilih ruangan"
                  control={control}
                  error={errors?.room?.message}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(e) => e?.name}
                  value={room}
                  asyncFunction={searchRoomList}
                  extraData={{
                    unit_id: unit?.id,
                    building_id: building?.id,
                    floor_id: floor?.id,
                  }}
                  onChange={(e, value) => {
                    setValue('room', value)
                  }}
                />
              </label>
            </div>

            <footer className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-gray-light/200 bg-white px-4 py-4">
              {currentSlider.id && !params?.archived && (
                <div className="flex-1 items-start">
                  <MyButton
                    disabled={isSubmitting}
                    onClick={() => deleteFurniture(currentSlider.id)}
                    variant="text"
                    size="md"
                  >
                    <span
                      className={`text-sm-semibold ${
                        isSubmitting ? 'text-gray-light/400' : 'text-error/700'
                      }`}
                    >
                      Delete
                    </span>
                  </MyButton>
                </div>
              )}
              <MyButton
                disabled={isSubmitting}
                onClick={() => handleCurrentSlider(null)}
                type="reset"
                color="secondary"
                variant="outlined"
                size="md"
              >
                <span className="text-sm-semibold">Cancel</span>
              </MyButton>
              {params?.archived ? (
                <MyButton
                  onClick={() => restoreFurniture(currentSlider.id)}
                  color="primary"
                  variant="outlined"
                  size="md"
                >
                  <RefreshCcw01 className="size-5" stroke="currentColor" />
                  <span className="text-sm-semibold">Restore</span>
                </MyButton>
              ) : (
                <MyButton
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                  variant="filled"
                  size="md"
                >
                  <span className="text-sm-semibold">Submit</span>
                </MyButton>
              )}
            </footer>
          </form>
        </SimpleBar>
      </section>
    </div>
  )
}

export default FormSlider
