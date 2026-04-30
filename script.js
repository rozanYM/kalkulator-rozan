// =========================================================
// TUGAS PRAKTIK MANDIRI - JAVASCRIPT
// NAMA     : Rozan Yazid Muhammad
// NIM      : 250212103
// PRODI    : PENDIDIKAN TEKNOLOGI INFORMASI
// DESKRIPSI: UPGRADE SISTEM KALKULATOR WISATA
// =========================================================

// --- A. DEKLARASI VARIABEL (Menghubungkan HTML ke JS) ---
const inputOrang = document.getElementById('jumlah-orang');
const inputHari = document.getElementById('lama-hari');
const cekAsuransi = document.getElementById('cek-asuransi');
const cekFotografer = document.getElementById('cek-fotografer');
const inputPromo = document.getElementById('kode-promo');
const hasilRincian = document.getElementById('hasil-rincian');

// --- B. LOGIKA KONDISI TERKUNCI (Disabled Logic) ---
// Cek lama wisata secara otomatis untuk syarat Fotografer
inputHari.addEventListener('input', function() {
    let hari = parseInt(inputHari.value) || 0;

    // Jika kurang dari 2 hari, fotografer dikunci (disabled)
    if (hari < 2) {
        cekFotografer.disabled = true;
        cekFotografer.checked = false; // Lepas centang otomatis
    } else {
        cekFotografer.disabled = false;
    }
});

// --- C. FUNGSI HITUNG ESTIMASI (Logic Bisnis) ---
function hitungEstimasi() {
    // 1. Ambil angka dari input
    let jumlahOrang = parseInt(inputOrang.value) || 0;
    let lamaHari = parseInt(inputHari.value) || 0;
    let hargaTiketDasar = 100000; // Misal: Rp 100rb per orang/hari

    // 2. Hitung Biaya Tiket Dasar
    let subTotalTiket = jumlahOrang * lamaHari * hargaTiketDasar;

    // 3. Hitung Biaya Layanan Tambahan (Checkbox)
    let biayaAsuransi = 0;
    if (cekAsuransi.checked) {
        biayaAsuransi = jumlahOrang * 50000; // Rp 50.000 per orang
    }

    let biayaFotografer = 0;
    if (cekFotografer.checked && !cekFotografer.disabled) {
        biayaFotografer = lamaHari * 300000; // Rp 300.000 per hari
    }

    let subTotalLayanan = biayaAsuransi + biayaFotografer;

    // 4. Hitung Diskon Promo
    let totalSebelumDiskon = subTotalTiket + subTotalLayanan;
    let diskon = 0;

    // Cek kode promo "ACEHHEBAT" (Kebal huruf besar/kecil)
    if (inputPromo.value.toUpperCase() === "ACEHHEBAT") {
        diskon = 150000;
    }

    // 5. Hitung Total Akhir (Mencegah hasil minus)
    let totalBayar = totalSebelumDiskon - diskon;
    if (totalBayar < 0) totalBayar = 0;

    // 6. Tampilkan Rincian (Struk) ke Layar
    hasilRincian.innerHTML = `
        <div style="border: 2px dashed #1f1fba; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #1e6ebe;">Rincian Estimasi Biaya</h3>
            <p>Sub-total Tiket: <b>Rp ${subTotalTiket.toLocaleString()}</b></p>
            <p>Sub-total Layanan: <b>Rp ${subTotalLayanan.toLocaleString()}</b></p>
            <p style="color: red;">Potongan Promo: <b>- Rp ${diskon.toLocaleString()}</b></p>
            <hr>
            <h2 style="margin-bottom: 0;">Total Bayar: Rp ${totalBayar.toLocaleString()}</h2>
        </div>
    `;
}