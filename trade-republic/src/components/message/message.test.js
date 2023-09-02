import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MessageComponent from "./index";

describe("MessageComponent", () => {
  test("renders message and applies animation", async () => {

    render(<MessageComponent message="Error message" type="error" />);

    const messageElement = screen.getByText("Error message");
    expect(messageElement).toBeInTheDocument();

    const messageComponent = screen.getByRole("alert");
    expect(messageComponent).toHaveClass("open");

  });
});