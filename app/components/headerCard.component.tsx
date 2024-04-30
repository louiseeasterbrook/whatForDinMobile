import {ReactNode} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

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
      <View style={styles.textContainer}>
        <Text style={styles.mainTitle}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
  mainTitle: {
    fontSize: 16,
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
  textContainer: {},
});
