import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, User, Upload, ArrowRight, CheckCircle2, Lock, FileText, CheckCircle } from 'lucide-react';
import { Item } from '../types';

interface ClaimScreenProps {
  item: Item;
  onBack: () => void;
  onSubmitClaim: (itemId: string, claimData: any) => void;
}

export default function ClaimScreen({ item, onBack, onSubmitClaim }: ClaimScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Form State
  const [fullName, setFullName] = useState('Dimas Saputra');
  const [nim, setNim] = useState('3.34.21.0.12');
  const [program, setProgram] = useState('D3 Teknik Telekomunikasi');
  const [phoneNumber, setPhoneNumber] = useState('+62 812-3456-7890');
  
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [passwordUnlock, setPasswordUnlock] = useState('');
  
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [certifyChecked, setCertifyChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAutofillProof = () => {
    // Foto bukti verifikasi kepemilikan simulasi
    setProofImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBtV9yoAOQuPsdGWdMHWWk0N2XseDznBq1oPjdsSqom1-JVOstnhD8YW4UxgzBBh1z5AvhOYcMXt9BseJ5UUbj0POxHNBUSlk3EiY2zfIq5HhH--T9-x3MZDijbQRbNRBQS5OPtK4ZJQj_dpY5DDcfvc97vHD5uWPkvyScHD_K35hjjL4i-v8U_LdsFM_0YTuUEiITflKpoyKXQClINeU-7BVS5RJYOQqiXBzl0ciIfRBM1kDbz3esN4mBfc_z8QCJEgQmePNO7ZyA');
  };

  const handleNextStep = () => {
    if (step < 3) setStep((s) => (s + 1) as any);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as any);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certifyChecked) return;

    setSubmitting(true);
    setTimeout(() => {
      onSubmitClaim(item.id, {
        fullName,
        nim,
        program,
        securityAnswer,
        proofImage,
      });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-8 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK TO DETAIL BAR */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-600 hover:text-indigo-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-2xs hover:shadow-xs transition-all mb-6 cursor-pointer uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-650" />
          <span>Kembali ke Detail Barang</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Item Summary Card (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-display">Target Klaim Barang</h3>
              
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-50 border border-gray-100">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-650 text-[9px] font-bold uppercase rounded-full border border-indigo-100 tracking-wider mb-2">
                  BARANG TEMUAN
                </span>
                <h4 className="text-base font-bold text-slate-900 leading-tight font-display">
                  {item.title}
                </h4>
                <p className="text-[9px] text-slate-400 mt-1 font-mono uppercase tracking-widest">ID: POLINES-LF-{item.id.toUpperCase()}</p>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-slate-500">
                <div className="flex justify-between items-center">
                  <span>Lokasi Ditemukan</span>
                  <span className="font-semibold text-slate-800">{item.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tanggal Ditemukan</span>
                  <span className="font-semibold text-slate-800">{item.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Penyimpan Keamanan</span>
                  <span className="font-bold text-indigo-650 font-mono text-[10px] uppercase tracking-wider">Kantor Keamanan Kampus</span>
                </div>
              </div>
            </div>

            {/* Quick claim safety hints */}
            <div className="bg-indigo-50/40 border border-indigo-150/50 rounded-2xl p-5 space-y-3">
              <h4 className="text-[10px] font-bold text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 font-display">
                <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
                <span>Jaminan Verifikasi</span>
              </h4>
              <p className="text-[11px] text-slate-650 leading-relaxed font-sans">
                Klaim yang diajukan pada portal ini terintegrasi langsung dengan basis data administrasi Politeknik Negeri Semarang. Anda akan menerima pesan portal ketika penemu atau petugas keamanan menyetujui bukti tersebut.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Multi-Step verification Form (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-2xs">
            
            {/* STEP PROGRESS TRACKER */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
              {[
                { stepNum: 1, label: 'Identitas', icon: User },
                { stepNum: 2, label: 'Keamanan', icon: Lock },
                { stepNum: 3, label: 'Bukti', icon: FileText }
              ].map((s, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      step === s.stepNum
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-50'
                        : step > s.stepNum
                        ? 'bg-indigo-650 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > s.stepNum ? <CheckCircle className="w-4 h-4 text-white" /> : s.stepNum}
                    </div>
                    <span className={`text-[10px] font-bold tracking-wider uppercase hidden sm:inline ${
                      step === s.stepNum ? 'text-indigo-650' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && <span className="h-0.5 w-12 bg-gray-100 mx-4 hidden sm:block"></span>}
                </div>
              ))}
            </div>

            {/* INTERACTIVE FORM SCENARIOS */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-display">
                    Langkah 1: Verifikasi Identitas Akademik
                  </h3>
                  <p className="text-xs text-slate-500">
                    Berikan kredensial profil mahasiswa Anda yang benar yang terdaftar di bawah Jaringan Akademik POLINES.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Nama Lengkap Terdaftar
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Nomor Induk Mahasiswa (NIM)
                      </label>
                      <input
                        type="text"
                        required
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-gray-100 rounded-xl text-xs font-mono font-bold text-slate-400 focus:outline-none"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Program Studi
                      </label>
                      <input
                        type="text"
                        required
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Nomor Kontak WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SECURITY MATCHING */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-display">
                    Langkah 2: Pencocokan Keamanan & Detail Isi
                  </h3>
                  <p className="text-xs text-slate-500">
                    Untuk mencegah klaim palsu, jawab pertanyaan pencocokan khusus tentang bagian dalam barang atau karakteristik sekunder lainnya.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-relaxed">
                        Apa penanda unik atau isi pribadi di dalam barang tersebut?
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        placeholder="Contoh: Ada stiker biru di bagian belakang layar, pelindung keyboard abu-abu, atau berisi buku referensi tentang teknik elektro..."
                        className="w-full px-4 py-3 bg-slate-50/50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-relaxed">
                        Sandi pembuka kunci perangkat, nomor seri, atau detail merek (Opsional)
                      </label>
                      <input
                        type="text"
                        value={passwordUnlock}
                        onChange={(e) => setPasswordUnlock(e.target.value)}
                        placeholder="Contoh: Layar kunci memiliki foto gunung, atau label merek tertentu..."
                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-gray-100 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-650 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PROOF UPLOAD */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-display">
                    Langkah 3: Unggah Bukti Kepemilikan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Unggah nota pembelian, kode batang kotak, foto lama Anda saat memegang barang tersebut, atau surat pernyataan kartu identitas mahasiswa.
                  </p>

                  {/* DRAG & DROP AREA WITH PREVIEW AND AUTOFILL HELPER */}
                  <div className="border-2 border-dashed border-gray-200 hover:border-indigo-500/50 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 text-center transition-all relative">
                    {proofImage ? (
                      <div className="space-y-3">
                        <div className="w-full max-h-48 rounded-lg overflow-hidden relative">
                          <img
                            src={proofImage}
                            alt="Bukti kepemilikan diunggah"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mx-auto"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setProofImage(null)}
                          className="text-[10px] uppercase tracking-widest font-bold text-red-600 hover:underline cursor-pointer"
                        >
                          Hapus dan unggah foto lain
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 py-4">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-2xs border border-gray-100">
                          <Upload className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 uppercase tracking-widest font-display">Seret dan letakkan berkas di sini</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-wide">JPEG, PNG atau PDF hingga 4MB</p>
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleAutofillProof}
                            className="px-3.5 py-1.5 bg-indigo-50 text-indigo-650 hover:bg-indigo-100/75 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all inline-flex items-center gap-1.5 border border-indigo-150"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Isi Otomatis Foto Bukti Verifikasi</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Legal Certification Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={certifyChecked}
                        onChange={(e) => setCertifyChecked(e.target.checked)}
                        className="mt-1 h-4.5 w-4.5 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500"
                      />
                      <span className="text-[10px] text-slate-500 leading-relaxed font-sans select-none">
                        Saya dengan ini menyatakan di bawah sanksi akademik **Tata Tertib Mahasiswa Politeknik Negeri Semarang Bab VI** bahwa saya adalah pemilik sah dari barang ini. Memberikan pernyataan palsu merupakan tindakan pencurian dan akan dilaporkan ke keamanan kampus.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Kembali ke Langkah {step - 1}
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Langkah Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting || !certifyChecked}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 disabled:opacity-50 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span>Kirim Verifikasi Klaim</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>

          </div>

        </div>

        </div>
    </div>
  );
}
