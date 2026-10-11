import {
  MOCK_SUPPLIERS,
  MOCK_PURCHASE_ORDERS,
  MOCK_CONTRACTS,
  MOCK_RISK_EVENTS,
  MOCK_ALERTS,
  MOCK_SAVINGS_OPPORTUNITIES,
  MOCK_PRICE_ANOMALY,
  MOCK_FORECAST_DATA,
  MOCK_AI_QUERIES,
  MOCK_REPORTS,
  MOCK_PULSE,
  MOCK_WEATHER,
  calculateSpendByCategory,
  calculateSpendByBusinessUnit,
  calculateLeakageBreakdown
} from '../data/mockData';
import {
  Supplier,
  PurchaseOrder,
  Contract,
  RiskEvent,
  Alert,
  SavingsOpportunity,
  PriceAnomaly,
  ForecastPoint,
  ProcurementPulse,
  ScenarioSimulationParams,
  ScenarioSimulationResult,
  AIAnalystQuery,
  ReportConfig
} from '../types';

export const supplierService = {
  getAll: async (): Promise<Supplier[]> => {
    return [...MOCK_SUPPLIERS];
  },

  getById: async (id: string): Promise<Supplier | undefined> => {
    return MOCK_SUPPLIERS.find(s => s.id === id);
  },

  filterByRisk: async (risk: string): Promise<Supplier[]> => {
    if (!risk || risk === 'All') return [...MOCK_SUPPLIERS];
    if (risk === 'Strategic') return MOCK_SUPPLIERS.filter(s => s.tier === 'Strategic');
    if (risk === 'At Risk') return MOCK_SUPPLIERS.filter(s => s.tier === 'At Risk' || s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL');
    return MOCK_SUPPLIERS.filter(s => s.riskLevel.toLowerCase() === risk.toLowerCase());
  }
};

export const purchaseOrderService = {
  getAll: async (): Promise<PurchaseOrder[]> => {
    return [...MOCK_PURCHASE_ORDERS];
  },

  getById: async (id: string): Promise<PurchaseOrder | undefined> => {
    return MOCK_PURCHASE_ORDERS.find(p => p.id === id);
  },

  filterPOs: async (filters: {
    status?: string;
    supplierId?: string;
    category?: string;
    search?: string;
  }): Promise<PurchaseOrder[]> => {
    return MOCK_PURCHASE_ORDERS.filter(po => {
      if (filters.status && filters.status !== 'ALL' && po.status !== filters.status) return false;
      if (filters.supplierId && filters.supplierId !== 'ALL' && po.supplierId !== filters.supplierId) return false;
      if (filters.category && filters.category !== 'ALL' && po.category !== filters.category) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesNo = po.poNumber.toLowerCase().includes(query);
        const matchesSupplier = po.supplierName.toLowerCase().includes(query);
        const matchesCategory = po.category.toLowerCase().includes(query);
        if (!matchesNo && !matchesSupplier && !matchesCategory) return false;
      }
      return true;
    });
  }
};

export const contractService = {
  getAll: async (): Promise<Contract[]> => {
    return [...MOCK_CONTRACTS];
  },

  getById: async (id: string): Promise<Contract | undefined> => {
    return MOCK_CONTRACTS.find(c => c.id === id);
  }
};

export const riskService = {
  getAllEvents: async (): Promise<RiskEvent[]> => {
    return [...MOCK_RISK_EVENTS];
  },

  getAlerts: async (): Promise<Alert[]> => {
    return [...MOCK_ALERTS];
  },

  acknowledgeAlert: async (id: string): Promise<boolean> => {
    const alert = MOCK_ALERTS.find(a => a.id === id);
    if (alert) alert.acknowledged = true;
    return true;
  }
};

export const savingsService = {
  getOpportunities: async (): Promise<SavingsOpportunity[]> => {
    return [...MOCK_SAVINGS_OPPORTUNITIES];
  },

  getPriceAnomaly: async (): Promise<PriceAnomaly> => {
    return { ...MOCK_PRICE_ANOMALY };
  }
};

export const analyticsService = {
  getPulse: async (): Promise<ProcurementPulse> => {
    return { ...MOCK_PULSE };
  },

  getWeather: async () => {
    return { ...MOCK_WEATHER };
  },

  getSpendByCategory: async () => {
    return calculateSpendByCategory();
  },

  getSpendByBusinessUnit: async () => {
    return calculateSpendByBusinessUnit();
  },

  getLeakageBreakdown: async () => {
    return calculateLeakageBreakdown();
  },

  simulateDigitalTwin: (params: ScenarioSimulationParams): ScenarioSimulationResult => {
    const baseSpend = 18.42;
    // Apex spend is 3.84 Cr base (approx 20.8%)
    // Vertex is secondary vendor
    const apexBaseSpend = 3.84;
    const shiftFraction = (100 - params.supplierAAllocationPct) / 100; // if supplierA is 80%, shift is 20%
    const shiftedSpend = apexBaseSpend * shiftFraction;

    // Price change on remaining supplier A spend
    const priceMultiplier = 1 + (params.supplierAPriceChangePct / 100);
    const demandMultiplier = 1 + (params.demandGrowthPct / 100);

    // Vertex has a 5.2% discount advantage over Apex's current price
    const savingsFromShift = shiftedSpend * 0.052;
    const remainingApexSpend = (apexBaseSpend - shiftedSpend) * priceMultiplier;
    const otherSpend = (baseSpend - apexBaseSpend);

    const simulatedSpendCr = ((remainingApexSpend + (shiftedSpend * 0.948) + otherSpend) * demandMultiplier);
    const projectedSavingsCr = Math.max(0, (baseSpend * demandMultiplier) - simulatedSpendCr + savingsFromShift);

    // Risk delta
    const riskScoreDelta = -Math.round((shiftFraction * 24) - (params.leadTimeVarianceDays * 0.8) + (params.supplierAPriceChangePct * 0.5));
    const supplierDependencyPct = Number(((remainingApexSpend / (simulatedSpendCr || 1)) * 100).toFixed(1));
    const deliveryReliabilityPct = Math.min(99, Math.max(50, Math.round(76 + (shiftFraction * 18) - (params.leadTimeVarianceDays * 0.6))));

    let verdict = 'Optimal Balance: Shifting volume mitigates single-source dependency and locks in substantial savings.';
    if (params.supplierAAllocationPct > 80) {
      verdict = 'High Exposure: Apex concentration remains above safety thresholds (>16%).';
    } else if (params.supplierAAllocationPct < 40) {
      verdict = 'Aggressive Reallocation: Monitor Vertex capacity ramp to prevent secondary bottleneck.';
    }

    return {
      currentSpendCr: Number((baseSpend * demandMultiplier).toFixed(2)),
      simulatedSpendCr: Number(simulatedSpendCr.toFixed(2)),
      projectedSavingsCr: Number(projectedSavingsCr.toFixed(2)),
      riskScoreDelta,
      supplierDependencyPct,
      deliveryReliabilityPct,
      recommendationVerdict: verdict
    };
  }
};

export const forecastService = {
  getForecast: async (timeframe: '30D' | '90D' | '6M' | '12M'): Promise<ForecastPoint[]> => {
    if (timeframe === '30D') return MOCK_FORECAST_DATA.slice(3, 7);
    if (timeframe === '90D') return MOCK_FORECAST_DATA.slice(2, 9);
    if (timeframe === '6M') return MOCK_FORECAST_DATA.slice(0, 10);
    return [...MOCK_FORECAST_DATA];
  }
};

export const aiService = {
  getQueries: async (): Promise<AIAnalystQuery[]> => {
    return [...MOCK_AI_QUERIES];
  }
};

export const reportService = {
  getReports: async (): Promise<ReportConfig[]> => {
    return [...MOCK_REPORTS];
  }
};
