// src/App.tsx
import './App.scss';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./components/Header/Header";
import { TxForm } from "./components/TxForm/TxForm";
import { Footer } from "./components/Footer/Footer";
import { TonProofDemo } from "./components/TonProofDemo/TonProofDemo";
import { CreateJettonDemo } from "./components/CreateJettonDemo/CreateJettonDemo";
import UserProfile from './UserProfile';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const botToken = '7739269961:AAE5PWaOn7AyMm5G9KYv2APrbGo7Cof4Cxo'; // جایگزین کنید با توکن دسترسی خود
  const userId = '6955963932'; // جایگزین کنید با شناسه کاربر

  const [results, setResults] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleSearch = async (username: string) => {
    try {
      const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChat`, {
        params: {
          chat_id: `@${username}`,
        },
      });

      if (response.data.ok) {
        setResults([response.data.result]);
      } else {
        console.error('No results found:', response.data);
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  const handleSelect = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <TonConnectUIProvider
      manifestUrl="https://raw.githubusercontent.com/amhousa/demo-dapp-with-react-ui/refs/heads/master/public/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "telegram-wallet",
            name: "Wallet",
            imageUrl: "https://wallet.tg/images/logo-288.png",
            aboutUrl: "https://wallet.tg/",
            universalLink: "https://t.me/wallet?attach=wallet",
            bridgeUrl: "https://bridge.ton.space/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"]
          },
          // سایر کیف‌پول‌ها
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/buyingstars_bot'
      }}
    >
       <div className="app">
        <Header />
        <h1>Telegram User Profile</h1>
        <UserProfile botToken={botToken} userId={userId} />
        <SearchForm onSearch={handleSearch} />
        {results.length > 0 && <SearchResults results={results} onSelect={handleSelect} />}
        {selectedUser && (
          <div>
            <h2>Selected User</h2>
            <img src={selectedUser.photo_url} alt={selectedUser.username} />
            <p>{selectedUser.first_name} {selectedUser.last_name}</p>
            <p>@{selectedUser.username}</p>
          </div>
        )}
        <TxForm />
        {/* <CreateJettonDemo /> */}
        {/* <TonProofDemo /> */}
        {/* <Footer /> */}
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
