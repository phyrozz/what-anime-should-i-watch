import { Component, EventEmitter, Output } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchAutocompleteComponent {
  searchControl = new FormControl();
  filteredOptions: Observable<any[]> = of([]);

  @Output() animeSelected = new EventEmitter<any>();

  constructor(private animeService: AnimeService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => typeof value === 'string' && value ? this.fetchAnime(value) : of([]))
    );
  }

  fetchAnime(query: string): Observable<any[]> {
    return this.animeService.searchAnime(query).pipe(
      catchError(() => of([])),
      switchMap(data => of(data.data))
    );
  }

  onOptionSelected(event: any) {
    const selectedAnime = event.option.value;
    this.animeSelected.emit(selectedAnime);
    // Set the value of the search control to the anime title
    this.searchControl.setValue(selectedAnime.title, { emitEvent: false });
  }

  displayFn(anime: any): string {
    return anime ? anime.title : '';
  }
}
