# Nx Monorepo for Ionic React Application GABOR45
This monorepo hosts the Ionic React application named GABOR45. It's designed to streamline development, testing, and deployment using Nx, a powerful toolkit for modern monorepo development.

## Getting Started
To begin working with this monorepo, follow the steps below:

## Prerequisites
- Node.js (specify version)
- npm/yarn (specify version or preference)
- Nx CLI (Install with npm install -g nx or yarn global add nx)

## Installation

Clone this repository:
```bash
git clone https://github.com/MaxRonce/GABOR45.git
```

Install dependencies at the monorepo root:
```
npm install
```
or
```
yarn install
```

## Quick Start
To launch the GABOR45 application:

```bash
npx nx run GABOR45:serve
```
For more details, refer to the GABOR45 application README.

## Monorepo Structure
`/apps/gabor45` - Contains the source code for the Ionic React GABOR45 application.
/packages - Packages for documentation and E2E tests.

## Build the app

### Android
- Make sure to have [Android Studio]() installed.
- Run the following commands :
 ```bash
 npx nx cap build
 ```
  ```bash
 npx nx cap sync
 ```
 if your studio64.exe is added to PATH as CAPACITOR_ANDROID_STUDIO_PATH you can run : 
  ```bash
 npx nx cap open android
 ```
- Otherwise, open android studio and open the folder apps/GABOR45/android as project in Android Studio
- Build and generate the .apk

## Testing
This monorepo is configured with tools to run various types of tests:

- **Unit Tests:** ```npx nx test gabor45```
- Integration Tests: (specific instructions if different from unit tests)
- Functional Tests: (specific instructions)
- **E2E Tests:**  ```npx nx e2e gabor45-e2e```

## Documentation

TODO maybe delete this part

Documentation for the code, architecture, and user manuals can be generated using:

Copy code
nx run gabor45:document
Generated documents will be available in the /docs folder.

## Continuous Integration (CI)
We use (CI Service Name) for our CI/CD pipeline, which handles:

- Dependency installation.
- Running tests.
- Lint ```nx run GABOR45:lint```
- Generating documentation.
- Creating and storing artifacts.
To view the results of the latest builds, visit (link to the CI dashboard).

## Contributing
To contribute to this project, please follow our detailed contribution guide in CONTRIBUTING.md.

Ensure you adhere to our branch naming convention and commit rules. All Pull Requests must pass CI tests and undergo peer review before merging.

Contact and Support
Project Lead: Maxime RONCERAY 

Technical Support: Maxime RONCERAY - Louis NOEL - Damien RABIER - Andres ORTIZ

For assistance or to report an issue, please open a ticket in the Issues section of the repository.
