"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Zap, 
  ChevronRight, 
  Layers, 
  Award, 
  Globe,
  Users,
  X,
  Menu,
  Terminal,
  Search
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

// --- Types ---

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
}

interface SkillResult {
  subject: string;
  score: number;
  fullMark: number;
}

interface AIAssessment {
  executiveSummary: string;
  strengths: string[];
  weaknesses: string[];
  seniorityLevel: string;
  recommendedRoles: string[];
  confidenceScore: number;
}

interface ValidationData {
  username: string;
  avatar: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  scores: SkillResult[];
  overallScore: number;
  aiAssessment: AIAssessment;
}

// --- Logic Helpers ---

const KEYWORDS = {
  react: ["react", "nextjs", "frontend", "tailwind", "ui", "ux", "remix", "vue"],
  node: ["node", "express", "backend", "fastify", "nest", "api", "rest-api"],
  blockchain: ["solidity", "web3", "blockchain", "ethereum", "smart-contract", "ethers", "defi"],
  ai: ["ai", "ml", "tensorflow", "pytorch", "openai", "llm", "machine-learning", "nlp"],
  systemDesign: ["architecture", "distributed", "kubernetes", "docker", "infra", "scaling", "redis"]
};

// --- Main Page Component ---

export default function ValidatePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults] = useState<ValidationData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const loadingMessages = [
    "Pinging GitHub API...",
    "Indexing repository metadata...",
    "Local heuristic classification...",
    "Synchronizing with Gemini AI Agent...",
    "Generating cryptographic proof..."
  ];

  const calculateLocalScores = (repos: GitHubRepo[], followers: number): SkillResult[] => {
    const raw = { react: 0, node: 0, blockchain: 0, ai: 0, systemDesign: 0 };
    repos.forEach(repo => {
      const content = `${repo.name} ${repo.description ?? ''} ${repo.topics.join(' ')}`.toLowerCase();
      const lang = (repo.language ?? '').toLowerCase();
      if (KEYWORDS.react.some(k => content.includes(k)) || ["typescript", "javascript"].includes(lang)) raw.react += 12;
      if (KEYWORDS.node.some(k => content.includes(k))) raw.node += 15;
      if (KEYWORDS.blockchain.some(k => content.includes(k)) || lang === "solidity") raw.blockchain += 25;
      if (KEYWORDS.ai.some(k => content.includes(k)) || lang === "python") raw.ai += 20;
      if (KEYWORDS.systemDesign.some(k => content.includes(k))) raw.systemDesign += 15;
    });
    const inf = Math.min(followers / 15, 10);
    return [
      { subject: 'React', score: Math.min(Math.max(30, raw.react + inf), 98), fullMark: 100 },
      { subject: 'Node.js', score: Math.min(Math.max(25, raw.node + inf), 96), fullMark: 100 },
      { subject: 'Blockchain', score: Math.min(Math.max(15, raw.blockchain + inf), 97), fullMark: 100 },
      { subject: 'AI/ML', score: Math.min(Math.max(15, raw.ai + inf), 95), fullMark: 100 },
      { subject: 'System Design', score: Math.min(Math.max(20, raw.systemDesign + inf), 94), fullMark: 100 },
    ];
  };

  const getGeminiAssessment = async (repos: GitHubRepo[], userData: any, scores: SkillResult[]): Promise<AIAssessment> => {
    const repoContext = repos.slice(0, 12).map(r => `- ${r.name}: ${r.description || 'No description'} (Stars: ${r.stargazers_count})`).join('\n');
    
    const prompt = `Analyze this GitHub profile for a Web3 recruiting platform. 
    User: ${userData.login}
    Stats: ${userData.followers} followers, ${userData.public_repos} repos.
    Recent Activity:\n${repoContext}
    Current Metric Scores: ${JSON.stringify(scores)}

    Return a strictly valid JSON object with:
    "executiveSummary": "A 3-line maximum high-impact summary of their engineering persona.",
    "strengths": ["string", "string", "string"],
    "weaknesses": ["string", "string"],
    "seniorityLevel": "Junior|Mid|Senior|Staff|Principal",
    "recommendedRoles": ["string", "string"],
    "confidenceScore": 1-100`;

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log("Gemini Key:", API_KEY);
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!res.ok) {
  const errorText = await res.text();
  console.log("GEMINI FULL ERROR:", errorText);
  throw new Error(errorText);
}
    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || "";
    return JSON.parse(jsonStr);
  };

  const startAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setStatus('loading');
    setLoadingStep(0);
    setErrorMsg('');

    try {
      setLoadingStep(0);
      const uRes = await fetch(`https://api.github.com/users/${username}`);
      if (!uRes.ok) throw new Error("User not found or GitHub Rate Limit reached.");
      const uData = await uRes.json();

      setLoadingStep(1);
      const rRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=40&sort=updated`);
      const repos: GitHubRepo[] = await rRes.json();

      setLoadingStep(2);
      const scores = calculateLocalScores(repos, uData.followers);

      setLoadingStep(3);
      const ai = await getGeminiAssessment(repos, uData, scores);

      setLoadingStep(4);
      setResults({
        username: uData.login,
        avatar: uData.avatar_url,
        followers: uData.followers,
        publicRepos: uData.public_repos,
        totalStars: repos.reduce((a, r) => a + r.stargazers_count, 0),
        scores,
        overallScore: Math.floor(scores.reduce((a, b) => a + b.score, 0) / 5),
        aiAssessment: ai
      });
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  const handleMint = () => {
    if (!results) return;
    const hash = '0x' + Math.random().toString(16).slice(2, 42);
    const params = new URLSearchParams({
      user: results.username,
      score: results.overallScore.toString(),
      tier: results.aiAssessment.seniorityLevel,
      hash
    });
    router.push(`/credential?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      <nav className="fixed w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 h-20 flex items-center px-8">
        <div className="flex items-center gap-3">
          <Shield className="text-cyan-500 w-8 h-8" />
          <span className="text-xl font-black text-white tracking-tighter uppercase">SkillChain<span className="text-cyan-500">AI</span></span>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto text-center mt-20">
              {status === 'loading' ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6" />
                  <p className="font-mono text-cyan-400 uppercase tracking-widest text-sm">{loadingMessages[loadingStep]}</p>
                </div>
              ) : (
                <>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-8">
                    Deep Neural Profile Audit
                  </div>
                  <h1 className="text-5xl font-black text-white mb-6 leading-tight">MINT YOUR<br /><span className="text-cyan-500">EXPERTISE.</span></h1>
                  <form onSubmit={startAnalysis} className="relative mt-10">
                    <input 
                      type="text" placeholder="github_username" value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-500 transition-all font-mono text-center text-xl"
                    />
                    <button className="w-full mt-4 bg-white text-slate-950 py-5 rounded-2xl font-black text-lg hover:bg-cyan-400 transition-all uppercase flex items-center justify-center gap-2">
                      Initialize Scan <Search size={20} />
                    </button>
                    {errorMsg && <p className="mt-4 text-red-500 font-mono text-xs">{errorMsg}</p>}
                  </form>
                </>
              )}
            </motion.div>
          ) : (
            results && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Metadata & Chart */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-slate-900/40 border border-white/10 p-8 rounded-[32px] backdrop-blur-md relative overflow-hidden">
                    <div className="flex items-center gap-6 mb-8">
                      <img src={results.avatar} className="w-20 h-20 rounded-2xl border border-cyan-500/30" />
                      <div>
                        <h2 className="text-3xl font-black text-white">@{results.username}</h2>
                        <p className="text-cyan-500 font-mono text-sm uppercase tracking-widest">{results.aiAssessment.seniorityLevel} Developer</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Stars Gained</span>
                        <span className="text-xl font-mono text-white">{results.totalStars}</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Followers</span>
                        <span className="text-xl font-mono text-white">{results.followers}</span>
                      </div>
                    </div>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={results.scores}>
                          <PolarGrid stroke="#1e293b" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                          <Radar dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Right: AI Premium Assessment */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-slate-900/40 border border-cyan-500/20 p-10 rounded-[40px] backdrop-blur-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-10">
                      <Terminal className="text-cyan-500/10 w-32 h-32" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.4em]">Gemini AI Intelligence Taskforce</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-6 italic leading-relaxed">
                        "{results.aiAssessment.executiveSummary}"
                      </h3>

                      <div className="grid md:grid-cols-2 gap-10 border-y border-white/5 py-10 my-10">
                        <div>
                          <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4">Core Strengths</p>
                          <ul className="space-y-3">
                            {results.aiAssessment.strengths.map(s => (
                              <li key={s} className="flex items-center gap-3 text-sm text-slate-200">
                                <Zap size={14} className="text-cyan-500" /> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Growth Areas</p>
                          <ul className="space-y-3">
                            {results.aiAssessment.weaknesses.map(w => (
                              <li key={w} className="flex items-center gap-3 text-sm text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" /> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Recommended Path</p>
                          <p className="text-white font-bold">{results.aiAssessment.recommendedRoles.join(" / ")}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">IQ Confidence</p>
                          <p className="text-cyan-400 font-black text-2xl">{results.aiAssessment.confidenceScore}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button onClick={handleMint} className="bg-white text-slate-950 p-8 rounded-[32px] font-black text-xl hover:bg-cyan-400 transition-all flex flex-col items-center gap-4 group">
                      <Shield className="w-8 h-8 group-hover:scale-110 transition-transform" />
                      MINT PROOF OF WORK
                    </button>
                    <button onClick={() => setStatus('idle')} className="bg-slate-900 border border-white/5 text-white p-8 rounded-[32px] font-bold text-xl hover:bg-slate-800 transition-all flex flex-col items-center gap-4 group">
                      <Menu className="w-8 h-8 text-slate-500 group-hover:text-white" />
                      RE-INITIALIZE
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950" />
    </div>
  );
}