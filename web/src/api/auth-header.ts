export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    // console.log("Access token: " + user.accessToken);
    //return { Authorization: 'Bearer ' + user.accessToken };
    return "Bearer " + user.accessToken;
  } else {
    // console.log("Access token: Not found");
    //return { Authorization: '' };
    return "";
  }
}
