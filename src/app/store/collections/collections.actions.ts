import { ICollection } from '@app/interfaces';
import { createAction, props } from '@ngrx/store';

export namespace CollectionsActions {
  export const loadCollections = createAction('[Collections] Load Collections', props<{ page: number, perPage: number }>());
  export const loadCollectionsSuccess = createAction('[Collections] Load Collections success', (collections: ICollection[], total: number) => ({
    collections,
    total
  }));
  export const loadCollectionsFailure = createAction('[Collections] Load Collections failure');
}
