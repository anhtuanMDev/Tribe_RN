import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';
import { useCallback } from 'react';

export function useTimeAgo() {
  const formatTime = useCallback((dateString: string): string => {
    try {
      const date =
        typeof dateString === 'string'
          ? parseISO(dateString)
          : new Date(dateString);
      const diffMs = Date.now() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);

      if (diffSecs < 60) return 'Just now';
      if (diffMins < 60) return `${diffMins}m`;
      if (diffHours < 24) return `${diffHours}h`;
      if (isToday(date)) return format(date, 'h:mm a');
      if (isYesterday(date)) return 'Yesterday';
      if (diffHours < 24 * 7) return format(date, 'EEEE');
      if (date.getFullYear() === new Date().getFullYear())
        return format(date, 'MMM d');
      return format(date, 'MMM d, yyyy');
    } catch {
      return '';
    }
  }, []);

  const formatFullDate = useCallback((dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMMM d, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  }, []);

  const formatRelative = useCallback((dateString: string) => {
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  }, []);

  return { formatTime, formatFullDate, formatRelative };
}
