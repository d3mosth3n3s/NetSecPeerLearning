import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { vulnerability } from '../../models/vulnerabilities';
import { GoodImplementationService } from '../../services/good-implementation.service';
import { BadImplementationService } from '../../services/bad-implementation.service';
import { VulnerabilityService } from '../../services/vulnerability.service';
import { Observable, of } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';

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
  public sqlResult$?: Observable<any>

  constructor(
    private goodService: GoodImplementationService,
    private badService: BadImplementationService,
    private sanitizer: DomSanitizer,
    private vulnerabilityService: VulnerabilityService
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

  getGoodSQLValue() {
    this.sqlResult$ = this.vulnerabilityService.credentials$.pipe(
      take(1),
      switchMap(creds => {
        if (creds) {
          return this.goodService.getGoodSQLValue(creds.username, creds.password).pipe(
            catchError(() => of({ success: false, message: 'Login unsuccessful' }))
          )
        }
        return of(null)
      })
    )
  }

  getBadSQLValue() {
    this.sqlResult$ = this.vulnerabilityService.credentials$.pipe(
      take(1),
      switchMap(creds => {
        if (creds) {
          return this.badService.getBadSQLValue(creds.username, creds.password).pipe(
            catchError(() => of({ success: false, message: 'Login unsuccessful' }))
          )
        }
        return of(null)
      })
    )
  }
}