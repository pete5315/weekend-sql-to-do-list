const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding book`, newTask);

    let queryText = `INSERT INTO "books" ("author", "title")  VALUES ($1, $2);`;
    pool.query(queryText, [newBook.author, newBook.title])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new book`, error);
            res.sendStatus(500);
        });
});



// Get all books
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "books" ORDER BY "title";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
  });
});


// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status
router.put('/:id', (req, res) => {
  let reqId = req.params.id;
  let isReadID = req.body.isRead;
  let sqlText = ""
  console.log('Change request for id', reqId);
  if (isReadID==='True') {
  sqlText = `UPDATE "books" SET "isRead" = 'True' WHERE id=$1;`;
}
  else {
    res.sendStatus(500);
  }
  pool.query(sqlText, [reqId])
      .then( (result) => {
      console.log('Updated isRead');
      res.sendStatus(200);
      })
      .catch( (error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
      })
  })

  router.put('/put2/:id', (req, res) => {
    let reqId = req.params.id;
    let reqTitle = req.body.title;
    console.log(reqTitle);
    let reqAuthor = req.body.author;
    let sqlText = ""
    console.log('Change request for title/author', reqId);
    sqlText = `UPDATE "books" SET "title" = $1, "author" = $2 WHERE "id"=$3;`;
//, 
    pool.query(sqlText, [reqTitle, reqAuthor, reqId])
        .then( (result) => {
        console.log('Updated isRead');
        res.sendStatus(200);
        })
        .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
        })
    })
  
// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM books WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then( (result) => {
        console.log('Song deleted');
        res.sendStatus(200);
        })
        .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
        })
    })

module.exports = router;
