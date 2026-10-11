import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { SupplierDetailDrawer } from '../modals/SupplierDetailDrawer';
import { PODetailDrawer } from '../modals/PODetailDrawer';
import { ContractDetailDrawer } from '../modals/ContractDetailDrawer';
import { SavingsDetailDrawer } from '../modals/SavingsDetailDrawer';
import { PageId, Supplier, PurchaseOrder, Contract, SavingsOpportunity } from '../../types';
import { MOCK_ALERTS, MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS, MOCK_CONTRACTS } from '../../data/mockData';

// Pages
import { Overview } from '../../pages/Overview';
import { SpendIntelligence } from '../../pages/SpendIntelligence';
import { Suppliers } from '../../pages/Suppliers';
import { SupplierDetail } from '../../pages/SupplierDetail';
import { PurchaseOrders } from '../../pages/PurchaseOrders';
import { RiskRadar } from '../../pages/RiskRadar';
import { SavingsLab } from '../../pages/SavingsLab';
import { Forecast } from '../../pages/Forecast';
import { Contracts } from '../../pages/Contracts';
import { WhatIfLab } from '../../pages/WhatIfLab';
import { AIAnalyst } from '../../pages/AIAnalyst';
import { Reports } from '../../pages/Reports';

export const AppShell: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Selected entities for deep drawers
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedSavings, setSelectedSavings] = useState<SavingsOpportunity | null>(null);

  // State for supplier detail page
  const [currentSupplierId, setCurrentSupplierId] = useState<string>('sup-apex');

  const unreadAlerts = MOCK_ALERTS.filter(a => !a.acknowledged).length;

  const handleNavigate = (page: PageId, meta?: any) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    if (meta?.supplierId) {
      setCurrentSupplierId(meta.supplierId);
      const sup = MOCK_SUPPLIERS.find(s => s.id === meta.supplierId);
      if (sup) setSelectedSupplier(sup);
    }
    if (meta?.poId) {
      const po = MOCK_PURCHASE_ORDERS.find(p => p.id === meta.poId);
      if (po) setSelectedPO(po);
    }
    if (meta?.contractId) {
      const c = MOCK_CONTRACTS.find(cnt => cnt.id === meta.contractId);
      if (c) setSelectedContract(c);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#17131A] text-[#F3EBDD] font-sans antialiased">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:block">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-sm flex">
          <div className="w-64 bg-[#1F1922] h-full shadow-2xl">
            <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Persistent Topbar */}
        <Topbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          unreadAlertCount={unreadAlerts}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 tech-grid-pattern">
          {currentPage === 'overview' && (
            <Overview onNavigate={handleNavigate} />
          )}

          {currentPage === 'spend-intelligence' && (
            <SpendIntelligence onNavigate={handleNavigate} />
          )}

          {currentPage === 'suppliers' && (
            <Suppliers
              onNavigate={handleNavigate}
              onOpenSupplierDrawer={(sup) => setSelectedSupplier(sup)}
            />
          )}

          {currentPage === 'supplier-detail' && (
            <SupplierDetail
              supplierId={currentSupplierId}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'purchase-orders' && (
            <PurchaseOrders
              onOpenPODrawer={(po) => setSelectedPO(po)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'risk-radar' && (
            <RiskRadar
              onNavigate={handleNavigate}
              onSelectSupplier={(id) => handleNavigate('supplier-detail', { supplierId: id })}
            />
          )}

          {currentPage === 'savings-lab' && (
            <SavingsLab
              onNavigate={handleNavigate}
              onOpenSavingsDrawer={(opp) => setSelectedSavings(opp)}
            />
          )}

          {currentPage === 'forecast' && (
            <Forecast onNavigate={handleNavigate} />
          )}

          {currentPage === 'contracts' && (
            <Contracts
              onOpenContractDrawer={(cnt) => setSelectedContract(cnt)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'what-if' && (
            <WhatIfLab
              onNavigate={handleNavigate}
              presetSupplierAId={currentSupplierId}
            />
          )}

          {currentPage === 'ai-analyst' && (
            <AIAnalyst onNavigate={handleNavigate} />
          )}

          {currentPage === 'reports' && (
            <Reports onNavigate={handleNavigate} />
          )}
        </main>
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Interactive Detail Drawers */}
      <SupplierDetailDrawer
        supplier={selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
        onOpenWhatIf={(id) => {
          setSelectedSupplier(null);
          setCurrentSupplierId(id);
          handleNavigate('what-if');
        }}
        onViewAlternative={(altId) => {
          setSelectedSupplier(null);
          setCurrentSupplierId(altId);
          handleNavigate('supplier-detail', { supplierId: altId });
        }}
      />

      <PODetailDrawer
        po={selectedPO}
        onClose={() => setSelectedPO(null)}
        onInspectSupplier={(supId) => {
          setSelectedPO(null);
          handleNavigate('supplier-detail', { supplierId: supId });
        }}
      />

      <ContractDetailDrawer
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
        onOpenWhatIf={(supId) => {
          setSelectedContract(null);
          handleNavigate('what-if');
        }}
      />

      <SavingsDetailDrawer
        opportunity={selectedSavings}
        onClose={() => setSelectedSavings(null)}
        onOpenWhatIf={() => {
          setSelectedSavings(null);
          handleNavigate('what-if');
        }}
      />
    </div>
  );
};
