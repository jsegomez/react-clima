function getEnvVar(name: string): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Revisa tu archivo .env`,
    );
  }

  return value;
}

export const env = {
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL'),
  apiKey: getEnvVar('VITE_API_KEY'),
} as const;