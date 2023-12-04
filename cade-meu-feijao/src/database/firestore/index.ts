// Importe o módulo firestore
import { getFirestore, collection, setDoc, getDocs, doc, updateDoc, arrayUnion, getDoc, Timestamp } from 'firebase/firestore'
import app from '../config'
import { format } from 'date-fns'
import { Ingredient } from '../../Models/Refeicao'

const db = getFirestore(app)

// Função para obter a lista de 'ingredients'
export async function getEstoque() {
  try {
    // Obtém uma referência para a instância do Firestore
    // Obtém todos os documentos na coleção
    const snapshot = await getDocs(collection(db, 'estoques'));

    // Verifica se há algum documento na coleção
    if (snapshot.size > 0) {
      // Retorna o primeiro documento encontrado (você pode personalizar isso conforme necessário)
      console.log(snapshot.docs[0].data()[Object.keys(snapshot.docs[0].data())[0]])
      return (snapshot.docs[0].data()[Object.keys(snapshot.docs[0].data())[0]])
    } else {
      console.log('Nenhum documento encontrado na coleção "estoque".')
      return null
    }
  } catch (error) {
    console.error('Erro ao obter documento:', error)
    return null
  }
}

// Função para inserir ingredientes com a data atual
export async function insertUsedIngredients(nomeDocumento: string, newItems: Ingredient[]) {
  try {
    const ingredientesRef = doc(db, 'ingredientesUsados', nomeDocumento)
    const dataInserida = Timestamp.now()

    // Cria ou atualiza o documento com a nova lista de ingredientes e a data atual
    await setDoc(ingredientesRef, {
      dataFeita: dataInserida,
      itemsUsados: newItems,
    })

    console.log('Ingredientes inseridos com sucesso.')
  } catch (error) {
    console.error('Erro ao inserir ingredientes:', error)
  }
}

// Adicionar o estoque
export async function adicionarAoEstoque(estoqueAtualizado: Ingredient[]) {
  try {
    const estoqueRef = doc(db, 'estoques', 'xJBWzeir3bJjgRc32nYe') // Substitua com o nome correto do seu documento
    
    // Atualiza o documento do estoque adicionando os ingredientes à array existente
    const dataInserida = format(Timestamp.now().toDate(), 'dd-MM-yyyy - EEEE')
    await updateDoc(estoqueRef, {
      [dataInserida]: estoqueAtualizado,
    })

    console.log('Ingredientes adicionados ao estoque com sucesso.')
  } catch (error) {
    console.error('Erro ao adicionar ingredientes ao estoque:', error)
  }
}