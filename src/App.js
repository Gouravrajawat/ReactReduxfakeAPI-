import React, { Component } from 'react'
import { connect } from "react-redux";
import { deleteUsers, editUsers, favoriteUsers } from "./actions";
import { Button } from "react-bootstrap";
import './index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
      //  editUsers: false,
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }

  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{`${user.address.street}, ${user.address.city}`}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>{user.company.name}</td>
          <td>
            <Button variant="info" onClick={() => this.editUsers(user.id)}>Edit</Button>
            &nbsp;<Button variant="danger" onClick={() => this.deleteUsers(user.id)}>Delete</Button>
            &nbsp;
            <Button variant="success" onClick={() => this.favoriteUsers(user.id)}>Add to Favorite</Button>
          </td>
        </tr>
      )
    })
  }

  deleteUsers(userid) {
    const { users } = this.state;
    this.setState({
      users: users.filter((user => user.id !== userid))
    })
  }
  editUsers = userid => {
    const { users } = this.state;
    const { editUsers1 } = this.state
    this.setState({
      users: users.find((user => user.id === userid))
    })
    const user = users.find((user => user.id === userid))
    console.log(user, 'user')
  }


  /* editUsers = userid => {
     const { users } = this.state;
     const apiUrl = 'https://jsonplaceholder.typicode.com/users';
     const formData = new FormData();
     formData.append('userid', userid);
 
     const options = {
       method: 'POST',
       body: formData,
       userid: userid
     }
 
     fetch(apiUrl, options)
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
             user: result,
             editUsers: true,
           });
         },
         (error) => {
           this.setState({ error });
         }
       )
   }
   */

  favoriteUsers = userid => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user.id === userid))
    })
    const user = users.find((user => user.id === userid))
    user.favorite = true

    const userIndex = users.findIndex(user => user.id === userid)

    users[userIndex] = user
    this.setState({
      users: users
    })
  }


  //  if (users) {
  //  return <span class="glyphicon">&#xe005;</span>
  //}


  render() {
    const { users, isLoading, isError } = this.state
    console.log('users', users)
    if (!users) {
      return <span class="glyphicon">&#xe005;</span>
    }

    //  let userForm;
    // if (this.state.editUsers) {
    //  userForm = users(this.state.users)
    //  }
    //  if (users) {
    //  return <span class="glyphicon">&#xe005;</span>
    //  }
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return users.length > 0
      ? (
        <table id="t01">
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users
        </div>
      )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) =>
      user.id === props.match.params.id)
  };
};
//  users: state.users,
// loading: state.isLoading
const mapDispatchToProps = dispatch => {
  return {
    onLoadUsersComplete: users => {
      dispatch(deleteUsers(users));
    },
    onLoadUsersComplete1: users => {
      dispatch(editUsers(users));
    },
    onLoadUsersComplete3: users => {
      dispatch(favoriteUsers(users));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
