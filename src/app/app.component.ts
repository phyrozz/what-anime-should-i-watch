import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'what-anime-should-i-watch';
}
