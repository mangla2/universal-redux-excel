'use strict';
require('babel-register')({
  presets: ['es2015', 'react','stage-2']
});

require.extensions['.css'] = () => {
  return;
};

const jsdom = require('jsdom').jsdom;
let localStorage
global.document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = document.defaultView;
global.XMLHttpRequest = window.XMLHttpRequest;
global.navigator = window.navigator;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./uls-scratch');
}else if (typeof window.localStorage === 'undefined' ||
  typeof window.sessionStorage === 'undefined') {
  localStorage = require('./rem-localstorage')
}
 else{

   localStorage = window.localStorage;

}

const express = require('express');
const webpack= require('webpack');
const app = express();
const path= require('path');
var config = require('./webpack.config');
const prodConfig=require('./webpack.config.prod.js');
const React=require('react');
const ReactDOMServer = require('react-dom/server');
const renderToString=require('react-dom/server').renderToString;
const RouterContext = require('react-router').RouterContext
const match =require('react-router').match;
const configureStore=require('./src/store/configureStore');
const Provider = require('react-redux').Provider;
const routes = require('./src/routes');



//Development Environment
if (process.env.NODE_ENV !== 'production') {
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      hot: true,
    },
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname,'src','assets')));

}else if(process.env.NODE_ENV === 'production') {
  console.log('heyaaa');
  var compiler = webpack(prodConfig);
  app.use(express.static(path.resolve(__dirname,'src','assets')));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src','views'));
const store=configureStore();

app.get('*', (req, res)=>{

  match({
    routes: routes,
    location: req.url
  },
  (error, redirectLocation, renderProps) => {
   if(error) {
     res.status(500).send(error.message);
   } else if(redirectLocation) {
     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
   } else if(renderProps) {
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const finalizedState=localStorage;
      res.render('index', {
        markup: html,
        initialState:finalizedState
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.get('/api/', function (req, res) {
  console.log('you hit the api')
  res.send('you hit the api');
});

app.listen(3000, function () {
   console.log('Server listening on port', 3000);
});
