import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal } from './AuthModal';

export function AuthButton() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      {user ? (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => signOut()}
            className="text-sm hover:text-[#C07732] transition-colors"
          >
            Sign Out
          </button>
          <User className="h-5 w-5" />
        </div>
      ) : (
        <button
          onClick={() => setShowAuthModal(true)}
          className="p-2 hover:bg-[#7A4928] rounded-lg transition-colors"
        >
          <User className="h-5 w-5" />
        </button>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}