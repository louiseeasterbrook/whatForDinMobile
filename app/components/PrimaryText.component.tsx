import {ReactNode} from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';
import {Font} from '../index/theme';

type PrimaryTextProps = {
  text: string;
  bold?: boolean;
  semiBold?: boolean;
  size?: number;
  textColour?: string;
  addedStyles?: ViewStyle;
};

export const PrimaryText = ({
  text,
  bold = false,
  semiBold = false,
  size = 14,
  textColour = 'black',
  addedStyles,
}: PrimaryTextProps): ReactNode => {
  const fontStyle = bold ? Font.Bold : semiBold ? Font.SemiBold : Font.Regular;

  return (
    <Text style={[addedStyles, styles(fontStyle, size, textColour).text]}>
      {text}
    </Text>
  );
};

const styles = (fontStyle: string, size: number, textColour: string) =>
  StyleSheet.create({
    text: {
      fontFamily: fontStyle,
      fontSize: size,
      color: textColour,
    },
  });
