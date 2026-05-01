import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, PetProfile } from '../types';
import { authAPI } from '../services/api'

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
  const data = await authAPI.login(email, password)
  if (data.token) {
    setUser(data.user)
    localStorage.setItem('pawfit_user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    return true
  }
  return false
}

const register = async (name: string, email: string, password: string): Promise<boolean> => {
  const data = await authAPI.register(name, email, password)
  if (data.token) {
    setUser(data.user)
    localStorage.setItem('pawfit_user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    return true
  }
  return false
}

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
