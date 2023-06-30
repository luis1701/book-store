import { useState } from "react"

function Book(props) {
  const {role, book, removeBook, addBookToMyList, checkBookAsReaded, addComment} = props

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

  return (
    <div style={{background: 'grey', width: "300px", borderRadius: "20px"}} key={book.name}>
      <p>Name: {book.name}</p>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      { book.readed !== undefined && <p>Leido: {book.readed ? 'leido' : 'no leido'}</p> }
      <br/>
      {getActions()}
    </div>
  )
}

export default Book