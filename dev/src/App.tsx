import { type Component, createSignal } from 'solid-js';

import { ModalContainer } from '../../src';

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h1>Solid Sheets Demo</h1>
      <ModalContainer />
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  );
};

export default App;
