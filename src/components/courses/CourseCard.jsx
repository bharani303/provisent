import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MonitorPlay, ArrowRight } from 'lucide-react';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    // Generate fallback data if needed
    const mode = course.mode || "Online / Offline";
    const description = course.description || `Master the fundamentals and advanced concepts of ${course.title} with our industry-leading curriculum.`;

    return (
        <div
            onClick={() => navigate(`/course/${course.id}`)}
            className="group relative flex flex-col bg-card-bg backdrop-blur-md rounded-xl border border-border hover:border-transparent transition-all duration-500 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
        >
            {/* Gradient Border Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"></div>
            <div className="absolute inset-[1px] rounded-xl bg-card-bg z-0"></div>

            {/* Image Section */}
            <div className="relative h-48 z-10 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-neutral-800/20 animate-pulse"></div>
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md text-white rounded-md border border-white/10">
                        {course.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow z-10">
                <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 text-foreground group-hover:text-cyan-400 transition-colors duration-300">
                    {course.title}
                </h3>

                <p className="text-sm text-foreground/60 mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-xs font-semibold text-foreground/70 bg-foreground/5 px-2.5 py-1.5 rounded-md">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-cyan-500" />
                        {course.duration}
                    </div>
                    <div className="flex items-center text-xs font-semibold text-foreground/70 bg-foreground/5 px-2.5 py-1.5 rounded-md">
                        <MonitorPlay className="w-3.5 h-3.5 mr-1.5 text-purple-500" />
                        {mode}
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                    <span className="text-lg font-black text-foreground">
                        {course.price}
                    </span>
                    <button className="flex items-center gap-2 text-sm font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
