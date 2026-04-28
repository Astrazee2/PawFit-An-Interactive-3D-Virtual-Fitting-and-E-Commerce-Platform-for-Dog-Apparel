import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  MoreVertical, TrendingUp, TrendingDown, Eye, ChevronRight
} from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { Order } from '../../types';

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('pawfit_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const totalUsers = JSON.parse(localStorage.getItem('pawfit_users') || '[]').length;
  const totalOrders = orders.length;
  const totalProducts = mockProducts.length;

  const popularProducts = [
    { id: 1, name: 'Classic Cotton Tee', views: 1243, orders: 89, breed: 'Labrador', status: 'Active' },
    { id: 2, name: 'Winter Puffer Coat', views: 1089, orders: 76, breed: 'Shih Tzu', status: 'Active' },
    { id: 3, name: 'Cozy Knit Sweater', views: 892, orders: 54, breed: 'Pomeranian', status: 'Active' },
    { id: 4, name: 'Sport Active Hoodie', views: 756, orders: 43, breed: 'Aspin', status: 'Active' },
    { id: 5, name: 'Striped Polo Shirt', views: 634, orders: 38, breed: 'Dachshund', status: 'Inactive' },
  ];

  const reviews = [
    { id: 1, user: 'Sarah M.', avatar: '👤', time: '2 hours ago', product: 'Classic Cotton Tee', comment: 'Perfect fit for my Labrador! The sizing was spot on.' },
    { id: 2, user: 'Mike R.', avatar: '👤', time: '5 hours ago', product: 'Winter Coat', comment: 'Great quality and my dog loves it. Keeps him warm during walks.' },
    { id: 3, user: 'Emma L.', avatar: '👤', time: '1 day ago', product: 'Knit Sweater', comment: 'Adorable design! The 3D fitting tool really helped with sizing.' },
  ];

  return (
    <div className="p-8">
          {/* Overview Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Overview for
              </h2>
              <select className="px-4 py-2 border border-[#E8E4DF] rounded-xl text-sm text-[#6B5D56]">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm rounded-3xl bg-gradient-to-br from-[#FFE5E5] to-[#FFD5D5] relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-[#8B4A4A] mb-2">Total Products</p>
                      <p className="text-4xl font-bold text-[#5C3D2E] mb-2">{totalProducts}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-semibold">12%</span>
                        <span className="text-[#6B5D56]">vs last period</span>
                      </div>
                    </div>
                    <button className="text-[#6B5D56]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 text-6xl opacity-20">🦴</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm rounded-3xl bg-gradient-to-br from-[#E5E5FF] to-[#D5D5FF] relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-[#4A4A8B] mb-2">Total Orders</p>
                      <p className="text-4xl font-bold text-[#5C3D2E] mb-2">{totalOrders}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-semibold">8%</span>
                        <span className="text-[#6B5D56]">vs last period</span>
                      </div>
                    </div>
                    <button className="text-[#6B5D56]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 text-6xl opacity-20">🐾</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm rounded-3xl bg-gradient-to-br from-[#E5F5FF] to-[#D5EBFF] relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-[#4A6B8B] mb-2">Registered Users</p>
                      <p className="text-4xl font-bold text-[#5C3D2E] mb-2">{totalUsers}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 font-semibold">3%</span>
                        <span className="text-[#6B5D56]">vs last period</span>
                      </div>
                    </div>
                    <button className="text-[#6B5D56]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 text-6xl opacity-20">🏷️</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chart Section */}
          <Card className="border-0 shadow-sm rounded-3xl mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm text-[#6B5D56] mb-1">Order Stats</p>
                  <p className="text-3xl font-bold text-[#5C3D2E] mb-2">{totalOrders * 15}k</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-semibold">15%</span>
                    <span className="text-[#6B5D56]">(This week)</span>
                  </div>
                </div>
                <button className="text-[#6B5D56]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="h-64 flex items-end justify-between gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-[#C4714A] to-[#D4A574] rounded-t-lg"
                         style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                    <p className="text-xs text-[#6B5D56]">{day}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Popular Products */}
            <Card className="border-0 shadow-sm rounded-3xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#5C3D2E]">Popular Products</h3>
                  <button className="text-[#C4714A] text-sm font-medium flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {popularProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between pb-4 border-b border-[#E8E4DF] last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#FAF7F2] rounded-xl"></div>
                        <div>
                          <p className="font-medium text-[#5C3D2E]">{product.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{product.breed}</Badge>
                            <Badge className={product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {product.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#6B5D56] flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {product.views}
                        </p>
                        <p className="text-sm font-semibold text-[#5C3D2E]">{product.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest Reviews */}
            <Card className="border-0 shadow-sm rounded-3xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#5C3D2E]">Latest Reviews</h3>
                  <button className="text-[#C4714A] text-sm font-medium flex items-center gap-1">
                    View details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-[#E8E4DF] last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#FAF7F2] rounded-full flex items-center justify-center text-xl">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-[#5C3D2E] text-sm">{review.user}</p>
                            <span className="text-xs text-[#6B5D56]">{review.time}</span>
                          </div>
                          <p className="text-sm text-[#6B5D56] mb-2">
                            on <span className="text-[#C4714A] underline">{review.product}</span>
                          </p>
                          <p className="text-sm text-[#2D2520]">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
    </div>
  );
}
