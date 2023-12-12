import path from 'path';

const config = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@menu': path.resolve(__dirname, './src/components/0 - Menu'),
      '@home': path.resolve(__dirname, './src/components/1 - Home'),
      '@search-activity': path.resolve(__dirname, './src/components/2 - Search Activity'),
      '@activity-details': path.resolve(__dirname, './src/components/3 - Activity Details'),
      '@personal-area': path.resolve(__dirname, './src/components/4 - Personal Area'),
      '@create-reservation': path.resolve(__dirname, './src/components/5 - Create Reservation'),
      '@reservation-list': path.resolve(__dirname, './src/components/6 - Reservation List'),
      '@reservation-details': path.resolve(__dirname, './src/components/7 - Reservation Details'),
      '@search-user': path.resolve(__dirname, './src/components/8 - Search User')
    },
  },
};

export default config;
