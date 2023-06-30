import { useEffect, useState } from "react"
import Section from "../components/Section"

const categories = ["DRAMA", "TERROR", "COMMEDY", "DOCUMENTALS"]

function PageAdmin(params) {
  const [books, setBooks] = useState([])
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    category: 'DRAMA',
    calification: [], // [3,5,2,4]
    comments: []
  })

  useEffect(() => {
    const books = localStorage.getItem('books')
    if (books) {
      setBooks(JSON.parse(books))
    }
  }, [])

  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books))
    }
  }, [books])

  const saveBook = () => {
    const existBook = books.find((book) => book.name === newBook.name)
    if (existBook) {
      resetForm()
      alert("El libro ya se registro")
      return
    }
    setBooks([...books, newBook])
    resetForm()
  }

  const resetForm = () => {
    setNewBook({
      name: '',
      author: '',
      category: 'DRAMA',
      calification: [],
      comments: []
    })
  }

  const removeBook = (bookName) => {
    const booksUpdated = books.filter((book) => book.name !== bookName)
    setBooks(booksUpdated)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px'}}>
      <input
        type="text"
        value={newBook.name}
        placeholder="Nombre del libro" onChange={(e) => setNewBook({...newBook, name: e.target.value})}/>
      <input
        type="text"
        value={newBook.author}
        placeholder="Autor del libro" onChange={(e) => setNewBook({...newBook, author: e.target.value})}/>
      <select value={newBook.category} onChange={(e) => setNewBook({...newBook, category: e.target.value})}>
        {categories.map((value) => {
          return (
            <option key={value} value={value}>{value}</option>
          )
        })}
      </select>
      <button disabled={newBook.name === "" || newBook.author === ""} onClick={() => saveBook()}>Agregar libro</button>
      <br />
      <br />
      <br />
      <Section categories={categories} books={books} removeBook={removeBook} />
    </div>
  )
}

export default PageAdmin