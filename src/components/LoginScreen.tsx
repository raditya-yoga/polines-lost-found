import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [emailOrNim, setEmailOrNim] = useState('3.34.21.0.12');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi validasi jaringan asli selama 700ms
    setTimeout(() => {
      onLoginSuccess({
        nim: '3.34.21.0.12',
        name: 'Dimas Saputra',
        email: 'dimas.saputra@polines.ac.id',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3fJFT1VKVNE8b3lYvvoKfLR2HPtjK5VGOgFcZZVWwjFP4H5W5hKZpX_F_QpEllBjkwnWMhBA_gaLnvwmjy1phdHX-SmxsTpnwfjBIAojqfn05BveVElHmg5LsvxWMugZNS-7-36fR1dXpBhkP-huyKB5QDbTT_Pbsxzho71EdKNlP_2EquoVfd3vJlVg2GrLQ0mRWVi-t1cBGrrHfYh52ss8uXM64g1bIwODKK6aHR2hBaROTNh85_XEJ7glzv5dhEXXxSv92As8',
        isLoggedIn: true,
      });
      setIsLoading(false);
    }, 700);
  };

  const handleSsoClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess({
        nim: '3.34.21.0.12',
        name: 'Dimas Saputra',
        email: 'dimas.saputra@polines.ac.id',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3fJFT1VKVNE8b3lYvvoKfLR2HPtjK5VGOgFcZZVWwjFP4H5W5hKZpX_F_QpEllBjkwnWMhBA_gaLnvwmjy1phdHX-SmxsTpnwfjBIAojqfn05BveVElHmg5LsvxWMugZNS-7-36fR1dXpBhkP-huyKB5QDbTT_Pbsxzho71EdKNlP_2EquoVfd3vJlVg2GrLQ0mRWVi-t1cBGrrHfYh52ss8uXM64g1bIwODKK6aHR2hBaROTNh85_XEJ7glzv5dhEXXxSv92As8',
        isLoggedIn: true,
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col md:flex-row font-sans">
      
      {/* COLUMN KIRI: Visual Branding & Hero */}
      <div className="w-full md:w-[45%] bg-[#0B0C10] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        
        {/* Background ambient lights */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600/30 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-slate-800/30 blur-[120px]"></div>
        </div>
 

        <div className="relative z-10 flex items-center space-x-3">
          <div className="bg-indigo-500/10 backdrop-blur-md p-2 rounded-full border border-indigo-500/20">
            <Shield className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg tracking-widest bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent uppercase">
              POLINES L&F
            </span>
            <p className="text-[9px] text-slate-400 tracking-widest uppercase font-mono">Jaringan Kampus Terverifikasi</p>
          </div>
        </div>
 

        <div className="my-12 md:my-auto relative z-10">
          <div className="mb-8 max-w-xs mx-auto md:mx-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGbpBbikGUcsmKjdp9vOBr_FkB67qX_vUjCY02tH_TCuBRjezvucGdITbjm84QD7K3fxsNOsuvsyJOJYLMqvVb4F6znMg38hp3qVUVKK6J4StW9lETFMAQfQf41o4iRQSJXTbrmsbp_X57J4iZXIvxnQHPeyIAsY6Znfia95VltLZcvNPJsU5K9vemGbGMkGU0oQLTL74OwuFZjIpvQw23IxyFiJoSTSwVkmK84Kjc1g2dX6U2iRWPy_J6r9WE0XsSWH4hRjzxv5s" 
              alt="Ilustrasi Dompet Hilang" 
              referrerPolicy="no-referrer"
              className="rounded-2xl shadow-2xl border border-white/5 hover:scale-[1.01] transition-all duration-300 bg-slate-900/40 p-1"
            />
          </div>
 
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold mb-4 tracking-widest uppercase font-mono">
            🛡️ Amankan Barang Bawaan Anda
          </span>
 
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white mb-4 leading-tight">
            Temukan kembali barang hilang di dalam <span className="text-indigo-400 italic font-serif">ekosistem</span> kampus
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md font-sans">
            Portal resmi mahasiswa Politeknik Negeri Semarang untuk melaporkan, melacak, dan mengklaim barang hilang secara aman dan tepercaya.
          </p>
 
          {/* Quick value props */}
          <div className="mt-8 space-y-3.5">
            {[
              'Koneksi langsung ke Kantor Keamanan Kampus Polines',
              'Verifikasi klaim cepat dengan logika kecocokan otomatis',
              'Sistem obrolan aman yang melindungi privasi akademik mahasiswa'
            ].map((prop, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-slate-400">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                <span className="font-sans leading-relaxed">{prop}</span>
              </div>
            ))}
          </div>
        </div>
 

        <div className="relative z-10 pt-4 border-t border-white/5 text-[9px] text-slate-500 font-mono tracking-widest uppercase">
          <p>POLITEKNIK NEGERI SEMARANG</p>
          <p className="text-[8px] text-slate-600 mt-0.5">Jawa Tengah, Indonesia</p>
        </div>
 
      </div>
      
      {/* COLUMN KANAN: Formulir Login/Daftar Interaktif */}
      <div className="w-full md:w-[55%] bg-white p-8 md:p-16 flex flex-col justify-center items-center">
        
        <div className="w-full max-w-md">
          {/* Header Formulir */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Selamat datang di POLINES L&F
            </h1>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed font-sans">
              Masuk dengan identitas komunitas kampus Anda untuk menemukan kembali barang Anda
            </p>
          </div>
 
          {/* Login/Register Tab Selector */}
          <div className="bg-slate-100/75 p-1 rounded-full flex mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              MASUK MAHASISWA
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              DAFTAR BARU
            </button>
          </div>
 
          {/* SSO button - highlighted in design */}
          <button
            type="button"
            onClick={handleSsoClick}
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-100 hover:shadow-xl transition-all duration-250 flex items-center justify-center gap-3 relative overflow-hidden"
          >
            <Shield className="w-4.5 h-4.5 text-white/90" />
            <span>Lanjutkan dengan SSO Polines</span>
            <span className="bg-white/10 text-white text-[8px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
              Tercepat
            </span>
          </button>
 
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-100" />
            <span className="mx-3 text-[10px] text-slate-400 font-mono tracking-widest uppercase bg-white px-2">
              atau gunakan email akademik / NIM
            </span>
            <hr className="flex-1 border-gray-100" />
          </div>
 
          {/* Regular login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NIM / Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-1.5">
                NIM / Alamat Email Kampus
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={emailOrNim}
                  onChange={(e) => setEmailOrNim(e.target.value)}
                  placeholder="3.34.21.0.12 atau student@polines.ac.id"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-50/50 focus:bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
 
            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  Kata Sandi Akademik
                </label>
                <a href="#forgot" className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-wider">
                  Lupa?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi Anda"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 hover:bg-slate-50/50 focus:bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
 
            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-200 rounded"
                />
                <span className="text-[11px] font-semibold text-slate-600 select-none">Ingat perangkat ini</span>
              </label>
              <span className="text-[9px] text-indigo-600 font-mono font-bold flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                ● VPN Aman Polines
              </span>
            </div>
 
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Lanjutkan ke Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
 
          </form>
 
          {/* Bottom Policy notice */}
          <p className="text-center text-[10px] text-slate-400 mt-8 leading-relaxed max-w-xs mx-auto">
            Dengan masuk, Anda menyetujui **Kebijakan Keamanan dan Integritas Barang** Politeknik Negeri Semarang.
          </p>
        </div>
 
      </div>
 
    </div>
  );
}
