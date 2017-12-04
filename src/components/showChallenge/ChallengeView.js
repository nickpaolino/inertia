import React, { Component } from "react";
import ResultsContainer from "../../containers/ResultsContainer";
import CommentsContainer from "../../containers/CommentsContainer";
import { formatResults } from "../../services/formatResults.js";
import { Header, Icon, Image, Transition } from "semantic-ui-react";

class ChallengeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {},
      voted: null,
      teamVotedFor: null
    };
  }

  componentDidMount() {
    const results = formatResults(this.props.challenge, this.props.currentUser);
    let stateObj;
    if (results.voter) {
      stateObj = {
        challenge: results,
        voted: results.voter.voted,
        teamVotedFor: results.voter.team
      };
    } else {
      stateObj = {
        challenge: results
      };
    }
    this.setState(stateObj);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Header
          style={{ padding: "20px", paddingBottom: "0px" }}
          centered
          as="h2"
          icon
          textAlign="center"
        >
          <Icon name="trophy" circular />
          {this.props.challenge ? this.props.challenge.name : ""}
        </Header>
        <Header style={{ padding: "0px" }} centered as="h4" textAlign="center">
          {this.props.challenge ? this.props.challenge.description : ""}
        </Header>
        {this.state.challenge.teamOne ? (
          <ResultsContainer challenge={this.state.challenge} />
        ) : (
          ""
        )}
        <CommentsContainer />
      </div>
    );
  }
}

export default ChallengeView;
