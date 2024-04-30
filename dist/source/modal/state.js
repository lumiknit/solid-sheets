import { createSignal } from 'solid-js';
import { ModalLifecycle } from './type';
/**
 * Create global state for modal.
 */
export const createState = (options) => {
    const o = {
        animation: options?.animation ?? {
            keyframes: [
                {
                    opacity: 0,
                    transform: 'translateY(0.25rem) scale(0.9)',
                },
                {
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                },
            ],
            duration: 0.125,
            easing: 'ease',
        },
        zIndex: options?.zIndex ?? 9999,
    };
    const [modals, setModals] = createSignal([]);
    return {
        nextID: 0,
        modals,
        setModals,
        ...o,
    };
};
/**
 * Return the next modal ID.
 */
const getNextID = (state) => {
    const id = state.nextID.toString(36);
    state.nextID++;
    return id;
};
/**
 * Find modal by ID.
 *
 * @returns undefined if not found, otherwise return modal item.
 */
const getModal = (state, id) => {
    const modals = state.modals();
    for (const i of modals) {
        if (i.id === id)
            return i;
    }
    return;
};
export const animate = (state, target, reversed, callback) => {
    const durationMS = 1000 * state.animation.duration;
    target.animate(state.animation.keyframes, {
        duration: durationMS,
        direction: reversed ? 'reverse' : 'normal',
        fill: 'forwards',
        easing: state.animation.easing,
    });
    setTimeout(callback, durationMS);
};
/**
 * Open modal in the state.
 *
 * @returns Modal ID
 */
export const openModal = (state, component, props, options) => {
    const id = getNextID(state);
    const [lc, setLC] = createSignal(ModalLifecycle.Unmounted);
    const modal = {
        id,
        component,
        props,
        lc,
        setLC,
        options: options ?? {},
    };
    state.setModals((ms) => [...ms, modal]);
    return id;
};
/**
 * Close a modal by ID. It'll start modal closing animation and then remove.
 *
 * @returns undefined if failed to find modal. false if rejected. true if succeed.
 */
export const closeModal = (state, id) => {
    const i = getModal(state, id);
    if (i === undefined)
        return;
    const onClose = i.options.onClose;
    if (onClose && onClose() === false)
        return false;
    i.setLC(ModalLifecycle.Closing);
    return true;
};
/**
 * Remove a modal by ID.
 */
export const deleteModal = (state, id) => {
    state.setModals((ms) => ms.filter((v) => v.id !== id));
};
