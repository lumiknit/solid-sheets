import { Component, Show, For, JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { closeModal, State } from './state';
import Box from './Box';

type Props = {
  state: State;
  class?: string;
  style?: JSX.CSSProperties;
};

/**
 * Container of modals.
 *
 * Based on the state prop, it'll show & manager modals.
 */
const Container: Component<Props> = (props) => {
  const style: JSX.CSSProperties = {
    ...{
      position: 'absolute',
      inset: '0',
      'background-color': '#0002',
      'z-index': props.state.zIndex,
    },
    ...props.style,
  };
  return (
    <Show when={props.state.modals().length > 0}>
      <div class={`modal-container ${props.class}`} style={style}>
        <For each={props.state.modals()}>
          {(modal) => (
            <Box
              id={modal.id}
              state={props.state}
              options={modal.options}
              lc={modal.lc}
              setLC={modal.setLC}
            >
              <Dynamic
                component={modal.component}
                {...modal.props}
                close={() => closeModal(props.state, modal.id)}
              />
            </Box>
          )}
        </For>
      </div>
    </Show>
  );
};

export default Container;
