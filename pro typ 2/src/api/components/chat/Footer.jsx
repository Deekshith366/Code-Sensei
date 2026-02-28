import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-4 text-center">
      <p className="text-xs text-slate-500 opacity-70 tracking-wide">
        Code Sensei © 2026 &nbsp;·&nbsp; Built with{' '}
        <span className="text-red-400">❤️</span> by{' '}
        <span className="text-slate-400 font-medium">Team Nexora</span>
      </p>
    </footer>
  );
}