# solid-sheets

Modal / sheets helper for SolidJS

## Example

### Install

```bash
pnpm add https://github.com/lumiknit/solid-sheets
```

### Modal

```jsx
import { ModalContainer, createModalState, openModal } from 'solid-sheets';

const MyModal = props => {
	return <div>
		<h1> My Modal </h1>
		<button onClick={props.close()}> Close itself </button>
	</div>;
};

const openMyModal = state =>
	openModal(MyModal, {}, {
		onOpened: () => console.log("Modal opened!"),
	});

const App = () => {
	const modalState = createModalState();
	return <div>
		{/* ... */}
		<ModalContainer state={modalState} />
		<button onClick={() => openMyModal(modalState)}> Click! </button>
		{/* ... */}
	</div>;
};
```
