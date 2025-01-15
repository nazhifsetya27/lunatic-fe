import React from 'react'
import SimpleBar from 'simplebar-react'
import MyDetailView from '../../../../components/DetailView/MyDetailView'

function General({ furnitureDetail }) {
  return (
    <div className="flex-1 overflow-hidden">
      <SimpleBar forceVisible="y" style={{ height: '100%' }}>
        <div className="flex flex-1 flex-col gap-8 pb-8 pt-4">
          <div className="flex flex-col gap-6">
            <div className="flex-col px-4">
              <p className="text-sm-semibold text-gray-light/700">
                Furniture information
              </p>
              <p className="text-sm-regular text-gray-light/600">
                Detail furniture information.
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <MyDetailView datas={furnitureDetail ?? {}} />
            </div>
          </div>
        </div>
      </SimpleBar>
    </div>
  )
}

export default General
