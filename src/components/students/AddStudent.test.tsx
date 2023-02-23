import React from "react";
import { render, screen } from "@testing-library/react";
import AddStudent from "./AddStudent";

test("Add Student renders correctly", () => {
  const handleClose = jest.fn();

  render(<AddStudent closeDrawer={handleClose} />);
  const singleTab = screen.getByText(/single/i);
  const bulkTab = screen.getByText(/bulk/i);
  expect(singleTab).toBeInTheDocument();
  expect(bulkTab).toBeInTheDocument();
});
