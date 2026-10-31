import React, { useState } from 'react';
import { I18nProvider, useTranslation } from './i18n/context';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { MarketIntelligence } from './pages/MarketIntelligence';
import { PriceForecast } from './pages/PriceForecast';
import { AllocationOptimizer } from './pages/AllocationOptimizer';
import { MandiCapacity } from './pages/MandiCapacity';
import { NetRealizationCalc } from './pages/NetRealizationCalc';
import { CropHealthDiagnosis } from './pages/CropHealthDiagnosis';
import { CropSelection } from './pages/CropSelection';
import { WeatherDashboard } from './pages/WeatherDashboard';
import { InteractiveMap } from './pages/InteractiveMap';
import { TransportSharing } from './pages/TransportSharing';
import { BuyerMarketplace } from './pages/BuyerMarketplace';
import { StorageManagement } from './pages/StorageManagement';
import { FinancialDashboard } from './pages/FinancialDashboard';
import { FarmerCommunity } from './pages/FarmerCommunity';
import { GovernmentSchemes } from './pages/GovernmentSchemes';
import { AdminPortal } from './pages/AdminPortal';
import { FarmerOnboarding } from './pages/FarmerOnboarding';
import { MarketAnalytics } from './pages/MarketAnalytics';
import { DigitalTwinSimulator } from './pages/DigitalTwinSimulator';
import { HarvestPlanning } from './pages/HarvestPlanning';
import { ExpertPortal } from './pages/ExpertPortal';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} onOpenVoice={() => setIsVoiceOpen(true)} />;
      case 'market':
        return <MarketIntelligence />;
      case 'analytics':
        return <MarketAnalytics />;
      case 'forecast':
        return <PriceForecast />;
      case 'optimizer':
        return <AllocationOptimizer />;
      case 'capacity':
        return <MandiCapacity />;
      case 'calculator':
        return <NetRealizationCalc />;
      case 'digitalTwin':
        return <DigitalTwinSimulator />;
      case 'harvest':
        return <HarvestPlanning />;
      case 'health':
        return <CropHealthDiagnosis />;
      case 'selection':
        return <CropSelection />;
      case 'weather':
        return <WeatherDashboard />;
      case 'map':
        return <InteractiveMap />;
      case 'expert':
        return <ExpertPortal />;
      case 'transport':
        return <TransportSharing />;
      case 'marketplace':
        return <BuyerMarketplace />;
      case 'storage':
        return <StorageManagement />;
      case 'finance':
        return <FinancialDashboard />;
      case 'community':
        return <FarmerCommunity />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'admin':
        return <AdminPortal />;
      case 'onboarding':
        return <FarmerOnboarding onSaved={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard onNavigate={setActiveTab} onOpenVoice={() => setIsVoiceOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navbar with Language & Role Switcher */}
      <Navbar
        onOpenVoice={() => setIsVoiceOpen(true)}
        onOpenAssistant={() => setIsAIOpen(true)}
        activeTab={activeTab}
      />

      {/* Connectivity & Low-Bandwidth Mode Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Online Mode · Offline Cache Active (12 Mandis, 4 Commodities Saved)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLowBandwidth(!isLowBandwidth)}
            className={`cursor-pointer transition-colors ${
              isLowBandwidth ? 'text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isLowBandwidth ? '⚡ Low-Bandwidth Mode: ON (Compressed Images)' : 'Low-Bandwidth Mode: OFF'}
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden md:block">
          <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
        </div>

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden sticky bottom-0 z-30 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'dashboard' ? 'text-emerald-700' : ''}`}
        >
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('optimizer')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'optimizer' ? 'text-emerald-700 font-bold' : ''}`}
        >
          <span>Allocator</span>
        </button>
        <button
          onClick={() => setActiveTab('market')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'market' ? 'text-emerald-700' : ''}`}
        >
          <span>Prices</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'analytics' ? 'text-emerald-700' : ''}`}
        >
          <span>Graphs</span>
        </button>
        <button
          onClick={() => setActiveTab('digitalTwin')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'digitalTwin' ? 'text-emerald-700' : ''}`}
        >
          <span>Twin</span>
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'community' ? 'text-emerald-700' : ''}`}
        >
          <span>Community</span>
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`flex flex-col items-center gap-0.5 p-1 shrink-0 ${activeTab === 'health' ? 'text-emerald-700' : ''}`}
        >
          <span>Disease</span>
        </button>
      </div>

      {/* Voice Assistant Modal Overlay */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setIsVoiceOpen(false);
        }}
      />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <MainApp />
    </I18nProvider>
  );
}
