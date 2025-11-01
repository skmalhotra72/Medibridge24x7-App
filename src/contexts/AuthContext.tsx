import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: users, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .maybeSingle();

      if (fetchError) {
        console.error('Database error:', fetchError);
        return { success: false, error: 'Database error occurred' };
      }

      if (!users) {
        return { success: false, error: 'Invalid username or password' };
      }

      const isPasswordValid = await verifyPassword(password, users.password_hash);

      if (!isPasswordValid) {
        return { success: false, error: 'Invalid username or password' };
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', users.id);

      if (updateError) {
        console.error('Failed to update last login:', updateError);
      }

      const adminUser: AdminUser = {
        id: users.id,
        username: users.username,
        full_name: users.full_name,
        is_active: users.is_active,
        created_at: users.created_at,
        last_login_at: new Date().toISOString(),
      };

      setUser(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (hash.startsWith('$2') && hash.length === 60) {
    return await bcryptVerify(password, hash);
  }

  return password === hash;
}

async function bcryptVerify(password: string, hash: string): Promise<boolean> {
  try {
    const bcrypt = await import('bcryptjs');
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Bcrypt verification failed:', error);
    return false;
  }
}
