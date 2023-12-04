import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Checkbox, Menu, Divider } from 'react-native-paper'
import { Ingredient } from '../Models/Refeicao'

interface Props {
  ingredientData: Ingredient
  onIngredientSelect: (ingredient: Ingredient) => void
}

const IngredienteComponent = (props: Props) => {
  type StatusType = "checked" | "unchecked" | "indeterminate";

  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState<StatusType>("unchecked")

  const [ingredient, setIngredient] = useState<Ingredient>({
    ingredient: props.ingredientData.ingredient,
    quantity: props.ingredientData.quantity,
    unit_of_measurement: props.ingredientData.unit_of_measurement,
  })

  return (
    <View style={styles.container}>
      <Checkbox.Item label={ingredient.ingredient} status={status} onPress={() => {
        setExpanded(!expanded)
        if (status === "checked") {
          setStatus("unchecked")
        } else {
          setStatus("checked")
        }
        }
      } 
    />
      {expanded && (
        <View style={styles.expandedContainer}>
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={ingredient.quantity?.toString()}
            onChangeText={(text) => {
              if (text === '') {
                return
              }
              setIngredient({
                ...ingredient, 
                quantity: parseInt(text)
              })
              props.onIngredientSelect({
                ...ingredient, 
                quantity: parseInt(text)
              })
            }}
          />
          <Menu
            visible={!ingredient.unit_of_measurement}
            onDismiss={() => {}}
            anchor={<Text onPress={() => {
              setIngredient({
                ...ingredient, 
                unit_of_measurement: ingredient.unit_of_measurement
              })
              props.onIngredientSelect({
                ...ingredient, 
                unit_of_measurement: ingredient.unit_of_measurement
              })
            }}>
              {ingredient.unit_of_measurement || 'Unidade'}
            </Text>
            }
          >
            <Menu.Item onPress={() => setIngredient({...ingredient, unit_of_measurement: 'ml'})} title="ml" />
            <Menu.Item onPress={() => setIngredient({...ingredient, unit_of_measurement: 'l'})} title="l" />
            <Menu.Item onPress={() => setIngredient({...ingredient, unit_of_measurement: 'gr'})} title="gr" />
            <Menu.Item onPress={() => setIngredient({...ingredient, unit_of_measurement: 'kg'})} title="kg" />
          </Menu>
        </View>
      )}
      <Divider />
    </View>
  )
  }

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  expandedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
    paddingHorizontal: 8,
  },
});

export default IngredienteComponent;
