
import React from "react";
import {covertDateFormat} from "../HelperFunction";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"

test("convert date format", () => {
    expect(covertDateFormat(new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"))).toBe("2018-2-7")
})
