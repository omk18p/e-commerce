import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginPage from '@react-login-page/page10';
import { 
  Reset, 
  Submit, 
  Logo, 
  InnerBox, 
  Title, 
  TitleLogin, 
  TitleSignup, 
  Footer, 
  Email, 
  Password 
} from '@react-login-page/page10';
import { 
  selectLoggedInUser, 
  loginAsync, 
  selectLoginStatus, 
  selectLoginError, 
  clearLoginError, 
  resetLoginStatus,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus
} from '../AuthSlice';

export const ModernLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Login states
  const loginStatus = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  
  // Signup states
  const signupStatus = useSelector(selectSignupStatus);
  const signupError = useSelector(selectSignupError);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle user redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser, navigate]);

  // Handle login errors
  useEffect(() => {
    if (loginError) {
      toast.error(loginError.message);
    }
  }, [loginError]);

  // Handle signup errors
  useEffect(() => {
    if (signupError) {
      toast.error(signupError.message);
    }
  }, [signupError]);

  // Handle login success
  useEffect(() => {
    if (loginStatus === 'fulfilled' && loggedInUser?.isVerified === true) {
      toast.success('Login successful');
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [loginStatus, loggedInUser, dispatch]);

  // Handle signup success
  useEffect(() => {
    if (signupStatus === 'fulfilled') {
      toast.success("Welcome! Verify your email to start shopping on NovaMart.");
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [signupStatus, dispatch]);

  const handleLogin = (formData) => {
    const credentials = {
      email: formData.email,
      password: formData.password
    };
    dispatch(loginAsync(credentials));
  };

  const handleSignup = (formData) => {
    const credentials = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };
    dispatch(signupAsync(credentials));
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, 
          #0F0F23 0%, 
          #1A1A2E 25%, 
          #2A2B38 50%, 
          #F8FAFC 50%, 
          #E2E8F0 75%, 
          #FFFFFF 100%
        )
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
        `,
        zIndex: 0,
        animation: isLoaded ? 'fadeIn 1s ease-out' : 'none'
      }} />

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
            50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
          }

          .modern-login-page10 {
            --login-bg: transparent;
            --login-color: #FFFFFF;
            --login-inner-height: 520px;
            --login-inner-bg: rgba(26, 26, 46, 0.95);
            --login-input: #FFFFFF;
            --login-input-bg: rgba(15, 15, 35, 0.8);
            --login-input-placeholder: #94A3B8;
            --login-input-placeholder-active: #8B5CF6;
            --login-input-bg-hover: rgba(15, 15, 35, 0.9);
            --login-input-bg-focus: rgba(139, 92, 246, 0.1);
            --login-input-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            --login-btn: #FFFFFF;
            --login-btn-bg: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);
            --login-btn-focus: #FFFFFF;
            --login-btn-hover: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%);
            --login-btn-active: #6D28D9;
            --login-footer: rgba(255, 255, 255, 0.8);
            --login-icon-color: #8B5CF6;
            --login-icon-toggle-color: #8B5CF6;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: ${isLoaded ? 'fadeIn 0.8s ease-out, glow 3s ease-in-out infinite' : 'none'};
            position: relative;
            z-index: 10;
          }

          .modern-login-page10 section {
            background: transparent !important;
          }

          .modern-login-page10 section button {
            background: var(--login-btn-bg) !important;
            border: none !important;
            border-radius: 16px !important;
            font-weight: 600 !important;
            font-size: 1.1rem !important;
            padding: 16px 32px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: 0 8px 16px -4px rgba(139, 92, 246, 0.3) !important;
            position: relative;
            overflow: hidden;
          }

          .modern-login-page10 section button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }

          .modern-login-page10 section button:hover::before {
            left: 100%;
          }

          .modern-login-page10 section button:hover {
            background: var(--login-btn-hover) !important;
            box-shadow: 0 12px 24px -6px rgba(139, 92, 246, 0.4) !important;
            transform: translateY(-2px) !important;
          }

          .modern-login-page10 section button:focus {
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3) !important;
          }

          .modern-login-page10 section input {
            background: var(--login-input-bg) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 16px !important;
            color: var(--login-input) !important;
            padding: 18px 24px !important;
            font-size: 1rem !important;
            transition: all 0.3s ease !important;
            backdrop-filter: blur(10px) !important;
            position: relative;
          }

          .modern-login-page10 section input::placeholder {
            color: var(--login-input-placeholder) !important;
            transition: color 0.3s ease !important;
          }

          .modern-login-page10 section input:focus {
            background: var(--login-input-bg-focus) !important;
            border-color: #8B5CF6 !important;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
            transform: translateY(-1px) !important;
          }

          .modern-login-page10 section input:focus::placeholder {
            color: var(--login-input-placeholder-active) !important;
          }

          .modern-login-page10 section input:hover {
            background: var(--login-input-bg-hover) !important;
            transform: translateY(-1px) !important;
          }

          .modern-login-page10 .login-page10-inner {
            background: var(--login-inner-bg) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 24px !important;
            box-shadow: var(--login-input-shadow) !important;
            position: relative;
            overflow: hidden;
          }

          .modern-login-page10 .login-page10-inner::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.05) 50%, transparent 70%);
            animation: float 6s ease-in-out infinite;
            pointer-events: none;
          }

          .modern-login-page10 h1 {
            background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            font-weight: 800 !important;
            font-size: 2.5rem !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          }

          .modern-login-page10 h2 {
            color: #94A3B8 !important;
            font-weight: 500 !important;
            font-size: 1.1rem !important;
          }

          .modern-login-page10 a {
            color: #8B5CF6 !important;
            font-weight: 600 !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            position: relative;
          }

          .modern-login-page10 a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #8B5CF6, #A78BFA);
            transition: width 0.3s ease;
          }

          .modern-login-page10 a:hover::after {
            width: 100%;
          }

          .modern-login-page10 a:hover {
            color: #A78BFA !important;
            transform: translateY(-1px) !important;
          }

          .modern-login-page10 .login-page10-footer {
            color: var(--login-footer) !important;
            font-weight: 500 !important;
          }

          /* Animation for form elements */
          .modern-login-page10 section * {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          /* Loading state for buttons */
          .modern-login-page10 section button:disabled {
            opacity: 0.7 !important;
            cursor: not-allowed !important;
            animation: none !important;
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .modern-login-page10 {
              --login-inner-height: 480px;
            }
            
            .modern-login-page10 h1 {
              font-size: 2rem !important;
            }
          }

          /* Custom scrollbar */
          .modern-login-page10 ::-webkit-scrollbar {
            width: 8px;
          }

          .modern-login-page10 ::-webkit-scrollbar-track {
            background: rgba(15, 15, 35, 0.5);
            border-radius: 4px;
          }

          .modern-login-page10 ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #8B5CF6, #A78BFA);
            border-radius: 4px;
          }

          .modern-login-page10 ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #7C3AED, #8B5CF6);
          }
        `}
      </style>

      <LoginPage className="modern-login-page10">
        <Logo>
          <div style={{
            fontSize: '3.5rem',
            animation: isLoaded ? 'float 4s ease-in-out infinite' : 'none',
            filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))'
          }}>
            🛍️
          </div>
        </Logo>

        <Title>
          <TitleLogin>Welcome Back</TitleLogin>
          <TitleSignup>Join Us</TitleSignup>
        </Title>

        <InnerBox>
          {/* Login Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleLogin({
              email: formData.get('email'),
              password: formData.get('password')
            });
          }}>
            <Email 
              keyname="email" 
              index={1} 
              placeholder="Your Email"
              required
            />
            <Password 
              keyname="password" 
              index={2} 
              placeholder="Your Password"
              required
            />
            <Submit 
              keyname="login-submit"
              disabled={loginStatus === 'pending'}
            >
              {loginStatus === 'pending' ? 'Signing In...' : 'Sign In'}
            </Submit>
          </form>

          {/* Signup Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSignup({
              name: formData.get('name'),
              email: formData.get('signup-email'),
              password: formData.get('signup-password')
            });
          }}>
            <Email 
              panel="signup" 
              keyname="signup-email" 
              index={1}
              placeholder="Your Email"
              required
            />
            <Password 
              panel="signup" 
              keyname="name" 
              index={2}
              placeholder="Your Full Name"
              required
            />
            <Password 
              panel="signup" 
              keyname="signup-password" 
              index={3}
              placeholder="Your Password"
              required
            />
            <Submit 
              panel="signup" 
              keyname="signup-submit"
              disabled={signupStatus === 'pending'}
            >
              {signupStatus === 'pending' ? 'Creating Account...' : 'Sign Up'}
            </Submit>
          </form>
        </InnerBox>

        <Footer>
          <div style={{ 
            textAlign: 'center', 
            lineHeight: '1.6',
            animation: isLoaded ? 'fadeIn 1s ease-out 0.5s both' : 'none'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <div>
              <span>Need help? </span>
              <a href="/contact">Contact Support</a>
            </div>
          </div>
        </Footer>
      </LoginPage>
    </div>
  );
}; 