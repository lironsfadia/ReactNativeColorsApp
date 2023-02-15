// screens/Home.js

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { fetchData } from '../utilities/fetchData';

const RAINBOW = [
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'Orange', hexCode: '#FF7F00' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'Green', hexCode: '#00FF00' },
  { colorName: 'Violet', hexCode: '#8B00FF' },
];

const FRONTEND_MASTERS = [
  { colorName: 'Red', hexCode: '#c02d28' },
  { colorName: 'Black', hexCode: '#3e3e3e' },
  { colorName: 'Grey', hexCode: '#8a8a8a' },
  { colorName: 'White', hexCode: '#ffffff' },
  { colorName: 'Orange', hexCode: '#e66225' },
];

const COLORS = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

const NavigationButton = ({ handlePress, buttonText, colorsPalette }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Text style={styles.text}>{buttonText}</Text>
        <FlatList
          horizontal={true}
          data={colorsPalette.slice(0, 5)}
          keyExtractor={(item) => item.colorName}
          renderItem={({ item }) => <View style={[styles.SquareShapeView, { backgroundColor: item.hexCode }]} />}
        />
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params ? route.params.newColorPlatte : undefined;
  const [appColorPallets, setAppColorPallets] = useState([
    { colorPalette: RAINBOW, paletteName: 'rainbow' },
    { colorPalette: FRONTEND_MASTERS, paletteName: 'frontend masters' },
    { colorPalette: COLORS, paletteName: 'colors' },
  ]);

  useEffect(() => {
    //getData();
    console.log({ newColorPalette });
    if (newColorPalette) {
      setAppColorPallets([newColorPalette, ...appColorPallets]); //will be added in the top of the array
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const [colorsPalettes, setColorsPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = useCallback(async () => {
    try {
      const data = await fetchData('https://color-palette-api.kadikraman.vercel.app/palettes/');
      if (data.ok) {
        setColorsPalettes(data.json());
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={appColorPallets} //colorsPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <NavigationButton
          handlePress={() => {
            navigation.navigate('ColorPalette', { paletteName: item.paletteName, colors: item.colorPalette });
          }}
          buttonText={`Click for ${item.paletteName}`}
          colorsPalette={item.colorPalette}
        />
      )}
      refreshing={false}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddNewPaletteModal');
          }}>
          <Text>Add new pallette</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  text: { fontWeight: 'bold', fontSize: 20 },
  list: { padding: 10 },
  SquareShapeView: {
    width: 30,
    height: 30,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default Home;
