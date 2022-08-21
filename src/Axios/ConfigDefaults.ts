import axios from 'axios';
import { API } from './create';

// 모든 요청에 적용되는 설정의 default 값을 전역으로 명시할 수 있다.

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_KEY!;

// 생성한 Instance 의 default 값을 설정할 수 있다.

API.defaults.baseURL = 'https://api.example.com';
API.defaults.headers.common['Authorization'] = process.env.REACT_APP_KEY!;
