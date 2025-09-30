// SearchImg Section

const formData = new FormData();
formData.append("image", image);
let data = await axios.get("https://api.trace.moe/search", {
  method: "POST",
  body: formData,
});