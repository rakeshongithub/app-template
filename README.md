# App Template
HTML template including [bootstrap](http://getbootstrap.com/), [sass](http://sass-lang.com/guide), [gulp](http://gulpjs.com/) tasks with [browsersync](http://www.browsersync.io/). Which helps you to auto refresh your browser after every change

##Install
`npm install`


##Start App Locally
`npm run startdev`

Once the gulp start run, you can access it on a browser by going to the web page [http://localhost:3010](http://localhost:3010)

`npm run startdev` will take care of `sass to css` conversion and auto refresh the browser on every change in html and css file.


##Gulp Commands
`npm run startdev` - run application locally.

`npm run clean` - run to clean build folder.

`npm run build` - create production ready code. It will move files into `.tmp/build`.

`npm run startprod` - run application with production ready code.


##Used Gulp Autoprefixer

Write your CSS rules without vendor prefixes (in fact, forget about them entirely):

Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. You can try the [interactive demo](http://autoprefixer.github.io/) of Autoprefixer.

###Input CSS

```sh
:fullscreen a {
    display: flex
}
```

###Output by Autoprefixer CSS

```sh
:-webkit-full-screen a {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex
}
:-moz-full-screen a {
    display: flex
}
:-ms-fullscreen a {
    display: -ms-flexbox;
    display: flex
}
:fullscreen a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}
```