import React, { useState } from 'react';
import { Upload, HelpCircle, ArrowRight, ArrowLeft, ShieldCheck, Check, MapPin, CheckCircle } from 'lucide-react';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data';

interface ReportScreenProps {
  onAddReport: (newReport: any) => void;
  onBackToHome: () => void;
}

export default function ReportScreen({ onAddReport, onBackToHome }: ReportScreenProps) {
  // Model Langkah: 0 (Pilih jenis), 1 (Unggah foto), 2 (Input detail), 3 (Ulas bento), 4 (Konfirmasi sukses)
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  
  // State nilai formulir
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Elektronik');
  const [selectedLocation, setSelectedLocation] = useState('Perpustakaan (Polines)');
  const [dateStr, setDateStr] = useState('25 Okt 2026');
  const [description, setDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [certified, setCertified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedReportId, setGeneratedReportId] = useState('');

  // Penanganan pengisian otomatis foto tiruan yang cocok dengan kategori untuk UX yang kaya
  const handleAutofillPhoto = () => {
    if (selectedCategory === 'Elektronik') {
      setUploadedImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDtgpYKJH07Ea_YqijCM1PgU_Jf3GZeqqRt5tD0P_Urw_jFUPw0kGgYQp-VvX2UqlvYJJ8xlFuL8XBxReV8vjrtq-YrRqHJYTiBMJnLM5Kge4dr1Uevtf2uhq63fwKkwARMQ8rmvfn1G-qDQp7os81kfDKpfGyszmrj47AXENriFgwZDz6mZ7TKK6yWxm06NoWagYHDnRxrU9UpTtP4TO5Fjgt0-72OeVDZ2AfbFDY56sF_37OQFVyfFIDDBBQ0QP9HlO_raDdLrKY');
    } else if (selectedCategory === 'Dompet') {
      setUploadedImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBBBSy84tvyPD6YDykwoLybEWFGRWsBuoe_C54X4bMcCi86sX5jU8sIFujvhoGnGDzuHmg8v0iGE5GUE_mY1w-VuQGOSaTWadP0IIghT_lmvw7EcO4_vegYUCMb2on3N-VxBzIkXWttvzwZ2Q4cEEx0Ull1lKFM8Q7gNdmpzPEo4cKCcfqcf6uRcza1EPXq5OH_IB1ZDNOk4X-C0d-_rfKCrYtT8nc9q-M9u98BhzSnX34HM2FgsyBKzqCl1rp-wv3pgbvbHUww_r4');
    } else {
      setUploadedImage('https://lh3.googleusercontent.com/aida-public/AB6AXuAa0RNNlyE2YiMu4fTH430jAdpuvIU9RXdLmcsgyKhJBrP2rPqwAxgBpk33DRfu7WOkDuvC5_FEZBRlo1Ffufh8YEvDEIJv6D1flNe4QJO3Y-lBgKpYf8twrR_ImuWBflkZ0DipLh0t8E-I7CBz-V2JnBR5Ei02m-xU4loos1a160lH-cuWa2i3-2xBmFefRUAFt9zMCXs_Z3rPdv5nj1k9LuD_F3Oh8_Hp_4awws1jqHWc_2OZDdO4KOK6VlpQ66Tq782fm5juFRc');
    }
  };

  const handleNextStep = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 0) setStep((s) => (s - 1) as any);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certified) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const generatedId = `REPORT-LF-${Math.floor(Math.random() * 90000) + 10000}`;
      setGeneratedReportId(generatedId);

      onAddReport({
        id: generatedId.toLowerCase(),
        title: itemName || `Belum ditentukan ${selectedCategory}`,
        category: selectedCategory,
        type: reportType,
        date: dateStr,
        location: selectedLocation.replace(' (Polines)', ''),
        description: description || `Laporan barang ${reportType === 'found' ? 'temuan' : 'hilang'} telah dicatat.`,
        images: [uploadedImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv60FrtzIQoMyk3TWbDwbV7H25Dzo62DAHOhdaHDoJK8ocLy5aYzAxSZ7bjwakFDcmkDQQ6n8YwwI3L0jCdMUHoyGbDWS07log9XM6p4dGdmiwM6jU_DJWqhoquLj4m2G-lY3gadSApzcBEYLj9hH-lk1B5ok6JG_Y9P2hTXpj6WcJEGnFjquQ6ZwuKFDhW1e6iCEshePbpwQNM8TGQc3ACrIsT16zEYaoZiBRT4XXJnFcVBIoKkmZCUAjQ9gHhTclLFNVJ2tJ_Lg'],
        status: 'unclaimed',
        finderName: 'Dimas Saputra'
      });

      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK ACTION ON HEADER */}
        {step < 4 && (
          <button
            onClick={step === 0 ? onBackToHome : handlePrevStep}
            className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-2xs transition-all mb-8 uppercase tracking-widest font-display cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-650" />
            <span>{step === 0 ? 'Kembali ke Cari Barang' : 'Kembali ke langkah sebelumnya'}</span>
          </button>
        )}

        {/* STEP PROGRESS TRACKER */}
        {step > 0 && step < 4 && (
          <div className="flex items-center justify-between mb-10 bg-white p-4 rounded-full border border-gray-100 max-w-md mx-auto shadow-2xs">
            {[
              { num: 1, label: 'Foto' },
              { num: 2, label: 'Detail' },
              { num: 3, label: 'Ulas' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num
                      ? 'bg-indigo-650 text-white'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-50 text-slate-400 border border-gray-100'
                  }`}>
                    {step > s.num ? <Check className="w-4 h-4 text-white" /> : s.num}
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${step === s.num ? 'text-indigo-650 font-display' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && <span className="h-0.5 w-8 bg-gray-50 mx-3 hidden sm:block"></span>}
              </div>
            ))}
          </div>
        )}

        {/* STEP 0: TYPE SELECTION */}
        {step === 0 && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center">
              <span className="text-[9px] font-bold text-indigo-650 bg-indigo-50 px-3 py-1 rounded-full tracking-widest uppercase border border-indigo-100/50">
                WIZARD LAPORAN POLINES
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-4 leading-tight font-display uppercase tracking-wider">
                Jenis laporan apa yang ingin Anda buat?
              </h2>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Buat laporan untuk memberi tahu pihak keamanan dan mahasiswa lain. Aturan verifikasi tinggi melindungi privasi akademik.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              {/* Lost item trigger card */}
              <div
                onClick={() => {
                  setReportType('lost');
                  handleNextStep();
                }}
                className={`bg-white rounded-3xl border-2 p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  reportType === 'lost' ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-100 hover:border-slate-300'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full filter blur-xl group-hover:scale-125 transition-transform"></div>
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 text-red-600 border border-red-100 group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-950 font-display uppercase tracking-widest">SAYA KEHILANGAN BARANG</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Kehilangan dompet, laptop, KTM, kunci, atau barang lainnya di dalam kampus? Perluas pencarian dengan bantuan seluruh kampus.
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-red-600 font-bold mt-6 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              {/* Found item trigger card */}
              <div
                onClick={() => {
                  setReportType('found');
                  handleNextStep();
                }}
                className={`bg-white rounded-3xl border-2 p-8 text-center cursor-pointer hover:shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  reportType === 'found' ? 'border-indigo-650 ring-2 ring-indigo-100' : 'border-gray-100 hover:border-slate-300'
                }`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl group-hover:scale-125 transition-transform"></div>
                <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-5 text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-950 font-display uppercase tracking-widest">SAYA MENEMUKAN BARANG</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Menemukan barang tak bertuan di kelas, kantin, atau masjid? Amankan barang tersebut dan buat laporan penemuan.
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-indigo-650 font-bold mt-6 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

            </div>
          </div>
        )}

        {/* STEP 1: PHOTO UPLOAD */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Left side upload zone (7 columns) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest font-display">
                  Langkah 1: Unggah Foto Referensi Barang
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Unggah gambar objek yang jelas. Detail visual yang tinggi mempercepat penyaringan kecocokan otomatis.
                </p>
              </div>

              {/* Interactive upload drag box */}
              <div className="border-2 border-dashed border-gray-100 bg-slate-50/50 hover:bg-slate-50/20 rounded-3xl p-8 text-center relative transition-all">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="w-full max-h-56 rounded-2xl overflow-hidden border border-gray-100">
                      <img
                        src={uploadedImage}
                        alt="Pratinjau unggahan"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mx-auto"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Hapus dan pilih foto lain
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 py-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xs text-indigo-650 border border-gray-50">
                      <Upload className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Seret file gambar Anda ke sini</p>
                      <p className="text-[10px] text-slate-400 mt-1">JPEG, PNG, HEIC hingga 5MB</p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleAutofillPhoto}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100/80 border border-indigo-100 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all"
                      >
                        Isi Otomatis Foto Referensi Barang Simulasi
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action bar */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-[10px] font-bold uppercase tracking-widest font-display transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Lanjutkan ke Detail</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right side Tips sidebar (5 columns) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 p-6 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-display">Panduan Unggah</h4>
              
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-sans">
                <p className="font-bold text-slate-800">Apa yang membuat foto referensi bagus?</p>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>Pencahayaan alami yang menunjukkan warna asli casing perangkat atau kain</li>
                  <li>Menyertakan gantungan kunci kustom, stiker, atau ukiran casing</li>
                  <li>Hindari menyertakan berkas akademik sensitif atau kredensial dalam foto</li>
                </ul>
              </div>

              {/* Tips reference cards */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-slate-50/50 p-3 flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-gray-100">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa0RNNlyE2YiMu4fTH430jAdpuvIU9RXdLmcsgyKhJBrP2rPqwAxgBpk33DRfu7WOkDuvC5_FEZBRlo1Ffufh8YEvDEIJv6D1flNe4QJO3Y-lBgKpYf8twrR_ImuWBflkZ0DipLh0t8E-I7CBz-V2JnBR5Ei02m-xU4loos1a160lH-cuWa2i3-2xBmFefRUAFt9zMCXs_Z3rPdv5nj1k9LuD_F3Oh8_Hp_4awws1jqHWc_2OZDdO4KOK6VlpQ66Tq782fm5juFRc"
                    alt="Standard sample reference"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-mono font-bold text-indigo-650 uppercase tracking-widest">CONTOH REFERENSI</p>
                  <p className="text-[11px] text-slate-550 font-semibold leading-snug mt-0.5">Objek kontras tinggi pada latar belakang meja yang sederhana.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: DETAILS FORM */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 max-w-2xl mx-auto animate-fadeIn">
            <div>
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest font-display">
                Langkah 2: Detail Identitas Barang
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Isi atribut administratif secara tepat untuk mengaktifkan algoritme pencocokan cerdas.
              </p>
            </div>

            <div className="space-y-5 mt-6">
              {/* Item Name */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Nama / Judul Barang
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: iPad Pro Perak, Ransel Eiger Hitam, KTM, kunci..."
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Kelompok Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-650 transition-all"
                  >
                    {CATEGORIES.filter((c) => c !== 'Semua Barang').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Lokasi Kejadian di Kampus
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-650 transition-all"
                  >
                    {CAMPUS_LOCATIONS.filter((l) => l !== 'Semua Lokasi').map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Urgency State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Perkiraan Tanggal
                  </label>
                  <input
                    type="text"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-650 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Referensi Kontak Penjaga
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Profil Akademik Mahasiswa Terverifikasi"
                    className="w-full px-4 py-2.5 bg-slate-100 border border-gray-100 rounded-xl text-xs font-bold text-slate-400 font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Deskripsi Detail Konteks Kejadian
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Sebutkan kondisi pasti, tanda khas, isi barang, atau deskripsi kunci kata sandi..."
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Bottom action controls */}
            <div className="flex justify-between pt-6 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2 bg-white text-slate-500 hover:text-slate-900 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={!itemName || !description}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-[10px] font-bold uppercase tracking-widest font-display disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lanjutkan ke Ulasan</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW DETAILS BENTO */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <h3 className="text-sm font-bold text-slate-950 uppercase tracking-widest font-display">
                  Langkah 3: Ulas & Selesaikan Laporan Anda
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pastikan semua nilai administratif akurat sebelum mempublikasikannya ke umpan jaringan langsung kampus.
                </p>
              </div>

              {/* Bento style review card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 rounded-2xl p-5 border border-gray-100">
                
                {/* Photo summary block (5 columns) */}
                <div className="md:col-span-5 space-y-2">
                  <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase tracking-widest">Pratinjau Foto Referensi</span>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-gray-100">
                    <img
                      src={uploadedImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv60FrtzIQoMyk3TWbDwbV7H25Dzo62DAHOhdaHDoJK8ocLy5aYzAxSZ7bjwakFDcmkDQQ6n8YwwI3L0jCdMUHoyGbDWS07log9XM6p4dGdmiwM6jU_DJWqhoquLj4m2G-lY3gadSApzcBEYLj9hH-lk1B5ok6JG_Y9P2hTXpj6WcJEGnFjquQ6ZwuKFDhW1e6iCEshePbpwQNM8TGQc3ACrIsT16zEYaoZiBRT4XXJnFcVBIoKkmZCUAjQ9gHhTclLFNVJ2tJ_Lg'}
                      alt="Review uploaded reference"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text summary attributes block (7 columns) */}
                <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded-full uppercase tracking-widest inline-block ${
                      reportType === 'found' ? 'bg-indigo-50 text-indigo-650 border border-indigo-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      TARGET LAPORAN {reportType === 'found' ? 'TEMUAN' : 'KEHILANGAN'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug font-display uppercase tracking-wider">{itemName}</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 mt-2 font-sans pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Kategori</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">{selectedCategory}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Lokasi</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">{selectedLocation}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Perkiraan Tanggal</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">{dateStr}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Profil Pelapor</span>
                        <span className="font-bold text-indigo-650 mt-0.5 block text-[10px] font-mono uppercase tracking-wider">DIMAS SAPUTRA</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-100 text-xs text-slate-500 leading-relaxed font-sans italic">
                    "{description}"
                  </div>
                </div>

              </div>

              {/* Certified check box */}
              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={certified}
                    onChange={(e) => setCertified(e.target.checked)}
                    className="mt-1 h-4.5 w-4.5 text-indigo-650 border-gray-200 rounded focus:ring-indigo-650"
                  />
                  <span className="text-xs text-slate-500 leading-relaxed font-sans select-none">
                    Saya menyatakan bahwa laporan ini jujur dan menghormati kode etik akademik Politeknik Negeri Semarang.
                  </span>
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2 bg-white text-slate-500 hover:text-slate-900 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Ubah Detail
                </button>

                <button
                  type="button"
                  onClick={handleSubmitReport}
                  disabled={isSubmitting || !certified}
                  className="px-6 py-3 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-full text-[10px] uppercase tracking-widest font-display disabled:opacity-50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShieldCheck className="w-4.5 h-4.5 text-white" />
                      <span>Kirim Laporan Terverifikasi</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION SCREEN */}
        {step === 4 && (
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-xs animate-fadeIn">
            
            {/* Green Checkmark Badge layout */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 text-emerald-600 border border-emerald-100">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold uppercase tracking-widest mb-3 border border-emerald-100">
              Status: AKTIF & DISEBARKAN
            </span>

            <h2 className="text-xl font-bold text-slate-900 tracking-wider font-display uppercase leading-tight">
              Laporan Berhasil Dikirim!
            </h2>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed font-sans max-w-xs mx-auto">
              Laporan barang Anda telah berhasil didaftarkan di dalam register barang hilang-temuan Polines. Mahasiswa di sekitar lokasi telah diberi tahu.
            </p>

            {/* Dynamic Metadata Attributes */}
            <div className="bg-slate-50 rounded-2xl border border-gray-100 p-4 mt-6 space-y-2.5 text-xs text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID Laporan</span>
                <span className="font-mono font-bold text-slate-900 text-[11px] uppercase">{generatedReportId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kategori</span>
                <span className="font-semibold text-slate-800 text-xs">{selectedCategory}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lokasi Kejadian</span>
                <span className="font-semibold text-slate-800 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-650" />
                  {selectedLocation}
                </span>
              </div>
            </div>

            {/* Back Buttons */}
            <div className="space-y-3 mt-8">
              <button
                onClick={onBackToHome}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-[10px] font-bold uppercase tracking-widest font-display transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Kembali ke Beranda</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
