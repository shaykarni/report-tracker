import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from './firebase';

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const requestOtp = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', { size: 'invisible' }, auth);
    const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    setConfirmation(result);
  };

  const verifyOtp = async () => {
    const res = await confirmation.confirm(otp);
    onLogin(res.user); // Call parent component
  };

  return (
    <div>
      {!confirmation ? (
        <>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+972..." />
          <div id="recaptcha"></div>
          <button onClick={requestOtp}>Send Code</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter Code" />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}
    </div>
  );
};

export default Login;