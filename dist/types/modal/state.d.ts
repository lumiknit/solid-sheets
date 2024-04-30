import { Accessor, Component, Setter } from 'solid-js';
import { AdditionalProps, ModalID, ModalLifecycle, ModalOptions } from './type';
/**
 * Modal data kept in the state.
 */
type Item<Props> = {
    id: ModalID;
    component: Component<Props & AdditionalProps>;
    props: Props;
    options: ModalOptions;
    lc: Accessor<ModalLifecycle>;
    setLC: Setter<ModalLifecycle>;
};
export type Animation = {
    keyframes: Keyframe[] | PropertyIndexedKeyframes;
    /** Duration in seconds */
    duration: number;
    /** Animation easing */
    easing: string;
};
export type GlobalOptions<O> = {
    animation: Animation | O;
    zIndex: number | O;
};
/**
 * (Global) state of modals.
 * It must be attached to exactly one container,
 * where all modals should be rendered.
 */
export type State = {
    nextID: number;
    modals: Accessor<Item<any>[]>;
    setModals: Setter<Item<any>[]>;
} & GlobalOptions<never>;
/**
 * Create global state for modal.
 */
export declare const createState: (options?: GlobalOptions<undefined>) => State;
export declare const animate: (state: State, target: HTMLElement, reversed: boolean, callback: () => void) => void;
/**
 * Open modal in the state.
 *
 * @returns Modal ID
 */
export declare const openModal: <T>(state: State, component: Component<T & AdditionalProps>, props: T, options?: ModalOptions) => ModalID;
/**
 * Close a modal by ID. It'll start modal closing animation and then remove.
 *
 * @returns undefined if failed to find modal. false if rejected. true if succeed.
 */
export declare const closeModal: (state: State, id: ModalID) => boolean | undefined;
/**
 * Remove a modal by ID.
 */
export declare const deleteModal: (state: State, id: ModalID) => void;
export {};
