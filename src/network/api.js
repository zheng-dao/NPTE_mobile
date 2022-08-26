import React from 'react'
import { AsyncStorage } from 'react-native';

const BASE_URL = 'https://npte-final-frontier.herokuapp.com/api/v1/';
//'http://app.npteff.com/api/v1/';
//'https://nptequiz.herokuapp.com/api/v1/';
//'http://18.232.216.144/api/v1/'; 
//'http://app.npteff.com/api/v1/';
const URL_LOGIN = 'sessions';
const URL_PHONE_LOGIN = 'users/user_verification';
const URL_VERIFY_CONFIRMATION_CODE = 'users/user_verification_check';
const URL_REGISTER = 'users';
const URL_GET_QUESTION = 'questions/';
const KEY_API_TOKEN = '?api_token=';
const URL_PROFILE = 'users/';
const URL_UPDATE_PASSWORD = '/update_password';
const URL_TODAY_QUESTION = 'today_question';
const URL_USER_ANSWERS = 'user_answers';
const URL_FORGOT_PASSWORD = 'users/forgot_password';
const URL_USER_REPORT_1 = '/user_report?api_token=';
const URL_USER_REPORT_2 = '&start_date=&end_date=&by_category=';
const URL_PREVIOUS_QUESTION = 'questions/previous_questions';
const URL_CATEGORIES = 'categories';
const URL_RANDOM_QUESTIONS = 'questions/random_questions';

//https://nptequiz.herokuapp.com/api/v1/questions/previous_questions

const getToken = async () => {
  return await AsyncStorage.getItem('token');
}

export const getUser = async () => {
  return JSON.parse(await AsyncStorage.getItem('user'));
}

export const login = async (email, password, fcmToken) => {
  return await fetch(BASE_URL + URL_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      PushToken: fcmToken,
    }),
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

export const register = async (user, fcmToken) => {
  return await fetch(BASE_URL + URL_REGISTER, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user,
      PushToken: fcmToken,
    }),
  }).then((response) => response.json())
    .then(async (responseJson) => {
      return responseJson
    })
    .catch((error) => {
      return error
    });
}

export const phoneLogin = async (phone) => {
  return await fetch(BASE_URL + URL_PHONE_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: phone
    }),
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

export const verifyConfirmationCode = async (user, code, fcmToken) => {
  return await fetch(BASE_URL + URL_VERIFY_CONFIRMATION_CODE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user,
      code: code,
      PushToken: fcmToken,
    }),
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

export const getQuestion = async () => {
  const token = await getToken().then(token => { return token });
  return await fetch(BASE_URL + URL_GET_QUESTION + URL_TODAY_QUESTION + KEY_API_TOKEN + token, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

export const getProfile = async () => {
  const token = await getToken().then(token => { return token });
  const user = await getUser().then(user => { return user });

  return await fetch(BASE_URL + URL_PROFILE + user.id + KEY_API_TOKEN + token, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });

}

export const updateProfile = async (user, image) => {
  const userId = (await getUser().then(user => { return user })).id;
  const token = await getToken().then(token => { return token });

  let body = '';
  if (image.length > 0) {
    body = JSON.stringify({
      user: user,
      image: image,
    });
  } else {
    body = JSON.stringify({
      user: user,
    });
  }
  console.log('++++ updateProfile > body +++>>', body);

  return await fetch(BASE_URL + URL_PROFILE + userId + KEY_API_TOKEN + token, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  }).then((response) => response.json())
    .then(async (responseJson) => {
      return responseJson
    })
    .catch((error) => {
      return error
    });
}

export const updatePassword = async (user) => {
  const userId = (await getUser().then(user => { return user })).id;
  const token = await getToken().then(token => { return token });
  console.log('~~~~ updatePassword ~~~~>', userId, token, user);

  return await fetch(BASE_URL + URL_PROFILE + userId + URL_UPDATE_PASSWORD + KEY_API_TOKEN + token, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user,
    }),
  }).then((response) => response.json())
    .then(async (responseJson) => {
      return responseJson
    })
    .catch((error) => {
      return error
    });
}

export const submitAnswer = async (answer) => {
  const token = await getToken().then(token => { return token });
  return await fetch(BASE_URL + URL_USER_ANSWERS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answer: answer,
      api_token: token,
    }),
  }).then((response) => response.json())
    .then(async (responseJson) => {
      return responseJson
    }).catch((error) => {
      return error
    });
}

export const forgotPassword = async (email) => {
  return await fetch(BASE_URL + URL_FORGOT_PASSWORD, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, })
  })
    .then((response) => response.json())
    .then(async (responseJson) => {
      return responseJson
    }).catch((error) => {
      return error;
    });
}

export const getUserReport = async (byCategory = false, byMonth = false) => {
  const userId = (await getUser().then(user => { return user })).id;
  const token = await getToken().then(token => { return token });


  return await fetch(BASE_URL + URL_PROFILE + userId + URL_USER_REPORT_1 + token + URL_USER_REPORT_2 + byCategory + '&by_month=' + byMonth, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then(async (responseJson) => {
      return responseJson
    })
    .catch((error) => {
      return error
    });
}

export const getPreviousQuestion = async () => {
  const token = await getToken().then(token => { return token });
  return await fetch(BASE_URL + URL_GET_QUESTION + URL_TODAY_QUESTION + KEY_API_TOKEN + token, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

//https://npte-final-frontier.herokuapp.com/api/v1/questions/previous_questions?
//api_token=o3JRf418BLUWN7D3pEOjngtt&start_date=&end_date=
export const getPreviousQuestions = async (start, end) => {
  const token = await getToken().then(token => { return token });
  return await fetch(BASE_URL + URL_PREVIOUS_QUESTION + KEY_API_TOKEN + token + '&start_date=' + start + '&end_date=' + end, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

export const getCategories = async () => {
  const token = await getToken().then(token => { return token });
  return await fetch(BASE_URL + URL_CATEGORIES + KEY_API_TOKEN + token, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}

export const getRandomQuestions = async (category_id) => {
  const token = await getToken().then(token => { return token });
  return await fetch(BASE_URL + URL_RANDOM_QUESTIONS + KEY_API_TOKEN + token + '&category_id=' + category_id, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .then(async (responseJson) => { return responseJson })
    .catch((error) => { return error });
}