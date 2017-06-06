import express  from 'express';
import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import cookieParser from 'cookie-parser';
import { getHeaders, initialize } from 'redux-oauth';


const app = express();


app.use(cookieParser());

app.use((req, res) => {
  const store = configureStore();

  store.dispatch(initialize({
    backend: {
      apiURL: 'https://redux-oauth-backend.herokuapp.com',
      authProvidePath: {
        github: '/auth/github'
      },
      signOutPath: null
    },
    currentLocation: req.url,
    cookies: req.cookies
  })).then(() => match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(400).send('Not Found');
    }

    const componentHTML = ReactDom.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const state = store.getState();

    res.cookie('authHeaders', JSON.stringify(getHeaders(state)), { maxAge: Date.now() + 14 * 24 * 3600 * 1000 });

    return res.end(renderHTML(componentHTML, state));
  }));
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML, initialState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
          <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)}
          </script>
      </head>
      <body>
        <div id="root">${componentHTML}</div><div id="dev-tools"></div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
