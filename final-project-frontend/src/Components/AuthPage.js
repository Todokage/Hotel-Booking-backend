import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock database of users
const mockUsers = [
  {
    id: 1,
    name: 'Andrew',
    email: 'ftdraco176@gmail.com',
    password: '123456' 
  }
];

const AuthPage = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!isLogin && !formData.name) {
        throw new Error('Please enter your name');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let response;
      if (isLogin) {
        response = await mockLogin(formData.email, formData.password);
      } else {
        response = await mockSignup(formData.name, formData.email, formData.password);
      }
      
      if (response.success) {
        setUser(response.user);
        onClose();
        toast.success(`Welcome ${response.user.name}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock login function
  const mockLogin = (email, password) => {
    return new Promise((resolve) => {
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        resolve({
          success: false,
          message: 'User not found'
        });
        return;
      }
      
      if (user.password !== password) {
        resolve({
          success: false,
          message: 'Incorrect password'
        });
        return;
      }
      
      resolve({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: 'mock-jwt-token'
        }
      });
    });
  };

  // Mock signup function
  const mockSignup = (name, email, password) => {
    return new Promise((resolve) => {
      // Check if user already exists
      const userExists = mockUsers.some(u => u.email === email);
      
      if (userExists) {
        resolve({
          success: false,
          message: 'Email already in use'
        });
        return;
      }
      
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password // In real app, this would be hashed
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      
      resolve({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          token: 'mock-jwt-token'
        }
      });
    });
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      position: 'relative',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#666',
          padding: '0.25rem',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          ':hover': {
            background: '#f0f0f0',
            color: '#333'
          }
        }}
        aria-label="Close authentication modal"
      >
        &times;
      </button>
      
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter your name"
              required
            />
          </div>
        )}
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter your password"
            required
            minLength="6"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(90deg,#4ea8de,#4361ee)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem',
            opacity: isLoading ? 0.7 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          {isLoading ? (
            'Processing...'
          ) : isLogin ? (
            'Login'
          ) : (
            'Sign Up'
          )}
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                email: '',
                password: '',
                name: ''
              });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#4361ee',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.9rem'
            }}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;