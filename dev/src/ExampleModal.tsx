import { Component } from 'solid-js';
import { ModalState, openModal } from '../../src';

type ExampleModalProps = {
  state: ModalState;
  name: string;
  close: () => void;
};

const ExampleModal: Component<ExampleModalProps> = (props) => {
  return (
    <div class="my-modal">
      <h1> Example Modal </h1>
      <h2> Name: {props.name} </h2>

      <button onClick={openExampleModal(props.state)}>
        Open New Modal in Modal
      </button>
      <button onClick={props.close}>Close itself</button>
    </div>
  );
};

export const openExampleModal = (state: ModalState) => () => {
  const id = openModal(
    state,
    ExampleModal,
    {
      name: 'Hello',
      state: state,
    },
    {
      onCreate: () => console.log('Created!'),
      onOpened: () => console.log('Open!'),
      onClose: () => {
        console.log('Closing');
        return true;
      },
      onDelete: () => console.log('Deleted!'),
    }
  );
};
