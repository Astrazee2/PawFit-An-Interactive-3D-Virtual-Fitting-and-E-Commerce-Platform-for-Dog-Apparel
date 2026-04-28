import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { Home } from './pages/Home';
import { ProductCatalog } from './pages/ProductCatalog';
import { ProductDetail } from './pages/ProductDetail';
import { VirtualFitting } from './pages/VirtualFitting';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PetProfiles } from './pages/PetProfiles';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderHistory } from './pages/OrderHistory';
import { AccountSettings } from './pages/AccountSettings';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProductManagement } from './pages/admin/ProductManagement';
import { OrderManagement } from './pages/admin/OrderManagement';
import { AssetManagement } from './pages/admin/AssetManagement';
import { StatsPage } from './pages/admin/StatsPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { FinancesPage } from './pages/admin/FinancesPage';
import { InboxPage } from './pages/admin/InboxPage';
import { NotificationsPage } from './pages/admin/NotificationsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: ProductCatalog },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'try-on', Component: VirtualFitting },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'pets', Component: PetProfiles },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'order-confirmation/:id', Component: OrderConfirmation },
      { path: 'orders', Component: OrderHistory },
      { path: 'account', Component: AccountSettings },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'products', Component: ProductManagement },
      { path: 'orders', Component: OrderManagement },
      { path: 'assets', Component: AssetManagement },
      { path: 'stats', Component: StatsPage },
      { path: 'reports', Component: ReportsPage },
      { path: 'finances', Component: FinancesPage },
      { path: 'inbox', Component: InboxPage },
      { path: 'notifications', Component: NotificationsPage },
      { path: 'settings', Component: SettingsPage },
    ],
  },
]);
