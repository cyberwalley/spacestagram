import React from "react";
import {HeroImage} from "../HeroImage";
import {render} from "@testing-library/react"
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"

test("heading renders with correct text", () => {
  const { getByRole } = render(<HeroImage />);
  const headingEl = getByRole('heading', {level: 1})

  expect(headingEl.textContent).toBe("Photo of the day")
})

test("subheading renders with correct text", () => {
  const { getByTestId } = render(<HeroImage />);
  const subHeading = getByTestId("sub_heading");

  expect(subHeading.textContent).toBe("Brought to you by NASA's Image API")
})