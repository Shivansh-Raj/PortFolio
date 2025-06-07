"use client";

import { motion, AnimatePresence } from "framer-motion";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { Poppins, Orbitron } from 'next/font/google';
import * as Icon from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FaceImage from "../public/Images/FaceImage.jpg";
import emailjs from 'emailjs-com';


const logos = [
  'Images/Logo_1.jpg',
  'Images/Logo_2.jpg',
  'https://placehold.co/200?text=Logo+3',
  'https://placehold.co/200?text=Logo+4',
  'https://placehold.co/200?text=Logo+5',
  'https://placehold.co/200?text=Logo+6',
  'https://placehold.co/200?text=Logo+7',
];

type ProgressCircleProps = {
  percentage: number;
  label: string;
  size?: "small" | "large";
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-orbitron',
});

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof Icon;
}

interface Service {
  id: string;
  title: string;
  description: string;
  contribution: String;
  icon: keyof typeof Icon;
}

interface TimelineItem {
  company: string;
  period: string;
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  colSpan: string;
  link:string
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  rating: number;
  content: string;
  image: string;
}

const ProgressCircle = ({ percentage, label, size = "small" }: ProgressCircleProps) => {
  const radius = 50;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    let start = 0;
    const duration = 1000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progressTime = timestamp - start;
      const newCount = Math.min(percentage, Math.floor((progressTime / duration) * percentage));
      setCount(newCount);
      setProgress(newCount);
      if (progressTime < duration) {
        frame = requestAnimationFrame(step);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [percentage]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const sizeClasses =
    size === "small" ? "w-12 h-12" : "w-32 h-32 md:w-40 md:h-40";
  const textClasses = size === "small" ? "text-[13px]" : "text-2xl";

  return (
    <div className="progressCircle">
      <div className={`relative ${sizeClasses} mx-auto`}>
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            fill="transparent"
            stroke="#444"
            strokeWidth={stroke}
          />
          <motion.circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            fill="transparent"
            stroke="#00BC91"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
        <div
          className={`absolute inset-0 ${textClasses} font-medium text-white flex items-center justify-center`}
        >
          {count}%
        </div>
      </div>
      <p className="text-[13px] font-normal dark:font-light text-white mt-2 text-center">
        {label}
      </p>
    </div>
  );
};


export default function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, 
  });
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const menuItems: MenuItem[] = [
    { id: "home", title: "Home", icon: "Home" },
    { id: "about", title: "About", icon: "User" },
    { id: "service", title: "Service", icon: "Briefcase" },
    { id: "resume", title: "Resume", icon: "FileText" },
    { id: "portfolio", title: "Portfolio", icon: "Layout" },
    { id: "testimonial", title: "Testimonial", icon: "MessageSquare" },
    { id: "contact", title: "Contact", icon: "Mail" },
  ];

  const services: Service[] = [
    {
      id: "01",
      title: "Full-Stack Web Development",
      description:
        "Develop scalable web applications using Django, React, FastAPI, and RESTful APIs. Focus on performance, security, and clean architecture.",
      icon: "Code",
      contribution: "Applied extensively in projects at Outlier, building AI-driven platforms and client-facing web apps."
    },
    {
      id: "02",
      title: "Data Structures & Algorithms",
      description:
        "Efficiently solve computational problems and optimize solutions with a solid grasp of algorithms and low-level data manipulation.",
      icon: "Binary",
      contribution: "Used daily for competitive programming and coding challenges on HackerRank, LeetCode, and CodeChef, as well as in work at Outlier."
    },
    {
      id: "03",
      title: "Machine Learning & Analytics",
      description:
        "Build ML models using Scikit-Learn and Pandas for tasks like recommendation systems, strategy backtesting, and pattern recognition.",
      icon: "LineChart",
      contribution: "Implemented in personal projects like NetVision and SMA Strategy Analysis, as well as academic coursework."
    },
    {
      id: "04",
      title: "Software Engineering & Tooling",
      description:
        "Proficient with Git, GitHub, MATLAB, and tools like TORA and SPSS. Experienced in version control, research workflows, and technical reporting.",
      icon: "Settings",
      contribution: "Used extensively in academic projects and personal research, facilitating efficient development and data analysis workflows."
    }
  ];


  const workExperience: TimelineItem[] = [
    {
      company: "Outlier",
      period: "Jan 2025 – Present",
      title: "AI Prompt Engineer",
      description:
        "Design and optimize AI-generated prompts to enhance response quality. Analyze model outputs to ensure accuracy, contextual relevance, and coherence across varied use cases."
    }
  ];

  const education: TimelineItem[] = [
    {
      company: "Delhi Technological University",
      period: "Nov 2022 – Present",
      title: "B.Tech in Mathematics and Computing",
      description: "Pursuing core coursework in algorithms, machine learning, web systems, and applied mathematics. Involved in academic projects integrating software engineering with intelligent systems."
    },
    {
      company: "Jesus Mary Joseph Sr. Sec. School",
      period: "Apr 2021 - May 2022",
      title: "Senior Secondary (Class 12)",
      description: "Completed CBSE with focus on Physics, Chemistry, Mathematics, and Computer Science. Achieved strong academic performance with foundational programming exposure."
    },
    {
      company: "Jesus Mary Joseph Sr. Sec. School",
      period: "Apr 2019 – May 2020",
      title: "Secondary Education (Class 10)",
      description: "Secured high grades with a strong foundation in science and mathematics. Demonstrated early interest in computing and problem-solving."
    }
  ];

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3); 
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "NetVision: ML-Powered Netflix Clone",
      category: "Full-Stack / Machine Learning",
      image: "/Images/NetVision.png", 
      colSpan: "md:col-span-1",
      link: "https://github.com/Shivansh-Raj/NetVision"
    },
    {
      id: 2,
      title: "SMA Strategy Backtesting API",
      category: "Data Science / FastAPI",
      image:  "/Images/SMA.jpg", 
      colSpan: "md:col-span-1",
      link: "https://github.com/Shivansh-Raj/FastAPI-Stock-Analysis"
    },
    {
      id: 3,
      title: "dQuora: Real-Time Q&A Platform",
      category: "Web Development / Realtime",
      image:  "/Images/dQuora.png", 
      colSpan: "md:col-span-1",
      link: "https://github.com/Shivansh-Raj/dQuora"
    },
    {
      id: 4,
      title: "Hand Tracking Mouse",
      category: "Computer Vision / Python",
      image:  "/Images/handtracking_mouse.png",  
      colSpan: "md:col-span-1",
      link: "https://github.com/Shivansh-Raj/Handtracking-Mouse"
    },
  ];
  
  const allVisible = visibleCount >= projects.length;

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "NetVision Project",
      position: "ML-Integrated UI System",
      rating: 5,
      content: "Shivansh demonstrated strong full-stack capabilities, building a seamless frontend with React and integrating an intelligent recommendation engine using Scikit-Learn and Django APIs.",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 2,
      name: "SMA Backtesting API",
      position: "Quantitative Analysis Tool",
      rating: 5,
      content: "This project highlighted Shivansh's ability to design high-performance APIs and apply financial logic to real-world market data using Python, FastAPI, and visualization libraries.",
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      name: "dQuora",
      position: "Interactive Q&A Platform",
      rating: 5,
      content: "A showcase of full-stack engineering with Django and real-time communication and  WebSockets. Shivansh built a highly interactive, scalable user experience from scratch.",
      image: "https://i.pravatar.cc/150?img=15"
    }
  ];


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      for (const section in sectionRefs.current) {
        const element = sectionRefs.current[section];
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetTop + height - 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const registerSection = (id: string, ref: HTMLDivElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  const TypeWriter = () => {
    const [currentText, setCurrentText] = useState("Web Developer");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const texts = ["Web Developer", "ML Enthusiast", "Web Designer"];

    useEffect(() => {
      const text = texts[loopNum % texts.length];

      const timer = setTimeout(() => {
        if (!isDeleting && currentText === text) {
          setTimeout(() => setIsDeleting(true), 1000);
          return;
        }

        if (isDeleting && currentText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(150);
          return;
        }

        const newText = isDeleting
          ? text.substring(0, currentText.length - 1)
          : text.substring(0, currentText.length + 1);

        setCurrentText(newText);
        setTypingSpeed(isDeleting ? 50 : 150);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }, [currentText, isDeleting, loopNum, texts]);

    return (
      <h6 className="w-full h-6 flex items-center justify-center text-sm text-[#00BC91] *:font-normal text-center">
        <b>{currentText}</b>
      </h6>
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex(prev => (prev < testimonials.length - 1 ? prev + 1 : prev));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sendingStatus, setSendingStatus] = useState('idle');
  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = (formData: { name: string; email: string; message: string; }) => {
    return formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.message.trim() !== '';
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formState,
      [name]: value
    };
    setFormState(updatedForm);
    setIsFormValid(checkFormValidity(updatedForm));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      return;
    }

    setSendingStatus('sending');

    emailjs
    .send(
      'service_0ijfv0f',
      'template_dyge3mo',
      formState,
      'GWPlI1O_lh_l92aKk'
    )
    .then(() => {
      setSendingStatus('success');
      console.log('Email sent');

      setTimeout(() => {
        setFormState({ name: '', email: '', message: '' });
        setSendingStatus('idle');
      }, 3000);
    })
    .catch((error) => {
      console.error('Email error:', error);
      setSendingStatus('error');
    });
  };


  const [focusIndex, setFocusIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateFocus = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(logos.length - 1, newIndex));
    setFocusIndex(clamped);

    const container = carouselRef.current;
    if (!container) return;

    const slideWidth = container.children[0].clientWidth + 24; // 24 = gap-6
    const shift = slideWidth * clamped;
    container.style.transform = `translateX(calc(50% - ${shift + slideWidth / 2}px))`;
  };

  useEffect(() => {
    updateFocus(focusIndex);
  }, [focusIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = Math.sign(e.deltaY);
      updateFocus(focusIndex + direction);
    };

    const container = carouselRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, [focusIndex]);
  

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stats = [
    { value: 300, sign:"+", label: 'DSA Problems Solved' },
    { value: 10, sign:"+", label: 'Projects Contributed @Outlier' },
    { value: 98, sign:"%", label: 'Percentile in JEE Mains' },
    { value: 2, sign:"x", label: 'Math Olympiad Gold Medals' },
  ];

  const [activeService, setActiveService] = useState<string | null>(null);

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      x: "50%",
      y: "50%",
    },
    visible: {
      scale: 10,
      opacity: 1,
      x: "0%",
      y: "0%",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };


  return (
    <div className={`${poppins.className} relative bg-[#0a0a0a] text-[#ededed]`}>
      <Head>
        <title>Shivansh Rajdehl - Web Developer</title>
        <meta name="description" content="Professional web developer portfolio" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="relative pt-10 minfo__app max-xl:pt-20">
        <div className={`xl:hidden menu-overlay fixed top-0 left-0 w-full h-full bg-black/60 transition-all duration-200 z-999 ${mobileMenuOpen ? 'is-menu-open opacity-100 visible' : 'opacity-0 invisible'}`}></div>

        <div className="max-lg:px-4">
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 px-3 bg-white/10 mobile-menu-bar sm:px-6 backdrop-blur-md xl:hidden">
            <div className="text-lg font-medium name">
              <a href="#" className="flex items-center gap-2 text-white">
                <img src="/Images/S_Logo.png" alt="logo" width={32} height={32} />
              </a>
            </div>
            <button
              className="w-12 h-12 border rounded-full hamburger menu_toggle bg-[#161616] border-greyBlack flex items-center justify-center"
              type="button"
              aria-label="Open Mobile Menu"
              onClick={toggleMobileMenu}
            >
              <Icon.Menu className="w-6 text-white" />
            </button>
          </div>

          <div className={`mobile-menu fixed top-0 ${mobileMenuOpen ? 'right-0' : '-right-full'} w-full max-w-[20rem] bg-[#161616] z-999 h-full xl:hidden transition-all duration-300 py-12 px-8 overflow-y-scroll`}>
            <button
              className="absolute flex items-center justify-center w-9 h-9 text-sm text-white rounded-full close-menu top-4 right-4 bg-[#3a3a3a]"
              aria-label="Close Menu"
              onClick={toggleMobileMenu}
            >
              <Icon.X size={18} />
            </button>

            <div className="mb-6 text-lg font-medium text-white menu-title">
              Menu
            </div>

            <ul className="space-y-5 font-normal main-menu">
              {menuItems.map((item) => {
                const IconComponent = Icon[item.icon] as LucideIcon;
                return (
                  <li key={item.id} className={`relative group ${activeSection === item.id ? 'active' : ''}`}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center space-x-2 group"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                        toggleMobileMenu();
                      }}
                    >
                      <span className={`w-5 text-white ${activeSection === item.id ? 'text-[#00BC91]' : ''}`}>
                        <IconComponent size={16} />
                      </span>
                      <span className={`${activeSection === item.id ? 'text-[#00BC91]' : 'text-white'} transition-colors`}>
                        {item.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 mb-4 font-medium text-white menu-title text-md">
              Get in Touch
            </div>

            <div className="flex items-center space-x-4 social-icons *:flex">
              <a href="https://www.linkedin.com/in/shivanshrajdehl" className="text-white hover:text-[#00BC91] transition-colors" title="Share with LinkedIn" target="_blank">
                <Icon.Linkedin size={20} />
              </a>
              <a href="https://github.com/Shivansh-Raj/" className="text-white hover:text-[#00BC91] transition-colors" title="Share with GitHub" target="_blank">
                <Icon.Github size={20} />
              </a>
              <a href="mailto:shivanshrajdehl@gmail.com" className="text-white hover:text-[#00BC91] transition-colors" title="Share with Gamil" target="_blank">
                <Icon.Mail size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#00BC91] transition-colors" title="Share with Telegram" target="_blank">
                <Icon.Send size={20} />
              </a>
            </div>
          </div>

          <div className="w-full mx-auto minfo__sidebar__wrapper xl:fixed xl:top-1/2 xl:left-4 2xl:left-14 xl:-translate-y-1/2 md:max-w-[24rem] xl:max-2xl:max-w-xs z-999">
            <div className="p-3 max-xl:mb-3 overflow-hidden minfo__sidebar bg-[#161616] rounded-2xl">
              <div className="mx-4 mt-12 text-center user-info lg:mx-6 items-center">
                <a href="#" className="w-36 h-36 mb-2.5 block mx-auto border-6 border-[#2f2f2f] overflow-hidden rounded-full *:w-full *:h-full *:rounded-full">
                  <Image src={FaceImage} className="block" alt="Shivansh Rajdehl" width={144} height={144} />
                </a>
                <h6 className="mb-1 text-lg font-semibold text-white name">Shivansh Rajdehl</h6>
                <div className="leading-none cd-headline clip is-full-width text-center items-center">
                  <TypeWriter />
                </div>
              </div>

              <div className="pt-6 mx-4 border-t lg:mx-6 user-meta-info md:mx-7 my-7 border-metalBlack">
                <ul className="space-y-3 *:flex *:text-sm">
                  <li>
                    <span className="flex-1 font-medium text-white">Residence:</span>
                    <span className="text-gray-400">India</span>
                  </li>
                  <li>
                    <span className="flex-1 font-medium text-white">City:</span>
                    <span className="text-gray-400">New Delhi</span>
                  </li>
                  <li>
                    <span className="flex-1 font-medium text-white">Age:</span>
                    <span className="text-gray-400">21</span>
                  </li>
                </ul>
              </div>

              <div className="px-4 py-5 lg:py-6 lg:px-6 rounded-2xl md:px-8 bg-[#2f2f2f]">
                <div className="text-sm font-medium text-white">Skills</div>
                <div className="flex items-center justify-between my-4 space-x-4 *:space-y-2 *:text-center">
                  <ProgressCircle percentage={95} label="DSA" size="small" />
                  <ProgressCircle percentage={95} label="Java" size="small" />
                  <ProgressCircle percentage={90} label="WebD" size="small" />
                  <ProgressCircle percentage={85} label="Python" size="small" />
                </div>
                <div className="mt-6">
                  <a href="/mycv.pdf" download target="_blank" className="text-center text-sm border border-[#00BC91] bg-[#00BC91] flex items-center justify-center gap-2 text-white rounded-[2rem] py-3.5 transition duration-300 text-[15px] font-semibold hover:bg-[#00BC91] hover:border-[#00BC91]">
                    DOWNLOAD CV
                    <span className="animate-bounce">
                      <Icon.Download size={18} className="text-white" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="minfo__nav__wrapper dark:bg-power__black text-[#acacac] font-normal dark:bg-power__black max-xl:hidden fixed top-1/2 -translate-y-1/2 right-4 2xl:right-14 z-999 flex items-center flex-col gap-4 border border-metalBlack rounded-[2rem] px-2.5 py-4">
            <div className="flex border rounded-full logo w-15 h-15 border-metalBlack flex items-center justify-center hover:bg-[#2f2f2f]">
              <a href="#">
                <img src="/Images/S_Logo.png" alt="logo" width={32} height={32} />
              </a>
            </div>

            <div className="my-4 menu">
              <ul className="space-y-2 text-center *:relative">
                {menuItems.map((item) => {
                  const IconComponent = Icon[item.icon] as LucideIcon;
                  return (
                    <li key={item.id} className={`group ${activeSection === item.id ? 'active' : ''}`}>
                      <a
                        href={`#${item.id}`}
                        className="w-9 h-9 rounded-full flex items-center justify-center group-[&.active]:bg-[#565656] group-hover:bg-[#2f2f2f] transition-all duration-300 before:content-[attr(data-title)] before:absolute before:right-10 before:bg-[#2f2f2f] before:text-sm before:text-white before:px-4 before:py-2 before:rounded-md before:font-light before:opacity-0 before:transition-all before:duration-200 group-hover:before:opacity-100 after:content-[''] after:absolute after:w-0 after:h-0 after:right-8 after:border-solid after:border-t-4 after:border-r-0 after:border-b-4 after:border-l-8 after:border-t-transparent after:border-r-transparent after:border-b-transparent after:border-l-metalBlack after:opacity-0 after:transition-all after:duration-200 group-hover:after:opacity-100"
                        data-title={item.title}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                      >
                        <span className={`text-white group-hover:text-[#00BC91] ${activeSection === item.id ? 'text-[#00BC91]' : ''}`}>
                          <IconComponent size={16} />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative share group">
              <button className="w-10 h-10 text-sm border rounded-full border-metalBlack flex items-center justify-center group-hover:bg-[#2f2f2f] text-white" aria-label="Share">
                <Icon.Share2 size={16} />
              </button>

              <div className="absolute bottom-0 flex items-center invisible px-5 py-6 space-x-3 transition-all duration-300 -translate-y-1/2 opacity-0 social-icons top-1/2 bg-[#161616] rounded-[2rem] right-6 group-hover:opacity-100 group-hover:visible group-hover:right-10 -z-1 *:flex *:transition *:duration-200">
                <a href="https://www.linkedin.com/in/shivanshrajdehl" className="text-white hover:text-[#00BC91] transition-colors" title="Share with LinkedIn" target="_blank">
                  <Icon.Linkedin size={20} />
                </a>
                <a href="https://github.com/Shivansh-Raj/" className="text-white hover:text-[#00BC91] transition-colors" title="Share with GitHub" target="_blank">
                  <Icon.Github size={20} />
                </a>
                <a href="mailto:shivanshrajdehl@gmail.com" className="text-white hover:text-[#00BC91] transition-colors" title="Share with Gamil" target="_blank">
                  <Icon.Mail size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#00BC91] transition-colors" title="Share with Telegram" target="_blank">
                  <Icon.Send size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="minfo__contentBox relative mx-auto max-w-[82rem] xl:max-2xl:max-w-[65rem] *:py-5 xl:*:py-3.5 *:max-w-[70rem] max-xl:*:mx-auto xl:*:ml-auto xl:max-2xl:*:max-w-[50rem]">

            <div ref={(ref) => registerSection("home", ref)} id="home" data-scroll-index="0">
              <div className="hero-section px-5 py-0 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.Home className="text-[#00BC91]" size={12} />
                  INTRODUCE
                </div>
                
                <motion.div
                  className="items-center gap-6 hero-content md:flex xl:gap-10"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    className="text-content pt-7 lg:pt-8 max-lg:max-w-[30rem]"
                    variants={item}
                  >
                    <motion.h1
                      className="text-[32px] lg:text-5xl xl:text-4xl 2xl:text-5xl font-semibold text-white leading-1.27 lg:leading-1.27 xl:leading-1.27 2xl:leading-1.27 mb-4 lg:mb-5"
                      variants={item}
                    >
                      Shaping the Future of 
                      <span className="text-[#00BC91]"> Smart Web Experiences</span>
                    </motion.h1>

                    <motion.p className="text-gray-400" variants={item}>
                      I’m <span className="font-semibold text-white/90">Shivansh Rajdehl</span>, a passionate <span className="font-medium text-white/90">Full-Stack Developer</span> and ML enthusiast.  
                      I create scalable apps that blend clean design with intelligent automation, solving complex problems elegantly.
                    </motion.p>

                    <motion.ul
                      className="flex items-center mt-4 -mx-3 lg:mt-5 *:flex *:items-center *:mx-3 *:text-regular text-gray-400"
                      variants={item}
                    >
                      <li>
                        <Icon.CheckSquare className="mr-2 text-[#00BC91]" size={16} />
                        Available for work
                      </li>
                      <li>
                        <Icon.CheckSquare className="mr-2 text-[#00BC91]" size={16} />
                        Full Time Job
                      </li>
                    </motion.ul>

                    <motion.ul className="mt-7 buttons" variants={item}>
                      <li>
                        <a
                          href="#contact"
                          className="btn-theme inline-flex items-center gap-2 bg-[#00BC91] py-4 md:py-4.5 lg:px-9 px-7 rounded-[2rem] leading-none transition-all duration-300 hover:shadow-theme_shadow text-white font-medium text-[15px] md:text-base"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("contact");
                          }}
                        >
                          <Icon.Mail size={16} />
                          HIRE ME
                        </a>
                      </li>
                    </motion.ul>
                  </motion.div>

                  <motion.div
                    className="hero-image flex-[0_0_20.3rem] max-md:hidden"
                    variants={item}
                  >
                    <img
                      src="/Images/Home_Bg.jpg"
                      className="block"
                      alt="Hero Image - Dark Mode"
                      width={320}
                      height={320}
                    />
                  </motion.div>
                </motion.div>
                
                <div className="grid md:grid-cols-12 items-center overflow-hidden pb-0 mt-14 xl:mb-0 xl:mt-20">

                  <div className="hidden md:block md:col-span-2">
                    <h6 className="font-medium text-white/80 text-sm md:max-w-[8rem] border-l border-[#00BC91] pl-4">
                      Trusted companies
                    </h6>
                  </div>

                  <div className="md:col-span-10 relative w-full overflow-hidden h-[180px]">
                    <div
                      ref={carouselRef}
                      className="flex transition-transform duration-300 ease-in-out gap-6 justify-center items-center"
                    >
                      {logos.map((src, i) => (
                        <div
                          key={i}
                          className={`flex-none w-[120px] h-[120px] rounded-full overflow-hidden 
                                      flex justify-center items-center transition-all duration-300
                                      ${i === focusIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}
                        >
                          <img
                            src={src}
                            alt={`Logo ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div ref={(ref) => registerSection("about", ref)} id="about" data-scroll-index="1">
              <div className="about-section px-5 py-8 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.User className="text-[#00BC91]" size={12} />
                  ABOUT ME
                </div>
                <div className="mt-7 md:mt-10 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    About <span className="font-semibold text-[#00BC91]">Me</span>
                  </h2>
                  <p className="max-w-2xl mt-4 md:mt-6 subtitle text-gray-400">
                    Hi, I'm <span className="text-white">Shivansh Rajdehl</span>, a B.Tech student at Delhi Technological University with a strong focus on software development, machine learning, and full-stack engineering. I’ve spent the past few years building projects that combine clean architecture with real-world problem solving, from machine learning-powered platforms to real-time web applications.
                  </p>

                </div>
                <div className="mt-6 section-content">
                  <div className="inline-flex flex-wrap items-center gap-2 mb-5 text-sm md:gap-4 *:inline-block *:px-3.5 *:py-2 *:transition *:duration-300 *:border *:border-dashed *:text-white/70 *:border-greyBlack *:rounded-[1.5rem] md:*:px-5 md:*:py-2">
                    <a href="#" className="hover:text-white">
                      React.js & Next.js (92%)
                    </a>
                    <a href="#" className="hover:text-white">
                      Django & Django REST Framework (90%)
                    </a>
                    <a href="#" className="hover:text-white">
                      FastAPI (88%)
                    </a>
                    <a href="#" className="hover:text-white">
                      Python (95%)
                    </a>
                    <a href="#" className="hover:text-white">
                      TailwindCSS (90%)
                    </a>
                    <a href="#" className="hover:text-white">
                      JavaScript (90%)
                    </a>
                    <a href="#" className="hover:text-white">
                      MySQL & PostgreSQL (87%)
                    </a>
                    <a href="#" className="hover:text-white">
                      Git & GitHub (94%)
                    </a>
                    <a href="#" className="hover:text-white">
                      NumPy, Pandas & Matplotlib (91%)
                    </a>
                  </div>

                  <ul className="grid mt-4 mb-10 text-sm lg:mt-6 md:grid-cols-2 gap-x-8 gap-y-3 *:flex *:items-center text-gray-400">
                    <li>
                      <span className="flex-[0_0_6rem]">Phone</span>
                      <span className="flex-[0_0_2rem]">:</span>
                      <span className="text-white">+(91) 85270 84276</span>
                    </li>
                    <li>
                      <span className="flex-[0_0_6rem]">Email</span>
                      <span className="flex-[0_0_2rem]">:</span>
                      <span className="text-white">shivanshrajdehl@gmail.com</span>
                    </li>
                    <li>
                      <span className="flex-[0_0_6rem]">LinkedIn</span>
                      <span className="flex-[0_0_2rem]">:</span>
                      <a href="https://www.linkedin.com/in/shivanshrajdehl" target="_blank"><span className="text-white">LinkedIn</span></a>
                    </li>
                    <li>
                      <span className="flex-[0_0_6rem]">Github</span>
                      <span className="flex-[0_0_2rem]">:</span>
                      <a href = "https://github.com/Shivansh-Raj/" target="_blank"><span className="text-white">github.com/Shivansh-Raj/</span></a>
                    </li>
                    <li>
                      <span className="flex-[0_0_6rem]">Language</span>
                      <span className="flex-[0_0_2rem]">:</span>
                      <span className="text-white">English, Hindi</span>
                    </li>
                  </ul>

                  <ul
                    ref={ref}
                    className="grid grid-cols-2 gap-6 counters md:grid-cols-4 xl:gap-8 text-gray-400"
                  >
                    {stats.map((stat, idx) => (
                      <li key={idx}>
                        <div className="mb-1 text-2xl font-semibold md:text-3xl text-[#00BC91] 2xl:text-4xl">
                          {inView ? <CountUp end={stat.value} duration={2} /> : '0'}
                          {stat.sign}
                        </div>
                        <div className="text-sm">{stat.label}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div ref={(ref) => registerSection("service", ref)} id="service" data-scroll-index="2">
              <div className="service-section px-5 py-8 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.Briefcase className="text-[#00BC91]" size={12} />
                  SERVICES
                </div>
                <div className="mb-8 mt-7 md:my-10 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    My <span className="font-semibold text-[#00BC91]">Services</span>
                  </h2>
                  <p className="max-w-xl mt-4 md:mt-6 subtitle text-gray-400">
                     I craft user-centric web interfaces and full-stack solutions that balance design precision with real-world functionality. Every component I build is optimized for clarity, performance, and purpose.
                  </p>
                </div>

                <div className="grid gap-5 md:gap-6 service-card-wrapper sm:grid-cols-2 lg:gap-7 2xl:gap-8 *:relative *:p-5 *:transition *:duration-300 *:border *:py-7 md:*:p-7 *:border-metalBlack *:rounded-2xl xl:*:p-8 2xl:*:p-10">
                  {services.map((service) => {
                    const IconComponent = Icon[service.icon] as LucideIcon;
                    const isActive = activeService === service.id;

                    return (
                      <div
                        key={service.id}
                        className="card-item group relative overflow-hidden hover:border-[#00BC91] cursor-pointer transition-all duration-500"
                        onClick={() => setActiveService(isActive ? null : service.id)}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isActive ? { scale: 4 } : { scale: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute w-40 h-40 bg-[#00BC91] rounded-full top-[-20%] left-[-20%] z-0"
                          style={{ transformOrigin: "top left" }}
                        />

                        <div className="relative z-10 ">
                          <div
                            className={`absolute transition-colors transition-transform duration-300 md:top-10 icon right-6 top-7 md:right-8 group-hover:-rotate-45 lg:top-11 ${
                              isActive ? 'text-white -rotate-45' : 'text-[#00BC91] rotate-0'
                            }`}
                          >
                            <IconComponent size={48} />
                          </div>


                          <div className="text-5xl font-extrabold transition duration-300 md:text-6xl number lg:text-7xl text-greyBlack opacity-30 group-hover:opacity-100">
                            {service.id}
                          </div>

                          <h4 className="mt-5 mb-4 text-xl font-medium text-white xl:text-2xl">
                            {service.title}
                          </h4>

                          <p className="text-gray-400 transition-all duration-300 ease-in-out relative">
                            <span
                              className={`absolute left-0 top-0 transition-all duration-300 ease-in-out ${
                                isActive ? 'opacity-100 text-white' : 'opacity-0'
                              }`}
                            >
                              {service.contribution}
                            </span>
                            <span
                              className={`transition-all duration-300 ease-in-out ${
                                isActive ? 'opacity-0' : 'opacity-100'
                              }`}
                            >
                              {service.description}
                            </span>
                          </p>

                        </div>
                      </div>

                    );
                  })}

                </div>
              </div>
            </div>



            <div ref={(ref) => registerSection("resume", ref)} id="resume" data-scroll-index="4">
              <div className="resume-section px-5 py-8 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.FileText className="text-[#00BC91]" size={12} />
                  RESUME
                </div>
                <div className="mb-8 mt-7 md:my-10 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    Work <span className="font-semibold text-[#00BC91]">Experience</span>
                  </h2>
                  <p className="max-w-xl mt-4 md:mt-6 subtitle text-gray-400">
                     I craft user-centric web interfaces and full-stack solutions that balance design precision with real-world functionality. Every component I build is optimized for clarity, performance, and purpose.
                  </p>
                </div>

                <div className="experience">
                  <ul className="space-y-5 md:space-y-11 relative md:before:content-[''] md:before:absolute md:before:left-64 md:before:border-r md:before:border-metalBlack md:before:h-[calc(100%_-1.5rem)] md:before:top-1/2 md:before:-translate-y-1/2 *:p-5 *:border *:rounded-xl md:*:flex max-md:*:space-y-2 *:border-metalBlack md:*:border-0 md:*:p-0 md:*:rounded-none">
                    {workExperience.map((experience, index) => (
                      <li key={index}>
                        <div className="flex items-center justify-between mb-5 md:w-64 md:block md:mb-0">
                          <h6 className="text-sm font-medium text-white text-opacity-60 md:text-base md:text-opacity-100">
                            {experience.company}
                          </h6>
                          <p className="text-[13px] md:text-sm text-[#00BC91]">
                            {experience.period}
                          </p>
                        </div>
                        <div className="md:flex-1 md:pl-16 relative md:before:content-[''] md:before:absolute md:before:-left-1 md:before:top-3 md:before:w-2 md:before:h-2 md:before:bg-[#00BC91] md:before:rounded-full md:before:shadow-dots_glow">
                          <h4 className="text-xl xl:text-2xl font-medium xl:font-medium leading-7 text-white mb-2.5">
                            {experience.title}
                          </h4>
                          <p className="text-gray-400">
                            {experience.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                

                <div className="mb-8 mt-7 md:my-10 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    My <span className="font-semibold text-[#00BC91]">Education</span>
                  </h2>
                  <p className="max-w-xl mt-4 md:mt-6 subtitle text-gray-400">
                     I craft user-centric web interfaces and full-stack solutions that balance design precision with real-world functionality. Every component I build is optimized for clarity, performance, and purpose.
                  </p>
                </div>

                <div className="experience">
                  <ul className="space-y-5 md:space-y-11 relative md:before:content-[''] md:before:absolute md:before:left-64 md:before:border-r md:before:border-metalBlack md:before:h-[calc(100%_-1.5rem)] md:before:top-1/2 md:before:-translate-y-1/2 *:p-5 *:border *:rounded-xl md:*:flex max-md:*:space-y-2 *:border-metalBlack md:*:border-0 md:*:p-0 md:*:rounded-none">
                    {education.map((edu, index) => (
                      <li key={index}>
                        <div className="flex items-center justify-between mb-5 md:w-64 md:block md:mb-0">
                          <h6 className="text-sm font-medium text-white text-opacity-60 md:text-base md:text-opacity-100">
                            {edu.company}
                          </h6>
                          <p className="text-[13px] md:text-sm text-[#00BC91]">
                            {edu.period}
                          </p>
                        </div>
                        <div className="md:flex-1 md:pl-16 relative md:before:content-[''] md:before:absolute md:before:-left-1 md:before:top-3 md:before:w-2 md:before:h-2 md:before:bg-[#00BC91] md:before:rounded-full md:before:shadow-dots_glow">
                          <h4 className="text-xl xl:text-2xl font-medium xl:font-medium leading-7 text-white mb-2.5">
                            {edu.title}
                          </h4>
                          <p className="text-gray-400">
                            {edu.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div ref={(ref) => registerSection("portfolio", ref)} id="portfolio" data-scroll-index="5">
              <div className="portfolio-section px-5 py-8 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.Layout className="text-[#00BC91]" size={12} />
                  PORTFOLIO
                </div>
                <div className="mt-5 mb-8 md:my-10 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    Featured <span className="font-semibold text-[#00BC91]">Projects</span>
                  </h2>
                  <p className="max-w-xl mt-4 md:mt-6 subtitle text-gray-400">
                     I craft user-centric web interfaces and full-stack solutions that balance design precision with real-world functionality. Every component I build is optimized for clarity, performance, and purpose.
                  </p>
                </div>

                <div className="portfolio_wrapper grid sm:grid-cols-2 gap-4 lg:gap-7.5 *:relative *:z-1">
                  {projects.slice(0,visibleCount).map(project => (
                    <div key={project.id} className={`${project.id === 1 ? 'sm:col-span-2' : 'col-span-1'} group`}>
                      <a href={project.link} className="block p-3 overflow-hidden border md:p-4 rounded-xl border-greyBlack" target="_blank">
                        <div className="img-wrapper">
                          <img 
                            src={project.image}
                            className={`rounded-lg w-full object-cover object-center transition-all duration-300 group-hover:blur-xs ${project.id === 1 ? 'h-[300px]' : 'h-[200px]'}`}
                          />
                          <div className="absolute inset-0 transition-all duration-300 opacity-0 overlay bg-gradient-to-t from-black to-transparent rounded-xl group-hover:opacity-100">
                          </div>
                        </div>
                        <div className="info text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-lg:text-3xl text-lead font-semibold text-white leading-1.15 transition duration-500 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 relative z-10">
                          {project.title}
                        </div>
                      </a>
                      <ul className="absolute z-10 transition-all duration-500 opacity-0 md:top-9 md:right-9 top-6 right-6 group-hover:opacity-100">
                        <li>
                          <a href="#" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-light leading-none text-white transition-colors bg-[#2f2f2f] rounded-[1.5rem] hover:text-[#00BC91]">
                            {project.category}
                          </a>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>

                {!allVisible && (
                  <div className="mt-10 text-center md:mt-13">
                    <button
                      onClick={handleShowMore}
                      className="inline-flex items-center gap-2 text-[15px] font-medium border border-[#00BC91] bg-[#00BC91] text-white py-4.5 px-9 rounded-[2rem] leading-none transition-all duration-300 hover:bg-[#00BC91] hover:border-[#00BC91] cursor-pointer"
                    >
                      More Projects
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div ref={(ref) => registerSection("testimonial", ref)} id="testimonial" data-scroll-index="7">
              <div className="testimonial-section px-5 py-8 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.MessageCircle className="text-[#00BC91]" size={12} />
                  TESTIMONIAL
                </div>
                <div className="mt-5 mb-8 md:my-10 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    What <span className="font-semibold text-[#00BC91]">People Say</span>
                  </h2>
                  <p className="max-w-xl mt-4 md:mt-6 subtitle text-gray-400">
                     I craft user-centric web interfaces and full-stack solutions that balance design precision with real-world functionality. Every component I build is optimized for clarity, performance, and purpose.
                  </p>
                </div>

                <div className="mt-12 testimonial-slider">
                  <div className="swiper-wrapper flex justify-center">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.id}
                        className={`swiper-slide ${index === currentTestimonialIndex ? 'swiper-slide-active' : ''}`}
                        style={{ width: '345px', display: index === currentTestimonialIndex ? 'block' : 'none' }}
                      >
                        <div className="text-center slider-inner md:px-5">
                          <div className="image flex items-center justify-center">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="rounded-full mx-auto"
                            />
                          </div>
                          <div className="mt-6 mb-3 text-center rating text-[#FFA500] text-sm">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <i key={i} className="fas fa-star"></i>
                            ))}
                          </div>
                          <div className="text-sm md:text-[15px] leading-loose content text-gray-400" dangerouslySetInnerHTML={{ __html: testimonial.content }}></div>
                          <div className="mt-5 text-center author">
                            <h6 className="text-lg font-medium text-white">{testimonial.name}</h6>
                            <p className="text-sm text-gray-400">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="testimonial-slider-navigation flex justify-center items-center gap-2.5 mt-8">
                    <button
                      className={`transition border rounded-full button-prev w-11 h-11 group border-greyBlack flex items-center justify-center hover:bg-[#00BC91] hover:border-[#00BC91] ${currentTestimonialIndex === 0 ? 'swiper-button-disabled opacity-50' : ''}`}
                      aria-label="Previous slide"
                      disabled={currentTestimonialIndex === 0}
                      onClick={handlePrevTestimonial}
                    >
                      <Icon.ArrowLeft className="w-6 text-gray-400 group-hover:text-white" />
                    </button>
                    <div className="text-sm font-light text-center text-white counter w-7">
                      <span className="text-[#00BC91]">{currentTestimonialIndex + 1}</span>/{testimonials.length}
                    </div>
                    <button
                      className={`transition border rounded-full button-next w-11 h-11 group border-greyBlack flex items-center justify-center hover:bg-[#00BC91] hover:border-[#00BC91] ${currentTestimonialIndex === testimonials.length - 1 ? 'swiper-button-disabled opacity-50' : ''}`}
                      aria-label="Next slide"
                      disabled={currentTestimonialIndex === testimonials.length - 1}
                      onClick={handleNextTestimonial}
                    >
                      <Icon.ArrowRight className="w-6 text-gray-400 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div ref={(ref) => registerSection("contact", ref)} id="contact" data-scroll-index="8">
              <div className="contact-section px-5 py-8 md:p-8 bg-[#161616] rounded-2xl lg:p-10 2xl:p-13">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 section-name border-[#464646] rounded-[2rem]">
                  <Icon.Mail className="text-[#00BC91]" size={12} />
                  CONTACT
                </div>
                <div className="mb-10 mt-7 section-title">
                  <h2 className={`title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27 ${orbitron.className}`}>
                    Contact <span className="font-semibold text-[#00BC91]">Me.</span>
                  </h2>
                  <p className="mt-3.5 md:mt-5 subtitle max-w-sectionTitle text-gray-400">
                     I craft user-centric web interfaces and full-stack solutions that balance design precision with real-world functionality. Every component I build is optimized for clarity, performance, and purpose.
                  </p>
                </div>

                <div className="md:col-span-7">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        id="client__name"
                        placeholder="Name"
                        className="w-full p-5 text-sm outline-none h-13 border border-greyBlack bg-transparent rounded-md focus:border-[#00BC91] dark:placeholder:text-white/40"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        disabled={sendingStatus === 'sending'}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="client_email"
                        placeholder="E-Mail"
                        className="w-full p-5 text-sm outline-none h-13 border border-greyBlack bg-transparent rounded-md focus:border-[#00BC91] dark:placeholder:text-white/40"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        disabled={sendingStatus === 'sending'}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows={5}
                        className="w-full px-5 py-4 text-sm outline-none border border-greyBlack bg-transparent rounded-md focus:border-[#00BC91] dark:placeholder:text-white/40"
                        required
                        value={formState.message}
                        onChange={handleChange}
                        disabled={sendingStatus === 'sending'}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-2 text-[15px] font-medium border py-4.5 px-9 rounded-[2rem] leading-none transition-all duration-300 ${!isFormValid || sendingStatus === 'sending'
                          ? 'bg-gray-400 border-gray-400 text-gray-200 opacity-70'
                          : 'border-[#00BC91] bg-[#00BC91] text-white cursor-pointer hover:bg-[#00BC91] hover:border-[#00BC91]'
                          }`}
                        aria-label="Send Message"
                        disabled={!isFormValid || sendingStatus === 'sending'}
                      >
                        {sendingStatus === 'idle' && 'Send Message'}
                        {sendingStatus === 'sending' && (
                          <>
                            <span className="animate-pulse">Sending</span>
                            <span className="flex space-x-1">
                              <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                              <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                              <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </span>
                          </>
                        )}
                        {sendingStatus === 'success' && (
                          <>
                            <span>Sent</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                    {sendingStatus === 'success' && (
                      <div className="text-[#00BC91] text-sm mt-2 animate-fade-in">
                        Thank you for your message! I will get back to you soon.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          <footer className="mx-auto minfo__contentBox max-w-[82rem] xl:max-2xl:max-w-[65rem]">
            <div className="footer-container text-center py-6 max-w-[70rem] xl:max-2xl:max-w-[50rem] max-xl:mx-auto xl:ml-auto text-gray-400">
              <p>
                Copyright by
                <a href="#" className="transition-colors hover:text-[#00BC91]"> @domain.com</a>
              </p>
            </div>
          </footer>
        </div>
      </div>

      <div className="bg-lines fixed inset-0 -z-1 md:max-xl:max-w-[45rem] xl:max-w-[60rem] 2xl:max-w-[82rem] mx-auto max-sm:px-8 sm:max-xl:px-12">
        <style jsx global>{`
          :root {
              --background: #0a0a0a;
              --foreground: #ededed;
            }
          @keyframes top_bottom {
            0% { top: 0; }
            100% { top: 100%; }
          }
          
          @keyframes bottom_top {
            0% { bottom: 0; }
            100% { bottom: 100%; }
          }
          
          .animate-top-bottom::before {
            animation: top_bottom 16s linear infinite;
          }
          
          .animate-bottom-top::before {
            animation: bottom_top 16s linear infinite;
          }
            .line-wrapper > div {
              width: 1px;
              height: 100%;
              border-right: 1px dashed #2f2f2f;
              position: relative;
            }
            
            .line-wrapper > div::before {
              content: '';
              position: absolute;
              background-color: #00BC91;
              transform: rotate(80deg);
              left: -3px;
              width: 8px;
              height: 8px;
              border-radius: 1px;
            }
            
            .line2::before {
              bottom: 0;
              animation: bottom_top 16s linear infinite;
              animation-delay: 3s;
              transform: rotate(45deg);
            }
            
            .line3::before {
              animation: top_bottom 16s linear infinite;
              animation-delay: 3s;
              transform: rotate(45deg);
            }
            
            .line4::before {
              bottom: 0;
              animation: bottom_top 16s linear infinite;
              animation-delay: 2s;
              transform: rotate(45deg);
            }

            .line1::before {
              bottom: 0;
              animation: bottom_top 16s linear infinite;
              animation-delay: 1s;
              transform: rotate(45deg);
              transform: transition()
            }
            
            @keyframes top_bottom {
              0% { top: 0; }
              100% { top: 100%; }
            }
            
            @keyframes bottom_top {
              0% { bottom: 0; }
              100% { bottom: 100%; }
            }
        `}</style>

        <div className="line-wrapper max-w-[1130px] w-full h-full ml-auto 2xl:-mr-24 relative flex justify-between *:w-px *:h-full *:border-r *:border-dashed *:border-metalBlack *:relative *:before:absolute *:before:bg-[#00BC91] *:before:rotate-45 *:before:-left-1 *:before:w-2 *:before:h-2">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          <div className="line4"></div>
        </div>
      </div>
    </div>
  );
}