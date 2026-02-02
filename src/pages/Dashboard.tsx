import { useState } from 'react';
import { Lead } from '@/types/lead';
import { useLeads } from '@/hooks/useLeads';
import { Navbar } from '@/components/layout/Navbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadDetailsPanel } from '@/components/leads/LeadDetailsPanel';
import { SearchFilter } from '@/components/leads/SearchFilter';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Users, UserPlus, Phone, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const {
    leads,
    stats,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    updateLeadStatus,
    updateLeadNotes,
  } = useLeads();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedLead(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track your client leads
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Leads"
            value={stats.total}
            icon={Users}
            iconColor="text-primary"
          />
          <StatCard
            title="New Leads"
            value={stats.new}
            icon={UserPlus}
            iconColor="text-status-new"
          />
          <StatCard
            title="Contacted"
            value={stats.contacted}
            icon={Phone}
            iconColor="text-status-contacted"
          />
          <StatCard
            title="Converted"
            value={stats.converted}
            icon={CheckCircle}
            iconColor="text-status-converted"
          />
        </div>

        {/* Leads Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-foreground">All Leads</h2>
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <LeadTable
              leads={leads}
              onViewLead={handleViewLead}
              onStatusChange={updateLeadStatus}
            />
          )}
        </div>
      </main>

      {/* Lead Details Panel */}
      <LeadDetailsPanel
        lead={selectedLead}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onStatusChange={updateLeadStatus}
        onNotesChange={updateLeadNotes}
      />
    </div>
  );
}
