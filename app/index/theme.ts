import {StyleSheet} from 'react-native';

export const main_colour = '#6750a4'; //dark purple
export const secondary_colour = '#e9e4ef'; //light purple
export const disabled_grey = '#c4c4c4';
export const grey_background = '#F5F5F5';
export const light_red = '#f2c2c3';

export const light_green = '#cdf7c6';
export const light_blue = '#bbe5f0';
export const purple_blue = '#b3c9ff';
export const light_pink = '#f7c6e9';
export const light_purple = '#d0bef7';
export const light_orange = '#ffddc2';
export const light_yellow = '#f7f6c3';
export const aqua = '#c5e6d2';
export const light_greenYellow = '#e5f2c2';

export const Font = {
  Bold: 'Quicksand-Bold',
  Regular: 'Quicksand-Regular',
  SemiBold: 'Quicksand-SemiBold',
};

export const SHADOW_BASE = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0.5,
  },
  shadowOpacity: 0.2,
  shadowRadius: 0.5,
  elevation: 2,
};

export const sharedStyles = StyleSheet.create({
  appBar: {
    backgroundColor: '#ffffff',
  },
  searchBar: {
    borderRadius: 12,
  },
});
