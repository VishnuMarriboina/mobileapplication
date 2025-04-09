// src/Navigation/AppDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './MainStack';
import CustomDrawerContent from '../DrawerNavigator/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"  // Corrected case
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Dashboard" component={MainStack} />
        </Drawer.Navigator>

    );
};

export default DrawerScreen;


// <Drawer.Navigator screenOptions={{ headerShown: false }}>
//     <Drawer.Screen name="Dashboard" component={MainStack} />
//     <Drawer.Screen
//         name="Trips"
//         component={Trips}
//         options={{ drawerLabel: 'My Trips' }}
//     />
//     {/* Add more drawer items if needed */}
// </Drawer.Navigator>