import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, PetProfile } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePetProfiles: (profiles: PetProfile[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('pawfit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@pawfit.com' && password === 'admin') {
      const adminUser: User = {
        id: 'admin1',
        name: 'Admin',
        email: 'admin@pawfit.com',
        role: 'admin',
        petProfiles: [],
      };
      setUser(adminUser);
      localStorage.setItem('pawfit_user', JSON.stringify(adminUser));
      return true;
    }

    const users = JSON.parse(localStorage.getItem('pawfit_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.id === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('pawfit_user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('pawfit_users') || '[]');

    if (users.some((u: User) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: password,
      name,
      email,
      role: 'user',
      petProfiles: [],
    };

    users.push(newUser);
    localStorage.setItem('pawfit_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('pawfit_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pawfit_user');
  };

  const updatePetProfiles = (profiles: PetProfile[]) => {
    if (user) {
      const updatedUser = { ...user, petProfiles: profiles };
      setUser(updatedUser);
      localStorage.setItem('pawfit_user', JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem('pawfit_users') || '[]');
      const updatedUsers = users.map((u: User) => u.id === user.id ? updatedUser : u);
      localStorage.setItem('pawfit_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updatePetProfiles,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
