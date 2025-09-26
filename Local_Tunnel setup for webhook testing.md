# Localtunnel Setup for Webhook Testing

## Quick Start

### 1. Install localtunnel
```bash
npm install -g localtunnel
```

### 2. Start your Next.js app
```bash
npm run dev
```

### 3. Start the tunnel (in a new terminal)
```bash

#  Manual command
lt --port 3000

```

### 4. Configure Clerk Webhook
1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → Webhooks
2. Add endpoint: `https://your-app-name.loca.lt/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`
4. Copy the webhook secret(signing secret)

### 5. Update environment variables
Add to your `.env.local`:
```env
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Troubleshooting

**"lt is not recognized"**
- Make sure you installed localtunnel globally: `npm install -g localtunnel`

**"Tunnel not accessible"**
- Check that your Next.js app is running on port 3000
- Make sure the tunnel URL is correct in Clerk dashboard

**"Webhook not firing"**
- Verify the webhook endpoint URL in Clerk dashboard
- Check that your middleware allows the webhook route as public



