## Setting Up a Config File for Spotify API

To set up a configuration file for the Spotify API, you'll need to create an app on the Spotify Developer Dashboard. Here's a step-by-step guide on how to do it:

### 1. Access the Spotify Developer Dashboard
Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).

### 2. Create a New App
Once you're on the dashboard, follow these sub-steps to create an app:

- **2.1 App Name:** Choose a name for your app based on your preferences.
  
- **2.2 App Description:** Similarly, provide a description that you deem fit.

- **2.3 App Website:** Set the website to `http://localhost:8080/`.

- **2.4 Redirect URIs:** Ensure that the Redirect URI is set as `http://localhost:8080/callback`.

- **2.5 Terms of Service Agreement:** Make sure to tick the checkbox next to `I agree to the Developer Terms of Service Agreement`.

- **2.6 Save Changes:** After entering all the required details, click on the `Save` button to store your app's details.

### 3. Refresh the Dashboard Page
Once your app details are saved, refresh the Spotify Developer Dashboard page to ensure all changes are properly updated.

### 4. Access Your App
Navigate to the list of apps and click on the app you just created to view its details.

### 5. Go to the Settings Page
After you're inside the app's dashboard, locate and click on the `settings` option/page.

### 6. Obtain the Credentials
On the settings page, you will find your app's `Client ID` and `Client Secret`. Copy these values and paste them respectively into the `oAuth.json` file.

### 7. Enjoy
With the configuration file now set up with your Spotify app credentials, you can now make use of the Spotify API as per your requirements.

Remember, always keep your `Client ID` and especially your `Client Secret` confidential to prevent unauthorized access to your Spotify app.

## Installing NPM Packages

Once you have set up the configuration file for the Spotify API, the next step is to install the required NPM packages to ensure smooth operation of your application.

Here's a step-by-step guide on how to do this:

### 1. Initialize NPM (If not already done)
If you haven't already initialized a package.json in your project, run:
```bash
npm init
```
Follow the prompts to set up your package.json. This file will keep track of all your project dependencies.

### 2. Install the Dependencies
To install the mentioned dependencies, use the following command:

```bash
npm install express query-string spotify-web-api-node
```

This will install the following packages:

- **express (v4.18.2):** A minimal and flexible web application framework for Node.js, providing a robust set of features for web and mobile applications. It helps in setting up the server, routing, middleware, and much more.

- **query-string (v8.1.0):** This package provides utilities to parse and stringify URL query strings. It's useful when you're dealing with URLs and need to extract or format parameters in a neat way.

- **spotify-web-api-node (v5.0.2):** An API wrapper for Spotify that makes it easier to call various Spotify endpoints from Node.js. This simplifies authentication, track retrieval, album listings, and other operations.

### 3. Verify Installation
After installing, you can check your `package.json` file to verify that these dependencies have been added. Under the `"dependencies"` section, you should see the packages you've just installed with their respective versions.