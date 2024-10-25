import { Injectable, Signal, inject } from '@angular/core';
import { ICollection } from '@app/interfaces';
import { Store } from '@ngrx/store';
import { CollectionsSelectors } from './collections.selectors';
import { CollectionsActions } from './collections.actions';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  readonly collections$: Signal<ICollection[]> = this.store.selectSignal(CollectionsSelectors.selectCollections);
  readonly isLoading$: Signal<boolean> = this.store.selectSignal(CollectionsSelectors.selectIsLoading);
  readonly total$: Signal<number> = this.store.selectSignal(CollectionsSelectors.selectTotal);

  loadCollections(pageIndex: number = 0, perPage: number = 10) {
    console.log(pageIndex)
    this.store.dispatch(CollectionsActions.loadCollections({ page: ++pageIndex, perPage }));
  }
}
