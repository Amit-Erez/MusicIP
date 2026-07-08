import { test, describe, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SheetStatus from "./SheetStatus";
import type { Application } from "@/types";

const mockData = {
  status: "Pending",
} as Application;

describe("SheetStatus", () => {
  let handleSave: Mock;
  let setAppStatus: Mock;

  beforeEach(() => {
    handleSave = vi.fn();
    setAppStatus = vi.fn();
    render(
      <SheetStatus
        data={mockData}
        setAppStatus={setAppStatus}
        handleSave={handleSave}
        appStatus="Pending"
      />,
    );
  });

  // ********************************
  // TEST 1: 'Save Button' renders //
  // ********************************

  test("renders the Save Status button", () => {
    const button = screen.getByRole("button", {
      name: /save status/i,
    });
    expect(button).toBeInTheDocument();
  });

  // ****************************************************
  // TEST 2: Select menu calls setAppStatus on change //
  // ****************************************************

  test("select menu calls setAppStatus when changed", async () => {
    const user = userEvent.setup();

    const select = screen.getByRole("combobox", {
      name: /application status/i,
    }) as HTMLSelectElement;

    await user.selectOptions(select, "Approved");

    expect(setAppStatus).toHaveBeenCalledWith("Approved");
  });

  // *******************************************************
  // TEST 23: clicking Save Status should call handleSave //
  // *******************************************************

  test("clicking Save Status should call handleSave", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", {
        name: /save status/i
    });

    await user.click(button);
    expect(handleSave).toHaveBeenCalledTimes(1)
  })

});
