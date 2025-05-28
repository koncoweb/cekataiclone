# AI Chatbot dengan Integrasi Database

Aplikasi fullstack yang menggunakan API OpenRouter dengan model Qwen3-235b untuk menjawab pertanyaan terkait produk, dengan integrasi database Baserow untuk mengakses informasi karyawan. Aplikasi ini menggabungkan kekuatan AI generatif dengan kemampuan database untuk memberikan respons yang lebih informatif dan kontekstual.

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

## Persiapan Lingkungan Pengembangan

### Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di komputer Anda:

1. **Node.js** (versi 16.x atau lebih baru)
   - Unduh dan instal dari [nodejs.org](https://nodejs.org/)
   - Verifikasi instalasi dengan menjalankan `node -v` di terminal

2. **npm** (biasanya terinstal bersama Node.js)
   - Verifikasi instalasi dengan menjalankan `npm -v` di terminal

3. **Git**
   - Unduh dan instal dari [git-scm.com](https://git-scm.com/downloads)
   - Verifikasi instalasi dengan menjalankan `git --version` di terminal

4. **GitHub Desktop** (opsional, untuk manajemen Git dengan GUI)
   - Unduh dan instal dari [desktop.github.com](https://desktop.github.com/)

5. **Editor kode** (Windsurf, cursor, trae )
   - 

### Mengkloning Proyek dengan GitHub Desktop

1. Buka GitHub Desktop
2. Klik **File** > **Clone repository**
3. Pilih tab **URL** dan masukkan URL repositori GitHub proyek ini
4. Pilih lokasi penyimpanan lokal (misalnya: `D:\cekataiclone`)
5. Klik **Clone**
6. Tunggu hingga proses kloning selesai

### Mengkloning Proyek dengan Terminal Git

1. Buka terminal (Command Prompt, PowerShell, atau Git Bash)
2. Navigasi ke direktori tempat Anda ingin menyimpan proyek:
   ```bash
   # Contoh untuk Windows
   cd D:\
   # atau
   cd C:\Users\YourUsername\Projects
   ```
3. Kloning repositori:
   ```bash
   git clone https://github.com/username/ai-chatbot.git cekataiclone
   ```
4. Navigasi ke direktori proyek:
   ```bash
   cd cekataiclone
   ```

## Petunjuk Pengaturan

### Pengaturan Backend

1. Buka terminal baru dan navigasi ke direktori utama proyek:
   ```bash
   cd D:\cekataiclone\ai-chatbot
   ```

2. Navigasi ke direktori backend:
   ```bash
   cd backend
   ```

3. Instal dependensi backend:
   ```bash
   npm install
   ```
   Proses ini akan mengunduh semua paket yang diperlukan yang didefinisikan dalam `package.json`.

4. Buat file `.env` di direktori backend:
   - Buka editor kode Anda (misalnya VS Code)
   - Buat file baru dengan nama `.env`
   - Tambahkan variabel lingkungan berikut:
     ```
     PORT=5000
     OPENROUTER_API_KEY=your_openrouter_api_key
     FRONTEND_URL=http://localhost:5173
     BASEROW_API_TOKEN=your_baserow_api_token
     BASEROW_API_URL=https://api.baserow.io
     ```
   - Ganti `your_openrouter_api_key` dengan kunci API OpenRouter Anda
   - Ganti `your_baserow_api_token` dengan token API Baserow Anda
   - Simpan file

5. Jalankan server backend dalam mode pengembangan:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:5000` dan akan otomatis dimuat ulang saat Anda membuat perubahan pada kode.

### Pengaturan Frontend

1. Buka terminal baru (jangan tutup terminal backend) dan navigasi ke direktori utama proyek:
   ```bash
   cd D:\cekataiclone\ai-chatbot
   ```

2. Navigasi ke direktori frontend:
   ```bash
   cd frontend
   ```

3. Instal dependensi frontend:
   ```bash
   npm install
   ```
   Proses ini akan mengunduh semua paket yang diperlukan yang didefinisikan dalam `package.json` frontend.

4. Jalankan server pengembangan frontend:
   ```bash
   npm run dev
   ```
   Server pengembangan akan berjalan di `http://localhost:5173` dan akan otomatis dimuat ulang saat Anda membuat perubahan pada kode frontend.

5. Buka browser dan navigasi ke:
   ```
   http://localhost:5173
   ```
   Anda akan melihat antarmuka chatbot AI dengan opsi untuk mengaktifkan integrasi database.

## Integrasi API

### Mendapatkan API Key OpenRouter

1. Kunjungi [OpenRouter](https://openrouter.ai/)
2. Buat akun atau masuk ke akun yang sudah ada
3. Navigasi ke bagian API Keys
4. Buat API key baru
5. Salin API key dan simpan di file `.env` backend sebagai `OPENROUTER_API_KEY`

### Mendapatkan Token API Baserow

1. Kunjungi [Baserow](https://baserow.io/)
2. Buat akun atau masuk ke akun yang sudah ada
3. Buka dashboard Baserow
4. Klik pada profil Anda di pojok kanan atas
5. Pilih "Settings" atau "Pengaturan"
6. Navigasi ke bagian "API Tokens"
7. Buat token API baru dengan izin yang sesuai
8. Salin token dan simpan di file `.env` backend sebagai `BASEROW_API_TOKEN`

### Integrasi AI OpenRouter

Aplikasi ini menggunakan API OpenRouter dengan model Qwen3-235b untuk menghasilkan respons. Kunci API disimpan dalam file `.env` backend untuk keamanan. Model ini dipilih karena kemampuannya dalam memahami konteks dan menghasilkan respons yang relevan dengan data yang disediakan.

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

## Cara Menggunakan Aplikasi

### Menggunakan Chatbot Tanpa Integrasi Database

1. Buka aplikasi di browser Anda (http://localhost:5173)
2. Anda akan melihat antarmuka chat dengan pesan sambutan dari AI
3. Ketik pertanyaan Anda di kotak input di bagian bawah
4. Klik tombol "Kirim" atau tekan Enter untuk mengirim pesan
5. AI akan memproses pertanyaan Anda dan memberikan respons

### Menggunakan Chatbot dengan Integrasi Database Karyawan

1. Buka aplikasi di browser Anda
2. Aktifkan "Integrasi Database Karyawan" dengan mengklik tombol toggle di bagian atas chat
3. Pilih mode pencarian:
   - **Pencarian berdasarkan Kata Kunci**: Untuk mencari karyawan berdasarkan kata kunci
   - **Pencarian berdasarkan ID**: Untuk mencari karyawan spesifik berdasarkan ID

4. Jika menggunakan mode Pencarian berdasarkan Kata Kunci:
   - Masukkan kata kunci di kotak pencarian
   - Pilih bidang yang ingin Anda cari (opsional)
   - Ketik pertanyaan Anda tentang karyawan yang cocok dengan kriteria pencarian

5. Jika menggunakan mode Pencarian berdasarkan ID:
   - Masukkan ID karyawan di kotak input ID
   - Ketik pertanyaan Anda tentang karyawan tersebut

6. Klik tombol "Kirim" atau tekan Enter untuk mengirim pesan
7. AI akan mengambil data karyawan yang relevan dari Baserow dan menggunakannya untuk memberikan respons yang lebih kontekstual

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

## Pemecahan Masalah

### Masalah Umum dan Solusi

#### Backend Tidak Dapat Terhubung ke Baserow

**Gejala**: Error 500 saat mencoba mengakses endpoint API Baserow

**Solusi**:
1. Periksa apakah token API Baserow Anda valid dan belum kedaluwarsa
2. Pastikan Anda memiliki izin yang cukup untuk mengakses tabel karyawan
3. Verifikasi bahwa ID tabel karyawan (552741) benar dan tabel masih ada

#### Frontend Tidak Dapat Terhubung ke Backend

**Gejala**: Error "Failed to fetch" di konsol browser

**Solusi**:
1. Pastikan server backend berjalan di port 5000
2. Periksa apakah CORS diaktifkan dengan benar di backend
3. Verifikasi bahwa `FRONTEND_URL` di file `.env` backend diatur dengan benar

#### OpenRouter API Error

**Gejala**: Error saat mencoba mendapatkan respons dari AI

**Solusi**:
1. Periksa apakah kunci API OpenRouter Anda valid
2. Verifikasi bahwa Anda memiliki kredit yang cukup di akun OpenRouter Anda
3. Pastikan model `qwen/qwen3-235b-a22b:free` masih tersedia di OpenRouter

## Pengembangan Lanjutan

### Menambahkan Fitur Baru

1. **Menambahkan Tabel Baru**:
   - Tambahkan fungsi baru di `baserow.js` untuk berinteraksi dengan tabel baru
   - Buat endpoint API baru di `server.js`
   - Tambahkan komponen UI baru di frontend untuk menampilkan data

2. **Mengubah Model AI**:
   - Ubah parameter model di `server.js` pada endpoint `/api/chat`
   - Sesuaikan prompt sistem jika diperlukan untuk model baru

3. **Menambahkan Autentikasi**:
   - Implementasikan sistem autentikasi menggunakan JWT atau OAuth
   - Tambahkan middleware autentikasi di backend
   - Buat komponen login dan register di frontend

## Kontribusi

Kontribusi untuk meningkatkan proyek ini sangat diterima. Silakan ikuti langkah-langkah berikut:

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

MIT
