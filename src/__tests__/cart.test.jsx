// snapshot testing: if something changes from the last component state then it shows fail
import { vi, expect, test  } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("snapshot with nothing in the cart", async () => {
  const {asFragment } = render(<Cart cart={[]}/>);
  expect(asFragment()).toMatchSnapshot();
})
