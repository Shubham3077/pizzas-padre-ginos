// custom hook is just a function that calls other hooks, 

import { useEffect, useState, useDebugValue } from "react"

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.id}` : "Loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      let res = await fetch('api/pizza-of-the-day');
      let pizza = await res.json()
      setPizzaOfTheDay(pizza);

      // return setPizzaOfTheDay(pizza);  
    }
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
}
