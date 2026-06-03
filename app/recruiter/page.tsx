"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Filter, 
  Zap, 
  Award, 
  ChevronRight, 
  Users, 
  Globe,
  Cpu,
  Layers
} from 'lucide-react';

// --- Mock Data ---

const CANDIDATES = [
  {
    id: 1,
    username: "alex_dev_blockchain",
    score: 94,
    seniority: "Staff Engineer",
    skills: ["Blockchain", "System Design"],
    strengths: ["Solidity Optimization", "Distributed Systems"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: 2,
    username: "sarah_frontend_pro",
    score: 92,
    seniority: "Senior Engineer",
    skills: ["React", "System Design"],
    strengths: ["Performance Tuning", "UI Architecture"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 3,
    username: "neural_mind_ai",
    score: 89,
    seniority: "Lead AI Researcher",
    skills: ["AI/ML", "Node.js"],
    strengths: ["LLM Orchestration", "Python Backend"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mind"
  },
  {
    id: 4,
    username: "crypto_node_expert",
    score: 87,
    seniority: "Senior Backend",
    skills: ["Node.js", "Blockchain"],
    strengths: ["Smart Contracts", "High-Throughput APIs"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Crypto"
  },
  {
    id: 5,
    username: "react_wizard_88",
    score: 91,
    seniority: "Senior Engineer",
    skills: ["React"],
    strengths: ["Next.js Mastery", "State Management"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wizard"
  },
  {
    id: 6,
    username: "infra_god_system",
    score: 95,
    seniority: "Principal Architect",
    skills: ["System Design", "Node.js"],
    strengths: ["Kubernetes", "Scalability Guru"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Infra"
  }
];

const SKILL_CATEGORIES = ["All", "React", "Node.js", "AI/ML", "Blockchain", "System Design"];

// --- Components ---

const Navbar = () => (
  <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 h-20 flex items-center px-8">
    <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Shield className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-white tracking-tighter uppercase">
          SKILLCHAIN<span className="text-cyan-500 font-light">RECRUITER</span>
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Platform</a>
        <button className="bg-cyan-500 text-slate-950 px-6 py-2 rounded-lg text-sm font-black hover:bg-cyan-400 transition-all uppercase tracking-tighter">
          Post Bounty
        </button>
      </div>
    </div>
  </nav>
);

const CandidateCard = ({ candidate }: { candidate: typeof CANDIDATES[0] }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-slate-900/40 border border-white/5 rounded-[32px] p-8 hover:border-cyan-500/30 transition-all backdrop-blur-sm overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8">
      <div className="w-16 h-16 rounded-full border-4 border-cyan-500/10 flex items-center justify-center relative">
        <span className="text-white font-black text-xl">{candidate.score}</span>
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle 
            cx="32" cy="32" r="28" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            className="text-cyan-500"
            strokeDasharray={`${candidate.score * 1.76}, 176`}
          />
        </svg>
      </div>
    </div>

    <div className="flex items-start gap-6 mb-8">
      <img src={candidate.avatar} className="w-20 h-20 rounded-2xl border border-white/10 bg-slate-800" alt="" />
      <div>
        <h3 className="text-2xl font-black text-white tracking-tight">@{candidate.username}</h3>
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mt-1">{candidate.seniority}</p>
      </div>
    </div>

    <div className="space-y-4 mb-8">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI-Validated Strengths</p>
      <div className="flex flex-wrap gap-2">
        {candidate.strengths.map(s => (
          <span key={s} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-slate-300 font-medium">
            {s}
          </span>
        ))}
      </div>
    </div>

    <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-2 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-500">
      View Proof of Work <ChevronRight size={18} />
    </button>
  </motion.div>
);

// --- Main Page ---

export default function RecruiterPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter(c => {
      const matchesSearch = c.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || c.skills.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <Users size={12} /> Recruiter Intelligence Mode
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                VERIFIED <br /><span className="text-cyan-500">NETWORK.</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-6 text-slate-500 font-mono text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>4.2k ANALYZED TODAY</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span>GLOBAL ACCESS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-4 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by username..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/60 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-cyan-500/50 transition-all backdrop-blur-md"
            />
          </div>
          
          <div className="lg:col-span-8 flex flex-wrap items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-xl border border-white/5 text-slate-500">
              <Filter size={20} />
            </div>
            {SKILL_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                  activeFilter === category 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-500' 
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCandidates.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Verified Talent Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-light">Try adjusting your skill filters or search terms for the SkillChain Oracle.</p>
          </div>
        )}

      </main>

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <footer className="py-20 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <Shield className="text-cyan-500 w-6 h-6" />
            <span className="text-lg font-black text-white uppercase">SkillChain AI</span>
          </div>
          <div className="flex gap-10 text-xs font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Oracle Status</a>
          </div>
          <p className="text-slate-600 font-mono text-[10px]">VERIFIED BY PROTOCOL V1.0.4</p>
        </div>
      </footer>
    </div>
  );
}