import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import RouteNavigation from "./src/navigations/AppNavigator";
import { initDB } from "./src/storage/database";
import { useEffect } from "react";

// main app component
export default function App() {
  useEffect(() => {
    initDB().catch(console.error);
  }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        <RouteNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
