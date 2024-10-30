import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UnsplashService } from '@app/services';
import { SharedModule } from '../../shared/shared.module';
import { CollectionsFacade } from '../../store';
import { TranslateModule } from '@ngx-translate/core';

// Done- Transform this module in a standalone component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, SharedModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatPaginatorModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  readonly unsplashService: UnsplashService = inject(UnsplashService);

  constructor(private readonly collectionsFacade: CollectionsFacade) { }

  // Answered- Why the changes are not reflected in the UI? ChangeDetectionStrategy.OnPush. We should use the facade's signals to detect changes
  isLoading$ = this.collectionsFacade.isLoading$;
  collections$ = this.collectionsFacade.collections$;
  total$ = this.collectionsFacade.total$;

  ngOnInit(): void {
    // Answered- What's happening with this subscription in case the component is destroyed? The subscription lingers, which can lead to memory leaks and weird behavior of the component
    // Done- Is there another way to do this operation? We can offload the responsibility to the collectionsFacade
    this.collectionsFacade.loadCollections();
  }

  // Done- Could we add a pagination?
  // Handle user interactions with the paginator
  handlePageEvent(event: PageEvent) {
    this.collectionsFacade.loadCollections(event.pageIndex, event.pageSize);
  }
}
