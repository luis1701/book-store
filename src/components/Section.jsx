import { useEffect, useState } from "react"


function Section(props) {
  const [searchText, setSearchText] = useState("")
  const {books, categories, removeBook} = props
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
                    <div style={{background: 'grey', width: "300px", borderRadius: "20px"}} key={book.name}>
                      <p>Name: {book.name}</p>
                      <p>Author: {book.author}</p>
                      <p>Category: {book.category}</p>
                      <br/>
                      {role === "ADMIN" && <button onClick={() => removeBook(book.name)}>
                        Delete
                      </button>}
                    </div>
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