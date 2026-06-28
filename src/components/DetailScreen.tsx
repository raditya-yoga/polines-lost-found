import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Tag, ShieldCheck, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { Item } from '../types';

interface DetailScreenProps {
  item: Item;
  allItems: Item[];
  onBack: () => void;
  onClaim: (item: Item) => void;
  onInquire: (item: Item) => void;
  onSelectItem: (item: Item) => void;
}

export default function DetailScreen({ item, allItems, onBack, onClaim, onInquire, onSelectItem }: DetailScreenProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Cari 3 barang serupa (kategori sama atau jenis serupa, tidak termasuk barang saat ini)
  const similarItems = React.useMemo(() => {
    return allItems
      .filter((i) => i.id !== item.id && (i.category === item.category || i.type === item.type))
      .slice(0, 3);
  }, [allItems, item]);

  const mapImageSrc = item.mapImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgZTaF7rMTXj2EjPjjA_K2sAZ-dKcr1MvbgWvSe2US7HclUj9WIyzN4cU2GgXjZlnYCw0S0zLgnr5HNII3k0tQ_U1YK793yZNYdXKr02B7DDs7hmo47T1zqF6n8HR9aJbpJ29TeSO76iI01Ws_Etq7l8HNx3PXLkcU_mDH4NruZ1DFb-QByXqDDsWS-fJa9bWv4QwITNXbnQHcE5403VqtJNfq0O9bdbV4H4Gf3xZ7-XQi2PdzHWtxKC4Z1W1gFwOVMXfu7PAgnk0';

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'claiming':
        return 'PROSES KLAIM';
      case 'claimed':
        return 'SUDAH DIAMBIL';
      case 'unclaimed':
        return 'BELUM DIAMBIL';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-8 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BACK TO BROWSE BAR */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-600 hover:text-indigo-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-2xs hover:shadow-xs transition-all mb-6 cursor-pointer uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-650" />
          <span>Kembali ke Cari Barang</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION: Picture Gallery and detailed descriptions (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* MAIN IMAGE CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs">
              <div className="w-full aspect-video rounded-xl bg-slate-50 overflow-hidden relative">
                <img
                  src={item.images[activeImageIndex] || item.images[0]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-[#1A1A1A]/80 backdrop-blur-xs text-white text-[9px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                  GAMBAR {activeImageIndex + 1} DARI {item.images.length}
                </span>
              </div>

              {/* THUMBNAIL TRACKER */}
              {item.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {item.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border bg-slate-50 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-indigo-650 ring-2 ring-indigo-600/20 scale-[1.01]'
                          : 'border-gray-100 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt="Pratinjau thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DESCRIPTION & VERIFICATION SPECIFICS */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-2xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 border-b border-gray-100 pb-3 mb-3 uppercase tracking-widest font-display">
                  Deskripsi & Informasi Kehilangan
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Administrative verification security warnings */}
              <div className="bg-indigo-50/40 rounded-xl p-4 border border-indigo-150/50 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-600 space-y-1">
                  <p className="font-bold text-indigo-950 uppercase tracking-wider font-display">Aturan Administrasi Kampus Mengenai Pengembalian Barang</p>
                  <p className="leading-relaxed">
                    Untuk mengklaim barang, Anda wajib memberikan informasi kecocokan keamanan seperti ciri khas unik, bukti tanda terima, foto kepemilikan, atau konfirmasi kata sandi di hadapan petugas keamanan.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION: Info Sidebar & Action Controls (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* MAIN CORE CONTROL CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs space-y-6">
              
              {/* Badges and tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                  item.type === 'found' ? 'bg-indigo-50 text-indigo-650 border border-indigo-100' : 'bg-[#1A1A1A] text-white'
                }`}>
                  {item.type === 'found' ? 'TEMUAN' : 'HILANG'}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                  item.status === 'unclaimed' ? 'bg-indigo-100 text-indigo-750' : 'bg-slate-100 text-slate-600'
                }`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight font-display tracking-tight">
                  {item.title}
                </h2>
                <p className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
                  ID: POLINES-LF-{item.id.toUpperCase()}
                </p>
              </div>

              {/* Found specs box */}
              <div className="bg-slate-50/50 rounded-xl p-4 border border-gray-100 space-y-3 text-xs">
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Tanggal Ditemukan</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    {item.date}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Kategori</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    {item.category}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Lokasi Penemuan</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5 max-w-[200px] text-right line-clamp-1">
                    <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                    {item.location}
                  </span>
                </div>

                {item.safeOfficeLocation && (
                  <div className="flex justify-between items-center pt-2.5 border-t border-gray-100">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Disimpan Di</span>
                    <span className="font-bold text-indigo-650 text-[11px] uppercase tracking-wider font-mono">
                      {item.safeOfficeLocation}
                    </span>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {item.type === 'found' && item.status === 'unclaimed' && (
                  <button
                    onClick={() => onClaim(item)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-full shadow-lg shadow-indigo-100 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                  >
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>Klaim Barang Ini Sekarang</span>
                  </button>
                )}

                <button
                  onClick={() => onInquire(item)}
                  className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-[10px] rounded-full transition-all flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-650" />
                  <span>Tanyakan Detail / Obrolan Penemu</span>
                </button>
              </div>

            </div>

            {/* MAP CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs">
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5 font-display">
                  <MapPin className="w-4.5 h-4.5 text-indigo-600" />
                  <span>Perkiraan Lokasi Kehilangan</span>
                </h4>
              </div>
              <div className="h-56 bg-slate-50 relative">
                <img
                  src={mapImageSrc}
                  alt="Pratinjau Peta Lokasi"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-slate-50/50 text-[10px] text-slate-450 leading-relaxed font-sans border-t border-gray-100 uppercase tracking-wide">
                Barang ini terverifikasi ditemukan di dalam lingkungan kampus Polines. Serah terima harus dilakukan baik di Kantor Keamanan Kampus atau tempat umum yang terjangkau oleh kamera pengawas (CCTV).
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Similar items found recently */}
        {similarItems.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-display">Barang Sejenis yang Ditemukan Baru-baru Ini</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Berdasarkan kategori</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarItems.map((sItem) => (
                <div
                  key={sItem.id}
                  onClick={() => {
                    onSelectItem(sItem);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-lg hover:shadow-indigo-50/50 cursor-pointer group transition-all duration-300 flex gap-3 p-3 items-center"
                >
                  <div className="w-20 h-20 rounded-lg bg-slate-50 overflow-hidden shrink-0">
                    <img
                      src={sItem.images[0]}
                      alt={sItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate font-display">
                      {sItem.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-600 shrink-0" />
                      {sItem.location}
                    </p>
                    <span className="inline-block mt-2 text-[8px] font-bold uppercase bg-indigo-50 text-indigo-650 px-2.5 py-0.5 rounded-full border border-indigo-100 tracking-wider">
                      {sItem.category}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
