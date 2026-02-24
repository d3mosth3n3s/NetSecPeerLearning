import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { vulnerability } from '../../models/vulnerabilities';
import { GoodImplementationService } from '../../services/good-implementation.service';
import { BadImplementationService } from '../../services/bad-implementation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-playground',
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css',
})
export class PlaygroundComponent {
  @Input() vulnerability?: vulnerability
  @Input() isGoodImplementation: boolean = true
  public savedValue$?: Observable<string>
  public badSavedValue$?: Observable<SafeHtml>

  constructor(
    private goodService: GoodImplementationService,
    private badService: BadImplementationService,
    private sanitizer: DomSanitizer
  ) {}

  getGoodXSSValue() {
    this.savedValue$ = this.goodService.getGoodXSSValue('user-input').pipe(
      map(response => response.data.value)
    )
  }

  getBadXSSValue() {
    this.badSavedValue$ = this.badService.getBadXSSValue('user-input-bad').pipe(
      map(response => this.sanitizer.bypassSecurityTrustHtml(response.data.value))
    )
  }
}
