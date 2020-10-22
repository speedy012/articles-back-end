const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

//get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
    console.log('all');
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

//create an article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });
  try {
    const savedArticle = await article.save();
    res.json(savedArticle);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

//update an article (works now)
router.patch('/:articleId', async (req, res) => {
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: req.params.articleId },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
        },
      },
      { new: true }
    );
    console.log(updatedArticle);
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete an article
router.delete('/:articleId', async (req, res) => {
  try {
    const removedArticle = await Article.remove({ _id: req.params.articleId });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
