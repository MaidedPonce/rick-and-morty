import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase/firebase.config'
import { Doc, DocType, UpdateDataType } from 'src/types'

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
      const result: DocType = { ...doc.data(), id: doc.id }
      return result
    }
  }
}

export const saveNewCollection = (data: Doc) => {
  addDoc(collection(db, 'favorites'), data)
}

const updateFavorites = async ({ data, doc_id }: UpdateDataType) => {
  console.log(data)
  const updatedDoc = await updateDoc(doc(db, 'favorites', doc_id), data)
  return updatedDoc
}

export { getFavorites, updateFavorites, getDocId }
