import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SITE_DATA } from '../data/siteContent';
import PageTransition from '../components/animations/PageTransition';
import SEOWrapper from '../components/seo/SEOWrapper';
import { Clock, MonitorPlay, Calendar, BookOpen, Star, CheckCircle, Briefcase, Zap, Trophy, Target, ChevronDown, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock detailed data generator for any course since SITE_DATA doesn't have detailed arrays
const generateCourseDetails = (course) => {
    return {
        about: `The ${course.title} program is designed to take you from a foundational understanding to advanced professional mastery. Built by industry experts, this comprehensive program bridges the gap between theoretical knowledge and practical application. You will work on real-world projects, build a strong portfolio, and gain the exact skills employers are looking for right now. Join thousands of successful alumni who have transformed their careers with this highly intensive and hands-on curriculum.`,
        highlights: [
            "100% Placement Assistance & Profile Building",
            "1-on-1 Mentorship from Industry Experts",
            "Real-world Portfolio Projects",
            "Interactive Live Sessions with Q&A",
            "Lifetime Access to Course Materials",
            "Mock Interviews and Resume Reviews"
        ],
        curriculum: [
            {
                module: "Module 1: Foundations",
                desc: "Get started with the core concepts, setting up your environment, and understanding the absolute basics of the technology stack.",
                hours: "2 Weeks"
            },
            {
                module: "Module 2: Advanced Core Concepts",
                desc: "Deep dive into intermediate frameworks and syntax. Learn best practices and industry-standard patterns.",
                hours: "3 Weeks"
            },
            {
                module: "Module 3: Project Building",
                desc: "Apply your knowledge by building 3 real-world, production-level applications from scratch.",
                hours: "4 Weeks"
            },
            {
                module: "Module 4: Deployment & Career Prep",
                desc: "Learn to deploy your applications, optimize performance, and prepare your resume for technical interviews.",
                hours: "3 Weeks"
            }
        ],
        tools: course.tags || ["Varies by Course", "Industry Standard Tools"],
        stats: {
            placed: "94%",
            salary: "8LPA+",
            hiring: "200+"
        },
        faqs: [
            {
                q: "What are the prerequisites for this course?",
                a: "There are no strict prerequisites. A basic understanding of computers and a strong willingness to learn are all you need!"
            },
            {
                q: "Will I get a certificate after completion?",
                a: "Yes, you will receive an industry-recognized certificate along with performance badges that you can showcase on LinkedIn."
            },
            {
                q: "Do you provide job guarantee?",
                a: "We provide 100% placement assistance, which includes resume building, mock interviews, and direct referrals to our 200+ hiring partners."
            },
            {
                q: "Is this course live or recorded?",
                a: "This is a hybrid program featuring interactive live sessions with mentors, supplemented by high-quality recorded materials for lifetime access."
            }
        ]
    };
};

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [openModule, setOpenModule] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);
    const [course, setCourse] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const found = SITE_DATA.courses.find(c => c.id === id);
        if (found) {
            setCourse(found);
            setDetails(generateCourseDetails(found));
        }
    }, [id]);

    if (!course || !details) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    const mode = course.mode || "Online + Classroom";

    const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title,
        "description": details.about.slice(0, 150) + "...",
        "provider": {
            "@type": "Organization",
            "name": "Provisent EduTech",
            "sameAs": "https://provisent.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": String(course.rating),
            "reviewCount": String(course.students).replace(/[^0-9]/g, '') + "00" // converting things like 1.2K to 1200
        },
        "offers": [{
            "@type": "Offer",
            "category": "Paid",
            "priceCurrency": "INR",
            "price": String(course.price).replace(/[^0-9]/g, '') // remove currency symbol
        }]
    };

    return (
        <SEOWrapper
            title={`${course.title} Certification Program | Provisent`}
            description={details.about.substring(0, 150) + '...'}
            keywords={`${course.title}, ${course.category}, certification, online course, placement assistance`}
            url={`https://provisent.com/course/${course.id}`}
            image={course.image}
            schema={courseSchema}
        >
            <PageTransition>
                <div className="min-h-screen bg-background text-foreground pb-20 font-sans">

                    {/* 1. Hero Section */}
                    <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent blur-[100px]"></div>
                            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-500/10 blur-[100px]"></div>
                        </div>

                        <div className="container mx-auto px-4 md:px-6 relative z-10">
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                <div className="flex-1 w-full text-center lg:text-left space-y-6">
                                    <div className="inline-flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                                        <span className="px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                                            {course.category}
                                        </span>
                                        <div className="flex items-center bg-purple-500/10 px-3 py-1.5 rounded-full text-purple-400 text-xs font-bold border border-purple-500/20">
                                            <MonitorPlay className="w-4 h-4 mr-2" />
                                            {mode}
                                        </div>
                                        <div className="flex items-center text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-full text-xs font-bold border border-yellow-400/20">
                                            <Star className="w-4 h-4 fill-current mr-1" />
                                            {course.rating} Rating
                                        </div>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1]">
                                        {course.title}
                                    </h1>

                                    <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 font-medium">
                                        {`Master ${course.title} and launch your career in the tech industry. Professional grade curriculum with 100% placement support.`}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border">
                                                <Clock className="w-5 h-5 text-cyan-500" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Duration</p>
                                                <p className="text-sm font-bold">{course.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center border border-border">
                                                <Calendar className="w-5 h-5 text-purple-500" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] text-foreground/50 uppercase tracking-widest font-bold">Next Batch</p>
                                                <p className="text-sm font-bold">Enroll Now</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 border border-border rounded-xl px-4 py-2 bg-card-bg">
                                            <p className="text-xs text-foreground/60 font-bold mr-2 uppercase tracking-widest">Fee:</p>
                                            <p className="text-xl font-black text-cyan-400">{course.price}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            onClick={() => navigate('/enroll')}
                                            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105"
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 w-full relative max-w-lg mx-auto lg:max-w-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl transform -rotate-6"></div>
                                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card-bg">
                                        <div className="absolute inset-0 bg-black/40 mix-blend-overlay z-10"></div>
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full aspect-[4/3] object-cover scale-105 hover:scale-110 transition-transform duration-1000"
                                        />
                                        {/* Play button overlay mock */}
                                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                            <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                <MonitorPlay className="w-8 h-8 text-white ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">

                        {/* Left Column Content */}
                        <div className="lg:col-span-8 space-y-20">

                            {/* 2. About Course */}
                            <section id="about">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                    <BookOpen className="text-cyan-500" />
                                    About The Program
                                </h2>
                                <p className="text-foreground/70 leading-relaxed text-lg">
                                    {details.about}
                                </p>
                            </section>

                            {/* 3. Highlights */}
                            <section id="highlights">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                    <Zap className="text-purple-500" />
                                    Program Highlights
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {details.highlights.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-card-bg p-4 rounded-xl border border-border">
                                            <div className="mt-1 bg-cyan-500/20 rounded-full p-1 shrink-0">
                                                <CheckCircle className="w-4 h-4 text-cyan-400" />
                                            </div>
                                            <span className="font-medium text-foreground/80">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 4. Curriculum Syllabus */}
                            <section id="curriculum">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                    <Target className="text-pink-500" />
                                    Course Curriculum
                                </h2>
                                <div className="space-y-4">
                                    {details.curriculum.map((mod, idx) => (
                                        <div key={idx} className="border border-border rounded-xl bg-card-bg overflow-hidden transition-colors hover:border-cyan-500/50">
                                            <button
                                                onClick={() => setOpenModule(openModule === idx ? -1 : idx)}
                                                className="w-full flex items-center justify-between p-6 text-left"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-black text-sm shrink-0 border border-cyan-500/20">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="font-bold text-lg">{mod.module}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs font-black uppercase tracking-widest text-foreground/40 hidden sm:block">
                                                        {mod.hours}
                                                    </span>
                                                    <ChevronDown className={`w-5 h-5 text-cyan-500 transition-transform ${openModule === idx ? 'rotate-180' : ''}`} />
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {openModule === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-6 pt-0 border-t border-border/50 bg-foreground/[0.02]">
                                                            <p className="text-foreground/70 leading-relaxed">
                                                                {mod.desc}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 5. Tools & Technologies */}
                            <section id="tools">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                    <Award className="text-yellow-500" />
                                    Technologies Covered
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {details.tools.map((tool, idx) => (
                                        <span key={idx} className="px-5 py-2.5 bg-card-bg border border-white/10 rounded-xl font-bold text-sm tracking-wide shadow-sm hover:border-cyan-500/40 hover:-translate-y-1 transition-all cursor-default">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Right Column / Sidebar */}
                        <div className="lg:col-span-4 mt-12 lg:mt-0">
                            <div className="sticky top-32 space-y-8">

                                {/* 6. Placement Support Widget */}
                                <div className="bg-gradient-to-br from-[#0c1424] to-[#060a12] border border-cyan-500/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full"></div>
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 text-white">
                                        <Briefcase className="w-5 h-5 text-cyan-400" />
                                        Placement Support
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                            <p className="text-3xl font-black text-white">{details.stats.placed}</p>
                                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Placement Rate</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                            <p className="text-3xl font-black text-cyan-400">{details.stats.salary}</p>
                                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Avg Salary</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between mb-8">
                                        <span className="text-sm font-bold text-white/70">Hiring Partners</span>
                                        <span className="text-2xl font-black text-white">{details.stats.hiring}</span>
                                    </div>

                                    <button
                                        onClick={() => navigate('/enroll')}
                                        className="w-full py-3.5 bg-white text-black text-sm font-black uppercase tracking-widest rounded-xl hover:bg-cyan-500 hover:text-white transition-colors duration-300"
                                    >
                                        Start Application
                                    </button>
                                </div>

                                {/* 7. FAQ Section */}
                                <div className="bg-card-bg border border-border rounded-3xl p-8">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-purple-500" />
                                        Common FAQs
                                    </h3>
                                    <div className="space-y-3">
                                        {details.faqs.map((faq, idx) => (
                                            <div key={idx} className="border-b border-border/50 pb-2">
                                                <button
                                                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                                    className="w-full text-left py-2 font-bold text-sm flex justify-between items-center"
                                                >
                                                    <span className="pr-4">{faq.q}</span>
                                                    <ChevronDown className={`w-4 h-4 shrink-0 text-foreground/40 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {openFaq === idx && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-xs text-foreground/60 pb-3 leading-relaxed">
                                                                {faq.a}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </PageTransition>
        </SEOWrapper>
    );
};

export default CourseDetail;
