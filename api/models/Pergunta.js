const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    pergunta: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    imagem: {
        type: String,
        required: true,
        trim:true
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz; 
