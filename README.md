# HemoVita

Sistema de gestão para clínicas e hospitais, focado em controle de pacientes, profissionais, atendimentos, exames, prontuários, triagem e mais.

---

## 📦 Tecnologias Utilizadas

- **Frontend:** React + Material UI
- **Backend:** Node.js + Express
- **Banco de Dados:** MySQL ou PostgreSQL
- **Autenticação:** JWT
- **Containerização:** Docker

---

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [Git](https://git-scm.com/)

---

### 2. Clonando o repositório

```bash
git clone https://github.com/seu-usuario/HemoVita_Project.git
cd HemoVita_Project
```

---

### 3. Rodando com Docker

#### 3.1. Configuração

- Certifique-se de que existe um arquivo `docker-compose.yml` na raiz do projeto.
- Configure as variáveis de ambiente nos arquivos `.env` do backend e frontend, se necessário.

#### 3.2. Subindo os containers

```bash
docker-compose up --build
```

- O backend estará disponível em `http://localhost:3001`
- O frontend estará disponível em `http://localhost:3000`
- O banco de dados estará disponível conforme configuração do `docker-compose.yml`

#### 3.3. Parando os containers

```bash
docker-compose down
```

---

### 4. Rodando manualmente (sem Docker)

#### 4.1. Backend

```bash
cd backend
npm install
npm start
```

#### 4.2. Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📝 Como acessar

- Acesse [http://localhost:3000](http://localhost:3000) no navegador.
- Faça login com um usuário cadastrado no banco de dados.
- Caso não haja usuários, crie manualmente no banco ou via endpoint de cadastro (se implementado).

---

## 🛠️ Funcionalidades

- Login e autenticação JWT
- Dashboard com indicadores dinâmicos por perfil de usuário
- Filtro de busca em listagens (ex: pacientes, exames, atendimentos, etc)
- Exportação de dados em PDF nas principais telas
- Cadastro, edição e exclusão de:
  - Pacientes
  - Profissionais
  - Atendimentos
  - Exames
  - Prontuários
  - Atestados
  - Evoluções
  - Farmácia
  - Checklist de Triagem
  - Triagem
  - Usuários (admin)
- Menu lateral minimalista e responsivo
- Feedback visual de sucesso/erro
- Permissões por papel de usuário

---

## 🆕 Novidades

### Indicadores no Dashboard
- Visualização de totais de pacientes, atendimentos e exames, com gráficos mensais.
- Os indicadores exibidos variam conforme o perfil do usuário (admin, médico, enfermeiro, etc).

### Filtro por Busca
- Todas as listagens principais possuem campo de busca para facilitar a localização de registros.

### Exportação em PDF
- É possível exportar os dados das principais telas (ex: listagem de pacientes, exames, atendimentos) em formato PDF com apenas um clique.

---

## 🧑‍💻 Estrutura de Pastas

```
HemoVita_Project/
  backend/
    src/
    package.json
    ...
  frontend/
    src/
      pages/
      components/
      contexts/
      ...
    package.json
    ...
  docker-compose.yml
```

---

## ❓ Dúvidas Frequentes

- **Erro de CORS:** Certifique-se que o backend aceita requisições do frontend (`http://localhost:3000`).
- **Banco de dados não conecta:** Verifique as variáveis de ambiente e se o banco está rodando.
- **Usuário não cadastrado:** Crie um usuário admin diretamente no banco ou via endpoint.

---

## 🐳 Exemplo de docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: mysql:8
    restart: always
    environment:
      MYSQL_DATABASE: hemovita
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: hemovita
      MYSQL_PASSWORD: hemovita
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build: ./backend
    restart: always
    environment:
      DB_HOST: db
      DB_USER: hemovita
      DB_PASS: hemovita
      DB_NAME: hemovita
      JWT_SECRET: sua_chave_secreta
      PORT: 3001
    ports:
      - "3001:3001"
    depends_on:
      - db

  frontend:
    build: ./frontend
    restart: always
    environment:
      REACT_APP_API_URL: http://localhost:3001/api
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db_data:
```

> **Ajuste as variáveis conforme sua necessidade.**

---

## 🗄️ Banco de Dados

### Como importar as tabelas e dados

O projeto já inclui um arquivo SQL de dump do banco com todas as tabelas e dados de exemplo:

- Caminho: `backend/src/database/Dump.sql`

#### **Se estiver usando Docker**

No seu `docker-compose.yml`, adicione o volume abaixo ao serviço do banco de dados para que o script seja executado automaticamente na primeira inicialização:

```yaml
services:
  db:
    image: mysql:8
    # ...outras configs...
    volumes:
      - ./backend/src/database/Dump.sql:/docker-entrypoint-initdb.d/init.sql
```

Assim, ao rodar `docker-compose up`, o banco será criado com todas as tabelas e dados do arquivo.

---

#### **Se for importar manualmente**

1. Certifique-se de que o banco de dados `hemovita` já existe (ou crie-o).
2. No terminal, execute:

   ```bash
   mysql -u seu_usuario -p hemovita < backend/src/database/Dump.sql
   ```

   - Substitua `seu_usuario` pelo usuário do seu MySQL.
   - Informe a senha quando solicitado.

---

#### **Se estiver usando MySQL Workbench**

1. Abra o MySQL Workbench e conecte ao seu servidor.
2. Selecione o banco `hemovita` (ou crie um novo com esse nome).
3. Vá em **File > Open SQL Script** e abra o arquivo `Dump.sql`.
4. Clique em **Run** (ícone de raio) para executar o script.

---

Pronto! O banco estará pronto para uso com todas as tabelas e dados necessários para rodar o sistema.