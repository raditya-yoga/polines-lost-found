import React from 'react';
import { ShieldAlert, BookOpen, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-500 py-12 mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-lg tracking-tight text-indigo-600">
                POLINES<span className="text-slate-400 font-light">L&F</span>
              </span>
            </div>
            <p className="text-xs text-slate-450 leading-relaxed font-sans">
              Portal resmi bagi mahasiswa, staf, dan dosen Politeknik Negeri Semarang untuk melaporkan, melacak, dan mengembalikan barang hilang dengan aman.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100">VERSI SISTEM: 2.1-LIVE</span>
            </div>
          </div>

          {/* Column 2: Campus Safety Office Contact */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-[11px] tracking-widest uppercase font-display">Kantor Keamanan Kampus</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Pos Keamanan Pusat (Sebelah Pintu Masuk Utama, Kampus Tembalang)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>+62 (24) 7474701 (Ext: 119)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                <span>Dukungan Kampus Darurat (24/7)</span>
              </div>
            </div>
          </div>

          {/* Column 3: Rules & Guidelines */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-[11px] tracking-widest uppercase font-display">Sumber Daya</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rules" className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>Cara verifikasi kepemilikan</span>
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium">
                  <ShieldAlert className="w-4 h-4 text-indigo-500" />
                  <span>Panduan pertemuan aman</span>
                </a>
              </li>
              <li className="text-[10px] text-slate-400 pt-2 border-t border-gray-100 font-sans mt-2">
                Dibuat untuk mahasiswa Polines sesuai dengan Panduan Barang Temuan Kampus.
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-mono tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Politeknik Negeri Semarang. Hak cipta dilindungi undang-undang.</p>
          <p className="mt-2 sm:mt-0">Tembalang, Kota Semarang, Jawa Tengah, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
