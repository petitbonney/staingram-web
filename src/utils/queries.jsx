const fetchAPI = (endpoint, args, method = "POST") => {
  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const body = new URLSearchParams(args);
  var f =
    method === "GET" ? fetch(`${url}?${body}`, { headers }) : fetch(url, { method, headers, body });
  return f.catch(() => null);
};

const fetchJSON = (endpoint, args, method) =>
  fetchAPI(endpoint, args, method).then((r) => r.json());

const fetchBlob = (endpoint, args, method) =>
  fetchAPI(endpoint, args, method).then((r) => r.blob());

const loginByCredentials = (username, password) =>
  fetchJSON("/auth/login", {
    username: username,
    password: password,
  });

const loginBySessionId = (sid) =>
  fetchJSON("/auth/login_by_sessionid", {
    sessionid: sid,
  });

const fetchMyUserId = (sid) =>
  fetchJSON("/auth/settings/get", { sessionid: sid }, "GET").then(
    (x) => x["authorization_data"]["ds_user_id"]
  );

const fetchUserId = (sid, username = null) => {
  if (username) {
    return fetchJSON("/user/id_from_username", {
      sessionid: sid,
      username: username,
    });
  } else {
    return fetchMyUserId(sid);
  }
};

const fetchUserInfo = (sid, uid) =>
  fetchJSON("/user/info", {
    sessionid: sid,
    user_id: uid,
    use_cache: true,
  });

const fetchUserMedias = (sid, uid, amount = 50) =>
  fetchJSON("/media/user_medias", {
    sessionid: sid,
    user_id: uid,
    amount: amount,
  });

const fetchImage = (sid, url, username) =>
  fetchBlob("/photo/download/by_url", {
    sessionid: sid,
    url: url,
    folder: username,
    returnFile: true,
  });

export {
  fetchImage,
  fetchUserId,
  fetchUserInfo,
  fetchUserMedias,
  loginByCredentials,
  loginBySessionId,
};
