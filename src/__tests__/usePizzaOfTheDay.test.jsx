import { vi, expect, test } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import createFetchMock from 'vitest-fetch-mock';
import {usePizzaOfTheDay} from '../usePizzaOfTheDay';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "Calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "A nice pizza",
  image: '/public/pizzas/calabrese.webp',
  sizes: {S: 12.25, M: 15.45, L: 17.75} 
}

function getPizzaOfTheDay() {
  let pizza;

  // function just to mimic component, and utilize custom hook
  function TestComponent() {
    pizza = usePizzaOfTheDay();
    return null;
  }

  render(<TestComponent/>); // does nothing(fake)
  return pizza;
}

// all the above code can be done using renderHook function inside the test

test("gives null when we first call", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const pizza = getPizzaOfTheDay();
  expect(pizza).toBeNull();

  // const {result} = renderHook(() => usePizzaOfTheDay()) 
  // expect(result.current).toBeNull(); // without the above component
})

test("to call the API and give back the pizza of the day", async () => {
  fetch.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay(""));
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  // expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
