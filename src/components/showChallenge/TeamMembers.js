import _ from "lodash";
import React, { Component } from "react";
import { Button, Image, List, Transition, Icon } from "semantic-ui-react";

class TeamMembers extends Component {
  state = {
    items: this.props.users.slice(0, 0),
    toggledOn: true,
    icon: "chevron down",
    defaultIcon: this.props.defaultIcon
  };

  num_of_users = this.props.users.length;

  handleChange = () => {
    let newItems;
    let newIcon;
    if (this.state.toggledOn) {
      if (this.state.defaultIcon) {
        newIcon = this.state.defaultIcon;
      } else {
        newIcon = "chevron up";
      }
      newItems = this.props.users.slice(
        0,
        this.state.items.length + this.num_of_users
      );
    } else {
      if (this.state.defaultIcon) {
        newIcon = this.state.defaultIcon;
      } else {
        newIcon = "chevron down";
      }
      newItems = this.state.items.slice(0, 0);
    }

    const toggle = !this.state.toggledOn;
    this.setState({
      items: newItems,
      toggledOn: toggle,
      icon: newIcon
    });
  };

  render() {
    console.log(this.state.participants);
    const { items } = this.state;

    return (
      <div>
        <div onClick={this.handleChange}>
          {this.props.spectatorList ? "Spectators" : ""}
          <Button.Group>
            <Button
              basic
              icon={
                this.state.defaultIcon
                  ? this.state.defaultIcon
                  : this.state.icon
              }
            />
          </Button.Group>
        </div>
        {this.props.votes ? `${this.props.users.length} Votes` : ""}
        <Transition.Group
          as={List}
          duration={200}
          divided
          size="small"
          verticalAlign="middle"
        >
          {items.map(item => (
            <List.Item key={item.name}>
              <Image />
              <List.Content header={_.startCase(item.name)} />
            </List.Item>
          ))}
        </Transition.Group>
      </div>
    );
  }
}

export default TeamMembers;