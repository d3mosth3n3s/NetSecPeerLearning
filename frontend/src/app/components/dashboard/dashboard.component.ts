import { Component, OnInit } from '@angular/core';
import { VulnerabilityCardComponent } from '../vulnerability-card/vulnerability-card.component';
import { vulnerability } from '../../models/vulnerabilities';
import { CommonModule } from '@angular/common';
import { VulnerabilityService } from '../../services/vulnerability.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [VulnerabilityCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  vulnerabilities$!: Observable<vulnerability[]>

  constructor(private _vulnService: VulnerabilityService) {}

  ngOnInit(): void {
    this.vulnerabilities$ = this._vulnService.getVulnerabilities()
  }
}
