import React, { Component } from 'react'
import { Button } from "react-bootstrap";

export class editedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      userToEdit: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(userid) {
    this.setState({
      users: users.find((user => user.id === userid))
    });
    const user = users.find((user => user.id === userid))
    // console.log(user, 'user')
    user.edit = true
    this.setState({
      userToEdit: users
    })
  }
  render() {
    return this.state.users.map(user => {
      return (
        <input key={user.id}>
          <input type={user.id} onChange={this.handleChange} />
          <input type={user.name} onChange={this.handleChange} />
          <input type={user.username} onChange={this.handleChange} />
          <input type={user.email} onChange={this.handleChange} />
          <input type={`${user.address.street}, ${user.address.city}`} onChange={this.handleChange} />
          <input type={user.phone} onChange={this.handleChange} />
          <input type={user.website} onChange={this.handleChange} />
          <input type={user.company.name} onChange={this.handleChange} />
          <Button variant="info" onClick={() => this.editedUsers(user.id)}>Save</Button>
        </input>
      );
    })
  }
}

export default editedUsers;






