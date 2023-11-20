type Ingredient = {
    ingredient: string
    quatity: string
}

export type Refeicao = {
    title: string
    createdAt: string
    ingredientList: Ingredient[]
}