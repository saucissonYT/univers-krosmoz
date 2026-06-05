petit changelog pour expliquer les modifications du site et les corrections :

05/06/2026

- Mise à jour de la page d’accueil
- Ajout de nouveaux visuels sur l’accueil
- Ajout d’une barre de progression sur l’accueil
- Ajout du Dofus Forgelave
- Ajustement de la recherche des artefacts
- Suppression de l’ancien visuel colonne-crop.webp
- Ajout de nouveaux groupes sur la page Groupes
- Mise à jour des cartes de groupes
- Ajout de Klime, Missiz Frizz et Nileza dans les liens personnages
- Ajustement de plusieurs fiches personnages
- Mise à jour des styles CSS de l’accueil, des artefacts, des groupes et des personnages
- Mise à jour des fichiers de recherche et navigation
- Mise à jour du sitemap
- Ajout de nombreuses redirections dans _redirects
- Nettoyage de fichiers inutilisés non référencés dans le projet

03/06/2026

- Ajout d’une barre de recherche sur la page Artefacts
- Ajout du tri A-Z sur les artefacts
- Ajustement du style du bandeau Artefacts pour le rapprocher de celui des Régions
- Ajout d’une fine barre dorée entre la navbar et le bandeau Artefacts
- Ajout de nouveaux artefacts et images associées : Dofus Argenté Dofus Cawotte Dofus Tacheté Dofus Vulbis Dolmanax Domakuro Dorigami
- Ajout de nouveaux personnages et portraits : Amayiro Az Ilyzaelle Imagirorukam Oto Mustam
- Ajout de nouveaux groupes : Bontariens Brakmariens
- Mise à jour de plusieurs pages Régions
- Mise à jour de plusieurs pages Personnages
- Mise à jour de plusieurs pages Groupes
- Mise à jour des fichiers de recherche, navigation et sitemap
- Mise à jour de styles CSS et scripts JS liés aux pages index et détails

02/06/2026

- changement de la gestion des likes sur les pages, json > SQLite

- Page d’accueil ajustée : fond histoire en image au lieu de vidéo, pop-up Méryde réduite.
- Page Almanax enrichie avec un encart et une intro sur les Mérydes.
- Index des régions réorganisé en grandes catégories.
- Styles des cartes régions améliorés.
- Image de Kelba remplacée et actualisée.
- Signatures projet ajoutées ou corrigées dans plusieurs fichiers JS/CSS.

01/06/2026

- Ajout de la page / section Almanax.
- Ajout de nouveaux personnages et de leurs pages.
- Ajout de nouveaux groupes, dont les Mérydes et les Poupées de Sadida.
- Ajout de nouveaux visuels pour personnages, groupes et œuvres.
- Mise à jour de plusieurs pages personnages existantes.
- Amélioration des chronologies et des pages œuvres.
- Mise à jour de la recherche et des données associées.
- Améliorations visuelles sur plusieurs pages du site.
- Ajout de data/reactions/page-likes.json au .gitignore.
- Retrait du fichier des likes du suivi Git pour éviter la remise à zéro au push.


- Personnages ajoutés :

Bellodana
Bethel Akarna
Ecaron
Gein
Ibago
Lacrima
Ladysally
Lophapharo
Maminala
Meriana
Pepavara
Razeriane
Yopo

- Personnages existants modifiés :

Belladone
Biste
Dathura
Dragon Cochon
Efrim
Frida Mofette
Glip
Grande Déesse Eliatrope
Hyrkul
Ignemikhal
Lancedur
Lokus
Lou
Maimane
Maskemane
Menalt
Mina
Percimol
Phaeris
Rathrosk
Razortemps
Xav le Boulanger
Yrehn

31/05/2026

- Refonte du logo du site & favicon. 
- Logo de la navbar légèrement agrandi.
- Ajout de favicons propres : .ico, PNG 32x32 et Apple Touch Icon.
- Mise à jour des pages existantes pour utiliser les nouvelles favicons.
- Ajout automatique des favicons sur les nouvelles pages si elles chargent les scripts communs via legal-notice & site-commun.js 



 page artefact : 
- Responsive mobile ajouté.
- Colonne mobile élargie et placée sous l’artefact.
- Texte mobile centré.
- Cadre texte fixé sur la moitié basse de l’écran.
- Scroll interne gardé, scrollbar cachée.
- Petite flèche ajoutée quand il reste du texte à lire.
- Cadre texte stabilisé pour ne plus bouger entre les artefacts.

29/05/2026


- Ajout d’une nouvelle page dédiée aux artefacts du Krosmoz.
- Ajout des ressources visuelles associées : Dofus, Dokoko, Eliacube, faux Dofus et visuels de décor.
- Ajout du script dédié à l’affichage et aux interactions de la page Artefacts.
- Ajout de la feuille de style spécifique à cette nouvelle section.


- Ajout de l’entrée “Artefacts” dans le menu principal, dans la catégorie “Autres”.
- Ajout des routes et redirections propres à la page Artefacts.
- Ajout de la page Artefacts au sitemap.

- Ajustement de l’affichage du compteur de cœurs sur les pages de groupes et de régions.
- Repositionnement du bloc de vote dans les aperçus de détail lorsqu’il est présent.


- Simplification des textes affichés autour du vote.
- Gestion plus souple de la note explicative, désormais optionnelle selon le contexte.
- Allègement de l’affichage du compteur dans certains modes, notamment les vues résumé.




28/05/2026

- Ajout d’un système de cœurs pour aimer les pages de personnages, régions et groupes.
- Ajout d’une API locale pour enregistrer, récupérer et annuler les votes.
- Ajout du fichier de données des réactions : `data/reactions/page-likes.json`.
- Mise à jour de la galerie pour inclure aussi les images de régions et de groupes, pas seulement les personnages.
- Amélioration de la recherche et des textes de la page Galerie.
- Mise à jour des visuels de Jiva avec de nouvelles images de bannière et de carte.
- Remplacement de l’ancienne carte de Jiva sur les pages liées : personnages, Bonta, Frigost, Gardiens des Mois et test de personnalité.
- Ajustement du fond de la page personnage de Jiva.
 - Conversion des dernières images d'assets encore en .png vers .webp et mise à jour des chemins concernés.
 - Normalisation des noms d'images les plus problématiques, dont les portraits d'affinités générés avec identifiants techniques, et mise à jour des chemins associés.
 - correction d'une incohérence liée à la saison 4, modification du texte dans 24 pages. (rapport à l'éliacube)

groupes/eliatropes
groupes/mechasmes
histoire/necromonde
histoire/island of wakfu
histoire/origines
personnages/adamai
personnages/balthazar
personnages/efrim
personnages/glip
personnages/grande-deesse
personnages/grougaloragran
personnages/mina
personnages/nora
personnages/orgonax
personnages/phaeris
personnages/qilby
personnages/shinonome
personnages/yugo
regions/inglorium
region/monde-des-douzes
region/necromonde


27/05/2026 :

- Ajout de la rubrique : Groupes avec les groupes suivants :

Confrérie du tofu
éliatropes
éliotropes
fratrie des oubliés
gardiens des mois
méchasmes
multimans
ordre du coeur vaillant


- Ajout de nouveaux personnages :

Allister
Brumaire
Hécate
Maimane
Ménalt
Pouchecot
Prysmaradoth
Rathrosk
Raval
Reine des Voleurs
Roi Nidas
Rosal
Silouate
Silvosse
Solar
Sumens
Thanatena
Ulgrude

- Mise à jour de Djaul avec une nouvelle image et de nouvelles infos.
- Suppression de Bellaphone côté personnages, déplacé vers les groupes.
- Ajout de liens internes vers les nouvelles pages de groupes dans plusieurs biographies.
- Mise à jour du menu principal : ajout de Groupes, déplacement de Jeux dans Autres.
- Passage général aux URLs propres sans .html.
- Ajout de redirections des anciennes URLs .html vers les nouvelles URLs sans .html.
- Passage du domaine canonique en https://univers-krosmoz.fr sans www.
- Redirection du www vers univers-krosmoz.fr.
- Mise à jour du sitemap.xml avec les nouvelles pages et les URLs sans .html.
- Mise à jour des balises SEO : canonical, Open Graph, Twitter et JSON-LD.
- Ajout des preconnect Google Fonts pour optimiser le chargement des polices.
- Suppression d’anciens médias d’accueil devenus inutilisés.
- Enrichissement du test de personnalité avec beaucoup de nouveaux résultats/personnages.
- Mise à jour du quiz Krosmoz.
- Ajustements visuels sur l’accueil, les pages personnages, les jeux et les régions.

25/05/2026 :

- Modification et simplification du backend du krosmoz-quiz : utilisation d'un CSV modifiable et autoupdate avec cache buster
- Optimisation du format de certaines images encore en .png vers .webp
- Ajout d'un système de tri dans la page d'index des régions.
- Correction de texte, fautes de frappes, accents sur diverses pages.

- Ajout de 32 nouvelles régions & biographies : 

abysses-sufokia
arbre-vagabonds
bibliotemple
bilbyza
cania
crocuzko
dimension-obscure
domaine-sauvage
ereboria, ether
externam
foire-du-trool
ile-aux-moines
ile-de-rok
ile-des-brumes
ile-minotoror
ile-nowel
ile-wabbits
katrepat
kelba
kolizeum
mer-dasse
mont-zinit
montagnes-koalaks
nimotopia
pandalousie
plan-materiel
pyramide-ocre
royaume-chuchoku
royaume-sadida
srambad
vulkania

- Ajout de 5 nouveaux personnages : 

balance-krosmique
ereziah-melkewel
lance-originelle
ombre
prosperus-elementor

- Corrections/ajouts dans sitemap.xml, _redirects, recherche globale et données SEO : 
    Ajout de 5 redirections courtes pour les nouveaux personnages :
     /balance-krosmique.html -> /pages/personnages/balance-krosmique.html
     /ereziah-melkewel.html -> /pages/personnages/ereziah-melkewel.html
     /lance-originelle.html -> /pages/personnages/lance-originelle.html
     /ombre.html -> /pages/personnages/ombre.html
     /prosperus-elementor.html -> /pages/personnages/prosperus-elementor.html

- Ajout de 58 nouvelles entrées dans l'index de recherche 
- Ajout de "Zaki" dans les métadonnées de l'accueil & index avec redirection vers a-propos. 
- Ajout de redirections globales vers / et plus vers .html 

24/05/2026 :

- Ajout de la page "à propos" : informations sur la création du site et notre façon  de fonctionner. 
- Refonte de la chronologie des oeuvres > ajout de la page "oeuvre" qui retrace mieux les oeuvres liées au krosmoz et à son univers.
- Ajout de la page histoire : Savara
- Ajout des régions et leurs biographies : 

incarnam
nécromonde
osavora
enutrosor


23/05/2026 : 

- Création d'un README et d'un CHANGELOG pour être plus transparents sur ce qu'on fait ou non.
- Optimisation du code et réorganisation de l'arborescence de travail : styles/, pages/, data/, assets/, scripts/
- Optimisation des images de l'accueil : passage de PNG à WebP et mise à jour du CSS 

- Correction de la biographie de dathura : oublie de plusieurs accents et faute de frappe
- Correction de la biographie de khan karkass : retour à la ligne trop brut
- Correction de la bioraphie de Qilby :  oublie d'un accent, faute de frappe multiples
- Correction de la biographie de Joris : oublie d'accent et faute de frappe

- Refonte complète de l'accueil : fond visuel, optimisation, scroll dynamique 
- Correction d'un scroll inutile dans le jeu des personnages
- Correction d'un script region-detail-overview.js : mauvais chemin d'arborescence
- Ajout des mentions légales dans la page quiz-krosmoz 



- Nouveau contenu ajouté : 

 Ajout de pages de régions : 

Krosmoz
Inglorium
Monde des Douze 
Xélorium
Hormonde
Ecaflipus
Shukrute

Ajout de pages biographiques pour les régions :

Amakna
Archipel de Valonia
Astrub
Bonta
Brâkmar
Frigost
Île de Moon
Île d’Otomaï
Pandala
Saharach
sufokia
Krosmoz
Inglorium
Monde des Douze
Xélorium
Hormonde
Ecaflipus
Shukrute

Ajout de nouveaux visuels de régions :

Krosmoz
Inglorium
Monde des Douze
Xélorium
Hormonde
Ecaflipus
Shukrute

(certaines régions sont encore en éditions et n'ont donc pas de texte ou les bons personnages)
