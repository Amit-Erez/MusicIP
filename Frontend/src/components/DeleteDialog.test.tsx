import { test, describe, expect, beforeEach, vi, type Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import DeleteDialog from "./DeleteDialog";

describe("DeleteDialog", () => {
  let setConfirmDelete: Mock;
  let handleDelete: Mock;

  beforeEach(() => {
    setConfirmDelete = vi.fn();
    handleDelete = vi.fn();

    render(
      <DeleteDialog
        setConfirmDelete={setConfirmDelete}
        handleDelete={handleDelete}
        confirmDelete={{ open: true, id: "1" }}
      />,
    );
  });

  //***************************************
  //TEST 1: Delete dialog renders correctly
  //***************************************

  test("renders Delete dialog box", () => {
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/This cannot be undone/i)).toBeInTheDocument();
  });

  //**********************************************************
  //TEST 2: clicking 'cancel' calls setConfirmDelete correctly
  //**********************************************************

  test("clicking 'cancel' calls setConfirmDelete correctly", async () => {
    const user = userEvent.setup();
    const cancelBtn = screen.getByRole("button", {
      name: /cancel/i,
    });
    await user.click(cancelBtn);
    expect(setConfirmDelete).toHaveBeenCalledWith({
      open: false,
      id: "",
    });
  });

  //**********************************************************************
  //TEST 3: clicking 'delete' calls handleDelete and setConfirmDelete
  //**********************************************************************
  test("clicking 'delete' calls handleDelete and then setConfirmDelete", async () => {
    const user = userEvent.setup();
    const deleteBtn = screen.getByRole("button", {
      name: /delete/i,
    });
    await user.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(setConfirmDelete).toHaveBeenCalledWith({
        open: false,
        id: "1",
    });
  });
});
