"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CostEntry {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export default function CostHistory() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [costEntries, setCostEntries] = useState<CostEntry[]>([]);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    setMounted(true);
    loadCostData();
  }, [router]);

  const loadCostData = () => {
    // Cost data from September 2025 to February 2026
    const entries: CostEntry[] = [
      // February 2026
      {
        id: "1",
        date: "2026-02-10",
        amount: 220.67,
        category: "Operating Expense",
        description: "Monthly hosting and infrastructure costs"
      },
      {
        id: "2",
        date: "2026-02-05",
        amount: 95.89,
        category: "Software",
        description: "API subscriptions and cloud services"
      },
      
      // January 2026
      {
        id: "3",
        date: "2026-01-25",
        amount: 180.23,
        category: "Tools",
        description: "Development tools and licenses"
      },
      {
        id: "4",
        date: "2026-01-15",
        amount: 120.78,
        category: "Software",
        description: "AI API usage and compute credits"
      },
      {
        id: "5",
        date: "2026-01-05",
        amount: 85.45,
        category: "Operating Expense",
        description: "Monthly hosting costs"
      },
      
      // December 2025
      {
        id: "6",
        date: "2025-12-20",
        amount: 150.56,
        category: "Software",
        description: "Annual software license renewals"
      },
      {
        id: "7",
        date: "2025-12-10",
        amount: 110.92,
        category: "Operating Expense",
        description: "Cloud infrastructure and storage"
      },
      
      // November 2025
      {
        id: "8",
        date: "2025-11-22",
        amount: 95.34,
        category: "Tools",
        description: "Development tools subscription"
      },
      {
        id: "9",
        date: "2025-11-08",
        amount: 75.12,
        category: "Operating Expense",
        description: "Domain and SSL certificates"
      },
      
      // October 2025
      {
        id: "10",
        date: "2025-10-18",
        amount: 130.43,
        category: "Software",
        description: "API subscriptions and monitoring tools"
      },
      {
        id: "11",
        date: "2025-10-05",
        amount: 90.61,
        category: "Operating Expense",
        description: "Monthly hosting and backup services"
      },
      
      // September 2025 - Total: $1500
      {
        id: "12",
        date: "2025-09-25",
        amount: 599.89,
        category: "Infrastructure",
        description: "Server upgrades and cloud migration"
      },
      {
        id: "13",
        date: "2025-09-18",
        amount: 450.67,
        category: "Tools",
        description: "Development tools and professional licenses"
      },
      {
        id: "14",
        date: "2025-09-12",
        amount: 300.56,
        category: "Software",
        description: "AI API credits and computing resources"
      },
      {
        id: "15",
        date: "2025-09-05",
        amount: 150.23,
        category: "Operating Expense",
        description: "Enhanced hosting and security upgrades"
      }
    ];

    setCostEntries(entries);
  };

  const handleBack = () => {
    router.push("/admin/dashboard");
  };

  if (!mounted) {
    return null;
  }

  const totalCosts = costEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const averageCost = costEntries.length > 0 ? totalCosts / costEntries.length : 0;

  // Group costs by category
  const costsByCategory = costEntries.reduce((acc, entry) => {
    const category = entry.category;
    acc[category] = (acc[category] || 0) + entry.amount;
    return acc;
  }, {} as Record<string, number>);

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
              Cost History
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
              <div className="text-gray-400 text-sm mb-2">Total Costs</div>
              <div className="text-3xl font-bold text-red-400">
                ${totalCosts.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Average per Entry</div>
              <div className="text-3xl font-bold text-white">
                ${averageCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total Entries</div>
              <div className="text-3xl font-bold text-white">
                {costEntries.length}
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Costs by Category</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(costsByCategory).map(([category, amount]) => (
                <div 
                  key={category}
                  className="bg-slate-800/50 border border-cyan-500/10 rounded-lg p-4"
                >
                  <div className="text-gray-400 text-sm mb-1">{category}</div>
                  <div className="text-2xl font-bold text-red-400">
                    ${amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Entries Table */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Cost Entries</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/20">
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Category</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Description</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {costEntries.map((entry, index) => (
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
                        <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                          {entry.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{entry.description}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-red-400 font-semibold text-lg">
                          -${entry.amount.toLocaleString()}
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
