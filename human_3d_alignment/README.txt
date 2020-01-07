This project is the app for performing an experiment where humans align two 3D ball-and-stick structures (models).


Before creating any widgets or other components that use Framsticks SDK,
the SDK needs to be prepared and present - see ../sdk/README.txt.

Once you have Framsticks SDK compiled to js, run the following commands in project root:
	bash
	npm install # for installing all required dependencies and preparing gulp task manager
	gulp        # for compiling all JSX and ES2015 files
	
To generate documentation:
	bash
	gulp doc

To synchronize the browser with your builds:
	bash
	gulp browser-sync

To just check the code for potential errors, use ESLint:
	bash
	gulp eslint

To make ESLint more or less strict, edit the .eslintrc file. Popular options for ES2015 and React:
 - Official ESLint rules: https://eslint.org/docs/rules/
 - Use ESLint Like a Pro with ES6 and React: http://www.zsoltnagy.eu/use-eslint-like-a-pro-with-es6-and-react/
 - eslint-plugin-react: https://www.npmjs.com/package/eslint-plugin-react
 - eslint-plugin-babel: https://github.com/babel/eslint-plugin-babel


You can edit sources with Visual Studio Code. It will allow you to debug with 
Google Chrome after a basic setup. Debugging (using Debugger for Chrome Extension)
is facilitated by the JSON file in the .vscode directory. 

The .vscode directory is optional and can be removed or replaced by an automatic JSON generator.
Still, it already contains a universal configuration for easy debugging.

If breakpoints do not work for you, there may be a problem with source 
mapping - look for solutions in gulp-sourcemaps documentation (https://github.com/gulp-sourcemaps/gulp-sourcemaps) 
and VS Code Debugger for Chrome (https://github.com/Microsoft/vscode-chrome-debug).
