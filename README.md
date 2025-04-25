# Hack-n-Go
Pengembangan aplikasi Game Quizz Cyber Security "Hack'n Go"

-----------------------------------------

# Git Guide - Hack'n Go

Panduan ini disusun agar seluruh tim Hack'n Go dapat bekerja secara kolaboratif dan konsisten menggunakan Git dan GitHub.


## 1. Tujuan

Dokumen ini membantu:
- Menyatukan alur kerja Git seluruh anggota tim (PM, frontend, backend)
- Menghindari konflik perubahan dan push sembarangan
- Menjaga struktur proyek tetap rapi dan terorganisir


## 2. Branching Model

### Branch Utama:
- `main` → branch **stabil** untuk versi yang dirilis
- `dev` → branch **pengembangan aktif**, tempat menggabungkan semua fitur

### Branch Fitur (dibuat oleh tim dev):
Gunakan format:

`divisi/nama-fitur`

Contoh:
- `frontend/login-page`
- `backend/register-api`


## 3. Langkah-langkah untuk Project Manager (PM)

### Hanya dilakukan 1 kali di awal proyek

```bash
git checkout -b dev
git push -u origin dev
```

## 4. Langkah-langkah untuk Tim Developer (Frontend & Backend)

### Pertama Kali:

```bash
git clone https://github.com/username/hackn-go.git
cd hackn-go
git checkout dev
git pull origin dev
```

### Buat Branch Baru untuk Fitur:

```bash
git checkout -b frontend/nama-fitur
```

### atau

```bash
git checkout -b backend/nama-fitur
```

### Setelah Fitur Selesai:

```bash
git add .
git commit -m "[FE] feat: buat tampilan login"
git push origin frontend/nama-fitur
```

### Buat Pull Request:
1. Masuk ke GitHub
2. Klik "Compare & Pull Request"
3. Pastikan dari branch kamu → ke dev
4. Tambahkan deskripsi yang jelas


## 5. Format Commit Message

Gunakan format berikut:

[DIVISI] tipe: deskripsi singkat
Contoh:

- [FE] feat: buat halaman register

- [FE] fix: perbaiki typo di form

- [BE] feat: tambah endpoint login

- [BE] docs: update README setup firebase

Tipe Commit:

    Tipe	  |         Arti  
- feat	      |  Menambahkan fitur baru
- fix	      |  Memperbaiki bug atau error
- docs	      |  Perubahan dokumentasi
- refactor	  |  Mengubah struktur kode tanpa ubah fungsi


## 6. Aturan Pull Request (PR)

- Semua perubahan harus melalui Pull Request ke dev
- Tidak ada yang boleh push langsung ke main
- PR harus diberi deskripsi fitur atau perubahan yang jelas
- Reviewer (PM atau sesama tim) dapat melakukan review sebelum merge


## 7. Tips Kerja Aman

- Selalu lakukan git pull origin dev sebelum mulai kerja
- Jangan kerja langsung di main
- Gunakan .gitignore agar file sampah atau sensitif tidak ikut ter-push
- Jika terjadi konflik saat merge, selesaikan bersama tim
- Dikelola oleh Project Manager Hack'n Go