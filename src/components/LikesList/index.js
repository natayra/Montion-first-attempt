
const LikesList = async () => {
  const urlListLikes =
    "https://motion.propulsion-home.ch/backend/api/social/posts/likes/";
  const configListLikes = {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + localStorage.token,
    }),
  };
  const res = await fetch(urlListLikes, configListLikes);
  if (!res.ok) {
    alert("Error");
  } else {
    const likes = await res.json();
    likes.forEach((like) => {
      if (document.getElementById("like" + like.id) !== null) {
        document.getElementById("like" + like.id).innerText = "U";
      }
    });
  }
};

export default LikesList;
