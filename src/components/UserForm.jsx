import { useState } from 'react';

export default function UserForm({ onAdd }) {
	// to store data from the form itself not the dom
	const [description, setDescription] = useState('');
	const [option, setOption] = useState(1);
	const [duration, setDuration] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();

		if (!description) return; // don't proceed

		const newData = {
			id: Date.now(),
			description,
			option,
			duration,
			packed: false,
		}; //independent
		console.log(newData);
		onAdd(newData);

		setDescription('');
		setOption(1);
		setDuration(1);
	}

	return (
		<form className='add-form' onSubmit={handleSubmit}>
			<span>What are we bringing today?</span>

			<input
				type='text'
				name='text'
				placeholder="What's on your mind?"
				value={description}
				onChange={e => setDescription(e.target.value)}></input>

			<select value={option} onChange={e => setOption(Number(e.target.value))}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
				{/*to render array to loop until 20*/}
			</select>

			<span>duration </span>

			<select value={duration} onChange={e => setDuration(Number(e.target.value))}>
				{Array.from({ length: 31 }, (_, i) => i + 1).map(num => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<button>Add this</button>
		</form>
	);
}
