import { Injectable, inject } from '@angular/core';
import { UnsplashService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectionsActions } from './collections.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class CollectionsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly unsplash: UnsplashService = inject(UnsplashService);

  loadCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.loadCollections),
      switchMap(({ page, perPage }) =>
        this.unsplash
          .listCollections(page, perPage)
          .pipe(
            map(result =>
              result.type === 'success'
                ? CollectionsActions.loadCollectionsSuccess(result.response.results || [], result.response.total || 0)
                : CollectionsActions.loadCollectionsFailure()
            )
          )
      )
    )
  );

  loadCollectionPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.loadCollectionPhotos),
      switchMap(({ collectionId }) =>
        this.unsplash
          .listCollectionPhotos(collectionId)
          .pipe(
            map(result =>
              result.type === 'success'
                ? CollectionsActions.loadCollectionPhotosSuccess(result.response.results || [], result.response.total || 0)
                : CollectionsActions.loadCollectionPhotosFailure()
            )
          )
      )
    )
  );
}
