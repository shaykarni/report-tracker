import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from './firebase';

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');

  const sendCode = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
        size: 'invisible',
        callback: () => {}
      }, auth);

      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(result);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to send code. Make sure the phone number is correct.');
    }
  };

  const verifyCode = async () => {
    try {
      const result = await confirmation.confirm(otp);
      onLogin(result.user); // Callback to App.js
    } catch (err) {
      console.error(err);
      setError('Invalid code.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      {!confirmation ? (
        <>
          <h2 className="text-xl mb-4">Enter your phone number</h2>
          <input
            className="p-2 border mb-4 w-full"
            type="tel"
            placeholder="+972..."
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <div id="recaptcha"></div>
          <button onClick={sendCode} className="bg-blue-500 text-white px-4 py-2 rounded">Send Code</button>
        </>
      ) : (
        <>
          <h2 className="text-xl mb-4">Enter the verification code</h2>
          <input
            className="p-2 border mb-4 w-full"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyCode} className="bg-green-500 text-white px-4 py-2 rounded">Verify</button>
        </>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
