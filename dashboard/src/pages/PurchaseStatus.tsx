import { useState, useCallback, useMemo, useEffect } from "react";
import { useFetcher } from "@/hooks/useFetcher";
import type { PurchaseStatus as PurchaseStatusType } from "@/types";

function PurchaseStatus() {
  // Purchase 데이터와 Refund 데이터가 번갈아 가면서 로드되는 기능 (여기서 다른 클로저 함수에 의해서 메모리릭 발생)
  // + 렌더링 최적화 실습을 위해 fetcher class 구현 (useEffect)

  const [purchaseData, setPurchaseData] = useState<PurchaseStatusType[]>([]);
  const [refundData, setRefundData] = useState<PurchaseStatusType[]>([]);

  // Memoized callbacks to prevent unnecessary re-renders
  const handlePurchaseData = useCallback((data: PurchaseStatusType[]) => {
    setPurchaseData(data);
  }, []);

  const handleRefundData = useCallback((data: PurchaseStatusType[]) => {
    setRefundData(data);
  }, []);
  const { isLoading, error, currentDataType } = useFetcher({
    interval: 3000,
    onPurchaseData: handlePurchaseData,
    onRefundData: handleRefundData,
  });

  // Start fetcher when component mounts
  // useEffect(() => {
  //   startFetcher(handlePurchaseData, handleRefundData);

  //   // Cleanup when component unmounts
  //   return () => {
  //     stopFetcher();
  //   };
  // }, [startFetcher, stopFetcher, handlePurchaseData, handleRefundData]);

  // Memoized current data to prevent unnecessary re-renders
  const currentData = useMemo(() => {
    return currentDataType === "purchase" ? purchaseData : refundData;
  }, [currentDataType, purchaseData, refundData]);

  // Memoized statistics to prevent recalculation on every render
  const statistics = useMemo(() => {
    const totalItems = currentData.length;
    const totalValue = currentData.reduce(
      (sum: number, item: PurchaseStatusType) => sum + item.price,
      0
    );
    const pendingCount = currentData.filter(
      (item: PurchaseStatusType) => item.orderStatus === "pending"
    ).length;
    const approvedCount = currentData.filter(
      (item: PurchaseStatusType) => item.orderStatus === "approved"
    ).length;
    const rejectedCount = currentData.filter(
      (item: PurchaseStatusType) => item.orderStatus === "rejected"
    ).length;

    return {
      totalItems,
      totalValue,
      pendingCount,
      approvedCount,
      rejectedCount,
    };
  }, [currentData]);

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Purchase & Refund Status</h1>
        <div className="flex items-center gap-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentDataType === "purchase"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600"
            }`}>
            Purchase Data
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentDataType === "refund"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}>
            Refund Data
          </div>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-bold">{statistics.totalItems}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Value</div>
          <div className="text-2xl font-bold">
            ${statistics.totalValue.toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {statistics.pendingCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Approved</div>
          <div className="text-2xl font-bold text-green-600">
            {statistics.approvedCount}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Rejected</div>
          <div className="text-2xl font-bold text-red-600">
            {statistics.rejectedCount}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            {currentDataType === "purchase" ? "Purchase" : "Refund"} Orders (
            {currentData.length} items)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.slice(0, 10).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">#{item.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.orderName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.orderEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </div>
                    {item.discount > 0 && (
                      <div className="text-sm text-green-600">
                        -${item.discount.toFixed(2)} discount
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.orderStatus === "approved"
                          ? "bg-green-100 text-green-800"
                          : item.orderStatus === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseStatus;
