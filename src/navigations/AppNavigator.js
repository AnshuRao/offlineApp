import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ReportDetailsScreen from "../screens/ReportDetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";


import { useTheme } from "react-native-paper";

import ProfileScreen from "../screens/UserProfile";
import ReportIssueNavigation from "./ReportIssueNavigation";
import MyReportsScreen from "../screens/MyReportsScreen";
import ReportIssueScreen from "../screens/ReportIssueScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UnsecuredRouteNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ForgetPassword"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SecuredRouteNavigation = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName = "alert-circle-outline";

          if (route.name === "ReportIssue") {
            iconName = "clipboard-alert-outline";
          } else if (route.name === "ReportIssueNavigation") {
            iconName = "clipboard-text-outline";
          }else if (route.name === "UserProfile"){
            iconName = "account-circle-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="ReportIssueNavigation"
        component={ReportIssueNavigation}
        options={{ title: "My Report" }}
      />
      <Tab.Screen
        name="ReportIssue"
        component={ReportIssueScreen}
        options={{ title: "Report an Issue" }}
      />
      <Tab.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
    </Tab.Navigator>
  );
};

const RouteNavigation = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
          name="SPLASH_ROUTE"
          component={SplashRouteNavigation}
          options={{ headerShown: false }}
        /> */}
      <Stack.Screen
        name="UNSECURE_ROUTE"
        component={UnsecuredRouteNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SECURE_ROUTE"
        component={SecuredRouteNavigation}
        options={{ headerShown: false }}
        key="SECURE_ROUTE"
      />
    </Stack.Navigator>
  );
};

export default RouteNavigation;
