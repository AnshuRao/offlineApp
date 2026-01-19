import { View, StyleSheet } from "react-native";
import { Avatar, Text, List, Button, Divider } from "react-native-paper";

export default function ProfileScreen({ navigation }) {
  const user = {
    name: "Hitesh Sharma",
    email: "hitesh.sharma@solarco.com",
    role: "Maintenance Technician",
    employeeId: "TECH-1024",
  };
  const onLogout = () => {
    navigation.replace("UNSECURE_ROUTE");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={72} label={user.name.charAt(0)} />
        <Text variant="titleLarge" style={styles.name}>
          {user.name}
        </Text>
        <Text variant="bodyMedium" style={styles.role}>
          {user.role}
        </Text>
      </View>

      <Divider />

      <List.Section>
        <List.Item
          title="Email"
          description={user.email}
          left={(props) => <List.Icon {...props} icon="email-outline" />}
        />
        <List.Item
          title="Employee ID"
          description={user.employeeId}
          left={(props) => (
            <List.Icon {...props} icon="badge-account-outline" />
          )}
        />
      </List.Section>

      <Divider />

      <Button mode="outlined" onPress={onLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginVertical: 24,
  },
  name: {
    marginTop: 12,
  },
  role: {
    opacity: 0.6,
  },
  logoutButton: {
    marginTop: 24,
  },
});
