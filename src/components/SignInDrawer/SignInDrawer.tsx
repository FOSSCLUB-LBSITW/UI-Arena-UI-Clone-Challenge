import { useState } from 'react';
import { X } from 'lucide-react';
import { useUI } from '../../hooks/useUI';

export default function SignInDrawer() {
  const { isSignInOpen, closeSignIn } = useUI();
  const [phone, setPhone] = useState('');

  if (!isSignInOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={closeSignIn}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-pop animate-slide-in-right sm:max-w-md">
        <button
          onClick={closeSignIn}
          aria-label="Close sign in"
          className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-surface sm:left-8"
        >
          <X size={20} />
        </button>

        <div className="flex flex-1 flex-col justify-center px-8 sm:px-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">Login</h2>
              <p className="mt-1.5 text-sm text-ink-light">
                or{' '}
                <button type="button" className="font-semibold text-brand">
                  create an account
                </button>
              </p>
              <span className="mt-3 block h-0.5 w-8 bg-ink" />
            </div>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-light text-3xl">
              🌯
            </span>
          </div>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              closeSignIn();
            }}
          >
            <div className="flex items-center rounded-lg border border-line px-3 focus-within:border-ink-faint">
              <span className="pr-2 text-sm text-ink-light">+91</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="Phone number"
                aria-label="Phone number"
                className="w-full border-l border-line py-3 pl-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={phone.length !== 10}
              className="mt-5 w-full rounded-lg bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Login
            </button>

            <p className="mt-5 text-xs leading-relaxed text-ink-faint">
              By clicking on Login, I accept the{' '}
              <button type="button" className="font-semibold text-ink underline">
                Terms &amp; Conditions
              </button>{' '}
              &amp;{' '}
              <button type="button" className="font-semibold text-ink underline">
                Privacy Policy
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
