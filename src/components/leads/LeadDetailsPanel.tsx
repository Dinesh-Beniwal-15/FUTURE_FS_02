import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Mail, Phone, Building, Calendar, Globe, FileText, Users, Save } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface LeadDetailsPanelProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  onNotesChange: (leadId: string, notes: string) => void;
}

const sourceIcons: Record<string, React.ReactNode> = {
  website: <Globe className="h-4 w-4" />,
  contact_form: <FileText className="h-4 w-4" />,
  referral: <Users className="h-4 w-4" />,
};

const sourceLabels: Record<string, string> = {
  website: 'Website',
  contact_form: 'Contact Form',
  referral: 'Referral',
};

export function LeadDetailsPanel({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onNotesChange,
}: LeadDetailsPanelProps) {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes);
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  const handleSaveNotes = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    onNotesChange(lead.id, notes);
    setIsSaving(false);
    toast.success('Notes saved successfully');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-card border-l border-border z-50 shadow-xl animate-slide-in-right overflow-y-auto scrollbar-thin">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground">Lead Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Lead Info */}
          <div>
            <h3 className="text-xl font-semibold text-foreground">{lead.name}</h3>
            {lead.company && (
              <p className="text-muted-foreground">{lead.company}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <Select
              value={lead.status}
              onValueChange={(value: LeadStatus) => onStatusChange(lead.id, value)}
            >
              <SelectTrigger className="w-full mt-2 bg-background">
                <SelectValue>
                  <StatusBadge status={lead.status} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="new">
                  <StatusBadge status="new" />
                </SelectItem>
                <SelectItem value="contacted">
                  <StatusBadge status="contacted" />
                </SelectItem>
                <SelectItem value="converted">
                  <StatusBadge status="converted" />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Contact Information</label>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 text-foreground">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">
                    {lead.phone}
                  </a>
                </div>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 text-foreground">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Lead Source</label>
            <div className="flex items-center gap-2 text-foreground">
              {sourceIcons[lead.source]}
              <span>{sourceLabels[lead.source]}</span>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Timeline</label>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-foreground">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Created: </span>
                  <span>{format(new Date(lead.createdAt), 'MMMM d, yyyy h:mm a')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">Updated: </span>
                  <span>{format(new Date(lead.updatedAt), 'MMMM d, yyyy h:mm a')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add follow-up notes, meeting summaries, or important details..."
              className="min-h-[150px] bg-background resize-none"
            />
            <Button
              onClick={handleSaveNotes}
              disabled={isSaving || notes === lead.notes}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Notes'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
