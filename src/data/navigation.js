import {
    BarChart3,
    Building2,
    FolderKanban,
    LayoutDashboard,
    ReceiptText,
    TrendingDown,
    TrendingUp,
    UserRound,
    WalletCards,
  } from 'lucide-vue-next'
  
  export const mainNavigation = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  ]
  
  export const financeNavigation = [
    { label: 'Finance Overview', to: '/finance', icon: WalletCards },
    { label: 'Revenue', to: '/finance/revenue', icon: TrendingUp },
    { label: 'Expenses', to: '/finance/expenses', icon: TrendingDown },
    { label: 'Invoices', to: '/finance/invoices', icon: ReceiptText },
    { label: 'Reports', to: '/finance/reports', icon: BarChart3 },
  ]
  
  export const workspaceNavigation = [
    { label: 'Projects', to: '/projects', icon: FolderKanban },
    { label: 'Clients', to: '/clients', icon: Building2 },
    { label: 'My Profile', to: '/profile', icon: UserRound },
  ]