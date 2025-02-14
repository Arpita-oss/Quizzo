const express = require('express');
const { 
    login,
    signup,
    getQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz
} = require('../controllers/quizController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/quizzes', getQuizzes);
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

module.exports = router;