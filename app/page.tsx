'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Moon, 
  Sun, 
  Code, 
  Palette, 
  Globe, 
  Cpu, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Settings,
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  Info,
  CheckCircle2,
  Upload,
  Lock,
  LogIn,
  LogOut,
  FileDown
} from 'lucide-react';

const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block ml-2">
    <Info className="w-3.5 h-3.5 text-zinc-400 cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-zinc-900 text-white text-[10px] rounded-lg shadow-xl z-50 text-center leading-tight">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-900" />
    </div>
  </div>
);

const initialProjects = [
  {
    id: 1,
    title: 'منصة التجارة الإلكترونية',
    description: 'تطبيق متكامل للتجارة الإلكترونية مع نظام دفع وسلة تسوق ذكية وتصميم عصري متجاوب.',
    image: 'https://picsum.photos/seed/shop/800/600',
    link: '#',
    tags: ['Next.js', 'Tailwind', 'Stripe']
  },
  {
    id: 2,
    title: 'تطبيق إدارة المهام',
    description: 'نظام لإدارة المهام اليومية مع تنبيهات ذكية وتزامن سحابي وواجهة مستخدم بديهية.',
    image: 'https://picsum.photos/seed/task/800/600',
    link: '#',
    tags: ['React', 'Firebase', 'Framer Motion']
  },
  {
    id: 3,
    title: 'لوحة تحكم البيانات',
    description: 'لوحة تحكم تفاعلية لعرض البيانات والإحصائيات بشكل مبسط باستخدام الرسوم البيانية.',
    image: 'https://picsum.photos/seed/dashboard/800/600',
    link: '#',
    tags: ['D3.js', 'TypeScript', 'Chart.js']
  }
];

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [profile, setProfile] = useState({
    name: 'محمود حبيب',
    brand: 'صمم موقعك في 48 ساعه',
    contactText: 'تواصل معي',
    viewWorkText: 'رؤية أعمالي',
    whatsappLink: 'https://wa.me/201234567890',
    avatar: 'https://picsum.photos/seed/avatar/400/400',
    resumeUrl: '',
    resumeText: 'تحميل السيرة الذاتية'
  });

  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: 'https://picsum.photos/seed/new/800/600',
    link: '#',
    tags: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isEditing) {
          setEditingProject({ ...editingProject, image: base64String });
        } else {
          setNewProject({ ...newProject, image: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        setShowControlPanel(false);
      }, 1500);
    }, 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'n.ahmed40000000000@gmail.com' && loginForm.password === 'mahmoud1234') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
              {profile.name.charAt(0)}
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              {profile.name}
            </span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <a href="#home" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">الرئيسية</a>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">أعمالي</a>
            </div>
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
            <button 
              onClick={() => setShowControlPanel(true)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
              aria-label="Open Control Panel"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-44 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:text-right text-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                متاح للمشاريع الجديدة
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]">
                نصمم مستقبلك <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_auto] animate-gradient">الرقمي باحترافية</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed lg:ml-0 mx-auto">
                {profile.brand}. نجمع بين دقة التنفيذ وجمال التصميم لنقدم لك موقعاً يعكس قوة علامتك التجارية.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
                <motion.a
                  href={profile.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  {profile.contactText}
                  <ArrowUpRight className="w-5 h-5" />
                </motion.a>
                
                <motion.button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold shadow-xl shadow-zinc-200/50 dark:shadow-none transition-all flex items-center justify-center gap-3 text-lg"
                >
                  {profile.viewWorkText}
                  <ExternalLink className="w-5 h-5" />
                </motion.button>

                {profile.resumeUrl && (
                  <motion.a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    {profile.resumeText}
                    <FileDown className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[3rem] rotate-6 blur-2xl" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl">
                <Image 
                  src={profile.avatar} 
                  alt={profile.name} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800 animate-bounce">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 flex flex-col items-center gap-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">اكتشف المزيد</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-zinc-200 dark:border-zinc-800 rounded-full flex justify-center p-1"
            >
              <div className="w-1 h-2 bg-blue-600 rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Professional Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">أعمالي المختارة</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              مجموعة من المشاريع التي قمت بتطويرها مؤخراً، تعكس شغفي بالجودة والابتكار.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button 
                      onClick={() => {
                        if (project.link && project.link !== '#') {
                          window.open(project.link, '_blank', 'noopener,noreferrer');
                        } else {
                          setSelectedProject(project);
                        }
                      }}
                      className="w-full py-3 bg-white text-zinc-950 rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      عرض المشروع
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right">
            <p className="text-zinc-500 dark:text-zinc-400">© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Github className="w-6 h-6" /></a>
            <a href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-zinc-400 hover:text-blue-600 transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>

      {/* Control Panel Overlay */}
      <AnimatePresence>
        {showControlPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowControlPanel(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-zinc-950 z-[70] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg text-white">
                    {isLoggedIn ? <Settings className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <h2 className="text-xl font-bold">{isLoggedIn ? 'إدارة الموقع' : 'تسجيل الدخول'}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {isLoggedIn && (
                    <button 
                      onClick={handleLogout}
                      className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500"
                      title="تسجيل الخروج"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={() => setShowControlPanel(false)}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {!isLoggedIn ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <div className="w-full max-w-sm space-y-8">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold">منطقة محمية</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">يرجى إدخال بيانات الاعتماد للوصول إلى لوحة التحكم</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase">البريد الإلكتروني</label>
                        <input 
                          type="email" 
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase">كلمة المرور</label>
                        <input 
                          type="password" 
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="••••••••"
                        />
                      </div>

                      {loginError && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs font-bold text-center"
                        >
                          {loginError}
                        </motion.p>
                      )}

                      <button 
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                      >
                        دخول
                        <LogIn className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                    <button 
                      onClick={() => setActiveTab('general')}
                      className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'general' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400'}`}
                    >
                      الإعدادات العامة
                    </button>
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'projects' ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400'}`}
                    >
                      إدارة الأعمال
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'general' ? (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-xs font-bold text-zinc-500 uppercase">الاسم الشخصي</label>
                            <Tooltip text="الاسم الذي سيظهر في أعلى الموقع وفي قسم الترحيب." />
                          </div>
                          <input 
                            type="text" 
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-xs font-bold text-zinc-500 uppercase">العلامة التجارية</label>
                            <Tooltip text="وصف قصير لعملك يظهر تحت اسمك في قسم الترحيب." />
                          </div>
                          <input 
                            type="text" 
                            value={profile.brand}
                            onChange={(e) => setProfile({...profile, brand: e.target.value})}
                            className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-xs font-bold text-zinc-500 uppercase">رابط واتساب</label>
                            <Tooltip text="الرابط الذي سيتم توجيه المستخدم إليه عند الضغط على زر التواصل." />
                          </div>
                          <input 
                            type="text" 
                            value={profile.whatsappLink}
                            onChange={(e) => setProfile({...profile, whatsappLink: e.target.value})}
                            className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label className="text-xs font-bold text-zinc-500 uppercase">رابط السيرة الذاتية (PDF)</label>
                              <Tooltip text="رابط ملف السيرة الذاتية الخاص بك (Google Drive, Dropbox, إلخ)." />
                            </div>
                            <input 
                              type="text" 
                              placeholder="https://..."
                              value={profile.resumeUrl}
                              onChange={(e) => setProfile({...profile, resumeUrl: e.target.value})}
                              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <label className="text-xs font-bold text-zinc-500 uppercase">نص زر التحميل</label>
                              <Tooltip text="النص الذي يظهر على زر تحميل السيرة الذاتية." />
                            </div>
                            <input 
                              type="text" 
                              value={profile.resumeText}
                              onChange={(e) => setProfile({...profile, resumeText: e.target.value})}
                              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1">
                            الصورة الشخصية
                            <Tooltip text="صورتك التي تظهر في قسم الترحيب." />
                          </label>
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
                              <Image src={profile.avatar} alt="Avatar" fill className="object-cover" />
                            </div>
                            <button 
                              onClick={() => document.getElementById('avatar-upload')?.click()}
                              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white rounded-xl text-sm font-bold transition-all"
                            >
                              تغيير الصورة
                            </button>
                            <input 
                              id="avatar-upload"
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setProfile({...profile, avatar: reader.result as string});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Add/Edit Project */}
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                          <h3 className="font-bold mb-4 flex items-center gap-2">
                            {editingProject ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                            <Tooltip text={editingProject ? "قم بتعديل بيانات المشروع المختار." : "أضف مشروعاً جديداً لمعرض أعمالك."} />
                          </h3>
                          <div className="grid gap-4">
                            <input 
                              type="text" 
                              placeholder="عنوان المشروع"
                              value={editingProject ? editingProject.title : newProject.title}
                              onChange={(e) => editingProject ? setEditingProject({...editingProject, title: e.target.value}) : setNewProject({...newProject, title: e.target.value})}
                              className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm"
                            />
                            <textarea 
                              placeholder="وصف المشروع"
                              value={editingProject ? editingProject.description : newProject.description}
                              onChange={(e) => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})}
                              className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm h-20"
                            />
                            
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1">
                                صورة المشروع
                                <Tooltip text="يمكنك رفع صورة من جهازك أو سحبها هنا." />
                              </label>
                              <div 
                                className="relative group h-32 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-2 bg-white dark:bg-zinc-950 cursor-pointer"
                                onClick={() => document.getElementById('project-image-upload')?.click()}
                              >
                                {(editingProject ? editingProject.image : newProject.image) ? (
                                  <>
                                    <Image 
                                      src={editingProject ? editingProject.image : newProject.image} 
                                      alt="Preview" 
                                      fill 
                                      className="object-cover opacity-40 group-hover:opacity-20 transition-opacity" 
                                    />
                                    <div className="relative z-10 flex flex-col items-center gap-1">
                                      <Upload className="w-6 h-6 text-blue-600" />
                                      <span className="text-[10px] font-bold">تغيير الصورة</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-8 h-8 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-[10px] font-bold text-zinc-500">اسحب الصورة هنا أو اضغط للرفع</span>
                                  </>
                                )}
                                <input 
                                  id="project-image-upload"
                                  type="file" 
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(e, !!editingProject)}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                placeholder="الوسوم (مفصولة بفاصلة)"
                                value={editingProject ? (Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags) : newProject.tags}
                                onChange={(e) => editingProject ? setEditingProject({...editingProject, tags: e.target.value}) : setNewProject({...newProject, tags: e.target.value})}
                                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm"
                              />
                              <input 
                                type="text" 
                                placeholder="رابط المشروع (مثال: https://...)"
                                value={editingProject ? editingProject.link : newProject.link}
                                onChange={(e) => editingProject ? setEditingProject({...editingProject, link: e.target.value}) : setNewProject({...newProject, link: e.target.value})}
                                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  if (editingProject) {
                                    setProjects(projects.map(p => p.id === editingProject.id ? {
                                      ...editingProject,
                                      tags: typeof editingProject.tags === 'string' ? editingProject.tags.split(',').map((t: string) => t.trim()) : editingProject.tags
                                    } : p));
                                    setEditingProject(null);
                                  } else {
                                    if (!newProject.title) return;
                                    setProjects([...projects, {
                                      ...newProject,
                                      id: Date.now(),
                                      tags: newProject.tags.split(',').map(t => t.trim())
                                    }]);
                                    setNewProject({ title: '', description: '', image: 'https://picsum.photos/seed/new/800/600', link: '#', tags: '' });
                                  }
                                }}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                              >
                                {editingProject ? 'تحديث المشروع' : 'إضافة المشروع'}
                              </button>
                              {editingProject && (
                                <button 
                                  onClick={() => setEditingProject(null)}
                                  className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 rounded-xl font-bold text-sm"
                                >
                                  إلغاء
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Project List */}
                        <div className="space-y-4">
                          <h3 className="font-bold text-zinc-500 uppercase text-xs tracking-widest">المشاريع الحالية</h3>
                          {projects.map((project) => (
                            <div key={project.id} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-sm truncate">{project.title}</h4>
                                  <p className="text-xs text-zinc-500 truncate">{project.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingProject(project);
                                  }}
                                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => {
                                    setProjects(projects.filter(p => p.id !== project.id));
                                  }}
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
                    <button 
                      onClick={handleSave}
                      disabled={saveStatus !== 'idle'}
                      className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                        saveStatus === 'saved' 
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                          : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                      }`}
                    >
                      {saveStatus === 'idle' && (
                        <>
                          حفظ وإغلاق
                          <Save className="w-5 h-5" />
                        </>
                      )}
                      {saveStatus === 'saving' && (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      {saveStatus === 'saved' && (
                        <>
                          تم الحفظ بنجاح!
                          <CheckCircle2 className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string) => (
                    <span key={tag} className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{selectedProject.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {selectedProject.link && selectedProject.link !== '#' && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all"
                  >
                    زيارة الموقع المباشر
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
