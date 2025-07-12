# VhiWEB Software Engineer Test Case

## Part 1

Scenario: The business team needs to import a CSV file containing over 100,000 product records. During testing, the import process caused high server load, timeouts, and occasional failures.

### Identify the Problem:

1. Proses yang terlalu lama menajdikan beban server tinggi.
2. Proses impor file menyebabkan timeout.
3. Query yang digunakan untuk memasukkan data ke database tidak optimal.
4. File CSV yang besar dan kompleks.

### Propose a Solution:

1. Kelompati data menjadi beberapa bagian kecil dan import secara terpisah.
2. Gunakan indexing pada tabel/kolom.
3. Gunakan proses asynchronous dan antrian untuk mengurangi beban server.
4. Gunakan mekanisme retry untuk mengatasi kesalahan import yang gagal saja.
5. Log semua kesalahan dan informasi penting untuk di-debug.

### Plan the Implementation:

1. User memasukkan file CSV.
2. Sistem memeriksa ukuran file dan membagi menjadi beberapa bagian kecil.
3. Sistem mengirimkan setiap bagian kecil ke server.
4. Server memproses setiap bagian kecil secara berkelompok dan menyimpannya ke database.
5. Sistem menginformasikan hasil proses import ke user.

### Prepare for Growth:

1. Guakan Database dengan performa tinggi seperti MySQL atau PostgreSQL.
2. Pisahkan proses import dari proses Utama.
3. Gunakan library atau framework yang mendukung proses import.
4. Monitoring dan analisa performa sistem secara berkala.

## Part 2

Scenario: Your team is approaching a critical deadline for the E-Procurement System, but unexpected issues have caused delays. Some team members are overwhelmed with their workload, and there’s a risk of missing the deadline.

### Workload Management:

1. Prioritaskan tugas berdasarkan urgensi dan kompleksitas.
2. Bagi tugas secara merata yang menyesuaikan skill dalam tim.
3. Membagi tugas tiap tiap anggota tim yang beban tugas sudah berkurang.

### Team Support:

1. Selalu komunikasi tiap anggota tim untuk memastikan semua orang bekerja sama.
2. Lakukan diskusi yang berfokus penyelesaian masalah.
3. Tunjukkan rasa terima kasih dan dukungan kepada seluruh anggota tim.
4. Apresiasi setiap kontribusi yang diberikan.
5. Jangan desak anggota tim untuk bekerja cepat, tetapi berikan ruang untuk mampu beradaptasi.

### Communication with Stakeholders:

1. Transaparansi pelaporan menyesuaikan kebutuhan sebelum deadline.
2. Lakukan diskusi dengan stakeholder untuk memastikan mereka memahami situasi.
3. Berikan update terbaru tentang progress dan perubahan jadwal.
4. Berikan solusi dan jalan keluar alternatif terkait masalah yang dihadapi.
