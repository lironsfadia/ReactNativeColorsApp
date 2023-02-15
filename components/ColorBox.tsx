import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ColorBoxProps = {
  colorHex: string;
  colorName: string;
};

const ColorBox = ({ colorHex, colorName }: ColorBoxProps) => {
  const boxColor = {
    backgroundColor: colorHex,
  };
  return (
    <View style={[styles.box, boxColor]}>
      <Text style={styles.text}>
        {colorName}: {colorHex}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  box: { justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
});

export default ColorBox;
