export default function Item({ items, onDelete, onToogleItem }) {
	return (
		<li>
			<input
				type='checkbox'
				value={items.packed}
				onChange={() => onToogleItem(items.id)}
			/>
			<span style={items.packed ? { textDecoration: 'line-through' } : {}}>
				{items.option} {items.quantity} {items.description}
			</span>
			<button onClick={() => onDelete(items.id)}>❌</button>
		</li>
	);
}
