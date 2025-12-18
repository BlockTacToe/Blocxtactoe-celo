"use client";

import { Address } from "viem";
import { Calendar, Trophy, Coins, TrendingUp, Star } from "lucide-react";

interface MonthlyRecapProps {
  playerAddress: Address;
}

export default function MonthlyRecap({ playerAddress }: MonthlyRecapProps) {
  // Mock data - in production would be aggregated from indexed events
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const stats = {
    gamesPlayed: 42,
    wins: 28,
    losses: 12,
    draws: 2,
    earnings: "125.5 CELO",
    ratingChange: "+150",
    mostFrequentOpponent: "0x1234...5678",
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl p-1 border border-indigo-500/30">
      <div className="bg-black/40 rounded-[14px] p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-indigo-400" />
              Monthly Recap
            </h2>
            <p className="text-gray-400 text-sm mt-1">{currentMonth}</p>
          </div>
          <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-lg px-4 py-2">
            <span className="text-indigo-300 text-sm font-medium">Top 5% Player</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Stats Card */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy className="w-32 h-32 text-indigo-400" />
            </div>
            
            <p className="text-indigo-300 text-sm font-medium uppercase tracking-wider mb-2">Total Earnings</p>
            <h3 className="text-4xl font-bold text-white mb-4">{stats.earnings}</h3>
            
            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 rounded-full px-3 py-1 w-fit">
              <TrendingUp className="w-4 h-4" />
              <span>{stats.ratingChange} Rating Points</span>
            </div>
          </div>

          {/* Activity Breakdown */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center hover:border-indigo-500/30 transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.gamesPlayed}</p>
              <p className="text-xs text-gray-400 uppercase mt-1">Games</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center hover:border-green-500/30 transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-400">{stats.wins}</p>
              <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center hover:border-red-500/30 transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <div className="w-5 h-5 text-red-400 font-bold flex items-center justify-center">L</div>
                </div>
              </div>
              <p className="text-2xl font-bold text-red-400">{stats.losses}</p>
              <p className="text-xs text-gray-400 uppercase mt-1">Losses</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-center hover:border-yellow-500/30 transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{(stats.wins / stats.gamesPlayed * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-400 uppercase mt-1">Win Rate</p>
            </div>
          </div>
        </div>

        {/* Monthly Achievements Mockup */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-sm text-gray-400 mb-3">Unlocked this month</p>
          <div className="flex flex-wrap gap-3">
            {["Perfect Week", "High Roller", "Early Bird"].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/10 text-xs text-gray-300">
                <Trophy className="w-3 h-3 text-yellow-400" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
