import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import maintenanceLogo from "../../assets/icon.png";
import { Image } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    setLoading(true);

    // TEMP: simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.replace("SECURE_ROUTE");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={maintenanceLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Maintenance
            </Text>

            <Text variant="bodyMedium" style={styles.subtitle}>
              Technician Login
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={onLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    paddingVertical: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.7,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 140,
    height: 140,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },

  card: {
    borderRadius: 12,
    elevation: 4,
  },

  title: {
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "bold",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },

  input: {
    marginBottom: 12,
  },

  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
});
