const URL = 'http://localhost:9000/api';

export const postSendRequest = (data) =>
  fetch(`${URL}/v1/notification/send`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) =>
    res.json()
  );
