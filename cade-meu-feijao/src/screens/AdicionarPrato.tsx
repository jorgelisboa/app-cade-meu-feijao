import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, List, Title, Caption, ToggleButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdicionarPrato = ({navigation}: any) => {
  const [tituloPrato, setTituloPrato] = useState('');
  const [nomeAlimento, setNomeAlimento] = useState('');
  const [quantidadeAlimento, setQuantidadeAlimento] = useState('');
  const [unidade, setUnidade] = useState('ml'); // Unidade padrão é ml
  const [ingredientes, setIngredientes] = useState<any[]>([]);

  const adicionarIngrediente = () => {
    if (nomeAlimento && quantidadeAlimento) {
      const ingrediente = { ingredients: `${nomeAlimento}`, qntd: `${quantidadeAlimento} ${unidade}`}
      setIngredientes([...ingredientes, ingrediente]);
      setNomeAlimento('');
      setQuantidadeAlimento('');
      setUnidade('ml'); // Resetar a unidade para ml após adicionar um ingrediente
      console.log(ingrediente)
    }
  };

  const finalizar = () => {
    // Lógica para finalizar a ação
  };

  return (

    <SafeAreaView>
    <View style={styles.container}>
      <Title style={styles.titulo}>Insira os alimentos usados</Title>
      <Caption style={styles.descricao}>Insira o nome do alimento usado e sua quantidade, insira todos que precisar e depois finalize.</Caption>

      <View style={styles.espacamento} />

      <TextInput
        label="Nome do prato"
        value={tituloPrato}
        onChangeText={(text) => setTituloPrato(text)}
        style={styles.input}
      />
      <TextInput
        label="Nome do Alimento"
        value={nomeAlimento}
        onChangeText={(text) => setNomeAlimento(text)}
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          label="Quantidade"
          value={quantidadeAlimento}
          onChangeText={(text) => setQuantidadeAlimento(text.replace(/[^0-9]/g, '').slice(0, 4))}
          keyboardType="numeric"
          style={styles.inputQuantidade}
        />

        <ToggleButton.Row
          onValueChange={(value) => setUnidade(value)}
          value={unidade}
          style={styles.toggleButtonRow}
        >
          <ToggleButton icon="plus-circle" value="un" />
          <ToggleButton icon="weight-gram" value="gr" />
          <ToggleButton icon="weight-kilogram" value="kg" />
          <ToggleButton icon="water" value="ml" />
          <ToggleButton icon="bottle-wine" value="l" />
        </ToggleButton.Row>
      </View>

      <Button mode="contained" onPress={adicionarIngrediente} style={styles.botao}>
        Inserir
      </Button>

      <ScrollView>
        <List.Section>
          <List.Subheader>Lista de Ingredientes</List.Subheader>
          {ingredientes.map((item, index) => (
            <List.Item key={index} title={`${item.ingredients} - ${item.qntd}`} />
          ))}
        </List.Section>
      </ScrollView>

      <Button mode="contained" onPress={finalizar} style={styles.botao}>
        Finalizar
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ListaRefeicoes')} style={styles.botaoCancel}>
        Cancelar
      </Button>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleButtonRow: {
    marginTop: 8,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 8,
  },
  descricao: {
    color: 'grey',
    marginBottom: 16,
  },
  espacamento: {
    height: 16,
  },
  input: {
    marginBottom: 8,
  },
  inputQuantidade: {
    flex: 1,
    marginRight: 8,
  },
  botao: {
    marginTop: 16,
  },
  botaoCancel: {
    color: 'red',
    marginTop: 16,
  }
})

export default AdicionarPrato