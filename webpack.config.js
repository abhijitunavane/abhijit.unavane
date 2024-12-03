import Dotenv from 'dotenv-webpack';

export const plugins = [
    new Dotenv({
        path: '.env', // Path to .env file
        systemvars: true, // Load system environment variables as well
    }),
];
