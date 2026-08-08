import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function SignInDrawer() {
  const { isSignInOpen, setSignInOpen } = useCart();
  const [phone, setPhone] = useState("");

  if (!isSignInOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setSignInOpen(false)}
      />
      {/* panel */}
      <div className="relative w-full max-w-sm h-full bg-white shadow-xl p-6 flex flex-col animate-slide-in">
        <button
          onClick={() => setSignInOpen(false)}
          className="self-end text-2xl leading-none text-swiggy-gray hover:text-swiggy-dark"
          aria-label="Close sign in"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-swiggy-dark mt-4">Sign in</h2>
        <p className="text-swiggy-gray text-sm mt-2">
          or{" "}
          <span className="text-swiggy-orange font-semibold cursor-pointer">
            create an account
          </span>
        </p>

        <div className="mt-8">
          <label className="text-xs font-semibold text-swiggy-gray uppercase tracking-wide">
            Mobile number
          </label>
          <div className="flex items-center border border-swiggy-border rounded-lg mt-2 overflow-hidden focus-within:border-swiggy-orange">
            <span className="px-3 text-swiggy-dark border-r border-swiggy-border bg-swiggy-lightGray h-11 flex items-center text-sm">
              +91
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit number"
              maxLength={10}
              className="flex-1 h-11 px-3 outline-none text-sm"
            />
          </div>
        </div>

        <button
          disabled={phone.length !== 10}
          className="mt-6 w-full h-11 rounded-lg bg-swiggy-orange text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-swiggy-orangeDark transition-colors"
          onClick={() => setSignInOpen(false)}
        >
          Continue
        </button>

        <p className="text-[11px] text-swiggy-gray mt-4 leading-relaxed">
          By continuing, you agree to Swiggy's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
