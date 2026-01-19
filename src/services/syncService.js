import { getDB } from "../storage/database";
import { isOnline } from "./network";

let syncing = false;

export const isSyncingNow = () => syncing;

export const syncReports = async (onSyncStateChange) => {
  if (syncing) return;

  syncing = true;
  onSyncStateChange?.(true);

  try {
    const db = await getDB();
    const pendingReports = await db.getAllAsync(
      "SELECT * FROM reports WHERE status = 'Pending'"
    );

    for (const report of pendingReports) {
      await fakeApiCall(report);

      await db.runAsync(
        "UPDATE reports SET status = 'Submitted' WHERE id = ?",
        [report.id]
      );
    }
  } catch (err) {
    console.log("Sync error", err);
  } finally {
    syncing = false;
    onSyncStateChange?.(false);
  }
};

const fakeApiCall = () =>
  new Promise((resolve) => setTimeout(resolve, 1800));
