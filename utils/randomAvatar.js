const imgs = [
  "https://metastream-static.s3.ap-southeast-1.amazonaws.com/category/avatar/user/avatar1.png",
  "https://metastream-static.s3.ap-southeast-1.amazonaws.com/category/avatar/user/avatar2.png",
  "https://metastream-static.s3.ap-southeast-1.amazonaws.com/category/avatar/user/avatar3.png",
  "https://metastream-static.s3.ap-southeast-1.amazonaws.com/category/avatar/user/avatar4.jpg",
  "https://metastream-static.s3.ap-southeast-1.amazonaws.com/category/avatar/user/avatar5.jpg",
  "https://metastream-static.s3.ap-southeast-1.amazonaws.com/category/avatar/user/avatar6.png",
];
function randomImg() {
  const index = Math.floor(Math.random() * 6);
  return imgs[index];
}

module.exports = {
  randomImg,
};
