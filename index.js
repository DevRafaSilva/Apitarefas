const express = require('express');
const app = express();
const port = 3000;

let tarefas = []; // Lista de tarefas em memória

// Middleware para interpretar JSON
app.use(express.json());

// Rota para obter todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: 'Título da tarefa é obrigatório.' });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Rota para atualizar uma tarefa (marcar como concluída)
app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === parseInt(id));

  if (!tarefa) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});

// Rota para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;

  const index = tarefas.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  tarefas.splice(index, 1);
  res.status(204).send(); // Sem conteúdo
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
