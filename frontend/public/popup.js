chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});
async function analyzeMessage(message) {
    try {
      console.log("Envoi de la requête à l'API avec le message:", message);
      const response = await fetch("http://localhost:3001/api/analyzeMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
  
      const data = await response.json();
      console.log("Réponse de l'API:", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la requête à l'API:", error);
      return { error: "Erreur lors de la requête à l'API." };
    }
  }
  
  function sendMessageToBackground() {
    const message = document.querySelector("textarea[name='message']").value;
    console.log("Envoi du message au background:", message);
  
    analyzeMessage(message).then((response) => {
      console.log("Réponse reçue:", response);
      if (response && response.improvedMessage) {
        alert("Message analysé: " + response.improvedMessage);
      } else {
        alert("Erreur lors de l'analyse du message.");
      }
    }).catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur lors de l'analyse du message.");
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("analyzeButton");
    if (button) {
      button.addEventListener("click", sendMessageToBackground);
      console.log("Le bouton est maintenant cliquable.");
    }
  });
  