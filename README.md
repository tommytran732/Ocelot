# Notes: 
This is my repository with the modifications mentioned [here](https://github.com/umass-compsci220/Ocelot/issues/131) to self host it. I have also made it so that when you delete a file, it's also deleted from history.

To deploy, setup 2 subdomains for Ocelot. One for the frontend, one for the backend.

1. Set up GCP

Create a Project in Google Cloud Platform

Create 2 Google Storage Buckets with names of your choice. (One bucket is for user-created files, one is for storing history of the files)

Create a Google Datastore (Firestore in Datastore mode). In the Datastore, create an entity with the Kind set as AuthorizedEmails. Create Key Identifier with a Custom name and set it to the emails that are allowed to log into Ocelot.

2. Clone [this repository](https://github.com/tommytran732/ocelot-settings) on your Github and change the baseURL in [line 268](https://github.com/tommytran732/ocelot-settings/blob/441ddca1d6071718c4955691b2852293a101d434/src/lib220.ts#L268) in src/lib220.js and [line 241](https://github.com/tommytran732/ocelot-settings/blob/441ddca1d6071718c4955691b2852293a101d434/dist/lib220.js#L241) in dist/lib220.js to the URL where your backend will be listening on.

Change the links in your libraries.json the raw file links on your repo (Just change tommytran732 to your username).

3. Modify backend/ts/index.ts

Change the client id in [line 45](https://github.com/tommytran732/Ocelot/blob/479f73d76daf5a2e1fc2cdd51b3e231129552dc5/backend/ts/index.ts#L45) to your Google Auth Client ID.

Then, change the origin in [line 525](https://github.com/tommytran732/Ocelot/blob/d6e5c3b642b949878b790e2fe496f0a9ac91cee0/backend/ts/index.ts#L525) to the url that your 
Ocelot frontend will be running on.

Finally, change [line 18](https://github.com/tommytran732/Ocelot/blob/d6e5c3b642b949878b790e2fe496f0a9ac91cee0/backend/ts/index.ts#L18) and [line 19](https://github.com/tommytran732/Ocelot/blob/d6e5c3b642b949878b790e2fe496f0a9ac91cee0/backend/ts/index.ts#L19) to the bucket names that you will be using.

By default, the backend will be listening on port 8000. If there is a conflict, you can change it in [line 3]( https://github.com/tommytran732/Ocelot/blob/84d6d3000cf8136597009f630d31363f9813b89c/backend/ts/testServer.ts#L3) in the `backend/ts/testServer.ts` file.

4. Modify frontend/src/secrets.ts

CLD_FN_BASE_URL - Set the URL to the backend's address. It must be reachable over the internet. I would recommend that you setup an NGINX reverse proxy with https on the backend's subdomain for the backend rather than connecting to it directly.

LOGIN_CLIENT_ID - replace the entire URL to your Google Auth Client ID.

MODULE_WL_URL - Change this to the raw file of libraries.json in the repository which you cloned in step 2.

5. Building and running the frontend and backend

Follow the README for Build and Run instructions.

If you intend to run the back end with systemd, be sure to specify the GOOGLE_APPLICATION_CREDENTIALS variable to the json file generated while you run `gcloud auth application-default login` in the instructions below. By default, it should be at `/root/.config/gcloud/application_default_credentials.json`.

# Ocelot

A web-based IDE for JavaScript, without the "bad parts".

See [umass-compsci220.github.io/Ocelot/](https://umass-compsci220.github.io/Ocelot/) for an overview.

This is a README to get started hacking on Ocelot.

## Dependencies

1. You'll need the following:
    - [Node](https://nodejs.org/en/)
    - [Yarn](https://www.yarnpkg.com)
    - [Google Cloud SDK](https://cloud.google.com/sdk/)

1. Be sure you're authenticated on Google Cloud and on your computer:
    ```bash
    gcloud auth login
    gcloud auth application-default login
    ```
    If this is the only GCloud project you are working on, set the project to PLASMA:
    ```bash
    gcloud config set project arjunguha-research-group
    ```
    Else, you will have to manually specify the project ID when deploying the backend:
    ```bash
    yarn deploy --project arjunguha-research-group
    ```

## Build & Run Instructions
Follow these instructions to use the deployed versions of Stopify, and ElementaryJS with Ocelot.

To setup Ocelot frontend:

```bash
cd Ocelot/frontend && yarn install && yarn run build
```

To run Ocelot locally:

```bash
cd Ocelot/frontend
yarn run serve-local
```

To setup and run backend locally

```bash
cd Ocelot/backend
yarn install
yarn run build && yarn run serve
```

To setup file retention for history (change ocelot-ide-history in the following command to the bucket name which you use to store file history)
```
gsutil versioning set on gs://ocelot-ide-history
```

## Development Instructions

Occasionally, you will want to hack on ElementaryJS (EJS), and will want to test out your changes before deploying them. To do so:

1. Clone EJS: https://github.com/plasma-umass/elementaryJS/
1. Install dependencies of EJS and build it (from within the EJS dir):
    ```
    yarn install
    yarn build
    yarn test
    ```
1. Hack on EJS code, and re-build.
1. Tell yarn to make the local version of EJS available to other projects (still within the EJS dir):
    ```
    yarn link
    ```
    Yarn should then tell you:
    ```
    yarn link v1.10.1
    success Registered "@stopify/elementary-js".
    info You can now run `yarn link "@stopify/elementary-js"` in the projects where you want to use this package and it will be used instead.
    Done in 0.03s.
    ```
1. Change to the Ocelot frontend dir, delete any cached EJS libs, and tell yarn to use the local version of EJS:
    ```
    rm -rf node_modules/@stopify/elementary-js
    yarn link "@stopify/elementary-js"
    ```
    Yarn should tell you:
    ```
    yarn link v1.10.1
    success Using linked package for "@stopify/elementary-js".
    Done in 0.18s.
    ```
1. Compile the ocelot frontend, and deploy it locally:
    ```
    yarn build && yarn serve-local
    ```
1. Further changes to EJS will not require you to run the "link" steps again. Yarn remembers that you told it to use the local versions. Just recompile both EJS and the Ocelot frontend.

Once you are done hacking on the local EJS changes:
1. Push a PR to EJS with the updates and the version number updated in `package.json` for EJS.
1. Run `npm publish` to update the published version of EJS
1. Create an Ocelot PR to use the newly deployed version of EJS by editing the EJS version number in `package.json` in `Ocelot/frontend`
1. To tell yarn to go back to the published version of EJS:
In the `Ocelot/frontend` directory:
```
yarn unlink "@stopify/elementary-js"
yarn install
```

## Issues you may have

- Delete this directory: `rm -rf Ocelot/node_modules`

- There is a bug in the latest Yarn (1.7) that gives a stupid error when you
  use `yarn install` or `yarn add` after running `yarn link`:

  https://github.com/yarnpkg/yarn/issues/5876

  So, first run:

  ```
  yarn unlink stopify && yarn unlink elementary-js && yarn link stopify-continuations
  ```

  Then run `yarn install` or `yarn add ...`:

  then in `Ocelot/frontend`, run:

  ```
  yarn link stopify && yarn link elementary-js && yarn link stopify-continuations
  ```
