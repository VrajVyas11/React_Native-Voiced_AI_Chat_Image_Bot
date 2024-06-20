// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ImageGenerationScreen from '../screens/ImageGenerateScreen';
const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Welcome'>
        <Stack.Screen name="Home" component={ChatScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Image" component={ImageGenerationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;