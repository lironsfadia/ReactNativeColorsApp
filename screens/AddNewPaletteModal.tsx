import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../constants/constant';
import ColorSwitch from '../components/ColorSwitch';

// in screen inside the <Stack.Navigator> gets the navigation props

const AddNewPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState('');
  const [paletteColors, setPaletteColors] = useState([]);

  const handleSubmit = useCallback(() => {
    if (!paletteName || paletteColors.length === 0) {
      Alert.alert('Error!', 'Please enter a name or colors for the new palette.');
    } else {
      navigation.navigate('Home', { newColorPlatte: { colorPalette: paletteColors, paletteName: paletteName } });
    }
  }, [paletteName, paletteColors]);

  const toggleSwitch = (value, color) => {
    if (value === true) {
      setPaletteColors([...paletteColors, color]);
    } else {
      setPaletteColors((paletteColors) => paletteColors.filter((c) => c !== color));
    }
  };

  /** TouchableOpacity --> Button with navigation! */
  return (
    <SafeAreaView style={styles.formContainer}>
      <Text style={styles.label}>Name of your color pallette</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPaletteName}
        value={paletteName}
        placeholder='New Pallete Name'
      />
      <FlatList
        style={styles.list}
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorSwitch
            colorItem={item}
            handleSwitch={(selected) => toggleSwitch(selected, item)}
            isEnabled={!!paletteColors.find((color) => color.colorName === item.colorName)}
          />
        )}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: { height: 60, backgroundColor: 'teal', borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontWeight: 'bold', fontSize: 18, color: 'white' },
  formContainer: { margin: 20, flex: 1, backgroundColor: 'white' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  list: { marginTop: 20, flex: 1, height: '100%' },
  input: {
    padding: 10,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default AddNewPaletteModal;
