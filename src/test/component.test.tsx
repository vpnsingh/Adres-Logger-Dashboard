import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import TableLayout from "../components/TableLayout";
import FormInputs from "../components/FormInputs";

describe("Table component", () => {
  it("should render table component correctly", () => {
    render(<TableLayout />);
    const text = screen.getByText("Action")
    expect(text).toBeInTheDocument()
    const tableTag = screen.getByRole("table")
    expect(tableTag).toBeInTheDocument()
    expect(tableTag).toHaveClass('table')
    expect(tableTag).toHaveTextContent('Application Type');
  });
});

describe("Form Input component", () => {
  it("should render form input component correctly", () => {
    render(
      <Router>
        <FormInputs />
      </Router>
    );
    const label = screen.getByLabelText('Log ID')
    expect(label).toBeVisible()
  });
});