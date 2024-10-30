import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CollectionsFacade } from '../../store';
import { FormatPhotoDescriptionPipe } from '../../pipes/format-photo-description.pipe';

// Done-toDo Is there a way to improve the rendering strategy in this component? Use changeDetection
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule, SharedModule, FormatPhotoDescriptionPipe],
  standalone: true,
  styleUrl: './photo.component.scss',
})
export class PhotoComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor(private readonly collectionsFacade: CollectionsFacade) { }

  readonly photo = this.collectionsFacade.photo$;
  readonly isLoading = this.collectionsFacade.isLoading$;

  ngOnInit(): void {
    this.collectionsFacade.loadPhoto(this.activatedRoute.snapshot.params['photoId']);
  }

  handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  }
}
