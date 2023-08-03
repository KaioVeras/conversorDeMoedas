import React from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity} from 'react-native';

export default function MyModal({
  visible,
  visibleFalse,
  nomeConversao,
  resultadoConversao,
  valorMaximo,
  valorMinimo,
}) {
  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.container}>
          <View style={styles.areaModal}>
            <Text style={styles.title}>Conversão</Text>
            <Text style={[styles.dadosConversao, {marginBottom: 15}]}>
              {nomeConversao}
            </Text>
            <Text style={styles.dadosConversao}>
              Valor convertido:{' '}
              <Text style={styles.dadosNormais}>R$ {resultadoConversao}</Text>
            </Text>
            <Text style={styles.dadosConversao}>
              Valor de venda(mínimo):{' '}
              <Text style={styles.dadosNormais}>R$ {valorMinimo}</Text>
            </Text>
            <Text style={styles.dadosConversao}>
              Valor de venda(máximo):{' '}
              <Text style={styles.dadosNormais}>R$ {valorMaximo}</Text>
            </Text>

            <TouchableOpacity style={styles.botao} onPress={visibleFalse}>
              <Text style={styles.textoBotao}>Nova Conversão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.500)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaModal: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 12,
  },
  dadosConversao: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dadosNormais: {
    fontWeight: 'normal',
  },
  botao: {
    backgroundColor: '#074973',
    padding: 11,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 10,
    margin: 10,
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 20,
  },
});
