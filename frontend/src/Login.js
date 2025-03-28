import React, { useState } from 'react';

const GoogleIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    style={{marginRight: '0.5rem'}}
  >
    <path 
      fill="#4285F4" 
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
    />
    <path 
      fill="#34A853" 
      d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.75c-.99.67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path 
      fill="#FBBC05" 
      d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path 
      fill="#EA4335" 
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.86-2.59 3.29-4.53 6.16-4.53z"
    />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', email, password);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in initiated');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(147, 192, 228)',
      backgroundImage: 'url("/bg.png")', 
      //backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      padding: '1rem'
    },
    loginWrapper: {
      width: '100%',
      maxWidth: '64rem',
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    illustrationContainer: {
      width: '50%',
      backgroundColor: '#e6f2ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    illustrationInner: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    illustrationImage: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    formContainer: {
      width: '50%',
      padding: '3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    welcomeTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    inputGroup: {
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solidrgb(12, 18, 27)',
      borderRadius: '0.5rem',
      backgroundColor: 'rgb(248, 244, 217)',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' // This prevents layout shift
    },
    inputFocused: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    },
    loginButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      textAlign: 'center',
      fontSize: '1rem',
      fontWeight: 'bold'
    },
    loginButtonHover: {
      backgroundColor: '#2563eb'
    },
    orDivider: {
      textAlign: 'center',
      color: '#6b7280',
      margin: '0.5rem 0'
    },
    googleSignInButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem',
      backgroundColor: 'white',
      border: '2px solid rgb(30, 32, 35)',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      cursor: 'pointer'
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '1rem',
      color: '#6b7280'
    },
    signInText: {
      color: '#3b82f6',
      marginLeft: '0.25rem',
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginWrapper}>
        {/* Left Side - Illustration */}
        <div style={styles.illustrationContainer}>
          <div style={styles.illustrationInner}>
            <img 
              src="/cep%20img.svg" 
              width="500" 
              height="400" 
              alt="Login Illustration" 
              style={styles.illustrationImage}
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.formContainer}>
          <h1 style={styles.welcomeTitle}>WELCOME</h1>
          
          <form onSubmit={handleEmailLogin} style={styles.loginForm}>
            <div style={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  ...styles.input,
                  ...(isEmailFocused ? styles.inputFocused : {})
                }}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <input 
                type="password" 
                placeholder="Enter Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  ...(isPasswordFocused ? styles.inputFocused : {})
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
              />
            </div>

            <div style={styles.inputGroup}>
            <button 
            type="submit"
            style={styles.loginButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginButton.backgroundColor}
            >
            Login
          </button>
            </div>
            
            <div style={styles.orDivider}>
              <span>OR</span>
            </div>
            
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              style={styles.googleSignInButton}
            >
              <GoogleIcon />
              Continue with Google
            </button>
            
            <div style={styles.signupLink}>
              <span>
                Already have an account? 
                <a 
                  href="/signin" 
                  style={styles.signInText}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Sign in
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;