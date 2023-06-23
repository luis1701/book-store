import { useEffect, useState } from "react"
import Section from "../components/Section"

const categories = ["DRAMA", "TERROR", "COMMEDY", "DOCUMENTALS"]

function PageUser(params) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const books = localStorage.getItem('books')
    if (books) {
      setBooks(JSON.parse(books))
    }
  }, [])

  
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px'}}>
      <Section categories={categories} books={books} />
    </div>
  )
}

export default PageUser