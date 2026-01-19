import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, Card, Chip, Banner } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getDB } from "../storage/database";
import { syncReports } from "../services/syncService";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function MyReportsScreen({ navigation }) {
  const [reports, setReports] = useState([]);

  const isOnline = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);

  const loadReports = async () => {
    try {
      const db = await getDB();
      const rows = await db.getAllAsync(
        "SELECT * FROM reports ORDER BY createdAt DESC",
      ); 
      setReports([...rows]);
    } catch (error) {
      console.log("Error loading reports", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isOnline) {
        syncReports(setIsSyncing).then(loadReports);
      }
      loadReports();
    }, [isOnline]),
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "green";
      case "Failed":
        return "red";
      default:
        return "orange"; // Pending
    }
  };

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("ReportDetails", { reportId: item.id })
      }
    >
      <Card.Content>
        <Text variant="titleMedium">{item.siteName}</Text>

        <Text style={styles.meta}>
          {item.issueType} • {item.assetType}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>

          <Chip
            textStyle={{ color: "white" }}
            style={[
              styles.chip,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            {item.status}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  if (reports.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge">No reports submitted yet</Text>
      </View>
    );
  }

  return (
    <>
      {!isOnline && (
        <Banner visible icon="wifi-off">
          Offline · Reports will sync when online
        </Banner>
      )}

      {isOnline && isSyncing && (
        <Banner visible icon="sync">
          Syncing reports…
        </Banner>
      )}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  meta: {
    marginTop: 4,
    opacity: 0.7,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    opacity: 0.6,
  },
  chip: {
    height: 28,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
