const db = require('./src/utils/db');
const bcrypt = require('bcryptjs');

async function seed() {

  await db.query('DELETE FROM Profissional');
  await db.query('DELETE FROM Usuarios');

  const hash = await bcrypt.hash('123456', 10);

  const usuarios = [
    { email: 'admin@teste.com', senha: hash, role: 'admin', status: 'ativo' },
    { email: 'medico@teste.com', senha: hash, role: 'medico', status: 'ativo' },
    { email: 'enfermeiro@teste.com', senha: hash, role: 'enfermeiro', status: 'ativo' },
    { email: 'tecnico@teste.com', senha: hash, role: 'tecnico', status: 'ativo' },
    { email: 'recepcao@teste.com', senha: hash, role: 'recepcao', status: 'ativo' }
  ];

  const usuarioIds = [];
  for (const u of usuarios) {
    const [result] = await db.query(
      'INSERT INTO Usuarios (email, senha, role, status) VALUES (?, ?, ?, ?)',
      [u.email, u.senha, u.role, u.status]
    );
    usuarioIds.push(result.insertId);
  }

  await db.query(
    'INSERT INTO Profissional (nome_profi, reg_profi, agenda, contato, especialidade, id_usuario) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
    [
      'Dr. João Silva', 'CRM123456', 'Seg-Sex 08:00-17:00', '(11) 99999-9999', 'Cardiologia', usuarioIds[1],
      'Enf. Maria Souza', 'COREN654321', 'Seg-Sex 08:00-17:00', '(11) 98888-8888', 'Enfermagem', usuarioIds[2],
      'Tec. Carlos Lima', 'TECN789012', 'Seg-Sex 08:00-17:00', '(11) 97777-7777', 'Técnico de Enfermagem', usuarioIds[3],
      'Recep. Ana Paula', 'REC345678', 'Seg-Sex 08:00-17:00', '(11) 96666-6666', 'Recepção', usuarioIds[4]
    ]
  );

  console.log('Seed concluído!');
  process.exit();
}

seed();