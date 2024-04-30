import { type Component, createSignal } from 'solid-js';

import { createModalState, ModalContainer } from '../../src';

import { openExampleModal } from './ExampleModal';

const App: Component = () => {
  const state = createModalState();

  return (
    <>
      <h1>Solid Sheets Demo</h1>
      <ModalContainer state={state} />
      Click below to open modal
      <button onClick={openExampleModal(state)}>Open</button>
    </>
  );
};

export default App;
