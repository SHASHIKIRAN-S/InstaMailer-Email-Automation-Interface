import React from 'react';
import { X, Mail, Clock, User, Tag } from 'lucide-react';
import type { EmailDraft } from '../types';

interface EmailModalProps {
  email: EmailDraft;
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ email, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200';
      case 'failed':
        return 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border border-rose-200';
      default:
        return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200';
    }
  };

  const getToneColor = (tone: string) => {
    const toneColors: Record<string, string> = {
      formal: 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-200',
      casual: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200',
      friendly: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200',
      apologetic: 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border border-rose-200',
      persuasive: 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 border border-violet-200',
      urgent: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200',
    };
    return toneColors[tone] || 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-200/50 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Email Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl border border-slate-200">
              <User className="w-5 h-5 text-slate-500" />
              <div>
                <span className="text-sm text-slate-600 font-semibold">Recipient:</span>
                <p className="font-bold text-slate-900">{email.recipient}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl border border-slate-200">
              <Clock className="w-5 h-5 text-slate-500" />
              <div>
                <span className="text-sm text-slate-600 font-semibold">Created:</span>
                <p className="font-bold text-slate-900">
                  {new Date(email.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl border border-slate-200">
              <Tag className="w-5 h-5 text-slate-500" />
              <div>
                <span className="text-sm text-slate-600 font-semibold">Status:</span>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold ml-2 ${getStatusColor(email.status)}`}>
                  {email.status}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-sm text-slate-600 font-semibold">Tone:</span>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold ml-2 ${getToneColor(email.tone)}`}>
                  {email.tone}
                </span>
              </div>
            </div>
          </div>

          {email.sent_at && (
            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl">
              <p className="text-sm text-emerald-700 font-semibold">
                <strong>Sent:</strong> {new Date(email.sent_at).toLocaleString()}
              </p>
            </div>
          )}

          {/* Original Prompt */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Original Prompt</h3>
            <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-6 border-2 border-slate-200">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{email.prompt}</p>
            </div>
          </div>

          {/* Generated Content */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Generated Email</h3>
            <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-6 border-2 border-slate-200">
              <pre className="whitespace-pre-wrap text-slate-700 font-mono text-sm leading-relaxed">
                {email.content}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;