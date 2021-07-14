import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

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
  handleChange(id) {
    this.setState({
      users: users.find((user => user.id === id))
    });
    const user = users.find((user => user.id === id))
    // console.log(user, 'user')
    user.edit = true
    this.setState({
      userToEdit: users,
      id: user
    })
  }
  render() {
    console.log("we are seeing the edited Data", this.editedUser)
    return this.state.users.map(user => {
      return (
        <input key={user.id}>
          <input type={editedUser.id} onChange={this.handleChange} />
          <input type={editedUser.name} onChange={this.handleChange} />
          <input type={editedUser.username} onChange={this.handleChange} />
          <input type={editedUser.email} onChange={this.handleChange} />
          <input type={`${editedUser.address.street}, ${editedUser.address.city}`} onChange={this.handleChange} />
          <input type={editedUser.phone} onChange={this.handleChange} />
          <input type={editedUser.website} onChange={this.handleChange} />
          <input type={editedUser.company.name} onChange={this.handleChange} />
          <Button variant="info" onClick={() => this.editedUser(user.id)}>Save</Button>
        </input>
      );
    })
  }
}
const mapStateToProps = (state, props) => {
  return {
    editedUser: state.user,
    user: state.users && state.users.find((user) =>
      user.id === props.match.params.id)
  };
};

export default connect(
  mapStateToProps, null)(editedUsers)






