import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Title, Caption } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import IngredienteComponent from '../components/IngredientListItem';
import { Ingredient } from '../Models/Refeicao';
import { adicionarAoEstoque, getEstoque, insertUsedIngredients } from '../database/firestore';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

const AdicionarPrato = ({navigation}: any) => {
  const [ingredientes, setIngredientes] = useState<Ingredient[]>([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState<Ingredient[]>([]);

  const adicionarIngrediente = (ingredient: Ingredient) => {
    // Verifica se o item já existe na lista de ingredientes selecionados
    const ingredienteExistenteIndex = selectedIngredientes.findIndex(
      (listIngredient) => listIngredient.ingredient === ingredient.ingredient
    )
    console.log(ingredient.quantity)

    if (ingredienteExistenteIndex !== -1) {
      // Pode adicionar lógica adicional se necessário
      const updatedIngredientes = [...selectedIngredientes] // Cópia de array
      updatedIngredientes[ingredienteExistenteIndex] = ingredient // Inserir onde tá a antiga quantidade
      setSelectedIngredientes(updatedIngredientes) // Atualiza a array

      return
    }

    // SENÃO
    // Adiciona o NOVO ingrediente à lista
    setSelectedIngredientes([...selectedIngredientes, ingredient])
    console.log('Ingrediente adicionado com sucesso.')
  }

  useEffect(() => {
    async function getIngredientsList() {
      const lista = await getEstoque()
      if (lista != null) {
        setIngredientes(lista) 
      }
    }

    getIngredientsList()
  }, [])

  const finalizar = () => {
    // Pega todos os itens selecionados na array e envia ao firebase
    console.log(selectedIngredientes)

    const estoqueAtualizado: Ingredient[] = [...ingredientes]
    console.log('ESTOQUE ANTES')
    console.log(estoqueAtualizado)
  
    // Subtrai as quantidades dos ingredientes da segunda array
    selectedIngredientes.forEach((selectedIngredient) => {
      const existingIngredientIndex = estoqueAtualizado.findIndex(
        (listIngredient) => listIngredient.ingredient === selectedIngredient.ingredient
      );
  
      if (existingIngredientIndex !== -1) {
        console.log(estoqueAtualizado[existingIngredientIndex].quantity);
        console.log('menos')
        console.log(selectedIngredient.quantity)
        console.log('------------------');
  
        // Garante que a subtração não resultará em valores negativos
        estoqueAtualizado[existingIngredientIndex].quantity = estoqueAtualizado[existingIngredientIndex].quantity - selectedIngredient.quantity;
      }
    })
  
    console.log('ESTOQUE DEPOIS');
    console.log(estoqueAtualizado);
    atualizarFirebase(estoqueAtualizado)

    navigation.navigate('ListaRefeicoes')
  }

  const atualizarFirebase = async (estoqueAtualizado: Ingredient[]) => {
    // Envia o estoque novo
    console.log('ESTOQUE ATUALIZADO')
    console.log(estoqueAtualizado)
    await adicionarAoEstoque(estoqueAtualizado)
    
    // Envia o que foi retirado do estoque
    console.log('ITENS RETIRADOS')
    console.log(selectedIngredientes)
    await insertUsedIngredients(Timestamp.now().toDate().toString(), selectedIngredientes)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Title style={styles.titulo}>Insira os alimentos usados</Title>
        <Caption style={styles.descricao}>
          Insira o nome do alimento usado e sua quantidade, insira todos que precisar e depois finalize.
        </Caption>

        <View style={styles.espacamento} />

        <FlatList 
          data={ingredientes}
          keyExtractor={item => item.ingredient}
          renderItem={({item}) => 
            <IngredienteComponent 
              ingredientData={item} 
              onIngredientSelect={adicionarIngrediente} 
              />
            }
        />

        <Button 
          mode="contained" 
          onPress={finalizar} 
          style={styles.botao}
        >
          Finalizar
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('ListaRefeicoes')} 
          style={styles.botaoCancel}
        >
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