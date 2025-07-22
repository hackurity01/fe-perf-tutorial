import { useState, useCallback, useEffect } from "react";
import {
  getRealTimePurchaseStatus,
  getRealTimeRefundStatus,
} from "@/data/mockData";
import type { PurchaseStatus as PurchaseStatusType } from "@/types";

// Fetcher class for alternating data loading with memory leak prevention
class PurchaseRefundFetcher {
  private isDestroyed = false;
  private currentTimeout: number | null = null;
  private isPurchaseTurn = true;
  private onPurchaseData: (data: PurchaseStatusType[]) => void;
  private onRefundData: (data: PurchaseStatusType[]) => void;
  private interval: number;

  constructor(
    onPurchaseData: (data: PurchaseStatusType[]) => void,
    onRefundData: (data: PurchaseStatusType[]) => void,
    interval: number = 2000
  ) {
    this.onPurchaseData = onPurchaseData;
    this.onRefundData = onRefundData;
    this.interval = interval;
  }

  start() {
    this.fetchData();
  }

  private async fetchData() {
    if (this.isDestroyed) return;

    try {
      if (this.isPurchaseTurn) {
        console.log("[Fetcher] Fetching purchase data...");
        const data = await getRealTimePurchaseStatus();
        if (!this.isDestroyed) {
          this.onPurchaseData(data);
        }
      } else {
        console.log("[Fetcher] Fetching refund data...");
        const data = await getRealTimeRefundStatus();
        if (!this.isDestroyed) {
          this.onRefundData(data);
        }
      }

      this.isPurchaseTurn = !this.isPurchaseTurn;
    } catch (error) {
      console.error("[Fetcher] Error fetching data:", error);
    }

    // Schedule next fetch if not destroyed
    if (!this.isDestroyed) {
      this.currentTimeout = setTimeout(() => {
        this.fetchData();
      }, this.interval);
    }
  }

  destroy() {
    this.isDestroyed = true;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }
}

interface UseFetcherReturn {
  isLoading: boolean;
  error: string | null;
  currentDataType: "purchase" | "refund";
}

export function useFetcher({
  interval,
  onPurchaseData,
  onRefundData,
}: {
  interval: number;
  onPurchaseData: (data: PurchaseStatusType[]) => void;
  onRefundData: (data: PurchaseStatusType[]) => void;
}): UseFetcherReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDataType, setCurrentDataType] = useState<"purchase" | "refund">(
    "purchase"
  );
  const [fetcher, setFetcher] = useState<PurchaseRefundFetcher | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    if (fetcher) {
      return;
    }

    const newFetcher = new PurchaseRefundFetcher(
      onPurchaseData,
      onRefundData,
      interval
    );

    setFetcher(newFetcher);
  }, []);

  return {
    isLoading,
    error,
    currentDataType,
  };
}
