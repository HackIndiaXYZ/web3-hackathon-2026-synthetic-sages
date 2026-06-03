"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Zap, 
  Globe, 
  ChevronRight, 
  Layers, 
  Award, 
  Users,
  Menu,
  X 
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              SKILLCHAIN<span className="text-cyan-400 font-light">AI</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-10">
              {['Protocol', 'Validation', 'Ecosystem', 'Docs'].map((item) => (
                <a key={item} href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium tracking-wide">
                  {item}
                </a>
              ))}
              <Link
  href="/recruiter"
  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-bold"
>
  Recruiter Portal
</Link>

<Link
  href="/validate"
  className="bg-white text-slate-950 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-cyan-400 transition-all duration-300"
>
  Launch App
</Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-900 border-b border-white/10 px-4 py-6 space-y-4"
          >
            {['Protocol', 'Validation', 'Ecosystem', 'Docs'].map((item) => (
  <a key={item} href="#" className="text-slate-300 block text-lg font-medium">
    {item}
  </a>
))}

<Link
  href="/recruiter"
  className="block w-full text-center border border-cyan-500 text-cyan-400 py-4 rounded-xl font-bold"
>
  Recruiter Portal
</Link>

<Link
  href="/validate"
  className="block w-full text-center bg-cyan-500 text-slate-950 py-4 rounded-xl font-bold"
>
  Launch App
</Link>
            
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative group p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
      <Icon className="text-cyan-400 w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-28 md:pt-44 pb-20 md:pb-32 overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[140px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/5 border border-cyan-400/20 rounded-full"
              >
                <Zap size={14} className="fill-cyan-400" />
                Next Generation Talent Infrastructure
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-tight"
              >
                VERIFY SKILLS<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                  WITHOUT TRUST.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-light leading-relaxed"
              >
                The decentralized AI protocol for autonomous technical validation. 
                Move your reputation on-chain with zero-knowledge skill proofs.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5"
              >
                <button className="group w-full sm:w-auto px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5">
                  Start Validation <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 text-white font-bold rounded-2xl border border-white/10 hover:bg-slate-800 transition-all">
                  Read Protocol
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">The Future of Identity</h2>
                <p className="text-slate-400 text-lg">SkillChain AI replaces resumes with cryptographic proof. Our engine analyzes code, logic, and contribution history to build your digital twin.</p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  NETWORK ACTIVE: 42.1k NODES
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Cpu}
                title="AI Evaluators"
                description="LLM-driven technical agents conduct deep-dive interviews and architectural reviews in 40+ languages."
                delay={0.1}
              />
              <FeatureCard 
                icon={Shield}
                title="ZK-Reputation"
                description="Privacy-first validation. Prove you're a Senior Engineer without revealing your identity or specific employer."
                delay={0.2}
              />
              <FeatureCard 
                icon={Globe}
                title="Cross-Chain ID"
                description="Portable professional credentials that live on Ethereum, Polygon, and Arbitrum. One profile, total mobility."
                delay={0.3}
              />
              <FeatureCard 
                icon={Layers}
                title="Skill Staking"
                description="Secure your expertise by staking $SKILL tokens. Build high-integrity reputation silos in specialized domains."
                delay={0.4}
              />
              <FeatureCard 
                icon={Users}
                title="DAO Matching"
                description="Automated talent routing for decentralized organizations based on verifiable technical tiers."
                delay={0.5}
              />
              <FeatureCard 
                icon={Award}
                title="Proof of Work"
                description="Direct verification of on-chain contributions and GitHub history translated into human-readable metrics."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -inset-10 bg-blue-500/20 blur-[100px] rounded-full opacity-50" />
                <div className="relative aspect-square bg-slate-950 border border-white/10 rounded-[40px] p-8 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-cyan-500">DECRYPTING_SIGNAL...</div>
                      <div className="text-xl font-bold text-white tracking-tight">Validation Engine</div>
                    </div>
                    <Cpu className="text-cyan-500 animate-spin-slow" />
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-cyan-500' : 'bg-slate-700'}`} />
                        <div className="flex-1 space-y-2">
                          <div className={`h-2 rounded-full bg-slate-800 ${i === 1 ? 'w-3/4' : 'w-1/2'}`} />
                          <div className={`h-2 rounded-full bg-slate-800 ${i === 1 ? 'w-1/2' : 'w-1/3'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="text-cyan-400" />
                      <span className="font-bold text-white">Tier 1 Credential</span>
                    </div>
                    <span className="text-cyan-400 font-mono text-xs">MINTED</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">Three Steps to Mastery</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-xl">1</div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3">Ingest Metadata</h4>
                      <p className="text-slate-400 leading-relaxed">Connect your GitHub, GitLab, and wallet. Our AI constructs a multi-dimensional map of your technical journey.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black text-xl">2</div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3">AI Stress-Test</h4>
                      <p className="text-slate-400 leading-relaxed">Engage with specific, LLM-led technical prompts that adapt to your answers in real-time to find your true ceiling.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black text-xl">3</div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3">On-Chain Mint</h4>
                      <p className="text-slate-400 leading-relaxed">Your results are hashed and minted as a non-transferable Soulbound Token, instantly readable by any partner DAO.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 p-12 md:p-24 text-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">JOIN THE PROTOCOL.</h2>
                <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto font-light">
                  Early access participants earn $SKILL governance tokens for every successful validation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
  href="/recruiter"
  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-bold"
>
  Recruiter Portal
</Link>
                  <button className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-transform">
                    Connect Wallet
                  </button>
                  <button className="px-12 py-5 bg-slate-950 text-white font-black rounded-2xl hover:bg-slate-900 transition-colors">
                    Join Ecosystem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-cyan-500 w-8 h-8" />
                <span className="text-2xl font-bold text-white tracking-tighter">SKILLCHAIN AI</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                Empowering the global workforce with autonomous, unbiased, and cryptographic skill validation systems.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Protocol</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Validation Nodes</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Governance</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Tokenomics</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Ecosystem</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <p className="text-slate-600 text-xs font-mono">
              © 2025 SKILLCHAIN AI FOUNDATION. RUNNING ON MAINNET.
            </p>
            <div className="flex gap-8">
              <Globe className="text-slate-600 hover:text-white cursor-pointer w-5 h-5 transition-colors" />
              <Shield className="text-slate-600 hover:text-white cursor-pointer w-5 h-5 transition-colors" />
              <Layers className="text-slate-600 hover:text-white cursor-pointer w-5 h-5 transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}