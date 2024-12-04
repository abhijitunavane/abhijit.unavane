import { Configuration, EnvironmentPlugin } from 'webpack';
import dotenv from 'dotenv';

dotenv.config();

export default {
  plugins: [
    new EnvironmentPlugin([
              'SUPABASE_URL',
              'SUPABASE_KEY'
          ])
        ],
} as Configuration;
