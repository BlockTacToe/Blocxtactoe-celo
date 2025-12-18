"use client";

import { useState } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/config/constants";
import blocxtactoeAbiArtifact from "@/abi/blocxtactoeabi.json";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const blocxtactoeAbi = (blocxtactoeAbiArtifact as { abi: unknown[] }).abi;

interface GameHistoryTableProps {
  playerAddress: Address;
}

type FilterType = "all" | "won" | "lost" | "draw";

export default function GameHistoryTable({ playerAddress }: GameHistoryTableProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 10;

  // Fetch latest game ID
  const { data: latestGameId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: blocxtactoeAbi,
    functionName: "getLatestGameId",
  });

  // Fetch player data to get their games
  const { data: player } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: blocxtactoeAbi,
    functionName: "getPlayer",
    args: [playerAddress],
  });

  if (!player || !latestGameId) {
    return (
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold text-white mb-4">Game History</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-purple-500/20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // For now, we'll show a placeholder since we need to iterate through games
  // In a production app, you'd want to index games off-chain or use events
  const totalGames = Number((player as { totalGames: bigint }).totalGames);

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Game History</h2>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {(["all", "won", "lost", "draw"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-purple-500 text-white"
                    : "bg-black/30 text-gray-400 hover:bg-black/50"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search game ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black/30 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 w-full sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {totalGames === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No games played yet</p>
          <Link
            href="/games"
            className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Browse Games
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Game ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Opponent</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Result</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Bet Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Board Size</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder row - in production, fetch actual game data */}
                <tr className="border-b border-purple-500/10 hover:bg-black/20 transition-colors">
                  <td className="py-4 px-4 text-white font-mono text-sm" colSpan={6}>
                    <div className="text-center text-gray-400">
                      Game history loading... ({totalGames} games total)
                      <p className="text-xs mt-2">Full game history requires event indexing</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">
              Showing {totalGames > 0 ? 1 : 0} - {Math.min(gamesPerPage, totalGames)} of {totalGames} games
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-2 rounded-lg bg-black/30 text-gray-400 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                disabled={currentPage * gamesPerPage >= totalGames}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 rounded-lg bg-black/30 text-gray-400 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
