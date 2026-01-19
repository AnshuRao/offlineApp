import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  RadioButton,
  SegmentedButtons,
  Card,
  Banner,
} from "react-native-paper";
import { getDB } from "../storage/database";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import * as ImagePicker from "expo-image-picker";

export default function ReportIssueScreen({ navigation }) {
  const [siteName, setSiteName] = useState("");
  const [assetType, setAssetType] = useState("Panel");
  const [assetId, setAssetId] = useState("");
  const [issueType, setIssueType] = useState("Crack");
  const [severity, setSeverity] = useState("Low");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const isOnline = useNetworkStatus();
  const onSubmit = async () => {
    if (!validateForm()) return;

    const db = await getDB();

    const result = await db.runAsync(
      `INSERT INTO reports
     (siteName, assetType, issueType, severity, comment, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        siteName,
        assetType,
        issueType,
        severity,
        comment,
        "Pending",
        new Date().toISOString(),
      ],
    );
    const reportId = result.lastInsertRowId;

    for (const img of images) {
      await db.runAsync(
        `INSERT INTO report_images 
     (reportId, imageUri, status, createdAt)
     VALUES (?, ?, ?, ?)`,
        [reportId, img.uri, "Pending", new Date().toISOString()],
      );
    }
    setSiteName("");
    setAssetType("Panel");
    setAssetId("");
    setIssueType("Crack");
    setSeverity("Low");
    setComment("");
    setImages([]);
    setErrors({});
    navigation.navigate("ReportIssueNavigation");
  };
  const pickImages = async () => {
    // alert("Picking images");

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required to access images");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0]]);
    }
  };
  const removeImage = (uri) => {
    setImages((prev) => prev.filter((img) => img.uri !== uri));
  };
  const validateForm = () => {
    const newErrors = {};

    if (!siteName.trim()) {
      newErrors.siteName = "Site name is required";
    }

    if (!assetId.trim()) {
      newErrors.assetId = "Asset ID is required";
    }

    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    if (comment.length > 300) {
      newErrors.comment = "Comment cannot exceed 300 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      {!isOnline && (
        <Banner visible icon="wifi-off">
          You are offline. Reports will sync automatically when online.
        </Banner>
      )}
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Card>
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>
              Report Issue
            </Text>

            <TextInput
              label="Site Name"
              value={siteName}
              onChangeText={setSiteName}
              mode="outlined"
              style={styles.input}
              error={!!errors.siteName}
            />
            {errors.siteName && (
              <Text style={styles.error}>{errors.siteName}</Text>
            )}
            <TextInput
              label="Asset ID / Serial Number"
              value={assetId}
              onChangeText={setAssetId}
              mode="outlined"
              style={styles.input}
              error={!!errors.assetId}
            />
            {errors.assetId && (
              <Text style={styles.error}>{errors.assetId}</Text>
            )}

            <Text style={styles.label}>Asset Type</Text>
            <SegmentedButtons
              value={assetType}
              onValueChange={setAssetType}
              buttons={[
                { value: "Panel", label: "Panel" },
                { value: "Inverter", label: "Inverter" },
              ]}
              style={styles.segment}
            />

            <Text style={styles.label}>Issue Type</Text>
            <SegmentedButtons
              value={issueType}
              onValueChange={setIssueType}
              buttons={[
                { value: "Crack", label: "Crack" },
                { value: "Dust", label: "Dust" },
                { value: "Hotspot", label: "Hotspot" },
                { value: "Inverter Error", label: "Inverter Error" },
              ]}
              style={styles.segment}
            />

            <Text style={styles.label}>Severity</Text>
            <RadioButton.Group onValueChange={setSeverity} value={severity}>
              <View style={styles.radioRow}>
                <RadioButton value="Low" />
                <Text>Low</Text>

                <RadioButton value="Medium" />
                <Text>Medium</Text>

                <RadioButton value="Critical" />
                <Text>Critical</Text>
              </View>
            </RadioButton.Group>

            <TextInput
              label="Comment (optional)"
              value={comment}
              onChangeText={setComment}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
              error={!!errors.comment}
            />
            {errors.comment && (
              <Text style={styles.error}>{errors.comment}</Text>
            )}

            <Button
              mode="outlined"
              icon="camera"
              style={styles.photoButton}
              onPress={pickImages}
            >
              Add Photos
            </Button>

            {errors.images && <Text style={styles.error}>{errors.images}</Text>}

            <View style={styles.imageRow}>
              {images.map((img) => (
                <View key={img.uri} style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.image} />
                  <Button
                    compact
                    icon="close"
                    onPress={() => removeImage(img.uri)}
                  />
                </View>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={onSubmit}
              style={styles.submitButton}
            >
              Submit Issue
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
  },
  segment: {
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  photoButton: {
    marginTop: 12,
  },
  submitButton: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  imageWrapper: {
    marginRight: 8,
    marginTop: 8,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
});
