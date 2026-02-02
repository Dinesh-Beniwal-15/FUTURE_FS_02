import { Lead, LeadStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Eye, Globe, FileText, Users } from 'lucide-react';
import { format } from 'date-fns';

interface LeadTableProps {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
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

export function LeadTable({ leads, onViewLead, onStatusChange }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">No leads found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Leads will appear here when they submit the contact form.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="table-row-hover">
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{lead.name}</p>
                  {lead.company && (
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{lead.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {sourceIcons[lead.source]}
                  <span className="text-sm">{sourceLabels[lead.source]}</span>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  value={lead.status}
                  onValueChange={(value: LeadStatus) => onStatusChange(lead.id, value)}
                >
                  <SelectTrigger className="w-[130px] h-8 bg-card">
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
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(lead.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewLead(lead)}
                  className="hover:bg-muted"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
