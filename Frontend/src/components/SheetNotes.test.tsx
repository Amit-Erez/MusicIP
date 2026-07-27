import { test, describe, expect, beforeEach, vi, type Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import SheetNotes from "./SheetNotes";
import type { Application, Tag } from "@/types";

const mockData = {
  notes: [
    {
      id: "1",
      author: "Amit Erez",
      text: "Note 1",
      createdAt: "2026-04-14T11:00:00Z",
      tags: ["Financial"],
    },
  ],
} as Application;

describe("SheetNotes", () => {
  let setMessage: Mock;
  let createNote: Mock;
  let setConfirmDelete: Mock;
  let setSelectedTags: Mock;

  beforeEach(() => {
    setMessage = vi.fn();
    createNote = vi.fn();
    setConfirmDelete = vi.fn();
    setSelectedTags = vi.fn();

    render(
      <SheetNotes
        data={mockData}
        message={""}
        selectedTags={[]}
        setSelectedTags={setSelectedTags}
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

  test("clicking 'Add Note' calls createNote with the message and selected tags", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: /add note/i,
    });

    await user.click(button);
    expect(createNote).toHaveBeenCalledTimes(1);
    expect(createNote).toHaveBeenCalledWith("", []);
  });

  test("clicking 'Add Note' with tags selected passes them to createNote", async () => {
    const user = userEvent.setup();
    createNote.mockClear();

    render(
      <SheetNotes
        data={mockData}
        message=""
        selectedTags={["Legal"] as Tag[]}
        setSelectedTags={setSelectedTags}
        updating={false}
        setMessage={setMessage}
        createNote={createNote}
        setConfirmDelete={setConfirmDelete}
      />,
    );

    const buttons = screen.getAllByRole("button", { name: /add note/i });
    await user.click(buttons[buttons.length - 1]);

    expect(createNote).toHaveBeenCalledWith("", ["Legal"]);
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

  //*******************************************************
  //TEST 7: Renders a pill for each tag on a tagged note
  //*******************************************************

  test("renders a pill for each tag on a note that has tags", () => {
    const note = screen.getByText("Note 1").closest("article") as HTMLElement;
    const tagPill = within(note).getByText("Financial");
    expect(tagPill).toBeInTheDocument();
  });

  //*******************************************************
  //TEST 8: Clicking a tag toggle calls setSelectedTags
  //*******************************************************

  test("clicking a tag toggle calls setSelectedTags with the tag added", async () => {
    const user = userEvent.setup();
    const tagButton = screen.getByRole("button", {
      name: /^Risk$/i,
    });

    await user.click(tagButton);
    expect(setSelectedTags).toHaveBeenCalledWith(["Risk"]);
  });
});
