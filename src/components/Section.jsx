import { useEffect, useState } from "react"
import Book from "./Book"


function Section(props) {
  const [searchText, setSearchText] = useState("")
  const {books, categories, removeBook, addBookToMyList, checkBookAsReaded, addComment} = props
  const [role, setRole] = useState()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    const userInfoAsObject = JSON.parse(userInfo)
    setRole(userInfoAsObject.role)
  }, [])

  const filterBooks = (category) => {
    return books.filter((book) => {
      return (book.name.includes(searchText) || book.author.includes(searchText)) && book.category === category
    })
  }

  return (
    <div>
      <div>
        <input placeholder="Buscador..." type="text" onChange={(e) => setSearchText(e.target.value)} />
      </div>
      {
        categories.map((category) => {
          return (
            <div key={category}>
              <div>
                <h1>{category}</h1>
              </div>
              <div style={{display:"flex", gap: "10px", background: "cornsilk", padding: "20px"}}>
                {filterBooks(category).length > 0 ? filterBooks(category).map((book) => {
                  return (
                    <Book role={role} book={book} removeBook={removeBook} addBookToMyList={addBookToMyList} checkBookAsReaded={checkBookAsReaded} addComment={addComment}/>
                  )
                }) : "No se obtuvo resultados"}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Section