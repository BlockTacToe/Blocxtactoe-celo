"use client";

import { Address } from "viem";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/config/constants";
import blocxtactoeAbiArtifact from "@/abi/blocxtactoeabi.json";
import { Trophy, Target, TrendingUp, Calendar } from "lucide-react";
import VerifyWithSelf from "../verification/VerifyWithSelf";
import VerificationBadge from "../verification/VerificationBadge";

const blocxtactoeAbi = (blocxtactoeAbiArtifact as { abi: unknown[] }).abi;

interface ProfileHeaderProps {
  playerAddress: Address;
  isOwnProfile: boolean;
}

export default function ProfileHeader({ playerAddress, isOwnProfile }: ProfileHeaderProps) {
  // Fetch player data
  const { data: player } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: blocxtactoeAbi,
    functionName: "getPlayer",
    args: [playerAddress],
  });

  if (!player) {
    return (
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-purple-500/20 rounded w-1/3"></div>
          <div className="h-4 bg-purple-500/20 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const playerData = player as {
    username: string;
    wins: bigint;
    losses: bigint;
    draws: bigint;
    totalGames: bigint;
    rating: bigint;
    registered: boolean;
  };

  const totalGames = Number(playerData.totalGames);
  const wins = Number(playerData.wins);
  const losses = Number(playerData.losses);
  const draws = Number(playerData.draws);
  const rating = Number(playerData.rating);
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
              {playerData.username || "Unknown Player"}
            </h1>
            <VerificationBadge address={playerAddress} size="lg" />
          </div>
          <p className="text-gray-400 text-sm font-mono">
            {playerAddress.slice(0, 6)}...{playerAddress.slice(-4)}
          </p>
          {isOwnProfile && (
            <div className="flex gap-2 mt-2">
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                Your Profile
              </span>
              <div className="scale-90 origin-left">
                <VerifyWithSelf />
              </div>
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 px-6 py-4 rounded-xl border border-yellow-500/30">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Rating</p>
            <p className="text-3xl font-bold text-yellow-400">{rating}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Games */}
        <div className="bg-black/30 rounded-xl p-4 border border-purple-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <p className="text-xs text-gray-400 uppercase tracking-wide">Total Games</p>
          </div>
          <p className="text-2xl font-bold text-white">{totalGames}</p>
        </div>

        {/* Wins */}
        <div className="bg-black/30 rounded-xl p-4 border border-green-500/10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <p className="text-xs text-gray-400 uppercase tracking-wide">Wins</p>
          </div>
          <p className="text-2xl font-bold text-green-400">{wins}</p>
        </div>

        {/* Losses */}
        <div className="bg-black/30 rounded-xl p-4 border border-red-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-red-400" />
            <p className="text-xs text-gray-400 uppercase tracking-wide">Losses</p>
          </div>
          <p className="text-2xl font-bold text-red-400">{losses}</p>
        </div>

        {/* Win Rate */}
        <div className="bg-black/30 rounded-xl p-4 border border-blue-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-blue-400" />
            <p className="text-xs text-gray-400 uppercase tracking-wide">Win Rate</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">{winRate}%</p>
        </div>
      </div>

      {/* Win/Loss/Draw Bar */}
      {totalGames > 0 && (
        <div className="mt-6">
          <div className="flex gap-2 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-green-500" 
              style={{ width: `${(wins / totalGames) * 100}%` }}
              title={`${wins} wins`}
            />
            <div 
              className="bg-red-500" 
              style={{ width: `${(losses / totalGames) * 100}%` }}
              title={`${losses} losses`}
            />
            <div 
              className="bg-gray-500" 
              style={{ width: `${(draws / totalGames) * 100}%` }}
              title={`${draws} draws`}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{wins}W</span>
            <span>{losses}L</span>
            <span>{draws}D</span>
          </div>
        </div>
      )}
    </div>
  );
}
