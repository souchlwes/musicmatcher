function findMatch() {
  const category = document.getElementById('category').value;
  const input = document.getElementById('modernInput').value.toLowerCase();
  const vibe = document.getElementById('vibe').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<div class="loading">Loading your retro match...</div>`;

  fetch(`data/${category}.json`)
    .then(res => res.json())
    .then(data => {
      const match = data.find(item =>
        item.modern.toLowerCase() === input &&
        (vibe === "" || item.vibe === vibe)
      );
      if (match) displayMatch(match);
      else resultDiv.innerHTML = `<p>No match found. Try another item or vibe!</p>`;
    });
}

function shuffleMatch() {
  const category = document.getElementById('category').value;
  fetch(`data/${category}.json`)
    .then(res => res.json())
    .then(data => {
      const random = data[Math.floor(Math.random() * data.length)];
      displayMatch(random);
    });
}

function displayMatch(match) {
  const resultDiv = document.getElementById('result');
  let mediaHTML = "";

  if (match.media.type === "spotify") {
    mediaHTML = `<iframe style="border-radius:12px" src="${match.media.embed}" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  } else if (match.media.type === "image") {
    mediaHTML = `<img src="${match.media.embed}" alt="Retro Match">`;
  } else if (match.media.type === "video") {
    mediaHTML = `<video controls src="${match.media.embed}"></video>`;
  }

  resultDiv.innerHTML = `
    <div class="result-card">
      <h2>Modern: ${match.modern}</h2>
      <p>Vibe: ${match.vibe}</p>
      <h3>Retro Match: ${match.retro}</h3>
      ${mediaHTML}
      <p>${match.notes}</p>
      <button onclick="saveFavorite()">⭐ Save to Favorites</button>
    </div>
  `;
}

function saveFavorite() {
  const html = document.getElementById('result').innerHTML;
  localStorage.setItem('favoriteMatch', html);
  alert("Saved to favorites!");
}

function loadFavorite() {
  const saved = localStorage.getItem('favoriteMatch');
  if (saved) {
    document.getElementById('result').innerHTML = saved;
  }
}
