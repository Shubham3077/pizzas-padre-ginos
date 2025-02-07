// here's a test that all images should have an alt text for the future
import {  expect, test, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Pizza from "../Pizza.jsx"

afterEach(cleanup);

test("alt text render on image", async () => {
  const name = "My favourite pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="best pizza" image={src}/>
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
})


// one more test
test('to have default image if none is provided', async() => {
  const screen = render(
    <Pizza name='provided image' description="best pizza"  />
  )

  const img = screen.getByRole('img');
  expect(img.src).not.toBe("");
})


// vitest: mocking, snapshot, 
