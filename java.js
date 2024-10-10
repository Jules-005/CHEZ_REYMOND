const articles = [
    // Catégories prioritaires (dans categories)
    { title: "T-shirts", category: "T-shirts", link: "categories/tshirt.html" },
    { title: "Pantalons", category: "Pantalons", link: "categories/pantalons.html" },
    { title: "Ensembles", category: "Ensembles", link: "categories/ensembles.html" },
    { title: "Chaussures", category: "Chaussures", link: "categories/chaussures.html" },

    // Articles dans le sous-dossier "article" de chaque catégorie
    { title: "Bottines lacées Bugatti", category: "Chaussures", link: "categories/chaussures/article/bottinelacéesbugatti.webp.html" },
    { title: "Basket Kappa", category: "Chaussures", link: "categories/chaussures/article/basketkappa.html" },
    { title: "Chaussure de randonnée", category: "Chaussures", link: "categories/chaussures/article/chaussure de randonnée.html" },
    { title: "Mocassins", category: "Chaussures", link: "categories/chaussures/article/mocassins.html" },
    { title: "Slippers", category: "Chaussures", link: "categories/chaussures/article/slippers.html" },
    { title: "Sandales de marche", category: "Chaussures", link: "categories/chaussures/article/sandales de marche.html" },
    { title: "Slippers Mustang", category: "Chaussures", link: "categories/chaussures/article/slippers mustang.html" },
    { title: "Snikers", category: "Chaussures", link: "categories/chaussures/article/snikers.html" },
    { title: "Costume 2 pièces veste et pantalon", category: "Ensembles", link: "categories/ensembles/article/Costume 2 pièces veste et pantalon.html" },
    { title: "Costume Slim (ens. 4 pièces)", category: "Ensembles", link: "categories/ensembles/article/Costume Slim (ens. 4 pces).html" },
    { title: "T-shirt et bermuda", category: "Ensembles", link: "categories/ensembles/article/T-shirt et bermuda.html" },
    { title: "Ensemble survêtement Nike", category: "Ensembles", link: "categories/ensembles/article/ensemble survetement Nike.html" },
    { title: "Ensemble survêtement Puma", category: "Ensembles", link: "categories/ensembles/article/Ensemble survetement Puma.html" },
    { title: "Ensemble survêtement Adidas", category: "Ensembles", link: "categories/ensembles/article/Ensemble survetement Adidas.html" },
    { title: "Cargo", category: "Pantalons", link: "categories/pantalons/article/cargo.html" },
    { title: "Jean classique", category: "Pantalons", link: "categories/pantalons/article/jeanClasique.html" },
    { title: "Jean élastiqué", category: "Pantalons", link: "categories/pantalons/article/jeanelastiqué.html" },
    { title: "Bermuda long extensible", category: "Pantalons", link: "categories/pantalons/article/Bermuda long extensible.html" },
    { title: "Jean extensible", category: "Pantalons", link: "categories/pantalons/article/jeanextensible.html" },
    { title: "Jean slim", category: "Pantalons", link: "categories/pantalons/article/JeanSlim.html" },
    { title: "Pantalon extensible", category: "Pantalons", link: "categories/pantalons/article/pantalonextensible.html" },
    { title: "Jogging", category: "Pantalons", link: "categories/pantalons/article/Jogging.html" },
    { title: "Pantalon thermo-extensible", category: "Pantalons", link: "categories/pantalons/article/pantalonthermoextensible.html" },
    { title: "Chemise à manches longues", category: "Chemises", link: "categories/chemises/article/chemise à manche longue.html" },
    { title: "Chemise à manches courtes", category: "Chemises", link: "categories/chemises/article/Chemise manches courtes.html" },
    { title: "T-shirt col Henley", category: "T-shirts", link: "categories/tshirts/article/T-shirt col Henley.html" },
    { title: "Lot de 3 t-shirts à col", category: "T-shirts", link: "categories/tshirts/article/Lot de 3 t-shirts à col.html" },
    { title: "T-shirt confort", category: "T-shirts", link: "categories/tshirts/article/T-shirt confort.html" },
    { title: "T-shirt coupe confort", category: "T-shirts", link: "categories/tshirts/article/T-shirt coupe confort.html" },
    { title: "T-shirt en coton", category: "T-shirts", link: "categories/tshirts/article/T-shirt en coton.html" },
    { title: "Polo", category: "T-shirts", link: "categories/tshirts/article/polo.html" },
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


let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    function updateItemCount() {
        const itemCount = document.getElementById("item-count");
        itemCount.innerText = cartItems.length; 
    }

   
    function goToCart() {
        window.location.href = "categories/article/cart.html"; 
    }


    updateItemCount();