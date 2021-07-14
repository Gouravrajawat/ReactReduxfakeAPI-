import React, { Component } from 'react'
import { userToEdit } from './App'
import { Provider } from "react-redux"
import PublicRoute from "./routes/PublicRoute"
import store from "..configureStore"
import { Route, Switch, BrowserRouter } from "react-router-dom";

export default class index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Container className="App">
            <Route>
              <Switch>
                <PublicRoute exact path="/edit" component={userToEdit} />
              </Switch>
            </Route>
          </Container>
        </Provider>
      </BrowserRouter>
    )
  }
}
