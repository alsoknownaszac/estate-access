"use client";

import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 10000; // 10 seconds

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type Toast = Omit<ToasterToast, "id">;

let count = 0;
const genId = () => (++count).toString();

const listeners = new Set<(state: ToasterToast[]) => void>();
let state: ToasterToast[] = [];

function notify() {
  listeners.forEach((listener) => listener(state));
}

function addToast(toast: ToasterToast) {
  state = [toast, ...state].slice(0, TOAST_LIMIT);
  notify();

  // Auto-dismiss after delay
  setTimeout(() => {
    state = state.filter((t) => t.id !== toast.id);
    notify();
  }, TOAST_REMOVE_DELAY);
}

function dismissToast(toastId?: string) {
  state = state.map((t) =>
    t.id === toastId || !toastId ? { ...t, open: false } : t
  );
  notify();
}

export function toast(props: Toast) {
  const id = genId();

  addToast({
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) dismissToast(id);
    },
  });

  return { id, dismiss: () => dismissToast(id) };
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>(state);

  React.useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  return { toasts, toast, dismiss: dismissToast };
}
