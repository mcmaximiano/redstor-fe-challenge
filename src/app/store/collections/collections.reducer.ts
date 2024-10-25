import { ICollection, IPhoto } from '@app/interfaces';
import { createReducer, on } from '@ngrx/store';
import { CollectionsActions } from './collections.actions';

export const collectionsFeatureKey = 'collections';

export interface State {
  isLoading: boolean;
  collections: ICollection[];
  photos: IPhoto[];
  total: number;
}

export const initialState: State = {
  isLoading: false,
  collections: [],
  photos: [],
  total: 0,
};

export const reducer = createReducer(
  initialState,
  on(CollectionsActions.loadCollections, (state) => ({ ...state, isLoading: true })),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections, total }) => ({ ...state, collections, isLoading: false, total })),
  on(CollectionsActions.loadCollectionsFailure, (state) => ({ ...state, isLoading: false, total: 0 })),
  on(CollectionsActions.loadCollectionPhotos, (state) => ({ ...state, isLoading: true })),
  on(CollectionsActions.loadCollectionPhotosSuccess, (state, { photos, total }) => ({ ...state, photos, isLoading: false, total })),
  on(CollectionsActions.loadCollectionPhotosFailure, (state) => ({ ...state, isLoading: false, total: 0 })),
);
