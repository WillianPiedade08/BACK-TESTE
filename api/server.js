const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('../src/routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.json({
    titulo: 'API está funcionando!',
    rotas: [
      { rota: '/usuarios', descricao: 'Rotas para CRUD de usuários' },
      { rota: '/login', descricao: 'Rota de Login de usuário' },
      { rota: '/produtos', descricao: 'Rotas de CRUD de produtos' },
      { rota: '/pedidos', descricao: 'Rotas de CRUD de pedidos' },
      { rota: '/pagamentos', descricao: 'Rotas de CRUD de pagamento' }
    ]
  });
});

app.listen(5000, () => {
  console.log('API executando em http://localhost:5000');
});
