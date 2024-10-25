import { ICollection } from '@app/interfaces';
import { createReducer, on } from '@ngrx/store';
import { CollectionsActions } from './collections.actions';

export const collectionsFeatureKey = 'collections';

export interface State {
  isLoading: boolean;
  collections: ICollection[];
}

export const initialState: State = {
  isLoading: false,
  collections: []
};

export const reducer = createReducer(
  initialState,
  on(CollectionsActions.loadCollections, (state) => ({ ...state, isLoading: true })),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections }) => ({ ...state, collections, isLoading: false })),
  on(CollectionsActions.loadCollectionsFailure, (state) => ({ ...state, isLoading: false }))
);
