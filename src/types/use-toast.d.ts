// src/components/hooks/use-toast.d.ts
export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  // Other properties as needed
};

export function useToast(): { toasts: Toast[] };
