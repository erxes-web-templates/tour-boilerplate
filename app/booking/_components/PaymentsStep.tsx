"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { BookingFormData } from "./BookingForm";
import { useSearchParams } from "next/navigation";
import { useLazyQuery, useQuery } from "@apollo/client";
import { INVOICE_DETAIL } from "@/graphql/queries";
import { Button } from "@/components/ui/button";

interface PaymentsStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  totalPrice: number;
  onBack: () => void;
  onSubmit: () => void;
}

// const useInvoiceStatusPolling = (invoiceId: string) => {
//   const [initialStatus, setInitialStatus] = useState(null);
//   const [hasStatusChanged, setHasStatusChanged] = useState(false);
//   const [sessionExpired, setSessionExpired] = useState(false);
//   const [isPolling, setIsPolling] = useState(false);
//   const [invoiceData, setInvoiceData] = useState(null);

//   const intervalRef = useRef(null);
//   const sessionTimeoutRef = useRef(null);
//   const startTimeRef = useRef(null);

//   const [getInvoiceDetail, { loading, error }] = useLazyQuery(INVOICE_DETAIL, {
//     fetchPolicy: "cache-and-network",
//     errorPolicy: "all",
//     onCompleted: (data) => {
//       console.log("Query completed with data:", data);

//       if (data?.invoiceDetail) {
//         const currentStatus = data.invoiceDetail.status;
//         setInvoiceData(data.invoiceDetail);

//         // Set initial status on first successful fetch
//         if (initialStatus === null) {
//           setInitialStatus(currentStatus);
//           console.log("Initial status set to:", currentStatus);
//         }
//         // Check if status has changed
//         else if (initialStatus !== currentStatus) {
//           console.log(
//             `Status changed from "${initialStatus}" to "${currentStatus}"`
//           );
//           setHasStatusChanged(true);
//           stopPolling();
//         }
//       }
//     },
//     onError: (error) => {
//       console.error("Query error:", error);
//     },
//   });

//   const fetchInvoiceData = useCallback(() => {
//     if (invoiceId && !hasStatusChanged && !sessionExpired) {
//       console.log("Fetching invoice data for ID:", invoiceId);
//       getInvoiceDetail({
//         variables: { id: invoiceId },
//       });
//     }
//   }, [invoiceId, hasStatusChanged, sessionExpired, getInvoiceDetail]);

//   const startPolling = useCallback(() => {
//     if (!invoiceId || isPolling) return;

//     console.log("Starting polling for invoice:", invoiceId);
//     setIsPolling(true);
//     startTimeRef.current = Date.now();

//     // Initial fetch
//     fetchInvoiceData();

//     // Set up interval for subsequent fetches (every 5 seconds)
//     intervalRef.current = setInterval(() => {
//       fetchInvoiceData();
//     }, 5000);

//     // Set up 10-minute session timeout
//     sessionTimeoutRef.current = setTimeout(() => {
//       console.log("Session expired after 10 minutes");
//       setSessionExpired(true);
//       stopPolling();
//     }, 10 * 60 * 1000); // 10 minutes
//   }, [invoiceId, isPolling, fetchInvoiceData]);

//   const stopPolling = useCallback(() => {
//     console.log("Stopping polling");
//     setIsPolling(false);

//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }

//     if (sessionTimeoutRef.current) {
//       clearTimeout(sessionTimeoutRef.current);
//       sessionTimeoutRef.current = null;
//     }
//   }, []);

//   // Auto-start polling when invoiceId is provided
//   useEffect(() => {
//     if (invoiceId && !hasStatusChanged && !sessionExpired) {
//       startPolling();
//     }

//     return () => {
//       stopPolling();
//     };
//   }, [invoiceId, startPolling, stopPolling, hasStatusChanged, sessionExpired]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopPolling();
//     };
//   }, [stopPolling]);

//   // Get elapsed time
//   const getElapsedTime = () => {
//     if (!startTimeRef.current) return 0;
//     return Math.floor((Date.now() - startTimeRef.current) / 1000);
//   };

//   // Reset function to restart polling
//   const resetPolling = useCallback(() => {
//     setInitialStatus(null);
//     setHasStatusChanged(false);
//     setSessionExpired(false);
//     setInvoiceData(null);
//     startTimeRef.current = null;

//     if (invoiceId) {
//       startPolling();
//     }
//   }, [invoiceId, startPolling]);

//   return {
//     invoiceData,
//     loading,
//     error,
//     initialStatus,
//     hasStatusChanged,
//     sessionExpired,
//     isPolling,
//     startPolling,
//     stopPolling,
//     resetPolling,
//     elapsedTime: getElapsedTime(),
//   };
// };

const InvoiceMonitor = ({ invoiceId }: { invoiceId: string }) => {
  const {
    data: invoiceDetailData,
    startPolling,
    stopPolling,
    loading,
    error,
  } = useQuery(INVOICE_DETAIL, {
    variables: {
      id: invoiceId || "",
    },
    skip: !invoiceId,
    // Do not automatically poll, we'll control it manually
    pollInterval: 0,
  });

  const pollingRef = useRef(null);
  const sessionDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

  useEffect(() => {
    if (invoiceId) {
      // Start polling immediately when the component mounts and invoiceId is available
      console.log("Starting initial poll for invoice:", invoiceId);
      startPolling(3000); // Poll every 3 seconds initially

      // @ts-expect-error tsms
      pollingRef.current = setTimeout(() => {
        console.log("Session duration ended. Stopping polling.");
        stopPolling();
      }, sessionDuration);
    }

    return () => {
      // Clean up the timeout and stop polling when the component unmounts
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
      }
      stopPolling();
      console.log("Component unmounted or invoiceId changed. Polling stopped.");
    };
  }, [invoiceId, startPolling, stopPolling]);

  useEffect(() => {
    if (invoiceDetailData && invoiceDetailData.invoiceDetail) {
      const currentStatus = invoiceDetailData.invoiceDetail.status;
      console.log("Current Invoice Status:", currentStatus);

      // Define your "changed" statuses here.
      // For example, if you want to stop polling when the status is 'PAID' or 'CANCELLED'.
      const terminalStatuses = ["paid", "cancelled"];

      if (terminalStatuses.includes(currentStatus)) {
        console.log(`Invoice status changed to a terminal state (${currentStatus}). Stopping polling.`);
        stopPolling();
        if (pollingRef.current) {
          clearTimeout(pollingRef.current);
        }
      }
    }
  }, [invoiceDetailData, stopPolling]);

  if (loading) return <p>Loading invoice details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!invoiceDetailData || !invoiceDetailData.invoiceDetail) return <p>No invoice data available.</p>;

  const { _id, invoiceNumber, amount, currency, status } = invoiceDetailData.invoiceDetail;

  function getElapsedTime() {
    const startTime = new Date(invoiceDetailData.invoiceDetail.createdAt).getTime();
    const currentTime = Date.now();
    return Math.floor((currentTime - startTime) / 1000); // Return elapsed time in seconds
  }

  return <div></div>;
};

export default function PaymentsStep({ formData, updateFormData, totalPrice, onBack, onSubmit }: PaymentsStepProps) {
  const params = useSearchParams();
  const invoiceId = params.get("invoiceId");

  const invoiceUrl = `${process.env.ERXES_URL}/pl:payment/invoice/${invoiceId}`;

  console.log(invoiceId, "invoiceId", invoiceUrl);
  return (
    <div className="mb-6">
      <div className="mb-6">
        {/* Payment Type Selection */}
        <RadioGroup value={formData.paymentType} onValueChange={(value) => updateFormData({ paymentType: value })} className="flex gap-4 mb-8">
          <div className="flex items-center">
            <RadioGroupItem value="prepay" id="prepay" className="mr-2" />
            <Label htmlFor="prepay" className="text-sm font-medium uppercase">
              Prepay
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="fullpay" id="fullpay" className="mr-2" />
            <Label htmlFor="fullpay" className="text-sm font-medium uppercase">
              Fullpay
            </Label>
          </div>
        </RadioGroup>
        {/* Payment Methods */} {invoiceId && <InvoiceMonitor invoiceId={invoiceId} />}
        <div className="mb-8">
          {invoiceId ? (
            <iframe src={invoiceUrl} className="min-h-[600px] w-full border border-gray-200 rounded-md mb-6"></iframe>
          ) : (
            <div className="text-sm text-gray-500 mb-4">
              <p> Something went wrong, please try again later.</p>
            </div>
          )}
          {/* Terms and Conditions */}
          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black" onClick={onBack}>
              Back
            </Button>
            {/* <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              // disabled={!termsAccepted}
              onClick={onSubmit}
            >
              Check payment
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
