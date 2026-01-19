import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  Text,
  Card,
  Chip,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { getDB } from "../storage/database";

export default function ReportDetailsScreen({ route }) {
  const { reportId } = route.params;

  const [report, setReport] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const db = await getDB();

    // Fetch report
    const reportResult = await db.getAllAsync(
      "SELECT * FROM reports WHERE id = ?",
      [reportId]
    );

    // Fetch images
    const imageResult = await db.getAllAsync(
      "SELECT * FROM report_images WHERE reportId = ?",
      [reportId]
    );

    setReport(reportResult[0]);
    setImages(imageResult);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "green";
      case "Failed":
        return "red";
      default:
        return "orange";
    }
  };

  if (loading || !report) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Status */}
      <View style={styles.statusRow}>
        <Text variant="titleMedium">Status</Text>
        <Chip
          style={[
            styles.statusChip,
            { backgroundColor: getStatusColor(report.status) },
          ]}
          textStyle={{ color: "white" }}
        >
          {report.status}
        </Chip>
      </View>

      {/* Report Summary */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">{report.siteName}</Text>

          <Text style={styles.meta}>
            {report.issueType} • {report.assetType}
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Severity</Text>
            <Text>{report.severity}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Reported At</Text>
            <Text>
              {new Date(report.createdAt).toLocaleString()}
            </Text>
          </View>

          {report.comment ? (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.label}>Comment</Text>
              <Text>{report.comment}</Text>
            </>
          ) : null}
        </Card.Content>
      </Card>

      {/* Images */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Attached Images
      </Text>

      {images.length === 0 ? (
        <Text style={styles.emptyText}>
          No images attached
        </Text>
      ) : (
        <View style={styles.imageGrid}>
          {images.map((img) => (
            <Image
              key={img.id}
              source={{ uri: img.imageUri }}
              style={styles.image}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusChip: {
    height: 28,
  },
  card: {
    marginBottom: 20,
  },
  meta: {
    marginTop: 4,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    opacity: 0.7,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: "30%",
    height: 100,
    marginRight: "3%",
    marginBottom: 12,
    borderRadius: 6,
  },
  emptyText: {
    opacity: 0.6,
  },
});
