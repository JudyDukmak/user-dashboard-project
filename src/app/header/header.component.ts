import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() searchTerm = new EventEmitter<string>();  // Emit search term to the parent
  searchControl = new FormControl();  // Reactive form control for search input

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))  // Wait for 300ms after the last keystroke before emitting
      .subscribe(term => this.searchTerm.emit(term));  // Emit the search term to the parent
  }
}
