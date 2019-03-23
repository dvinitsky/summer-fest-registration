import React from 'react';
import Error from './Error';

class CamperAdd extends React.Component {
  render() {
    const { groups, location } = this.props;

    if (location && location.state && location.state.group_id) {
      const group_id = location.state.group_id;

      return (
        <form class="container" method="post">
          <h3>
            First Name:
        </h3>
          <input name="first_name" />
          <h3>
            Last Name:
        </h3>
          <input name="last_name" />

          <input class="do-not-show" value="<%- group_id %>" name="group_id" />
          {groups.map(group => {
            if (group.id === group_id) {
              return <input class="do-not-show" value={group.size} name="size" />;
            } return null;
          })}
          <button type="submit">Save</button>
        </form>
      );
    }
    return <Error />;
  }
}

export default CamperAdd;