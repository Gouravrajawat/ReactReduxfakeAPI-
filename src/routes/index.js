import React, { Component } from 'react'
import { editUsers } from './App'
import { Provider } from "react-redux"
import PublicRoute from "./routes/PublicRoute"
import store from "..configureStore"
import { Route, Switch } from "react-router-dom";

export default class index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="App">
          <Route>
            <Switch>
              <PublicRoute path="/edit/:id" exact component={editUsers} />
            </Switch>
          </Route>
        </Container>
      </Provider>
    )
  }
}
