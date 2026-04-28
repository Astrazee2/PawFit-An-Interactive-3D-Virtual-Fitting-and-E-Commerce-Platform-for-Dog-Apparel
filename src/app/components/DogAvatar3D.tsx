import { Breed } from '../types';

interface DogAvatar3DProps {
  breed: Breed;
  apparelColor?: string;
}

export function DogAvatar3D({ breed, apparelColor = '#3B82F6' }: DogAvatar3DProps) {
  const breedImages: Record<Breed, string> = {
    'Labrador Retriever': '🦮',
    'Shih Tzu': '🐕',
    'Dachshund': '🌭',
    'Pomeranian': '🐶',
    'Aspin/Mixed': '🐕‍🦺',
  };

  const breedSizes: Record<Breed, string> = {
    'Labrador Retriever': 'Large',
    'Shih Tzu': 'Small',
    'Dachshund': 'Medium',
    'Pomeranian': 'Small',
    'Aspin/Mixed': 'Medium',
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FAF7F2] via-[#F5EFE7] to-[#F0E8DD] rounded-2xl relative overflow-hidden shadow-inner">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-5">
        {[...Array(64)].map((_, i) => (
          <div key={i} className="border border-[#5C3D2E]"></div>
        ))}
      </div>

      <div className="absolute top-4 right-4 text-6xl opacity-10 rotate-12">🐾</div>
      <div className="absolute bottom-4 left-4 text-6xl opacity-10 -rotate-12">🐾</div>

      <div className="relative z-10 text-center">
        <div className="text-9xl mb-4 drop-shadow-lg" style={{
          filter: 'drop-shadow(0 4px 6px rgba(92, 61, 46, 0.1))'
        }}>
          {breedImages[breed]}
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-[#E8E4DF]">
          <p className="font-semibold text-lg text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>{breed}</p>
          <p className="text-sm text-[#6B5D56]">{breedSizes[breed]} Dog</p>
          <div className="mt-3 flex items-center justify-center gap-2 bg-[#F5EFE7] rounded-lg px-3 py-1.5">
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: apparelColor }}></div>
            <span className="text-xs text-[#6B5D56] font-medium">Apparel Preview</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-[#6B5D56] bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-sm border border-[#E8E4DF]">
          <span className="mr-1">✨</span>
          3D Preview Mode
        </div>
      </div>
    </div>
  );
}
