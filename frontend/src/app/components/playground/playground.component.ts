import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { vulnerability } from '../../models/vulnerabilities';
import { GoodImplementationService } from '../../services/good-implementation.service';
import { BadImplementationService } from '../../services/bad-implementation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-playground',
  imports: [CommonModule, FormsModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css',
})
export class PlaygroundComponent {
  @Input() vulnerability?: vulnerability
  public savedValue$?: Observable<string>

  constructor(
    private goodService: GoodImplementationService,
    private badService: BadImplementationService
  ) {}

  getStoredValue() {
    this.savedValue$ = this.goodService.getXSSValue('user-input').pipe(
      map(response => response.data.value)
    )
  }
 /* ---------- Missing Authorization ---------- */

 getStoredValue2() {
    this.savedValue$ = this.goodService.getXSSValue('user-input').pipe(
      map(response => response.data.value)
    )
  }
  
}
