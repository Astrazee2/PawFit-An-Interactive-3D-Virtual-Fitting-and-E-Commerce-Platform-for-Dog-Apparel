import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { DogAvatar3D } from '../components/DogAvatar3D';
import { Breed, Measurements, Size, SizeRecommendation, FitConfidence } from '../types';
import { breedSizeGuide, mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { RotateCcw, ZoomIn, ZoomOut, Check, AlertTriangle, Ruler as RulerIcon } from 'lucide-react';

const breeds: Breed[] = ['Labrador Retriever', 'Shih Tzu', 'Dachshund', 'Pomeranian', 'Aspin/Mixed'];

export function VirtualFitting() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [selectedBreed, setSelectedBreed] = useState<Breed>('Labrador Retriever');
  const [measurements, setMeasurements] = useState<Measurements>({
    backLength: 0,
    neckGirth: 0,
    chestGirth: 0,
  });
  const [recommendation, setRecommendation] = useState<SizeRecommendation | null>(null);
  const [viewAngle, setViewAngle] = useState<'front' | 'side' | 'back' | 'top'>('front');

  const productId = searchParams.get('product');
  const selectedProduct = productId ? mockProducts.find(p => p.id === productId) : null;

  useEffect(() => {
    if (user && user.petProfiles.length > 0) {
      const firstPet = user.petProfiles[0];
      setSelectedBreed(firstPet.breed);
      setMeasurements(firstPet.measurements);
    }
  }, [user]);

  const calculateSizeRecommendation = (): SizeRecommendation | null => {
    if (!measurements.backLength || !measurements.neckGirth || !measurements.chestGirth) {
      return null;
    }

    const guide = breedSizeGuide[selectedBreed];
    const { backLength, neckGirth, chestGirth } = measurements;

    if (backLength > guide.maxBackLength || neckGirth > guide.maxNeckGirth || chestGirth > guide.maxChestGirth) {
      return { size: 'XL', confidence: 'custom' };
    }

    if (backLength < guide.minBackLength || neckGirth < guide.minNeckGirth || chestGirth < guide.minChestGirth) {
      return { size: 'XS', confidence: 'custom' };
    }

    const backLengthRange = guide.maxBackLength - guide.minBackLength;
    const backLengthPct = (backLength - guide.minBackLength) / backLengthRange;

    const chestGirthRange = guide.maxChestGirth - guide.minChestGirth;
    const chestGirthPct = (chestGirth - guide.minChestGirth) / chestGirthRange;

    const avgPct = (backLengthPct + chestGirthPct) / 2;

    let size: Size;
    if (avgPct < 0.2) size = 'XS';
    else if (avgPct < 0.4) size = 'S';
    else if (avgPct < 0.6) size = 'M';
    else if (avgPct < 0.8) size = 'L';
    else size = 'XL';

    const sizeThreshold = 0.05;
    const nearBoundary = (avgPct % 0.2) < sizeThreshold || (avgPct % 0.2) > (0.2 - sizeThreshold);
    const confidence: FitConfidence = nearBoundary ? 'check' : 'good';

    return { size, confidence };
  };

  const handleGetRecommendation = () => {
    const result = calculateSizeRecommendation();
    setRecommendation(result);
  };

  const handleAddToCart = () => {
    if (!recommendation || !selectedProduct) {
      toast.error('Please get a size recommendation first');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    addToCart(selectedProduct, recommendation.size);
    toast.success('Added to cart!');
  };

  const getConfidenceBadge = (confidence: FitConfidence) => {
    switch (confidence) {
      case 'good':
        return (
          <Badge className="bg-[#7A9D7A] hover:bg-[#6A8D6A] text-white">
            <span className="mr-1">🐾</span>
            <Check className="w-4 h-4 mr-1" />
            Good Fit
          </Badge>
        );
      case 'check':
        return (
          <Badge className="bg-[#D4A574] hover:bg-[#C49564] text-white">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Check Fit
          </Badge>
        );
      case 'custom':
        return (
          <Badge className="bg-[#B85C5C] hover:bg-[#A84C4C] text-white">
            <RulerIcon className="w-4 h-4 mr-1" />
            Custom Fit Recommended
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>
        <span className="mr-3">🐕</span>
        3D Virtual Fitting
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>3D Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <DogAvatar3D breed={selectedBreed} />
              </div>

              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset View
                </Button>
                <Button size="sm" variant="outline">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {(['front', 'side', 'back', 'top'] as const).map(angle => (
                  <Button
                    key={angle}
                    size="sm"
                    variant={viewAngle === angle ? 'default' : 'outline'}
                    onClick={() => setViewAngle(angle)}
                    className={viewAngle === angle ? 'bg-[#5C3D2E]' : 'border-[#5C3D2E] text-[#5C3D2E]'}
                  >
                    {angle.charAt(0).toUpperCase() + angle.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Select Breed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {breeds.map(breed => (
                  <button
                    key={breed}
                    onClick={() => setSelectedBreed(breed)}
                    className={`p-3 border-2 rounded-lg text-sm transition-colors ${
                      selectedBreed === breed
                        ? 'border-teal-600 bg-teal-50 text-teal-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {breed}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Enter Measurements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="backLength">Back Length (cm)</Label>
                <p className="text-xs text-gray-500 mb-1">Base of neck to base of tail</p>
                <Input
                  id="backLength"
                  type="number"
                  placeholder="0"
                  value={measurements.backLength || ''}
                  onChange={(e) => setMeasurements({ ...measurements, backLength: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="neckGirth">Neck Girth (cm)</Label>
                <p className="text-xs text-gray-500 mb-1">Circumference around base of neck</p>
                <Input
                  id="neckGirth"
                  type="number"
                  placeholder="0"
                  value={measurements.neckGirth || ''}
                  onChange={(e) => setMeasurements({ ...measurements, neckGirth: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="chestGirth">Chest Girth (cm)</Label>
                <p className="text-xs text-gray-500 mb-1">Circumference around widest part of chest</p>
                <Input
                  id="chestGirth"
                  type="number"
                  placeholder="0"
                  value={measurements.chestGirth || ''}
                  onChange={(e) => setMeasurements({ ...measurements, chestGirth: Number(e.target.value) })}
                />
              </div>

              <Button className="w-full" onClick={handleGetRecommendation}>
                Get Size Recommendation
              </Button>
            </CardContent>
          </Card>

          {recommendation && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Size Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Recommended Size</p>
                  <div className="text-4xl font-bold text-[#5C3D2E] mb-3">
                    {recommendation.size}
                  </div>
                  <div className="flex justify-center">
                    {getConfidenceBadge(recommendation.confidence)}
                  </div>
                </div>

                {recommendation.confidence === 'check' && (
                  <p className="text-sm text-[#8B6F47] bg-[#F5EFE7] p-3 rounded-lg border border-[#D4A574]">
                    Your measurements are close to a size boundary. Consider trying both this size and an adjacent one.
                  </p>
                )}

                {recommendation.confidence === 'custom' && (
                  <p className="text-sm text-[#8B4A4A] bg-[#F5E8E8] p-3 rounded-lg border border-[#B85C5C]">
                    Your measurements exceed the standard range. We recommend custom sizing for the best fit.
                  </p>
                )}

                {selectedProduct ? (
                  <Button className="w-full" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => navigate('/products')}>
                    Browse Products
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
