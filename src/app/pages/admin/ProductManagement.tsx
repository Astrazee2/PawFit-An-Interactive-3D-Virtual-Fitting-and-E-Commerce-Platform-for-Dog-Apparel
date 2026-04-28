import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { mockProducts } from '../../data/mockData';
import { Product, ApparelType, Breed, Size } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProductManagement() {
  const [products] = useState<Product[]>(mockProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const apparelTypes: ApparelType[] = ['Shirt', 'Coat', 'Sweater', 'Hoodie'];
  const breeds: Breed[] = ['Labrador Retriever', 'Shih Tzu', 'Dachshund', 'Pomeranian', 'Aspin/Mixed'];
  const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

  const handleOpenDialog = (product?: Product) => {
    setEditingProduct(product || null);
    setDialogOpen(true);
  };

  const handleSave = () => {
    toast.success(editingProduct ? 'Product updated!' : 'Product created!');
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    toast.success('Product deleted');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          <span className="mr-3">📦</span>
          Product Management
        </h1>
        <button
          onClick={() => handleOpenDialog()}
          className="flex items-center gap-2 px-4 py-2 bg-[#5C3D2E] hover:bg-[#4A3024] text-white rounded-xl font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sizes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{product.apparelType}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.sizesAvailable.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenDialog(product)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" placeholder="Classic Cotton Tee" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Comfortable cotton t-shirt..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="24.99" />
              </div>

              <div>
                <Label htmlFor="apparelType">Apparel Type</Label>
                <select id="apparelType" className="w-full p-2 border rounded-md">
                  {apparelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>Breed Compatibility</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {breeds.map(breed => (
                  <label key={breed} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{breed}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Size Availability</Label>
              <div className="flex gap-2 mt-2">
                {sizes.map(size => (
                  <label key={size} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="glbAsset">3D GLB Asset Link</Label>
              <Input id="glbAsset" placeholder="/assets/model.glb" />
            </div>

            <button onClick={handleSave} className="w-full px-4 py-2 bg-[#5C3D2E] hover:bg-[#4A3024] text-white rounded-xl font-medium transition-colors">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
