import React from 'react';

class GroupAdd extends React.Component {
  render() {
    return (
      <form className="container" method="post">
        <h3>
          Group Name:
        </h3>
        <input name="group_name" />

        <div>
          <br />
          Leader Name:
          <input name="leader_name" />
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default GroupAdd;