'use strict';

// Inside of build.js:
const { generateSW } = require('workbox-build');

const swDest = 'build/sw.js';
generateSW({
  importWorkboxFrom: 'local',
  runtimeCaching: [
    {
      urlPattern: /.*/,
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 10 seconds.
        networkTimeoutSeconds: 2,
        // Use a custom cache name for this route.
        cacheName: 'slide-deck',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 42,
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
        },
        // Configure the broadcast cache update plugin.
        // broadcastUpdate: {
        //   channelName: 'my-update-channel',
        // },
        // Add in any additional plugin logic you need.
        // plugins: [
        //   { cacheDidUpdate: () => /* custom plugin code */ },
        // ],
      },
    },
  ],
  swDest,
  globDirectory: 'build',
  globPatterns: ['**/*'],
  // Other configuration options...
}).then(({ count, size }) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
