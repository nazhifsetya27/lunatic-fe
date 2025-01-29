// Libraries
import React, { createContext, useContext, useState, useEffect } from 'react'

// Utils
import { Service } from './service'
import { myToaster } from '../../components/Toaster/MyToaster'

const DashboardContext = createContext()
const DashboardProvider = (props) => {
  const [params, setParams] = useState({})
  const [performance, setPerformance] = useState(null)
  const getPerformance = async () => {
    const data = JSON.parse(JSON.stringify(params))
    // data.name = params.name;
    await Service.getPerformance(data)
      .then((res) => setPerformance(res))
      .catch(myToaster)
  }

  return (
    <DashboardContext.Provider
      value={{
        params,
        setParams,
        performance,
        setPerformance,
        getPerformance,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  )
}

const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

export { DashboardProvider, useDashboard }
