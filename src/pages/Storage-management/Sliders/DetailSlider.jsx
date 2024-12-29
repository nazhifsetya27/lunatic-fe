import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  XClose,
  Plus,
  LinkExternal02,
  Trash01,
  ArrowLeft,
} from '@untitled-ui/icons-react'
import { useStorageManagement } from '../context'
import { updateStorageManagementSchema } from '../schema'
import { handleError, checkErrorYup } from '../../../services/Helper'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'
import MyButton from '../../../components/Button/MyButton'
import MyAsyncDropdown from '../../../components/Autocomplete/MyAsyncDropdown'

function FormSliderDetailRackManagement() {
  const {
    currentSlider,
    showStorageManagement,
    createRackManagement,
    updateStorageManagement,
    handleCurrentSlider,
    searchRackCategoryList,
    bulkDeleteRackManagement,
    setRackManagement,
    deleteRackManagement,
    validateRack,
    createStorageManagement,
    searchFloorList,
    searchRoomList,
    category,
    setcategory,
  } = useStorageManagement()

  const [title, setTitle] = useState('')
  const [storage, setStorage] = useState()
  const [isAddNewStorage, setIsAddNewStorage] = useState(false)

  const existing_ids = storage?.map((val) => val.id)

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(updateStorageManagementSchema),
  })

  const { type, level } = watch()

  const onSubmit = handleSubmit(
    handleError(
      currentSlider.id ? updateStorageManagement : createStorageManagement,
      control
    ),
    checkErrorYup
  )

  useEffect(() => {
    showStorageManagement(currentSlider.id).then((data) => {
      setTitle(`Edit ${data.category}`)
      setStorage(data.data)
      setcategory(data.category)
    })
  }, [currentSlider.id, showStorageManagement, setValue, handleCurrentSlider])

  const handleAddNewStorage = () => {
    setIsAddNewStorage(true)
  }

  return (
    <div className="flex h-screen w-[375px] flex-col">
      <header className="relative flex flex-col items-start gap-y-4 px-4 pt-6">
        <button
          onClick={() => handleCurrentSlider(null)}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-light/400"
        >
          <XClose size={24} stroke="currentColor" />
        </button>
        {currentSlider?.data?.category !== 'Lantai' && (
          <button
            className="flex items-center gap-2 text-gray-600"
            onClick={() =>
              handleCurrentSlider(
                {
                  status: true,
                  current: 'form-detail-slider',
                  data: { category: 'Lantai' },
                },
                currentSlider?.data?.previous_building_id
              )
            }
          >
            <ArrowLeft stroke="currentColor" className="text-gray size-5" />
            <p className="text-sm-semibold">Back</p>
          </button>
        )}

        <section className="flex flex-col gap-3">
          <p className="text-xl-semibold text-gray-light/900">{title}</p>
        </section>
        <div className="gap-10" />
      </header>
      <div className="flex-1 overflow-auto">
        <MyDataTable
          values={{ data: storage }}
          // onClick={(value) => {
          //   if (params.archive) {
          //     handleCurrentSlider(
          //       { status: true, current: 'form-detail-slider' },
          //       value.id
          //     )
          //   }
          // }}
          onDeleteAll={bulkDeleteRackManagement}
          // selectionMode="multiple"
          // onSelectionChange={(value) => setChildren(value)}
        >
          <MyColumn
            sortable
            field="type"
            header={category}
            body={({ name }) => (
              <p className="text-sm-medium text-gray-light/900">{name}</p>
            )}
          />
          <MyColumn
            alignment="right"
            body={(value) => (
              <div className="flex items-center justify-end gap-1">
                <MyButton
                  // onClick={() =>
                  //   handleDeleteRackType({
                  //     index: value.index,
                  //     id: value?.id,
                  //   })
                  // }
                  size="md"
                  variant="text"
                >
                  <Trash01
                    className="size-5 text-gray-light/600"
                    stroke="currentColor"
                  />
                </MyButton>
                {currentSlider?.data?.category !== 'Ruangan' && (
                  <MyButton
                    onClick={() => {
                      handleCurrentSlider(
                        {
                          status: true,
                          current: 'form-detail-slider',
                          data: {
                            category: 'Ruangan',
                            previous_building_id: currentSlider?.id,
                          },
                        },
                        value.id
                      )
                      setIsAddNewStorage(false)
                    }}
                    size="md"
                    variant="text"
                  >
                    <LinkExternal02
                      className="size-5 text-gray-light/600"
                      stroke="currentColor"
                    />
                  </MyButton>
                )}
              </div>
            )}
          />
        </MyDataTable>

        <MyButton
          onClick={handleAddNewStorage}
          color="primary"
          variant="text"
          size="md"
          disabled={isAddNewStorage}
        >
          <Plus className="size-5" stroke="currentColor" />
          <span className="text-sm-semibold py-4">Tambah {category}</span>
        </MyButton>
        <hr className="w-full gap-2 border-gray-light/200" />
        {isAddNewStorage && (
          <div className="flex flex-col gap-y-1.5 px-3 pt-2">
            <label
              htmlFor="name"
              className="text-sm-medium text-gray-light/700"
            >
              {category}*
            </label>
            <MyAsyncDropdown
              trigger={trigger}
              name="level"
              control={control}
              error={errors?.level?.message}
              placeholder={`Select ${category}`}
              multiple
              isOptionEqualToValue={(option, value) => option.id == value.id}
              getOptionLabel={(e) => e.name}
              value={level}
              asyncFunction={
                category === 'Lantai' ? searchFloorList : searchRoomList
              }
              extraData={{ existing_ids }}
              onChange={(e, value) => {
                if (
                  value.some(
                    (obj) => obj.id === '97424fda-70f1-44ae-b4f5-29ba854ab71e' // All warehouse
                  )
                ) {
                  setValue('buildings', null)
                  setValue('buildings', [value[value.length - 1]])
                } else {
                  setValue('level', value)
                }
              }}
            />
          </div>
        )}
      </div>
      <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
        <MyButton
          disabled={isSubmitting}
          type="submit"
          color="primary"
          variant="filled"
          size="md"
          onClick={handleSubmit(onSubmit)}
        >
          <p className="text-sm-semibold">Submit</p>
        </MyButton>
      </footer>
    </div>
  )
}

export default FormSliderDetailRackManagement
