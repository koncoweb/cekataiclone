# AI Chatbot dengan Integrasi Database

Aplikasi fullstack yang menggunakan API OpenRouter dengan model Qwen3-235b untuk menjawab pertanyaan terkait produk, dengan integrasi database Baserow untuk mengakses informasi karyawan.

## Fitur

- Antarmuka chat real-time
- Integrasi dengan API OpenRouter (model Qwen3-235b)
- Integrasi database Baserow untuk data karyawan
- Dua mode pencarian: berdasarkan kata kunci atau berdasarkan ID karyawan spesifik
- Pembuatan konteks dinamis untuk respons AI
- UI modern dan responsif
- Indikator loading dan penanganan error

## Struktur Proyek

```
ai-chatbot/
├── backend/                       # Server Express
│   ├── .env                       # Variabel lingkungan
│   ├── package.json               # Dependensi backend
│   ├── server.js                  # Endpoint API dan logika server
│   └── utils/                     # Fungsi utilitas
│       └── baserow.js             # Integrasi API Baserow
└── frontend/                      # Aplikasi React
    ├── public/                    # Aset statis
    ├── src/                       # Kode sumber
    │   ├── components/            # Komponen React
    │   │   ├── Chat.jsx           # Komponen antarmuka chat
    │   │   └── DatabaseSelector.jsx # UI integrasi database
    │   ├── styles/                # Gaya khusus komponen
    │   │   └── DatabaseSelector.css # Gaya untuk pemilih database
    │   ├── App.css                # Gaya aplikasi
    │   ├── App.jsx                # Komponen aplikasi utama
    │   └── main.jsx               # Entry point
    └── package.json               # Dependensi frontend
```

## Petunjuk Pengaturan

### Pengaturan Backend

1. Navigasi ke direktori backend:
   ```
   cd backend
   ```

2. Instal dependensi:
   ```
   npm install
   ```

3. Buat file `.env` dengan variabel berikut:
   ```
   PORT=5000
   OPENROUTER_API_KEY=your_openrouter_api_key
   FRONTEND_URL=http://localhost:5173
   BASEROW_API_TOKEN=your_baserow_api_token
   BASEROW_API_URL=https://api.baserow.io
   ```

4. Jalankan server backend:
   ```
   npm run dev
   ```

### Pengaturan Frontend

1. Navigasi ke direktori frontend:
   ```
   cd frontend
   ```

2. Instal dependensi:
   ```
   npm install
   ```

3. Jalankan server pengembangan frontend:
   ```
   npm run dev
   ```

4. Buka browser dan navigasi ke:
   ```
   http://localhost:5173
   ```

## Integrasi API

### Integrasi AI OpenRouter

Aplikasi ini menggunakan API OpenRouter dengan model Qwen3-235b untuk menghasilkan respons. Kunci API disimpan dalam file `.env` backend untuk keamanan.

### Integrasi Database Baserow

Aplikasi ini terintegrasi dengan Baserow, platform database no-code, untuk mengakses data karyawan. Integrasi ini memungkinkan chatbot AI untuk:

1. Mengakses informasi karyawan dari tabel Baserow (ID: 552741)
2. Mencari karyawan menggunakan dua mode berbeda:
   - **Pencarian berdasarkan Kata Kunci**: Mencari di beberapa bidang menggunakan kata kunci
   - **Pencarian berdasarkan ID**: Mengambil data karyawan spesifik berdasarkan ID-nya
3. Menyertakan data karyawan yang relevan dalam konteks AI untuk respons yang lebih informatif

Token API Baserow disimpan dengan aman dalam file `.env` backend.

## Teknologi yang Digunakan

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **API**: 
  - OpenRouter (model Qwen3-235b) untuk respons AI
  - API Baserow untuk akses database
- **Styling**: CSS3 dengan animasi modern
- **Database**: Baserow (database berbasis cloud)

## Cara Kerja

### Alur Integrasi AI dan Database

1. Pengguna mengaktifkan "Integrasi Database Karyawan" di antarmuka chat
2. Pengguna memilih mode pencarian (berdasarkan kata kunci atau ID) dan memasukkan kriteria pencarian
3. Ketika pengguna mengirim pesan, frontend menyertakan konteks karyawan dalam permintaan
4. Backend memproses permintaan:
   - Jika mencari berdasarkan kata kunci, backend mengirimkan query ke API Baserow untuk menemukan karyawan yang cocok
   - Jika mencari berdasarkan ID, backend mengambil data karyawan spesifik
5. Backend memperkaya prompt AI dengan data karyawan yang diambil
6. API OpenRouter menghasilkan respons menggunakan pertanyaan pengguna dan konteks data karyawan
7. Respons dikirim kembali ke frontend dan ditampilkan kepada pengguna

### Endpoint API Backend

- `/api/chat` - Endpoint utama untuk chat AI dengan integrasi konteks database
- `/api/employee-fields` - Mendapatkan bidang dari tabel karyawan
- `/api/employees` - Mendapatkan semua karyawan atau hasil yang dipaginasi
- `/api/employees/:employeeId` - Mendapatkan karyawan spesifik berdasarkan ID
- `/api/search-employees` - Mencari karyawan berdasarkan kata kunci di berbagai bidang
- `/api/employee-table-info` - Mendapatkan struktur tabel karyawan

## Lisensi

MIT
