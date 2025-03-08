import { redirect } from 'next/navigation';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        redirect(process.env.AUTH_REDIRECT_URL || '/');
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
