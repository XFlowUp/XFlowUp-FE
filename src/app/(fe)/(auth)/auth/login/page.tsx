import React from 'react';
import { Metadata } from 'next';
import LoginButton from './components/LoginButton';
export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
};

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton />
    </div>
  );
}
