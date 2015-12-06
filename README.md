# App Template
HTML template including [bootstrap](http://getbootstrap.com/), [sass](http://sass-lang.com/guide), [gulp](http://gulpjs.com/) tasks with [browsersync](http://www.browsersync.io/). Which helps you to auto refresh your browser after every change

##Install
`npm install`


##Start App Locally
`npm run start-dev`

Once the gulp start run, you can access it on a browser by going to the web page [http://localhost:3010](http://localhost:3010)

`gulp start-dev` will take care of `sass to css` conversion and auto refresh the browser on every change in html and css file.


##Gulp Commands
`npm run start-dev` - run application locally.

`npm run clean` - run to clean build folder.

`npm run build` - create production ready code. It will move files into `.tmp/build`.

`npm run start-build` - run application with production ready code.
