export function deleteCamper(id, group_id, groupSize) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, groupSize, group_id })
  };

  fetch('/camperDelete', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      return {
        shouldRedirect: true,
      };
    })
    .catch(error => {
      return { error }
    })
}

export function editCamper(
  id,
  first_name,
  last_name,
  gender,
  birthday,
  grade_completed,
  allergies,
  parent_email,
  emergency_name,
  emergency_number,
  roommate,
  notes,
  registration,
  signed_status,
  room
) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      first_name,
      last_name,
      gender,
      birthday,
      grade_completed,
      allergies,
      parent_email,
      emergency_name,
      emergency_number,
      roommate,
      notes,
      registration,
      signed_status,
      room
    })
  };

  fetch('/camperEdit', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      return {
        shouldRedirect: true,
      };
    })
    .catch(error => {
      return { error }
    });
}

export function addCamper({
  first_name,
  last_name,
  gender,
  birthday,
  grade_completed,
  allergies,
  parent_email,
  emergency_name,
  emergency_number,
  roommate,
  notes,
  registration,
  signed_status,
  room,
  groupSize
}) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      gender,
      birthday,
      grade_completed,
      allergies,
      parent_email,
      emergency_name,
      emergency_number,
      roommate,
      notes,
      registration,
      signed_status,
      room,
      groupSize
    })
  };

  fetch('/camperAdd', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => {
      return {
        group: data.group,
        campersInGroup: data.campers
      };
    })
    .catch(error => {
      return { error };
    });
}