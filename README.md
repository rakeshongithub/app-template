# App Template
HTML template including [bootstrap](http://getbootstrap.com/), [sass](http://sass-lang.com/guide), [gulp](http://gulpjs.com/) tasks with [browsersync](http://www.browsersync.io/). Which helps you to auto refresh your browser after every change

##Install
`npm install`


##Start App Locally
`gulp start-dev`

Once the gulp start run, you can access it on a browser by going to the web page [http://localhost:3010](http://localhost:3010)
`gulp start-dev` will take care of `sass to css` conversion and auto refresh the browser on every change in html and css file.


##Gulp Commands
`gulp start-dev` - run application locally.

`gulp clean` - run to clean build folder.

`gulp build` - create production ready code. It will move files into `.tmp/build`.

`gulp start-build` - run application with production ready code.
