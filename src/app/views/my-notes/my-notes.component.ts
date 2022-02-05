import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
    selector: 'app-my-notes',
    templateUrl: './my-notes.component.html',
    styleUrls: ['./my-notes.component.scss'],
})
export class MyNotesComponent implements OnInit {
    noteDate: Date;
    contentTitle: string;
    note: string;
    allNotes = [];
    userNotes = [];
    activeUser: string;

    constructor() {
        this.noteDate = null;
        this.contentTitle = '';
        this.note = '';
    }

    ngOnInit(): void {
        this.activeUser = localStorage.getItem('username');
        this.getNotes();

        if (!this.allNotes) {
            this.allNotes = [];
        }
    }

    getNotes() {
        this.allNotes = JSON.parse(localStorage.getItem('my-notes'));
        if (this.allNotes) {
            for (const note of this.allNotes) {
                if (this.activeUser === note.owner) {
                    this.userNotes.push(note);
                }
            }
        }
    }

    createNote() {
        const note: Note = {
            date: this.noteDate,
            title: this.contentTitle,
            note: this.note,
            owner: this.activeUser,
        };

        this.allNotes.push(note);
        localStorage.setItem('my-notes', JSON.stringify(this.allNotes));

        this.noteDate = null;
        this.contentTitle = this.note = '';

        /*
         * Not so smart solution, need to refactor
         */
        this.userNotes = [];
        this.getNotes();
    }
}
