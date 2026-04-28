import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Order } from '../types';
import { Package } from 'lucide-react';

export function OrderHistory() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('pawfit_orders') || '[]');
    setOrders(savedOrders.sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please login to view order history</h1>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
        <span className="mr-3">📦</span>
        Order History
      </h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="text-8xl mb-4">🐶</div>
            <h2 className="text-2xl font-bold mb-2 text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>No orders yet</h2>
            <p className="text-[#6B5D56] mb-6">Start shopping to create your first order</p>
            <Button onClick={() => navigate('/products')}>Browse Products</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Order {order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-right">
                      <p className="text-sm text-[#6B5D56]">Total</p>
                      <p className="text-lg font-bold text-[#5C3D2E]">${order.total.toFixed(2)}</p>
                    </div>
                    <Badge
                      variant={
                        order.status === 'Delivered' ? 'default' :
                        order.status === 'Shipped' ? 'secondary' :
                        'outline'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product.name} (Size {item.size}) × {item.quantity}
                        </span>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
