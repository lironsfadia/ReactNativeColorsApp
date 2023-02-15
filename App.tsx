/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import AddNewPaletteModal from './screens/AddNewPaletteModal';

// Opening a full screen modal
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name='Home' component={Home} />
      <MainStack.Screen
        name='ColorPalette'
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

function App(): JSX.Element {
  console.log('hello world');

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name='Main' component={MainStackScreen} options={{ headerShown: false }} />
        <RootStack.Screen
          name='AddNewPaletteModal'
          component={AddNewPaletteModal}
          options={{ headerShown: true, presentation: 'modal' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
