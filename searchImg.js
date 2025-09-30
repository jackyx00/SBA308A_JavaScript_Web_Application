// SearchImg Section

// Trace Moe API POST
export async function searchByImage(img) {
  const resultsDiv = document.getElementById("searchImg-results");
  resultsDiv.innerHTML = "<p>Searching... please wait</p>";

  try {
    const formData = new FormData();
    formData.append("image", img);
    let data = await axios.post("https://api.trace.moe/search", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    resultsDiv.innerHTML = "";
    console.log(data.data.result);
    if (data.data.result && data.data.result.length > 0) {
      for (let a of data.data.result.slice(0, 3)) {
        const similarity = (a.similarity * 100).toFixed(2);
        const title = a.filename || "Unknown Filename";

        let div = document.createElement("div");
        div.className = "image-card";
        div.innerHTML = `
          <p>
            <strong>${title}</strong><br>
            Episode: ${a.episode}<br>
            Similarity: ${similarity}%
          </p>
          <img src="${a.image}" alt="Image"><br>
        `;
        resultsDiv.appendChild(div);
      }
    } else {
      resultsDiv.innerHTML = "<p>No anime match found for this image</p>";
    }
  } catch (e) {
    console.error("Trace Moe API error:", e);
    resultsDiv.innerHTML = "<p>Error searching image. Please try again</p>";
  }
}
