import React from 'react'
import { StyleSheet, View } from 'react-native'
import { color } from '../../design-tokens/colors'
import { Button } from './Button.component'
import { Text } from '../Text'
import { WarningTriangle } from 'iconoir-react-native'

const styles = StyleSheet.create({
  container: {},
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: color.grey._200,
  },
  exampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  exampleCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: color.grey._50,
    marginBottom: 8,
  },
  buttonContainer: {
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
})

const ButtonShowcase = () => {
  return (
    <View style={styles.container}>
      {/* Primary Buttons */}
      <View style={styles.section}>
        <Text variant="headline.medium" style={styles.sectionTitle}>
          Primary Buttons
        </Text>
        <View style={styles.exampleCard}>
          <View style={styles.buttonContainer}>
            <Button variant="primary" title="Primary Button" />
            <Text variant="copy.small" color="grey._600">
              variant="primary" • Default state
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button variant="primary" title="Pressed State" loading />
            <Text variant="copy.small" color="grey._600">
              variant="primary" • loading
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button variant="primary" title="Pressed State" loading loadingTitle="Confirming ..." />
            <Text variant="copy.small" color="grey._600">
              variant="primary" • loading with title
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button variant="primary" title="Disabled" disabled />
            <Text variant="copy.small" color="grey._600">
              variant="primary" • Disabled state
            </Text>
          </View>
        </View>
      </View>

      {/* Secondary Buttons */}
      <View style={styles.section}>
        <Text variant="headline.medium" style={styles.sectionTitle}>
          Secondary Buttons
        </Text>
        <View style={styles.exampleCard}>
          <View style={styles.buttonContainer}>
            <Button variant="secondary" title="Secondary Button" />
            <Text variant="copy.small" color="grey._600">
              variant="secondary" • Default state
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              variant="secondary"
              title="With Icon"
              leadingIcon={<WarningTriangle color={color.primary.main} width={24} height={24} />}
            />
            <Text variant="copy.small" color="grey._600">
              variant="secondary" • With leading icon
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button variant="secondary" title="Loading" loading loadingTitle="Processing..." />
            <Text variant="copy.small" color="grey._600">
              variant="secondary" • Loading state
            </Text>
          </View>
        </View>
      </View>

      {/* Button Sizes */}
      <View style={styles.section}>
        <Text variant="headline.medium" style={styles.sectionTitle}>
          Button Sizes
        </Text>
        <View style={styles.exampleCard}>
          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Button variant="primary" title="Large (64px)" />
              <Text variant="copy.small" color="grey._600">
                height: 64
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button variant="secondary" title="Medium (40px)" />
              <Text variant="copy.small" color="grey._600">
                height: 40
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export const buttonUsage = [
  {
    title: 'Button Component Showcase',
    component: <ButtonShowcase />,
  },
]
