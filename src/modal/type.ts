import { Component } from 'solid-js';

export type ModalID = string;

export type ModalPropsWithoutID = {
  /** Callback for modal creation (before transition) */
  onCreate?: () => void;

  /** Callback for modal creation (after transition) */
  onShow?: () => void;

  /**
   * Callback for modal close. (before transition)
   *
   * @returns If false, cancel modal close.
   */
  onHide?: () => boolean;

  /** Callback for modal close (after transition) */
  onDelete?: () => void;
}

export type ModalProps = {
  /** ID of the modal */
  id: ModalID;
} & ModalPropsWithoutID;

export type ModalComponent = Component<ModalProps>;
