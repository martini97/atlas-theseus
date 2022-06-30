import { render, screen } from "@testing-library/react";
import Root from "./root.component";

describe("Root component", () => {
  const props = { name: "Testapp" };

  it("should be in the document", () => {
    render(<Root {...props} />);

    const title = screen.getByText(props.name);

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("href", "/");
  });
});
