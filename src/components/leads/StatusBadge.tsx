import { LeadStatus } from '@/types/lead';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-status-new-bg text-status-new',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-status-contacted-bg text-status-contacted',
  },
  converted: {
    label: 'Converted',
    className: 'bg-status-converted-bg text-status-converted',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
