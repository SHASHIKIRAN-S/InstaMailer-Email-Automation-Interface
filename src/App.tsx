import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import EmailComposer from './components/EmailComposer';
import EmailHistory from './components/EmailHistory';
import EmailStatsComponent from './components/EmailStats';
import SettingsComponent from './components/Settings';
import EmailModal from './components/EmailModal';
import { config } from './config';
import type { EmailDraft, EmailStats, Settings, Tone } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('compose');
  const [emails, setEmails] = useState<EmailDraft[]>([]);
  const [stats, setStats] = useState<EmailStats>({
    total_sent: 0,
    total_drafts: 0,
    success_rate: 0,
    recent_activity: 0,
    popular_tones: {},
    monthly_stats: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [currentDraft, setCurrentDraft] = useState<Partial<EmailDraft> | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<EmailDraft | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Load real data from backend
  useEffect(() => {
    fetchEmails();
    fetchStats();
  }, []);

  const fetchEmails = async () => {
    try {
      console.log('Fetching emails from:', config.endpoints.emails);
      const response = await fetch(config.endpoints.emails);
      console.log('Emails response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Emails data:', data);
        setEmails(data);
      } else {
        console.error('Failed to fetch emails, status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const fetchStats = async () => {
    try {
      console.log('Fetching stats from:', config.endpoints.stats);
      const response = await fetch(config.endpoints.stats);
      console.log('Stats response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Stats data:', data);
        setStats(data);
      } else {
        console.error('Failed to fetch stats, status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const [settings, setSettings] = useState<Settings>({
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    default_tone: 'friendly',
    auto_save_drafts: true,
    email_signature: 'Best regards,\nYour Name\nYour Company',
    notification_preferences: {
      email_sent: true,
      draft_saved: true,
      generation_complete: true,
    }
  });

  const handleGenerate = async (prompt: string, recipient: string, tone: Tone, type: 'general' | 'meeting') => {
    setIsGenerating(true);
    
    try {
      console.log('Generating email from:', config.endpoints.generate);
      console.log('Request body:', { prompt, recipient, tone, type });
      const response = await fetch(config.endpoints.generate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ prompt, recipient, tone, type }),
      });
      console.log('Generate response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
      
      const newDraft: Partial<EmailDraft> = {
        id: data.draft_id,
        prompt,
        content: data.content,
        recipient,
        tone,
        type,
        status: 'draft',
        created_at: new Date().toISOString()
      };
      
      setCurrentDraft(newDraft);
      
      // Refresh emails and stats after generating
      await fetchEmails();
      await fetchStats();
      
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!currentDraft || !currentDraft.id) return;
    
    try {
      const response = await fetch(config.endpoints.send(currentDraft.id), {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGeneratedContent('');
      setCurrentDraft(null);
      
      // Refresh emails and stats after sending
      await fetchEmails();
      await fetchStats();
      
      // Show success notification
      alert('Email sent successfully!');
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  const handleDeleteEmail = async (id: number) => {
    try {
      const response = await fetch(config.endpoints.delete(id), {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setEmails((prev: EmailDraft[]) => prev.filter((email: EmailDraft) => email.id !== id));
        // Refresh stats
        await fetchStats();
      } else {
        console.error('Failed to delete email');
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const handleViewEmail = (email: EmailDraft) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  const handleSaveSettings = async (newSettings: Settings) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {activeTab === 'compose' && (
          <EmailComposer
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generatedContent={generatedContent}
            onSend={handleSendEmail}
          />
        )}
        
        {activeTab === 'history' && (
          <EmailHistory
            emails={emails}
            onDeleteEmail={handleDeleteEmail}
            onViewEmail={handleViewEmail}
          />
        )}
        
        {activeTab === 'stats' && (
          <EmailStatsComponent stats={stats} />
        )}
        
        {activeTab === 'settings' && (
          <SettingsComponent
            settings={settings}
            onSaveSettings={handleSaveSettings}
          />
        )}
      </main>

      {showEmailModal && selectedEmail && (
        <EmailModal
          email={selectedEmail}
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}

export default App;