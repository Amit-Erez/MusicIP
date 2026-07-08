import { test, describe, expect, beforeEach, vi, type Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import ConfirmDialog from "./ConfirmDialog";
import type { Application } from "@/types";

const mockData = {
  status: "Pending",
} as Application;

describe("ConfirmDialog", () => {
  let handleConfirm: Mock;
  let setConfirmStatus: Mock;

  beforeEach(() => {
    handleConfirm = vi.fn();
    setConfirmStatus = vi.fn();

    render(
      <ConfirmDialog
        data={mockData}
        confirmStatus={true}
        appStatus={"Approved"}
        handleConfirm={handleConfirm}
        setConfirmStatus={setConfirmStatus}
      />,
    );
  });

  //*****************************************
  //TEST 1: Confirm dialog renders correctly
  //*****************************************

  test("renders confirm dialog", () => {
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText(/status will change/i)).toBeInTheDocument()
  })

  //**********************************************************
    //TEST 2: clicking 'cancel' calls handleConfirm correctly
    //**********************************************************
  
    test("clicking 'cancel' calls handleConfirm with 'no'", async () => {
      const user = userEvent.setup();
      const cancelBtn = screen.getByRole("button", {
        name: /cancel/i,
      });
      await user.click(cancelBtn);
      expect(handleConfirm).toHaveBeenCalledWith(
        "no", "Approved"
      );
    });

  //**********************************************************
    //TEST 3: clicking 'save' calls handleConfirm correctly
    //**********************************************************
  
    test("clicking 'save' calls handleConfirm with 'yes'", async () => {
      const user = userEvent.setup();
      const saveBtn = screen.getByRole("button", {
        name: /save/i,
      });
      await user.click(saveBtn);
      expect(handleConfirm).toHaveBeenCalledWith(
        "yes", "Approved"
      );
    });
});
