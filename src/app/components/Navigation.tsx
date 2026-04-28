import { Link, useNavigate } from 'react-router';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { useState } from 'react';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = user?.role === 'admin' ? [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/assets', label: '3D Assets' },
  ] : [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/try-on', label: 'Try On' },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">🐾</span>
              <span style={{ fontFamily: "'DM Serif Display', serif" }}>PawFit</span>
            </Link>

            <div className="hidden md:flex gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[#6B5D56] hover:text-[#5C3D2E] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user?.role !== 'admin' && (
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 text-[#6B5D56] hover:text-[#5C3D2E] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C4714A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.role !== 'admin' && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/pets')}>
                      My Pets
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>
                      Orders
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/account')}>
                      <User className="w-4 h-4 mr-2" />
                      {user?.name}
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {user?.role !== 'admin' && (
              <Link
                to="/cart"
                className="block py-2 text-gray-700 hover:text-teal-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart ({cartItemCount})
              </Link>
            )}

            {isAuthenticated ? (
              <>
                {user?.role !== 'admin' && (
                  <>
                    <Link to="/pets" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                      My Pets
                    </Link>
                    <Link to="/orders" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                      Orders
                    </Link>
                    <Link to="/account" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                      Account
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="block w-full text-left py-2 text-gray-700">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-teal-600" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
