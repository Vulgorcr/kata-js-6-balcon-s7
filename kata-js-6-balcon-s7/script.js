// =====================================================
// Kata JS 6 — Mon balcon
// Suis les TODO dans l'ordre. La constante plantes vient de plantes.js.
// =====================================================


// ---------- PARTIE 1 : les fonctions qui CALCULENT ----------
// Elles reçoivent des données et RETOURNENT un résultat.
// Elles ne touchent pas à la page.


// TODO 1 — compterAArroser(liste)
// Retourne le nombre de plantes de la liste dont aArroser vaut true.
function compterAArroser(liste) {

    let compteur = 0;

    liste.forEach((plante) => {
        if (plante.aArroser === true) {
            compteur++;
        }
    });

    return compteur;
}

// Vérifie dans la console avant de passer à la suite :
console.log(compterAArroser(plantes)); // doit afficher 4


// TODO 2 — filtrerParLieu(liste, lieu)
// Retourne un NOUVEAU tableau avec seulement les plantes dont le lieu
// est égal au paramètre lieu ("intérieur" ou "extérieur").
function filtrerParLieu(liste, lieu) {

    const resultat = [];

    liste.forEach((plante) => {
        if (plante.lieu === lieu) {
            resultat.push(plante);
        }
    });

    return resultat;
}

console.log(filtrerParLieu(plantes, "intérieur")); // doit afficher 4 plantes


// ---------- PARTIE 2 : les fonctions qui AFFICHENT ----------
// Elles modifient la page. Elles ne retournent rien.


// TODO 3 — afficherPlantes(liste)
// 1. Vide la liste <ul id="liste">
// 2. Pour chaque plante, crée un <li> qui contient l'emoji puis le nom
// 3. Si la plante est à arroser, ajoute au <li> la classe "a-arroser"
// 4. Mets à jour <p id="compteur"> : « 4 plantes à arroser sur 8 »
//    (utilise compterAArroser, ne recompte pas ici)
function afficherPlantes(liste) {

    const listeHTML = document.querySelector("#liste");
    const compteurHTML = document.querySelector("#compteur");

    // 1. Vider la liste
    listeHTML.textContent = "";

    // 2. Créer un élément pour chaque plante
    liste.forEach((plante) => {

        const element = document.createElement("li");

        element.textContent = `${plante.emoji} ${plante.nom}`;

        // 3. Ajouter la classe si la plante doit être arrosée
        if (plante.aArroser) {
            element.classList.add("a-arroser");
        }

        listeHTML.appendChild(element);
    });

    // 4. Mettre à jour le compteur
    const nombreAArroser = compterAArroser(liste);
    const total = liste.length;

    compteurHTML.textContent =
        `${nombreAArroser} plantes à arroser sur ${total}`;
}


// TODO 4 — Au chargement de la page, affiche toutes les plantes.

afficherPlantes(plantes);


// ---------- PARTIE 3 : les clics ----------


// TODO 5 — Les trois boutons de filtre
// Au clic sur « Intérieur » : affiche seulement les plantes d'intérieur.
// Au clic sur « Extérieur » : seulement celles d'extérieur.
// Au clic sur « Toutes » : toutes les plantes.
// Les gestionnaires sont des fonctions fléchées : () => { ... }

const boutonToutes = document.querySelector("#btn-toutes");
const boutonInterieur = document.querySelector("#btn-interieur");
const boutonExterieur = document.querySelector("#btn-exterieur");


boutonInterieur.addEventListener("click", () => {

    const plantesInterieur = filtrerParLieu(plantes, "intérieur");

    afficherPlantes(plantesInterieur);

    activerBouton(boutonInterieur);
});


boutonExterieur.addEventListener("click", () => {

    const plantesExterieur = filtrerParLieu(plantes, "extérieur");

    afficherPlantes(plantesExterieur);

    activerBouton(boutonExterieur);
});


boutonToutes.addEventListener("click", () => {

    afficherPlantes(plantes);

    activerBouton(boutonToutes);
});


// TODO 6 — Le bouton actif
// Le bouton cliqué prend la classe "actif", les deux autres la perdent.

function activerBouton(bouton) {

    boutonToutes.classList.remove("actif");
    boutonInterieur.classList.remove("actif");
    boutonExterieur.classList.remove("actif");

    bouton.classList.add("actif");
}


// =====================================================
// Questions de recul
// =====================================================

/*
1. Laquelle de tes fonctions pourrait-on tester avec Jest,
et laquelle non ? Pourquoi ?

Les fonctions compterAArroser et filtrerParLieu peuvent être
testées avec Jest car elles reçoivent des données et retournent
un résultat avec return. Elles ne modifient pas la page.

La fonction afficherPlantes est plus difficile à tester avec
un test unitaire simple car elle modifie directement le DOM.


2. Dans afficherPlantes, que se passe-t-il si tu oublies
de vider la liste au début ?

Les anciennes plantes restent affichées.
À chaque clic sur un bouton, les nouvelles plantes s'ajoutent
aux anciennes. Cela crée des doublons et la liste devient
de plus en plus longue.


3. Que se passe-t-il si tu inverses l'ordre des deux balises
script dans index.html ?

Le fichier script.js sera exécuté avant plantes.js.
La constante plantes ne sera donc pas encore disponible.

La console affichera une erreur ReferenceError :
Cannot access 'plantes' before initialization.

Il faut donc charger plantes.js avant script.js.
*/

// =====================================================
