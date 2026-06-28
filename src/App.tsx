import React, { useState } from 'react';
import { User, Item } from './types';
import { INITIAL_ITEMS } from './data';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import ListingsScreen from './components/ListingsScreen';
import DetailScreen from './components/DetailScreen';
import ClaimScreen from './components/ClaimScreen';
import ChatScreen from './components/ChatScreen';
import ReportScreen from './components/ReportScreen';
import { Sparkles, X, ShieldAlert } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<string>('listings');
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle Login success
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActiveView('listings');
    showToast(`Berhasil masuk sebagai ${loggedInUser.name}`);
  };

  // Helper to trigger custom beautiful toast notifications
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Logout session
  const handleLogout = () => {
    setUser(null);
    setSelectedItem(null);
    setActiveView('listings');
  };

  // Switch item and go to detail
  const handleSelectItem = (item: Item) => {
    setSelectedItem(item);
    setActiveView('detail');
  };

  // Claim Item trigger
  const handleClaimItemClick = (item: Item) => {
    setSelectedItem(item);
    setActiveView('claim');
  };

  // Chat/Inquire Item trigger
  const handleInquireClick = (item: Item) => {
    setSelectedItem(item);
    setActiveView('chat');
    setUnreadCount(0); // Opened chats
  };

  // Submit Claim action from claim wizard
  const handleSubmitClaim = (itemId: string, claimData: any) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            status: 'claiming'
          };
        }
        return item;
      })
    );
    setActiveView('listings');
    setSelectedItem(null);
    showToast(`Permintaan klaim untuk ${selectedItem?.title} telah dikirim dan sekarang sedang diverifikasi!`);
  };

  // Add new report submitted from ReportScreen
  const handleAddReport = (newReportData: any) => {
    const newReport: Item = {
      ...newReportData,
      status: 'unclaimed'
    };

    setItems((prevItems) => [newReport, ...prevItems]);
    showToast(`Laporan untuk "${newReport.title}" berhasil dipublikasikan!`);
  };

  // View Switch helper
  const handleSetView = (view: string) => {
    setActiveView(view);
    if (view === 'chat') {
      setUnreadCount(0);
    }
  };

  // If user is not logged in, force show LoginScreen
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] font-sans text-[#1A1A1A] antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* GLOBAL TOAST BANNER */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[100] bg-white text-[#1A1A1A] px-5 py-3.5 rounded-full shadow-xl shadow-indigo-100/50 flex items-center gap-3 border border-gray-100 animate-slideDown max-w-md w-full mx-auto justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <p className="text-[13px] font-medium leading-relaxed tracking-tight">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-[#1A1A1A] shrink-0 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* HEADER NAVIGATION */}
      <Header
        user={user}
        onLogout={handleLogout}
        activeView={activeView}
        setView={handleSetView}
        unreadCount={unreadCount}
      />

      {/* MAIN VIEW CONTROLLER GRID */}
      <main className="flex-1">
        
        {activeView === 'listings' && (
          <ListingsScreen
            items={items}
            onSelectItem={handleSelectItem}
            onReportClick={() => handleSetView('report')}
            onClaimItemClick={handleClaimItemClick}
          />
        )}

        {activeView === 'detail' && selectedItem && (
          <DetailScreen
            item={selectedItem}
            allItems={items}
            onBack={() => handleSetView('listings')}
            onClaim={handleClaimItemClick}
            onInquire={handleInquireClick}
            onSelectItem={handleSelectItem}
          />
        )}

        {activeView === 'claim' && selectedItem && (
          <ClaimScreen
            item={selectedItem}
            onBack={() => handleSetView('detail')}
            onSubmitClaim={handleSubmitClaim}
          />
        )}

        {activeView === 'chat' && (
          <ChatScreen initialItem={selectedItem || undefined} />
        )}

        {activeView === 'report' && (
          <ReportScreen
            onAddReport={handleAddReport}
            onBackToHome={() => handleSetView('listings')}
          />
        )}

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
