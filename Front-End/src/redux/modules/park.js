import axios from "axios";
const posts = (file) => {
  const formData = new FormData();
  var contents = {
    name: "제102호 어린이공원",
    address: "경기도 용인시 수지구 죽전동 1484번지 일원",
  };
  formData.append("file", file);
  formData.append(
    "content",
    new Blob([JSON.stringify(contents)], { type: "application/json" })
  );
  axios
    .post("http://localhost:8080/app/park", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        //"X-ACCESS-TOKEN": getState().user.jwt,
        withCredentials: true,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.dir(error);
    });
};
