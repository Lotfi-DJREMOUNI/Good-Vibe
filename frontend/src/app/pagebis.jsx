"use client";
import React from "react";
import ExpressYourselfInputBox from "@/components/express-yourself-input-box";
import NewComponent from "@/components/new-component";
function MainComponent() {
  const [message, setMessage] = React.useState("");
  const [response, setResponse] = React.useState(null);
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/æ/g, "ae")
      .replace(/œ/g, "oe")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");
  };

  const offensiveWords = {
    connard: { type: "general", polite: "mon ami" },
    insulte: { type: "general", polite: "critique constructive" },
    menace: { type: "general", polite: "avertissement amical" },
    debile: { type: "general", polite: "mon ami" },
    idiot: { type: "general", polite: "mon ami" },
    stupide: { type: "general", polite: "mon ami" },
    pedale: {
      type: "homophobe",
      polite: "personne differente de moi sexuellement parlant",
    },
    pede: {
      type: "homophobe",
      polite: "personne differente de moi sexuellement parlant",
    },
    pd: {
      type: "homophobe",
      polite: "personne differente de moi sexuellement parlant",
    },
    tafiole: {
      type: "homophobe",
      polite: "personne qui assume sa part de feminite",
    },
    tapette: {
      type: "homophobe",
      polite: "personne qui assume sa part de feminite",
    },
    tantouze: {
      type: "homophobe",
      polite: "personne explore d'autres horizons",
    },
    tarlouze: {
      type: "homophobe",
      polite: "personne explore d'autres horizons",
    },
    fiotte: { type: "homophobe", polite: "être qui explore d'autres horizons" },
    gouine: { type: "homophobe", polite: "femme respectée" },
    negre: { type: "racial", polite: "mon ami de couleur" },
    bougnoule: { type: "racial", polite: "mon ami" },
    salope: { type: "sexiste", polite: "mon ami" },
    putain: { type: "sexiste", polite: "mon ami" },
    pute: { type: "sexiste", polite: "mon ami" },
    connasse: { type: "sexiste", polite: "mon ami" },
    poufiasse: { type: "sexiste", polite: "mon ami" },
    enculé: { type: "general", polite: "mon ami" },
    batard: { type: "general", polite: "mon ami" },
    sale: { type: "general", polite: "mon ami" },
    merde: { type: "general", polite: "chose" },
    conne: { type: "sexiste", polite: "mon amie au capacite diminuee" },
    bite: { type: "general", polite: "membre actif" },
    couille: { type: "general", polite: "bourse" },
    nique: { type: "general", polite: "zut" },
    foutre: { type: "general", polite: "mettre" },
    chier: { type: "general", polite: "embêter" },
    gueule: { type: "general", polite: "visage" },
  };

  const improveMessage = (msg) => {
    let improvedMsg = msg.toLowerCase();
    for (const [offensive, { polite }] of Object.entries(offensiveWords)) {
      improvedMsg = improvedMsg.replace(new RegExp(offensive, "gi"), polite);
    }
    return improvedMsg.charAt(0).toUpperCase() + improvedMsg.slice(1);
  };

  const checkMessage = () => {
    const normalizedMessage = normalizeText(message);
    const foundOffensiveWord = Object.entries(offensiveWords).find(
      ([word, _]) => normalizedMessage.includes(normalizeText(word))
    );

    if (foundOffensiveWord) {
      const [offensiveWord, { type, polite }] = foundOffensiveWord;
      const improvedMessage = improveMessage(message);
      let responseText, responseSuggestion;

      switch (type) {
        case "homophobe":
          responseText =
            "Oups ! L'homophobie est très grave et blessante. Rappelons-nous que l'amour est universel et que chacun mérite le respect, quelle que soit son orientation.";
          responseSuggestion =
            "Essayez de comprendre et d'accepter les différences. La diversité est ce qui rend notre monde si riche !";
          break;
        case "racial":
          responseText =
            "Attention ! Les propos racistes sont inacceptables. Nous sommes tous humains, faits d'amour et égaux en droits.";
          responseSuggestion =
            "Célébrons nos différences culturelles au lieu de les critiquer. Chaque culture apporte quelque chose d'unique au monde !";
          break;
        case "sexiste":
          responseText =
            "Halte là ! Le sexisme n'a pas sa place dans notre société. Hommes et femmes méritent un respect égal.";
          responseSuggestion =
            "Réfléchissons à la manière dont nous pouvons promouvoir l'égalité des genres dans notre langage et nos actions quotidiennes.";
          break;
        default:
          responseText =
            "Oups ! On dirait que quelqu'un a besoin d'une pause zen ! 🧘‍♂️ Rappelez-vous, le stress est mauvais pour la santé.";
          responseSuggestion =
            "Pourquoi ne pas prendre une grande respiration et reformuler ça de manière plus positive ?";
      }

      setResponse({
        text: responseText,
        image: "/yoga-cartoon.jpg",
        suggestion: responseSuggestion,
        law: "PS : Le cyberharcèlement c'est pas cool, et en plus c'est puni par la loi. Restons sympas, d'accord ? 😊",
        improvedMessage: `Suggestion d'amélioration : "${improvedMessage}"`,
      });
    } else {
      setResponse(null);
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
              Entrez votre message et voyons si on peut répandre un peu plus de
              positivité dans le monde !
            </p>
            <ExpressYourselfInputBox
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
            />
            <NewComponent
              onClick={checkMessage}
              buttonText="Vérifier la bonne vibes"
            />
            {response && (
              <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
                <p className="font-bold">Conseil amical :</p>
                <p>{response.text}</p>
                <img
                  src={response.image}
                  alt="Personnage animé faisant du yoga"
                  className="mt-4 w-full rounded-lg"
                />
                <p className="mt-4">{response.suggestion}</p>
                <p className="mt-4 text-sm italic">{response.law}</p>
                <p className="mt-4 font-bold text-green-600">
                  {response.improvedMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;