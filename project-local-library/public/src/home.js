function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  return books.reduce((count, book) => { 
    if (book.borrows[0].returned === false) count += 1;
    return count;
  },0);
}

function getMostCommonGenres(books) {
  let genreList = books.map(book => book.genre);
  fresh_GenreList = Array.from(new Set(genreList));
  let newObjectList = fresh_GenreList.reduce((acc, genre_f) => {
    let newObject = {
       name: genre_f, count: books.reduce((count, book) => {
         if (book.genre === genre_f) count += 1;
         return count;
     },0) };
    acc.push(newObject);
    return acc;
  }, []);
  let sortedList = newObjectList.sort((first, second) => (first.count - second.count) * -1);
  return (sortedList.length>5)?sortedList.splice(0,5):sortedList;
}

function getMostPopularBooks(books) {
  let newObjectArray = books.reduce((acc, {title, borrows}) => {
    let newObject = { name: title, count: borrows.length };
    if(borrows.length)
    acc.push(newObject);
    return acc;
  }, []);
  let sortedArray = newObjectArray.sort((first, second) => (first.count - second.count)*-1);
  console.log(sortedArray.slice(0, 5));
  return (sortedArray.length>5)?sortedArray.slice(0, 5):sortedArray;
}

function getMostPopularAuthors(books, authors) {
  let newObjectArray = authors.reduce((acc, author) => {
    let newObject = {
      name: `${author.name.first} ${author.name.last}`, count: 
        books.filter((book) => book.authorId === author.id).reduce((total, book) => {
          if(book.borrows.length)
          total += book.borrows.length;
          return total;
        },0)     
    };
    acc.push(newObject);
    return acc;
  }, []);
  let sortedArray = newObjectArray.sort((first, second) => (first.count - second.count)*-1);
  console.log(sortedArray.slice(0,5));
  return (sortedArray.length > 5) ? sortedArray.slice(0, 5) : sortedArray;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
