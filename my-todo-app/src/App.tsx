import React, { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
 
const firebaseConfig = {
  apiKey: "AIzaSyATswMU4crSuTH5wHPzqslrQD-E2q1tEEk",
  authDomain: "sudo-class-staging.firebaseapp.com",
  projectId: "sudo-class-staging",
  storageBucket: "sudo-class-staging.appspot.com",
  messagingSenderId: "791456679537",
  appId: "1:791456679537:web:31a7f433febce40b4b3dd0",
  measurementId: "G-B569E4RLBR",
}
 
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
 
function ItemList() {
  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [filter, setFilter] = useState("all")
 
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        checked: doc.data().checked || false,
        ...doc.data(),
      }))
      setItems(itemsData)
    })
    return unsubscribe
  }, [])
 
  const handleAddItem = async () => {
    if (inputValue.trim()) {
      await addDoc(collection(db, "items"), { text: inputValue, checked: false })
      setInputValue("")
    }
  }
 
  const handleRemoveItem = async (id) => {
    const itemRef = doc(db, "items", id)
    await deleteDoc(itemRef)
  }
 
  const handleToggleCheck = async (id) => {
    const item = items.find((item) => item.id === id)
    const itemRef = doc(db, "items", id)
    await updateDoc(itemRef, { checked: !item.checked })
  }
 
  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.checked
    if (filter === "pending") return !item.checked
    return true
  })
 
  return (
<div>
<input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new item"
      />
<button onClick={handleAddItem}>Add Item</button>
<div>
<button onClick={() => setFilter("all")}>All</button>
<button onClick={() => setFilter("completed")}>Completed</button>
<button onClick={() => setFilter("pending")}>Pending</button>
</div>
 
      <div>
        {filteredItems.map((item) => (
<div key={item.id}>
<label>
<input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggleCheck(item.id)}
              />
              {item.text}
</label>
<button onClick={() => handleRemoveItem(item.id)}>Remove</button>
</div>
        ))}
</div>
</div>
  )
}
 
export default ItemList