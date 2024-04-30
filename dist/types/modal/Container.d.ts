import { Component, JSX } from 'solid-js';
import { State } from './state';
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
declare const Container: Component<Props>;
export default Container;
