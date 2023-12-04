import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput, Menu } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { Ingredient } from '../Models/Refeicao'
import { adicionarAoEstoque, getEstoque } from '../database/firestore'

const AdicionarItem = ({navigation}: any) => {
  const [ingredientName, setIngredientName] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [selectedUnit, setSelectedUnit] = useState<string>('') // Estado para armazenar a unidade selecionada
  const [menuVisible, setMenuVisible] = useState<boolean>(false) // Estado para controlar a visibilidade do menu

  async function cadastrarIngrediente() {
    const novoIngrediente: Ingredient= {ingredient: ingredientName, quantity: parseFloat(quantity), unit_of_measurement: selectedUnit}
    let estoque = await getEstoque()

        // Verifica se o item já existe na lista de ingredientes selecionados
        const ingredienteExistenteIndex = estoque.findIndex(
          (listIngredient: Ingredient) => listIngredient.ingredient === novoIngrediente.ingredient
        )
        console.log(novoIngrediente.quantity)
    
        // Se já existe, atualiza qtd
        if (ingredienteExistenteIndex !== -1) {
          estoque[ingredienteExistenteIndex] = novoIngrediente // Inserir onde tá a antiga quantidade    
        }
    
        // SENÃO
        // Adiciona o NOVO ingrediente à lista e vai pra tela principal
        estoque = ([...estoque, novoIngrediente])
        adicionarAoEstoque(estoque)
        navigation.navigate('ListaRefeicoes')
        console.log('Ingrediente adicionado com sucesso.')
  }

  const finalizar = () => {
    // Lógica para finalizar a ação
  }

  return (
    <>
      <SafeAreaView>
        <View style={{ padding: 16 }}>
          <TextInput
            label="Nome do ingrediente"
            value={ingredientName}
            onChangeText={(text) => setIngredientName(text)}
            style={styles.input}
          />
          <TextInput
            label="Quantidade no estoque"
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            style={styles.input}
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Button icon={() => <FontAwesome name="angle-down" />} onPress={() => setMenuVisible(true)}>{(selectedUnit != '') ? selectedUnit : "Unidade"}</Button>}
          >
            <Menu.Item onPress={() => {setSelectedUnit('unidade'); setMenuVisible(false);}} title="Unidade" />
            <Menu.Item onPress={() => {setSelectedUnit('ml'); setMenuVisible(false);}} title="ml" />
            <Menu.Item onPress={() => {setSelectedUnit('gr'); setMenuVisible(false);}} title="gr" />
            <Menu.Item onPress={() => {setSelectedUnit('l'); setMenuVisible(false);}} title="L" />
            <Menu.Item onPress={() => {setSelectedUnit('kg'); setMenuVisible(false);}} title="Kg" />
          </Menu>
          <Button mode="contained" onPress={cadastrarIngrediente} style={styles.botao}>
            Salvar e sair
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('ListaRefeicoes')} style={styles.botaoCancel}>
            Cancelar
          </Button>        
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
  botao: {
    marginTop: 16,
  },
  botaoCancel: {
    color: 'red',
    marginTop: 16,
  }
})

export default AdicionarItem