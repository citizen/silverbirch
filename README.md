# README #

### What is this repository for? ###

* A project management tool to measure task cycletime.
* Version 0.0.1

### What tools are we using? ###

* [Firebase](http://www.firebase.com/)
* [node.js](http://nodejs.org/)
* [Mimosa](http://mimosa.io/)
* [React.js](http://facebook.github.io/react/)

### How do I get set up? ###

#### Summary

1. Install node.js
    * either [download the installer](http://nodejs.org/download/)
    * or `brew install node`
1. Clone this repo
    * `git clone git@bitbucket.org:jkillas/jkilla.git && cd jkilla`
1. Install the build tool
    * `npm install -g mimosa`
1. Run the build tool
    * `mimosa watch -s`
1. Check it out
    * <http://localhost:3000>

#### Clearing the project

If you make changes to config files and the changes aren't being picked up, run the following to nuke everything...

1. `mimosa clean -C`
2. `mimosa bower:clean --cache`
3. `rm -rf assets/{javascripts,stylesheets}/vendor`
4. `mimosa watch -cs`

Then you should be back up and running.

#### Configuration

N/A

#### How to run tests

Coming soon

#### Deployment instructions

If you're happy with your changes...

1. Install the firebase command line tools
    * `npm install -g firebase-tools`
2. Build the project
	1. Dev
		* `mimosa build`
	2. Prod
		* `mimosa build -P prod`
3. Deploy to Firebase
    * `firebase deploy`

### Contribution guidelines ###

Coming soon :

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact (see [CONTRIBUTORS](src/master/contributors.txt))

### Names ###

[Names](https://bitbucket.org/jkillas/jkilla/src/master/names.md)
