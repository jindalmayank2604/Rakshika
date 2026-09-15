import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  FileText,
  Activity,
  Filter,
  Eye,
  Check
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useSafety } from '../../context/SafetyContext';
import { useNotifications } from '../../context/NotificationContext';
import { apiService } from '../../services/api';

export const AdminDashboardPage = () => {
  const { reports, reloadReports } = useSafety();
  const { showToast } = useNotifications();
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filterTab, setFilterTab] = useState('All');
  const [actionLoading, setActionLoading] = useState(false);

  // Statistics calculation
  const total = reports.length;
  const unresolved = reports.filter(r => r.status !== 'Resolved').length;
  const resolved = reports.filter(r => r.status === 'Resolved').length;

  const chartData = [
    { name: 'Mon', reports: 4, resolved: 3 },
    { name: 'Tue', reports: 7, resolved: 5 },
    { name: 'Wed', reports: 9, resolved: 8 },
    { name: 'Thu', reports: 6, resolved: 6 },
    { name: 'Fri', reports: 12, resolved: 9 },
    { name: 'Sat', reports: 15, resolved: 11 },
    { name: 'Sun', reports: 8, resolved: 7 }
  ];

  const categoryPieData = [
    { name: 'Poor Lighting', value: 35, color: '#b47f82' },
    { name: 'Harassment', value: 25, color: '#b91c1c' },
    { name: 'Suspicious Activity', value: 20, color: '#8c5254' },
    { name: 'Broken CCTV', value: 12, color: '#6d2e46' },
    { name: 'Isolated Area', value: 8, color: '#2b7a78' }
  ];

  const handleUpdateStatus = async (reportId, newStatus, newVerification) => {
    setActionLoading(true);
    try {
      await apiService.updateReportStatus(reportId, newStatus, newVerification, adminNotes);
      showToast(`Report #${reportId} updated to ${newStatus}.`, 'success');
      setSelectedReport(null);
      setAdminNotes('');
      await reloadReports();
    } finally {
      setActionLoading(false);
    }
  };

  const filteredReports = reports.filter((r) => {
    if (filterTab === 'Unresolved') return r.status !== 'Resolved';
    if (filterTab === 'Resolved') return r.status === 'Resolved';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
            Authority & Moderation Portal
          </span>
          <span className="px-2 py-0.5 rounded-full bg-powder-petal dark:bg-wine-plum text-wine-plum dark:text-bone text-[10px] font-bold border border-dust-grey/60 dark:border-smoky-rose/30">
            Admin Role Active
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
          WeSafe Safety Command Center
        </h2>
        <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
          Review community incident submissions, audit Gemini AI recommendations, and coordinate resolution actions.
        </p>
      </div>

      {/* 1. Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
          <span className="text-xs font-bold text-dust-grey-dark dark:text-silver uppercase tracking-wider">Total Reports</span>
          <div className="text-3xl font-black text-wine-plum dark:text-bone">{total}</div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Active in current sector</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1 border-amber-300/60 dark:border-amber-700/40 bg-amber-50/50 dark:bg-amber-950/30">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Pending Review</span>
          <div className="text-3xl font-black text-amber-900 dark:text-amber-200">{pending}</div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">Requires verification</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1 border-wine-plum/40 dark:border-smoky-rose/40 bg-powder-petal/50 dark:bg-wine-plum/40">
          <span className="text-xs font-bold text-wine-plum dark:text-silver uppercase tracking-wider">Verified Hazards</span>
          <div className="text-3xl font-black text-wine-plum dark:text-bone">{verified}</div>
          <p className="text-[11px] text-wine-plum dark:text-silver font-semibold">Broadcast to safe map</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1 border-emerald-300/60 dark:border-emerald-700/40 bg-emerald-50/50 dark:bg-emerald-950/30">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Resolved</span>
          <div className="text-3xl font-black text-emerald-900 dark:text-emerald-200">{resolved}</div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Fix completed</p>
        </GlassCard>
      </div>

      {/* 2. Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Bar Chart */}
        <div className="lg:col-span-8">
          <GlassCard className="p-6 space-y-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-wine-plum dark:text-bone">Weekly Incident vs Resolution Volume</h3>
              <span className="px-2 py-0.5 rounded-full bg-powder-petal/70 dark:bg-wine-plum text-[10px] font-bold text-wine-plum dark:text-bone">
                Live Telemetry
              </span>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d6ccc2" opacity={0.4} />
                  <XAxis dataKey="name" stroke="#6d2e46" fontSize={12} />
                  <YAxis stroke="#6d2e46" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(245, 235, 224, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #d6ccc2',
                      color: '#6d2e46'
                    }}
                  />
                  <Bar dataKey="reports" fill="#6d2e46" radius={[6, 6, 0, 0]} name="Reports Filed" />
                  <Bar dataKey="resolved" fill="#a26769" radius={[6, 6, 0, 0]} name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="lg:col-span-4">
          <GlassCard className="p-6 space-y-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
            <h3 className="text-base font-bold text-wine-plum dark:text-bone">Incident Distribution</h3>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-dust-grey/40 dark:border-smoky-rose/20">
              {categoryPieData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-wine-plum dark:text-bone font-medium">{c.name}</span>
                  </div>
                  <span className="font-bold text-wine-plum dark:text-bone">{c.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 3. Moderation & Verification Queue */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-wine-plum dark:text-bone">Report Review & Verification Queue</h3>
          <div className="flex items-center gap-1.5">
            {['All', 'Unresolved', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  filterTab === tab
                    ? 'bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum shadow-sm'
                    : 'glass-card text-wine-plum dark:text-bone hover:bg-powder-petal/50 border border-dust-grey/60 dark:border-smoky-rose/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => (
            <GlassCard key={report.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-dust-grey/60 dark:border-smoky-rose/30 shadow-warm-sm">
              <div className="flex items-start gap-4">
                <img
                  src={report.image_url}
                  alt={report.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-dust-grey/60 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent dark:text-almond-dark">{report.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      report.severity === 'Critical' || report.severity === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {report.severity}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-powder-petal dark:bg-wine-plum text-wine-plum dark:text-bone border border-dust-grey/50">
                      {report.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-wine-plum dark:text-bone">{report.title}</h4>
                  <p className="text-xs text-dust-grey-dark dark:text-silver line-clamp-1">{report.description}</p>
                  <p className="text-[11px] text-dust-grey-dark dark:text-silver">
                    📍 {report.address} • Submitted on {(() => {
                      if (!report.created_at) return new Date().toLocaleDateString();
                      const d = new Date(report.created_at);
                      return isNaN(d.getTime()) ? new Date().toLocaleDateString() : d.toLocaleDateString();
                    })()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedReport(report)}
                >
                  Review Details
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedReport && (
        <Modal
          isOpen={Boolean(selectedReport)}
          onClose={() => setSelectedReport(null)}
          maxWidth="max-w-2xl"
          title={`Review Report #${selectedReport.id}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-powder-petal text-wine-plum dark:bg-wine-plum dark:text-bone">{selectedReport.category}</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">{selectedReport.severity} Severity</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{selectedReport.status}</span>
            </div>

            <h3 className="text-lg font-bold text-wine-plum dark:text-bone">{selectedReport.title}</h3>
            <p className="text-xs text-wine-plum/90 dark:text-silver glass-card p-3.5 rounded-2xl border border-dust-grey/60 dark:border-smoky-rose/30">
              {selectedReport.description}
            </p>

            {/* AI Classification Review */}
            <div className="p-3.5 bg-powder-petal/60 dark:bg-wine-plum/60 rounded-2xl border border-dust-grey/60 dark:border-smoky-rose/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-wine-plum dark:text-bone">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>WeSafe AI Suggested Assessment (Gemini)</span>
              </div>
              <p className="text-xs text-wine-plum/90 dark:text-silver">
                {selectedReport.ai_summary || 'Analyzed as medium priority municipal maintenance issue.'}
              </p>
            </div>

            {/* Admin Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-wine-plum dark:text-silver uppercase">
                Administrative / Audit Notes:
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Verified with sector police outpost / Forwarded to municipal lighting cell..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl glass-input"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-dust-grey/40 dark:border-smoky-rose/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  loading={actionLoading}
                  onClick={() => handleUpdateStatus(selectedReport.id, 'Verified', 'Community Verified')}
                >
                  Verify Report
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  loading={actionLoading}
                  onClick={() => handleUpdateStatus(selectedReport.id, 'Resolved', 'Authority Verified')}
                >
                  Mark Resolved
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                loading={actionLoading}
                onClick={() => handleUpdateStatus(selectedReport.id, 'Rejected', 'Flagged')}
              >
                Flag / Reject
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
