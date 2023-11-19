import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleListItem from '../components/SimpleListItem'
import { SafeAreaView } from 'react-native-safe-area-context'

const ListaRefeicoes = () => {
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
        }
    ]
    return (
        <SafeAreaView>
            <View>
                <Text>ListaRefeicoes</Text>
                {comidas.map((comida, index) => (
                    <SimpleListItem 
                        icon='food' 
                        key={index}
                        title={comida.title} 
                        description={comida.description} 
                        action={() => console.log(comida.title)} />)
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default ListaRefeicoes

const styles = StyleSheet.create({})