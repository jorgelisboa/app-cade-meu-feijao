import { View } from 'react-native'
import { useEffect, useState } from 'react'
import SimpleListItem from '../components/SimpleListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FAB, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { getRefeicoes } from '../database/firestore'

const ListaRefeicoes = ({navigation}: any) => {
    const [comidas, setIngredients] = useState<any[]>([])
    const [open, setState] = useState<boolean>(false)

    useEffect(() => {
        async function getFirebaseIngredients() {
            setIngredients(await getRefeicoes())
        }
        getFirebaseIngredients()
    }, [])

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
                            {comidas?.map((comida, index) => (
                                <SimpleListItem 
                                    icon='food' 
                                    key={index}
                                    title={comida.title} 
                                    description={comida.created_at} 
                                    action={() => console.log(comida.ingredients)} />)
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