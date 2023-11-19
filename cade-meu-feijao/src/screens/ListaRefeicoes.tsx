import { View } from 'react-native'
import { useState } from 'react'
import SimpleListItem from '../components/SimpleListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FAB, Text } from 'react-native-paper'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar'
import { ScrollView } from 'react-native-gesture-handler'

const ListaRefeicoes = ({navigation}: any) => {

    const comidas = [
        {
          title: 'Feijão Carioca',
          description: 'Feijão carioca da marca X',
          icon: 'food'
        },
        {
          title: 'Arroz Integral',
          description: 'Arroz integral orgânico',
          icon: 'food'
        },
        {
          title: 'Salada de Frutas',
          description: 'Salada fresca com frutas da estação',
          icon: 'food'
        },
        {
            title: 'Feijão Carioca',
            description: 'Feijão carioca da marca X',
            icon: 'food'
          },
          {
            title: 'Arroz Integral',
            description: 'Arroz integral orgânico',
            icon: 'food'
          },
          {
            title: 'Salada de Frutas',
            description: 'Salada fresca com frutas da estação',
            icon: 'food'
          },
          {
            title: 'Feijão Carioca',
            description: 'Feijão carioca da marca X',
            icon: 'food'
          },
          {
            title: 'Arroz Integral',
            description: 'Arroz integral orgânico',
            icon: 'food'
          },
          {
            title: 'Salada de Frutas',
            description: 'Salada fresca com frutas da estação',
            icon: 'food'
          },
          {
            title: 'Arroz Integral',
            description: 'Arroz integral orgânico',
            icon: 'food'
          },
          {
            title: 'Salada de Frutas',
            description: 'Salada fresca com frutas da estação',
            icon: 'food'
          },
          {
            title: 'Arroz Integral',
            description: 'Arroz integral orgânico',
            icon: 'food'
          },
          {
            title: 'Salada de Frutas',
            description: 'Salada fresca com frutas da estação',
            icon: 'food'
          },
          {
            title: 'Arroz Integral',
            description: 'Arroz integral orgânico',
            icon: 'food'
          },
          {
            title: 'Salada de Frutas',
            description: 'Salada fresca com frutas da estação',
            icon: 'food'
          },
    ]
    const [open, setState] = useState<boolean>(false)
    return (
        <>
            <SafeAreaView>
                <View style={{ padding: 16 }}>
                    {/* PESQUISA */}
                    <View>
                        <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>Últimas refeições preparadas</Text>
                        <Text variant='titleMedium' style={{ color: 'grey' }}>
                            Veja todas refeições preparadas logo abaixo, ou crie novas refeições/ingredientes.
                        </Text>
                    </View>
                    {/* Lista de itens */}
                    <View style={{ maxHeight: '85%',marginTop: 16 }}>
                        <ScrollView>
                            {comidas.map((comida, index) => (
                                <SimpleListItem 
                                    icon='food' 
                                    key={index}
                                    title={comida.title} 
                                    description={comida.description} 
                                    action={() => console.log(comida.title)} />)
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
            {/* FAB */}
            <FAB.Group
                style={{ position: 'absolute', bottom: 0 }}
                        open={open}
                        visible
                        icon={open ? 'close-circle' : 'plus-circle'}
                        actions={[
                            {
                                icon: 'food',
                                label: 'Criar prato',
                                onPress: () => {
                                    setState(false)
                                    navigation.navigate('AdicionarPrato')
                                },
                            },
                            {
                                icon: 'food-apple',
                                label: 'Criar ingrediente',
                                onPress: () => {
                                    setState(false)
                                    navigation.navigate('AdicionarItem')
                                },
                            },
                        ]}
                        onStateChange={() => { return }}
                onPress={() => { open ? setState(false) : setState(true) }}
            />
        </>
    )
}

export default ListaRefeicoes