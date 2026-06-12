import { useState } from "react";


export default function App() { // Grandparent 
  const [items, setItems] = useState([])




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


  return (
    <div className="app">
      <Header />
      <UserForm onAdd={handleItems} /> {/*we can pass anything as a props including function*/}
      <UserPackingList items={items} onDelete={handleDelete} onToogle={strike} />
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

    if (!description) return;

    const newData = { id: Date.now(), description, option, duration, packed: false }
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

function UserPackingList({ items, onDelete, onToogle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => <Item items={item} onDelete={onDelete} onToogleItem={onToogle} key={item.id} />)}
      </ul>
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
    </li>
  )
}


function UserStatus({ items }) {
  if (!items.length) {
    return (
      <p className="stats"><em>Hey you goatta add something here, I'm kinda lonely!</em></p>
    )
  }

  const numItems = items.length;   // derive state use to calculate or track.
  const alreadyPacked = items.filter((item) => item.packed).length; // filter done
  const percentage = Math.round((alreadyPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>{percentage === 100 ? "you are ready to go!" : `You have ${numItems} item on your list, you already packed ${alreadyPacked} (${percentage}%)`}</em>
    </footer>
  )
}
