# App Template
HTML template including [bootstrap](http://getbootstrap.com/), [sass](http://sass-lang.com/guide), [gulp](http://gulpjs.com/) tasks with [browsersync](http://www.browsersync.io/). Which helps you to auto refresh your browser after every change

##Install
`npm install`


##Start app
`gulp start`

Once the gulp start run, you can access it on a browser by going to the web page [http://localhost:3010](http://localhost:3010)

`Gulp Start` will take care of `sass to css` conversion and auto refresh the browser on every change in html and css file.


##Check JShint
`gulp lint`


##Gulp Build
`gulp build`

It will move build files into `.temp/build` folder. You can run build files with `gulp start-build`. You can use `gulp clean` to clean `.tmp` folder for fresh build.
