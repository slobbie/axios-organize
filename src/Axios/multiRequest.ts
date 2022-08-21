import axios from 'axios';

// mult Request 방법 1
// 단일 데이터 호출을 밖으로 빼구 all 키워드 에서 로직 단순화

function apple() {
  return axios.get('https://api.example.com');
}
function orange() {
  return axios.get('https://api.example.com');
}

axios
  .all([apple(), orange()])
  .then(
    axios.spread((apple, orange) => {
      console.log(apple.data);
      console.log(orange.data);
    })
  )
  .catch(
    axios.spread((apple_err, orange_err) => {
      console.error(apple_err);
      console.error(orange_err);
    })
  );

// mult Request 방법 2
// 로직을 분리 시키지 않고 바로 호출

axios
  .all([
    axios.get('https://api.example.com/apple'),
    axios.get('https://api.example.com/orange'),
  ])
  .then(
    axios.spread((app, orange) => {
      console.log(app.data);
      console.log(orange.data);
    })
  )
  .catch((err) => {
    console.log(err);
  });
