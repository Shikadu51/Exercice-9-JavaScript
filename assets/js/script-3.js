$(document).ready(function () {
    // Stockage des mots de 9 lettres. 
    var tableau = [
      [
"glycolytique",
"carboxylique",
"chrysophycee",
"glycolytique",
"hydronymique",
"dysthymiques",
"cryophysique",
"phytotoxique",
"paroxysmique",
"hypochloreux",
"hypocycloide",
"kalachnikovs",
"hypernerveux",
"lymphocytose",
"zygomatiques",
"kymographies",
"homocyclique",
],
];


var randomCategoryArray =
tableau[Math.floor(Math.random() * tableau.length)];

var randomWord =
randomCategoryArray[
Math.floor(Math.random() * randomCategoryArray.length)
].toUpperCase();

// console.log(randomWord);
var randomWordArray = randomWord.split("");

// Dessinez des carrés pour le mot secret et cachez les lettres.
for (var i = 0; i < randomWord.length; i++) {
$("#container").append('<div class="lettre ' + i + '"></div>');
$("#container")
.find(":nth-child(" + (i + 1) + ")")
.text(randomWordArray[i]);
$(".lettre").css("color", "#4ABDAC");
}

// Bouton clique fonction
var wrong = 0;
$("button").on("click", function () {
$(this).addClass("used");
$(this).prop("disabled", "true");
var matchFound = false;

// Vérifiez si la lettre cliquée est dans le mot secret
var userGuess = $(this).text();
for (var i = 0; i < randomWord.length; i++) {
if (userGuess == randomWord.charAt(i)) {
  $("#container")
    .find(":nth-child(" + (i + 1) + ")")
    .css("color", "#EFEFEF")
    .addClass("winner");
  matchFound = true;
}
}

//Vérifier le gagnant
var Win = [];
$(".lettre").each(function (index) {
if ($(this).hasClass("winner")) {
  Win.push(index);
  if (Win.length == randomWordArray.length) {
    $("#container").hide();
    $("button").prop("disabled", "true");
    $(".categorie").text("Bravo, vous avez deviné le mot secret !");
    $(".categorie").append(
      "<br><button enabled class='rejouer'>Rejouez ?</button>"
    );
  }
}
});

// Si aucune correspondance, augmenter le nombre et ajouter l'image appropriée.
if (matchFound === false) {
wrong += 1;
$("#pendu").attr("src", "/assets/pendu/" + wrong + ".png");
}

// Loose
//GESTION des neuf tentatives possible
if (wrong === 9) {
$("#container").hide();
$("button").prop("disabled", "true");
$(".categorie").text(
  "Désolé vous avez perdu, le mot était " + randomWord
);
$(".categorie").append(
  "<br><button enabled class='rejouer'>Rejouez ?</button>"
);
}

//Rejouer
$(".rejouer").on("click", function () {
location.reload();
});
});
});