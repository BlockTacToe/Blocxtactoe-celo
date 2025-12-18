"use client";

import { use } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import GameHistoryTable from "@/components/profile/GameHistoryTable";
import AnalyticsCharts from "@/components/profile/AnalyticsCharts";
import MonthlyRecap from "@/components/profile/MonthlyRecap";
import YearlyRecap from "@/components/profile/YearlyRecap";
import AchievementBadges from "@/components/profile/AchievementBadges";

interface PageProps {
  params: Promise<{ address: string }>;
}

export default function ProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const playerAddress = resolvedParams.address as Address;
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  // Check if viewing own profile
  const isOwnProfile = connectedAddress?.toLowerCase() === playerAddress.toLowerCase();

  return (
    <div className="min-h-screen px-4 py-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <ProfileHeader 
          playerAddress={playerAddress} 
          isOwnProfile={isOwnProfile}
        />

        {/* Analytics Charts */}
        <AnalyticsCharts playerAddress={playerAddress} />

        {/* Monthly Recap */}
        <MonthlyRecap playerAddress={playerAddress} />

        {/* Yearly Recap */}
        <YearlyRecap playerAddress={playerAddress} />

        {/* Achievement Badges */}
        <AchievementBadges playerAddress={playerAddress} />

        {/* Game History */}
        <GameHistoryTable playerAddress={playerAddress} />
      </div>
    </div>
  );
}
