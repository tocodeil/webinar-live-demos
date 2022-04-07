import knex, { getLatest, addReport } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handlePost(req, res);
  } else if (req.method === 'GET') {
    return handleGet(req, res);
  } else {
    console.log(`Unknown req method ${req.method}`);
  }
}

async function handleGet(req, res) {
  const latest = await getLatest(10);
  res.status(200).json(latest);
}

async function handlePost(req, res) {
  const { reporter, text } = JSON.parse(req.body);
  await addReport(reporter, text);
  res.status(201);
}

