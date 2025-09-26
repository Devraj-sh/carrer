import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  ageGroup: z.string().min(1, 'Please select an age group')
});

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, signUp, signIn, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    ageGroup: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      if (isLogin) {
        const result = signinSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.issues.forEach(error => {
            fieldErrors[error.path[0] as string] = error.message;
          });
          setErrors(fieldErrors);
          setSubmitting(false);
          return;
        }
        await signIn(formData.email, formData.password);
      } else {
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.issues.forEach(error => {
            fieldErrors[error.path[0] as string] = error.message;
          });
          setErrors(fieldErrors);
          setSubmitting(false);
          return;
        }
        await signUp(formData.email, formData.password, formData.name, formData.ageGroup);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 flex items-center justify-center">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-card p-8 rounded-lg shadow-card border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back!' : 'Join the Challenge'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? 'Sign in to continue your AI journey' : 'Create your account to start competing'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input 
                  type="password" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-foreground">Age Group</label>
                  <select 
                    className={`w-full p-2 border border-border rounded-md bg-background ${errors.ageGroup ? 'border-destructive' : ''}`}
                    value={formData.ageGroup}
                    onChange={(e) => setFormData(prev => ({ ...prev, ageGroup: e.target.value }))}
                  >
                    <option value="">Select age group</option>
                    <option value="student">Student (10-17)</option>
                    <option value="adult">Adult (18+)</option>
                  </select>
                  {errors.ageGroup && <p className="text-sm text-destructive mt-1">{errors.ageGroup}</p>}
                </div>
              )}

              <Button 
                variant="hero" 
                className="w-full" 
                size="lg"
                type="submit"
                disabled={submitting || loading}
              >
                {submitting ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="text-center mt-6">
              <button 
                className="text-primary hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;