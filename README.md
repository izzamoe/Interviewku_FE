# Interviewku

Repository ini berisi frontend untuk aplikasi Interviewku, Aplikasi Interviewku adalah Aplikasi yang dibuat untuk teknikal test. Pastikan Anda telah menjalankan backend sebelum menggunakan frontend ini.

## Teknologi yang Digunakan

- **Bahasa Pemrograman**: JavaScript
- **Runtime JavaScript**: Bun.js
- **Backend**: ElysiaJS
- **Database**: MySQL / MariaDB
- **ORM (Object-Relational Mapping) dan Migrasi**: Prisma
- **Kontainer**: Docker
- **Frontend**: ReactJS

## Cara Penggunaan

### Jika Anda Familiar dengan Docker

1. Jalankan perintah berikut pada terminal:
   ```bash
   docker compose up
   ```
2. Aplikasi akan dijalankan dan siap digunakan.

### Jika Anda Tidak Familiar dengan Docker

1. Install Bun.js dengan mengunjungi [bun.sh](https://bun.sh/). Cara instalasinya berbeda untuk setiap sistem operasi.
2. Setelah instalasi selesai, jalankan perintah:
   ```bash
   bun install
   ```
3. Setelah konfigurasi selesai, jalankan perintah:
   ```bash
   bun run dev
   ```
4. Aplikasi akan dijalankan dan siap digunakan.

## Deploy ke Production

Aplikasi ini siap untuk di-deploy ke lingkungan produksi. Gunakan Dockerfile yang tersedia di repository ini untuk melakukan proses deployment.
