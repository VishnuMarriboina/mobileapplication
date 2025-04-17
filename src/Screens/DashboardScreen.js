import { View, Text } from 'react-native'
import React from 'react'
import Dashboard from '../Pages/Dashboard/Dashboard'
import DashboardActive from '../Pages/Dashboard/DashboardActive'
import DashboardInactive from '../Pages/Dashboard/DashboardInactive'
import { useDispatch, useSelector } from 'react-redux'
import { ConsoleLogger } from 'aws-amplify/utils'

const DashboardScreen = () => {

  const status = useSelector((state) => state.Driverdata.status);

  const user = useSelector((state) => { state.Authdata.isNewUser })
  console.log("status", status);

  console.log("about user", user);


  return (
    <View style={{ flex: 1 }}>

      <Dashboard />
      {/* <DashboardActive /> */}
      {/* <DashboardInactive /> */}
    </View>
  )
}

export default DashboardScreen




