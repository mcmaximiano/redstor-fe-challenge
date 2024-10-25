import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollections from './collections.reducer';

export namespace CollectionsSelectors {
  export const selectCollectionsFeature = createFeatureSelector<fromCollections.State>(fromCollections.collectionsFeatureKey);
  export const selectIsLoading = createSelector(selectCollectionsFeature, (state: fromCollections.State) => state.isLoading);
  export const selectCollections = createSelector(selectCollectionsFeature, (state: fromCollections.State) => state.collections);
  export const selectPhotos = createSelector(selectCollectionsFeature, (state: fromCollections.State) => state.photos);
  export const selectTotal = createSelector(selectCollectionsFeature, (state: fromCollections.State) => state.total);
}
