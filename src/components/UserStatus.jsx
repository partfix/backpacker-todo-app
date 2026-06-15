export default function UserStatus({ items }) {
	if (!items.length) {
		// derived state
		return (
			<p className='stats'>
				<em>Are we goanna travel or what? Let's get going, come on!</em>
			</p>
		);
	}

	const numItems = items.length; // derive state use to calculate or track.
	const alreadyPacked = items.filter(item => item.packed).length; // filter done
	const percentage = Math.round((alreadyPacked / numItems) * 100);

	return (
		<footer className='stats'>
			<em>
				{percentage === 100 ?
					'Enjoy your trip, you are ready to go!'
				:	`You have ${numItems} item on your list, you already packed ${alreadyPacked} (${percentage}%)`
				}
			</em>
		</footer>
	);
}
