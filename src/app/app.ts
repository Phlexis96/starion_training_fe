import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SatelliteList } from "./components/satellite-list/satellite-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SatelliteList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('starion-training-fe');
}
