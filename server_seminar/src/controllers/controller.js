const fetch = require('node-fetch');

const getAllPosts = async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить сообщения' });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Сообщение не найдено' });
    }
    const post = await response.json();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить сообщения' });
  }
};

module.exports = { getAllPosts, getPostById };