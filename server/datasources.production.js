'use strict';

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: 3306,
    url: '',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    name: 'db',
    user: process.env.DB_USER,
    connector: 'mysql',
  },
  storage: {
    name: 'storage',
    connector: 'loopback-component-storage',
    provider: 'amazon',
    key: process.env.STORAGE_KEY,
    keyId: process.env.STORAGE_KEY_ID,
    maxFileSize: '52428800',
  },
};
