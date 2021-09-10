# Serverless Headless CMS using Firebase

![demo](https://user-images.githubusercontent.com/623449/94364347-87372580-0103-11eb-80fd-341231ebe19c.gif)

Demo: [Vercel](https://serverless-headless-cms.vercel.app/) / [Firebase Hosting](https://serverless-headless-cms.web.app/)

## Development

Create .env file.

```bash
NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"AIzaSy..."}
```

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

```bash
git clone https://github.com/yamitzky/serverless-headless-cms.git
cd serverless-headless-cms

# create and edit .env, or set environment variable
NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"AIzaSy..."}
# Optional: configure CMS
NEXT_PUBLIC_CMS_CONFIG={"resourcesPath":"{{rid}}","resourcePath":"{{rid}}/{{iid}}","userAppsPath":"users/_/applications","userAppPath":"users/_/applications/{{id}}","title":"Your CMS","hideGitHubLogo":true,"hideLandingPage":true,"authMethods":["google"],"singleProject":true,"schemaPermission":"owner","securityPermission":"owner"}

# deploy to firebase
yarn install
yarn deploy --project {project_id}
# yarn deploy --project {project_id} --site {site_id}
```
