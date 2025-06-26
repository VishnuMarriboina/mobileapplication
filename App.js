import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Redux/Store';
import StartScreen from './src/Stacks/StartScreen';
import DriverDetails from './src/Uploads/DriverDetails';
import DrawerNavigator from './src/DrawerNavigator/CustomDrawerContent';
import {PersistGate} from 'redux-persist/integration/react';
import Aadhar from './src/Uploads/Aadhar';
import Licence from './src/Uploads/Licence';
import Insurance from './src/Uploads/Insurance';
import ProfilePhoto from './src/Uploads/ProfilePhoto';
import Splash from './src/Components/Splash';
import Login from './src/login/Login';
import MainStack from './src/Stacks/MainStack';
import PhoneOTP from './src/Components/PhoneOTP';

const App = () => {
  return (
    <>
      {/* <StatusBar backgroundColor={'red'} barStyle="default" /> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                  {/* <StatusBar barStyle='default' translucent={true} /> */}
                  <StatusBar
                    backgroundColor={'transparent'}
                    barStyle="dark-content"
                    translucent={true}
                  />
                  {/* <MainStack /> */}
                  {/* <Bottomsheet /> */}
                  {/* <Login /> */}
                  {/* <Splash /> */}
                  <StartScreen />

                  {/* <PhoneOTP /> */}
                  {/* <DriverDetails /> */}
                  {/* <Aadhar /> */}
                  {/* <Licence /> */}
                  {/* <Insurance /> */}
                  {/* <ProfilePhoto /> */}
                  {/* <DrawerNavigator /> */}
                  {/* <DriverProfile /> */}
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
