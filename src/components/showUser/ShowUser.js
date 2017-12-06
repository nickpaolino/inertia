import React from "react";
import { Grid } from "semantic-ui-react";
import ChallengeCard from "../challengeIndex/ChallengeCard";
import DateTime from "react-datetime";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      challenges: [],
      userChallenges: [],
      completedUserChallenges: [],
      showUserChallenges: true,
      showCompletedUserChallenges: true
    };
  }

  componentDidMount() {
    fetch(`${this.props.url}users`)
      .then(res => res.json())
      .then(json =>
        json.filter(user => {
          return (
            user.id.toString() === this.props.location.pathname.split("/")[2]
          );
        })
      )
      .then(json =>
        this.setState({
          user: json[0]
        })
      );
    fetch(`${this.props.url}challenges`)
      .then(res => res.json())
      .then(json =>
        this.setState(
          {
            challenges: json
          },
          () => this.filterChallenges(json)
        )
      );
  }

  filterChallenges = json => {
    //the time right now
    let now = new Date().toISOString();
    //check challenge.criteria for deadline, and challenge.user_challenges.user_id === current user id.
    const mapped = json.map(challenge => {
      if (challenge.criteria < now) {
        challenge["completed"] = true;
      }
      return challenge.user_challenges.some(category => {
        if (category.user_id === this.props.currentUser.id) {
          challenge["containsUser"] = true;
        }
      });
    });
    const filtered = json.filter(challenge => {
      return challenge.containsUser === true;
    });
    this.setState(
      {
        challenges: filtered
      },
      () => {
        this.updateChallenges();
      }
    );
  };

  //checks if current user participated in a challenge, if the challenge is completed, and updates state of those categories.
  updateChallenges = () => {
    const userChallenges = this.state.challenges.filter(challenge => {
      return !challenge.hasOwnProperty("completed");
    });
    const completedUserChallenges = this.state.challenges.filter(challenge => {
      return challenge.hasOwnProperty("completed");
    });
    this.setState({
      userChallenges,
      completedUserChallenges
    });
  };

  showUserChallenges = e => {
    this.setState(prevState => {
      return { showUserChallenges: !prevState.showUserChallenges };
    });
  };
  showCompletedUserChallenges = e => {
    this.setState(prevState => {
      return {
        showCompletedUserChallenges: !prevState.showCompletedUserChallenges
      };
    });
  };

  render() {
    console.log(this.state);
    const UserChallenges = this.state.userChallenges.map((challenge, id) => {
      return (
        <ChallengeCard color="blue" key={challenge.id} challenge={challenge} />
      );
    });
    const CompletedUserChallenges = this.state.completedUserChallenges.map(
      (challenge, id) => {
        return (
          <ChallengeCard
            color="green"
            key={challenge.id}
            challenge={challenge}
          />
        );
      }
    );
    console.log(this.state.user);
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <h3>{this.state.user.username}</h3>
            <h4>Active Challenges: {this.state.userChallenges.length}</h4>
            <h4>
              Completed Challenges: {this.state.completedUserChallenges.length}
            </h4>
          </Grid.Column>
          {this.state.showUserChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showUserChallenges}>Current Challenges</h3>
                {UserChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showUserChallenges}>Current Challenges</h3>
            </Grid.Column>
          )}
          {this.state.showCompletedUserChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showCompletedUserChallenges}>
                  Completed Challenges
                </h3>
                {CompletedUserChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showCompletedUserChallenges}>
                Completed Challenges
              </h3>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default User;
