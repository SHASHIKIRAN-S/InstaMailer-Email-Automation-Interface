import React, { useState } from 'react';
import { Search, Mail, Clock, CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';
import type { EmailDraft } from '../types';

interface EmailHistoryProps {
  emails: EmailDraft[];
  onDeleteEmail: (id: number) => void;
  onViewEmail: (email: EmailDraft) => void;
}

const EmailHistory: React.FC<EmailHistoryProps> = ({ emails, onDeleteEmail, onViewEmail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [toneFilter, setToneFilter] = useState<string>('all');

  const filteredEmails = emails.filter((email) => {
    const matchesSearch = 
      email.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter;
    const matchesTone = toneFilter === 'all' || email.tone === toneFilter;
    
    return matchesSearch && matchesStatus && matchesTone;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-rose-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="p-8 border-b border-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <span>Email History</span>
              </h2>
              <div className="text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-xl">
                {filteredEmails.length} of {emails.length} emails
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="flex gap-3">
                <label htmlFor="status-filter">Status</label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  title="Status filter"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="failed">Failed</option>
                </select>
                
                <select
                  value={toneFilter}
                  onChange={(e) => setToneFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  title="Tone filter"
                >
                  <option value="all">All Tones</option>
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="apologetic">Apologetic</option>
                  <option value="persuasive">Persuasive</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className="divide-y divide-slate-200/50">
            {filteredEmails.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <div className="p-6 bg-gradient-to-br from-slate-100 to-purple-100 rounded-3xl inline-block mb-4">
                  <Mail className="w-16 h-16 mx-auto text-slate-400" />
                </div>
                <p className="text-lg">No emails found matching your criteria.</p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className="p-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-cyan-50/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-4 mb-3">
                        {getStatusIcon(email.status)}
                        <span className="font-bold text-slate-900 text-lg">{email.recipient}</span>
                        <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(email.status)}`}>
                          {email.status}
                        </span>
                        <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getToneColor(email.tone)}`}>
                          {email.tone}
                        </span>
                        {email.type === 'meeting' && (
                          <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
                            Meeting
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-600 mb-3 line-clamp-2 text-lg leading-relaxed">{email.prompt}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Created: {new Date(email.created_at).toLocaleDateString()}</span>
                        </span>
                        {email.sent_at && (
                          <span className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Sent: {new Date(email.sent_at).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-6">
                      <button
                        onClick={() => onViewEmail(email)}
                        className="p-3 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-2xl transition-all duration-300 hover:scale-110"
                        title="View email"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteEmail(email.id)}
                        className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-300 hover:scale-110"
                        title="Delete email"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailHistory;