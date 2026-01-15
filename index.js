process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';

// Menyiapkan __dirname untuk ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk menyajikan file statis dari direktori 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan router untuk semua permintaan yang diawali dengan /api
app.use('/api', apiRouter);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Dokumentasi tersedia di http://localhost:${PORT}`);

});
export default app;
