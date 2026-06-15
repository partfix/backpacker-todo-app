import { useState } from 'react';
import Item from './Item';

export default function UserPackingList({
	items,
	onDelete,
	onToogle,
	onClear,
}) {
	const [sortby, setSortby] = useState('input');

	let sorted; //derived state

	if (sortby === 'input') sorted = items;
	if (sortby === 'description')
		sorted = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortby === 'packed')
		sorted = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
	return (
		<div className='list'>
			<ul>
				{sorted.map(item => (
					<Item
						items={item}
						onDelete={onDelete}
						onToogleItem={onToogle}
						key={item.id}
					/>
				))}
			</ul>
			<div className='actions'>
				<select value={sortby} onChange={e => setSortby(e.target.value)}>
					<option value='input'>Sort by Input</option>
					<option value='description'>Sort by Description</option>
					<option value='packed'>Sory by Packed Status</option>
				</select>
				<button onClick={onClear}>Clear list</button>
			</div>
		</div>
	);
}
