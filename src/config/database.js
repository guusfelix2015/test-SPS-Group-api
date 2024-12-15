const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');
const SECRET_KEY = 'sua_chave_secreta_aqui';

const defaultAdmin = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'admin',
  email: 'admin@spsgroup.com.br',
  password: '1234',
  type: 'admin',
};

const ensureDirectoryExists = () => {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

const loadData = () => {
  ensureDirectoryExists();
  if (fs.existsSync(DB_FILE)) {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  }
  const initialData = {
    users: [defaultAdmin],
  };
  saveData(initialData);
  return initialData;
};

const saveData = (data) => {
  ensureDirectoryExists();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
  loadData,
  saveData,
  SECRET_KEY,
};
