import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Package, ShoppingCart, Box, Search, Bell, Inbox,
  BarChart3, FileText, DollarSign, Settings, TrendingUp, Menu, X
} from 'lucide-react';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const navItems = [
    { section: 'MAIN', items: [
      { to: '/admin', label: 'Dashboard', icon: BarChart3 },
      { to: '/admin/products', label: 'Products', icon: Package },
      { to: '/admin/orders', label: 'Orders & Delivery', icon: ShoppingCart },
      { to: '/admin/assets', label: '3D Assets', icon: Box },
    ]},
    { section: 'INSIGHTS', items: [
      { to: '/admin/stats', label: 'Stats', icon: TrendingUp },
      { to: '/admin/reports', label: 'Reports', icon: FileText },
      { to: '/admin/finances', label: 'Finances', icon: DollarSign },
    ]},
    { section: 'OTHER', items: [
      { to: '/admin/inbox', label: 'Inbox', icon: Inbox },
      { to: '/admin/notifications', label: 'Notifications', icon: Bell, badge: 3 },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ]},
  ];

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F4F6]">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-[#5C3D2E]" /> : <Menu className="w-6 h-6 text-[#5C3D2E]" />}
      </button>

      {/* Sidebar - Fixed Desktop / Overlay Mobile */}
      <aside className={`
        w-64 bg-white border-r border-[#E8E4DF] h-screen overflow-y-auto
        fixed left-0 top-0 z-40 transition-transform duration-300
        md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
              PawFit
            </span>
          </Link>

          <div className="flex items-center gap-3 mb-8 p-3 bg-[#FAF7F2] rounded-xl">
            <div className="w-10 h-10 bg-[#5C3D2E] rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#5C3D2E]">Admin</p>
              <p className="text-xs text-[#6B5D56]">Administrator</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ section, items }) => (
              <div key={section}>
                <p className="text-xs font-semibold text-[#6B5D56] mb-2 px-3 mt-6 first:mt-0">
                  {section}
                </p>
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                        active
                          ? 'bg-[#5C3D2E] text-white'
                          : 'text-[#6B5D56] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-[#C4714A] text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-[#E8E4DF]">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-sm font-medium text-[#6B5D56] hover:bg-[#FAF7F2] rounded-xl text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-[#E8E4DF] px-4 md:px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl ml-12 md:ml-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B5D56]" />
                <Input
                  placeholder="Search Dashboard..."
                  className="pl-10 bg-[#FAF7F2] border-0 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative p-2 hover:bg-[#FAF7F2] rounded-lg">
                <Inbox className="w-5 h-5 text-[#6B5D56]" />
              </button>
              <button className="relative p-2 hover:bg-[#FAF7F2] rounded-lg">
                <Bell className="w-5 h-5 text-[#6B5D56]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C4714A] rounded-full"></span>
              </button>
              <div className="w-9 h-9 bg-[#5C3D2E] rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
}
