import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';

export function Auth() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="https://cdn.prod.website-files.com/64eda991d8d82729ed0120e8/64eda991d8d82729ed0127f0_Mereka.io%20Logo_HBlack.png"
          alt="Mereka"
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4F46E5',
                    brandAccent: '#4338CA',
                  },
                },
              },
              style: {
                button: {
                  borderRadius: '0.375rem',
                  padding: '0.625rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                },
                container: {
                  gap: '1rem',
                },
                divider: {
                  margin: '1.5rem 0',
                },
                label: {
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                },
                input: {
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.875rem',
                  borderColor: '#D1D5DB',
                },
              },
            }}
            providers={['google']}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </div>
      </div>
    </div>
  );
}