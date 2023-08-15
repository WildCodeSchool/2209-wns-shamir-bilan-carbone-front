import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home display", () => {
  it("should display", () => {
    render(<Home />);

    expect(screen.getByText(/Just Reduce/i)).toBeInTheDocument();
  });
});
