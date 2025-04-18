import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "@/context/UserContext";

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

interface PaymentProps {
  email: string;
  tx_ref: string;
  amount: number;
  onSuccess: () => void;
  onclose?: () => void;
}

const useFlutterWave = () => {
  const [isFlutterwaveLoaded, setIsFlutterwaveLoaded] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]')) {
      if (window.FlutterwaveCheckout) {
        setIsFlutterwaveLoaded(true);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    
    script.onload = () => {
      setTimeout(() => {
        setIsFlutterwaveLoaded(true);
      }, 1000);
    };
    
    document.body.appendChild(script);

    return () => {
      const scriptElement = document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  const initiateFlutterWavePayment = ({ email,  tx_ref, amount, onSuccess, onclose }: PaymentProps) => {
    if (!isFlutterwaveLoaded) {
      toast.error("Flutterwave SDK not loaded yet. Please try again.");
      return;
    }

    try {
      window.FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
        tx_ref: tx_ref,
        amount,
        currency: "USD",
        payment_options: "card, banktransfer, ussd",
        customer: {
          email: user?.email || email,
        },
        customizations: {
          title: "Car Rental Payment",
          description: "Payment for car rental booking",
        },
        callback: (response: any) => {
          console.log("Payment Response:", response);
          if (response.status === "successful") {
            onSuccess();
            toast.success("Payment successful!");
          }
        },
        onclose: () => {
          if (onclose) {
            toast.warning("Payment modal closed.");
          }
        },
      });
    } catch (error) {
      console.error("Flutterwave initialization error:", error);
      toast.error("Failed to initialize payment. Please try again.");
    }
  };

  return { initiateFlutterWavePayment, isLoaded: isFlutterwaveLoaded };
};

export default useFlutterWave;