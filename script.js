document.addEventListener('DOMContentLoaded', () => {
    const stringDict = {
        1: ["Mr. Satan"],
        2: ["Videl", "Master Roshi", "Master Roshi Max Power", "Chiaotzu", "Yajirobe", "Saibaman", "Guldo", "Frieza Soldier", "Spopovich"],
        3: ["Cui", "Teen Goku", "Kid Gohan", "Krillin", "Yamcha", "Jeice", "Recoome", "Burter", "Pan", "Cell Jr.", "Raditz", "Babidi"],
        4: ["Tapion", "Teen Gohan", "Uub", "Base Goten", "Bardock", "Captain Ginyu", "King Cold", "Dr. Gero", "Piccolo", "Super Garlic Jr.", "Turles", "Lord Slug", "Nail", "Future Trunks (Base)"],
        5: ["Base Goku (Early)", "Base Vegeta (Early)", "Great Ape Vegeta", "Base Gotenks", "Super Baby Vegeta", "Frieza (1st Form)", "Frieza (2nd Form)", "Frieza (3rd Form)", "Cooler (Base)", "Android 13 (Base)", "BoJack", "Janemba (Base)"],
        6: ["SSJ Goku (Early)", "SSJ Vegeta (Early)", "Future Trunks (SSJ)", "SSJ Gotenks", "SSJ Bardock", "SSJ Gohan (Teen)", "Frieza (Final Form)", "Cooler (Final Form)", "Super Perfect Cell", "Super Buu", "Majin Buu", "Buuhan", "Hirudegarn", "Super Janemba"],
        7: ["SSJ Goku (Super)", "SSJ Vegeta (Super)", "SSJ Broly", "Kid Buu", "Buutenks", "Omega Shenron", "Syn Shenron", "Toppo", "SSJ Kefla", "SSJ2 Caulifla", "SSJ2 Kale"],
        8: ["SSJ Blue Goku", "SSJ Blue Vegeta", "SSJ Rose Goku Black", "SSJ4 Goku", "SSJ4 Vegeta", "SSJ4 Gogeta", "Super Vegito", "SSJ Gotenks", "Super Saiyan Blue Gogeta", "God Toppo", "Jiren", "Anilaza"],
        9: ["SSJ Broly (Full Power)", "SSJ God Goku", "SSJ God Vegeta", "SSJ Broly (Berserk)", "Fused Zamasu", "Merged Zamasu (Corrupted)", "Jiren (Full Power)"],
        10: ["Beerus", "Whis", "Blue Vegito", "Blue Gogeta", "SSJ God Vegito"],
    };

    document.getElementById('add-cost').addEventListener('click', () => {
        const costsContainer = document.getElementById('costs-container');
        const newCostGroup = document.createElement('div');
        newCostGroup.className = 'cost-group';
        newCostGroup.innerHTML = `
            <label for="cost">DP</label>
            <input type="number" class="cost" min="1" max="10" value="1">
            <button class="remove-cost">Delete</button>
        `;
        costsContainer.appendChild(newCostGroup);
        newCostGroup.querySelector('.remove-cost').addEventListener('click', () => {
            costsContainer.removeChild(newCostGroup);
        });
    });

    document.getElementById('generate-btn').addEventListener('click', () => {
        const characterList = document.getElementById('character-list');
        characterList.innerHTML = '';

        const costGroups = document.querySelectorAll('.cost-group');
        const usedCharacters = new Set();
        let totalCost = 0;

        costGroups.forEach(group => {
            const cost = parseInt(group.querySelector('.cost').value);

            if (cost >= 1 && cost <= 10) {
                const character = getUniqueCharacter(cost, usedCharacters);
                if (character) {
                    const listItem = document.createElement('li');
                    const stars = '★'.repeat(cost);
                    listItem.textContent = `${character} (${stars})`;
                    characterList.appendChild(listItem);
                    totalCost += cost;
                } else {
                    alert('Tous les personnages de ce coût ont déjà été tirés.');
                }
            } else {
                alert('Veuillez entrer des valeurs valides.');
            }
        });

        document.getElementById('total-cost').textContent = `Total Cost: ${totalCost}`;

        document.getElementById('pulled-title').classList.remove('hidden');
        characterList.classList.remove('hidden');
    });

    function getUniqueCharacter(cost, usedCharacters) {
        if (cost in stringDict) {
            const availableCharacters = stringDict[cost].filter(character => !usedCharacters.has(character));
            if (availableCharacters.length > 0) {
                const character = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
                usedCharacters.add(character);
                return character;
            }
        }
        return null;
    }
});
