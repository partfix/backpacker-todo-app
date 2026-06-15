import { useState } from 'react';
import Header from './design/logo';
import UserForm from './components/UserForm';
import UserPackingList from './components/UserPackingList';
import UserStatus from './components/UserStatus';

export default function App() {
	// Grandparent

	const [items, setItems] = useState([]); //liftup state

	function handleItems(item) {
		setItems(items => [...items, item]); //store inside of the state
		//we are using items.
	}

	function handleDelete(characId) {
		setItems(items => items.filter(items => items.id !== characId)); //delete item
	}

	function strike(id) {
		setItems(items =>
			items.map(item =>
				item.id === id ? { ...item, packed: !item.packed } : item,
			),
		); // strike-through
	}

	function clearList() {
		const confirm = window.confirm('Are you sure you want to clear the list?');

		if (confirm) setItems([]);
	}

	return (
		<div className='app'>
			<Header />
			<UserForm onAdd={handleItems} />{' '}
			{/*we can pass anything as a props including function*/}
			<UserPackingList
				items={items}
				onDelete={handleDelete}
				onToogle={strike}
				onClear={clearList}
			/>
			<UserStatus items={items} />
		</div>
	);
}
