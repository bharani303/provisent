import { useState, useEffect } from 'react';
import { User, Phone, Mail, GraduationCap, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import './LeadModal.css';

const STORAGE_KEY = 'provisent_lead_seen';

/**
 * LeadModal - Professional Lead Generation Modal
 */
const LeadModal = ({ onComplete }) => {
    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', email: '', degree: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem(STORAGE_KEY)) {
            const t = setTimeout(() => {
                setVisible(true);
            }, 800);
            return () => clearTimeout(t);
        } else {
            if (onComplete) onComplete();
        }
    }, [onComplete]);

    if (!visible) return null;

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!/^\d{10}$/.test(form.phone.trim())) e.phone = '10-digit phone number is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Valid email is required';
        if (!form.degree.trim()) e.degree = 'Educational qualification is required';
        return e;
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setSubmitting(false);
        setSubmitted(true);

        setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
        }, 2000);
    };

    const handleClose = () => {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setVisible(false);
        if (onComplete) onComplete();
    };

    return (
        <div className="lm-overlay" aria-modal="true" role="dialog">
            <div className={`lm-card ${submitted ? 'lm-card--success' : ''}`}>
                <div className="lm-card__border-glow" />

                {!submitted && (
                    <button
                        className="lm-close"
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <X className="lm-close__icon" size={20} />
                    </button>
                )}

                {!submitted ? (
                    <>
                        <div className="lm-header">
                            <div className="lm-badge">Initial Consultation</div>
                            <h2 className="lm-title">Elevate Your Career with AI.</h2>
                            <p className="lm-sub">
                                Complete your professional profile to receive a tailored AI learning path and industry-recognized certifications.
                            </p>
                        </div>

                        <form className="lm-form" onSubmit={handleSubmit} noValidate>
                            <div className="lm-row">
                                <div className={`lm-group ${errors.name ? 'lm-group--error' : ''}`}>
                                    <label htmlFor="lm-name">Full Name</label>
                                    <div className="lm-input-wrap">
                                        <User className="lm-input-icon" size={18} />
                                        <input
                                            id="lm-name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />
                                    </div>
                                    {errors.name && <span className="lm-error">{errors.name}</span>}
                                </div>

                                <div className={`lm-group ${errors.phone ? 'lm-group--error' : ''}`}>
                                    <label htmlFor="lm-phone">Phone Number</label>
                                    <div className="lm-input-wrap">
                                        <Phone className="lm-input-icon" size={18} />
                                        <input
                                            id="lm-phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+91 00000 00000"
                                            value={form.phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            autoComplete="tel"
                                        />
                                    </div>
                                    {errors.phone && <span className="lm-error">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="lm-row">
                                <div className={`lm-group ${errors.email ? 'lm-group--error' : ''}`}>
                                    <label htmlFor="lm-email">Work Email</label>
                                    <div className="lm-input-wrap">
                                        <Mail className="lm-input-icon" size={18} />
                                        <input
                                            id="lm-email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                    </div>
                                    {errors.email && <span className="lm-error">{errors.email}</span>}
                                </div>

                                <div className={`lm-group ${errors.degree ? 'lm-group--error' : ''}`}>
                                    <label htmlFor="lm-degree">Highest Qualification</label>
                                    <div className="lm-input-wrap">
                                        <GraduationCap className="lm-input-icon" size={18} />
                                        <input
                                            id="lm-degree"
                                            name="degree"
                                            type="text"
                                            placeholder="Master of Engineering"
                                            value={form.degree}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.degree && <span className="lm-error">{errors.degree}</span>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`lm-submit ${submitting ? 'lm-submit--loading' : ''}`}
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <div className="lm-loader">
                                        <span className="lm-loader__circle"></span>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    <span className="lm-submit__text">
                                        Start Your Journey
                                        <ArrowRight className="lm-submit__arrow" size={20} />
                                    </span>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="lm-success">
                        <CheckCircle2 className="lm-success__icon" size={60} />
                        <h2 className="lm-success__title">Submission Successful</h2>
                        <p className="lm-success__sub">We've received your details. A specialist will match your profile with our upcoming cohorts shortly.</p>
                        <div className="lm-success__loader">
                            <div className="lm-success__loader-fill"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadModal;
