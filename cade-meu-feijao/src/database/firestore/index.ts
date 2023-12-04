// Importe o módulo firestore
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import app from '../config'

const db = getFirestore(app);

// Função para obter a lista de 'ingredients'
export async function getIngredients() {
  try {
    // Obtém uma referência para a instância do Firestore
    // Obtém todos os documentos na coleção
    const snapshot = await getDocs(collection(db, 'ingredientes'));

    // Verifica se há algum documento na coleção
    if (snapshot.size > 0) {
      // Retorna o primeiro documento encontrado (você pode personalizar isso conforme necessário)
      return snapshot.docs[0].data()
    } else {
      console.log('Nenhum documento encontrado na coleção "ingredients".')
      return null
    }
  } catch (error) {
    console.error('Erro ao obter documento:', error)
    return null
  }
}
// Função para inserir ingrediente
export async function insertIngredients(newItems:string[]) {

}

// Função para obter a lista de 'pratos'
export async function getRefeicoes() {
    try {
      // Obtém todos os documentos na coleção
      const snapshot = await getDocs(collection(db, 'pratos'));
      // Verifica se há algum documento na coleção
      if (snapshot.size > 0) {
        // Retorna o primeiro documento encontrado (você pode personalizar isso conforme necessário)
        return snapshot.docs[0].data().pratos
      } else {
        console.log('Nenhum documento encontrado na coleção "ingredients".')
        return null
      }
    } catch (error) {
      console.error('Erro ao obter documento:', error)
      return null
    }
}
//