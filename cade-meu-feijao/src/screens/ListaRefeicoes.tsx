import { FlatList, View } from 'react-native'
import { useEffect, useState } from 'react'
import SimpleListItem from '../components/SimpleListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FAB, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { getEstoque } from '../database/firestore'
import { Ingredient } from '../Models/Refeicao'

const ListaRefeicoes = ({navigation}: any) => {
    const [comidas, setIngredients] = useState<Array<Ingredient>>([])
    const [open, setState] = useState<boolean>(false)
    const [isRefreshing, setRefreshing] = useState<boolean>(false)
    async function getFirebaseIngredients() {
        setRefreshing(true)
        setIngredients(await getEstoque())
        setRefreshing(false)
    }
    
    useEffect(() => {
        getFirebaseIngredients()
    }, [])

    return (
        <>
            <SafeAreaView>
                <View style={{ padding: 16 }}>
                    {/* PESQUISA */}
                    <View>
                        <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}>Seu estoque</Text>
                        <Text variant='titleMedium' style={{ color: 'grey' }}>
                            Veja todos ingredientes e suas quantidades logo abaixo, ou crie novos ingredientes.
                        </Text>
                    </View>
                    {/* Lista de itens */}
                    <View style={{ maxHeight: '85%',marginTop: 16 }}>
                        <Text>
                            LOGO TEREMOS SEU HISTÓRICO, CONTATE-NOS CASO QUEIRA RECEBER SEU RELATÓRIO
                        </Text>
                        <FlatList 
                            data={comidas}
                            refreshing={isRefreshing}
                            onRefresh={() => getFirebaseIngredients()}
                            renderItem={({item}) => <SimpleListItem 
                                icon='food' 
                                key={item.ingredient}
                                title={item.ingredient} 
                                description={item.quantity.toString() + item.unit_of_measurement} 
                                action={() => console.log(item.unit_of_measurement)} />
                            }
                        />
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
                                label: 'Retirada do estoque',
                                color: '#9A3824',
                                onPress: () => {
                                    setState(false)
                                    navigation.navigate('AdicionarPrato')
                                },
                            },
                            {
                                icon: 'food-apple',
                                label: 'Recebimento no estoque',
                                color: '#9A3824',
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