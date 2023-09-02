import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WatchListComponent, { WatchListItemComponent } from "./index";

const mockRemoveFromWatchList = jest.fn();

jest.mock("../../context/WatchListContext", () => ({
  useWatchList: () => ({
    watchList: [
      { isin: "DE000BASF111", price: 100, date: new Date() },
      { isin: "US123456789", price: 200, date: new Date() },
    ],
    removeFromWatchList: mockRemoveFromWatchList,
  }),
}));

describe("WatchListItemComponent", () => {
  test("renders WatchListItemComponent with correct data", () => {
    render(
      <WatchListItemComponent
        data={{ isin: "DE000BASF111", price: 100, date: new Date() }}
      />
    );

    const isinElement = screen.getByText("DE000BASF111");
    const priceElement = screen.getByText("price: 100.000");
    expect(isinElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

});

describe("WatchListComponent", () => {
  test("renders WatchListComponent with mock data", () => {
    render(
        <WatchListComponent />
    );

    const isinElement = screen.getByText("DE000BASF111");
    const priceElement = screen.getByText("price: 100.000");
    expect(isinElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  test("calls removeFromWatchList when Unsubscribe button is clicked", () => {
    render(
        <WatchListComponent />
    );

    const unsubscribeButtons = screen.getAllByText("Unsubscribe");
    fireEvent.click(unsubscribeButtons[0]);

    expect(mockRemoveFromWatchList).toHaveBeenCalledWith("DE000BASF111");
  });
});
