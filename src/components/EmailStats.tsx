import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Mail, Send, Clock, Target } from 'lucide-react';
import type { EmailStats } from '../types';

interface EmailStatsProps {
  stats: EmailStats;
}

const EmailStatsComponent: React.FC<EmailStatsProps> = ({ stats }) => {
  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

  const toneData = Object.entries(stats.popular_tones).map(([tone, count]) => ({
    name: tone.charAt(0).toUpperCase() + tone.slice(1),
    value: count,
  }));

  const StatCard = ({ title, value, icon: Icon, gradient, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    gradient: string;
    subtitle?: string;
  }) => (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-slate-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-slate-500 mt-2">{subtitle}</p>}
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Email Analytics</h2>
          <p className="text-xl text-slate-600">Insights into your email automation performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Total Sent"
            value={stats.total_sent}
            icon={Send}
            gradient="from-emerald-500 to-teal-600"
            subtitle="Emails delivered"
          />
          <StatCard
            title="Total Drafts"
            value={stats.total_drafts}
            icon={Mail}
            gradient="from-violet-500 to-purple-600"
            subtitle="Emails generated"
          />
          <StatCard
            title="Success Rate"
            value={`${stats.success_rate}%`}
            icon={Target}
            gradient="from-cyan-500 to-blue-600"
            subtitle="Delivery success"
          />
          <StatCard
            title="Recent Activity"
            value={stats.recent_activity}
            icon={TrendingUp}
            gradient="from-amber-500 to-orange-600"
            subtitle="Last 7 days"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Stats */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthly_stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <Bar dataKey="sent" fill="url(#sentGradient)" name="Sent" radius={[4, 4, 0, 0]} />
                <Bar dataKey="drafts" fill="url(#draftsGradient)" name="Drafts" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                  <linearGradient id="draftsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Popular Tones */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Popular Tones</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={toneData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {toneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Email Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthly_stats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="#8B5CF6"
                strokeWidth={4}
                dot={{ fill: '#8B5CF6', strokeWidth: 3, r: 6 }}
                name="Sent Emails"
              />
              <Line
                type="monotone"
                dataKey="drafts"
                stroke="#06B6D4"
                strokeWidth={4}
                dot={{ fill: '#06B6D4', strokeWidth: 3, r: 6 }}
                name="Generated Drafts"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Section */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl text-white p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold mb-3 text-lg">Most Used Tone</h4>
              <p className="text-sm opacity-90">
                {toneData.length > 0 
                  ? `${toneData[0].name} (${toneData[0].value} emails)`
                  : 'No data available'
                }
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold mb-3 text-lg">Average Success Rate</h4>
              <p className="text-sm opacity-90">
                {stats.success_rate}% of emails successfully delivered
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold mb-3 text-lg">Activity Level</h4>
              <p className="text-sm opacity-90">
                {stats.recent_activity > 10 ? 'High' : stats.recent_activity > 5 ? 'Medium' : 'Low'} activity in recent days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailStatsComponent;