import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, User, ArrowRight, Sparkles, Filter, RefreshCw, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { Item } from '../types';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data';

interface ListingsScreenProps {
  items: Item[];
  onSelectItem: (item: Item) => void;
  onReportClick: () => void;
  onClaimItemClick: (item: Item) => void;
}

export default function ListingsScreen({ items, onSelectItem, onReportClick, onClaimItemClick }: ListingsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Barang');
  const [selectedLocation, setSelectedLocation] = useState('Semua Lokasi');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Atur ulang halaman ketika filter berubah
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLocation, selectedType]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Semua Barang' || item.category === selectedCategory;
      
      const matchesLocation = selectedLocation === 'Semua Lokasi' || item.location.includes(selectedLocation.replace(' (Polines)', ''));
      
      const matchesType = selectedType === 'all' || item.type === selectedType;

      return matchesSearch && matchesCategory && matchesLocation && matchesType;
    });
  }, [items, searchTerm, selectedCategory, selectedLocation, selectedType]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Semua Barang');
    setSelectedLocation('Semua Lokasi');
    setSelectedType('all');
  };

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
    <div className="bg-[#FDFDFD] min-h-screen pb-16 font-sans text-slate-800">
      
      {/* 1. HERO SEARCH SECTION */}
      <div className="bg-white py-12 md:py-20 border-b border-gray-100 relative overflow-hidden">
        
        {/* Background Graphic Ornaments */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-30 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-indigo-50 blur-3xl"></div>
          <div className="absolute bottom-10 right-32 w-48 h-48 rounded-full bg-slate-100 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-650" />
            <span>Sistem Cerdas Barang Hilang & Temuan</span>
          </span>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-slate-900">
            Temukan barang Anda dengan kerja sama <span className="text-indigo-600 italic font-serif">komunitas</span> kampus
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-4 max-w-xl mx-auto font-sans leading-relaxed">
            Laporkan barang hilang, cari barang temuan, dan koordinasikan penyerahan aman melalui identitas mahasiswa terverifikasi.
          </p>

          {/* Interactive Search Bar Panel */}
          <div className="max-w-3xl mx-auto mt-10 bg-white p-2.5 rounded-full shadow-lg shadow-indigo-100/40 border border-gray-100 text-slate-850 flex flex-col md:flex-row gap-2">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-100 py-1.5">
              <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari barang hilang (contoh: MacBook, KTM, botol biru, dompet...)"
                className="w-full text-xs font-semibold focus:outline-none bg-transparent text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Location Filter Dropdown */}
            <div className="md:w-64 flex items-center px-4 py-1.5 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="w-4 h-4 text-indigo-600 mr-2 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs font-semibold bg-transparent border-none text-slate-700 focus:outline-none cursor-pointer"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="text-slate-800 font-medium">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Type selector (All, Lost, Found) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100/75 rounded-full shrink-0">
              {(['all', 'lost', 'found'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedType === type
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {type === 'all' ? 'Semua' : type === 'lost' ? 'Hilang' : 'Temuan'}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* 2. CHIPS CATEGORY LIST */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <h3 className="text-[11px] font-bold text-slate-900 tracking-widest uppercase font-display">Filter Kategori</h3>
          </div>
          {(selectedCategory !== 'Semua Barang' || selectedLocation !== 'Semua Lokasi' || searchTerm || selectedType !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Atur Ulang Filter</span>
            </button>
          )}
        </div>

        {/* Category horizontal scrolling chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-2xs font-bold'
                  : 'bg-white text-slate-500 border-gray-100 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LISTINGS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-2xs">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-800 font-display">Tidak ada barang yang cocok</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Coba sesuaikan kata kunci pencarian, pilih kategori lain, atau pilih 'Semua Lokasi'.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-6 py-2.5 bg-[#1A1A1A] hover:bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Tampilkan Semua Barang</span>
            </button>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">
                Menampilkan <span className="text-slate-800 font-bold">{Math.min(filteredItems.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredItems.length, currentPage * itemsPerPage)}</span> dari <span className="text-slate-800 font-bold">{filteredItems.length}</span> barang
              </p>
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-[10px] text-slate-450 font-mono tracking-wider uppercase">Diperbarui otomatis tiap 5 menit</span>
              </div>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedItems.map((item) => {
                const isClaiming = item.status === 'claiming';
                const isClaimed = item.status === 'claimed';

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-xl hover:shadow-indigo-100/30 hover:border-indigo-100 transition-all duration-300 flex flex-col group cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    
                    {/* Item Image Gallery container with hover effects */}
                    <div className="h-48 w-full bg-slate-50 relative overflow-hidden shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                      />
                      
                      {/* Status Badging overlay */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-2xs ${
                          item.type === 'found' ? 'bg-indigo-650 text-white' : 'bg-[#1A1A1A] text-white'
                        }`}>
                          {item.type === 'found' ? 'TEMUAN' : 'HILANG'}
                        </span>
                        
                        {item.status !== 'unclaimed' && (
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-2xs ${
                            isClaimed ? 'bg-slate-600 text-white' : 'bg-amber-550 text-white'
                          }`}>
                            {getStatusLabel(item.status)}
                          </span>
                        )}
                      </div>

                      {/* Floating Category Tag */}
                      <span className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-xs text-slate-800 text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border border-gray-100">
                        {item.category}
                      </span>
                    </div>

                    {/* Content text block */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        
                        {/* Title */}
                        <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-indigo-600 font-display transition-colors line-clamp-1">
                          {item.title}
                        </h4>

                        {/* Location */}
                        <div className="flex items-start gap-1.5 text-slate-500 mt-2.5 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item.location}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-slate-500 mt-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{item.date}</span>
                        </div>

                        {/* Finder reference */}
                        <div className="flex items-center gap-1.5 text-slate-400 mt-3 pt-3 border-t border-gray-100 text-[11px] font-medium">
                          <User className="w-3.5 h-3.5 text-indigo-555" />
                          <span className="text-slate-600 line-clamp-1">Oleh {item.finderName}</span>
                        </div>

                      </div>

                      {/* Interactive Trigger Button */}
                      <div className="mt-5 pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.type === 'found' && item.status === 'unclaimed') {
                              onClaimItemClick(item);
                            } else {
                              onSelectItem(item);
                            }
                          }}
                          className={`w-full py-2.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isClaimed
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : isClaiming
                              ? 'bg-amber-550 text-white shadow-2xs'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                          }`}
                          disabled={isClaimed}
                        >
                          <span>
                            {isClaimed
                              ? 'Barang Sudah Diserahkan'
                              : isClaiming
                              ? 'Klaim Sedang Diverifikasi'
                              : item.type === 'found'
                              ? 'Klaim Barang'
                              : 'Tanyakan Detail'}
                          </span>
                          {!isClaimed && !isClaiming && <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Pagination block */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-full text-[10px] font-bold border border-gray-100 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-100 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-full text-[10px] font-bold border border-gray-100 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. FLOATING ACTION BUTTON (FAB) FOR ADDING NEW REPORT */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={onReportClick}
          className="bg-[#1A1A1A] hover:bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-full shadow-lg shadow-indigo-100/50 hover:shadow-xl transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
          <span>Laporkan Barang Hilang/Temuan</span>
        </button>
      </div>

    </div>
  );
}
