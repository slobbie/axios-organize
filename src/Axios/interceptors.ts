// interceptors 는 1.요청하기 직전, 2. 응답을 받고 then, catch로 처리 직전에 가로챌 수 있습니다.

/**  
 요청 성공시 -> return

 요청 실패시 ( ex)토큰 만료로 인한 에러 발생) 
 -> 에러를 반환하기 전에 intercepot 해서 , 서버에 token refresh 를 요청
    - token refresh 요청을 통해 받은 새로운 accessToken 을 본인의 저장소에 다시 저장
    - 새로 accessToken를header에 담아 , 재요청
*/

// ex

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 419) {
      if (error.response.data.code === 'expired') {
        const originalRequest = config;
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        // token refresh 요청
        const { data } = await axios.post(
          `${Config.API_URL}/refreshToken`, // token refresh api
          {},
          { headers: { authorization: `Bearer ${refreshToken}` } }
        );
        // 새로운 토큰 저장
        dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
        originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
        // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
