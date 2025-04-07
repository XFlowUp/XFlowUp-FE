import React from 'react';
import { Metadata } from 'next';
import LoginButton from './components/LoginButton';
export const metadata: Metadata = {
  title: 'Login to XFlowUp | XFlowUp',
  description: 'Login to XFlowUp to access your dashboard and manage your account.',
};

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton />
    </div>
  );
}
