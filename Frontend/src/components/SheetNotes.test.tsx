import { test, describe, expect, beforeEach, vi, type Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SheetNotes from "./SheetNotes";
import type { Application } from "@/types";

const mockData = {
  notes: [
    {
      id: "1",
      author: "Amit Erez",
      text: "Note 1",
      createdAt: "2026-04-14T11:00:00Z",
    },
  ],
} as Application;

describe("SheetNotes", () => {
  let setMessage: Mock;
  let createNote: Mock;
  let setConfirmDelete: Mock;

  beforeEach(() => {
    setMessage = vi.fn();
    createNote = vi.fn();
    setConfirmDelete = vi.fn();

    render(
      <SheetNotes
        data={mockData}
        message={""}
        updating={false}
        setMessage={setMessage}
        createNote={createNote}
        setConfirmDelete={setConfirmDelete}
      />,
    );
  });

  //********************************
  //TEST 1: Sheetnotes renders notes
  //********************************

  test("renders existing notes", () => {
    const note = screen.getByText("Note 1");
    expect(note).toBeInTheDocument();
  });

  //********************************************
  //TEST 2: Sheetnotes renders 'Add Note' button
  //********************************************

  test("renders 'Add Note' button", () => {
    const button = screen.getByRole("button", {
      name: /add note/i,
    });
    expect(button).toBeInTheDocument();
  });

  //********************************************
  //TEST 3: Sheetnotes renders 'Delete' button
  //********************************************

  test("renders 'Delete' button", () => {
    const button = screen.getByRole("button", {
      name: /delete/i,
    });
    expect(button).toBeInTheDocument();
  });

  //*********************************************
  //TEST 4: Typing in text area calls setMessage
  //*********************************************

  test("when user types, setMessage is called", async () => {
    const user = userEvent.setup();
    const textarea = screen.getByRole("textbox", {
      name: /Add an internal note/i,
    }) as HTMLTextAreaElement;

    await user.type(textarea, "Note 2");
    expect(setMessage).toHaveBeenCalledTimes(6);
  });

  //*********************************************
  //TEST 5: Clicking 'Add Note' calls createNote
  //*********************************************

  test("clicking 'Add Note' calls createNote", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: /add note/i,
    });

    await user.click(button);
    expect(createNote).toHaveBeenCalledTimes(1);
  });

  //*************************************************
  //TEST 6: Clicking 'Delete' calls setConfirmDelete
  //************************************************

  test("Clicking 'Delete' calls setConfirmDelete correctly", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: /delete/i,
    });
    await user.click(button);
    expect(setConfirmDelete).toHaveBeenCalledWith({
      open: true,
      id: "1",
    });
  });
});
