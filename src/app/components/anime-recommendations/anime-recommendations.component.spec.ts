import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeRecommendationsComponent } from './anime-recommendations.component';

describe('AnimeRecommendationsComponent', () => {
  let component: AnimeRecommendationsComponent;
  let fixture: ComponentFixture<AnimeRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
