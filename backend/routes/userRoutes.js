const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all users' });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create new user' });
});

module.exports = router;
