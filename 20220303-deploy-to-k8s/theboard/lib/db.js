import fs from 'fs';

const dbPassword = fs.readFileSync(process.env.POSTGRES_PASSWORD_FILE, { encoding: 'utf8' }).trim();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.POSTGRES_USER,
    password : dbPassword,
    database : process.env.POSTGRES_DB,
  }
});

export async function addReport(reporter, text) {
  await knex('messages').insert({ reporter, text });
}

export async function getLatest(n) {
  return await knex.from('messages').select('*').orderBy('id', 'desc').limit(n);
}


export default knex;
