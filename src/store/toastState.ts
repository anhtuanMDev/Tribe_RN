import { observable, computed, batch } from '@legendapp/state';
import type { ToastItem, ToastDefaults, ToastQueues, ToastConfig } from '../components/Toast/type';
import { MAX_VISIBLE } from '../config/toast';

// ─── Single store observable ──────────────────────────────────────────────────

interface ToastStore {
    items: Record<string, ToastItem>;
    queues: ToastQueues;
    defaults: ToastDefaults;
}

export const toastStore = observable<ToastStore>({
    items: {},
    queues: { top: [], bottom: [] },
    defaults: {
        variant: 'info',
        duration: 3500,
        position: 'top',
        animation: 'spring',
        offset: 0,
        swipeable: true,
        maxVisible: MAX_VISIBLE,
    },
});

export const pendingDismiss = observable<Record<string, boolean>>({});

// ─── Derived: visible IDs per position (last N, newest last) ─────────────────
// computed() memoises — only recomputes when the queues it reads change.

export const visibleTop = computed(() => {
    const max = toastStore.defaults.maxVisible.get();
    return toastStore.queues.top.get().slice(-max);
});

export const visibleBottom = computed(() => {
    const max = toastStore.defaults.maxVisible.get();
    return toastStore.queues.bottom.get().slice(-max);
});

// ─── ID generator ─────────────────────────────────────────────────────────────

let _counter = 0;
const genId = () => `t_${Date.now()}_${++_counter}`;

// ─── Timer registry (outside reactive state) ──────────────────────────────────

const timers = new Map<string, ReturnType<typeof setTimeout>>();

// ─── Core actions ─────────────────────────────────────────────────────────────

/**
 * Add or replace a toast. Returns the resolved ID.
 */
export function showToast(config: ToastConfig): string {
    const defaults = toastStore.defaults.get();
    const id = config.id ?? genId();

    // Replace if ID already exists (dedup by ID)
    if (toastStore.items.get()[id]) {
        _evict(id, false);
    }

    const item: ToastItem = {
        id,
        variant: config.variant ?? defaults.variant,
        duration: config.duration ?? defaults.duration,
        position: config.position ?? defaults.position,
        animation: config.animation ?? defaults.animation,
        offset: config.offset ?? defaults.offset,
        swipeable: config.swipeable ?? defaults.swipeable,
        title: config.title,
        message: config.message,
        renderCustom: config.renderCustom,
        icon: config.icon,
        action: config.action,
        onDismiss: config.onDismiss,
        containerStyle: config.containerStyle,
        titleStyle: config.titleStyle,
        messageStyle: config.messageStyle,
        createdAt: Date.now(),
    };

    batch(() => {
        const pos = item.position;
        const queue = toastStore.queues[pos].get();
        const max = defaults.maxVisible;

        // Evict oldest synchronously — store never exceeds maxVisible
        if (queue.length >= max) {
            const oldestId = queue[0];
            _evict(oldestId, true);
        }

        toastStore.items.set({ ...toastStore.items.get(), [id]: item });
        const currentQueue = toastStore.queues.get();
        toastStore.queues.set({
            ...currentQueue,
            [pos]: [...currentQueue[pos].filter(i => i !== id), id],
        });
    });

    if (item.duration > 0) {
        timers.set(id, setTimeout(() => {
            pendingDismiss.set({ ...pendingDismiss.get(), [id]: true });
        }, item.duration));
    }

    return id;
}

/**
 * Remove a toast from the store. The component should have already
 * completed its exit animation before calling this.
 */
export function dismissToast(id: string): void {
    _evict(id, true);
}

function _evict(id: string, runCallback: boolean): void {
    const item = toastStore.items.get()[id] as ToastItem | undefined;
    if (!item) return;

    const t = timers.get(id);
    if (t) { clearTimeout(t); timers.delete(id); }

    if (runCallback) item.onDismiss?.();

    // Clean up pending dismiss signal
    const updatedPending = { ...pendingDismiss.get() };
    delete updatedPending[id];
    pendingDismiss.set(updatedPending);

    batch(() => {
        const pos = item.position;
        const updated = { ...toastStore.items.get() };
        delete updated[id];
        toastStore.items.set(updated);
        const currentQueue = toastStore.queues.get();
        toastStore.queues.set({
            ...currentQueue,
            [pos]: currentQueue[pos].filter(i => i !== id),
        });
    });
}

/** Dismiss all, optionally scoped to one position */
export function dismissAll(position?: ToastItem['position']): void {
    const q = toastStore.queues.get();
    const ids = position ? [...q[position]] : [...q.top, ...q.bottom];
    ids.forEach(id => _evict(id, true));
}

/** Update global defaults at runtime (e.g. per-screen overrides) */
export function configureToasts(overrides: Partial<ToastDefaults>): void {
    toastStore.defaults.set({ ...toastStore.defaults.get(), ...overrides });
}

// ─── Convenience API ──────────────────────────────────────────────────────────

export const toast = {
    show: showToast,
    success: (c: Omit<ToastConfig, 'variant'>) => showToast({ ...c, variant: 'success' }),
    error: (c: Omit<ToastConfig, 'variant'>) => showToast({ ...c, variant: 'error' }),
    warning: (c: Omit<ToastConfig, 'variant'>) => showToast({ ...c, variant: 'warning' }),
    info: (c: Omit<ToastConfig, 'variant'>) => showToast({ ...c, variant: 'info' }),
    dismiss: dismissToast,
    dismissAll,
    configure: configureToasts,
};