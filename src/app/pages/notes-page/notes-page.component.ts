import {Component, OnInit} from '@angular/core';
import {INote} from "../../models/note";
import {NotesService} from "../../services/notes.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteComponent} from "./components/add-note/add-note.component";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {
  notes: INote[] = [];

  constructor(
    private readonly _notesService: NotesService,
    private readonly _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.notes = this._notesService.getAllNotes();
  }

  deleteNote(note: INote): void {
    this._notesService.removeNote(note);
    this.notes = this._notesService.getAllNotes();
  }

  addNote(): void {
    const dialogRef = this._dialog.open(AddNoteComponent);
    dialogRef.afterClosed().pipe(filter(note => note)).subscribe(note => {
      this._notesService.addNote(note);
      this.notes = this._notesService.getAllNotes();
    });
  }
}
