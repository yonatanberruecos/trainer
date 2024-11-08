// app/AmplifyProvider.tsx
'use client'; // Ensure this runs on the client side

import React, { ReactNode, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { COGNITO_CONFIG } from '../../aws-exports'

// Configure Amplify only once
Amplify.configure(COGNITO_CONFIG);

interface AmplifyProviderProps {
  children: ReactNode;
}

const AmplifyProvider: React.FC<AmplifyProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default AmplifyProvider;
