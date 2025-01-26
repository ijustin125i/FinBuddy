import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FinancialAdvisingScreen from "./screens/FinancialAdvisors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FinancialAdvisingScreen">
      <Stack.Screen
          name="FinancialAdvisingScreen"
          component={FinancialAdvisingScreen}
          options={{ title: "Households" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
