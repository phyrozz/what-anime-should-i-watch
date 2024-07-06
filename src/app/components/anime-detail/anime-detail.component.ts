import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimeService } from '../../services/anime.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
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
}
