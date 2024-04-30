import { Accessor, Component, JSX, Setter } from 'solid-js';
import { State } from './state';
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
declare const Box: Component<Props>;
export default Box;
