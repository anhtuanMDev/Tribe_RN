export { ToastContainer } from './components/ToastContainer';

// Imperative API
export {
    toast,
    showToast,
    dismissToast,
    dismissAll,
    configureToasts,
} from '../../store';

// Observable store (for advanced reactive consumers)
export { toastStore, visibleTop, visibleBottom } from '../../store';

// Types
export type {
    ToastConfig,
    ToastItem,
    ToastVariant,
    ToastPosition,
    ToastAnimation,
    ToastDefaults,
    ToastQueues,
} from './type';

// Layout constants (if consumers need to match the deck geometry)
export {
    MAX_VISIBLE,
    DECK_SCALE_STEP,
    DECK_TRANSLATE_STEP,
    DECK_OPACITY_STEP,
} from '../../config/toast';