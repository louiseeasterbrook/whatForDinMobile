import {createContext, useContext} from 'react';
import {types, Instance} from 'mobx-state-tree';
import {cast} from 'mobx-state-tree';

//STORE

export const MainStore = types
  .model('MainStore')
  .props({
    name: types.optional(types.string, ''),
    uid: types.optional(types.string, ''),
    favourites: types.array(types.string),
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
