/**
 * Pre-Selection UI Component
 *
 * Queue-time wine selection interface - allows users to select their wine tribe
 * and vintage while waiting in queue, moving decision-making off the critical path.
 *
 * CEP-23 Value Driver: "Move the 'What do you like?' conversation onto the mobile
 * screen while guests are still in the queue" → +25% pours/hour throughput
 */

import React, { useState } from 'react';
import { WineTribe, PreSelectionState, VintageOption } from '../../src/types/vintage-voice';
import {
  generateDigitalTastingTicket,
  getVintagesByTribe,
  estimateWaitTime
} from '../../src/services/vintage-voice.service';
import { ChevronRight, Wine, Clock, QrCode } from 'lucide-react';

interface PreSelectionUIProps {
  onTicketGenerated?: (qrCode: string) => void;
  userId?: string;
  boothId?: string;
  queueLength?: number;
}

const PreSelectionUI: React.FC<PreSelectionUIProps> = ({
  onTicketGenerated,
  userId = 'guest_123',
  boothId = 'booth_01',
  queueLength = 12
}) => {
  const [state, setState] = useState<PreSelectionState>({
    qrGenerated: false,
    estimatedWaitTime: estimateWaitTime(queueLength)
  });

  const [selectedVintage, setSelectedVintage] = useState<VintageOption | null>(null);
  const [vintages, setVintages] = useState<VintageOption[]>([]);

  const tribes: WineTribe[] = [
    'Bold Reds',
    'Crisp Whites',
    'Rosé All Day',
    'Sparkling & Champagne',
    'Natural & Orange',
    'Dessert & Fortified'
  ];

  const tribeColors: Record<WineTribe, string> = {
    'Bold Reds': '#DC2626',
    'Crisp Whites': '#FBBF24',
    'Rosé All Day': '#EC4899',
    'Sparkling & Champagne': '#60A5FA',
    'Natural & Orange': '#F97316',
    'Dessert & Fortified': '#8B5CF6'
  };

  const handleTribeSelect = (tribe: WineTribe) => {
    setState(prev => ({
      ...prev,
      selectedTribe: tribe,
      selectedVintage: undefined
    }));
    const filteredVintages = getVintagesByTribe(tribe);
    setVintages(filteredVintages);
    setSelectedVintage(null);
  };

  const handleVintageSelect = (vintage: VintageOption) => {
    setSelectedVintage(vintage);
    setState(prev => ({
      ...prev,
      selectedVintage: vintage.id
    }));
  };

  const handleGenerateTicket = () => {
    if (!state.selectedTribe || !selectedVintage) {
      alert('Please select a tribe and vintage');
      return;
    }

    const ticket = generateDigitalTastingTicket(
      userId,
      state.selectedTribe,
      selectedVintage.name,
      {
        ageVerified: true,
        fpicConsent: true,
        storyGemConsent: false,
        status: 'GREEN',
        verifiedAt: new Date()
      },
      boothId
    );

    setState(prev => ({
      ...prev,
      qrGenerated: true
    }));

    onTicketGenerated?.(ticket.qrCode);
  };

  if (state.qrGenerated && state.selectedTribe && selectedVintage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: tribeColors[state.selectedTribe] }}
                >
                  <QrCode className="w-10 h-10" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Ticket Ready</h2>
            <p className="text-slate-600 mb-6">Your Digital Tasting Ticket is generated</p>

            <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-4">
              <div>
                <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Tribe</p>
                <p className="text-lg font-bold text-slate-900">{state.selectedTribe}</p>
              </div>
              <div className="h-px bg-slate-200" />
              <div>
                <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Vintage</p>
                <p className="text-lg font-bold text-slate-900">{selectedVintage.name}</p>
              </div>
              <div className="h-px bg-slate-200" />
              <div>
                <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">ABV</p>
                <p className="text-lg font-bold text-slate-900">{selectedVintage.abv}%</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-bold mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Ready to scan
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Show this screen at the booth. Your QR code will be scanned for instant pour authorization.
            </p>

            <button
              onClick={() => setState(prev => ({ ...prev, qrGenerated: false }))}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Select Different Vintage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-xl shadow-lg shadow-emerald-100">
              <Wine className="text-white w-6 h-6" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Vintage & Voice</h1>
          <p className="text-slate-300 text-lg">Select your wine while you wait</p>
        </div>

        {/* Wait Time Info */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-slate-300 uppercase font-bold tracking-wider">Estimated Wait</p>
                <p className="text-2xl font-bold text-white">{state.estimatedWaitTime} minutes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">People in queue: {queueLength}</p>
              <p className="text-xs text-slate-400">Pre-selection saves ~5 min/person</p>
            </div>
          </div>
        </div>

        {/* Tribe Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Step 1: Choose Your Tribe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tribes.map((tribe) => (
              <button
                key={tribe}
                onClick={() => handleTribeSelect(tribe)}
                className={`p-4 rounded-xl font-bold text-sm transition-all duration-200 border-2 ${
                  state.selectedTribe === tribe
                    ? 'border-white bg-white text-slate-900 shadow-lg shadow-white/20'
                    : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                }`}
                style={
                  state.selectedTribe === tribe
                    ? { backgroundColor: tribeColors[tribe], color: 'white', borderColor: tribeColors[tribe] }
                    : {}
                }
              >
                {tribe}
              </button>
            ))}
          </div>
        </div>

        {/* Vintage Selection */}
        {state.selectedTribe && vintages.length > 0 && (
          <div className="mb-8 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white mb-4">Step 2: Select Your Vintage</h2>
            <div className="space-y-3">
              {vintages.map((vintage) => (
                <button
                  key={vintage.id}
                  onClick={() => handleVintageSelect(vintage)}
                  className={`w-full p-5 rounded-xl text-left transition-all duration-200 border-2 ${
                    selectedVintage?.id === vintage.id
                      ? 'border-white bg-white text-slate-900 shadow-lg'
                      : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base">{vintage.name}</p>
                      <p className="text-sm opacity-75 mt-1">{vintage.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">{vintage.abv}% ABV</p>
                      {vintage.price && <p className="font-bold">${vintage.price}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generate Ticket Button */}
        {state.selectedTribe && selectedVintage && (
          <div className="fixed bottom-4 left-4 right-4 sm:relative sm:mb-0">
            <button
              onClick={handleGenerateTicket}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              Generate Digital Ticket
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreSelectionUI;
