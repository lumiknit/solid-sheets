/**
 * Modal lifecycle enum.
 */
export var ModalLifecycle;
(function (ModalLifecycle) {
    /** Modal data is created, but not mounted */
    ModalLifecycle[ModalLifecycle["Unmounted"] = 0] = "Unmounted";
    /** Modal is mounted, but open animation just started */
    ModalLifecycle[ModalLifecycle["Opening"] = 1] = "Opening";
    /** Modal open animation is done. */
    ModalLifecycle[ModalLifecycle["Opened"] = 2] = "Opened";
    /** Modal close animation started */
    ModalLifecycle[ModalLifecycle["Closing"] = 3] = "Closing";
    /** Modal is closed, but not unmounted completely. */
    ModalLifecycle[ModalLifecycle["Closed"] = 4] = "Closed";
})(ModalLifecycle || (ModalLifecycle = {}));
