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
  const pending = reports.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;
  const verified = reports.filter(r => r.status === 'Verified').length;
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
    { name: 'Poor Lighting', value: 35, color: '#F59E0B' },
    { name: 'Harassment', value: 25, color: '#EF4444' },
    { name: 'Suspicious Activity', value: 20, color: '#8B5CF6' },
    { name: 'Broken CCTV', value: 12, color: '#3B82F6' },
    { name: 'Isolated Area', value: 8, color: '#10B981' }
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
    if (filterTab === 'Pending') return r.status === 'Submitted' || r.status === 'Under Review';
    if (filterTab === 'Verified') return r.status === 'Verified';
    if (filterTab === 'Resolved') return r.status === 'Resolved';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Authority & Moderation Portal
          </span>
          <Badge variant="purple" size="xs">Admin Role Active</Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Safety Command Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Review user incident submissions, evaluate AI recommendations, and coordinate municipal actions.
        </p>
      </div>

      {/* 1. Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reports</span>
          <div className="text-3xl font-black text-slate-900">{total}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Active in current sector</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1 border-amber-200/80 bg-amber-50/40">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pending Review</span>
          <div className="text-3xl font-black text-amber-900">{pending}</div>
          <p className="text-[11px] text-amber-600 font-semibold">Requires verification</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1 border-indigo-200/80 bg-indigo-50/40">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Verified Hazards</span>
          <div className="text-3xl font-black text-indigo-900">{verified}</div>
          <p className="text-[11px] text-indigo-600 font-semibold">Broadcast to map</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1 border-emerald-200/80 bg-emerald-50/40">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Resolved</span>
          <div className="text-3xl font-black text-emerald-900">{resolved}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Fix completed</p>
        </GlassCard>
      </div>

      {/* 2. Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Bar Chart */}
        <div className="lg:col-span-8">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Weekly Incident vs Resolution Volume</h3>
              <Badge variant="teal" size="xs">Live Telemetry</Badge>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1'
                    }}
                  />
                  <Bar dataKey="reports" fill="#6366F1" radius={[6, 6, 0, 0]} name="Reports Filed" />
                  <Bar dataKey="resolved" fill="#10B981" radius={[6, 6, 0, 0]} name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="lg:col-span-4">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Incident Distribution</h3>
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
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {categoryPieData.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-slate-700 font-medium">{c.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{c.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 3. Moderation & Verification Queue */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Report Review & Verification Queue</h3>
          <div className="flex items-center gap-1.5">
            {['All', 'Pending', 'Verified', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  filterTab === tab
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => (
            <GlassCard key={report.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={report.image_url}
                  alt={report.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="purple" size="xs">{report.category}</Badge>
                    <Badge variant={report.severity === 'Critical' || report.severity === 'High' ? 'danger' : 'warning'} size="xs">
                      {report.severity}
                    </Badge>
                    <Badge variant={report.status === 'Verified' ? 'success' : 'primary'} size="xs">
                      {report.status}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{report.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{report.description}</p>
                  <p className="text-[11px] text-slate-400">
                    📍 {report.address} • Submitted on {new Date(report.created_at).toLocaleDateString()}
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
              <Badge variant="purple">{selectedReport.category}</Badge>
              <Badge variant="danger">{selectedReport.severity} Severity</Badge>
              <Badge variant="primary">{selectedReport.status}</Badge>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{selectedReport.title}</h3>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              {selectedReport.description}
            </p>

            {/* AI Classification Review */}
            <div className="p-3.5 bg-indigo-50/90 rounded-2xl border border-indigo-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                <span>Rakshika AI Suggested Assessment</span>
              </div>
              <p className="text-xs text-indigo-800">
                {selectedReport.ai_summary || 'Analyzed as medium priority municipal maintenance issue.'}
              </p>
            </div>

            {/* Admin Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Administrative / Audit Notes:
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Verified with sector police outpost / Forwarded to municipal lighting cell..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
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
