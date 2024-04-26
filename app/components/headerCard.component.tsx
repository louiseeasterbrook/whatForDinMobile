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
    <>
      <Card>
        <Card.Content>
          <View style={styles.mainContainer}>
            <Avatar.Icon icon={icon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text>{title}</Text>
              <Text>{subtitle}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {},
});
