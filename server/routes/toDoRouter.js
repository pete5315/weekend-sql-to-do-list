const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "tasks" ("description", "author")  VALUES ($1, $2);`;
    pool.query(queryText, [newTask.description, newTask.author])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error`, error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "author";';
    pool.query(queryText).then(result => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error', error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Change request for id', reqId);
    let sqlText = `UPDATE "tasks" SET "isComplete" = 'True' WHERE id=$1;`;
    pool.query(sqlText, [reqId])
    .then( (result) => {
        console.log('Task completed')
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM tasks WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then( (result) => {
        console.log('Task deleted');
        res.sendStatus(200);
        })
        .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
        })
    })

module.exports = router;
