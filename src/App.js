export default function App() {
  return (
    <div className="app">
      <Header />
      <UserForm />
      <UserPackingList />
      <UserStatus />
    </div>
  )
}

function Header() {
  return (
    <h1>Hello, World</h1>
  );
}


function UserForm() {
  return (
    <div className="add-form">
      <span>Hi there this is backpacker</span>
    </div>
  );
}

function UserPackingList() {
  return (
    <div className="list">
      Hello, Traveler!
    </div>
  )
}

function UserStatus() {
  return (
    <footer className="stats">
      <em>You have (items) item on your list, you already packed (items) (items%)</em>

    </footer>
  )
}