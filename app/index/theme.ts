import {StyleSheet} from 'react-native';

export const main_colour = '#6750a4';
export const secondary_colour = '#e9e4ef';
export const disabled_grey = '#c4c4c4';
export const grey_background = '#F5F5F5';
export const light_red = '#E0B4B4';

export const sharedStyles = StyleSheet.create({
  appBar: {
    backgroundColor: 'white',
  },
  searchBar: {
    borderRadius: 12,
  },
});

export const SHADOW_BASE = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};
