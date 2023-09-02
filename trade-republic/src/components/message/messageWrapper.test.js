import React from "react";
import { render, screen } from "@testing-library/react";
import MessageWrapper from "./messageWrapper";

const mockToasts = [
  { id: 1, message: "Error 1" },
  { id: 2, message: "Error 2" },
  { id: 3, message: "Error 3" },
];

test.only("renders MessageComponents with correct messages", () => {

    render(<MessageWrapper toasts={mockToasts} />);

    mockToasts.forEach((toast) => {
        const messageElement = screen.getByText(toast.message);
        expect(messageElement).toBeInTheDocument();
    });
});
