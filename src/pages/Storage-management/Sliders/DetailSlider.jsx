import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  XClose,
  Plus,
  LinkExternal02,
  Trash01,
  ArrowLeft,
} from '@untitled-ui/icons-react'
import { validate } from 'uuid'
import { useStorageManagement } from '../context'
import { RackManagementSchema } from '../schema'
import { handleError, checkErrorYup } from '../../../services/Helper'
import FormSliderNewRackManagement from './FormSlider'
import MyDataTable from '../../../components/Table/MyDataTable'
import MyColumn from '../../../components/Table/MyColumn'
import MyButton from '../../../components/Button/MyButton'
import MyAsyncDropdown from '../../../components/Autocomplete/MyAsyncDropdown'
import MyTextField from '../../../components/TextField/MyTextField'

function FormSliderDetailRackManagement() {
  const {
    currentSlider,
    showRackManagement,
    createRackManagement,
    updateRackManagement,
    handleCurrentSlider,
    searchRackCategoryList,
    bulkDeleteRackManagement,
    setRackManagement,
    deleteRackManagement,
    validateRack,
  } = useStorageManagement()

  const [title, setTitle] = useState('')
  const [children, setChildren] = useState(null)
  const [totalNewData, setTotalNewData] = useState(0)
  const [parent, setParent] = useState(null)
  const [childSubmit, setChildSubmit] = useState({})
  const [childDefault, setChildDefault] = useState([])

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: !children?.data ? yupResolver(RackManagementSchema) : null,
  })

  const { type, parent_grade } = watch()

  const onSubmit = async (data) => {
    if (totalNewData) {
      data.index = totalNewData
    }
    if (!data.type) {
      data.type = { id: children.data[0]?.category.id }
    }
    const isCreate = !children.data

    const functionToCall = isCreate
      ? createRackManagement
      : updateRackManagement
    const argumentToPass = isCreate ? data : childSubmit

    handleError(functionToCall, control)(argumentToPass)
  }

  useEffect(() => {
    showRackManagement(currentSlider.id).then((data) => {
      setTitle(`${data?.category?.type} ${data?.index}`)
      setValue('id', data.id)
      setValue('parent_grade', data?.category?.grade)
      setValue('rack_category_id', data.rack_category_id)
      setParent(data?.parent_id)
      // setValue('parent_id', )
      const childrenData =
        Array.isArray(data.children) && data.children.length > 0
          ? data.children
          : null
      setChildren({ data: childrenData })
      setChildSubmit({ id: currentSlider.id, data: childrenData })
      setTotalNewData(0)
      setChildDefault(childrenData?.map((child) => child.id))
    })
  }, [currentSlider.id, showRackManagement, setValue, handleCurrentSlider])

  const handleAddNewRackType = () => {
    const lastIndex =
      children.data.length > 0
        ? Math.max(...children.data.map((item) => item.index))
        : 0
    const newRack = {
      id: new Date(),
      category: {
        grade: children.data[0]?.category?.grade,
        type: children.data[0]?.category?.type,
        id: children.data[0]?.category?.id,
      },
      parent_id: children.data[0]?.parent_id,
      rack_category_id: children.data[0]?.rack_category_id,
      warehouse_id: children.data[0]?.warehouse_id,
      index: lastIndex + 1,
    }
    const newRackSubmit = {
      category: {
        grade: children.data[0]?.category?.grade,
        type: children.data[0]?.category?.type,
        id: children.data[0]?.category?.id,
      },
      parent_id: children.data[0]?.parent_id,
      rack_category_id: children.data[0]?.rack_category_id,
      warehouse_id: children.data[0]?.warehouse_id,
      index: lastIndex + 1,
    }
    setChildren((prev) => ({
      data: [...prev.data, newRack],
    }))
    setChildSubmit((prev) => ({
      data: [...prev.data, newRackSubmit],
      id: childSubmit?.id,
    }))
    setTotalNewData((prevTotal) => prevTotal + 1)
  }

  const handleDeleteRackType = async (value) => {
    if (window.confirm('Do you want to delete this rack?')) {
      if (value?.id) {
        try {
          await validateRack(value.id)
        } catch (error) {
          return
        }
      }
      setChildren((prev) => ({
        data: prev.data.filter((item) => item.index !== value.index),
      }))
      if (childDefault.includes(value?.id)) {
        deleteRackManagement(value?.id)
      }

      setChildSubmit((prev) => ({
        data: prev.data.filter((item) => item.index !== value.index),
        id: childSubmit?.id,
      }))
      setTotalNewData((prevTotal) => prevTotal - 1)
    }
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
        {parent ? (
          <button
            className="flex items-center gap-2 text-gray-600"
            onClick={() =>
              handleCurrentSlider(
                { status: true, current: 'form-detail-slider' },
                parent
              )
            }
          >
            <ArrowLeft stroke="currentColor" className="text-gray size-5" />
            <p className="text-sm-semibold">Back</p>
          </button>
        ) : (
          <div className="flex gap-2" />
        )}

        <section className="flex flex-col gap-3">
          <p className="text-xl-semibold text-gray-light/900">{title}</p>
        </section>
        <div className="gap-10" />
      </header>
      <div className="flex-1 overflow-auto">
        {children && children.data ? (
          <>
            <MyDataTable
              values={children}
              // onClick={(value) => {
              //   if (params.archive) {
              //     handleCurrentSlider(
              //       { status: true, current: 'form-detail-slider' },
              //       value.id
              //     )
              //   }
              // }}
              onDeleteAll={bulkDeleteRackManagement}
              selectionMode="multiple"
              onSelectionChange={(value) => setChildren(value)}
            >
              <MyColumn
                sortable
                field="type"
                header={children.data?.[0]?.category?.type}
                body={(value) => (
                  <p className="text-sm-medium text-gray-light/900">
                    {value?.category?.type} {value?.index}
                  </p>
                )}
              />
              <MyColumn
                alignment="right"
                body={(value) => (
                  <div className="flex items-center justify-end gap-1">
                    <MyButton
                      onClick={() =>
                        handleDeleteRackType({
                          index: value.index,
                          id: value?.id,
                        })
                      }
                      size="md"
                      variant="text"
                    >
                      <Trash01
                        className="size-5 text-gray-light/600"
                        stroke="currentColor"
                      />
                    </MyButton>
                    <MyButton
                      onClick={() =>
                        handleCurrentSlider(
                          { status: true, current: 'form-detail-slider' },
                          value.id
                        )
                      }
                      size="md"
                      variant="text"
                    >
                      <LinkExternal02
                        className="size-5 text-gray-light/600"
                        stroke="currentColor"
                      />
                    </MyButton>
                  </div>
                )}
              />
            </MyDataTable>

            <MyButton
              onClick={handleAddNewRackType}
              color="primary"
              variant="text"
              size="md"
            >
              <Plus className="size-5" stroke="currentColor" />
              <span className="text-sm-semibold py-4">
                Add new {children?.data[0]?.category?.type || 'Rack Type'}
              </span>
            </MyButton>
            <hr className="w-full gap-2 border-gray-light/200" />
          </>
        ) : (
          <div className="flex-1 overflow-hidden">
            <hr className="w-100% border-gray-light/200" />
            <SimpleBar forceVisible="y" style={{ height: '100%' }}>
              <form className="flex h-full flex-col gap-8" onSubmit={onSubmit}>
                <section className="flex flex-col gap-6 px-4 py-4">
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm-medium mb-2 text-gray-light/700" // Added margin-bottom here
                    >
                      Rack type
                    </label>
                    <MyAsyncDropdown
                      trigger={trigger}
                      name="type"
                      placeholder="Select rack type"
                      control={control}
                      error={errors?.type?.message}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(e) => e?.type}
                      value={type}
                      extraData={{ grade: parent_grade }}
                      asyncFunction={searchRackCategoryList}
                      onChange={(e, value) => {
                        setValue('type', value)
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-y-1.5">
                    <label
                      htmlFor="customer"
                      className="text-sm-medium text-gray-light/700"
                    >
                      Quantity
                    </label>
                    <MyTextField
                      name="index"
                      type="number"
                      control={control}
                      placeholder="Input quantity"
                    />
                  </div>
                </section>
                <footer className="flex items-center justify-center gap-4 border-t border-gray-light/200 px-4 py-4">
                  <MyButton
                    expanded
                    disabled={isSubmitting}
                    type="button"
                    color="primary"
                    variant="filled"
                    size="md"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Plus className="size-5" stroke="currentColor" />
                    <p className="text-sm-semibold">New rack type</p>
                  </MyButton>
                </footer>
              </form>
            </SimpleBar>
          </div>
        )}
      </div>
      {children && children.data && (
        <footer className="flex items-center justify-end gap-4 border-t border-gray-light/200 px-4 py-4">
          {/* <MyButton
            disabled={isSubmitting}
            color="secondary"
            variant="outlined"
            size="md"
            onClick={() => {
              reset()
              showRackManagement(currentSlider.id).then((data) => {
                setTitle(data?.category?.type + ' ' + data?.index)
                setValue('id', data.id)
                setValue('rack_category_id', data.rack_category_id)
                const childrenData =
                  Array.isArray(data.children) && data.children.length > 0
                    ? data.children
                    : null
                setChildren({ data: childrenData })
                setTotalNewData(0)
              })
            }}
          >
            <p className="text-sm-semibold">Reset</p>
          </MyButton> */}
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
      )}
    </div>
  )
}

export default FormSliderDetailRackManagement
