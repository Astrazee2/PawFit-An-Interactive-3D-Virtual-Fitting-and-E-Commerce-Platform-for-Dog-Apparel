import { Outlet } from 'react-router';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer className="bg-[#5C3D2E] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
                <span className="mr-2">🐾</span>
                PawFit
              </h3>
              <p className="text-sm italic mb-2 text-[#D4C8BD]">Dress your dog. Get the fit right.</p>
              <p className="text-[#D4C8BD] text-sm">Interactive 3D virtual fitting for dog apparel</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#4A3024] mt-8 pt-8 text-center text-[#D4C8BD] text-sm">
            <p>&copy; 2026 PawFit. Mapúa University IT Thesis Project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
