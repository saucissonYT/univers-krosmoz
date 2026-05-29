/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  var script = document.createElement("script");
  script.src = document.currentScript ? new URL("../data/search/search-data.js", document.currentScript.src).href : "data/search/search-data.js";
  script.async = false;
  document.currentScript.after(script);
}());
