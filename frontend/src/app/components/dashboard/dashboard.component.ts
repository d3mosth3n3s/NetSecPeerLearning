import { Component } from '@angular/core';
import { VulnerabilityCardComponent } from '../vulnerability-card/vulnerability-card.component';
import { vulnerabilities, vulnerability } from '../../models/vulnerabilities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [VulnerabilityCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  vulnerabilities: vulnerability[] = vulnerabilities
}
