import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import api from './src/services/api.js';

import MyPicker from './src/components/MyPicker/index.js';
import MyModal from './src/components/MyModal/index.js';

export default function App() {
  const [moedaValor, setMoedaValor] = useState('');
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moedaSelecionada, setMoedaSelecionada] = useState(null);

  const [valorMinimo, setValorMinimo] = useState(0);
  const [valorMaximo, setValorMaximo] = useState(0);
  const [nomeConversao, setNomeConversao] = useState('');
  const [resultadoConversao, setResultadoConversao] = useState(0);

  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');

      let arrayMoedas = [];
      Object.keys(response.data).map(key => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();
  }, []);

  function fecharModal() {
    setVisibleModal(false);
    setMoedaSelecionada(null);
    setMoedaValor('');
  }

  async function converter() {
    if (moedaSelecionada == null && moedaValor == '') {
      alert('Por favor, preencha todos os campos!');
      return;
    } else if (moedaSelecionada == null) {
      alert('Selecione uma moeda!');
      return;
    } else if (moedaValor == '') {
      alert('Coloque um valor!');
      return;
    }

    const response = await api.get(`all/${moedaSelecionada}-BRL`);

    let resultado = response.data[moedaSelecionada].ask * moedaValor;
    let valorMinimo = response.data[moedaSelecionada].low;
    let valorMaximo = response.data[moedaSelecionada].high;
    let nomeConversao = response.data[moedaSelecionada].name;

    setVisibleModal(true);
    setNomeConversao(nomeConversao);
    setResultadoConversao(`${resultado.toFixed(2)}`);
    setValorMinimo(valorMinimo);
    setValorMaximo(valorMaximo);
  }

  if (loading) {
    return (
      <View style={styles.areaLoading}>
        <ActivityIndicator color="#fff" size={45} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image source={require('./src/images/logo.png')} style={styles.logo} />

        <View style={styles.areaConversao}>
          <Text style={styles.textoConversao}>Selecione sua moeda</Text>
          <MyPicker
            moedas={moedas}
            onChange={(itemValue, itemIndex) => setMoedaSelecionada(itemValue)}
            value={moedaSelecionada}
          />
        </View>

        <View style={styles.areaValorConversao}>
          <Text style={styles.textoConversao}>
            Digite um valor para converter em (R$)
          </Text>
          <TextInput
            value={moedaValor}
            placeholder="Ex: 150"
            style={styles.input}
            onChangeText={valor => setMoedaValor(valor)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.botao} onPress={converter}>
            <Text style={styles.textoBotao}>Converter</Text>
          </TouchableOpacity>
        </View>

        <MyModal
          visible={visibleModal}
          visibleFalse={fecharModal}
          nomeConversao={nomeConversao}
          resultadoConversao={resultadoConversao}
          valorMinimo={valorMinimo}
          valorMaximo={valorMaximo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaLoading: {
    flex: 1,
    backgroundColor: '#101215',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101215',
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: -20,
  },
  areaConversao: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    marginBottom: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textoConversao: {
    color: '#000',
    padding: 10,
    fontSize: 16,
  },
  areaValorConversao: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  input: {
    fontSize: 20,
    paddingLeft: 10,
  },
  botao: {
    backgroundColor: '#074973',
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
});
