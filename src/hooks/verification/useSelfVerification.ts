"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
// @ts-ignore - simulating package presence as user installs it
import { SelfSDK } from "@self.xyz/sdk";

// Actual response type from Self SDK
interface SelfVerificationResponse {
  proof: string;
  nullifier: string;
  merkle_root: string;
  public_inputs: string[];
  verification_level: string;
}

export function useSelfVerification() {
  const { address } = useAccount();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<SelfVerificationResponse | null>(null);

  const startVerification = useCallback(async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    const appId = process.env.NEXT_PUBLIC_SELF_APP_ID;
    if (!appId) {
      toast.error("Self App ID not configured");
      console.error("Missing NEXT_PUBLIC_SELF_APP_ID");
      return;
    }

    setIsVerifying(true);
    
    try {
      // Initialize SDK with App ID
      const self = new SelfSDK({
        appId: appId,
        env: "production", // or 'staging'
      });

      console.log("Initializing Self Protocol Verification...");
      toast.loading("Connecting to Self App...");

      // Trigger verification flow
      // This will open the Self modal/redirect
      const result = await self.verify({
        scope: "human_unique", // The standard scope for uniqueness
        address: address, // Bind proof to wallet address
      });

      if (result) {
        console.log("Verification successful:", result);
        setVerificationResult(result);
        toast.success("Identity Verified Successfully!");
        
        // TODO: Submit proof to smart contract for on-chain attestation
        // await submitProofOnChain(result);
      }

    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Verification failed or canceled");
    } finally {
      setIsVerifying(false);
    }
  }, [address]);

  return {
    isVerifying,
    verificationResult,
    startVerification,
  };
}
