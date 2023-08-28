import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddIsinForm from "./index";

const mockAddToWatchList = jest.fn();

jest.mock("../../context/WatchListContext", () => ({
  useWatchList: () => ({
    addToWatchList: mockAddToWatchList,
  }),
}));

test("renders AddIsinForm correctly", () => {
  render(<AddIsinForm />);
  
  const inputElement = screen.getByPlaceholderText("Please enter ISIN");
  const buttonElement = screen.getByText("Subscribe");
  
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("submits form and calls addToWatchList on submit", () => {
  render(<AddIsinForm />);
  
  const inputElement = screen.getByPlaceholderText("Please enter ISIN");
  const submitButton = screen.getByText("Subscribe");

  fireEvent.change(inputElement, { target: { value: "DE000BASF111" } });
  fireEvent.click(submitButton);

  expect(mockAddToWatchList).toHaveBeenCalledWith("DE000BASF111");
  expect(inputElement.value).toBe("");
});
