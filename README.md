 # Local Development Setup

## Technology stack

- Node 18.12.0

## Installation

### Requirements

Before you get started, the following needs to be installed:
  * **Node** 18.12.0
  * **NPM** 8.19.2
  * **nodemon** 2.0.20

### Requirements

### Setting up the development environment

1.  Get the code. Clone this git repository and check out the latest release:

    ```bash
    git clone git_repo_link
    cd project_folder
    ```

2.  Install nodemon by running the following command in the terminal:

    ```bash
    sudo npm install -g --force nodemon
    ```

3.  Install the required packages by running the following command in the project root directory:

    ```bash
    npm i
    ```

4.  Setup .env file, see the .env.example file
     ```bash
    Add the GITHUB_PERSONAL_ACCESS_TOKEN
    To get token follow the steps given bellow

    Go to your GitHub account's Personal Access Token settings

    Click on "Generate new token."

    Enter a token description, for example, "Repo Details API."

    In the "Select scopes" section, you only need the "public_repo" scope for this project. Check the box next to "public_repo."

    Click on "Generate token" at the bottom of the page.

    Copy the generated token. Be sure to store it securely as it will not be shown again.

    ```
    ```bash
    Add PORT
    PORT will be 3000
    ```

    ```bash
    Add API_VERSION
    which is /api/v1
```
   

4.  Run server:

    ```
    npm start
    ```

5. To run testcases:
    ```
    npm test
    ```

### API ENDPOINTS

1.  See endpoints on swagger by hitting http://localhost:3000/api/v1/api-docs


