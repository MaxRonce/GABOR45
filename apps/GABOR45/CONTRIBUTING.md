# How to Contribute
Thank you for your interest in contributing to our Ionic React project that aims to connect organic farmers in the Loiret region. Your contributions are valuable in making this project a success. Here’s how you can contribute:

# Tabke of Content
- Prerequisites
- Setting up the Project Locally
- Making Contributions
-Submitting a Pull Request
- After Your Pull Request
- Best Practices
- Resources
- Branches Names

# Prerequisites
- Basic understanding of React and Ionic framework.
- Familiarity with Git and GitHub.
- Node.js and npm installed on your machine.
- (optional) Docker environnement

# Setting up the Project Locally

1.  **Fork the Repository:** Go to the GitHub repository and click on the 'Fork' button. This creates a copy of the repository in your GitHub account.

2. **Clone the Repository:** Clone the forked repository to your local machine. 

```bash
git clone https://github.com/MaxRonce/GABOR45.git
```
2. (Optional) **Re open the project in the Dockerfile** (Vs Code).
    - install Docker
    - open VsCode
    - install dependencies 
        - [Devcontainer](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
        - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
        - [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
    - Alt+shift+P -> ``Dev Container : Rebuild and Reopen in Container``


3. **Install dependencies** 
```bash
npm install
```

4. **Create a New Branch:** Before making changes, create a new branch. See [branches names](#branches-Names) conventions for more informations.

```bash
git checkout -b branch-name
```

# Making Contributions

1. **Make Changes:** Implement your feature, fix bugs, or make other changes to the codebase.

2. **Test Your Changes:** Ensure that your changes do not break any existing functionality. Test in different environments if possible.

3. **Commit Your Changes:** Once you're satisfied with your changes, commit them.


```bash
git add .
git commit -m "A brief description of the changes"
```

4. **Push to GitHub:** Push your branch to your GitHub repository.


```bash
git push origin branch-name
```

# Submitting a Pull Request
- **Pull Request:** Go to the original repository on GitHub. You'll see a 'Compare & pull request' button. Click on it.

- **Describe Your Changes:** Provide a detailed description of what changes you've made and why.

- **Submit:** Click on 'Create pull request'.

# After Your Pull Request
- Wait for the project maintainers to review your pull request. Be responsive to any feedback or requests for changes.
- Once reviewed and approved, a maintainer will merge your pull request.

# Best Practices
- Keep your pull requests small and focused on a single feature or bug fix.
- Follow the coding standards and guidelines of the project.
- Update your fork regularly to keep it in sync with the main project.

# Ressources 

- [GABOR45_app documentation](/apps/GABOR45/README.md)
- [Nx Monorepo doc](README.md)
- [Ionic React](https://ionicframework.com/docs/react)

# Branches Names

Each branch should be ascociated with an issue, a feature or any enhancement. Please respect the following convention for your branch name : 

```TAG-(flag)/branch_name```
- tag = FEAT / REFACTOR / BUG / DOC ...
- flag = #issue_number if it exist
- branch_name = should be precise and describe what is the goal of the branch


