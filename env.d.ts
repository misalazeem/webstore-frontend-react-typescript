/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_API: string; // Replace with your variable names
    // ... other environment variables
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  