import { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from './Button';
import bcrypt from 'bcryptjs';

interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

interface UserFormData {
  username: string;
  password: string;
  full_name: string;
  is_active: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    password: '',
    full_name: '',
    is_active: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const passwordHash = await bcrypt.hash(formData.password, 10);

      if (editingUser) {
        const updateData: any = {
          full_name: formData.full_name,
          is_active: formData.is_active,
        };

        if (formData.password) {
          updateData.password_hash = passwordHash;
        }

        const { error } = await supabase
          .from('admin_users')
          .update(updateData)
          .eq('id', editingUser.id);

        if (error) throw error;
        setSuccess('User updated successfully');
      } else {
        const { error } = await supabase
          .from('admin_users')
          .insert([{
            username: formData.username,
            password_hash: passwordHash,
            full_name: formData.full_name,
            is_active: formData.is_active,
          }]);

        if (error) throw error;
        setSuccess('User created successfully');
      }

      resetForm();
      loadUsers();
    } catch (err: any) {
      console.error('Error saving user:', err);
      setError(err.message || 'Failed to save user');
    }
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '',
      full_name: user.full_name,
      is_active: user.is_active,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      full_name: '',
      is_active: true,
    });
    setEditingUser(null);
    setShowForm(false);
    setShowPassword(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-600">{users.length} admin users</p>
          </div>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {showForm && (
        <div className="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingUser ? 'Edit User' : 'Create New User'}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username {!editingUser && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required={!editingUser}
                  disabled={!!editingUser}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password {!editingUser && <span className="text-red-500">*</span>}
                {editingUser && <span className="text-gray-500 text-xs ml-2">(Leave blank to keep current)</span>}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active Account
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Username</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Full Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Login</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Created</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.username}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.full_name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {user.last_login_at
                    ? new Date(user.last_login_at).toLocaleDateString()
                    : 'Never'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleEdit(user)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
