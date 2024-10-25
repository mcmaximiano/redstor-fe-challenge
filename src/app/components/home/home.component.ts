import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ICollection } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CollectionsActions, CollectionsFacade, CollectionsSelectors } from '../../store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

// Done-toDo Transform this module in a standalone component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatPaginatorModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  readonly unsplashService: UnsplashService = inject(UnsplashService);

  constructor(
    private readonly collectionsFacade: CollectionsFacade
  ) { }

  // Answered-toDo Why the changes are not reflected in the UI? ChangeDetectionStrategy.OnPush. We should use the facade's signals to detect changes
  isLoading$ = this.collectionsFacade.isLoading$;
  collections$ = this.collectionsFacade.collections$;
  total$ = this.collectionsFacade.total$;

  ngOnInit(): void {
    // Answered-toDo What's happening with this subscription in case the component is destroyed? The subscription lingers, which can lead to memory leaks and weird behavior of the component
    // Done-toDo Is there another way to do this operation? We can offload the responsibility to the collectionsFacade
    this.collectionsFacade.loadCollections();
  }

  // Done-toDo Could we add a pagination?
  // Handle user interactions with the paginator
  handlePageEvent(event: PageEvent) {
    console.log(event)
    this.collectionsFacade.loadCollections(event.pageIndex, event.pageSize);
  }
}
