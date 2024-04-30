/**
 * Modal ID Type.
 */
export type ModalID = string;
/**
 * Modal options and callbacks.
 * This is passed from user when modal is opened,
 * and used by solid-sheets internally.
 */
export type ModalOptions = {
    /** Callback for modal creation (before transition) */
    onCreate?: () => void;
    /** Callback for modal creation (after transition) */
    onOpened?: () => void;
    /**
     * Callback for modal close. (before transition)
     *
     * @returns If false, cancel modal close.
     */
    onClose?: () => boolean;
    /** Callback for modal close (after transition) */
    onDelete?: () => void;
};
/**
 * Modal lifecycle enum.
 */
export declare enum ModalLifecycle {
    /** Modal data is created, but not mounted */
    Unmounted = 0,
    /** Modal is mounted, but open animation just started */
    Opening = 1,
    /** Modal open animation is done. */
    Opened = 2,
    /** Modal close animation started */
    Closing = 3,
    /** Modal is closed, but not unmounted completely. */
    Closed = 4
}
/**
 * Additional props for modal inner body.
 * These will pass from solid-sheets to user's component,
 * and user can use in their own components.
 */
export type AdditionalProps = {
    /** Trigger modal close */
    close: () => void;
};
