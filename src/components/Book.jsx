import { useState } from "react"
import Calification from "./Calification"

function Book(props) {
  const {role, book, removeBook, addBookToMyList, checkBookAsReaded, addComment, addCalification} = props

  const [comment, setComment] = useState("")
  const printComments = () => {
    return (
      book.comments.map((comment) => {
        return (
          <div>
            <p>Author: {comment.author}</p>
            <p>Comentario: {comment.comment}</p>
            <p>Fecha: {comment.date}</p>
          </div>
        )
      })
    )
  }


  const commentsComponent = () => {
    return (
      <div style={{ margin: '16px' }}>
        <input value={comment} type="text" placeholder="Ingresa un comentario" onChange={(e) => setComment(e.target.value)} />
        <button onClick={() => {
          addComment(book, comment)
          setComment("")
        }}>Add comment</button>
        <div style={{ margin: '16px', padding: '16px', background: 'white', borderRadius: '4px' }}>
          {book.comments && book.comments.length > 0 ? printComments() : 'Sin Comentarios'}
        </div>
      </div>
    )
  }

  const getActions = () => {
    switch (role) {
      case 'ADMIN':
        return (
          removeBook ? <button onClick={() => removeBook(book.name)}>
            Delete
          </button> : ''
        )
      case 'USER':
        return (
          <div>
            {addBookToMyList ? <button onClick={() => addBookToMyList(book)}>
              Add book to my list
            </button> : ''}
            {checkBookAsReaded && book.readed === false ? <button onClick={() => checkBookAsReaded(book)}>Check book as readed</button> : ''}
            {addBookToMyList && commentsComponent()}
          </div>
        )
      default:
        return '';
    }
  }

  const getCalification = () => {
    if (typeof book.calification === 'number') {
      book.calification = []
    }

    if (book.calification.length === 0) {
      return 0
    }

    return book.calification.reduce((acc, value) => {
      const { calification } = value
      return acc + parseInt(calification)
    }, 0) / book.calification.length
  }

  return (
    <div style={{background: 'grey', width: "300px", borderRadius: "20px"}} key={book.name}>
      <p>Name: {book.name}</p>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <select name="starts" id="starts" onChange={(e) => addCalification(book, e.target.value)}>
        <option key={1} value={1}>1</option>
        <option key={2} value={2}>2</option>
        <option key={3} value={3}>3</option>
        <option key={4} value={4}>4</option>
        <option key={5} value={5}>5</option>
      </select>
      {addCalification && <Calification range={5} calification={getCalification()} />}
      { book.readed !== undefined && <p>Leido: {book.readed ? 'leido' : 'no leido'}</p> }
      <br/>
      {getActions()}
    </div>
  )
}

export default Book