import React from 'react';
import { Bell, MessageSquare, PlusCircle, Search, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  activeView: string;
  setView: (view: string) => void;
  unreadCount: number;
}

export default function Header({ user, onLogout, activeView, setView, unreadCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('listings')}>
            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-full">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-indigo-600">
                POLINES<span className="text-slate-400 font-light">L&F</span>
              </span>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-0.5">
                Registri Kampus Semarang
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            <button
              onClick={() => setView('listings')}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-150 ${
                activeView === 'listings' || activeView === 'detail' || activeView === 'claim'
                  ? 'bg-indigo-50 text-indigo-650'
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-[#1A1A1A]'
              }`}
            >
              Cari Barang
            </button>
            <button
              onClick={() => setView('report')}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-150 flex items-center gap-1.5 ${
                activeView === 'report' || activeView === 'report-photo' || activeView === 'report-review' || activeView === 'report-success'
                  ? 'bg-indigo-50 text-indigo-650'
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-[#1A1A1A]'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Laporkan Barang</span>
            </button>
            <button
              onClick={() => setView('chat')}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-150 flex items-center gap-1.5 ${
                activeView === 'chat'
                  ? 'bg-indigo-50 text-indigo-650'
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Kotak Masuk</span>
              {unreadCount > 0 && (
                <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-1 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative cursor-pointer hover:bg-slate-50 p-2.5 rounded-full transition-all">
              <Bell className="h-4.5 w-4.5 text-slate-500 hover:text-indigo-600" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white animate-pulse"></span>
            </div>

            {/* Divider */}
            <span className="h-6 w-px bg-gray-100"></span>

            {/* Profile Info Card */}
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-full ring-2 ring-indigo-50 object-cover"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">
                  {user.name}
                </p>
                <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none tracking-tight">
                  NIM {user.nim}
                </p>
              </div>
              <button
                onClick={onLogout}
                title="Keluar dari sesi"
                className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex justify-around py-3.5 border-t border-gray-100">
          <button
            onClick={() => setView('listings')}
            className={`text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 py-1 px-3 rounded-lg ${
              activeView === 'listings' || activeView === 'detail' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Cari</span>
          </button>
          <button
            onClick={() => setView('report')}
            className={`text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 py-1 px-3 rounded-lg ${
              activeView === 'report' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Lapor</span>
          </button>
          <button
            onClick={() => setView('chat')}
            className={`text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 py-1 px-3 rounded-lg relative ${
              activeView === 'chat' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Kotak Masuk</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-3 bg-indigo-600 text-white text-[8px] px-1 rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
