import React, { useState } from 'react';
import { useTranslation } from '../i18n/context';
import { DigitalTwinBlock, WhatIfSimulationResult } from '../types';
import {
  Layers,
  Sparkles,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Droplets,
  Sprout,
  Activity,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const DigitalTwinSimulator: React.FC = () => {
  const { t, language } = useTranslation();

  // Farm sub-blocks (virtual farm model)
  const [blocks, setBlocks] = useState<DigitalTwinBlock[]>([
    {
      blockId: 'blk-1',
      name: 'North Block (Plot A)',
      areaAcres: 2.5,
      crop: 'Tomato',
      variety: 'Hybrid Shivam',
      sowingDate: '2026-08-10',
      stage: 'Fruit Maturation',
      daysToHarvest: 6,
      healthScorePercent: 92,
      soilMoisturePercent: 68,
      nitrogenStatus: 'Optimal',
      phosphorusStatus: 'Optimal',
      potassiumStatus: 'Optimal',
      phLevel: 6.8,
      predictedYieldQtl: 45
    },
    {
      blockId: 'blk-2',
      name: 'South Block (Plot B)',
      areaAcres: 2.0,
      crop: 'Ragi (Finger Millet)',
      variety: 'GPU-28',
      sowingDate: '2026-07-20',
      stage: 'Flowering',
      daysToHarvest: 22,
      healthScorePercent: 96,
      soilMoisturePercent: 54,
      nitrogenStatus: 'Optimal',
      phosphorusStatus: 'Low',
      potassiumStatus: 'Optimal',
      phLevel: 6.5,
      predictedYieldQtl: 32
    }
  ]);

  // What-If Simulation Controls
  const [simulatedPriceDrop, setSimulatedPriceDrop] = useState<number>(20); // 20% price crash
  const [simulatedRainDeficit, setSimulatedRainDeficit] = useState<number>(0); // 0 to 50%
  const [selectedBlockId, setSelectedBlockId] = useState<string>('blk-1');

  const selectedBlock = blocks.find(b => b.blockId === selectedBlockId) || blocks[0];

  // Baseline calculations
  const baselinePrice = selectedBlock.crop === 'Tomato' ? 2550 : 3400;
  const baselineGross = selectedBlock.predictedYieldQtl * baselinePrice;
  const baselineCosts = Math.round(selectedBlock.areaAcres * 22000 + selectedBlock.predictedYieldQtl * 210);
  const baselineNet = baselineGross - baselineCosts;

  // What-If Shock Calculations
  const shockedPrice = Math.round(baselinePrice * (1 - simulatedPriceDrop / 100));
  const shockedGross = selectedBlock.predictedYieldQtl * shockedPrice;
  const shockedNet = shockedGross - baselineCosts;
  const netLossVariance = shockedNet - baselineNet;

  // Multi-scenario comparison
  const simulationScenarios: WhatIfSimulationResult[] = [
    {
      scenarioName: 'Scenario 1: Market Glut Shock (-20% Price Crash)',
      priceShockPercent: -20,
      simulatedPricePerQtl: Math.round(baselinePrice * 0.8),
      simulatedGrossRevenue: Math.round(baselineGross * 0.8),
      simulatedTotalCosts: baselineCosts,
      simulatedNetRealization: Math.round(baselineGross * 0.8 - baselineCosts),
      varianceFromBaseline: Math.round(baselineGross * 0.8 - baselineCosts - baselineNet),
      recommendedMitigationStrategy: {
        en: 'Divert 40% of produce to cold storage in Kolar for 10 days until urban glut clears; sell 60% via direct FPO contract.',
        kn: 'ಶೇ. 40 ಸರಕನ್ನು ಕೋಲಾರ ಶೀತಲ ಗೋದಾಮಿನಲ್ಲಿ 10 ದಿನ ಇರಿಸಿ; ಉಳಿದ ಶೇ. 60 ಸರಕನ್ನು ಎಫ್‌ಪಿಒಗೆ ನೇರವಾಗಿ ನೀಡಿ.',
        hi: '40% उपज को 10 दिनों के लिए कोलार कोल्ड स्टोरेज में रखें और 60% उपज सीधे एफपीओ को बेचें।'
      }
    },
    {
      scenarioName: 'Scenario 2: Severe Crash (-35% Interstate Dumping)',
      priceShockPercent: -35,
      simulatedPricePerQtl: Math.round(baselinePrice * 0.65),
      simulatedGrossRevenue: Math.round(baselineGross * 0.65),
      simulatedTotalCosts: baselineCosts,
      simulatedNetRealization: Math.round(baselineGross * 0.65 - baselineCosts),
      varianceFromBaseline: Math.round(baselineGross * 0.65 - baselineCosts - baselineNet),
      recommendedMitigationStrategy: {
        en: 'Engage processing industries (pulp factory at Chittoor/Kolar) at floor price of ₹1,650/qtl to avoid complete auction wipeout.',
        kn: 'ಸಂಪೂರ್ಣ ನಷ್ಟ ತಪ್ಪಿಸಲು ಚಿತ್ತೂರು/ಕೋಲಾರದ ಟೊಮ್ಯಾಟೊ ಪಲ್ಪ್ ಫ್ಯಾಕ್ಟರಿಗೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹1,650 ಕನಿಷ್ಠ ದರಕ್ಕೆ ಒಪ್ಪಂದ ಮಾಡಿಕೊಳ್ಳಿ.',
        hi: 'भारी नुकसान से बचने के लिए चित्तूर/कोलार की पल्प प्रोसेसिंग यूनिट को ₹1,650 के न्यूनतम भाव पर बेचें।'
      }
    },
    {
      scenarioName: 'Scenario 3: Upward Rally (+15% Festive Demand)',
      priceShockPercent: 15,
      simulatedPricePerQtl: Math.round(baselinePrice * 1.15),
      simulatedGrossRevenue: Math.round(baselineGross * 1.15),
      simulatedTotalCosts: baselineCosts,
      simulatedNetRealization: Math.round(baselineGross * 1.15 - baselineCosts),
      varianceFromBaseline: Math.round(baselineGross * 1.15 - baselineCosts - baselineNet),
      recommendedMitigationStrategy: {
        en: 'Dispatch 100% of harvest to Bengaluru Yeshwantpur APMC via shared truck to capture maximum auction premium.',
        kn: 'ಗರಿಷ್ಠ ಲಾಭ ಪಡೆಯಲು ಸಂಪೂರ್ಣ ಕೊಯ್ಲನ್ನು ಜಂಟಿ ಲಾರಿ ಮೂಲಕ ಬೆಂಗಳೂರು ಯಶವಂತಪುರ ಮಂಡಿಗೆ ಕಳುಹಿಸಿ.',
        hi: 'अधिकतम मुनाफा कमाने के लिए पूरी फसल को साझा ट्रक द्वारा तुरंत बेंगलुरु यशवंतपुर मंडी भेजें।'
      }
    }
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>AI Virtual Farm Simulation & Market Shock Stress-Testing</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">AI Farm Digital Twin & What-If Simulator</h1>
        <p className="text-sm text-slate-500">
          Simulate what happens if prices suddenly collapse, weather shifts, or input costs increase, with AI-recommended mitigation strategies.
        </p>
      </div>

      {/* Virtual Farm Representation (Sub-Plots) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blocks.map(blk => {
          const isSelected = selectedBlock.blockId === blk.blockId;
          return (
            <div
              key={blk.blockId}
              onClick={() => setSelectedBlockId(blk.blockId)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {blk.areaAcres} Acres Plot
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-2">{blk.name}</h3>
                    <p className="text-xs text-slate-500">{blk.crop} ({blk.variety})</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    Health: {blk.healthScorePercent}%
                  </span>
                </div>

                {/* Agronomic status grid */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Stage</span>
                    <span className="font-bold text-slate-800">{blk.stage}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Soil Moisture</span>
                    <span className="font-bold text-slate-800">{blk.soilMoisturePercent}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">Est. Yield</span>
                    <span className="font-bold text-slate-800">{blk.predictedYieldQtl} Qtl</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Soil pH: {blk.phLevel} · NPK Status: {blk.nitrogenStatus}</span>
                  <span className="font-bold text-emerald-700">{blk.daysToHarvest} Days to Harvest</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive What-If Stress Testing Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              What-If Financial Stress Simulator: {selectedBlock.name}
            </h2>
            <p className="text-xs text-slate-500">
              Drag the price shock slider to stress-test your net realization against market drops
            </p>
          </div>
          <button
            onClick={() => {
              setSimulatedPriceDrop(20);
              setSimulatedRainDeficit(0);
            }}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Simulated Mandi Price Crash Shock:</span>
              <span className="text-rose-600 font-mono font-bold">-{simulatedPriceDrop}% Crash</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={simulatedPriceDrop}
              onChange={e => setSimulatedPriceDrop(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0% (Stable ₹{baselinePrice})</span>
              <span>-25% (₹{Math.round(baselinePrice * 0.75)})</span>
              <span>-50% Crash (₹{Math.round(baselinePrice * 0.5)})</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Simulated Rainfall / Irrigation Deficit:</span>
              <span className="text-amber-600 font-mono font-bold">{simulatedRainDeficit}% Deficit</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={simulatedRainDeficit}
              onChange={e => setSimulatedRainDeficit(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Normal Drip Flow</span>
              <span>25% Water Stress</span>
              <span>50% Drought Alert</span>
            </div>
          </div>
        </div>

        {/* Real-Time Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase font-semibold">Simulated Auction Price</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              ₹{shockedPrice} <span className="text-xs font-normal text-slate-500">/ Qtl</span>
            </div>
            <span className="text-xs text-rose-600 font-bold block mt-0.5">
              -₹{baselinePrice - shockedPrice} / Qtl from Baseline
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase font-semibold">Simulated Net Farm Realization</span>
            <div className={`text-2xl font-black font-mono mt-1 ${shockedNet >= 0 ? 'text-emerald-800' : 'text-rose-600'}`}>
              ₹{shockedNet.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 block mt-0.5">
              Baseline Net: ₹{baselineNet.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase font-semibold">Net Profit Variance</span>
            <div className="text-2xl font-black text-rose-600 font-mono mt-1">
              -₹{Math.abs(netLossVariance).toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 block mt-0.5">
              Impact on {selectedBlock.predictedYieldQtl} Quintals
            </span>
          </div>
        </div>

        {/* Pre-Computed Multi-Scenario Recommendations */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            AI Automated Risk Mitigation Scenarios
          </h3>

          <div className="space-y-3">
            {simulationScenarios.map((sc, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{sc.scenarioName}</span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        sc.priceShockPercent > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {sc.priceShockPercent > 0 ? `+${sc.priceShockPercent}%` : `${sc.priceShockPercent}%`}
                    </span>
                  </div>
                  <div className="mt-1.5 text-slate-700 leading-relaxed font-medium">
                    <strong className="text-emerald-900">Recommended Action:</strong>{' '}
                    {sc.recommendedMitigationStrategy[language] || sc.recommendedMitigationStrategy.en}
                  </div>
                </div>

                <div className="text-right shrink-0 md:border-l md:border-slate-200 md:pl-5">
                  <span className="text-slate-400 block text-[11px]">Net Farm Revenue</span>
                  <span className="font-bold font-mono text-slate-900 text-sm">
                    ₹{sc.simulatedNetRealization.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
