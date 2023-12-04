export type Ingredient = {
    ingredient: string
    quantity: number
    unit_of_measurement: string
}

export type Refeicao = {
    title: string
    createdAt: string
    ingredientList: Ingredient[]
}