import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Admin = props => {
  const { groups } = props;

  return (
    <div class="jumbotron text-center">
      <div class="container">
        <h1>Registration</h1>
        <p>
          <a href='/admin'>Click here to go home.</a>
        </p>
      </div>

      <div class="admin-logged-message">
        Logged in as Admin
      </div>

      <table name="camperId">
        <tr class="table-header-row">
          <th class="header-place"></th>
          <th class="header-place">Group Name</th>
          <th class="header-place">Leader</th>
          <th class="header-name"># of Campers</th>
        </tr>

        {groups.map(group => {
          return (
            <tr key={group.id} class="table-row">
              <td class="table-edit">
                <Link to={'./groupEdit'}>
                  <div>
                    Edit
                  </div>
                </Link>
              </td>
              <td class="table-name">
                {group.group_name}
              </td>
              <td class="table-score">
                {group.leader_name}
              </td>
              <td class="table-score">
                {group.size}
              </td>
            </tr>
          );
        })}
      </table>

      <h4 class="add-delete-link">
        <a href="/groupAdd">
          <u>Add a group</u>
        </a>
      </h4>
    </div>
  )
};

export default Admin;