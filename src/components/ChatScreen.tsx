import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, ShieldAlert, Circle, CheckCircle2 } from 'lucide-react';
import { Message } from '../types';

interface ChatScreenProps {
  initialItem?: any;
}

export default function ChatScreen({ initialItem }: ChatScreenProps) {
  // Daftar Pesan Aktif Simulasi
  const [activeChatId, setActiveChatId] = useState('chat-1');

  const [chats, setChats] = useState([
    {
      id: 'chat-1',
      partnerName: 'Penemu Anonim #294',
      partnerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgkM3MNDWZ6N-gv9xzavh31R9lxWzXragsJGCRUmmUL52Lvb2QQit_qL7tKiSzxC8XWsPObKsZUd_j98YVzZIjVwr6-ASr2lqMwewqFUAKoG6HLcMhGHIl4DjTDbpz8U6VQLlyCiIfzTu8S223N3Mgx1pIgEvDuKLkJGtPCMdIMkWSOh-knfI5ds3fyTBmopPmNJRHRoxbepHseTEs7tY5wYvxMhBjqB70Hug8fuVq3xtbBgqUk8PtwFFb0NFh_aReALNwY9sdRe0',
      itemTitle: 'MacBook Air 13" - Silver',
      itemImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX7owO4ekS2QQqm80hPWFTZJtqOYlLfD9WgBn3zFrT5nRQ00kZVVhcpmn8-TCQXIdIQR_FCqOBgOSHhpwkMIbV5HLewd_hzX4qjQXsNCQa-R1Ne4aQt9GC5vH9p0_m7DMbUa3U2ETYDsGYa2BTN0mqmFqh--pCcYG9Nude1H7PZxXaqmnmSlXIJ_P_UYys-0qulPYzyeXGPm3ZSwK9XIg5LFPYUOO2fPpg1iRdqbfAOEFX4D9CVKunFLOoazVSatWjFF9EQC9CGgo',
      safeOffice: 'Resepsionis Perpustakaan Polines (Lantai 2)',
      unread: false,
      messages: [
        {
          id: 'm1',
          sender: 'finder',
          text: "Hai, saya menemukan MacBook Air Anda di meja baca perpustakaan lantai 2. Laptopnya terbuka dengan beberapa slide presentasi di layar.",
          timestamp: '10:14 AM'
        },
        {
          id: 'm2',
          sender: 'user',
          text: "Oh syukurlah! Ya, itu pasti laptop saya. Saya sedang belajar kelompok di sana sebelum makan siang. Di mana kita bisa bertemu untuk menyerahkannya?",
          timestamp: '10:16 AM'
        },
        {
          id: 'm3',
          sender: 'finder',
          text: "Saya ada sesi laboratorium sampai jam 3 sore. Jika Anda terburu-buru, saya bisa menitipkannya di meja resepsionis perpustakaan agar Anda bisa mengambilnya dengan bukti kartu identitas akademik.",
          timestamp: '10:18 AM'
        },
        {
          id: 'm4',
          sender: 'finder',
          text: "Berikut adalah lokasi tempat pertemuan yang tepat:",
          timestamp: '10:19 AM',
          mapLocation: {
            name: 'Perpustakaan Kampus Polines (Lantai 2)',
            coordinates: 'S 7.0456° / E 110.4382°',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkMAvcXaWAdplNWqgBf3CbeYQiff_n2H9CVDsBIQGI-f-TThk8x9at-63kK7ox5kuRh4twRscVs-4WgmswId54I8CaM1YGMDYuw7Qe9K1sSuPu7z2pyPF8BoqjaqQ6FB19KYffViaUmHkKPNzLqWQbfcj_vKi8cr3SY1mPQYtluwQg9OVYdzn1iS115Wyb_ENCxixXPPhtbN8z_I-gNepZ6z_OysGfDN6uL1OlEFAyRwxtLJt_4JXbCY0ORtjAe57tvjbRzxq6CVE'
          }
        },
        {
          id: 'm5',
          sender: 'user',
          text: "Ide bagus! Silakan serahkan ke Kepala Perpustakaan. Ini foto faktur pembelian/bukti nomor seri saya untuk dicocokkan dan diverifikasi kepemilikannya.",
          timestamp: '10:22 AM',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtV9yoAOQuPsdGWdMHWWk0N2XseDznBq1oPjdsSqom1-JVOstnhD8YW4UxgzBBh1z5AvhOYcMXt9BseJ5UUbj0POxHNBUSlk3EiY2zfIq5HhH--T9-x3MZDijbQRbNRBQS5OPtK4ZJQj_dpY5DDcfvc97vHD5uWPkvyScHD_K35hjjL4i-v8U_LdsFM_0YTuUEiITflKpoyKXQClINeU-7BVS5RJYOQqiXBzl0ciIfRBM1kDbz3esN4mBfc_z8QCJEgQmePNO7ZyA'
        }
      ] as any[]
    },
    {
      id: 'chat-2',
      partnerName: 'Kantor Keamanan Pusat (Budi)',
      partnerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgkM3MNDWZ6N-gv9xzavh31R9lxWzXragsJGCRUmmUL52Lvb2QQit_qL7tKiSzxC8XWsPObKsZUd_j98YVzZIjVwr6-ASr2lqMwewqFUAKoG6HLcMhGHIl4DjTDbpz8U6VQLlyCiIfzTu8S223N3Mgx1pIgEvDuKLkJGtPCMdIMkWSOh-knfI5ds3fyTBmopPmNJRHRoxbepHseTEs7tY5wYvxMhBjqB70Hug8fuVq3xtbBgqUk8PtwFFb0NFh_aReALNwY9sdRe0',
      itemTitle: 'Kartu Tanda Mahasiswa (KTM)',
      itemImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSoWOLPkXANfxIAkTU5pzhTLW1IaWi_WqvLTXQMZ1yeF7Z4EDViIawpxpa33NSn_74bqEaoOl3Kl3R2p1-RgpLjm-EdC1v2By_G3t6VOTj2haZNlHKnKuAWC1AtxXUwr0VLwu22lGfytKpT8WOIJbsiaYtJ1N9ensp-XpEygS6VY9N6UYleDV5PDG9AYWSlP1y1waUD42Ulb-HWSdWZJbPj5Ay0fuNHnVDWMr30BRdjy58xm9zMCTVuohP_jlhJBFtKqUmcEq2dNo',
      safeOffice: 'Pos Keamanan Pusat (Gerbang A)',
      unread: true,
      messages: [
        {
          id: 'm1b',
          sender: 'finder',
          text: "Salam. Kami telah menerima Kartu Tanda Mahasiswa (KTM) milik Dimas Saputra. Silakan kunjungi pos penjagaan dengan membawa dokumen alternatif.",
          timestamp: '09:02 AM'
        }
      ]
    },
    {
      id: 'chat-3',
      partnerName: 'Staf Kantin (Bu Sri)',
      partnerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgkM3MNDWZ6N-gv9xzavh31R9lxWzXragsJGCRUmmUL52Lvb2QQit_qL7tKiSzxC8XWsPObKsZUd_j98YVzZIjVwr6-ASr2lqMwewqFUAKoG6HLcMhGHIl4DjTDbpz8U6VQLlyCiIfzTu8S223N3Mgx1pIgEvDuKLkJGtPCMdIMkWSOh-knfI5ds3fyTBmopPmNJRHRoxbepHseTEs7tY5wYvxMhBjqB70Hug8fuVq3xtbBgqUk8PtwFFb0NFh_aReALNwY9sdRe0',
      itemTitle: 'Dompet Kulit Hitam',
      itemImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBBSy84tvyPD6YDykwoLybEWFGRWsBuoe_C54X4bMcCi86sX5jU8sIFujvhoGnGDzuHmg8v0iGE5GUE_mY1w-VuQGOSaTWadP0IIghT_lmvw7EcO4_vegYUCMb2on3N-VxBzIkXWttvzwZ2Q4cEEx0Ull1lKFM8Q7gNdmpzPEo4cKCcfqcf6uRcza1EPXq5OH_IB1ZDNOk4X-C0d-_rfKCrYtT8nc9q-M9u98BhzSnX34HM2FgsyBKzqCl1rp-wv3pgbvbHUww_r4',
      safeOffice: 'Meja Kasir Kantin #2',
      unread: false,
      messages: [
        {
          id: 'm1c',
          sender: 'finder',
          text: "Ya, dompetnya saya simpan di belakang meja kasir. Datang langsung ke sini setelah makan siang.",
          timestamp: 'Kemarin'
        }
      ]
    }
  ]);

  const [typedMessage, setTypedMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Gulir ke bawah setiap kali daftar pesan berubah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatId]);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      chatId: activeChat.id,
      sender: 'user',
      text: typedMessage,
      timestamp: 'Baru Saja'
    };

    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    const userText = typedMessage;
    setTypedMessage('');

    // Simulasi respons pintar untuk interaktivitas
    setTimeout(() => {
      let replyText = "Diterima. Saya akan melanjutkan ke langkah verifikasi.";
      if (activeChat.id === 'chat-1') {
        if (userText.toLowerCase().includes('librarian') || userText.toLowerCase().includes('bu sri') || userText.toLowerCase().includes('reception') || userText.toLowerCase().includes('resepsionis')) {
          replyText = "Oke, sudah saya titipkan ke Bu Sri di meja resepsionis Perpustakaan. Anda bisa mengambilnya sekarang!";
        } else {
          replyText = "Bagus sekali! Sudah saya amankan untuk Anda, jangan khawatir. Sampai jumpa di dekat perpustakaan.";
        }
      } else if (activeChat.id === 'chat-2') {
        replyText = "Sempurna. Harap bawa bukti registrasi mahasiswa Anda atau cetakan KTM sebagai bukti NIM.";
      }

      const finderMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        chatId: activeChat.id,
        sender: 'finder',
        text: replyText,
        timestamp: 'Baru Saja'
      };

      setChats((prevChats) =>
        prevChats.map((c) => {
          if (c.id === activeChat.id) {
            return {
              ...c,
              messages: [...c.messages, finderMsg]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  const handleAttachLocation = () => {
    const mapMsg: Message = {
      id: `msg-${Date.now()}`,
      chatId: activeChat.id,
      sender: 'user',
      text: "Membagikan koordinat lokasi serah terima yang disarankan:",
      timestamp: 'Baru Saja',
      mapLocation: {
        name: 'Plaza Pintu Masuk Utama Polines',
        coordinates: 'S 7.0461° / E 110.4390°',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgZTaF7rMTXj2EjPjjA_K2sAZ-dKcr1MvbgWvSe2US7HclUj9WIyzN4cU2GgXjZlnYCw0S0zLgnr5HNII3k0tQ_U1YK793yZNYdXKr02B7DDs7hmo47T1zqF6n8HR9aJbpJ29TeSO76iI01Ws_Etq7l8HNx3PXLkcU_mDH4NruZ1DFb-QByXqDDsWS-fJa9bWv4QwITNXbnQHcE5403VqtJNfq0O9bdbV4H4Gf3xZ7-XQi2PdzHWtxKC4Z1W1gFwOVMXfu7PAgnk0'
      }
    };

    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            messages: [...c.messages, mapMsg]
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="bg-[#FDFDFD] min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row border-t border-gray-100 text-slate-800">
      
      {/* COLUMN KIRI: Riwayat Kotak Masuk Chat (3 kolom pada desktop) */}
      <div className="w-full lg:w-80 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100 bg-slate-50/50">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 font-display">Pesan Kotak Masuk</h3>
          <p className="text-xs text-slate-500 mt-1">Log koordinasi dan serah terima langsung</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {chats.map((chat) => {
            const isSelected = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  chat.unread = false;
                }}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors relative ${
                  isSelected ? 'bg-indigo-50/20 border-l-4 border-indigo-600' : ''
                }`}
              >
                {/* Profile Avatar */}
                <div className="w-10 h-10 rounded-full bg-slate-50 overflow-hidden relative shrink-0 border border-gray-100">
                  <img
                    src={chat.partnerAvatar}
                    alt={chat.partnerName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {chat.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-indigo-600 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Sub-text info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-slate-900 truncate font-display">
                      {chat.partnerName}
                    </h4>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">10:22 AM</span>
                  </div>
                  <p className="text-[9px] font-bold text-indigo-650 truncate mt-0.5 uppercase tracking-widest">
                    {chat.itemTitle}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-1">
                    {chat.messages[chat.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER COLUMN: Kotak Pesan Live (6 kolom) */}
      <div className="flex-1 bg-slate-50/20 flex flex-col min-h-[500px]">
        
        {/* Chat partner header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChat.partnerAvatar}
                alt={activeChat.partnerName}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover border border-gray-100"
              />
              <Circle className="w-2.5 h-2.5 fill-indigo-600 text-indigo-600 absolute bottom-0 right-0 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-none font-display">{activeChat.partnerName}</h3>
              <span className="text-[9px] font-mono text-indigo-650 font-bold mt-1.5 inline-block uppercase tracking-widest">Online • Mahasiswa Terverifikasi</span>
            </div>
          </div>

          <span className="text-[10px] text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-full border border-gray-100 uppercase tracking-widest">
            ID Barang: <span className="text-slate-800 font-bold">{activeChat.id.toUpperCase()}</span>
          </span>
        </div>

        {/* Safety First Reminder Banner */}
        <div className="bg-indigo-50/45 border-b border-indigo-100/50 px-6 py-2.5 flex items-center gap-2.5 text-[11px] text-slate-600">
          <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0" />
          <p>
            <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] font-display">Keamanan Utama</span>: Koordinasikan penyerahan di ruang publik. Gunakan Meja Resepsionis Perpustakaan atau Pos Keamanan demi keamanan maksimal.
          </p>
        </div>

        {/* Chat message bubbles scroll view */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChat.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`max-w-md rounded-2xl p-4 shadow-2xs relative ${
                  isUser
                    ? 'bg-[#1A1A1A] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none border border-gray-100'
                }`}>
                  
                  {/* Text message */}
                  <p className="text-xs leading-relaxed">{msg.text}</p>

                  {/* Attachment image if exists */}
                  {msg.image && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-gray-100 bg-slate-50/50 p-1">
                      <img
                        src={msg.image}
                        alt="Bukti Kepemilikan"
                        referrerPolicy="no-referrer"
                        className="w-full max-h-48 object-cover"
                      />
                      <span className="text-[9px] text-slate-400 font-mono block mt-1.5 p-1 uppercase tracking-widest">
                        Lampiran: Faktur Bukti Kepemilikan Terverifikasi
                      </span>
                    </div>
                  )}

                  {/* Attachment map if exists */}
                  {msg.mapLocation && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 bg-white text-slate-800">
                      <div className="h-32 bg-slate-50">
                        <img
                          src={msg.mapLocation.image}
                          alt="Peta Lokasi Pertemuan"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 bg-slate-50/50 space-y-1">
                        <p className="text-xs font-bold text-slate-950 flex items-center gap-1 font-display">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{msg.mapLocation.name}</span>
                        </p>
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{msg.mapLocation.coordinates}</p>
                      </div>
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className={`block text-[8px] font-mono mt-1.5 text-right uppercase tracking-wider ${
                    isUser ? 'text-slate-400' : 'text-slate-450'
                  }`}>
                    {msg.timestamp}
                  </span>

                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Bottom Message Input bar */}
        <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-100 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleAttachLocation}
            title="Bagikan Lokasi Pertemuan"
            className="p-2 text-slate-400 hover:text-indigo-650 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
          >
            <MapPin className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder={`Ketik pesan ke ${activeChat.partnerName}...`}
            className="flex-1 px-4 py-2.5 bg-slate-50/50 border border-gray-100 focus:bg-white rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 font-semibold text-slate-850 placeholder-slate-400 transition-all"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>

      </div>

      {/* RIGHT COLUMN: Sidebar Kontekstual (3 kolom pada desktop) */}
      <div className="hidden lg:flex w-80 bg-white border-l border-gray-100 p-6 flex-col justify-between shrink-0">
        
        {/* Item reference card */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-450 font-display">Referensi Barang Kontekstual</h3>
          
          <div className="border border-gray-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
            <div className="h-32 bg-slate-50 rounded-lg overflow-hidden border border-gray-100">
              <img
                src={activeChat.itemImage}
                alt={activeChat.itemTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-650 text-[9px] font-bold uppercase rounded-full border border-indigo-100 tracking-wider mb-2 inline-block">
                Kecocokan Aktif
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 font-display leading-tight">{activeChat.itemTitle}</h4>
              <p className="text-[11px] text-slate-550 mt-1 leading-relaxed">Penjaga: {activeChat.safeOffice}</p>
            </div>
          </div>
        </div>

        {/* Safety tips box */}
        <div className="bg-indigo-50/40 border border-indigo-150/50 rounded-2xl p-4 mt-6">
          <h4 className="text-[10px] font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-widest font-display">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Panduan Serah Terima Aman</span>
          </h4>
          <ul className="text-[11px] text-slate-650 space-y-2 mt-2 list-disc pl-3 leading-relaxed font-sans">
            <li>Jangan pernah mengirim uang untuk pengiriman atau kurir barang.</li>
            <li>Bertemu di dalam perpustakaan Polines, masjid kampus, atau area gedung admin fakultas.</li>
            <li>Periksa nomor seri dan penanda utama secara langsung sebelum serah terima.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}
