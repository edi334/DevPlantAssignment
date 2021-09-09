import { Component, OnInit } from '@angular/core';
import {INote} from "../../models/note";
import {NotesService} from "../../services/notes.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteComponent} from "./components/add-note/add-note.component";

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {
  notes: INote[] = [];

  constructor(
    private readonly notesService: NotesService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAllNotes();
  }

  deleteNote(note: INote): void {
    this.notesService.removeNote(note);
    this.notes = this.notesService.getAllNotes();
  }

  addNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent);
    dialogRef.componentInstance.saved.subscribe(note => {
      this.notesService.addNote(note);
      this.notes = this.notesService.getAllNotes();
    })
  }
}
