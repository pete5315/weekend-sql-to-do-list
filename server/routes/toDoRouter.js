const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//route to post new tasks
router.post('/',  (req, res) => {
    //define the information from the request
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    //set up query text to send to SQL
    let queryText = `INSERT INTO "tasks" ("description", "author", "timeCompleted")  VALUES ($1, $2, CURRENT_DATE);`;
    //send the query to SQL
    pool.query(queryText, [newTask.description, newTask.author])
    //if SQL doesn't error
    .then(result => {
        res.sendStatus(201);
    })
    //if SQL DOES error
    .catch(error => {
        console.log(`Error`, error);
        res.sendStatus(500);
    });
});

//route to get tasks from database
router.get('/', (req, res) => {
    //set up query text to send to SQL
    let queryText = 'SELECT * FROM "tasks" ORDER BY "isComplete", "author";';
    //send the query to SQL
    pool.query(queryText)
    //if SQL doesn't error
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    })
    //if SQL DOES error
    .catch(error => {
        console.log('error', error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    //define the information from the request
    let reqId = req.params.id;
    let reqIsComplete = req.body.isComplete;
    console.log('Change request for id', reqIsComplete,reqId);
    //set up query text to send to SQL
    let sqlText = `UPDATE "tasks" SET "isComplete" = $1, "timeCompleted" = null WHERE id=$2;`;
    if (reqIsComplete=='true') {
        sqlText = `UPDATE "tasks" SET "isComplete" = $1, "timeCompleted" = CURRENT_DATE WHERE id=$2;`;
    }
    //send the query to SQL
    pool.query(sqlText, [reqIsComplete,reqId])
    //if SQL doesn't error
    .then( (result) => {
        console.log('Task completed')
        res.sendStatus(200);
    })
    //if SQL DOES error
    .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    //define the information from the request
    let reqId = req.params.id;
    //set up query text to send to SQL
    let sqlText = 'DELETE FROM tasks WHERE id=$1;';
    //send the query to SQL
    pool.query(sqlText, [reqId])
    //if SQL doesn't error
    .then( (result) => {
        console.log('Task deleted');
        res.sendStatus(200);
    })
    //if SQL DOES error
    .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
    })

module.exports = router;
