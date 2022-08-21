import axios from 'axios';

export const API = axios.create({
  // 사용하자고 하는 API 기입
  baseURL: 'https://api.example.com',
  // 호출을 위한  키값 headers 에 넣어줘야 하는 키값이 있다면 입력
  headers: {
    Authorization: process.env.REACT_APP_KEY!,
  },
});

// create 로 생성한 custom API 호출 예제
function create() {
  API.get('/user', {
    // 기입해야하는 params
    params: {},
  }).then((res) => {
    res.data();
  });
}
