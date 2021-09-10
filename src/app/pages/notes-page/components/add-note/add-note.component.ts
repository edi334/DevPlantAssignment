import {Component, EventEmitter} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {INote} from "../../../../models/note";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  public addNoteForm = this._formBuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });

  saved = new EventEmitter<INote>();
  note!: INote;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _dialogRef: MatDialogRef<AddNoteComponent>,
  ) { }

  close(): void {
    this._dialogRef.close();
  }

  submit(): void {
    this.note.date = new Date();
    this.note.content = this.addNoteForm.controls.content.value;
    this.note.title = this.addNoteForm.controls.title.value;
    this.saved.emit(this.note);
    this._dialogRef.close();
  }
}
