import { Injectable, Signal, inject } from '@angular/core';
import { ICollection, IPhoto } from '@app/interfaces';
import { Store } from '@ngrx/store';
import { CollectionsSelectors } from './collections.selectors';
import { CollectionsActions } from './collections.actions';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  readonly isLoading$: Signal<boolean> = this.store.selectSignal(CollectionsSelectors.selectIsLoading);
  readonly collections$: Signal<ICollection[]> = this.store.selectSignal(CollectionsSelectors.selectCollections);
  readonly photos$: Signal<IPhoto[]> = this.store.selectSignal(CollectionsSelectors.selectPhotos);
  readonly total$: Signal<number> = this.store.selectSignal(CollectionsSelectors.selectTotal);

  loadCollections(pageIndex: number = 0, perPage: number = 10) {
    this.store.dispatch(CollectionsActions.loadCollections({ page: ++pageIndex, perPage }));
  }

  listCollectionPhotos(collectionId: string) {
    this.store.dispatch(CollectionsActions.loadCollectionPhotos({ collectionId }));
  }
}
