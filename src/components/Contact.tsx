import React, { useState } from 'react';
import { Send, Github, Linkedin, Users } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitError('There was an error sending your message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-violet-50 via-purple-50/80 to-indigo-50/60 dark:from-background-dark dark:to-surface-dark">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential collaboration? 
            Feel free to reach out and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Send A Message - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                    <Send size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Send A Message
                  </h3>
                </div>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg text-accent-800 dark:text-accent-200">
                    Your message has been sent successfully! I'll respond as soon as possible.
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                    {submitError}
                  </div>
                )}
                
                <form 
                  name="contact" 
                  method="POST" 
                  
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  netlify
                >
                  {/* Hidden fields for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-surface-dark text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors backdrop-blur-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-surface-dark text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-surface-dark text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors backdrop-blur-sm"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Your Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-surface-dark text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors resize-none backdrop-blur-sm"
                      placeholder="Tell me about your project or idea..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 ${
                        isSubmitting 
                          ? 'bg-neutral-400 dark:bg-neutral-600 cursor-not-allowed shadow-soft' 
                          : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 shadow-medium hover:shadow-strong'
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message 
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Connect with Me - Takes up 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                    <Users size={24} className="text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Connect with Me
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Let's connect and explore opportunities together. Follow me on social media 
                    or reach out directly via email.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-neutral-800 dark:text-neutral-100 font-medium mb-2">Email</h4>
                      <a 
                        href="mailto:farhan45778@gmail.com" 
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium"
                      >
                        farhan45778@gmail.com
                      </a>
                    </div>
                    
                    <div>
                      <h4 className="text-neutral-800 dark:text-neutral-100 font-medium mb-2">Location</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <h4 className="text-neutral-800 dark:text-neutral-100 font-medium mb-4">Social Links</h4>
                    <div className="flex gap-3">
                      <a 
                        href="https://github.com/MuhammadFarhanA" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group text-center"
                        aria-label="GitHub Profile"
                      >
                        <Github size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">GitHub</span>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/muhammad-farhan-atif/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group text-center"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;