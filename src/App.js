import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteUsers, editUsers, favoriteUsers, editedUsers } from "./actions";
import { Button } from "react-bootstrap";
import './index.css';
//import PublicRoute from "./routes/PublicRoute";
//import { useHistory } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
      editUsers1: '',
      userToEdit: {},
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
      this.setState({
        editUsers: true
      })
      this.props.history.push("/edit/:id")
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
            {user.favorite ? <span class="glyphicon">&#xe005;</span> : 'Add to favorite'}
          </td>
          <td>
            <Button variant="info" onClick={() => this.editUsers(user.id)}>Edit</Button>
            &nbsp;<Button variant="danger" onClick={() => this.deleteUsers(user.id)}>Delete</Button>
            &nbsp;
            <Button variant="success" onClick={() => this.favoriteUsers(user.id)}> Add to Favorite</Button>
          </td>
        </tr>
      )
    })
  }
  // Users = () => {
  //    return Object.keys(this.state.user[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  //  }

  /* Users = () => {
     return this.state.users.map(user => {
       return (
         <input key={user.id}>
           <input type={user.id} />
           <input type={user.name} />
           <input type={user.username} />
           <input type={user.email} />
           <input type={`${user.address.street}, ${user.address.city}`} />
           <input type={user.phone} />
           <input type={user.website} />
           <input type={user.company.name} />
           <Button variant="info" onClick={() => this.Users()}>Save</Button>
         </input>
       )
     })
   }
   */

  deleteUsers(userid) {
    const { users } = this.state;
    this.setState({
      users: users.filter((user => user.id !== userid))
    })
  }
  editUsers = (userid) => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user.id === userid))
    })
    const user = users.find((user => user.id === userid))
    // console.log(user, 'user')
    user.edit = true
    this.setState({
      userToEdit: user
    })
  }
  /*Users = () => {
    const { users } = this.state;
    this.setState({
      users: users.find((users))
    })
    const user = users.find((Users))
    console.log(user, 'users')
    user.edit = true
    this.setState({
      userToEdit: users
    })
  }
*/


  editedUsers = () => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user === user))
    })
  }

  /*
  editUsers = (userid) => {
    const users = this.state.users.find(user => user.id === userid);
    return users;
  }
  onEdit = (userid) => {
    const user = this.state.users;
    const index = user.indexOf(this.editUsers(userid))
    const selectedUsers = user[index];
    this.setState({
      //  id: selectedUsers[user.id]
    })
  }
  */

  /* editUsers = userid => {
     const { users } = this.state;
     this.setState({
       users: users.find((user => user.id === userid))
     })
     const user = users.find((user => user.id === userid))
     // console.log(user, 'user')
     user.edit = true
     this.setState({
       userToEdit: users
     })
   }
   */
  /*  editUsers1 = userid => {
      const { users } = this.state;
      this.setState({
        users: users.find((user => user.id === userid))
      })
      const user = users.find((user => user.id === user.id))
      this.setState({
        users: user
      })
    }
    */


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
  render() {
    const { users, isLoading, isError } = this.state
    console.log('users', users)
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
    //  user: state.editedUsers.find(user => user.id === props.match.params.id)
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
    onLoadUsersComplete2: users => {
      dispatch(favoriteUsers(users));
    },
    onLoadUsersComplete3: users => {
      dispatch(editedUsers(users));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
