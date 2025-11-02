import React, { useState, useEffect, useRef } from 'react';
import { Users, MessageCircle, Mic, MicOff, Play, RotateCcw, Home, Trophy } from 'lucide-react';

// كائن الترجمة متعدد اللغات
const translations = {
  ar: {
    startGame: "ابدأ اللعب الآن 🚀",
    enterName: "✏️ أدخل اسمك هنا",
    waitingPlayer: "🔍 جاري البحث عن لاعب...",
    yourTurn: "✨ دورك الآن! اختر مربعاً",
    waitTurn: "⏳ انتظر دور صديقك...",
    draw: "🤝 تعادل مثير!",
    winner: "🎉 {name} فاز! 🏆",
    chat: "الدردشة 💬",
    designedBy: "صُممت بواسطة",
    rooms: "الغرف المتاحة",
  },
  en: {
    startGame: "Start Playing 🚀",
    enterName: "✏️ Enter your name here",
    waitingPlayer: "🔍 Waiting for a player...",
    yourTurn: "✨ It's your turn! Choose a square",
    waitTurn: "⏳ Wait for your friend’s turn...",
    draw: "🤝 It's a draw!",
    winner: "🎉 {name} wins! 🏆",
    chat: "Chat 💬",
    designedBy: "Designed by",
    rooms: "Available Rooms",
  },
  fr: {
    startGame: "Commencer à jouer 🚀",
    enterName: "✏️ Entrez votre nom ici",
    waitingPlayer: "🔍 En attente d'un joueur...",
    yourTurn: "✨ À vous de jouer ! Choisissez une case",
    waitTurn: "⏳ Attendez le tour de votre ami...",
    draw: "🤝 Match nul !",
    winner: "🎉 {name} a gagné ! 🏆",
    chat: "Discussion 💬",
    designedBy: "Conçu par",
    rooms: "Salles disponibles",
  },
  es: {
    startGame: "Comienza a jugar 🚀",
    enterName: "✏️ Ingresa tu nombre aquí",
    waitingPlayer: "🔍 Esperando a un jugador...",
    yourTurn: "✨ ¡Es tu turno! Elige una casilla",
    waitTurn: "⏳ Espera el turno de tu amigo...",
    draw: "🤝 ¡Empate!",
    winner: "🎉 ¡{name} ganó! 🏆",
    chat: "Chat 💬",
    designedBy: "Diseñado por",
    rooms: "Salas disponibles",
  },
  ja: {
    startGame: "プレイ開始 🚀",
    enterName: "✏️ 名前を入力してください",
    waitingPlayer: "🔍 プレイヤーを待っています...",
    yourTurn: "✨ あなたの番です！マスを選んでください",
    waitTurn: "⏳ 友達の番を待っています...",
    draw: "🤝 引き分け！",
    winner: "🎉 {name} が勝ちました！ 🏆",
    chat: "チャット 💬",
    designedBy: "作成者",
    rooms: "利用可能な部屋",
  },
  zh: {
    startGame: "开始游戏 🚀",
    enterName: "✏️ 请输入你的名字",
    waitingPlayer: "🔍 等待玩家加入...",
    yourTurn: "✨ 轮到你了！请选择一个格子",
    waitTurn: "⏳ 等待你的朋友行动...",
    draw: "🤝 平局！",
    winner: "🎉 {name} 获胜！ 🏆",
    chat: "聊天 💬",
    designedBy: "由...设计",
    rooms: "可用房间",
  },
  tr: {
    startGame: "Oynamaya başla 🚀",
    enterName: "✏️ İsmini buraya gir",
    waitingPlayer: "🔍 Oyuncu bekleniyor...",
    yourTurn: "✨ Sıra sende! Bir kare seç",
    waitTurn: "⏳ Arkadaşının sırasını bekle...",
    draw: "🤝 Berabere!",
    winner: "🎉 {name} kazandı! 🏆",
    chat: "Sohbet 💬",
    designedBy: "Tasarımcı",
    rooms: "Mevcut Odalar",
  },
  pt: {
    startGame: "Comece a jogar 🚀",
    enterName: "✏️ Digite seu nome aqui",
    waitingPlayer: "🔍 Aguardando jogador...",
    yourTurn: "✨ É sua vez! Escolha um quadrado",
    waitTurn: "⏳ Espere a vez do seu amigo...",
    draw: "🤝 Empate!",
    winner: "🎉 {name} venceu! 🏆",
    chat: "Chat 💬",
    designedBy: "Desenvolvido por",
    rooms: "Salas disponíveis",
  },
};

const TicTacToeOnline = () => {
  const [lang, setLang] = useState("ar"); // اللغة الافتراضية
  const t = translations[lang];

  const [screen, setScreen] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [gameState, setGameState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isMicOn, setIsMicOn] = useState(false);
  const [waitingForPlayer, setWaitingForPlayer] = useState(false);

  // ... نفس أكواد التخزين والدوال كما في الكود السابق

  // مثال واجهة البداية مع اختيار اللغة
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full transform hover:scale-105 transition-transform">

          <div className="text-center mb-10">
            {/* قائمة اختيار اللغة */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="mb-6 px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:border-purple-600"
            >
              <option value="ar">العربية 🇸🇦</option>
              <option value="en">English 🇬🇧</option>
              <option value="fr">Français 🇫🇷</option>
              <option value="es">Español 🇪🇸</option>
              <option value="ja">日本語 🇯🇵</option>
              <option value="zh">中文 🇨🇳</option>
              <option value="tr">Türkçe 🇹🇷</option>
              <option value="pt">Português 🇧🇷</option>
            </select>

            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="text-blue-500 text-5xl font-black">X</div>
              <span className="text-5xl font-black text-gray-700">VS</span>
              <div className="text-red-500 text-5xl font-black">O</div>
            </div>
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-3">
              XO أونلاين 🎮✨
            </h1>
            <p className="text-gray-600 text-lg">{t.rooms}</p>
            <p className="text-purple-600 font-bold mt-2 text-sm">تلقائي - بدون أكواد!</p>
          </div>
          
          <input
            type="text"
            placeholder={t.enterName}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-5 py-4 border-3 border-purple-300 rounded-2xl mb-6 focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-200 text-right text-lg transition-all"
          />
          
          <button
            // onClick={findOrCreateGame}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            <Play size={28} />
            {t.startGame}
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm mb-2">{t.designedBy}</p>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Aziz tm 👨‍💻
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ... في كل مكان استخدم نصوص الترجمة t.x بدلا من النصوص الثابتة

  return null;
};

export default TicTacToeOnline;