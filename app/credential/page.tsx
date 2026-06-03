"use client";
import React, { Suspense } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Award, 
  Zap, 
  Globe, 
  Layers, 
  Cpu,
  ChevronRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// --- Components ---

const Navbar = () => (
  <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white uppercase font-sans">
            SKILLCHAIN<span className="text-cyan-400 font-light">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Network Live</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

function CredentialContent() {
 const router = useRouter();
    const searchParams = useSearchParams();

  // Extracting data from URL or using defaults for demo
  const username = searchParams.get('user') || 'dev_anonymous';
  const score = searchParams.get('score') || '89';
  const tier = searchParams.get('tier') || 'Senior Systems Architect';
  const hash = searchParams.get('hash') || '0x74f2...a92d11e4b8321098c4f';
  const wallet = searchParams.get('wallet') || '0x4f39...2e1a';
  const timestamp = new Date().toISOString().split('T')[0];

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Branding */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/5 border border-cyan-400/20 rounded-full">
            <Shield size={14} /> Official On-Chain Attestation
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Skill Certificate</h1>
        </motion.div>

        {/* Main Credential Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
          
          <div className="relative bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-3xl">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Side: Identity */}
              <div className="md:col-span-8 p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/5">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center border border-white/10 shadow-inner">
                    <Award className="text-cyan-400 w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">Holder Identity</p>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">@{username}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">Verified Skill Tier</p>
                    <p className="text-xl font-bold text-cyan-400 leading-tight">{tier}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">Overall Score</p>
                    <p className="text-3xl font-black text-white">{score}<span className="text-sm text-slate-500 ml-1">/100</span></p>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/5 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network</span>
                    <span className="flex items-center gap-2 text-xs font-mono text-white">
                      <Globe size={12} className="text-purple-500" /> Polygon Mainnet
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</span>
                    <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                      Verified
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Timestamp</span>
                    <span className="text-xs font-mono text-slate-300">{timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: QR & Security */}
              <div className="md:col-span-4 p-10 md:p-14 bg-white/[0.02] flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-3xl mb-8 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                  <QRCodeSVG 
                    value={`skillchain-verify-${hash}`}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Cryptographic Hash</p>
                  <p className="text-[10px] font-mono text-cyan-500/70 break-all leading-relaxed max-w-[140px] mx-auto uppercase">
                    {hash}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Meta Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-lg text-slate-400"><Layers size={18}/></div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signer Wallet</p>
                <p className="text-xs font-mono text-white">{wallet}</p>
              </div>
            </div>
            <Zap size={16} className="text-cyan-500" />
          </div>
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-lg text-slate-400"><Cpu size={18}/></div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Version</p>
                <p className="text-xs font-mono text-white">SkillChain AI v1.0.4-Lighthouse</p>
              </div>
            </div>
            <Shield size={16} className="text-cyan-500" />
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
  onClick={() => router.push("/verify")}
  className="px-12 py-5 bg-cyan-500 text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all flex items-center gap-2"
>
  Verify Credential <ChevronRight size={20} />
</button>
          <button className="px-12 py-5 bg-slate-900 border border-white/10 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
            Download PDF
          </button>
        </motion.div>

        <p className="mt-12 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">
          Secured by Polygon Cryptographic Zero-Knowledge Proofs
        </p>

      </div> 
    </main>
  );
}

export default function CredentialPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <Navbar />
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500" />
        </div>
      }>
        <CredentialContent />
      </Suspense>

      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}