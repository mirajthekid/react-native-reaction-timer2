# Railway Deployment Guide for Expo Web

## 1. Build the Web App

```
npm run build
```
This will generate a `web-build` directory with your static site.

## 2. Serve the Web App (Locally)

```
npm run serve
```
This will serve the `web-build` directory at http://localhost:3000.

## 3. Deploy to Railway

- Go to [Railway](https://railway.app/)
- Create a new project from your GitHub repo (mirajthekid/reactinho)
- Set the **build command** to:
  ```
  npm run build
  ```
- Set the **start command** to:
  ```
  npm run serve
  ```
- Set the **output/public directory** to:
  ```
  web-build
  ```
- Choose **Node.js** as the environment (not Nixpacks)

## 4. Done!

Your Expo web app will be live on Railway as a static site.

---

**Note:**
- If you want a custom domain, set it up in Railway's dashboard.
- For any issues, check the Railway build logs or ask for help!
