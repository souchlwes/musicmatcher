document.getElementById("matchBtn").addEventListener("click", () => {
  const selectedVibe = document.getElementById("vibeSelect").value;
  const resultDiv = document.getElementById("result");

  fetch("music.json")
    .then(res => res.json())
    .then(data => {
      // Filter by vibe
      const vibeMatches = data.filter(entry => entry.vibe === selectedVibe);

      if (vibeMatches.length === 0) {
        resultDiv.innerHTML = `<p>No matches found for that vibe.</p>`;
        return;
      }

      // Pick a random reference BPM from the vibe group
      const reference = vibeMatches[Math.floor(Math.random() * vibeMatches.length)];
      const bpmRange = [reference.bpm - 10, reference.bpm + 10];

      // Filter again by BPM proximity
      const bpmMatches = vibeMatches.filter(entry =>
        entry.bpm >= bpmRange[0] && entry.bpm <= bpmRange[1]
      );

      // Pick final match
      const finalMatch = bpmMatches[Math.floor(Math.random() * bpmMatches.length)];

      resultDiv.innerHTML = `
        <h2>${finalMatch.modern}</h2>
        <p><strong>Retro Match:</strong> ${finalMatch.retro}</p>
        <p><strong>Vibe:</strong> ${finalMatch.vibe}</p>
        <p><strong>BPM:</strong> ${finalMatch.bpm}</p>
        <p>${finalMatch.notes}</p>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = `<p>Error loading music data.</p>`;
      console.error(err);
    });
});
