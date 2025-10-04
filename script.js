document.getElementById("matchBtn").addEventListener("click", () => {
  const input = document.getElementById("songInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Searching...";

  fetch("music.json")
    .then((res) => res.json())
    .then((data) => {
      const match = data.find((entry) => entry.modern.toLowerCase() === input);

      if (match) {
        resultDiv.innerHTML = `
          <h2>🎵 ${match.modern}</h2>
          <p><strong>Vibe:</strong> ${match.vibe}</p>
          <p><strong>Retro Match:</strong> ${match.retro}</p>
          <p>${match.notes}</p>
          <iframe src="${match.media.embed}" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `;
      } else {
        resultDiv.innerHTML = `<p>No match found. Try another song title.</p>`;
      }
    })
    .catch((err) => {
      resultDiv.innerHTML = `<p>Error loading music data.</p>`;
      console.error(err);
    });
});
