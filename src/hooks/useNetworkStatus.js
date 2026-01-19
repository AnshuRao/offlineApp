import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  const checkNetwork = async () => {
    const state = await Network.getNetworkStateAsync();
    setIsOnline(
      state.isConnected && state.isInternetReachable
    );
  };

  useEffect(() => {
    checkNetwork();

    const interval = setInterval(checkNetwork, 5000); // every 5 sec
    return () => clearInterval(interval);
  }, []);

  return isOnline;
};
