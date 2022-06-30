import { render, screen, fireEvent } from "@testing-library/react";
import { hello } from "@olympus/cerberus";

import Root from "./root.component";

describe("Root component", () => {
  const props = { name: "Testapp" };

  it("should be in the document", () => {
    render(<Root {...props} />);

    const title = screen.getByText(props.name);

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("href", "/");
  });

  it("clicking the button calls hello", () => {
    render(<Root {...props} />);

    const button = document.querySelector("button");

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(hello).toHaveBeenCalled();
  });
});
