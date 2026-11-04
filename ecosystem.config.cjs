/**
 * PM2 process file for the VPS. Start with: pm2 start ecosystem.config.cjs
 *
 * The app listens on 127.0.0.1 only; Nginx sits in front of it. The port
 * defaults to 3001 (3000 is often taken by another app on the same VPS).
 * To use another one: pm2 delete portfolio, then PORT=3005 pm2 start ecosystem.config.cjs
 * and change proxy_pass in the Nginx config to match.
 */
const PORT = process.env.PORT || "3001"

module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "node_modules/next/dist/bin/next",
      args: `start -H 127.0.0.1 -p ${PORT}`,
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
