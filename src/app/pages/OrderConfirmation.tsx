import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Order } from '../types';
import { CheckCircle } from 'lucide-react';

export function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('pawfit_orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === id);
    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardContent className="pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">🐕</div>
            <CheckCircle className="w-20 h-20 text-[#7A9D7A] mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2 text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>Order Confirmed!</h1>
            <p className="text-[#6B5D56]">Thank you for shopping with PawFit</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Order Number</p>
                <p className="font-bold">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Order Date</p>
                <p className="font-bold">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Amount</p>
                <p className="font-bold text-teal-600">${order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Status</p>
                <p className="font-bold">{order.status}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-3">Shipping Information</h2>
            <div className="text-sm space-y-1">
              <p>{order.shippingInfo.name}</p>
              <p>{order.shippingInfo.address}</p>
              <p>{order.shippingInfo.contactNumber}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-3">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} (Size {item.size}) × {item.quantity}
                  </span>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate('/orders')} className="flex-1">
              View Order History
            </Button>
            <Button onClick={() => navigate('/products')} variant="outline" className="flex-1">
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
