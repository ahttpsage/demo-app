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
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    
    // Start with a base revenue and apply small variations
    const baseRevenues = [1850, 1950, 2000];
    
    months.forEach((month, index) => {
      // Small random variation between -50 and +50
      const variation = Math.random() * 100 - 50;
      const revenue = baseRevenues[index] + variation;
      
      data.push({
        month,
        revenue: Math.round(revenue)
      });
    });

    setRevenueData(data);
    
    // Set balance to stay between 1900-2100 with small variation
    const baseBalance = 2000;
    const balanceVariation = Math.random() * 200 - 100; // -100 to +100
    const totalBalance = Math.round(baseBalance + balanceVariation);
    setBalance(totalBalance);

    // Calculate total revenue (Oct 2025 - Feb 2026): Target around $5800-$5900
    const baseTotalRevenue = 5850;
    const revenueVariation = Math.random() * 100 - 50; // -50 to +50
    const calculatedTotalRevenue = Math.round(baseTotalRevenue + revenueVariation);
    setTotalRevenue(calculatedTotalRevenue);

    // Calculate total costs (Sept 2025 - Feb 2026): Around $2850-$2900
    const baseTotalCosts = 2875;
    const costsVariation = Math.random() * 50 - 25; // -25 to +25
    const calculatedTotalCosts = Math.round(baseTotalCosts + costsVariation);
    setTotalCosts(calculatedTotalCosts);

    // Net profit should be between $2900-$3100
    const calculatedNetProfit = calculatedTotalRevenue - calculatedTotalCosts;
    setNetProfit(calculatedNetProfit);
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Current Balance */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Current Balance</div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">
                ${balance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Available to withdraw</div>
            </div>

            {/* Total Revenue */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total Revenue</div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Oct 2025 - Feb 2026</div>
            </div>

            {/* Total Costs */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total Costs</div>
              <div className="text-3xl font-bold text-red-400 mb-1">
                ${totalCosts.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Sept 2025 - Feb 2026</div>
            </div>

            {/* Net Profit */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Net Profit</div>
              <div className="text-3xl font-bold text-white mb-1">
                ${netProfit.toLocaleString()}
              </div>
              <div className={`text-sm flex items-center ${netProfit >= 3000 ? 'text-green-400' : 'text-yellow-400'}`}>
                {netProfit >= 3000 ? '✓' : '~'} Target range
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Revenue Trends</h2>
              <button
                onClick={generateRevenueData}
                className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm"
              >
                🔄 Refresh Data
              </button>
            </div>
            
            <div className="relative h-96">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-gray-400 text-sm font-medium">
                <div>${maxRevenue.toLocaleString()}</div>
                <div>${((maxRevenue * 0.75)).toLocaleString()}</div>
                <div>${((maxRevenue * 0.5)).toLocaleString()}</div>
                <div>${((maxRevenue * 0.25)).toLocaleString()}</div>
                <div>$0</div>
              </div>

              {/* Grid lines */}
              <div className="absolute left-20 right-4 top-0 bottom-16 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-cyan-500/10"></div>
                ))}
              </div>

              {/* Chart area with SVG line */}
              <div className="ml-20 mr-4 h-full pb-16 relative">
                <svg 
                  className="absolute inset-0 w-full h-full overflow-visible" 
                  style={{ height: 'calc(100% - 4rem)' }}
                >
                  <defs>
                    {/* Gradient for area under line */}
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                    
                    {/* Glow effect */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Area fill under the line */}
                  <path
                    d={`
                      M 0,100%
                      ${revenueData.map((data, index) => {
                        const x = ((index) / (revenueData.length - 1)) * 100;
                        const y = 100 - (data.revenue / maxRevenue) * 100;
                        return `L ${x}%,${y}%`;
                      }).join(' ')}
                      L 100%,100%
                      Z
                    `}
                    fill="url(#areaGradient)"
                    className="transition-all duration-500"
                  />

                  {/* Main line path */}
                  <path
                    d={revenueData.map((data, index) => {
                      const x = ((index) / (revenueData.length - 1)) * 100;
                      const y = 100 - (data.revenue / maxRevenue) * 100;
                      return `${index === 0 ? 'M' : 'L'} ${x}%,${y}%`;
                    }).join(' ')}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                    style={{ filter: 'url(#glow)' }}
                  />

                  {/* Segment colors for growth/loss */}
                  {revenueData.map((data, index) => {
                    if (index === revenueData.length - 1) return null;
                    
                    const x1 = ((index) / (revenueData.length - 1)) * 100;
                    const x2 = ((index + 1) / (revenueData.length - 1)) * 100;
                    const y1 = 100 - (data.revenue / maxRevenue) * 100;
                    const y2 = 100 - (revenueData[index + 1].revenue / maxRevenue) * 100;
                    
                    const isGrowth = revenueData[index + 1].revenue >= data.revenue;
                    
                    return (
                      <line
                        key={`segment-${index}`}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke={isGrowth ? '#22c55e' : '#ef4444'}
                        strokeWidth={hoveredIndex === index || hoveredIndex === index + 1 ? "4" : "3"}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                        opacity={hoveredIndex === null ? "0.7" : (hoveredIndex === index || hoveredIndex === index + 1) ? "1" : "0.3"}
                      />
                    );
                  })}
                  
                  {/* Interactive data points */}
                  {revenueData.map((data, index) => {
                    const x = ((index) / (revenueData.length - 1)) * 100;
                    const y = 100 - (data.revenue / maxRevenue) * 100;
                    const isGrowth = index > 0 && data.revenue >= revenueData[index - 1].revenue;
                    const isHovered = hoveredIndex === index;
                    
                    return (
                      <g key={`point-${index}`} className="cursor-pointer">
                        {/* Hover area (invisible but clickable) */}
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="20"
                          fill="transparent"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        />
                        
                        {/* Animated pulse on hover */}
                        {isHovered && (
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="15"
                            fill={isGrowth ? '#22c55e' : '#ef4444'}
                            opacity="0.2"
                            className="animate-ping"
                          />
                        )}
                        
                        {/* Outer glow */}
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r={isHovered ? "12" : "8"}
                          fill={isGrowth ? '#22c55e' : '#ef4444'}
                          opacity="0.3"
                          className="transition-all duration-300"
                        />
                        
                        {/* Main point */}
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r={isHovered ? "8" : "6"}
                          fill={isGrowth ? '#22c55e' : '#ef4444'}
                          className="transition-all duration-300"
                          style={{ filter: isHovered ? 'url(#glow)' : 'none' }}
                        />
                        
                        {/* Center dot */}
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r={isHovered ? "3" : "2"}
                          fill="white"
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* X-axis labels and tooltips */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end">
                  {revenueData.map((data, index) => {
                    const isGrowth = index > 0 && data.revenue >= revenueData[index - 1].revenue;
                    const change = index > 0 ? data.revenue - revenueData[index - 1].revenue : 0;
                    
                    return (
                      <div 
                        key={data.month} 
                        className="flex flex-col items-center flex-1 relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Tooltip */}
                        <div 
                          className={`absolute bottom-full mb-12 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-cyan-500/50 rounded-lg px-4 py-3 whitespace-nowrap z-20 transition-all duration-300 ${
                            hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <div className="text-white font-bold text-lg mb-1">
                            ${data.revenue.toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm mb-1">{data.month}</div>
                          {index > 0 && (
                            <div className={`text-sm font-semibold ${isGrowth ? 'text-green-400' : 'text-red-400'}`}>
                              {isGrowth ? '↑' : '↓'} ${Math.abs(change).toLocaleString()}
                              <span className="text-xs ml-1">
                                ({((change / revenueData[index - 1].revenue) * 100).toFixed(1)}%)
                              </span>
                            </div>
                          )}
                          {/* Arrow pointer */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                            <div className="border-4 border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                        
                        {/* Label */}
                        <div 
                          className={`text-sm whitespace-nowrap cursor-pointer transition-all duration-300 font-medium ${
                            hoveredIndex === index ? 'text-cyan-400 scale-110' : 'text-gray-400'
                          }`}
                        >
                          {data.month}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Axis lines */}
              <div className="absolute bottom-16 left-20 right-4 h-0.5 bg-gradient-to-r from-cyan-500/50 to-cyan-500/10"></div>
              <div className="absolute top-0 bottom-16 left-20 w-0.5 bg-gradient-to-b from-cyan-500/50 to-cyan-500/10"></div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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

          {/* History Links */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue History */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all group cursor-pointer"
                 onClick={() => router.push("/admin/revenue-history")}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Revenue History</h3>
                <div className="text-2xl group-hover:scale-110 transition-transform">📈</div>
              </div>
              <p className="text-gray-400 mb-4">
                View detailed revenue records and income sources
              </p>
              <div className="text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                View History →
              </div>
            </div>

            {/* Cost History */}
            <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all group cursor-pointer"
                 onClick={() => router.push("/admin/cost-history")}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Cost History</h3>
                <div className="text-2xl group-hover:scale-110 transition-transform">💸</div>
              </div>
              <p className="text-gray-400 mb-4">
                Track expenses and cost breakdown by category
              </p>
              <div className="text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                View History →
              </div>
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
