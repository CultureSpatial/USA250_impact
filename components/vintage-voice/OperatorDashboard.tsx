/**
 * Operator Dashboard Component
 *
 * Staff interface for booth operators (wineries) to manage pours,
 * monitor throughput metrics, and track TQ Safety Gate status.
 *
 * CEP-23 Value Driver: "When the user reaches the front, the operator
 * doesn't spend 2 minutes explaining the menu" → +25% throughput
 */

import React, { useState } from 'react';
import { OperatorMetrics, TribeBreakdown } from '../../src/types/vintage-voice';
import {
  calculateOperatorMetrics,
  generateTribeBreakdown
} from '../../src/services/vintage-voice.service';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Wine,
  Zap,
  PieChart
} from 'lucide-react';

interface OperatorDashboardProps {
  boothId?: string;
  wineryName?: string;
  shiftStartTime?: Date;
}

const OperatorDashboard: React.FC<OperatorDashboardProps> = ({
  boothId = 'booth_01',
  wineryName = 'Willamette Valley Estate',
  shiftStartTime = new Date(Date.now() - 3600000) // 1 hour ago
}) => {
  // Mock data - in production, this would come from real-time data source
  const [metrics, setMetrics] = useState<OperatorMetrics>(
    calculateOperatorMetrics(45, 60, true) // 45 pours in 60 minutes with pre-selection enabled
  );

  const [tribeBreakdown] = useState<TribeBreakdown[]>(
    generateTribeBreakdown([
      'Bold Reds', 'Bold Reds', 'Bold Reds',
      'Crisp Whites', 'Crisp Whites',
      'Rosé All Day', 'Rosé All Day', 'Rosé All Day', 'Rosé All Day',
      'Sparkling & Champagne',
      'Natural & Orange',
      'Dessert & Fortified'
    ])
  );

  const elapsedMinutes = Math.floor((Date.now() - (shiftStartTime?.getTime() || 0)) / 60000);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{wineryName}</h1>
              <p className="text-sm text-slate-600 mt-1">Booth {boothId} • Shift Duration: {elapsedMinutes} min</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Pours */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Pours</span>
              <Wine className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{metrics.totalPours}</p>
            <p className="text-xs text-slate-500 mt-2">Pours completed this shift</p>
          </div>

          {/* Pours Per Hour */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Throughput</span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{metrics.poursPerHour}</p>
            <p className="text-xs text-slate-500 mt-2">Pours/hour (+25% with Pre-Selection)</p>
          </div>

          {/* Average Pour Time */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Avg. Time</span>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round(metrics.averagePourTime)}
              <span className="text-lg ml-1">s</span>
            </p>
            <p className="text-xs text-slate-500 mt-2">Per tasting interaction</p>
          </div>

          {/* Pending Tickets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending</span>
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{metrics.pendingTickets}</p>
            <p className="text-xs text-slate-500 mt-2">Digital Tasting Tickets waiting</p>
          </div>
        </div>

        {/* TQ Safety Gate Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-bold text-slate-900">TQ Safety Gate Status</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Green - Authorized */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <span className="font-bold text-emerald-900">GREEN</span>
              </div>
              <p className="text-3xl font-bold text-emerald-600 mb-2">{metrics.tqGreenCount}</p>
              <p className="text-sm text-emerald-700">Age 19+, FPIC consent given → Pour Authorized</p>
            </div>

            {/* Yellow - Pending */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <span className="font-bold text-amber-900">YELLOW</span>
              </div>
              <p className="text-3xl font-bold text-amber-600 mb-2">{metrics.tqYellowCount}</p>
              <p className="text-sm text-amber-700">Age verified, consent pending → Staff discretion</p>
            </div>

            {/* Red - Denied */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <span className="font-bold text-red-900">RED</span>
              </div>
              <p className="text-3xl font-bold text-red-600 mb-2">{metrics.tqRedCount}</p>
              <p className="text-sm text-red-700">Age <19 or consent denied → No pour</p>
            </div>
          </div>
        </div>

        {/* Tribal Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-bold text-slate-900">Tribal Breakdown</h2>
          </div>

          <div className="space-y-4">
            {tribeBreakdown.map((tribe) => (
              <div key={tribe.tribe}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tribe.color }}
                    />
                    <span className="font-bold text-slate-900">{tribe.tribe}</span>
                  </div>
                  <span className="text-sm text-slate-600">{tribe.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${tribe.percentage}%`,
                      backgroundColor: tribe.color
                    }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{tribe.count} tasters</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          <p className="font-bold mb-1">Real-Time Dashboard Updates</p>
          <p>Data refreshes every 30 seconds. Pre-Selection UI is enabled for this booth, providing +25% throughput boost compared to standard ordering.</p>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
