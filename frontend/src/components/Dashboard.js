import { useEffect, useState } from 'react'
import Add from './Add';

function Dashboard(props) {
  const [books, setBooks] = useState({});
  const [currentBook, setCurrentBook] = useState({});

  const refreshList = () => {
    props.client.getBooks().then(res => {
      setBooks(res.data);
    });
  }

  const removeBook = (id) => {
    props.client.removeBook(id).then(() => refreshList());
  }

  const updateBook = (book) => {
    setCurrentBook(book);
  }

  useEffect(() => {
    refreshList()
  }, [])

  const buildRows = () => {
    return books.map(
      book => {
        return (
          <tr key={book.id}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.isRead}</td>
            <td>
              <button onClick={() => updateBook(book)}>Edit</button>
              <button onClick={() => removeBook(book._id)}>Delete</button>
            </td>
          </tr>
        )
      }
    )
  }

  return (
    <div>Dashboard
      <table>
        <thead>
          <tr>
            <th>Book name</th>
            <th>Book author</th>
            <th>Book status</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? buildRows() : "There are no books :("}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />

      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          setCurrentBook(undefined);
        }}
        currentBook={currentBook}
      />
    </div>
  )
}

export default Dashboard;