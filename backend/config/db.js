const postgres = require('postgres')
require('dotenv').config()


const sql = postgres(process.env.DATABASE_URL)

console.log('Connected to Supabase PostgreSQL')

module.exports = sql
