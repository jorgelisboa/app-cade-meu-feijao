import { View } from 'react-native'
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

    useEffect(() => {
        async function getFirebaseIngredients() {
            setIngredients(await getEstoque())
        }
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
                        <ScrollView>

                            <Text>
                                LOGO TEREMOS SEU HISTÓRICO, CONTATE-NOS CASO QUEIRA RECEBER SEU RELATÓRIO
                            </Text>
                            {comidas?.map((comida: Ingredient, index: number) => (
                                <SimpleListItem 
                                    icon='food' 
                                    key={index}
                                    title={comida.ingredient} 
                                    description={comida.quantity.toString() + comida.unit_of_measurement} 
                                    action={() => console.log(comida.unit_of_measurement)} />)
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