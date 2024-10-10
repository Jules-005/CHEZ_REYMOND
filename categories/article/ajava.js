const articles = [
    // Catégories prioritaires (accès direct avec ../)
    { title: "T-shirts", category: "T-shirts", link: "../tshirt.html" },
    { title: "Pantalons", category: "Pantalons", link: "../pantalons.html" },
    { title: "Ensembles", category: "Ensembles", link: "../ensembles.html" },
    { title: "Chaussures", category: "Chaussures", link: "../chaussures.html" },

    // Articles dans le dossier "article" (accès direct)
    { title: "Bottines lacées Bugatti", category: "Chaussures", link: "bottinelacéesbugatti.webp.html" },
    { title: "Basket Kappa", category: "Chaussures", link: "basketkappa.html" },
    { title: "Chaussure de randonnée", category: "Chaussures", link: "chaussure de randonnée.html" },
    { title: "Mocassins", category: "Chaussures", link: "mocassins.html" },
    { title: "Slippers", category: "Chaussures", link: "slippers.html" },
    { title: "Sandales de marche", category: "Chaussures", link: "sandales de marche.html" },
    { title: "Slippers Mustang", category: "Chaussures", link: "slippers mustang.html" },
    { title: "Snikers", category: "Chaussures", link: "snikers.html" },
    { title: "Costume 2 pièces veste et pantalon", category: "Ensembles", link: "Costume 2 pièces veste et pantalon.html" },
    { title: "Costume Slim (ens. 4 pièces)", category: "Ensembles", link: "Costume Slim (ens. 4 pces).html" },
    { title: "T-shirt et bermuda", category: "Ensembles", link: "T-shirt et bermuda.html" },
    { title: "Ensemble survêtement Nike", category: "Ensembles", link: "ensemble survetement Nike.html" },
    { title: "Ensemble survêtement Puma", category: "Ensembles", link: "Ensemble survetement Puma.html" },
    { title: "Ensemble survêtement Adidas", category: "Ensembles", link: "Ensemble survetement Adidas.html" },
    { title: "Cargo", category: "Pantalons", link: "cargo.html" },
    { title: "Jean classique", category: "Pantalons", link: "jeanClasique.html" },
    { title: "Jean élastiqué", category: "Pantalons", link: "jeanelastiqué.html" },
    { title: "Bermuda long extensible", category: "Pantalons", link: "Bermuda long extensible.html" },
    { title: "Jean extensible", category: "Pantalons", link: "jeanextensible.html" },
    { title: "Jean slim", category: "Pantalons", link: "JeanSlim.html" },
    { title: "Pantalon extensible", category: "Pantalons", link: "pantalonextensible.html" },
    { title: "Jogging", category: "Pantalons", link: "Jogging.html" },
    { title: "Pantalon thermo-extensible", category: "Pantalons", link: "pantalonthermoextensible.html" },
    { title: "Chemise à manches longues", category: "Chemises", link: "chemise à manche longue.html" },
    { title: "Chemise à manches courtes", category: "Chemises", link: "Chemise manches courtes.html" },
    { title: "T-shirt col Henley", category: "T-shirts", link: "T-shirt col Henley.html" },
    { title: "Lot de 3 t-shirts à col", category: "T-shirts", link: "Lot de 3 t-shirts à col.html" },
    { title: "T-shirt confort", category: "T-shirts", link: "T-shirt confort.html" },
    { title: "T-shirt coupe confort", category: "T-shirts", link: "T-shirt coupe confort.html" },
    { title: "T-shirt en coton", category: "T-shirts", link: "T-shirt en coton.html" },
    { title: "Polo", category: "T-shirts", link: "polo.html" },
];

function showSuggestions() {
    const query = document.getElementById("search").value.toLowerCase();
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = ''; // Vider les suggestions

    if (query.length === 0) {
        return; // Ne rien afficher si la recherche est vide
    }

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    if (filteredArticles.length > 0) {
        filteredArticles.sort((a, b) => {
            // Prioriser les catégories avant les titres
            if (a.category.toLowerCase().startsWith(query) && !b.category.toLowerCase().startsWith(query)) return -1;
            if (!a.category.toLowerCase().startsWith(query) && b.category.toLowerCase().startsWith(query)) return 1;
            return 0;
        });

        filteredArticles.forEach(article => {
            const div = document.createElement("div");
            div.classList.add("suggestion");
            div.innerHTML = `<strong>${article.category}</strong> - ${article.title}`;
            div.onclick = () => {
                window.location.href = article.link; // Redirection vers le lien
            };
            suggestionsContainer.appendChild(div);
        });
    }
}

function searchArticles() {
    const query = document.getElementById("search").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
    const suggestionsContainer = document.getElementById("suggestions");

    resultsContainer.innerHTML = ''; // On vide les résultats précédents
    suggestionsContainer.innerHTML = ''; // On vide les suggestions pour les cacher

    // Ne rien afficher si la barre de recherche est vide
    if (query.length === 0) {
        return;
    }

    // Filtrer les articles correspondants
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );

    // Si des résultats sont trouvés, afficher les 3 premiers
    if (filteredArticles.length > 0) {
        filteredArticles.slice(0, 3).forEach(article => { // Prendre les 3 premiers articles
            const div = document.createElement("div");
            div.innerHTML = `<a href="${article.link}" class="result-link">${article.title} - ${article.category}</a>`;
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.innerText = "Aucun résultat trouvé."; // Message si aucun résultat n'est trouvé
    }
}


// Charger les articles du panier depuis le localStorage ou initialiser avec un tableau vide
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Fonction pour ajouter un article au panier
function addToCart(productName, productPrice) {
    // Ajouter l'article au tableau cartItems
    cartItems.push({ name: productName, price: productPrice });
    
    // Sauvegarder les articles dans localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Mettre à jour le compteur d'articles dans le panier
    updateItemCount();
}

// Fonction pour rediriger vers la page du panier
function goToCart() {
    window.location.href = "cart.html"; // Redirection vers la page du panier
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateItemCount() {
    const itemCount = document.getElementById("item-count");
    if (itemCount) {
        itemCount.innerText = cartItems.length; 
    }
}

// Mettre à jour le compteur d'articles dès que la page se charge
window.onload = function() {
    updateItemCount();  // Appel de la fonction pour actualiser le nombre d'articles
}

