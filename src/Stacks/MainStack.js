import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile, Footer, NotificationScreen, Header, Login, ClaimedRewards, UnclaimedRewards, TripDetails, DashBoard, Trips, Rewards, FuelRecords, Splash, StartScreen, Aadhar, Insurance, Licence, ProfilePhoto, DriverProfile, DriverDetails, DrawerNavigator } from './Export';
import { BRANDCOLOR } from '../Utils/Colors';



const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <>

            <Stack.Navigator
                initialRouteName="Footer"  // Corrected case
                screenOptions={({ navigation, route }) => ({
                    contentStyle: { backgroundColor: '#fff' },
                    header: () => <Header route={route} navigation={navigation} />,  // Ensure Header is imported correctly
                })}
            >
                <Stack.Screen
                    name="Footer"
                    component={Footer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerShown: false,
                        // contentStyle: { backgroundColor: BRANDCOLOR },
                    }}
                />
                <Stack.Screen
                    name="NotificationScreen"
                    component={NotificationScreen}
                    options={{
                        headerShown: false,
                        // contentStyle: { backgroundColor: BRANDCOLOR },
                    }}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                        // contentStyle: { backgroundColor: BRANDCOLOR },
                    }}
                />
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{
                        headerShown: false,
                        // contentStyle: { backgroundColor: BRANDCOLOR },
                    }}
                />
                <Stack.Screen
                    name="StartScreen"
                    component={StartScreen}
                    options={{
                        headerShown: false,
                        // contentStyle: { backgroundColor: BRANDCOLOR },
                    }}
                />
                <Stack.Screen
                    name="ClaimedRewards"
                    component={ClaimedRewards}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="UnclaimedRewards"
                    component={UnclaimedRewards}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen

                    name="TripDetails"
                    component={TripDetails}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="FuelRecords"
                    component={FuelRecords}
                    options={{
                        headerShown: true
                    }}
                />
                {/* upload screen */}
                <Stack.Screen
                    name="Aadhar"
                    component={Aadhar}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name="Insurance"
                    component={Insurance}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name="Licence"
                    component={Licence}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name="ProfilePhoto"
                    component={ProfilePhoto}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name="DriverProfile"
                    component={DriverProfile}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name="DriverDetails"
                    component={DriverDetails}
                    options={{
                        headerShown: true
                    }}
                />

                {/* <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}
                    options={{
                        headerShown: true
                    }}
                /> */}


            </Stack.Navigator>
        </>

    );
};

export default MainStack;
