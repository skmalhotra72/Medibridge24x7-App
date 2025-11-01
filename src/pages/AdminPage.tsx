import { useEffect, useState } from 'react';
import { FileText, Phone, User, Calendar, ExternalLink, RefreshCw, Eye, LogOut, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import UserManagement from '../components/UserManagement';

interface Submission {
  id: string;
  patient_name: string;
  gender: string;
  age: number;
  phone_number: string;
  referring_doctor: string | null;
  primary_question: string;
  upload_method: string;
  file_url: string | null;
  file_type: string | null;
  file_name: string | null;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [activeTab, setActiveTab] = useState<'submissions' | 'users'>('submissions');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('prescription_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pt-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.full_name}</p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'submissions' && (
              <Button variant="outline" onClick={fetchSubmissions} className="gap-2">
                <RefreshCw className="w-5 h-5" />
                Refresh
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'submissions'
                ? 'text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Submissions
            </div>
            {activeTab === 'submissions' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'users'
                ? 'text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCog className="w-5 h-5" />
              User Management
            </div>
            {activeTab === 'users' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
            )}
          </button>
        </div>

        {activeTab === 'users' ? (
          <UserManagement />
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-primary">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Patient Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Age/Gender</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Doctor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Method</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-primary-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                          No submissions found
                        </td>
                      </tr>
                    ) : (
                      submissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{formatDate(submission.created_at)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-900">{submission.patient_name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {submission.age} / {submission.gender}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{submission.phone_number}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {submission.referring_doctor || '-'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                              {submission.upload_method}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                              {submission.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedSubmission(submission)}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {submission.file_url && (
                                <a
                                  href={submission.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                                  title="View file"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="px-4 py-2 bg-gray-100 rounded-xl">
                    <p className="text-sm text-gray-600">Total Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
                  </div>
                  <div className="px-4 py-2 bg-yellow-100 rounded-xl">
                    <p className="text-sm text-yellow-700">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {submissions.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded-xl">
                    <p className="text-sm text-green-700">Completed</p>
                    <p className="text-2xl font-bold text-green-900">
                      {submissions.filter(s => s.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Patient Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSubmission.patient_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Age / Gender</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedSubmission.age} / {selectedSubmission.gender}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSubmission.phone_number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Referring Doctor</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedSubmission.referring_doctor || 'Not specified'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Upload Method</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedSubmission.upload_method}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSubmission.status)}`}>
                    {selectedSubmission.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Primary Question</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-900">{selectedSubmission.primary_question}</p>
                </div>
              </div>

              {selectedSubmission.file_url && (
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Prescription File</label>
                  <div className="bg-gradient-accent rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-accent-700" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedSubmission.file_name}</p>
                        <p className="text-sm text-gray-600">{selectedSubmission.file_type}</p>
                      </div>
                    </div>
                    <a
                      href={selectedSubmission.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white rounded-xl text-accent-700 hover:bg-accent-50 transition-colors font-medium flex items-center space-x-2"
                    >
                      <span>View File</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Submitted At</label>
                <p className="text-gray-900">{formatDate(selectedSubmission.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
