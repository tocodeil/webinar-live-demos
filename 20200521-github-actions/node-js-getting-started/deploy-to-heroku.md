# Automatically Deploy A Node.JS App To Heroku

Heroku is a Platform-As-A-Service provider which offers a free account and the ability to scale up. In this tutorial we'll deploy a Node.JS app to heroku using Github Actions so every new commit will automatically be deployed to a server.

In order to use the app locally, we'll need to instal its dependencies using:

```
$ npm install
```

And then we can start the server with:

```
$ npm start
```

Try and see you get a server running on your machine, and then let's continue to the deployment.

## Prerequisites: Install heroku toolkit
1. In order to work with Heroku we need a personal account and to install the CLI tools on our dev machien

2. Visit:
   https://www.heroku.com/
   And create an account

3. Download and install CLI tools according to the instructions here:
   https://devcenter.heroku.com/articles/heroku-cli

4. From the command line create an API key with:

```
heroku authorizations:create
```

## Setting up Github Action

1. Create a new Github Project and upload the content of this project

2. Enter "Actions" Tag and click on "set up a workflow yourself"

3. We'll use the Deploy To Heroku action here:
   https://github.com/marketplace/actions/deploy-to-heroku

4. Go to the action page and copy their example workflow yml to your main.yml file. Fill in the required personal details but not the API key.

5. Commit to save the file. Github will try to run your new action but will fail because we haven't yet provided an API key.

6. We'll use Github secrets to save Heroku API key. Go to project's Settings -> Secrets. Click on "New Secret". Type in the name `HEROKU_API_KEY` and the value is your heroku API token.

7. Go back to your action, click on the latest build tab (with the red x). Hidden on the right is a button to "rerun all jobs" (it's hiding inside a popup menu). Click it to try to deploy again.

8. If all went well your application is deployed to Heroku and started. Find in the logs the URL of the application and visit it to verify.

9. Now the fun part: Modify the code (for example change the file `views/pages/index.ejs`), commit and see your new version is deployed and running.
  - Remember: since we made changes via the web interface, if you want to work locally you need to first "pull" the latest version of the project.

10. Action Triggers:
  - We actually don't want to deploy on every commit to "master" branch since there will be many commits there
  - Create a new branch called "production"
  - Change your workflow so only commits to "production" branch will trigger the action

11. Staging Environment:
  - It'll be nice to add staging environment to our app.
  - Create a new branch called "staging"
  - Create a new workflow that deploys to a new application on every new commit to "staging" branch.
    (use your application name + "-staging" suffix)
  - Commit to "staging" branch and see you have that version online on Heroku
