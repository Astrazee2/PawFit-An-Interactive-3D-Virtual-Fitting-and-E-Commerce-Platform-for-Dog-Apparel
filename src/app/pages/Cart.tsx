import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardContent className="py-16 text-center">
            <div className="text-8xl mb-4">🐕</div>
            <h2 className="text-2xl font-bold mb-2 text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>Your cart is empty</h2>
            <p className="text-[#6B5D56] mb-6">Start shopping to add items to your pup's wardrobe</p>
            <Button onClick={() => navigate('/products')}>Browse Products</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
        <span className="mr-3">🛒</span>
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={`${item.product.id}-${item.size}`}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0"></div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                    <p className="text-sm text-gray-600 mb-3">{item.product.apparelType}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[#5C3D2E]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-[#E8E4DF] pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#5C3D2E]">Estimated Total</span>
                  <span className="text-[#5C3D2E]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {isAuthenticated ? (
                <Button onClick={() => navigate('/checkout')} className="w-full bg-[#5C3D2E] hover:bg-[#4A3024] rounded-xl" size="lg">
                  Proceed to Checkout
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button onClick={() => navigate('/login')} className="w-full bg-[#5C3D2E] hover:bg-[#4A3024] rounded-xl" size="lg">
                    Login to Checkout
                  </Button>
                  <Button onClick={() => navigate('/register')} variant="outline" className="w-full">
                    Create Account
                  </Button>
                </div>
              )}

              <Button
                onClick={() => navigate('/products')}
                variant="ghost"
                className="w-full mt-3"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
