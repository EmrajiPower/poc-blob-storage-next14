## Blob Storage App

It's a simple app using [Next.js 14](https://nextjs.org/blog/next-14) which contains a CRUD feature using the approach from Vercel's blob storage.
run the development server:

```bash
npm run dev
```

## Features Completed

- [x] Vercel Blow API Integration
- [x] CRUD API request: GET,POST,DELETE
- [x] Shacdn/ui
- [x] File size validation (Up to 5Mb)
- [x] State Management: Flux architecture

## Features in-progress

- [x] CRUD API request: UPDATE (Pencil Icon functionality)

### If you want to execute in your machine:
In you are looking for test the Vercel blob feature in your own clone repository follow these steps:

1. Enable vercel plugin in your Github repo, then enable [Blog storage](https://vercel.com/docs/storage/vercel-blob#getting-started)

1. install vercel-cli to handle setup local environment variables
```bash
npm i -g vercel
```

2. Add the scope and name of your project executing vercel prompt
```bash
vercel env pull .env.development.local
```
