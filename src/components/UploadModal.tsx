import { useState, useRef } from 'react';
import { X, Upload, FileText, Camera, Mic, CheckCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../lib/supabase';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  patientName: string;
  gender: string;
  age: string;
  phoneNumber: string;
  referringDoctor: string;
  primaryQuestion: string;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    referringDoctor: '',
    primaryQuestion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const voiceInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setUploadedFile(null);
    setFilePreview(null);
    setFormData({
      patientName: '',
      gender: '',
      age: '',
      phoneNumber: '',
      referringDoctor: '',
      primaryQuestion: '',
    });
    setIsSubmitting(false);
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert('Please upload a file first.');
      return;
    }

    setIsSubmitting(true);

    try {
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `prescriptions/${fileName}`;

      console.log('Uploading file:', fileName, 'Type:', uploadedFile.type, 'Size:', uploadedFile.size);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(filePath, uploadedFile, {
          contentType: uploadedFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        alert(`Error uploading file: ${uploadError.message}. Please try again.`);
        setIsSubmitting(false);
        return;
      }

      console.log('File uploaded successfully:', uploadData);

      const { data: { publicUrl } } = supabase.storage
        .from('prescriptions')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      const uploadMethod = uploadedFile.type.startsWith('audio/') ? 'voice' :
                          uploadedFile.type.startsWith('image/') ? 'camera' : 'file';

      const submissionData = {
        patient_name: formData.patientName,
        gender: formData.gender,
        age: parseInt(formData.age),
        phone_number: formData.phoneNumber,
        referring_doctor: formData.referringDoctor || null,
        primary_question: formData.primaryQuestion,
        upload_method: uploadMethod,
        file_url: publicUrl,
        file_type: uploadedFile.type,
        file_name: uploadedFile.name,
        status: 'pending',
      };

      console.log('Submitting to database:', submissionData);

      const { data: insertData, error: dbError } = await supabase
        .from('prescription_submissions')
        .insert([submissionData])
        .select();

      if (dbError) {
        console.error('Error submitting form:', dbError);
        alert(`Database error: ${dbError.message}. Please try again.`);
        setIsSubmitting(false);
        return;
      }

      console.log('Submission successful:', insertData);

      setShowSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-12 text-center">
          <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-accent-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Submission Successful!</h3>
          <p className="text-gray-700 mb-4">
            Thank you, {formData.patientName}! We've received your prescription and information.
          </p>
          <p className="text-gray-600">
            Our team will contact you shortly at {formData.phoneNumber} to guide you through the next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-2 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Upload Prescription</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-3 overflow-y-auto flex-1">
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-1.5">
              <div>
                <label htmlFor="patientName" className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 text-[11px] border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 text-[11px] border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="age" className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-2 py-1 text-[11px] border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <div>
                <label htmlFor="phoneNumber" className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                  Phone No <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 text-[11px] border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+91 98765"
                />
              </div>

              <div>
                <label htmlFor="referringDoctor" className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                  Referring Doctor
                </label>
                <input
                  type="text"
                  id="referringDoctor"
                  name="referringDoctor"
                  value={formData.referringDoctor}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-[11px] border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label htmlFor="primaryQuestion" className="block text-[10px] font-semibold text-gray-700 mb-0.5">
                  Primary Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="primaryQuestion"
                  name="primaryQuestion"
                  value={formData.primaryQuestion}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 text-[11px] border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Help needed?"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
              <p className="text-[10px] font-semibold text-gray-700 mb-1.5">
                Upload Prescription <span className="text-red-500">*</span>
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={voiceInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile && (
                <div className="mb-1.5 bg-accent-50 rounded p-1.5 border border-accent-200">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-accent-600 flex-shrink-0" />
                    <p className="text-[9px] font-semibold text-gray-900 truncate">{uploadedFile.name}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group p-1.5 border border-gray-300 rounded hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-primary-600 rounded flex items-center justify-center mx-auto mb-0.5">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-[9px]">Upload</h3>
                  <p className="text-[8px] text-gray-600">PDF/Photo</p>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="group p-1.5 border border-gray-300 rounded hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-accent-400 to-accent-600 rounded flex items-center justify-center mx-auto mb-0.5">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-[9px]">Camera</h3>
                  <p className="text-[8px] text-gray-600">Photo</p>
                </button>

                <button
                  type="button"
                  onClick={() => voiceInputRef.current?.click()}
                  className="group p-1.5 border border-gray-300 rounded hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded flex items-center justify-center mx-auto mb-0.5">
                    <Mic className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-[9px]">Voice</h3>
                  <p className="text-[8px] text-gray-600">Audio</p>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-1.5 shadow-lg hover:shadow-xl transition-all text-[11px] font-semibold mt-2"
              disabled={isSubmitting || !uploadedFile}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
              ) : (
                'Submit Prescription'
              )}
            </Button>

            <p className="text-[8px] text-gray-600 text-center mt-1">
              <span className="font-semibold">Privacy:</span> Data encrypted & secure
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
