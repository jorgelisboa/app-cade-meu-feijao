import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { insertIngredients } from '../database/firestore'

const AdicionarItem = ({navigation}: any) => {
  const [ingredientName, setIngredientName] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')

  async function cadastrarIngrediente() {

  }

  const finalizar = () => {
    // Lógica para finalizar a ação
  };

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
          <Button mode="contained" onPress={cadastrarIngrediente} style={styles.botao}>
            Finalizar
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