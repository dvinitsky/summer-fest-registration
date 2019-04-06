export function deleteCamper(id, group_id) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, group_id })
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
  group_id,
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
}) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      group_id,
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

  fetch('/camperAdd', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else throw new Error();
    })
    .then(data => data)
    .catch(error => {
      return { error };
    });
}