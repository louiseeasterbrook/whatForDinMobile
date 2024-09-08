import {ReactNode} from 'react';
import {Avatar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {PrimaryText} from './PrimaryText.component';

type HeaderCardProps = {
  title: string;
  subtitle: string;
  icon?: string;
};

export const HeaderCard = ({
  title,
  subtitle,
  icon = 'silverware-fork',
}: HeaderCardProps): ReactNode => {
  return (
    <View style={styles.mainContainer}>
      <Avatar.Icon size={50} icon={icon} style={styles.icon} />
      <View>
        <PrimaryText size={16} semiBold text={title} />
        <PrimaryText size={12} textColour="grey" text={subtitle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
    fontSize: 12,
  },
});
