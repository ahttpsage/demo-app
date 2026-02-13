"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RevenueEntry {
  id: string;
  date: string;
  amount: number;
  source: string;
  description: string;
}

export default function RevenueHistory() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [revenueEntries, setRevenueEntries] = useState<RevenueEntry[]>([]);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    setMounted(true);
    loadRevenueData();
  }, [router]);

  const loadRevenueData = () => {
    // Sample revenue data
    const entries: RevenueEntry[] = [
      {
        id: "1",
        date: "2026-02-15",
        amount: 5000.00,
        source: "Client Project",
        description: "AI Consulting - Financial Model Development"
      },
      {
        id: "2",
        date: "2026-02-08",
        amount: 3500.50,
        source: "Client Project",
        description: "Quantitative Analysis - Trading Strategy"
      },
      {
        id: "3",
        date: "2026-01-28",
        amount: 4200.75,
        source: "Client Project",
        description: "Machine Learning Model - NLP System"
      },
      {
        id: "4",
        date: "2026-01-15",
        amount: 2800.25,
        source: "Consulting",
        description: "Gen AI Solutions - RAG Implementation"
      },
      {
        id: "5",
        date: "2025-12-20",
        amount: 6000.00,
        source: "Client Project",
        description: "Full Stack Development - Trading Dashboard"
      }
    ];

    setRevenueEntries(entries);
  };

  const handleBack = () => {
    router.push("/admin/dashboard");
  };

  if (!mounted) {
    return null;
  }

  const totalRevenue = revenueEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const averageRevenue = revenueEntries.length > 0 ? totalRevenue / revenueEntries.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-slate-950/70 border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Revenue History
            </div>
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative pt-24 px-6 pb-12">
        <div className="container mx-auto max-w-6xl">
          {/* Stats Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total Revenue</div>
              <div className="text-3xl font-bold text-cyan-400">
                ${totalRevenue.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Average per Entry</div>
              <div className="text-3xl font-bold text-white">
                ${averageRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total Entries</div>
              <div className="text-3xl font-bold text-white">
                {revenueEntries.length}
              </div>
            </div>
          </div>

          {/* Revenue Entries Table */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Revenue Entries</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/20">
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Source</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Description</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueEntries.map((entry, index) => (
                    <tr 
                      key={entry.id} 
                      className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                          {entry.source}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{entry.description}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-green-400 font-semibold text-lg">
                          +${entry.amount.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
