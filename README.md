
License
-------

This software is licensed under
[GNU Affero General Public License version 3](http://www.gnu.org/licenses/agpl-3.0.html)

- Copyright (C) 2016-2022 SECURITYMADEIN.LU
- Copyright (C) 2016-2022 Jérôme Lombardi - https://github.com/jerolomb
- Copyright (C) 2016-2022 Juan Rocha - https://github.com/jfrocha
- Copyright (C) 2017-2022 Cédric Bonhomme - https://www.cedricbonhomme.org
- Copyright (C) 2016-2017 Guillaume Lesniak
- Copyright (C) 2016-2017 Thomas Metois
- Copyright (C) 2016-2017 Jérôme De Almeida
- Copyright (C) 2019-2022 Ruslan Baidan - https://github.com/ruslanbaydan

For more information, [the list of authors and contributors](AUTHORS) is available.

Disclaimer: This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.
See the GNU Affero General Public License for more details.


LIBRARIES

Libraries pour React : 
- React
- React Redux ( + Redux Toolkit + extension Chrome Redux DevTools très pratique : permet de voir les données du store Redux en temps réel)
- React-DOM
- TypeScript
- React2Angular

Librairie Drag And Drop : dnd-kit

Librairie Traduction : i18next

Librairie CSS/Style :
- Bootstrap
- Bootstrap Icons
- Select2 ( + jQuery pour utiliser Select2)

Librairie nécessaire à la conversion et compilation des fichier TSX en JS : 
- babel preset-env
- babel preset-react
- babel preset-typescript
- babel plugin transform es2015 module strip
- grunt babel
- grunt ts



COMPONENTS

INPUTS : 
- InputWithIcon : Input avec un Icon et un label. Si le champ doit être rempli, une étoile apparaît à côté du label et s’il n’est pas rempli, alors il deviendra rouge. 	
- EmailInput : Même fonctionnement que l’InputWithIcon, sauf que si l’utilisateur entre une adresse email incorrecte, le composant devient rouge.


SELECTS : 
- Select : Select avec un Icon et un label.
- SearchSelect : Composant utilisant la librairie Select2. Permet de chercher une option, d’en sélectionner plusieurs ainsi que de les retirer de la sélection sans ouvrir le select.
- CustomSelect : Select customisé afin d’effectuer une recherche sur beaucoup d’options avec une requête au back-end.


POPUP : Popup servant par exemple à la réinitialisation du mot de passe d’un utilisateur ou à la suppression d’un utilisateur.


PAGINATION : Composant permettant de choisir le nombre de ligne et la page d’un tableau (par exemple dans la partie ManageUser)


DROPDOWNMENU : Composant permettant de dérouler une certaine partie de la page pour afficher plus d’informations.


MODAL : 
- AddAssetModal : Modal permettant d’ajouter un asset.
- AddCategoryModal : Modal permettant d’ajouter et/ou de modifier une catégorie.
- AssetImportCenterModal : Modal permettant de naviguer vers trois autres modals.
- CSVFileImportCenterModal : Modal permettant l’importation d’une categorie depuis un fichier CSV, XLXS, ODS ou JSON.
- MonarcExportFileModal : Modal permettant d’importer un asset depuis un fichier JSON.
- MonarcLibraryModal : Modal permettant d'importer un actif.
- MOSPImportAssetModal : Modal permettant d’importer un actif depuis le MOSP (pas fini)
- UserModal: Modal permettant de modifier ou de créer un utilisateur.

MANAGEUSER : 
- ManageUser : page permettant de gérer les utilisateurs.
- HeaderCell : Header du tableau des utilisateurs permettant de trier le tableau en fonction de l’ordre alphabétique des champs du tableau.

ANRRISKANALYSIS : Page regroupant toutes les informations liées à un projet.

ANRRISKANALYSISDRAGNDROP (fait partie de ANRRISKANALYSIS) : 
- CategorieName : Composant affichant les noms des différentes catégories du projet, permettent aussi d’afficher les éléments enfants de ces catégories.
- CategorieDraggable : Composant permettant de drag les éléments enfants des catégories.
- DisplayCategories : Composant permettant l’affichage de l’ensemble des catégories et de leurs éléments enfants.
- Droppable : Composant permettant de définir les zones où pourront être drop les éléments enfants des categories.
- InnerDroppable : Composant permettant de drop un élément enfant directement dans un asset déjà existant.
- InstanceDraggable : Composant permettant le drag d’une instance afin de la déplacer ou de l’introduire dans une autre instance.
- LinkDroppable : Composant permettant le premier drop quand aucun instance n’a été sélectionné. Permet aussi d’ajouter une instance en première position.


REDUXWRAPPER : Permet d’instancier Redux dans toute l’application. (doit être au plus au niveau de l’arbre)
