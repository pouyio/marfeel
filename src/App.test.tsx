import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders app properly", () => {
  it("Renders without crashing showing the title", () => {
    render(<App />);
    expect(screen.getByText("Traffic")).toBeTruthy();
  });
});
