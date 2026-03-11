import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FaRobot, FaBars, FaTimes, FaCode, FaBrain, 
  FaPaperPlane, FaTerminal, FaChevronRight,
  FaCircle, FaMicrochip 
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// --- TYPEWRITER COMPONENT ---
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayedText}</span>;
};

const Page = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Neural uplink initialized. Standing by for command." }
  ]);

 useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100,
    easing: "ease-out-back"
  });

  fetch("https://babai-backend-wdvz.onrender.com/health")
    .then(() => setIsOnline(true))
    .catch(() => setIsOnline(false));
}, []);

 const handleSend = async () => {

  if (!input.trim()) return;

  const userMessage = input;

  setChatHistory(prev => [
    ...prev,
    { role: "user", text: userMessage }
  ]);

  setInput("");
  setIsTyping(true);

  try {

    const response = await fetch("https://babai-backend-wdvz.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: userMessage
      })
    });

    const data = await response.json();

    setChatHistory(prev => [
      ...prev,
      { role: "ai", text: data.response }
    ]);

  } catch (error) {

    setChatHistory(prev => [
      ...prev,
      { role: "ai", text: "CONNECTION_ERROR: Flask server unreachable." }
    ]);

  } finally {

    setIsTyping(false);

  }

};

  return (
    <div className="bg-[#f8f9fa] text-slate-900 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative min-h-screen">
      
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-[-2] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      {/* NAV SECTION - DARK SLATE */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-4 flex justify-between items-center bg-slate-900 border-b border-white/10 shadow-2xl">
        <div className="flex items-center gap-4 group">
          <div className="animate-[bounce_4s_ease-in-out_infinite]">
            <FaRobot className="text-3xl text-cyan-400 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">BAB_AI</span>
              <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter text-white">SUMANTA <span className="text-slate-400">ROUT</span></span>
          </div>
        </div>
        <button onClick={() => setOpen(true)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-cyan-500 transition-all shadow-xl">
          <FaBars />
        </button>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-40 pb-20 px-8 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="zoom-in-right">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-slate-400 italic">Evolution</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-md border-l-4 border-cyan-500 pl-8 mb-10">
              Engineering the future of CS through neural-driven architectures.
            </p>
          </div>

          {/* STATUS CARD (RESTORED TITLE CARD STYLE) */}
          <div data-aos="zoom-in-up" className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
              <FaMicrochip className="text-[10rem] text-white rotate-12" />
            </div>
            <h2 className="text-cyan-400 font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" /> Node_Status: {isOnline ? "ONLINE" : "OFFLINE"}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2 font-mono text-xs text-slate-400 uppercase">
                <span>Location</span> <span className="text-white">Balasore, IN</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2 font-mono text-xs text-slate-400 uppercase">
                <span>Core_Logic</span> <span className="text-white">Python / React</span>
              </div>
              <div className="flex justify-between font-mono text-xs text-slate-400 uppercase">
                <span>API_Latency</span> <span className="text-cyan-400">0.003ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE TITLE CARDS (RESTORED & IMPROVED) */}
      <section id="architecture" className="py-24 px-8 md:px-24 bg-slate-100/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <FaCode />, title: "Synthesis", desc: "Automated logic optimization and clean code synthesis." },
            { icon: <FaBrain />, title: "Neural", desc: "Adaptive AI integration leveraging advanced LLM nodes." },
            { icon: <FaTerminal />, title: "Uplink", desc: "Robust cloud architecture and production deployment." }
          ].map((card, i) => (
            <div 
              key={i} 
              data-aos="zoom-in-up" 
              data-aos-delay={i * 100}
              className="p-12 bg-white border border-slate-200 rounded-[3rem] shadow-sm hover:shadow-2xl hover:scale-105 hover:border-cyan-500 transition-all duration-700 group cursor-default"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl text-cyan-600 mb-8 transition-all duration-500 group-hover:bg-cyan-600 group-hover:text-white group-hover:rotate-6">
                {card.icon}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-cyan-600 transition-colors">{card.title}</h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAT INTERFACE */}
      <section id="chat" className="py-32 px-8 md:px-24">
        <div data-aos="fade-up" className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-10 md:p-14 shadow-2xl">
          <div className="space-y-10 mb-12 h-96 overflow-y-auto pr-6 scrollbar-hide">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                 <div className={`p-6 rounded-[2rem] text-xl whitespace-pre-wrap ${msg.role === 'user'? 'bg-cyan-500 text-white font-bold': 'bg-white/5 text-slate-300 border border-white/5'}`}> 
                  {msg.role === "ai" ? (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      code({inline, className, children}) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className="bg-gray-800 px-1 rounded text-sm">
            {children}
          </code>
        );
      }
    }}
  >
    {msg.text}
  </ReactMarkdown>
) : (
  msg.text
)}       </div>
              </div>
            ))}
            {isTyping && <div className="text-cyan-400 animate-pulse font-mono text-xs italic">BAB_AI NODE PROCESSING...</div>}
          </div>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-8 py-5 focus-within:border-cyan-500 transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isOnline ? "Enter system command..." : "Backend offline..."}
              className="flex-1 bg-transparent text-white font-medium focus:outline-none text-lg uppercase tracking-tight"
            />
            <button onClick={handleSend} className="ml-4 w-14 h-14 bg-cyan-600 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </section>

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-slate-950 z-[200] transition-all duration-700 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-12 flex flex-col h-full text-white">
          <FaTimes onClick={() => setOpen(false)} className="text-3xl self-end cursor-pointer mb-20 hover:text-cyan-400 transition-all" />
          <div className="space-y-6">
            {["Home", "Architecture", "Chat"].map((label, i) => (
              <a 
                key={i} 
                href={`#${label.toLowerCase()}`} 
                onClick={() => setOpen(false)} 
                className={`flex justify-between items-center p-6 rounded-3xl bg-white/5 font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-cyan-600 hover:translate-x-[-10px] group ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {label} <FaChevronRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-20 text-center border-t border-slate-200">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">BAB_AI</h2>
        <p className="text-[10px] text-slate-400 font-mono tracking-[1em] uppercase">Sumanta Rout // 2026</p>
      </footer>
    </div>
  );
};

export default Page;
