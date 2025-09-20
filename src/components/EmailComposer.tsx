import React, { useState } from 'react';
import { Sparkles, Clock, User, MessageSquare } from 'lucide-react';
import type { Tone } from '../types';
import { config } from '../config';

interface EmailComposerProps {
  onGenerate: (
    prompt: string,
    recipient: string,
    tone: Tone,
    type: 'general' | 'meeting'
  ) => Promise<void>;
  isGenerating: boolean;
  generatedContent: string;
  onSend: () => Promise<void>;
}


const EmailComposer: React.FC<EmailComposerProps> = ({
  // ...
}) => {
  const [prompt, setPrompt] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState<Tone>('friendly');
  const [emailType, setEmailType] = useState<'general' | 'meeting'>('general');
  const [generatedContent, setGeneratedContent] = useState('');
  const [editableContent, setEditableContent] = useState('');
  const [draftId, setDraftId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const tones: { value: Tone; label: string; gradient: string }[] = [
    { value: 'formal', label: 'Formal', gradient: 'from-slate-600 to-slate-800' },
    { value: 'casual', label: 'Casual', gradient: 'from-emerald-500 to-teal-600' },
    { value: 'friendly', label: 'Friendly', gradient: 'from-amber-500 to-orange-600' },
    { value: 'apologetic', label: 'Apologetic', gradient: 'from-rose-500 to-pink-600' },
    { value: 'persuasive', label: 'Persuasive', gradient: 'from-violet-600 to-purple-700' },
    { value: 'urgent', label: 'Urgent', gradient: 'from-red-600 to-rose-700' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("recipient", recipient);
    formData.append("tone", tone);
    formData.append("type", emailType);

    const response = await fetch(config.endpoints.generate, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      setGeneratedContent(data.content);
      setEditableContent(data.content);
      setDraftId(data.draft_id);
      setSuccessMessage("");
    } else {
      setSuccessMessage("Failed to generate email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold flex items-center space-x-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="w-8 h-8" />
                </div>
                <span>AI Email Composer</span>
              </h2>
              <p className="text-purple-100 text-lg">Create professional emails with intelligent AI assistance</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <form onSubmit={handleSubmit}>
              {/* Email Type Selection */}
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-4">Email Type</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setEmailType('general')}
                    className={`px-6 py-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 font-medium ${
                      emailType === 'general'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 transform scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>General Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailType('meeting')}
                    className={`px-6 py-4 rounded-2xl flex items-center space-x-3 transition-all duration-300 font-medium ${
                      emailType === 'meeting'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 transform scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    <span>Meeting Request</span>
                  </button>
                </div>
              </div>

              {/* Recipient */}
              <div className="my-6">
                <label className="block text-lg font-semibold text-slate-800 mb-4">
                  <User className="w-5 h-5 inline mr-2" />
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg bg-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-4">Tone</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tones.map((toneOption) => (
                    <button
                      key={toneOption.value}
                      type="button"
                      onClick={() => setTone(toneOption.value)}
                      className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        tone === toneOption.value
                          ? `bg-gradient-to-r ${toneOption.gradient} text-white ring-4 ring-purple-500/30 scale-105 shadow-lg`
                          : `bg-gradient-to-r ${toneOption.gradient} text-white opacity-60 hover:opacity-100 hover:scale-105`
                      }`}
                    >
                      {toneOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="my-6">
                <label className="block text-lg font-semibold text-slate-800 mb-4">
                  Email Context
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    emailType === 'meeting'
                      ? 'Describe the meeting purpose, suggested times, and any relevant details...'
                      : 'Describe what your email should be about...'
                  }
                  rows={5}
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none text-lg bg-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={!prompt.trim() || !recipient.trim()}
                className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/25"
              >
                <Sparkles className="w-6 h-6" />
                <span>Generate & Send Email</span>
              </button>
            </form>

            {/* Generated Content */}
            {generatedContent && (
              <div className="border-t-2 border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Generated Email</h3>
                <label htmlFor="editable-email" className="sr-only">Edit Generated Email</label>
                <textarea
                  id="editable-email"
                  value={editableContent}
                  onChange={e => setEditableContent(e.target.value)}
                  rows={10}
                  placeholder="Edit the generated email before sending..."
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl text-lg bg-white/50 mb-4"
                  title="Edit generated email"
                />
                <button
                  onClick={async () => {
                    if (draftId !== null) {
                      await fetch(config.endpoints.update(draftId), {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ content: editableContent }),
                      });
                        const sendResponse = await fetch(config.endpoints.send(draftId), {
                        method: "POST"
                      });
                      if (sendResponse.ok) {
                        setSuccessMessage("Email sent successfully!");
                      } else {
                        setSuccessMessage("Failed to send email.");
                      }
                    }
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
                >
                  Send Email
                </button>
                {successMessage && (
                  <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-xl text-center font-semibold">
                    {successMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;