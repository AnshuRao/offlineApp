import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyReportsScreen from "../screens/MyReportsScreen";
import ReportIssueScreen from "../screens/ReportIssueScreen";
import ReportDetailsScreen from "../screens/ReportDetailsScreen";

const Stack = createNativeStackNavigator();

const ReportIssueNavigation = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="MyReports"
        component={MyReportsScreen}
        options={{ headerShown: false }}
        key="MyReports"
      />
      <Stack.Screen
        name="Report"
        component={ReportIssueScreen}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen
        name="ReportDetails"
        component={ReportDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ReportIssueNavigation;
