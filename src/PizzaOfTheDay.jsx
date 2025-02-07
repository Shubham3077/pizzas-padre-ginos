import {usePizzaOfTheDay} from './usePizzaOfTheDay.jsx'

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
})

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if(!pizzaOfTheDay) {
    return <div>...loading</div>
  }

  return (
    <div className='pizza-of-the-day'>
      <h2>Pizza of the day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>

          <p>From: {intl.format(pizzaOfTheDay.sizes.S * 86.14)}</p>
        </div>

        <img src={pizzaOfTheDay.image} alt={pizzaOfTheDay.name} className='pizza-of-the-day-image' />
      </div>
    </div>
  )
}

export default PizzaOfTheDay;
