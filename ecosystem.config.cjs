/**
 * PM2 process file for the VPS. Start with: pm2 start ecosystem.config.cjs
 * The app listens on 127.0.0.1:3000; Nginx sits in front of it.
 */
module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
