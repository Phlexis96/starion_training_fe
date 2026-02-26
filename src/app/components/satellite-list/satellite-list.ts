import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SatelliteService, Satellite } from '../../services/satellite.service';

@Component({
  selector: 'app-satellite-list',
  imports: [CommonModule],
  templateUrl: './satellite-list.html',
  styleUrl: './satellite-list.css',
})
export class SatelliteList implements OnInit {
  satellites: Satellite[] = [];

  constructor(private satelliteService: SatelliteService) { }

  ngOnInit(): void {
    this.fetchSatellites();
  }

  fetchSatellites(): void {
    this.satelliteService.getSatellites().subscribe({
      next: (satellites) => {
        this.satellites = satellites;
      },
      error: (error) => {
        console.error('Error fetching satellites:', error);
      },
    });
  }


}
