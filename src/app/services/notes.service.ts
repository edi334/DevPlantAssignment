import { Injectable } from '@angular/core';
import {INote} from "../models/note";
import {not} from "rxjs/internal-compatibility";

const NOTES = 'notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  getAllNotes() : INote[] {
    return JSON.parse(localStorage.getItem(NOTES) || '[]') as INote[];
  }

  addNote(note: INote): void {
    const newNotes = this.getAllNotes();
    newNotes.push(note);
    localStorage.setItem(NOTES, JSON.stringify(newNotes));
  }

  removeNote(note: INote): void {
    let newNotes = this.getAllNotes();
    newNotes = newNotes.filter(n => !this.areEqual(n, note));
    localStorage.setItem(NOTES, JSON.stringify(newNotes));
  }

  private areEqual(note1: INote, note2: INote): boolean {
    if (note1.title !== note2.title) return false;
    if (note2.content !== note2.content) return false;
    return note1.date === note2.date;
  }
}
