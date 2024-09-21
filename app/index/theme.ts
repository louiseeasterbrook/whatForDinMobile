import {StyleSheet} from 'react-native';

export const main_colour = '#6750a4'; //dark purple
export const secondary_colour = '#e9e4ef'; //light purple
export const disabled_grey = '#c4c4c4';
export const grey_background = '#F5F5F5';
export const light_red = '#E0B4B4';

export const light_green = '#9edbae';
export const light_blue = '#81aad6';
export const light_pink = '#e39dc8';
export const light_purple = '#ae93ed';
export const light_orange = '#de9e83';
export const light_yellow = '#e8db92';

export const Font = {
  Bold: 'Quicksand-Bold',
  Regular: 'Quicksand-Regular',
  SemiBold: 'Quicksand-SemiBold',
};

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

export const sharedStyles = StyleSheet.create({
  appBar: {
    backgroundColor: '#ffffff',
  },
  searchBar: {
    borderRadius: 12,
  },
});
