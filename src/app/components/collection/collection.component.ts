import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { SharedModule } from '../../shared/shared.module';
import { CollectionsFacade } from '../../store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, SharedModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule],
  standalone: true,
})
export class CollectionComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor(private readonly collectionsFacade: CollectionsFacade) { }

  readonly photos$ = this.collectionsFacade.photos$;
  // Done- Is there another way using new Angular features to replace rjxs. Use Angular's Signals
  readonly isLoading$ = this.collectionsFacade.isLoading$;

  ngOnInit(): void {
    this.collectionsFacade.listCollectionPhotos(this.activatedRoute.snapshot.params['collectionId']);
  }

  handleGotoPhoto(photo: IPhoto) {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId, 'photo', photo.id]);
  }
}
