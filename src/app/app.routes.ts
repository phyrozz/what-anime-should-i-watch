import { Routes } from '@angular/router';
import { AnimeRecommendationsComponent } from './components/anime-recommendations/anime-recommendations.component';
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';

export const routes: Routes = [
  { path: '', component: AnimeRecommendationsComponent },
  { path: 'anime/:id', component: AnimeDetailComponent }
];
