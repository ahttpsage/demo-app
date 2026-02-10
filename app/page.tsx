"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const services = [
    {
      title: "Quantitative Analysis",
      description: "Advanced statistical modeling, algorithmic trading strategies, and risk management solutions using cutting-edge mathematical techniques.",
      icon: "📊"
    },
    {
      title: "AI & Machine Learning",
      description: "Custom AI solutions, deep learning models, NLP systems, and computer vision applications tailored to your business needs.",
      icon: "🤖"
    },
    {
      title: "Data Science",
      description: "End-to-end data pipelines, predictive analytics, and insights extraction from complex datasets using modern ML frameworks.",
      icon: "📈"
    },
    {
      title: "Financial Engineering",
      description: "Derivative pricing, portfolio optimization, and quantitative risk assessment with state-of-the-art numerical methods.",
      icon: "💹"
    },
    {
      title: "Gen AI Solutions",
      description: "LLM integration, RAG systems, autonomous agents, and custom GPT applications for enterprise automation.",
      icon: "✨"
    },
    {
      title: "Consulting",
      description: "Strategic guidance on AI adoption, quant strategy development, and technical architecture for scalable solutions.",
      icon: "💡"
    }
  ];

  const skills = [
    "Python", "TensorFlow", "PyTorch", "NumPy", "Pandas", 
    "Scikit-learn", "R", "SQL", "C++", "MATLAB",
    "Deep Learning", "NLP", "Computer Vision", "Time Series",
    "Statistical Modeling", "Stochastic Calculus", "Options Pricing",
    "Risk Management", "Algorithmic Trading", "Backtesting",
    "LangChain", "OpenAI API", "Transformers", "RAG Systems"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-slate-950/70 border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Priyatosh
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "services", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all ${
                    activeSection === section 
                      ? "text-cyan-400" 
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center z-10">
          <div className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Priyatosh
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Quantitative Analyst & AI Engineer
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Bridging the gap between mathematics, finance, and artificial intelligence to build intelligent systems that drive innovation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => scrollToSection("services")}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Explore Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 md:p-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I specialize in the intersection of quantitative finance and artificial intelligence, developing sophisticated models and algorithms that solve complex problems. With expertise in machine learning, statistical modeling, and financial engineering, I create data-driven solutions that deliver measurable results.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My work spans from building algorithmic trading systems and risk management frameworks to developing cutting-edge Gen AI applications and large language model integrations. I'm passionate about leveraging mathematics and AI to unlock insights from data and automate intelligent decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="px-5 py-2 bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-full text-gray-300 hover:border-cyan-500 hover:text-cyan-400 transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 md:p-12">
            <p className="text-gray-300 text-center text-lg mb-8">
              Interested in working together? Let's discuss how we can build something amazing.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:priyatosh@example.com"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-center"
              >
                📧 Email Me
              </a>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-cyan-500/20">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2026 Priyatosh. All rights reserved.</p>
          <a 
            href="/admin/login" 
            className="inline-block mt-3 text-sm text-gray-500 hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100"
          >
            Admin Portal
          </a>
        </div>
      </footer>
    </div>
  );
}
