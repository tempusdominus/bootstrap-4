Submitting Issues
=================

If you are submitting a bug, please test and/or fork [this JSFiddle](https://jsfiddle.net/nmocbjLf/1/) demonstrating the issue.
In your Pull Request (PR), describe the use case and provide a link to your forked JSFiddle and possibly provide a code example in the PR itself.

Issues that are submitted without a description (title only) will be closed with no further explanation.

Contributing code
=================

PRs are welcome.

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

To contribute, fork the library and install dependencies. You will need [node](http://nodejs.org/).
You can use [nvm](https://github.com/nvm-sh/nvm) or [nenv](https://github.com/ryuone/nenv) to install it.

Then, run the following commands:

```bash
git clone https://github.com/tonix-tuft/tempusdominus-bootstrap.git
cd tempusdominus-bootstrap
npm install -g grunt-cli
npm install
npm run watch
```

Very important notes
====================

 * **Please submit your pull requests to a new branch** (you may call it like you want, just choose a name that describes your feature/bugfix).
 * **You don't have to include the minified files in your pull request** (by running `npm run build-all`). Don't worry, we'll build them when we bump a new version.
