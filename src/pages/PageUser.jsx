import { useEffect, useState } from "react"
import Section from "../components/Section"

const categories = ["DRAMA", "TERROR", "COMMEDY", "DOCUMENTALS"]

function PageUser(params) {
  const [books, setBooks] = useState([])
  const [myBooks, setMyBooks] = useState([])

  useEffect(() => {
    const books = localStorage.getItem('books')
    if (books) {
      setBooks(JSON.parse(books))
    }
    const myBooks = localStorage.getItem('myBooks')
    if (myBooks) {
      setMyBooks(JSON.parse(myBooks))
    }
  }, [])

  useEffect(() => {
    if (myBooks.length > 0) {
      localStorage.setItem('myBooks', JSON.stringify(myBooks))
    }
  }, [myBooks])

  const addBookToMyList = (bookToAdd) => {
    const existBookInMyList = myBooks.find((book) => book.name === bookToAdd.name)
    if (existBookInMyList) {
      alert("El libro ya esta en tu lista")
      return
    }
    setMyBooks([...myBooks, { ...bookToAdd, readed: false }])
  }

  const checkBookAsReaded = (bookToCheckAsReaded) => {
    const existBookInMyList = myBooks.find((book) => book.name === bookToCheckAsReaded.name)
    if (!existBookInMyList) {
      alert("El libro que quieres marcar como leido no existe entre tus libros")
      return
    }
    existBookInMyList.readed = true
    const otherBooks = myBooks.filter(book => book.name !== bookToCheckAsReaded.name)
    setMyBooks([...otherBooks, existBookInMyList])
  }

  
  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '10px', padding: '20px', justifyContent: 'space-between'}}>
      <div>
        <h1>Biblioteca</h1>
        <Section categories={categories} books={books} addBookToMyList={addBookToMyList}/>
      </div>
      <div>
        <h1>Mis libros</h1>
        <Section categories={categories} books={myBooks} checkBookAsReaded={checkBookAsReaded} />
      </div>
    </div>
  )
}

export default PageUser