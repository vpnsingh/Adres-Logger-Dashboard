import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

describe("Dashboard component", () => {
  it("should render dashboard component correctly", () => {
    render(
        <Router>
            <Dashboard />
        </Router>
    );
    const text = screen.getByText("Search Logger")
    expect(text).toBeInTheDocument()
  });
});