import React, { useState } from 'react';
import { Save, Mail, Bell, Shield, User, Database } from 'lucide-react';
import type { Settings } from '../types';

interface SettingsProps {
  settings: Settings;
  onSaveSettings: (settings: Settings) => void;
}

const SettingsComponent: React.FC<SettingsProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<Settings>(settings);
  const [activeTab, setActiveTab] = useState('smtp');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSettings(formData);
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'smtp', label: 'SMTP Configuration', icon: Mail, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'preferences', label: 'Preferences', icon: User, gradient: 'from-violet-500 to-purple-600' },
    { id: 'notifications', label: 'Notifications', icon: Bell, gradient: 'from-amber-500 to-orange-600' },
    { id: 'security', label: 'Security', icon: Shield, gradient: 'from-rose-500 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
          <div className="p-8 border-b border-slate-200/50">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center space-x-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                <Database className="w-8 h-8 text-white" />
              </div>
              <span>Settings</span>
            </h2>
            <p className="text-slate-600 text-lg">Configure your email automation preferences</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-200/50">
            <nav className="flex space-x-2 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-6 border-b-3 font-semibold text-sm flex items-center space-x-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? `border-violet-500 text-violet-600 bg-gradient-to-t from-violet-50 to-transparent`
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* SMTP Configuration */}
            {activeTab === 'smtp' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-800">SMTP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      value={formData.smtp_host}
                      onChange={(e) => setFormData({ ...formData, smtp_host: e.target.value })}
                      placeholder="smtp.gmail.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      SMTP Port
                    </label>
                    <input
                      type="number"
                      value={formData.smtp_port}
                      onChange={(e) => setFormData({ ...formData, smtp_port: parseInt(e.target.value) })}
                      placeholder="587"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.smtp_username}
                      onChange={(e) => setFormData({ ...formData, smtp_username: e.target.value })}
                      placeholder="your-email@gmail.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.smtp_password}
                      onChange={(e) => setFormData({ ...formData, smtp_password: e.target.value })}
                      placeholder="App password or regular password"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-800">Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Default Tone
                    </label>
                    <select
                      value={formData.default_tone}
                      onChange={(e) => setFormData({ ...formData, default_tone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      aria-label="Select default email tone"
                      title="Choose the default tone for generated emails"
                    >
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                      <option value="friendly">Friendly</option>
                      <option value="apologetic">Apologetic</option>
                      <option value="persuasive">Persuasive</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Signature
                    </label>
                    <textarea
                      value={formData.email_signature}
                      onChange={(e) => setFormData({ ...formData, email_signature: e.target.value })}
                      rows={4}
                      placeholder="Best regards,&#10;Your Name&#10;Your Company"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>

                  <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-2xl border border-purple-200">
                    <input
                      type="checkbox"
                      id="auto-save"
                      checked={formData.auto_save_drafts}
                      onChange={(e) => setFormData({ ...formData, auto_save_drafts: e.target.checked })}
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-slate-300 rounded"
                    />
                    <label htmlFor="auto-save" className="ml-3 block text-sm font-semibold text-slate-900">
                      Automatically save drafts
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-800">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                    <input
                      type="checkbox"
                      id="email-sent"
                      checked={formData.notification_preferences.email_sent}
                      onChange={(e) => setFormData({
                        ...formData,
                        notification_preferences: {
                          ...formData.notification_preferences,
                          email_sent: e.target.checked
                        }
                      })}
                      className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                    />
                    <label htmlFor="email-sent" className="ml-3 block text-sm font-semibold text-slate-900">
                      Notify when email is sent
                    </label>
                  </div>

                  <div className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <input
                      type="checkbox"
                      id="draft-saved"
                      checked={formData.notification_preferences.draft_saved}
                      onChange={(e) => setFormData({
                        ...formData,
                        notification_preferences: {
                          ...formData.notification_preferences,
                          draft_saved: e.target.checked
                        }
                      })}
                      className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
                    />
                    <label htmlFor="draft-saved" className="ml-3 block text-sm font-semibold text-slate-900">
                      Notify when draft is saved
                    </label>
                  </div>

                  <div className="flex items-center p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200">
                    <input
                      type="checkbox"
                      id="generation-complete"
                      checked={formData.notification_preferences.generation_complete}
                      onChange={(e) => setFormData({
                        ...formData,
                        notification_preferences: {
                          ...formData.notification_preferences,
                          generation_complete: e.target.checked
                        }
                      })}
                      className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                    />
                    <label htmlFor="generation-complete" className="ml-3 block text-sm font-semibold text-slate-900">
                      Notify when email generation is complete
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-800">Security Settings</h3>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
                  <div className="flex">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-amber-800">Security Notice</h4>
                      <p className="mt-2 text-sm text-amber-700 leading-relaxed">
                        Your SMTP credentials are stored securely and encrypted. We recommend using app-specific passwords when available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-purple-50 border-t border-slate-200/50 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:scale-105"
            >
              <Save className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;