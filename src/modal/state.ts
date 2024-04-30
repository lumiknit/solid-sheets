import { Accessor, Component, createSignal, Setter } from 'solid-js';
import { AdditionalProps, ModalID, ModalLifecycle, ModalOptions } from './type';

export const ANIMATION_ID = '-solid-sheets-modal-ani';

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
export const createState = (options?: GlobalOptions<undefined>): State => {
  const o: GlobalOptions<never> = {
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
  const [modals, setModals] = createSignal<Item<any>[]>([]);
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
const getNextID = (state: State): ModalID => {
  const id = state.nextID.toString(36);
  state.nextID++;
  return id;
};

/**
 * Find modal by ID.
 *
 * @returns undefined if not found, otherwise return modal item.
 */
const getModal = (state: State, id: ModalID): Item<any> | undefined => {
  const modals = state.modals();
  for (const i of modals) {
    if (i.id === id) return i;
  }
  return;
};

export const animate = (
  state: State,
  target: HTMLElement,
  reversed: boolean,
  callback: () => void
) => {
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
export const openModal = <T>(
  state: State,
  component: Component<T & AdditionalProps>,
  props: T,
  options?: ModalOptions
): ModalID => {
  const id = getNextID(state);
  const [lc, setLC] = createSignal<ModalLifecycle>(ModalLifecycle.Unmounted);
  const modal: Item<T> = {
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
export const closeModal = (state: State, id: ModalID): boolean | undefined => {
  const i = getModal(state, id);
  if (i === undefined) return;
  const onClose = i.options.onClose;
  if (onClose && onClose() === false) return false;
  i.setLC(ModalLifecycle.Closing);
  return true;
};

/**
 * Remove a modal by ID.
 */
export const deleteModal = (state: State, id: ModalID) => {
  state.setModals((ms) => ms.filter((v) => v.id !== id));
};
