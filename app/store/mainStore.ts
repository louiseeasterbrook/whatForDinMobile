import {createContext, useContext} from 'react';
import {types, Instance} from 'mobx-state-tree';
import {cast} from 'mobx-state-tree';
import {RecipeTag} from '../models/searchResults';

//STORE

export const RecipeTagModel = types.model('RecipeTagModel').props({
  Title: types.optional(types.string, ''),
  Icon: types.optional(types.string, ''),
  Colour: types.optional(types.string, ''),
  Id: types.optional(types.string, ''),
});

export const MainStore = types
  .model('MainStore')
  .props({
    name: types.optional(types.string, ''),
    uid: types.optional(types.string, ''),
    favourites: types.array(types.string),
    recipeTags: types.array(RecipeTagModel),
  })

  .actions(self => ({
    setUserInfo: (name: string, uid: string): void => {
      self.name = name;
      self.uid = uid;
    },
    setUserName: (name: string): void => {
      self.name = name;
    },
    setFavourites: (fav: string[]): void => {
      self.favourites = cast(fav);
    },
    setRecipeTags: (tags: RecipeTag[]): void => {
      if (!tags) {
        return;
      }
      console.log('rec  ', tags);
      self.recipeTags = cast(tags);
      console.log('aftwr ', self.recipeTags);
    },
  }));

//ROOT STORE
// for multiple stores
// export const RootStoreModel = types.model('RootStore').props({
//   main: types.optional(MainStore, {}),
// });

export type RootStore = Instance<typeof MainStore>;

//ROOT STORE CONTEXT
const RootStoreContext = createContext<RootStore>({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => useContext(RootStoreContext);
