import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <span className="text-7xl sm:text-9xl font-black text-slate-200 block tracking-tight">
        404
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
        The equipment or page you are seeking may have moved or is no longer listed in our current catalog.
      </p>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md shadow-emerald-600/20" icon={<Home className="w-4 h-4" />}>
            Return to Evento Home
          </Button>
        </Link>
        <Link to="/rentals">
          <Button variant="outline" size="lg" className="font-bold border-slate-300" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Browse All Rentals
          </Button>
        </Link>
      </div>
    </div>
  );
};
