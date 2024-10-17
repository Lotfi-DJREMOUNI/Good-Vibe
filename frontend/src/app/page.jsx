"use client";
import React, { useState, useEffect } from "react";
import ExpressYourselfInputBox from "@/components/express-yourself-input-box";
import NewComponent from "@/components/new-component";

function MainComponent() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then(registration => {
            console.log("Service Worker enregistré avec succès : ", registration.scope);
          })
          .catch(error => {
            console.log("Erreur lors de l'enregistrement du Service Worker : ", error);
          });
      });
    }
  }, []);

  // Fonction pour appeler le backend local
  const checkMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/analyzeMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse({
          text: "Nous avons détecté des termes qui pourraient être offensants. Voici une suggestion de reformulation :",
          improvedMessage: data.improvedMessage,
          image: "/yoga-cartoon.jpg",
          law: "PS : Le cyberharcèlement c'est pas cool, et en plus c'est puni par la loi. Restons sympas, d'accord ? 😊",
        });
      } else {
        console.error("Erreur de la réponse API : ", data);
        setResponse({
          text: "Erreur lors de la vérification du message.",
          improvedMessage: "Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend :", error);
      setResponse({
        text: "Une erreur est survenue.",
        improvedMessage: "Impossible de vérifier le message pour l'instant.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Le Détecteur de Bonne Humeur 😊
            </div>
            <p className="mt-2 text-gray-500">
              Entrez votre message et voyons si on peut répandre un peu plus de positivité dans le monde !
            </p>
            <ExpressYourselfInputBox
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
            />
            <NewComponent
              onClick={checkMessage}
              buttonText={loading ? "Vérification..." : "Vérifier la bonne vibes"}
              disabled={loading}
            />
            {response && (
              <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
                <p className="font-bold">Conseil amical :</p>
                <p>{response.text}</p>
                <img
                  src=src="/zen.jpg"
                  alt="Personnage animé faisant du yoga"
                  className="mt-4 w-full rounded-lg"
                />
                <p className="mt-4 font-bold text-green-600">
                  {response.improvedMessage}
                </p>
                <p className="mt-4 text-sm italic">{response.law}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
