import {
  Accessor,
  Component,
  createEffect,
  JSX,
  onMount,
  Setter,
} from 'solid-js';
import { closeModal, deleteModal, State, animate, ANIMATION_ID } from './state';
import { ModalID, ModalLifecycle, ModalOptions } from './type';

type Props = {
  state: State;
  id: ModalID;

  options: ModalOptions;

  lc: Accessor<ModalLifecycle>;
  setLC: Setter<ModalLifecycle>;

  children: JSX.Element | JSX.Element[];
};

/**
 * The wrapper of modal body.
 * - If outside of modal is clicked, trigger close.
 * - Place modal at proper position
 * - Manage modal's lifecycle.
 */
const Box: Component<Props> = (props) => {
  let ref: HTMLDivElement;

  const style: JSX.CSSProperties = {
    position: 'absolute',
    inset: '0',
  };

  const handleClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (e) => {
    if (e.target === ref) {
      closeModal(props.state, props.id);
    }
  };

  createEffect(() => {
    const ms = props.lc();
    switch (ms) {
      case ModalLifecycle.Opening:
        props.options.onCreate?.();
        // Set animation
        animate(props.state, ref, false, () => {
          props.setLC(ModalLifecycle.Opened);
        });
        break;
      case ModalLifecycle.Opened:
        props.options.onOpened?.();
        break;
      case ModalLifecycle.Closing:
        animate(props.state, ref, true, () => {
          props.setLC(ModalLifecycle.Closed);
        });
        break;
      case ModalLifecycle.Closed:
        deleteModal(props.state, props.id);
        props.options.onDelete?.();
        break;
    }
  });

  onMount(() => {
    props.setLC(ModalLifecycle.Opening);
  });

  return (
    <div ref={ref!} class="modal-box" style={style} onClick={handleClick}>
      {props.children}
    </div>
  );
};

export default Box;
