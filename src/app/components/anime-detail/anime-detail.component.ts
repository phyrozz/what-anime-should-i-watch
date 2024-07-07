import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimeService } from '../../services/anime.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent implements OnInit {
  anime: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private animeService: AnimeService
  ) {
    this.anime = data;
  }

  ngOnInit(): void {
    if (this.anime && this.anime.entry && this.anime.entry.mal_id) {
      this.animeService.getAnime(this.anime.entry.mal_id).subscribe(data => {
        this.anime = data;
      });
    }
  }

  getGenresString(): string {
    return this.anime.data.genres.map((genre: any) => genre.name).join(', ');
  }

  getStudiosString(): string {
    return this.anime.data.studios.map((studio: any) => studio.name).join(', ');
  }

  getProducersString(): string {
    return this.anime.data.producers.map((producer: any) => producer.name).join(', ');
  }

  getRatingColor(): string {
    const rating = parseInt(this.anime.data.score);
    if (rating >= 8) {
      return 'text-green-600';
    } else if (rating >= 6) {
      return 'text-orange-600';
    } else {
      return 'text-red-600';
    }
  }
}
