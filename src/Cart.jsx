
const intl = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR"
})

export default function({cart, checkout}) {
  // props are immutable for one way binding from parent to child, only way to change the state of the parent is to pass a function like 'checkout'.
  let total = 0;
  for(let i=0; i<cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.pizzaSize];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {
          cart.map((item, index) => (
            <li key={index}>
              <span className="size">'{item.pizzaSize}'</span> - 
              <span className="type">{item.pizza.name}</span> -
              <span className="price">{item.price}</span>
            </li>
          ))
        }
      </ul>
      <p>Total is: {intl.format(total * 86.14)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  )
}
