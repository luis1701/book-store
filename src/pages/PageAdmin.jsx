import { useEffect, useState } from "react"

const categories = ["DRAMA", "TERROR", "COMMEDY", "DOCUMENTALS"]

function PageAdmin(params) {
  const [books, setBooks] = useState([])
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    category: 'DRAMA',
    calification: 0,
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
    setBooks([...books, newBook])
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
            <option value={value}>{value}</option>
          )
        })}
      </select>
      <button onClick={() => saveBook()}>Agregar libro</button>
      <div>
        {books.map((book) => {
          return (
            <div>
              <p>Name: {book.name}</p>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <br/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PageAdmin