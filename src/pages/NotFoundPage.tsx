import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <span className="font-serif text-6xl sm:text-8xl font-bold text-brand-sand block">
        404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-charcoal">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-brand-charcoal/70 max-w-md mx-auto leading-relaxed">
        The event curation or page you are seeking may have moved or is no longer listed in our current catalog.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary" size="lg">
            Return To Eventora Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
