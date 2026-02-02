import { useState, useEffect, useMemo } from 'react';
import { Lead, LeadStatus, LeadStats } from '@/types/lead';
import { mockLeads } from '@/data/mockLeads';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  // Simulate API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeads(mockLeads);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const stats: LeadStats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  }), [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
        : lead
    ));
  };

  const updateLeadNotes = (leadId: string, notes: string) => {
    setLeads(prev => prev.map(lead =>
      lead.id === leadId
        ? { ...lead, notes, updatedAt: new Date().toISOString() }
        : lead
    ));
  };

  return {
    leads: filteredLeads,
    allLeads: leads,
    stats,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    updateLeadStatus,
    updateLeadNotes,
  };
}
