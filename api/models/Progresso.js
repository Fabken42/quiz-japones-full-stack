const mongoose = require('mongoose');

const progressoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  pergunta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 3
  }
});

const Progresso = mongoose.model('Progresso', progressoSchema);

module.exports = Progresso;