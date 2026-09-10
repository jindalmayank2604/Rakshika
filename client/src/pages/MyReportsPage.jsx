import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { ReportCard } from '../components/reports/ReportCard';
import { IncidentDetailModal } from '../components/maps/IncidentDetailModal';
import { useSafety } from '../context/SafetyContext';
import { EmptyStateIllustration } from '../assets/illustrations/3DIllustrations';

export const MyReportsPage = () => {
  const { reports } = useSafety();
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter((r) => {
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesSearch = !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-wine-plum dark:text-silver">
              Community Contributions
            </span>
            <span className="text-[10px] bg-powder-petal dark:bg-wine-plum text-wine-plum dark:text-bone font-bold px-2 py-0.5 rounded-full border border-dust-grey/60 dark:border-smoky-rose/30">
              {reports.length} Total Logs
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-wine-plum dark:text-bone tracking-tight">
            My Incident Reports
          </h2>
          <p className="text-xs sm:text-sm text-dust-grey-dark dark:text-silver mt-0.5">
            Track verification progress and municipal resolution status of your submissions.
          </p>
        </div>

        <Link to="/report">
          <Button variant="primary" icon={Plus}>
            Log New Report
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Submitted', 'Under Review', 'Verified', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-wine-plum text-bone dark:bg-bone dark:text-wine-plum shadow-sm'
                  : 'glass-card text-wine-plum dark:text-bone hover:bg-powder-petal/50 border border-dust-grey/60 dark:border-smoky-rose/30'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-dust-grey-dark dark:text-silver absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input rounded-xl pl-9 pr-4 py-2 text-xs"
          />
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onClick={() => setSelectedReport(report)}
            />
          ))}
        </div>
      ) : (
        <GlassCard className="p-12 text-center space-y-4 max-w-md mx-auto border border-dust-grey/60 dark:border-smoky-rose/30">
          <EmptyStateIllustration className="w-32 h-32 mx-auto" />
          <div>
            <h4 className="text-base font-bold text-wine-plum dark:text-bone">No reports found</h4>
            <p className="text-xs text-dust-grey-dark dark:text-silver mt-1">
              You haven't logged any reports matching the selected filters.
            </p>
          </div>
          <Link to="/report">
            <Button variant="primary" size="sm">
              File First Hazard
            </Button>
          </Link>
        </GlassCard>
      )}

      {/* Detail Modal */}
      {selectedReport && (
        <IncidentDetailModal
          report={selectedReport}
          isOpen={Boolean(selectedReport)}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
