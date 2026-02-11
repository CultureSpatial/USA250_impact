import React, { useState, useCallback } from 'react';
import { GTMAcceleratorDashboard } from '../../components/gtm/GTMAcceleratorDashboard';
import { MapPin, Upload, CheckCircle2 } from 'lucide-react';

/**
 * Felt.com Integration Example
 *
 * Integration Pattern #3: Felt.com Spatial Integration
 * Demonstrates how to deploy GTM market data to Felt.com for collaborative mapping
 *
 * Features:
 * - Transform GTM nodes to GeoJSON format
 * - Deploy layers to Felt using their API
 * - Real-time collaboration on spatial analysis
 * - Export-ready prospectus maps
 *
 * @example
 * ```tsx
 * <FeltIntegrationExample feltApiKey="your_api_key" />
 * ```
 */

interface FeltLayer {
  id: string;
  name: string;
  type: 'point' | 'polygon' | 'line';
  features: any[];
  style: {
    color: string;
    radius?: number;
    strokeWidth?: number;
  };
}

interface MarketNode {
  id: number;
  territory: string;
  gtmScore: number;
  status: 'Active' | 'Pipeline' | 'Planning';
  growth: string;
  coordinates: [number, number]; // [lng, lat]
}

interface FeltIntegrationProps {
  feltApiKey?: string;
  feltMapId?: string;
}

const FeltIntegrationExample: React.FC<FeltIntegrationProps> = ({
  feltApiKey = process.env.FELT_API_KEY,
  feltMapId = 'usa250-gtm-map',
}) => {
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [feltUrl, setFeltUrl] = useState<string | null>(null);

  // Sample market nodes with coordinates
  const marketNodes: MarketNode[] = [
    {
      id: 1,
      territory: 'Willamette (PNW)',
      gtmScore: 94,
      status: 'Active',
      growth: '+12%',
      coordinates: [-122.6765, 45.5152], // Portland, OR
    },
    {
      id: 2,
      territory: 'Burgundy (EU-West)',
      gtmScore: 88,
      status: 'Pipeline',
      growth: '+8%',
      coordinates: [4.8357, 47.0502], // Burgundy, France
    },
    {
      id: 3,
      territory: 'Okanagan (BC-Canada)',
      gtmScore: 82,
      status: 'Planning',
      growth: '+5%',
      coordinates: [-119.4960, 49.8880], // Kelowna, BC
    },
  ];

  /**
   * Transform GTM market nodes to GeoJSON format
   */
  const transformToGeoJSON = useCallback((nodes: MarketNode[]) => {
    return {
      type: 'FeatureCollection',
      features: nodes.map((node) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: node.coordinates,
        },
        properties: {
          id: node.id,
          name: node.territory,
          gtmScore: node.gtmScore,
          status: node.status,
          growth: node.growth,
          // Additional metadata for Felt tooltips
          description: `GTM Score: ${node.gtmScore} | Status: ${node.status} | Growth: ${node.growth}`,
        },
      })),
    };
  }, []);

  /**
   * Deploy GTM data to Felt.com
   */
  const handleFeltDeploy = async () => {
    setDeployStatus('deploying');

    try {
      // Transform data to GeoJSON
      const geoJson = transformToGeoJSON(marketNodes);

      // Create Felt layer configuration
      const feltLayer: FeltLayer = {
        id: 'gtm-market-nodes',
        name: 'GTM Market Nodes',
        type: 'point',
        features: geoJson.features,
        style: {
          color: '#10b981', // emerald-500
          radius: 12,
        },
      };

      // Simulate Felt API call (replace with actual Felt API)
      const response = await mockFeltAPICall(feltMapId, feltLayer);

      if (response.success) {
        setDeployStatus('success');
        setFeltUrl(response.mapUrl);
      } else {
        throw new Error('Failed to deploy to Felt');
      }
    } catch (error) {
      console.error('Felt deployment error:', error);
      setDeployStatus('error');
    }
  };

  /**
   * Mock Felt API call (replace with actual Felt API integration)
   */
  const mockFeltAPICall = async (
    mapId: string,
    layer: FeltLayer
  ): Promise<{ success: boolean; mapUrl: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, you would call the Felt API:
    // const response = await fetch('https://felt.com/api/v1/maps/${mapId}/layers', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${feltApiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(layer),
    // });

    return {
      success: true,
      mapUrl: `https://felt.com/map/${mapId}`,
    };
  };

  return (
    <div className="h-screen flex">
      {/* Left: GTM Dashboard */}
      <div className="flex-1">
        <GTMAcceleratorDashboard />
      </div>

      {/* Right: Felt Integration Panel */}
      <div className="w-96 bg-white border-l border-slate-200 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Felt Integration</h2>
            <p className="text-xs text-slate-500">Deploy to collaborative map</p>
          </div>
        </div>

        {/* Market Nodes Preview */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-700 mb-3">Market Nodes</h3>
          <div className="space-y-2">
            {marketNodes.map((node) => (
              <div
                key={node.id}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold">{node.territory}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      node.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Score: {node.gtmScore}</span>
                  <span>Growth: {node.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deploy Button */}
        <button
          onClick={handleFeltDeploy}
          disabled={deployStatus === 'deploying'}
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            deployStatus === 'success'
              ? 'bg-emerald-100 text-emerald-700'
              : deployStatus === 'deploying'
              ? 'bg-slate-200 text-slate-500 cursor-wait'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {deployStatus === 'deploying' && (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Deploying...
            </>
          )}
          {deployStatus === 'success' && (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Deployed Successfully
            </>
          )}
          {deployStatus === 'idle' && (
            <>
              <Upload className="w-4 h-4" />
              Deploy to Felt
            </>
          )}
          {deployStatus === 'error' && 'Deployment Failed - Retry'}
        </button>

        {/* Success State */}
        {feltUrl && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-sm font-bold text-emerald-800 mb-2">
              Map deployed successfully!
            </p>
            <a
              href={feltUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 underline"
            >
              View on Felt.com →
            </a>
          </div>
        )}

        {/* Integration Info */}
        <div className="mt-auto pt-6 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
            Integration Details
          </h4>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>API Status:</span>
              <span className="font-semibold text-emerald-600">Connected</span>
            </div>
            <div className="flex justify-between">
              <span>Map ID:</span>
              <span className="font-mono text-[10px]">{feltMapId}</span>
            </div>
            <div className="flex justify-between">
              <span>Nodes:</span>
              <span className="font-semibold">{marketNodes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeltIntegrationExample;
