export type PageId =
  | 'overview'
  | 'spend-intelligence'
  | 'suppliers'
  | 'supplier-detail'
  | 'purchase-orders'
  | 'risk-radar'
  | 'savings-lab'
  | 'forecast'
  | 'contracts'
  | 'what-if'
  | 'ai-analyst'
  | 'reports';

export type WeatherState = 'Calm' | 'Stable' | 'Cloudy' | 'Storm';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type POStatus = 'ON_TRACK' | 'AT_RISK' | 'DELAYED' | 'DELIVERED' | 'CANCELLED';

export type ContractStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'AT_RISK' | 'UNDER_REVIEW' | 'EXPIRED';

export interface SupplierMetric {
  delivery: number; // 0-100
  quality: number;  // 0-100
  cost: number;     // 0-100
  reliability: number; // 0-100
  compliance: number;  // 0-100
  overall: number;     // 0-100
}

export interface SupplierTimelineEvent {
  month: string;
  year?: number;
  event: string;
  impact: 'positive' | 'negative' | 'neutral' | 'warning';
  detail: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  businessUnits: string[];
  spendValueCr: number; // in Crores
  spendPercentage: number;
  healthScore: number; // 0-100
  riskLevel: RiskLevel;
  tier: 'Strategic' | 'Preferred' | 'Transactional' | 'At Risk';
  country: string;
  metrics: SupplierMetric;
  activeContracts: number;
  activePOs: number;
  leakageAmountLakhs: number; // in Lakhs
  trend: 'improving' | 'deteriorating' | 'stable';
  timeline: SupplierTimelineEvent[];
  notes: string;
  contactPerson: string;
  contractExpiryDate: string;
  priceVariancePct: number;
  isAlternativeAvailable: boolean;
  alternativeSupplierId?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  category: string;
  businessUnit: string;
  valueLakhs: number;
  currency: string;
  orderDate: string;
  promisedDeliveryDate: string;
  expectedDeliveryDate: string;
  status: POStatus;
  riskScore: number; // 0-100
  riskReason?: string;
  itemsCount: number;
  lineItems: {
    sku: string;
    description: string;
    qty: number;
    unitPrice: number;
    total: number;
  }[];
}

export interface Contract {
  id: string;
  contractCode: string;
  supplierId: string;
  supplierName: string;
  title: string;
  category: string;
  valueCr: number;
  startDate: string;
  expiryDate: string;
  daysToExpiry: number;
  slaAdherencePct: number;
  status: ContractStatus;
  leakageLakhs: number;
  penaltyTerms: string;
  autoRenew: boolean;
  owner: string;
}

export interface RiskEvent {
  id: string;
  title: string;
  category: 'Supplier' | 'Delivery' | 'Quality' | 'Cost' | 'Dependency' | 'Compliance';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  probability: 'LOW' | 'MEDIUM' | 'HIGH';
  supplierId?: string;
  supplierName?: string;
  description: string;
  financialExposureCr: number;
  whyItMatters: string;
  recommendedAction: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  title: string;
  message: string;
  whyItMatters: string;
  recommendedAction: string;
  category: string;
  supplierId?: string;
  supplierName?: string;
  date: string;
  acknowledged: boolean;
}

export interface SavingsOpportunity {
  id: string;
  title: string;
  type: 'Duplicate Suppliers' | 'Price Variance' | 'Contract Leakage' | 'Maverick Purchasing' | 'Volume Consolidation';
  potentialSavingsLakhs: number;
  confidencePct: number;
  category: string;
  affectedSuppliers: string[];
  recommendedAction: string;
  implementationEase: 'Easy' | 'Moderate' | 'Complex';
  status: 'IDENTIFIED' | 'IN_VALIDATION' | 'NEGOTIATING' | 'CAPTURED';
  details: string;
}

export interface PriceAnomaly {
  id: string;
  commodityName: string;
  historicalPrice: number;
  currentPrice: number;
  unit: string;
  variancePct: number;
  affectedSupplierId: string;
  affectedSupplierName: string;
  benchmarkPrice: number;
  trendData: { month: string; actual: number; benchmark: number }[];
}

export interface ForecastPoint {
  period: string; // e.g. "Nov '26"
  isHistorical: boolean;
  actualSpendCr?: number;
  forecastSpendCr: number;
  lowerConfidenceCr: number;
  upperConfidenceCr: number;
  demandVolumeIndex: number;
  leadTimeDays: number;
}

export interface ScenarioSimulationParams {
  supplierAAllocationPct: number;
  supplierBAllocationPct: number;
  demandGrowthPct: number;
  supplierAPriceChangePct: number;
  leadTimeVarianceDays: number;
}

export interface ScenarioSimulationResult {
  currentSpendCr: number;
  simulatedSpendCr: number;
  projectedSavingsCr: number;
  riskScoreDelta: number;
  supplierDependencyPct: number;
  deliveryReliabilityPct: number;
  recommendationVerdict: string;
}

export interface ProcurementPulse {
  totalSpendCr: number;
  spendGrowthYoYPct: number;
  savingsIdentifiedCr: number;
  highRiskSuppliersCount: number;
  poHealthPct: number;
  contractLeakageLakhs: number;
  activePOCount: number;
  activeContractsCount: number;
  topSuppliersConcentrationPct: number;
}

export interface AIAnalystQuery {
  id: string;
  query: string;
  category: string;
  answer: string;
  supportingMetrics: { label: string; value: string; delta?: string; isPositive?: boolean }[];
  breakdown: { label: string; amount: string; pct: number }[];
  recommendation: {
    actionTitle: string;
    details: string;
    targetSupplier?: string;
    confidencePct: number;
    actions: { label: string; actionKey: string }[];
  };
}

export interface ReportConfig {
  id: string;
  title: string;
  code: string;
  cadence: 'Weekly' | 'Monthly' | 'Quarterly' | 'On-Demand';
  category: 'Spend' | 'Suppliers' | 'Risk' | 'Executive' | 'Savings';
  lastGenerated: string;
  description: string;
  executiveSummary: string;
}
