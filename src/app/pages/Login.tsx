import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      const user = JSON.parse(localStorage.getItem('pawfit_user') || '{}');
      toast.success('Login successful!');

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast.error('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-[#E8E4DF] rounded-2xl shadow-lg">
        <CardHeader>
          <div className="text-center mb-2">
            <span className="text-5xl">🐾</span>
          </div>
          <CardTitle className="text-center text-[#5C3D2E]" style={{ fontFamily: "'DM Serif Display', serif" }}>Welcome Back</CardTitle>
          <CardDescription className="text-center text-[#6B5D56]">Login to your PawFit account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#5C3D2E] hover:bg-[#4A3024] rounded-xl" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center text-sm">
              <p className="text-[#6B5D56]">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#C4714A] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/')}
                className="mt-2"
              >
                Continue as Guest
              </Button>
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="text-xs text-gray-500 mb-2">Demo accounts:</p>
              <p className="text-xs text-gray-600">Admin: admin@pawfit.com / admin</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
