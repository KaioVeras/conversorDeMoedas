import React from 'react';
import {View, StyleSheet} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

export default function MyPicker({moedas, onChange, value}) {
  const placeholder = {
    label: 'Selecione uma moeda...',
    value: null,
  };

  return (
    <View>
      <RNPickerSelect
        value={value}
        placeholder={placeholder}
        onValueChange={onChange}
        items={moedas}
        style={styles.picker}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
