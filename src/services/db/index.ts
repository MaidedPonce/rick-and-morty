import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase/firebase.config'
import { DocType } from 'src/types'

const getDocId = async(id: string) => {
  const querySnapshot = await getDocs(collection(db, 'favorites'))
  let docID = ''
  querySnapshot.forEach((doc) => {
    if (doc.data().user_id === id) {
      docID = doc.id
    }
  })
  return docID 
}

const getFavorites = async (id: string) => {
  const querySnapshot = await getDocs(collection(db, 'favorites'))
  for (const doc of querySnapshot.docs) {
    if (doc.data().user_id === id) {
      console.log(doc.data())
      const result: DocType = { ...doc.data(), id: doc.id }
      return result
    }
  }
}

export const saveNewCollection = (data: any) => {
  console.log(data)
  addDoc(collection(db, 'favorites'), data)
}

const updateFavorites = async ({ data, doc_id }: any) => {
  console.log(data)
  const updatedDoc = await updateDoc(doc(db, 'favorites', doc_id), data)
  return updatedDoc
}

export { getFavorites, updateFavorites, getDocId }
