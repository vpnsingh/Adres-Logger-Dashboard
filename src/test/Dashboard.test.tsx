import { render, screen } from "@testing-library/react"
import Dashboard from "../pages/Dashboard";

test("Renders Task Label", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText("Search Logger:");
  expect(linkElement).toBeInTheDocument();
});