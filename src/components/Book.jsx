function Book(props) {
  const {role, book, removeBook, addBookToMyList, checkBookAsReaded} = props

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