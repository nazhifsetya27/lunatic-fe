import React, { useEffect, useRef, useState } from 'react'
import { Flag05 } from '@untitled-ui/icons-react'
import MyPopper from '../../../components/Poppper/MyPopper'
import SimpleBar from 'simplebar-react'
import MyTextArea from '../../../components/TextField/MyTextArea'

import MyButton from '../../../components/Button/MyButton'
import MyDropzone from '../../../components/Dropzone/MyDropzone'
import MyBgPatternDecorativeCircle from '../../../components/Decorative/MyBgPatternDecorativeCircle'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { actionSchema } from '../schema'
import { checkErrorYup, handleError } from '../../../services/Helper'
import { useApproval } from '../context'

const Menu = ({ target, data, handleClose }) => {
  const { updateApproval } = useApproval()
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(actionSchema),
  })

  const { reason_notes, evidence, status, issue_ids } = watch()
  const [progressUpload, setProgressUpload] = useState(null)
  // console.log(errors);

  const simpleBarRef = useRef(null) // Referensi untuk instance SimpleBar
  useEffect(() => {
    if (simpleBarRef.current) {
      setTimeout(() => {
        simpleBarRef.current.recalculate()
      }, 5000)
    }
  }, [evidence])

  useEffect(() => {
    setValue('status', data.status)
  }, [data])

  return (
    <>
      <MyPopper target={target} placement="bottom-end">
        {(open, anchorEl, show, close, recalculate) => (
          <div className="h-full max-h-[650px] w-[478px] overflow-hidden">
            <SimpleBar style={{ maxHeight: '650px' }} ref={simpleBarRef}>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(
                  handleError(updateApproval, control),
                  checkErrorYup
                )}
              >
                <header className="flex flex-col gap-3 px-6 pt-6">
                  <div>
                    <MyBgPatternDecorativeCircle
                      children={
                        <div className="w-fit rounded-xl border p-3">
                          <Flag05 />
                        </div>
                      }
                    />
                  </div>
                  <p className="text-lg-semibold z-10 text-gray-light/900">
                    {`Sure want to ${
                      data?.status === 'Rejected' ? 'reject' : 'approve'
                    }?`}
                  </p>
                </header>
                <div className="flex flex-col gap-4 px-6">
                  <div className="z-20 flex flex-col gap-1.5">
                    <label
                      htmlFor="description"
                      className="text-sm-medium text-gray-light/700"
                    >
                      Description*
                    </label>
                    <MyTextArea
                      name={'description'}
                      control={control}
                      placeholder={'Input description...'}
                      errors={errors?.description?.message}
                    />
                    <MyButton />
                  </div>
                </div>
                <footer className="flex w-full items-center gap-3 px-6 pb-6">
                  <div className="flex-1">
                    <MyButton
                      // disabled={isSubmitting}
                      onClick={close}
                      color={'secondary'}
                      variant={'outlined'}
                      size={'lg'}
                      expanded
                    >
                      <p className="text-sm-semibold">Cancel</p>
                    </MyButton>
                  </div>
                  <div className="flex-1">
                    {data?.status === 'Rejected' ? (
                      <>
                        <MyButton
                          disabled={isSubmitting}
                          type="submit"
                          color={'error'}
                          variant={'filled'}
                          size={'lg'}
                          expanded
                        >
                          <p className="text-sm-semibold">Reject</p>
                        </MyButton>
                      </>
                    ) : (
                      <>
                        <MyButton
                          disabled={isSubmitting}
                          type="submit"
                          color={'primary'}
                          variant={'filled'}
                          size={'lg'}
                          expanded
                        >
                          <p className="text-sm-semibold">Approve</p>
                        </MyButton>
                      </>
                    )}
                  </div>
                </footer>
              </form>
            </SimpleBar>
          </div>
        )}
      </MyPopper>
    </>
  )
}

export default Menu
