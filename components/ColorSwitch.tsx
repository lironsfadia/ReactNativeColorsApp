import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

const ColorSwitch = ({ colorItem, handleSwitch, isEnabled }) => {
  return (
    <View style={styles.switchContainer}>
      <Text>{colorItem.colorName}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={handleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ColorSwitch;
