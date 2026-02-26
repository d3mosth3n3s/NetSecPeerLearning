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

  currentUser = {
    id: 2 // change to 1–4 to test
  };

  posts = [
    { userId: 1, content: 'Post written by User 1' },
    { userId: 2, content: 'Post written by User 2' },
    { userId: 3, content: 'Post written by User 3' },
    { userId: 4, content: 'Post written by User 4' }
  ];

  canEdit(post: any): boolean {
    return post.userId === this.currentUser.id;
  }

  savePost(post: any) {
    if (!this.canEdit(post)) return;
    // simulate persistence
    console.log('Saved post:', post);
  }
  
}
