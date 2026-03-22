export default function App() {
  return (
    <div>
      <Header />
      <Form />
    </div>
  )
}

function Header() {
  return (
    <p>Hello, World</p>
  );
}


function Form() {
  return (
    <div className="add-form">
      <span>Hi there this is backpacker</span>
    </div>
  );
}