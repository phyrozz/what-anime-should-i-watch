import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AnimeDetailComponent } from '../anime-detail/anime-detail.component';
import { SearchAutocompleteComponent } from '../search-autocomplete/search-autocomplete.component';

@Component({
  selector: 'app-anime-recommendations',
  templateUrl: './anime-recommendations.component.html',
  styleUrls: ['./anime-recommendations.component.css'],
  standalone: true,
  imports: [
    MatListModule, 
    RouterLink, 
    MatIconModule, 
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatProgressSpinnerModule, 
    MatDialogModule,
    SearchAutocompleteComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimeRecommendationsComponent implements OnInit {
  recommendations: any[] = [];
  animeName: string = '';
  currentAnimeIndex: number = 0;
  loading: boolean = false;
  readonly animeDetailDialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void { }

  fetchRecommendations(): void {
    if (this.animeName.trim()) {
      this.loading = true;
      this.cdr.markForCheck();
      this.animeService.searchAnime(this.animeName).subscribe(data => {
        const anime = data.data[0];
        if (anime) {
          this.animeService.getRecommendations(anime.mal_id).subscribe(data => {
            this.recommendations = data.data;
            this.currentAnimeIndex = 0;
            this.loading = false;
            this.cdr.markForCheck();
          });
        }
      });
    }
  }

  onAnimeSelected(anime: any): void {
    this.animeName = anime.title;
    this.fetchRecommendations();
  }

  nextAnime(): void {
    if (this.currentAnimeIndex < this.recommendations.length - 1) {
      this.currentAnimeIndex++;
    }
  }

  prevAnime(): void {
    if (this.currentAnimeIndex > 0) {
      this.currentAnimeIndex--;
    }
  }

  openAnimeDetailDialog(anime: any): void {
    this.animeDetailDialog.open(AnimeDetailComponent, {
      data: anime
    });
  }
}
