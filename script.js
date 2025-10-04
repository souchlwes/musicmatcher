const bpmSlider = document.getElementById("bpmRange");
const bpmValue = document.getElementById("bpmValue");
bpmSlider.addEventListener("input", () => {
  bpmValue.textContent = bpmSlider.value;
});

document.getElementById("matchBtn").addEventListener("click", () => {
  const selectedVibe = document.getElementById("vibeSelect").value;
  const bpmTolerance = parseInt(bpmSlider.value);
  const resultDiv = document.getElementById("result");

  fetch("music.json")
    .then(res => res.json())
    .then(data => {
      const vibeMatches = data.filter(entry => entry.vibe === selectedVibe);
      if (vibeMatches.length === 0) {
        resultDiv.innerHTML = `<p>No matches found for that vibe.</p>`;
        return;
      }

      const reference = vibeMatches[Math.floor(Math.random() * vibeMatches.length)];
      const bpmMatches = vibeMatches.filter(entry =>
        entry.bpm >= reference.bpm - bpmTolerance &&
        entry.bpm <= reference.bpm + bpmTolerance
      );

      const finalMatch = bpmMatches[Math.floor(Math.random() * bpmMatches.length)];

      resultDiv.innerHTML = `
        <div class="song-box">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Music-icon.svg/64px-Music-icon.svg.png" class="song-icon" />
          <div class="song-info">
            <h2>${finalMatch.modern}</h2>
            <p><strong>Retro Match:</strong> ${finalMatch.retro}</p>
            <p><strong>BPM:</strong> ${finalMatch.bpm}</p>
            <a href="${finalMatch.youtube}" target="_blank">▶️ Play on YouTube</a>
          </div>
        </div>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = `<p>Error loading music data.</p>`;
      console.error(err);
    });
});

// Vibe Explorer
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    const vibes = [...new Set(data.map(entry => entry.vibe))];
    const vibeGroups = document.getElementById("vibeGroups");

    vibes.forEach(vibe => {
      const group = document.createElement("div");
      group.className = "vibe-group";
      group.innerHTML = `<h3>${vibe.toUpperCase()}</h3>`;

      const list = document.createElement("ul");
      data.filter(entry => entry.vibe === vibe).forEach(entry => {
        const item = document.createElement("li");
        item.textContent = `${entry.modern} → ${entry.retro}`;
        list.appendChild(item);
      });

      group.appendChild(list);
      vibeGroups.appendChild(group);
    });
  });

// Submission Form
document.getElementById("submitForm").addEventListener("submit", e => {
  e.preventDefault();
  const modern = document.getElementById("modernInput").value.trim();
  const retro = document.getElementById("retroInput").value.trim();
  const vibe = document.getElementById("vibeInput").value;

  const log = document.getElementById("submissionLog");
  log.innerHTML = `<p>✅ Match submitted: <strong>${modern}</strong> → <strong>${retro}</strong> [${vibe}]</p>`;

  const entry = { modern, retro, vibe };
  const saved = JSON.parse(localStorage.getItem("echoSubmissions") || "[]");
  saved.push(entry);
  localStorage.setItem("echoSubmissions", JSON.stringify(saved));

  e.target.reset();
});
