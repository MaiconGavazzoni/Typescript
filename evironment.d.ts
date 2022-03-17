declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_BUCKET: string;
      AWS_BUCKET_REGION: string;
      AWS_BUCKET_URL: string;
      APP_API_URL: string;
      AWS_REGION: string;
      DISK: 'local' | 's3';
      MAIL_PROVIDER: string;
      NODE_ENV: string;
      REDIS_HOST: any;
      REDIS_PORT: number;
      REDIS_PASSWORD: string;
    }
}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
