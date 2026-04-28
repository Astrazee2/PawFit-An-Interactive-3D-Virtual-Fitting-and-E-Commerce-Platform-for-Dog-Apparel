import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Plus, Upload } from 'lucide-react';
import { Breed } from '../../types';
import { toast } from 'sonner';

interface Asset {
  id: string;
  name: string;
  type: 'avatar' | 'apparel';
  breed?: Breed;
  fileSize: string;
  uploadDate: string;
}

export function AssetManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Labrador Avatar',
      type: 'avatar',
      breed: 'Labrador Retriever',
      fileSize: '2.3 MB',
      uploadDate: '2026-04-15',
    },
    {
      id: '2',
      name: 'Shih Tzu Avatar',
      type: 'avatar',
      breed: 'Shih Tzu',
      fileSize: '1.8 MB',
      uploadDate: '2026-04-15',
    },
    {
      id: '3',
      name: 'Cotton Tee Model',
      type: 'apparel',
      fileSize: '1.2 MB',
      uploadDate: '2026-04-16',
    },
    {
      id: '4',
      name: 'Winter Coat Model',
      type: 'apparel',
      fileSize: '1.5 MB',
      uploadDate: '2026-04-16',
    },
  ]);

  const handleUpload = () => {
    toast.success('Asset uploaded successfully!');
    setDialogOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          <span className="mr-3">🎨</span>
          3D Asset Management
        </h1>
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5C3D2E] hover:bg-[#4A3024] text-white rounded-xl font-medium"
        >
          <Plus className="w-4 h-4" />
          Upload New Asset
        </button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Associated Breed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{asset.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={asset.type === 'avatar' ? 'default' : 'secondary'}>
                        {asset.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {asset.breed || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(asset.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New 3D Asset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assetName">Asset Name</Label>
              <Input id="assetName" placeholder="Labrador Avatar" />
            </div>

            <div>
              <Label htmlFor="assetType">Asset Type</Label>
              <select id="assetType" className="w-full p-2 border rounded-md">
                <option value="avatar">Avatar</option>
                <option value="apparel">Apparel</option>
              </select>
            </div>

            <div>
              <Label htmlFor="breed">Associated Breed (for avatars)</Label>
              <select id="breed" className="w-full p-2 border rounded-md">
                <option value="">None</option>
                <option value="Labrador Retriever">Labrador Retriever</option>
                <option value="Shih Tzu">Shih Tzu</option>
                <option value="Dachshund">Dachshund</option>
                <option value="Pomeranian">Pomeranian</option>
                <option value="Aspin/Mixed">Aspin/Mixed</option>
              </select>
            </div>

            <div>
              <Label htmlFor="file">GLB/glTF File</Label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-50">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-600">Click to upload GLB/glTF file</span>
                  <input id="file" type="file" className="hidden" accept=".glb,.gltf" />
                </label>
              </div>
            </div>

            <button onClick={handleUpload} className="w-full px-4 py-2 bg-[#5C3D2E] hover:bg-[#4A3024] text-white rounded-xl font-medium">
              Upload Asset
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
