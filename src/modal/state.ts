import { Accessor, Component, createSignal, Setter } from 'solid-js';
import { ModalComponent, ModalID, ModalProps, ModalPropsWithoutID } from './type';

type Item = {
  component: ModalComponent;
  props: ModalProps;
};

export type State = {
	nextID: number;
  modals: Accessor<Item[]>;
	setModals: Setter<Item[]>;
};

export const createState = (): State => {
	const [modals, setModals] = createSignal<Item[]>([]);
  return {
		nextID: 0,
    modals,
		setModals,
  };
};

const getNextID = (state: State): ModalID => {
	const id = state.nextID.toString(36)
	state.nextID++;
	return id
}

export const openModal = (
  state: State,
  component: ModalComponent,
  props: ModalPropsWithoutID
): ModalID => {
	const id = getNextID(state);
	const propsWithID: ModalProps = {
		...props,
		id,
	};
	const modal: Item = {
		component,
		props: propsWithID,
	};
	state.setModals(ms => ({...ms, modal}));
	return id;
};

export const closeModal = (
	state: State,
	id: ModalID
) => {
	state.setModals(ms => ms.filter(v => v.props.id !== id));
};
