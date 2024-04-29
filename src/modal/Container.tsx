import { Component, For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { State } from './state';

type Props = {
  state: State;
};

const Container: Component<Props> = (props) => {
  props.state;
  return (
    <div>
      <For each={props.state.modals}>
        {(modal) => <Dynamic component={modal.component} {...modal.props} />}
      </For>
    </div>
  );
};

export default Container;
