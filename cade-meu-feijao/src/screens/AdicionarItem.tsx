import { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { insertIngredients } from '../database/firestore'

const AdicionarItem = ({navigation}: any) => {
  const [text, setText] = useState<string>('')

  async function cadastrarIngrediente() {

  }

  return (
    <>
      <SafeAreaView>
        <View style={{ padding: 16 }}>
          <TextInput
            label="Nome do ingrediente"
            value={text}
            mode='outlined'
            placeholder='Batata doce roxa'
            onChangeText={(text: string) => setText(text)}
          />
          <Button icon="camera" mode="contained" onPress={() => cadastrarIngrediente()}>Cadastrar</Button>
          <Button icon="camera" mode="contained" onPress={() => navigation.goBack()}>Voltar</Button>
        </View>
      </SafeAreaView>
    </>
  )
}

export default AdicionarItem