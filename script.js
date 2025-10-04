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
        <h2>${finalMatch.modern}</h2>
        <p><strong>Retro Match:</strong> ${finalMatch.retro}</p>
        <p><strong>Vibe:</strong> ${finalMatch.vibe}</p>
        <p><strong>BPM:</strong> ${finalMatch.bpm}</p>
        <p>${finalMatch.notes}</p>
      [A](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9semgteWlcL1dlYi1Gb3JrLVwvdHJlZVwvMDI0YjNlNTU1ODdhZmRmOWYwNWE2Nzc2MTNhNzVmMjRlM2QxODAzZVwvMDMtQ1NTJUU4JUJGJTlCJUU5JTk4JUI2JTJGMDQtJUU1JUE2JTgyJUU0JUJEJTk1JUU4JUFFJUE5JUU0JUI4JTgwJUU0JUI4JUFBJUU1JTg1JTgzJUU3JUI0JUEwJUU2JUIwJUI0JUU1JUI5JUIzJUU1JTlFJTgyJUU3JTlCJUI0JUU1JUIxJTg1JUU0JUI4JUFEJUVGJUJDJTlGLm1kIiwiZXZlbnRJbmZvX2NvbnZlcnNhdGlvbklkIjoiZEdCYlhncVJZZzJlUnpSMXJyNGhGIiwiZXZlbnRJbmZvX21lc3NhZ2VJZCI6IkpKV3gyUDI3ZWN3djVFWVRIbVp6biIsImV2ZW50SW5mb19jbGlja1NvdXJjZSI6ImNpdGF0aW9uTGluayJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)
