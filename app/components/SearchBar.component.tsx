import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Keyboard,
  Platform,
} from 'react-native';

// Functional Search Bar Component - You CAN type in this one!
export const SearchBar = ({
  placeholder = "Search users or recipes...",
  onSearch,
  onChangeText,
  onFocus,
  onBlur,
  value,
  style,
  autoFocus = false,
  theme = 'lavender',
  showClearButton = true,
}) => {
  const [searchText, setSearchText] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation matching your app
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleFocus = () => {
    setIsFocused(true);
    
    // Subtle scale animation on focus
    Animated.timing(scaleAnim, {
      toValue: 1.02,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // Scale back on blur
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onBlur && onBlur();
  };

  const handleChangeText = (text) => {
    setSearchText(text);
    onChangeText && onChangeText(text);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    onSearch && onSearch(searchText);
  };

  const handleClear = () => {
    setSearchText('');
    onChangeText && onChangeText('');
    inputRef.current?.focus();
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return darkThemeStyles;
      case 'light':
        return lightThemeStyles;
      default:
        return lavenderThemeStyles;
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <Animated.View 
      style={[
        styles.container,
        style,
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={[styles.searchBar, themeStyles.searchBar]}>
        {/* Search Icon */}
        <View style={styles.iconContainer}>
          <Text style={[styles.searchIcon, themeStyles.iconText]}>🔍</Text>
        </View>

        {/* Text Input - YOU CAN TYPE HERE! */}
        <TextInput
          ref={inputRef}
          style={[styles.textInput, themeStyles.textInput]}
          placeholder={placeholder}
          placeholderTextColor={themeStyles.placeholderColor}
          value={searchText}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          autoFocus={autoFocus}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {/* Clear Button */}
        {showClearButton && searchText.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.clearText, themeStyles.clearText]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

// Search Bar with Recent Searches Dropdown
const SearchBarWithHistory = ({
  recentSearches = [],
  onSelectRecent,
  maxRecentItems = 5,
  ...props
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [searchText, setSearchText] = useState(props.value || '');

  const handleFocus = () => {
    if (recentSearches.length > 0 && !searchText) {
      setShowHistory(true);
    }
    props.onFocus && props.onFocus();
  };

  const handleBlur = () => {
    // Delay hiding to allow taps on history items
    setTimeout(() => setShowHistory(false), 200);
    props.onBlur && props.onBlur();
  };

  const handleChangeText = (text) => {
    setSearchText(text);
    setShowHistory(text.length === 0 && recentSearches.length > 0);
    props.onChangeText && props.onChangeText(text);
  };

  const handleSelectRecent = (item) => {
    setSearchText(item);
    setShowHistory(false);
    onSelectRecent && onSelectRecent(item);
    props.onChangeText && props.onChangeText(item);
  };

  const getThemeStyles = () => {
    switch (props.theme) {
      case 'dark':
        return darkThemeStyles;
      case 'light':
        return lightThemeStyles;
      default:
        return lavenderThemeStyles;
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <View style={styles.historyContainer}>
      <SearchBar
        {...props}
        value={searchText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
      />

      {/* Recent Searches Dropdown */}
      {showHistory && recentSearches.length > 0 && (
        <View style={[styles.historyDropdown, themeStyles.historyDropdown]}>
          <Text style={[styles.historyTitle, themeStyles.historyTitle]}>
            Recent Searches
          </Text>
          {recentSearches.slice(0, maxRecentItems).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.historyItem, themeStyles.historyItem]}
              onPress={() => handleSelectRecent(item)}
            >
              <Text style={styles.historyIcon}>🕒</Text>
              <Text style={[styles.historyText, themeStyles.historyText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  searchBar: {
    borderRadius: 16,
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    marginRight: 8,
    // Remove default styling
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // History styles
  historyContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  historyDropdown: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    borderRadius: 12,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
    maxHeight: 200,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  historyIcon: {
    fontSize: 14,
    marginRight: 12,
    opacity: 0.6,
  },
  historyText: {
    fontSize: 16,
    flex: 1,
  },
});

// Theme Styles - Lavender Dreams (matches your app exactly)
const lavenderThemeStyles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textInput: {
    color: 'white',
  },
  placeholderColor: 'rgba(255, 255, 255, 0.7)',
  iconText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  clearText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  historyDropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
  },
  historyTitle: {
    color: '#636e72',
  },
  historyItem: {
    backgroundColor: 'transparent',
  },
  historyText: {
    color: '#2d3436',
  },
});

// Dark Theme
const darkThemeStyles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textInput: {
    color: 'white',
  },
  placeholderColor: 'rgba(255, 255, 255, 0.6)',
  iconText: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  clearText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  historyDropdown: {
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
  },
  historyTitle: {
    color: '#888',
  },
  historyItem: {
    backgroundColor: 'transparent',
  },
  historyText: {
    color: '#fff',
  },
});

// Light Theme
const lightThemeStyles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  textInput: {
    color: '#2d3436',
  },
  placeholderColor: '#636e72',
  iconText: {
    color: '#636e72',
  },
  clearText: {
    color: '#636e72',
  },
  historyDropdown: {
    backgroundColor: '#fff',
  },
  historyTitle: {
    color: '#636e72',
  },
  historyItem: {
    backgroundColor: 'transparent',
  },
  historyText: {
    color: '#2d3436',
  },
});



/* 
USAGE EXAMPLES:

// Basic functional search bar - YOU CAN TYPE!
<SearchBar
  placeholder="Search users or recipes..."
  onSearch={(text) => console.log('Searching for:', text)}
  onChangeText={(text) => console.log('Text changed:', text)}
/>

// With controlled value
const [searchQuery, setSearchQuery] = useState('');

<SearchBar
  placeholder="Search users or recipes..."
  value={searchQuery}
  onChangeText={setSearchQuery}
  onSearch={handleSearch}
/>

// With recent searches dropdown
<SearchBarWithHistory
  placeholder="Search users or recipes..."
  recentSearches={['Pasta', 'Chicken', 'Quick meals']}
  onSelectRecent={(item) => setSearchQuery(item)}
  onSearch={handleSearch}
  maxRecentItems={5}
/>

// Auto-focus when screen loads
<SearchBar
  placeholder="Search users or recipes..."
  autoFocus={true}
  onSearch={handleSearch}
/>

// Different themes
<SearchBar
  theme="lavender" // Default - glassmorphism style
  onSearch={handleSearch}
/>

<SearchBar
  theme="dark"
  onSearch={handleSearch}
/>

<SearchBar
  theme="light"
  onSearch={handleSearch}
/>
*/