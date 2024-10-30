import { ICollection, IPhoto } from '@app/interfaces';
import { createAction, props } from '@ngrx/store';

export namespace CollectionsActions {
  export const loadCollections = createAction('[Collections] Load Collections', props<{ page: number, perPage: number }>());
  export const loadCollectionsSuccess = createAction('[Collections] Load Collections success', (collections: ICollection[], total: number) => ({
    collections,
    total
  }));
  export const loadCollectionsFailure = createAction('[Collections] Load Collections failure');
  export const loadCollectionPhotos = createAction('[Collections] Load Collection Photos', props<{ collectionId: any }>());
  export const loadCollectionPhotosSuccess = createAction('[Collections] Load Collection Photos success', (photos: IPhoto[], total: number) => ({
    photos,
    total
  }));
  export const loadCollectionPhotosFailure = createAction('[Collections] Load Collection Photos failure');
  export const loadCurrentPhoto = createAction('[Collections] Load Current Photo', props<{ photoId: any }>());
  export const loadCurrentPhotoSuccess = createAction('[Collections] Load Current Photo success', (photo: IPhoto) => ({ photo }));
  export const loadCurrentPhotoFailure = createAction('[Collections] Load Current Photo failure');
}
