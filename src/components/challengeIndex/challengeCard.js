import React from "react";
import { Card } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class ChallengeCard extends React.Component {
  constructor() {
    super();

    this.state = {
      role: ""
    };
  }

  filterRoles = () => {
    this.props.challenge.user_challenges.forEach(uc => {
      if (uc.user_id === this.props.user) {
        switch (uc.role) {
          case "3":
            this.setState({
              role: "Spectator"
            });
          default:
            this.setState({
              role: "Participant"
            });
        }
      }
    });
  };

  render() {
    console.log(this.props);
    return (
      <Card
        onClick={() =>
          this.props.history.push(`/challenges/${this.props.challenge.id}`)}
        header={this.props.challenge.name}
        meta={this.state.role}
        description={this.props.challenge.description}
      />
    );
  }
}

export default withRouter(ChallengeCard);
