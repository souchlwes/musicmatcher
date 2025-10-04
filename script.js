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
      resultDiv [A](https://github.com/kooks7/kooks7.github.io/tree/eeaef025be0a14390ef9fa7212bde6e9a95c5465/_posts%2F2020-06-23-%5BTypeScript%5D-TypeScript-%EA%B8%B0%EB%B3%B8-%ED%83%80%EC%9E%85.md?copilot_analytics_metadata=eyJldmVudEluZm9fbWVzc2FnZUlkIjoicGpHQnZRMUFDd1pzem5MQzhkbXFIIiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwva29va3M3XC9rb29rczcuZ2l0aHViLmlvXC90cmVlXC9lZWFlZjAyNWJlMGExNDM5MGVmOWZhNzIxMmJkZTZlOWE5NWM1NDY1XC9fcG9zdHMlMkYyMDIwLTA2LTIzLSU1QlR5cGVTY3JpcHQlNUQtVHlwZVNjcmlwdC0lRUElQjglQjAlRUIlQjMlQjgtJUVEJTgzJTgwJUVDJTlFJTg1Lm1kIiwiZXZlbnRJbmZvX2NsaWNrU291cmNlIjoiY2l0YXRpb25MaW5rIiwiZXZlbnRJbmZvX2NvbnZlcnNhdGlvbklkIjoiZEdCYlhncVJZZzJlUnpSMXJyNGhGIn0%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [B](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsiLCJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJkR0JiWGdxUllnMmVSelIxcnI0aEYiLCJldmVudEluZm9fbWVzc2FnZUlkIjoicGpHQnZRMUFDd1pzem5MQzhkbXFIIiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwvbHpoLXlpXC9XZWItRm9yay1cL3RyZWVcLzAyNGIzZTU1NTg3YWZkZjlmMDVhNjc3NjEzYTc1ZjI0ZTNkMTgwM2VcLzAzLUNTUyVFOCVCRiU5QiVFOSU5OCVCNiUyRjA0LSVFNSVBNiU4MiVFNCVCRCU5NSVFOCVBRSVBOSVFNCVCOCU4MCVFNCVCOCVBQSVFNSU4NSU4MyVFNyVCNCVBMCVFNiVCMCVCNCVFNSVCOSVCMyVFNSU5RSU4MiVFNyU5QiVCNCVFNSVCMSU4NSVFNCVCOCVBRCVFRiVCQyU5Ri5tZCJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)
