# Install

```bash
# Clone the seed code
$ git clone -b master --origin seed https://github.com/Auxionize/angular-jspm-ts-seed.git <your-project-name>

$ cd <your-project-name>

# Add reference to your git repo ...
$ git remote add origin <your-git-repo-url>

# ... and push the seed code there
$ git push -u origin master
```

Now you're good to go.

# Setup

```bash

$ npm install

# or (much faster)
$ yarn
```

# Development

```bash
$ gulp serve:dev
```

# Production Build

```bash
$ gulp build

# to serve the production build localy
$ gulp serve:dist
```

The build will be in `dist` directory.

Happy coding. :)
