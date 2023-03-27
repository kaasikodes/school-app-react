import { screen, render } from "@testing-library/react";

describe("ErrorComp", () => {
  test("Renders properlt", () => {
    render(<div>Students</div>);
    const comp = screen.getByText("Students");
    expect(comp).toBeInTheDocument();
  });
});
