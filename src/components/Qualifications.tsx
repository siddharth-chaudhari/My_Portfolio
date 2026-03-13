import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BookOpen, Hexagon } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
    {
        id: 1,
        title: "Bachelor of Engineering in Computer Engineering",
        institution: "Pune University",
        year: "2021 - 2024",
        description: "Rigorous study in software engineering, data structures, and algorithms. Built a robust foundation in full-stack development and scalable system design.",
        icon: <BookOpen className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Diploma in Computer Science",
        institution: "Maharashtra State Board of Technical Education",
        year: "2019 - 2021",
        description: "Learned core computer science fundamentals, programming concepts, databases, and networking, gaining early hands-on experience in software development.",
        icon: <Hexagon className="w-6 h-6" />
    },
    /*
    {
        id: 3,
        title: "Certified Cloud Practitioner",
        institution: "AWS",
        year: "2023",
        description: "Validated overall understanding of the AWS Cloud platform, covering foundational cloud concepts and security.",
        icon: <Award className="w-6 h-6" />
    }
    */
];

export default function Qualifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".qual-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#050505] text-white w-full relative z-30">
            <div className="text-center mb-16 md:mb-24 qual-header">
                <p className="text-gray-400 uppercase tracking-widest text-sm mb-4 font-semibold">Education & Certifications</p>
                <h2 className="text-5xl md:text-6xl font-bold font-serif italic">Qualifications</h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {qualifications.map((item) => (
                    <div
                        key={item.id}
                        className="interactable bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-gray-500 transition-colors duration-500 group relative overflow-hidden"
                    >
                        {/* Subtle gradient glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6 text-gray-300 group-hover:text-white transition-colors duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center mb-4 text-sm font-serif italic">
                            <span className="text-gray-400">{item.institution}</span>
                            <span className="text-gray-500">{item.year}</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
