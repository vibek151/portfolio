import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// import Signature from "./components/Signature";
import Intro from "./components/Intro";

import "./App.css";

const pages = [
  {
    id: "01",
    eyebrow: "SOFTWARE BUILDER • FREELANCER",
    title: "VIBEK'S",
    accent: "WORLD",
    description:
      "A developer portfolio built around real software, real systems, and the things I'm building.",
  },
  {
    id: "02",
    eyebrow: "WHAT I DO",
    title: "I BUILD",
    accent: "SYSTEMS.",
    description:
      "I use modern web technologies and AI-assisted development to turn ideas into working software.",
  },
  {
    id: "03",
    eyebrow: "SYSTEM ONLINE",
    title: "EDUCATION",
    accent: "MANAGEMENT",
    third: "SYSTEM",
    description:
      "A real-world institute management platform designed to bring core administrative workflows into one system.",
  },
  {
    id: "04",
    eyebrow: "ENGINEERING",
    title: "HOW I",
    accent: "BUILD.",
    description:
      "The technologies, architecture and engineering decisions behind the systems I build.",
  },
  {
    id: "05",
    eyebrow: "CURRENTLY BUILDING",
    title: "IN THE",
    accent: "WORKSHOP.",
    description:
      "The education management system is still evolving. I keep improving the product instead of treating it as a finished demo.",
  },
];

const modules = [
  {
    number: "01",
    name: "ADMISSIONS",
    detail: "Student registration & records",
  },
  {
    number: "02",
    name: "FEES",
    detail: "Fee collection & management",
  },
  {
    number: "03",
    name: "BATCHES",
    detail: "Course & batch management",
  },
  {
    number: "04",
    name: "CERTIFICATES",
    detail: "Certificate issuing workflow",
  },
  {
    number: "05",
    name: "PDF ENGINE",
    detail: "Automatic document generation",
  },
  {
    number: "06",
    name: "EMAIL",
    detail: "Automated event notifications",
  },
];

const knowledge = [
  {
    keywords: ["project", "projects", "built", "build"],
    answer:
      "My main real-world project is an Education Management System for handling institute administration and student workflows.",
  },
  {
    keywords: ["education", "management", "system", "institute"],
    answer:
      "The Education Management System brings admissions, student records, fees, courses, batches, certificates, PDF generation and email notifications into one platform.",
  },
  {
    keywords: ["django", "python", "backend"],
    answer:
      "I use Python and Django for backend development and building the REST API layer.",
  },
  {
    keywords: ["react", "frontend", "javascript"],
    answer:
      "I use React for the frontend and JavaScript for interactive application behaviour.",
  },
  {
    keywords: ["postgresql", "database", "db"],
    answer:
      "PostgreSQL is used as the database for the Education Management System.",
  },
  {
    keywords: ["api", "rest", "rest api"],
    answer:
      "The system uses REST APIs to connect the React frontend with the Django backend.",
  },
  {
    keywords: ["certificate", "certificates"],
    answer:
      "The system includes certificate issuing workflows and automatic document generation.",
  },
  {
    keywords: ["pdf", "document"],
    answer:
      "The system automatically generates PDF documents as part of its workflow.",
  },
  {
    keywords: ["email", "notification"],
    answer:
      "Email notifications are triggered for important events such as admissions, certificates and fee-related workflows.",
  },
  {
    keywords: ["multi tenant", "multitenant", "franchise", "tenant"],
    answer:
      "The system is designed with multi-tenant data isolation so franchise-level users work with their own data while the super-admin can access the broader system.",
  },
  {
    keywords: ["current", "currently", "working", "now"],
    answer:
      "I'm currently continuing development of the Education Management System, improving its workflows, performance and overall reliability.",
  },
  {
    keywords: ["skill", "skills", "technology", "technologies", "stack"],
    answer:
      "My current stack includes Python, Django, React, JavaScript, HTML, CSS, PostgreSQL and REST APIs.",
  },
  {
    keywords: ["contact", "hire", "freelance", "job"],
    answer:
      "The portfolio is designed to showcase my real software work for freelance opportunities and software engineering roles.",
  },
];

function findAnswer(question) {
  const normalized = question.toLowerCase();

  let bestMatch = null;
  let bestScore = 0;

  knowledge.forEach((item) => {
    const score = item.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item.answer;
    }
  });

  if (bestMatch) return bestMatch;

  return "I don't have that detail in my portfolio knowledge yet. Try asking about my projects, Education Management System, Django, React, PostgreSQL, REST APIs, current work or skills.";
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [page, setPage] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask me anything about Vibek."
  );
  
  

  const worldRef = useRef(null);
  const backgroundRef = useRef(null);
  const lightRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideChat = event.target.closest(
        ".floating-chat-window, .floating-chat-button"
      );

      if (!clickedInsideChat) {
        setChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const changePage = (nextPage) => {
    if (nextPage === page || nextPage < 0 || nextPage >= pages.length) {
      return;
    }

    const direction = nextPage > page ? 1 : -1;

    const tl = gsap.timeline();

    tl.to(contentRef.current, {
      opacity: 0,
      x: direction * -40,
      duration: 0.28,
      ease: "power2.in",
    })
      .to(
        backgroundRef.current,
        {
          x: direction * -18,
          scale: 1.045,
          duration: 0.45,
          ease: "power2.inOut",
        },
        "<"
      )
      .call(() => {
        setPage(nextPage);
      })
      .set(contentRef.current, {
        x: direction * 45,
      })
      .to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: "power3.out",
      })
      .to(
        backgroundRef.current,
        {
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "<"
      );
  };

  useEffect(() => {
    gsap.to(worldRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });



    gsap.from(".bottom-ui > *", {
      opacity: 0,
      y: 15,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      gsap.to(lightRef.current, {
        x: x - window.innerWidth / 2,
        y: y - window.innerHeight / 2,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(backgroundRef.current, {
        x: (x / window.innerWidth - 0.5) * -12,
        y: (y / window.innerHeight - 0.5) * -8,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        changePage(Math.min(page + 1, pages.length - 1));
      }

      if (event.key === "ArrowLeft") {
        changePage(Math.max(page - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page]);

  const submitQuestion = async (event) => {
    event.preventDefault();

    if (!question.trim()) return;

    const userQuestion = question.trim();

    setAnswer("THINKING...");

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: userQuestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Assistant request failed");
      }

      const data = await response.json();

      setAnswer(data.answer);

      gsap.fromTo(
        ".floating-chat-answer",
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        }
      );
    } catch (error) {
      console.error(error);

      setAnswer(
        "The portfolio assistant is currently unavailable. Please try again."
      );
    }
  };

  const current = pages[page];

  return (
    <>
      {!introDone && (
        <Intro onComplete={() => setIntroDone(true)} />
      )}

      <main ref={worldRef} className="world">
      <div ref={backgroundRef} className="world-background" />
      <div className="world-overlay" />
      <div ref={lightRef} className="cursor-light" />

      {/* HEADER */}

      <header className="topbar">

        <button className="brand" onClick={() => changePage(0)}>
          <span className="brand-mark">V</span>

          <span className="brand-info">
            <strong>VIBEK'S WORLD</strong>
            <small>Software Engineer&nbsp; • &nbsp;Builder</small>
          </span>
        </button>


        <nav className="scene-nav">
          {pages.map((item, index) => (
            <button
              key={item.id}
              className={page === index ? "active" : ""}
              onClick={() => changePage(index)}
            >
              {item.id}
            </button>
          ))}
        </nav>


        <div className="topbar-right">

          <div className="status">
            <span className="status-dot" />
            <span>AVAILABLE</span>
          </div>

          <button
            className="talk-button"
            onClick={() => setChatOpen(true)}
          >
            <span>LET'S TALK</span>
            <strong>→</strong>
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <div ref={contentRef} className="page-content">
        {/* PAGE 01 */}

        {page === 0 && (
          <section className="home-page">

            {/* LEFT SECTION TRACK */}

            <div className="home-section-indicator">

              <span className="section-number">
                01
              </span>

              <div className="section-track">
                <span className="active" />
                <span />
                <span />
                <span />
                <span />
              </div>

            </div>


            {/* HERO CONTENT */}

            <div className="home-hero">

              <div className="home-eyebrow">

                <span className="eyebrow-dot" />

                SOFTWARE BUILDER

                <span className="eyebrow-divider">
                  •
                </span>

                FREELANCER

              </div>


              <h1 className="home-title">

                <span className="title-solid">
                  VIBEK'S
                </span>

                <span className="title-outline">
                  WORLD
                </span>

              </h1>


              <p className="home-description">
                A developer portfolio built around real software,
                real systems, and the things I'm building.
              </p>


              <div className="home-buttons">

                <button
                  className="home-button primary"
                  onClick={() => changePage(1)}
                >
                  <span>EXPLORE</span>
                  <strong>→</strong>
                </button>


                <button
                  className="home-button secondary"
                  onClick={() => changePage(2)}
                >
                  <span>VIEW PROJECT</span>
                  <strong>▷</strong>
                </button>

              </div>

            </div>

           

            {/* 3D SYSTEM CORE */}

            <div className="system-core">

              <div className="core-ring ring-one" />
              <div className="core-ring ring-two" />
              <div className="core-ring ring-three" />

              <span className="core-particle particle-one" />
              <span className="core-particle particle-two" />
              <span className="core-particle particle-three" />

              {/* <div className="core-globe">

                <span className="continent continent-north-america" />
                <span className="continent continent-south-america" />
                <span className="continent continent-europe" />
                <span className="continent continent-africa" />
                <span className="continent continent-asia" />
                <span className="continent continent-australia" />
                <span className="globe-clouds" />
                <span className="globe-city-lights">
                  <i className="city-light light-1" />
                  <i className="city-light light-2" />
                  <i className="city-light light-3" />
                  <i className="city-light light-4" />
                  <i className="city-light light-5" />
                  <i className="city-light light-6" />
                </span>
                <span className="globe-v">
                  V
                </span>

              </div> */}
              {/* <div className="core-globe">

                <div className="globe-surface">

                  <span className="continent continent-north-america" />
                  <span className="continent continent-south-america" />
                  <span className="continent continent-europe" />
                  <span className="continent continent-africa" />
                  <span className="continent continent-asia" />
                  <span className="continent continent-australia" />

                  <span className="globe-clouds" />

                  <span className="globe-city-lights">
                    <i className="city-light light-1" />
                    <i className="city-light light-2" />
                    <i className="city-light light-3" />
                    <i className="city-light light-4" />
                    <i className="city-light light-5" />
                    <i className="city-light light-6" />
                  </span>

                </div>

                <span className="globe-v">
                  V
                </span>

              </div> */}
              <div className="core-globe holographic-globe">

                <div className="globe-surface">

                  <div className="globe-atmosphere" />
                  <div className="globe-grid" />

                  <span className="continent continent-north-america" />
                  <span className="continent continent-south-america" />
                  <span className="continent continent-europe" />
                  <span className="continent continent-africa" />
                  <span className="continent continent-asia" />
                  <span className="continent continent-australia" />

                  <span className="globe-clouds" />

                  <span className="globe-city-lights">
                    <i className="city-light light-1" />
                    <i className="city-light light-2" />
                    <i className="city-light light-3" />
                    <i className="city-light light-4" />
                    <i className="city-light light-5" />
                    <i className="city-light light-6" />
                  </span>

                </div>

                <div className="globe-glow" />
                <div className="globe-highlight" />

                {/* <span className="globe-v">V</span> */}

              </div>

              <span className="core-label label-ideas">
                IDEAS
              </span>

              <span className="core-label label-systems">
                SYSTEMS
              </span>

              <span className="core-label label-impact">
                IMPACT
              </span>

              <span className="core-label label-people">
                PEOPLE
              </span>

            </div>


            {/* RIGHT SIDE SYSTEM NAV */}

            {/* <div className="home-floating-nav">

              <button
                className="floating-nav-item active"
              >
                <span className="floating-icon">
                  &lt;/&gt;
                </span>

                <small>
                  CODE
                </small>
              </button>


              <button
                className="floating-nav-item"
                onClick={() => changePage(1)}
              >
                <span className="floating-icon">
                  ◇
                </span>

                <small>
                  BUILD
                </small>
              </button>


              <button
                className="floating-nav-item"
                onClick={() => changePage(2)}
              >
                <span className="floating-icon">
                  ◫
                </span>

                <small>
                  DEPLOY
                </small>
              </button>


              
              <button
                className={`floating-nav-item ${
                  page === 3 ? "active" : ""
                }`}
                onClick={() => changePage(3)}
              >
                <span className="floating-icon">
                  ◫
                </span>

                <small>
                  ENGINEER
                </small>
              </button>

            
              <button
                className={`floating-nav-item ${
                  page === 4 ? "active" : ""
                }`}
                onClick={() => changePage(4)}
              >
                <span className="floating-icon">
                  ✦
                </span>

                <small>
                  WORKSHOP
                </small>
              </button>

            </div> */}
            {/* RIGHT SIDE SYSTEM NAV */}
            <div className="home-floating-nav">

              <button
                type="button"
                className={`floating-nav-item ${page === 0 ? "active" : ""}`}
                onClick={() => changePage(0)}
              >
                <span className="floating-icon">⌂</span>
                <small>HOME</small>
              </button>

              <button
                type="button"
                className={`floating-nav-item ${page === 1 ? "active" : ""}`}
                onClick={() => changePage(1)}
              >
                <span className="floating-icon">✦</span>
                <small>BUILD</small>
              </button>

              <button
                type="button"
                className={`floating-nav-item ${page === 2 ? "active" : ""}`}
                onClick={() => changePage(2)}
              >
                <span className="floating-icon">▣</span>
                <small>SYSTEM</small>
              </button>

              <button
                type="button"
                className={`floating-nav-item ${page === 3 ? "active" : ""}`}
                onClick={() => changePage(3)}
              >
                <span className="floating-icon">⌘</span>
                <small>CODE</small>
              </button>

              <button
                type="button"
                className={`floating-nav-item ${page === 4 ? "active" : ""}`}
                onClick={() => changePage(4)}
              >
                <span className="floating-icon">✧</span>
                <small>WORKSHOP</small>
              </button>

            </div>


            {/* BOTTOM INFORMATION */}

            <div className="home-data">

            <div className="data-item">
              <strong>5+</strong>
              <span>Real Projects</span>
            </div>

            <div className="data-divider" />

            <div className="data-item">
              <strong>3+</strong>
              <span>Years of Building</span>
            </div>

            <div className="data-divider" />

            <div className="data-item">
              <strong>Full-Stack</strong>
              <span>Developer</span>
            </div>

            <div className="data-divider" />

            <div className="data-item">
              <strong>Real-World</strong>
              <span>Systems</span>
            </div>

          </div>


            {/* BOTTOM LEFT */}

            <div className="home-explore-indicator">

              <div className="mouse-outline">
                <span />
              </div>

              <span>
                EXPLORE THE WORLD
              </span>

              <b>
                →
              </b>

            </div>


            {/* BOTTOM RIGHT */}

            <div className="home-philosophy">

              <span />

              <div>
                <strong>BUILD.</strong>
                <strong>LEARN.</strong>
                <strong>IMPROVE.</strong>
                <strong>REPEAT.</strong>
              </div>

            </div>

          </section>
        )}

        {/* PAGE 02 */}

        {page === 1 && (
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">{current.eyebrow}</p>

              <h1>
                {current.title}
                <span className="accent-title">{current.accent}</span>
              </h1>

              <p className="description">{current.description}</p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => changePage(2)}
                >
                  EXPLORE <span>→</span>
                </button>

                <button
                  className="secondary-button"
                  onClick={() => changePage(3)}
                >
                  ENGINEERING
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PAGE 03 */}

        {page === 2 && (
          <section className="project-page">
            <div className="project-intro">
              <div className="project-kicker">
                <span className="live-indicator" />
                SYSTEM ONLINE
              </div>

              <h2>
                EDUCATION
                <span>MANAGEMENT</span>
                SYSTEM
              </h2>

              <p>{current.description}</p>

              <div className="project-stack">
                <span>DJANGO</span>
                <span>REACT</span>
                <span>POSTGRESQL</span>
                <span>REST API</span>
              </div>
            </div>

            <div className="project-console">
              <div className="console-header">
                <div>
                  <span className="console-dot" />
                  CORE SYSTEM
                </div>

                <span className="console-state">RUNNING</span>
              </div>

              <div className="module-grid">
                {modules.map((module) => (
                  <div className="module-card" key={module.number}>
                    <div className="module-top">
                      <span>{module.number}</span>
                      <span className="module-check">✓</span>
                    </div>

                    <div className="module-name">{module.name}</div>

                    <div className="module-detail">
                      {module.detail}
                    </div>

                    <span className="module-arrow">→</span>
                  </div>
                ))}
              </div>

              <div className="architecture-line">
                <span />
                <p>MODULAR SYSTEM ARCHITECTURE</p>
                <span />
              </div>
            </div>
          </section>
        )}

        {/* PAGE 04 */}

        {page === 3 && (
          <section className="engineering-page">

            {/* LEFT SIDE */}
            <div className="engineering-heading">

              <div className="engineering-kicker">
                <span className="engineering-pulse" />
                ENGINEERING
              </div>

              <h2>
                HOW I
                <span>BUILD.</span>
              </h2>

              <p>
                I build complete systems — from the interface and API
                to backend logic, database structure and access control.
              </p>

              <div className="engineering-stack-line">
                <span>PYTHON</span>
                <i>•</i>
                <span>DJANGO</span>
                <i>•</i>
                <span>REACT</span>
                <i>•</i>
                <span>POSTGRESQL</span>
              </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="architecture-console">

              <div className="architecture-header">

                <div className="architecture-title">
                  <span className="console-dot" />
                  SYSTEM ARCHITECTURE
                </div>

                <div className="architecture-status">
                  <span />
                  OPERATIONAL
                </div>

              </div>


              {/* FRONTEND */}
              <div className="architecture-node frontend-node">

                <div className="node-index">01</div>

                <div className="node-content">
                  <span className="node-label">CLIENT</span>
                  <h3>REACT</h3>

                  <div className="node-tags">
                    <span>JAVASCRIPT</span>
                    <span>HTML</span>
                    <span>CSS</span>
                  </div>
                </div>

                <div className="node-state">ACTIVE</div>

              </div>


              <div className="architecture-connector">
                <span />
                <i>REST API</i>
                <span />
              </div>


              {/* BACKEND */}
              <div className="architecture-node backend-node">

                <div className="node-index">02</div>

                <div className="node-content">
                  <span className="node-label">SERVER</span>
                  <h3>DJANGO</h3>

                  <div className="node-tags">
                    <span>PYTHON</span>
                    <span>REST API</span>
                    <span>BUSINESS LOGIC</span>
                  </div>
                </div>

                <div className="node-state">ACTIVE</div>

              </div>


              <div className="architecture-connector">
                <span />
                <i>DATABASE LAYER</i>
                <span />
              </div>


              {/* DATABASE */}
              <div className="architecture-node database-node">

                <div className="node-index">03</div>

                <div className="node-content">
                  <span className="node-label">DATA</span>
                  <h3>POSTGRESQL</h3>

                  <div className="node-tags">
                    <span>RELATIONS</span>
                    <span>QUERIES</span>
                    <span>DATA ISOLATION</span>
                  </div>
                </div>

                <div className="node-state">ACTIVE</div>

              </div>


              {/* ENGINEERING PRINCIPLES */}
              <div className="engineering-principles">

                <div>
                  <span>SECURITY</span>
                  <b>01</b>
                  <p>Tenant-level data boundaries</p>
                </div>

                <div>
                  <span>WORKFLOW</span>
                  <b>02</b>
                  <p>Real administrative processes</p>
                </div>

                <div>
                  <span>AUTOMATION</span>
                  <b>03</b>
                  <p>PDF & email workflows</p>
                </div>

              </div>

            </div>

          </section>
        )}

        {/* PAGE 05 */}

        {page === 4 && (
          <section className="building-page">

            {/* LEFT — CURRENT STATUS */}

            <div className="building-left">

              <div className="building-kicker">
                <span className="engineering-pulse" />
                ACTIVE DEVELOPMENT
              </div>

              <h2>
                IN THE
                <span>WORKSHOP.</span>
              </h2>

              <p className="building-description">
                I'm continuing to develop the Education Management System,
                turning real operational requirements into a working
                software product.
              </p>

              <div className="build-meta">

                <div>
                  <span>PROJECT</span>
                  <strong>EDUCATION MANAGEMENT SYSTEM</strong>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong className="green-text">IN DEVELOPMENT</strong>
                </div>

              </div>

            </div>


            {/* RIGHT — DEVELOPMENT CONSOLE */}

            <div className="build-console">

              <div className="build-console-header">

                <div>
                  <span className="console-dot" />
                  DEVELOPMENT LOG
                </div>

                <span className="build-live">
                  ● LIVE
                </span>

              </div>


              {/* CURRENT PROJECT */}

              <div className="build-project-header">

                <div className="build-project-icon">
                  EMS
                </div>

                <div>
                  <span>PRIMARY PROJECT</span>
                  <h3>EDUCATION MANAGEMENT SYSTEM</h3>
                </div>

              </div>


              {/* PROGRESS */}

              <div className="build-progress">

                <div className="progress-label">
                  <span>SYSTEM DEVELOPMENT</span>
                  <span>ACTIVE</span>
                </div>

                <div className="progress-track">
                  <div className="progress-fill" />
                </div>

              </div>


              {/* WORK ITEMS */}

              <div className="build-list">

                <div className="build-item completed">

                  <div className="build-number">
                    01
                  </div>

                  <div className="build-item-content">

                    <div className="build-item-title">
                      <h3>CORE MANAGEMENT</h3>
                      <span>BUILT</span>
                    </div>

                    <p>
                      Student admission, records, courses, batches
                      and fee management.
                    </p>

                  </div>

                  <div className="build-check">
                    ✓
                  </div>

                </div>


                <div className="build-item completed">

                  <div className="build-number">
                    02
                  </div>

                  <div className="build-item-content">

                    <div className="build-item-title">
                      <h3>DOCUMENT WORKFLOW</h3>
                      <span>BUILT</span>
                    </div>

                    <p>
                      Certificate issuing and automatic PDF generation
                      workflows.
                    </p>

                  </div>

                  <div className="build-check">
                    ✓
                  </div>

                </div>


                <div className="build-item completed">

                  <div className="build-number">
                    03
                  </div>

                  <div className="build-item-content">

                    <div className="build-item-title">
                      <h3>NOTIFICATION SYSTEM</h3>
                      <span>BUILT</span>
                    </div>

                    <p>
                      Automated email notifications for important
                      system events.
                    </p>

                  </div>

                  <div className="build-check">
                    ✓
                  </div>

                </div>


                <div className="build-item active">

                  <div className="build-number">
                    04
                  </div>

                  <div className="build-item-content">

                    <div className="build-item-title">
                      <h3>CONTINUOUS IMPROVEMENT</h3>
                      <span>ACTIVE</span>
                    </div>

                    <p>
                      Improving performance, workflows, reliability
                      and the overall system experience.
                    </p>

                  </div>

                  <div className="build-arrow">
                    →
                  </div>

                </div>

              </div>


              {/* STACK */}

              <div className="build-stack">

                <span>PYTHON</span>
                <span>DJANGO</span>
                <span>REACT</span>
                <span>POSTGRESQL</span>
                <span>REST API</span>

              </div>

            </div>

          </section>
        )}

        {/* PAGE 06 */}

        
      </div>
      {/* FLOATING AI CHAT BUTTON */}
      <button
        className={`floating-chat-button ${
          chatOpen ? "is-open" : ""
        }`}
        onClick={() => setChatOpen((previous) => !previous)}
        aria-label={chatOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
      >
        <span>✦</span>
      </button>
      
      {/* FLOATING AI CHAT WINDOW */}
      <section
        className={`floating-chat-window ${
          chatOpen ? "is-open" : ""
        }`}
        aria-hidden={!chatOpen}
      >
          <div className="floating-chat-header">
            <div>
              <span className="console-dot" />
              VIBEK ASSISTANT
            </div>
          </div>

          <div className="floating-chat-answer">
            <span>&gt;</span>
            <p>{answer}</p>
          </div>

          <form
            className="floating-chat-form"
            onSubmit={submitQuestion}
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about my work..."
            />

            <button type="submit">→</button>
          </form>
        </section>
        
      


      {/* BOTTOM NAVIGATION */}

      <footer className="bottom-ui">
        <div className="progress">
          {pages.map((item, index) => (
            <button
              key={item.id}
              className={index === page ? "progress-active" : ""}
              onClick={() => changePage(index)}
              aria-label={`Go to page ${item.id}`}
            />
          ))}
        </div>

        <div className="navigation">
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 0}
          >
            ← BACK
          </button>

          <button
            onClick={() => changePage(page + 1)}
            disabled={page === pages.length - 1}
          >
            NEXT →
          </button>
        </div>

        <div className="hint">
          USE <b>← →</b> TO NAVIGATE
        </div>
      </footer>
    </main></>
  );
}

export default App;