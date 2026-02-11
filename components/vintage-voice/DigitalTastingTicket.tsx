/**
 * Digital Tasting Ticket Component
 *
 * QR-based pour authorization (3-second validation)
 *
 * CEP-23 Spec: "QR ticket shown, pour authorised in three seconds.
 * No queue melt-down, no staff bottleneck—just service."
 */

import React, { useState } from 'react';
import { DigitalTastingTicket as IDigitalTastingTicket, TQStatus } from '../../src/types/vintage-voice';
import { validateQRTicket } from '../../src/services/vintage-voice.service';
import { Check, AlertTriangle, Clock } from 'lucide-react';

interface DigitalTastingTicketProps {
  ticket: IDigitalTastingTicket;
  onValidated?: (isValid: boolean) => void;
}

const DigitalTastingTicket: React.FC<DigitalTastingTicketProps> = ({
  ticket,
  onValidated
}) => {
  const [validationState, setValidationState] = useState<'pending' | 'validating' | 'success' | 'failed'>('pending');
  const [validationTime, setValidationTime] = useState<number>(0);

  const tribeColors: Record<string, string> = {
    'Bold Reds': '#DC2626',
    'Crisp Whites': '#FBBF24',
    'Rosé All Day': '#EC4899',
    'Sparkling & Champagne': '#60A5FA',
    'Natural & Orange': '#F97316',
    'Dessert & Fortified': '#8B5CF6'
  };

  const tqStatusDisplay: Record<TQStatus, { label: string; bgColor: string; textColor: string; icon: React.ReactNode }> = {
    'GREEN': {
      label: 'Authorized',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700',
      icon: <Check className="w-5 h-5" />
    },
    'YELLOW': {
      label: 'Pending',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      icon: <Clock className="w-5 h-5" />
    },
    'RED': {
      label: 'Denied',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      icon: <AlertTriangle className="w-5 h-5" />
    }
  };

  const handleValidateQR = async () => {
    setValidationState('validating');
    const startTime = performance.now();

    try {
      const isValid = await validateQRTicket(ticket.qrCode);
      const endTime = performance.now();
      const time = Math.round(endTime - startTime);

      setValidationTime(time);
      setValidationState(isValid ? 'success' : 'failed');
      onValidated?.(isValid);
    } catch (error) {
      setValidationState('failed');
      onValidated?.(false);
    }
  };

  const tqInfo = tqStatusDisplay[ticket.tqStatus.status];
  const tribeColor = tribeColors[ticket.tribeSelection] || '#6B7280';

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Main Ticket Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with Tribe Color */}
        <div
          className="h-2"
          style={{ backgroundColor: tribeColor }}
        />

        <div className="p-8">
          {/* Ticket Status */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Digital Tasting Ticket</h1>
              <p className="text-slate-600 mt-1">Valid until {ticket.validUntil.toLocaleTimeString()}</p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${tqInfo.bgColor} ${tqInfo.textColor} font-bold`}
            >
              {tqInfo.icon}
              {tqInfo.label}
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-slate-200">
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Tribe</p>
              <p className="text-lg font-bold text-slate-900">{ticket.tribeSelection}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Vintage</p>
              <p className="text-lg font-bold text-slate-900">{ticket.vintage}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">Booth</p>
              <p className="text-lg font-bold text-slate-900">{ticket.boothId}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">ID</p>
              <p className="text-xs font-mono text-slate-600 break-all">{ticket.id}</p>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-slate-100 p-6 rounded-xl mb-4 w-full flex items-center justify-center min-h-80">
              {/* Simplified QR Code Visualization */}
              <div className="space-y-1">
                {Array.from({ length: 25 }).map((_, row) => (
                  <div key={row} className="flex gap-1">
                    {Array.from({ length: 25 }).map((_, col) => {
                      // Simple pattern - in production use qrcode.react library
                      const pattern =
                        (row < 7 && col < 7) ||
                        (row < 7 && col > 17) ||
                        (row > 17 && col < 7) ||
                        (Math.random() > 0.5);

                      return (
                        <div
                          key={`${row}-${col}`}
                          className={`w-3 h-3 ${pattern ? 'bg-slate-900' : 'bg-white'} border border-slate-300`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-600 text-center">
              Show this QR code at the booth for instant pour authorization
            </p>
          </div>

          {/* TQ Safety Gate Info */}
          {ticket.tqStatus.status === 'GREEN' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8">
              <p className="text-sm font-bold text-emerald-900">
                ✓ Age verified (19+) • ✓ FPIC consent given • Ready to pour
              </p>
            </div>
          )}

          {ticket.tqStatus.status === 'YELLOW' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
              <p className="text-sm font-bold text-amber-900">
                ✓ Age verified • ⚠ Consent pending • Staff discretion required
              </p>
            </div>
          )}

          {ticket.tqStatus.status === 'RED' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <p className="text-sm font-bold text-red-900">
                ✗ Age or consent requirement not met • No pour authorized
              </p>
            </div>
          )}

          {/* Validation Button */}
          {validationState === 'pending' && (
            <button
              onClick={handleValidateQR}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Scan to Validate</span>
            </button>
          )}

          {validationState === 'validating' && (
            <div className="w-full bg-slate-100 text-slate-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse" />
              Validating QR...
            </div>
          )}

          {validationState === 'success' && (
            <div className="w-full bg-emerald-100 text-emerald-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Valid QR Code
            </div>
          )}

          {validationState === 'failed' && (
            <div className="w-full bg-red-100 text-red-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Invalid QR Code
            </div>
          )}

          {validationTime > 0 && (
            <p className="text-center text-xs text-slate-600 mt-4">
              Validation time: {validationTime}ms (CEP-23 spec: <3000ms)
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Ticket ID: {ticket.id}</span>
          <span>Generated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3">How to Use Your Digital Tasting Ticket</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Keep this screen visible and ready to show at the booth</li>
          <li>The booth operator will scan your QR code</li>
          <li>Validation happens in less than 3 seconds</li>
          <li>Once authorized (GREEN status), your pour will be prepared immediately</li>
          <li>No queue meltdown, no staff bottleneck—just service</li>
        </ol>
      </div>
    </div>
  );
};

export default DigitalTastingTicket;
