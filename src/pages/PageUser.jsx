import { useEffect, useState } from "react"
import Section from "../components/Section"
import { getAll, update } from "../services/BooksServices"

const categories = ["DRAMA", "TERROR", "COMEDY", "DOCUMENTALS"]

function PageUser(params) {
  const [books, setBooks] = useState([])
  const [myBooks, setMyBooks] = useState([])
  const [userName, setUserName] = useState("")

  useEffect(() => {
    reloadBooksData()
    const myBooks = localStorage.getItem('myBooks')
    if (myBooks) {
      setMyBooks(JSON.parse(myBooks))
    }
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { name } = JSON.parse(userInfo)
      setUserName(name)
    }
  }, [])

  const reloadBooksData = () => {
    getAll()
      .then((result) => {
        console.log(result)
        setBooks(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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

  const addComment = async (book, comment) => {
    const existBookInStore = books.find((bookStore) => bookStore.name === book.name)

    if (!existBookInStore) {
      alert("El libro no existe")
      return
    }

    const newComment = {
      author: userName,
      date: new Date().toDateString(),
      comment
    }

    existBookInStore.comments = [...existBookInStore.comments, newComment]

    await update(existBookInStore._id, { comments: existBookInStore.comments })
    await reloadBooksData()
  }

  const addCalification = async (book, calification) => {
    const findBook = books.find(bookFromStore => bookFromStore.name === book.name)

    console.log(findBook)

    if (!findBook) {
      alert('El libro no existe')
      return
    }

    if (typeof findBook.calification === 'number') {
      findBook.calification = []
    }

    const newCalification = {
      calification: Number(calification),
      user: userName
    }

    const findCalification = findBook.calification.find((calificationValue) => calificationValue?.user === userName)


    if (findCalification) {
      const otherCalifications = findBook.calification.filter((calification) => calification.user !== userName)
      findBook.calification = [...otherCalifications, newCalification]
      
      await update(findBook._id, { calification: findBook.calification })
      await reloadBooksData()
      return
    }

    findBook.calification = [...findBook.calification, newCalification]
    await update(findBook._id, { calification: findBook.calification })
    await reloadBooksData()

  }

  
  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '10px', padding: '20px', justifyContent: 'space-between'}}>
      <div>
        <h1>Biblioteca</h1>
        <Section categories={categories} books={books} addBookToMyList={addBookToMyList} addComment={addComment} addCalification={addCalification}/>
      </div>
      <div>
        <h1>Mis libros</h1>
        <Section categories={categories} books={myBooks} checkBookAsReaded={checkBookAsReaded} />
      </div>
    </div>
  )
}

export default PageUser