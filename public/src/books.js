function findAuthorById(authors, id) {
  return authors.find(author=>author.id===id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let falseArray = books.filter(book => book.borrows.some(borrow=>borrow.returned===false));
  let trueArray = books.filter(book => book.borrows.every(borrow=>borrow.returned===true));
  console.log([falseArray, trueArray]);
  return [falseArray, trueArray];
}

function getBorrowersForBook(book, accounts) {
  const uniqueBorrowIds = Array.from(new Set(book.borrows.map(borrow => borrow.id)));
  const borrowedList=uniqueBorrowIds.map(id => {
    return book.borrows.find(borrow => borrow.id === id)
  });
  return borrowedList.reduce((collector, borrowed) => {
    const extractedAccount = accounts.find(account => account.id === borrowed.id);
    if (extractedAccount) extractedAccount.returned = borrowed.returned;
    collector.push(extractedAccount);
    return collector;
  },[]); 
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
