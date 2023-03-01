import { useState } from 'react'

function Add(props) {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);

    let result;

    if (props.currentBook) {
      result = props.client.updateBook(props.currentBook._id, e.target.bookName.value, e.target.bookAuthor.value, e.target.bookReadStatus.value);
    } else {
      result = props.client.addBook(e.target.bookName.value, e.target.bookAuthor.value, e.target.bookReadStatus.value);
    }

    result.then(() => {
      setDisabled(false);
      document.getElementById("bookForm").reset();
      props.refreshList();
    }).catch((err) => {
      setDisabled(false);
      alert("YOU HAVE BEEN HACKED!!!!");
      console.log(err);
    })
  };

  return (
    <>
      <form id="bookForm" onSubmit={submitHandler}>
        name:
        <input
          type="text"
          name="bookName"
          defaultValue={props.currentBook.name}
          disabled={disabled}
        />
        author:
        <input
          type="text"
          name="bookAuthor"
          defaultValue={props.currentBook.author}
          disabled={disabled}
        />
        isRead:
        <input
          type="text"
          name="bookReadStatus"
          defaultValue={props.currentBook.isRead}
          disabled={disabled}
        />
        <br />
        <button type="submit" disabled={disabled}>
          Add book
        </button>
      </form>
    </>
  );
}

export default Add;