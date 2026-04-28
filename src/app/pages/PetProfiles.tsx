import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { PetProfile, Breed, Measurements } from '../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breeds: Breed[] = ['Labrador Retriever', 'Shih Tzu', 'Dachshund', 'Pomeranian', 'Aspin/Mixed'];

export function PetProfiles() {
  const { user, updatePetProfiles } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);
  const [formData, setFormData] = useState<{ name: string; breed: Breed; measurements: Measurements }>({
    name: '',
    breed: 'Labrador Retriever',
    measurements: { backLength: 0, neckGirth: 0, chestGirth: 0 },
  });

  const handleOpenDialog = (pet?: PetProfile) => {
    if (pet) {
      setEditingPet(pet);
      setFormData({ name: pet.name, breed: pet.breed, measurements: pet.measurements });
    } else {
      setEditingPet(null);
      setFormData({ name: '', breed: 'Labrador Retriever', measurements: { backLength: 0, neckGirth: 0, chestGirth: 0 } });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!user) return;

    if (!formData.name || !formData.measurements.backLength || !formData.measurements.neckGirth || !formData.measurements.chestGirth) {
      toast.error('Please fill in all fields');
      return;
    }

    let updatedProfiles: PetProfile[];

    if (editingPet) {
      updatedProfiles = user.petProfiles.map(p =>
        p.id === editingPet.id ? { ...editingPet, ...formData } : p
      );
      toast.success('Pet profile updated!');
    } else {
      const newPet: PetProfile = {
        id: Date.now().toString(),
        ...formData,
      };
      updatedProfiles = [...user.petProfiles, newPet];
      toast.success('Pet profile created!');
    }

    updatePetProfiles(updatedProfiles);
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    const updatedProfiles = user.petProfiles.filter(p => p.id !== id);
    updatePetProfiles(updatedProfiles);
    toast.success('Pet profile deleted');
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please login to manage pet profiles</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
          <span className="mr-3">🐾</span>
          My Pets
        </h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Pet
        </Button>
      </div>

      {user.petProfiles.length === 0 ? (
        <Card className="border-[#E8E4DF]">
          <CardContent className="py-16 text-center">
            <div className="text-8xl mb-4">🐕</div>
            <p className="text-[#6B5D56] mb-4">No pet profiles yet</p>
            <Button onClick={() => handleOpenDialog()}>Add Your First Pet</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.petProfiles.map(pet => (
            <Card key={pet.id} className="border-[#E8E4DF] rounded-2xl hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{pet.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenDialog(pet)} className="text-gray-600 hover:text-teal-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(pet.id)} className="text-gray-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Breed:</span>
                    <span className="font-medium">{pet.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Back Length:</span>
                    <span className="font-medium">{pet.measurements.backLength} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Neck Girth:</span>
                    <span className="font-medium">{pet.measurements.neckGirth} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chest Girth:</span>
                    <span className="font-medium">{pet.measurements.chestGirth} cm</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPet ? 'Edit Pet Profile' : 'Add New Pet'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="petName">Pet Name</Label>
              <Input
                id="petName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Buddy"
              />
            </div>

            <div>
              <Label htmlFor="breed">Breed</Label>
              <select
                id="breed"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value as Breed })}
                className="w-full p-2 border rounded-md"
              >
                {breeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="backLength">Back Length (cm)</Label>
              <Input
                id="backLength"
                type="number"
                value={formData.measurements.backLength || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  measurements: { ...formData.measurements, backLength: Number(e.target.value) }
                })}
              />
            </div>

            <div>
              <Label htmlFor="neckGirth">Neck Girth (cm)</Label>
              <Input
                id="neckGirth"
                type="number"
                value={formData.measurements.neckGirth || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  measurements: { ...formData.measurements, neckGirth: Number(e.target.value) }
                })}
              />
            </div>

            <div>
              <Label htmlFor="chestGirth">Chest Girth (cm)</Label>
              <Input
                id="chestGirth"
                type="number"
                value={formData.measurements.chestGirth || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  measurements: { ...formData.measurements, chestGirth: Number(e.target.value) }
                })}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              {editingPet ? 'Update Profile' : 'Save Profile'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
