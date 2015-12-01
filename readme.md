# Tree iteration #

The task for this small project is to implement tree iteration using two different methods: iterative and recursive.

## Get started ##

To get started with this app you first have to install Node modules dependencies.

    npm install
    
To run app you can use any web server and serve public directory
 
## Grunt build tasks ##

This project has some grunt tasks. First you need to add JavaScript and Style dependencies
 
For development version:

    grunt build:dev
    
For release:

    grunt build:release
    
This this concatenate source files, minify them and add it to index.html file

## Grunt watch tasks ##

This task needs to run during your development. It does:

* builds css files is any of scss is changed
* runs tests each time source or test file is changed

## Grunt test ##

    grunt test
    
Will run tests on demand.

