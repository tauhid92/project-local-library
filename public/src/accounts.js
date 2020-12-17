function findAccountById(accounts, id) {
  return accounts.find(account=>account.id===id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account_1, account_2) =>
  (account_1.name.last.toLowerCase())>(account_2.name.last.toLowerCase())?1:-1);
}

function numberOfBorrows({id}, books) {
  return books.reduce((acc, book) => {
    acc += (book.borrows.reduce((acc, borrow) => {
      if (borrow.id === id) acc += 1;
      return acc;
    }, 0));
    return acc;
  },0);
}

function getBooksPossessedByAccount({id}, books, authors) {
  return books.filter(book =>
    book.borrows.some(borrow =>
      (borrow.id === id && borrow.returned === false))).reduce((acc, book) => {
        book.borrows = book.borrows.find(borrow =>
          (borrow.id === id && borrow.returned === false));
        book.author = authors.find(author => author.id === book.authorId);
        acc.push(book);
        return acc;
      }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
