import { use, useState } from "react";


export default function App() { // Grandparent 

  const [items, setItems] = useState([]) //liftup state


  function handleItems(item) {
    setItems(items => [...items, item]) //store inside of the state
    //we are using items.
  }

  function handleDelete(characId) {
    setItems(items => items.filter(items => items.id !== characId)) //delete item
  }


  function strike(id) {
    setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item)) // strike-through
  }

  function clearList() {

    const confirm = window.confirm("Are you sure you want to clear the list?")

    if (confirm) setItems([])
  }


  return (
    <div className="app">
      <Header />
      <UserForm onAdd={handleItems} /> {/*we can pass anything as a props including function*/}
      <UserPackingList items={items} onDelete={handleDelete} onToogle={strike} onClear={clearList} />
      <UserStatus items={items} />
    </div>
  )
}

function Header() {
  return (
    <h1>BackPacker</h1>
  );
}

function UserForm({ onAdd }) {
  // to store data from the form itself not the dom
  const [description, setDescription] = useState('');
  const [option, setOption] = useState(1);
  const [duration, setDuration] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; // don't proceed

    const newData = { id: Date.now(), description, option, duration, packed: false } //independent 
    console.log(newData);
    onAdd(newData)

    setDescription('');
    setOption(1);
    setDuration(1);

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <span>What are we bringing today?</span>

      <input type="text" name="text"
        placeholder="What's on your mind?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}>
      </input>

      <select value={option} onChange={(e) => setOption(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
        {/*to render array to loop until 20*/}
      </select>

      <span>duration </span>

      <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <button>Add this</button>
    </form>

  );
}

function UserPackingList({ items, onDelete, onToogle, onClear }) {
  const [sortby, setSortby] = useState('input')


  let sorted; //derived state 

  if (sortby === "input") sorted = items
  if (sortby === "description") sorted = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortby === "packed") sorted = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
  return (
    <div className="list">
      <ul>
        {sorted.map((item) => <Item items={item} onDelete={onDelete} onToogleItem={onToogle} key={item.id} />)}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sory by Packed Status</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div >
    </div>
  );
}

function Item({ items, onDelete, onToogleItem }) {
  return (
    <li>
      <input type="checkbox" value={items.packed} onChange={() => onToogleItem(items.id)} />
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.option} {items.quantity} {items.description}
      </span>
      <button onClick={() => onDelete(items.id)}>❌</button>

    </li >
  )
}


function UserStatus({ items }) {
  if (!items.length) { // derived state
    return (
      <p className="stats"><em>Are we goanna travel or what? Let's get going, come on!</em></p>
    )
  }

  const numItems = items.length;   // derive state use to calculate or track.
  const alreadyPacked = items.filter((item) => item.packed).length; // filter done
  const percentage = Math.round((alreadyPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>{percentage === 100 ? "Enjoy your trip, you are ready to go!" : `You have ${numItems} item on your list, you already packed ${alreadyPacked} (${percentage}%)`}</em>
    </footer>
  )
}
