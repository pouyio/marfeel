import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { periods } from "../../types";
import { AppBar } from "./AppBar";

describe("AppBar component works properly", () => {
  it("shows options when clicked", () => {
    render(
      <BrowserRouter>
        <AppBar title="Test" />
      </BrowserRouter>
    );

    const selectElement = screen.getByRole("button");

    periods.forEach((option) => {
      expect(screen.queryByText(option)).not.toBeInTheDocument();
    });

    fireEvent.mouseDown(selectElement);

    periods.forEach((option) => {
      expect(screen.getByTestId(`option-${option}`)).toBeInTheDocument();
    });

    expect(true).toBeTruthy();
  });
});
