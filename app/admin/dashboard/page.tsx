"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RevenueData {
  month: string;
  revenue: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    setMounted(true);
    generateRevenueData();
  }, [router]);

  const generateRevenueData = () => {
    const months = [
      "Dec 2025",
      "Jan 2026",
      "Feb 2026"
    ];

    const data: RevenueData[] = [];
    let currentRevenue = 0;

    months.forEach((month) => {
      // Random change between -800 and +1200
      const change = Math.random() * 2000 - 800;
      currentRevenue = Math.max(0, Math.min(5800, currentRevenue + change));
      
      data.push({
        month,
        revenue: Math.round(currentRevenue)
      });
    });

    setRevenueData(data);
    
    // Set balance to the latest revenue
    const totalBalance = data[data.length - 1].revenue;
    setBalance(totalBalance);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }

    setBalance((prev) => prev - amount);
    setWithdrawAmount("");
    setShowWithdrawModal(false);
    setWithdrawSuccess(true);
    
    setTimeout(() => {
      setWithdrawSuccess(false);
    }, 3000);
  };

  if (!mounted) {
    return null;
  }

  const maxRevenue = 5800;
  const currentRevenue = revenueData.length > 0 ? revenueData[revenueData.length - 1].revenue : 0;
  const previousRevenue = revenueData.length > 1 ? revenueData[revenueData.length - 2].revenue : 0;
  const revenueChange = currentRevenue - previousRevenue;
  const changePercent = previousRevenue > 0 ? ((revenueChange / previousRevenue) * 100).toFixed(1) : "0.0";

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
              SuperAdmin Dashboard
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative pt-24 px-6 pb-12">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">
              Welcome, SuperSage
            </h1>
            <p className="text-gray-400">Here's your revenue overview</p>
          </div>

          {/* Success Message */}
          {withdrawSuccess && (
            <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400">
              Withdrawal successful!
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Current Balance */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Current Balance</div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                ${balance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Available to withdraw</div>
            </div>

            {/* Current Revenue */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Current Month Revenue</div>
              <div className="text-3xl font-bold text-white mb-1">
                ${currentRevenue.toLocaleString()}
              </div>
              <div className={`text-sm flex items-center ${revenueChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="mr-1">{revenueChange >= 0 ? '↑' : '↓'}</span>
                {Math.abs(revenueChange).toLocaleString()} ({changePercent}%)
              </div>
            </div>

            {/* Max Revenue */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Revenue Cap</div>
              <div className="text-3xl font-bold text-white mb-1">
                ${maxRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Maximum limit</div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Revenue Trends</h2>
            
            <div className="relative h-80">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-gray-400 text-sm">
                <div>${maxRevenue}</div>
                <div>${(maxRevenue * 0.75).toFixed(0)}</div>
                <div>${(maxRevenue * 0.5).toFixed(0)}</div>
                <div>${(maxRevenue * 0.25).toFixed(0)}</div>
                <div>$0</div>
              </div>

              {/* Chart area */}
              <div className="ml-16 h-full flex items-end justify-around pb-8">
                {revenueData.map((data, index) => {
                  const heightPercent = (data.revenue / maxRevenue) * 100;
                  const isGrowth = index > 0 && data.revenue >= revenueData[index - 1].revenue;
                  
                  return (
                    <div key={data.month} className="flex flex-col items-center flex-1 mx-2">
                      {/* Bar */}
                      <div className="w-full flex flex-col justify-end h-full relative group">
                        <div
                          className={`w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer ${
                            isGrowth
                              ? 'bg-gradient-to-t from-green-600 to-green-400'
                              : 'bg-gradient-to-t from-red-600 to-red-400'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-cyan-500/30 rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <div className="text-white font-semibold">${data.revenue.toLocaleString()}</div>
                            <div className="text-gray-400 text-xs">{data.month}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-400 text-sm mt-2 whitespace-nowrap">
                        {data.month}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis line */}
              <div className="absolute bottom-0 left-16 right-0 h-px bg-cyan-500/20"></div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Show Balance */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Balance Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Balance:</span>
                  <span className="text-xl font-bold text-cyan-400">${balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-gray-300">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Withdraw */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Withdraw Funds</h3>
              <p className="text-gray-400 mb-4">
                Withdraw funds from your account balance
              </p>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Withdraw Funds</h3>
            
            <div className="mb-6">
              <div className="text-gray-400 text-sm mb-2">Available Balance</div>
              <div className="text-3xl font-bold text-cyan-400">
                ${balance.toLocaleString()}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                Withdrawal Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  id="amount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="0.00"
                  min="0"
                  max={balance}
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-6 py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
