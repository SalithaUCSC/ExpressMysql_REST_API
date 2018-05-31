const express = require('express');
// initialize app
const router = express.Router();
// set mysql db connection 
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exmysql'
});
// connect to database
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// get all posts
router.get('/posts', function (req, res) {
    conn.query('SELECT * FROM posts', function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results });
    });
});
// get post by id
router.get('/posts/:id', function (req, res) {
    let post_id = req.params.id;
    if (!post_id) {
        return res.status(400).send({ error: true, message: 'Please provide post id' });
    }
    conn.query('SELECT * FROM posts where id=?', post_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results[0] });
    });
});
// search post
router.get('/posts/search/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    conn.query("SELECT * FROM posts WHERE title LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results });
    });
});
// add post
router.post('/posts/add', function (req, res) {
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;

    if (!title || !author || !description) {
        return res.status(400).send({ error:true, message: 'Please provide post details' });
    }
    conn.query("INSERT INTO posts SET ? ", { title: title, author: author, description: description }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Post added' });
    });
});
// edit post
router.get('/posts/edit/:id', function (req, res) {
    let post_id = req.params.id;
    if (!post_id) {
        return res.status(400).send({ error: true, message: 'Please provide post_id' });
    }
    conn.query('SELECT * FROM posts where id=?', post_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results[0] });
    });
});
// update post
router.put('/posts/update', function (req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let author = req.body.author;
    let description = req.body.description;

    if (!id || !author || !title || !description) {
        return res.status(400).send({ error: description, message: 'Please provide post details' });
    }
    conn.query("UPDATE posts SET title = ?, author = ?, description = ? WHERE id = ?", [title, author, description, id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'Post updated' });
    });
});

// delete post
router.delete('/posts/:id', function (req, res) {
    let post_id = req.params.id;
    conn.query('DELETE FROM posts WHERE id = ?', [post_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results, message: 'Post deleted' });
    }); 
});

module.exports = router;