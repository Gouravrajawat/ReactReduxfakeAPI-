import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteUsers, editUsers, favoriteUsers, editedUsers, getUsersSuccess, Users } from "./actions";
import { Button, Form } from "react-bootstrap";
import './index.css';
//import { useHistory} from 'react-router-dom';
//import PublicRoute from "./routes/PublicRoute";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
      editUsers: false,
      userToEdit: {},
      Edit: false,
      user: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (response.ok) {
      const users = await response.json()
      this.props.getUsersSuccess(users)
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
      this.setState({
        userToEdit: true
      })
      this.props.history.push("/edit")
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
            <Button variant="info" onClick={() => this.userToEdit(user.id)}>Edit</Button>
            &nbsp;<Button variant="danger" onClick={() => this.deleteUsers(user.id)}>Delete</Button>
            &nbsp;
            <Button variant="success" onClick={() => this.favoriteUsers(user.id)}> Add to Favorite</Button>
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


  editedUsers = (userid) => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user.id === user.id))
    })
  }


  userToEdit = id => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user.id === id))
    })
    const user = users.find((user => user.id === id))
    user.edit = true
    this.setState({
      editedUsers: users,
    })
  }

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
  handleChange(e) {
    const target = e.target;
    const value = e.value
    //  const users = e.target.users;

    this.setState({
      ...this.state,
      userToEdit: { ...this.state.userToEdit, [target.name]: value }
      //  [users]: value,
      //  editedUsers: users
    });
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
        <div
          style={{ fontSize: 16, backgroundColor: "	silver", width: "50%", paddingLeft: "40px", marginleft: "40px" }}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={this.state.users.id}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.users.name}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>userName</Form.Label>
            <Form.Control
              type="text"
              value={this.state.users.username}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={this.state.users.email}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={this.state.users.phone}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              value={this.state.users.website}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">Save</Button>
        </div>
      )
  }
}
const mapStateToProps = (state, props) => {
  return {
    user: state.users && state.users.find((user) =>
      props.match && user.id === props.match.params.id)
  };
};
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
    userToEdit: users => {
      dispatch(editedUsers(users));
    },
    getUsersSuccess: users => {
      dispatch(getUsersSuccess(users))
    },
    editedUsers: user => {
      dispatch(editedUsers(user));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
