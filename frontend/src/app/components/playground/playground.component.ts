import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(
    private goodService: GoodImplementationService,
    private badService: BadImplementationService
  ) {}

  getStoredValue() {
    this.savedValue$ = this.goodService.getXSSValue('user-input').pipe(
      map(response => response.data.value)
    )
  }

  downloadFile() {
    const id = 'user-input'

    const obs = this.isGoodImplementation
      ? this.goodService.goodGetFile(id)
      : this.badService.badGetFile(id)

    obs.subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'downloaded'
        a.click()
        window.URL.revokeObjectURL(url)
      },
      err => console.error('Error downloading file', err)
    )
  }
}
