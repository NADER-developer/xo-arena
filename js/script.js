// ========== État du jeu ==========
let gameState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameMode: '', // 'pvp' ou 'ai'
    isGameActive: true,
    soundEnabled: true,
    scores: {
        x: 0,
        o: 0,
        draw: 0
    }
};

// ========== Combinaisons gagnantes ==========
const winningCombinations = [
    [0, 1, 2], // Ligne 1
    [3, 4, 5], // Ligne 2
    [6, 7, 8], // Ligne 3
    [0, 3, 6], // Colonne 1
    [1, 4, 7], // Colonne 2
    [2, 5, 8], // Colonne 3
    [0, 4, 8], // Diagonale 1
    [2, 4, 6]  // Diagonale 2
];

// ========== Initialisation ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadStats();
    setupEventListeners();
    registerServiceWorker();
});

function initializeApp() {
    // Charger les statistiques depuis LocalStorage
    const savedStats = localStorage.getItem('xoArenaStats');
    if (savedStats) {
        gameState.scores = JSON.parse(savedStats);
        updateScoreDisplay();
    }

    // Charger les préférences de son
    const savedSound = localStorage.getItem('xoArenaSoundEnabled');
    if (savedSound !== null) {
        gameState.soundEnabled = savedSound === 'true';
        updateSoundIcon();
    }
}

// ========== Enregistrement du Service Worker (PWA) ==========
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('✅ Service Worker enregistré avec succès:', registration.scope);
                
                // Vérifier les mises à jour
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 Nouvelle version du Service Worker détectée');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('✨ Nouvelle version disponible. Rechargez pour mettre à jour.');
                            // Optionnel : afficher une notification à l'utilisateur
                        }
                    });
                });
            })
            .catch((error) => {
                console.error('❌ Échec de l\'enregistrement du Service Worker:', error);
            });
        
        // Rafraîchir la page si un nouveau Service Worker prend le contrôle
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔄 Nouveau Service Worker actif');
        });
    } else {
        console.log('⚠️ Les Service Workers ne sont pas supportés par ce navigateur');
    }
}

// ========== Gestion des écrans ==========
function showScreen(screenId) {
    // Cacher tous les écrans
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Afficher l'écran demandé
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// ========== Event Listeners ==========
function setupEventListeners() {
    // Navigation principale
    document.getElementById('play-btn').addEventListener('click', () => showScreen('mode-screen'));
    document.getElementById('rules-btn').addEventListener('click', () => showScreen('rules-screen'));
    document.getElementById('stats-btn').addEventListener('click', () => {
        updateStatsDisplay();
        showScreen('stats-screen');
    });

    // Retours à l'accueil
    document.getElementById('back-to-home-from-mode').addEventListener('click', () => showScreen('home-screen'));
    document.getElementById('back-to-home-from-rules').addEventListener('click', () => showScreen('home-screen'));
    document.getElementById('back-to-home-from-stats').addEventListener('click', () => showScreen('home-screen'));

    // Sélection du mode
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
            gameState.gameMode = e.target.getAttribute('data-mode');
            startNewGame();
            showScreen('game-screen');
        });
    });

    // Contrôles du jeu
    document.getElementById('back-to-mode').addEventListener('click', () => showScreen('mode-screen'));
    document.getElementById('new-game-btn').addEventListener('click', startNewGame);
    document.getElementById('sound-toggle').addEventListener('click', toggleSound);

    // Plateau de jeu
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Modal de fin de partie
    document.getElementById('play-again-btn').addEventListener('click', () => {
        closeModal('game-over-modal');
        startNewGame();
    });
    document.getElementById('back-to-menu-btn').addEventListener('click', () => {
        closeModal('game-over-modal');
        showScreen('mode-screen');
    });

    // Statistiques
    document.getElementById('reset-stats-btn').addEventListener('click', () => {
        showConfirmModal('Voulez-vous vraiment réinitialiser toutes les statistiques ?', resetStats);
    });

    // Modal de confirmation
    document.getElementById('confirm-no').addEventListener('click', () => closeModal('confirm-modal'));
}

// ========== Gestion du jeu ==========
function startNewGame() {
    // Réinitialiser l'état du plateau
    gameState.board = ['', '', '', '', '', '', '', '', ''];
    gameState.currentPlayer = 'X';
    gameState.isGameActive = true;

    // Réinitialiser l'affichage
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'taken', 'winning', 'disabled');
    });

    // Mettre à jour l'indicateur de joueur
    updatePlayerIndicator();

    // Mettre à jour le label du joueur O selon le mode
    updatePlayerLabels();

    // Fermer la modal si ouverte
    closeModal('game-over-modal');
}

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    // Vérifications
    if (!gameState.isGameActive || gameState.board[index] !== '' || cell.classList.contains('disabled')) {
        return;
    }

    // Placer le symbole
    makeMove(index, gameState.currentPlayer);

    // Vérifier la victoire ou le match nul
    if (checkWin()) {
        endGame('win', gameState.currentPlayer);
        return;
    }

    if (checkDraw()) {
        endGame('draw');
        return;
    }

    // Changer de joueur
    switchPlayer();

    // Si mode AI et c'est le tour de l'ordinateur
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' && gameState.isGameActive) {
        // Bloquer l'interface pendant que l'IA réfléchit
        disableBoard();
        setTimeout(() => {
            makeAIMove();
            enableBoard();
        }, 600); // Petit délai pour simuler la réflexion
    }
}

function makeMove(index, player) {
    // Mettre à jour l'état
    gameState.board[index] = player;

    // Mettre à jour l'affichage
    const cell = document.querySelectorAll('.cell')[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase(), 'taken');

    // Son (facultatif)
    if (gameState.soundEnabled) {
        playSound('move');
    }
}

function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerIndicator();
}

function updatePlayerIndicator() {
    const symbolElement = document.getElementById('current-player-symbol');
    symbolElement.textContent = gameState.currentPlayer;
    symbolElement.classList.remove('x', 'o');
    symbolElement.classList.add(gameState.currentPlayer.toLowerCase());
}

function updatePlayerLabels() {
    const oLabel = document.getElementById('score-o-label');
    const statsOLabel = document.getElementById('stats-o-label');
    
    if (gameState.gameMode === 'ai') {
        oLabel.textContent = 'Ordinateur';
        statsOLabel.textContent = 'Victoires Ordinateur :';
    } else {
        oLabel.textContent = 'Joueur O';
        statsOLabel.textContent = 'Victoires Joueur O :';
    }
}

function disableBoard() {
    const board = document.getElementById('game-board');
    board.classList.add('ai-thinking');
    document.querySelectorAll('.cell').forEach(cell => {
        if (!cell.classList.contains('taken')) {
            cell.classList.add('disabled');
        }
    });
}

function enableBoard() {
    const board = document.getElementById('game-board');
    board.classList.remove('ai-thinking');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('disabled');
    });
}

// ========== Vérification de victoire et match nul ==========
function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState.board[a] !== '' &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c]) {
            highlightWinningCells(combination);
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return gameState.board.every(cell => cell !== '');
}

function highlightWinningCells(combination) {
    const cells = document.querySelectorAll('.cell');
    combination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// ========== Fin de partie ==========
function endGame(result, winner = null) {
    gameState.isGameActive = false;

    // Désactiver toutes les cellules
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.add('disabled');
    });

    // Mettre à jour les scores (une seule fois par partie)
    if (result === 'win') {
        if (winner === 'X') {
            gameState.scores.x++;
        } else {
            gameState.scores.o++;
        }
    } else if (result === 'draw') {
        gameState.scores.draw++;
    }

    // Sauvegarder les scores
    saveStats();
    updateScoreDisplay();

    // Afficher la modal après un court délai
    setTimeout(() => {
        showGameOverModal(result, winner);
    }, 800);

    // Son
    if (gameState.soundEnabled) {
        playSound(result === 'win' ? 'win' : 'draw');
    }
}

// ========== Intelligence Artificielle ==========
function makeAIMove() {
    if (!gameState.isGameActive) return;

    // Stratégie de l'IA par ordre de priorité :
    // 1. Gagner immédiatement si possible
    let move = findWinningMove('O');
    
    // 2. Bloquer le joueur s'il peut gagner
    if (move === null) {
        move = findWinningMove('X');
    }
    
    // 3. Prendre le centre si disponible
    if (move === null && gameState.board[4] === '') {
        move = 4;
    }
    
    // 4. Prendre un coin stratégique
    if (move === null) {
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => gameState.board[i] === '');
        if (availableCorners.length > 0) {
            move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
    }
    
    // 5. Prendre n'importe quelle case disponible
    if (move === null) {
        const availableMoves = gameState.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Exécuter le coup
    if (move !== null) {
        makeMove(move, 'O');

        // Vérifier la victoire ou le match nul
        if (checkWin()) {
            endGame('win', 'O');
            return;
        }

        if (checkDraw()) {
            endGame('draw');
            return;
        }

        // Changer de joueur
        switchPlayer();
    }
}

function findWinningMove(player) {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        const cells = [gameState.board[a], gameState.board[b], gameState.board[c]];
        
        // Compter les symboles du joueur dans cette combinaison
        const playerCount = cells.filter(cell => cell === player).length;
        const emptyCount = cells.filter(cell => cell === '').length;
        
        // Si 2 symboles du joueur et 1 case vide = coup gagnant/bloquant
        if (playerCount === 2 && emptyCount === 1) {
            if (gameState.board[a] === '') return a;
            if (gameState.board[b] === '') return b;
            if (gameState.board[c] === '') return c;
        }
    }
    return null;
}

// ========== Gestion des scores ==========
function updateScoreDisplay() {
    document.getElementById('score-x').textContent = gameState.scores.x;
    document.getElementById('score-o').textContent = gameState.scores.o;
    document.getElementById('score-draw').textContent = gameState.scores.draw;
}

function updateStatsDisplay() {
    document.getElementById('stats-x').textContent = gameState.scores.x;
    document.getElementById('stats-o').textContent = gameState.scores.o;
    document.getElementById('stats-draw').textContent = gameState.scores.draw;
    
    const total = gameState.scores.x + gameState.scores.o + gameState.scores.draw;
    document.getElementById('stats-total').textContent = total;
}

function saveStats() {
    localStorage.setItem('xoArenaStats', JSON.stringify(gameState.scores));
}

function loadStats() {
    const savedStats = localStorage.getItem('xoArenaStats');
    if (savedStats) {
        gameState.scores = JSON.parse(savedStats);
    }
}

function resetStats() {
    gameState.scores = { x: 0, o: 0, draw: 0 };
    saveStats();
    updateScoreDisplay();
    updateStatsDisplay();
    closeModal('confirm-modal');
}

// ========== Gestion du son ==========
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    localStorage.setItem('xoArenaSoundEnabled', gameState.soundEnabled);
    updateSoundIcon();
}

function updateSoundIcon() {
    const icon = document.getElementById('sound-icon');
    icon.textContent = gameState.soundEnabled ? '🔊' : '🔇';
}

function playSound(type) {
    // Note : sons désactivés par défaut car pas de fichiers audio
    // Cette fonction peut être étendue avec Web Audio API ou des fichiers audio
    // Pour l'instant, elle est présente pour la structure mais ne fait rien
    
    // Exemple avec Web Audio API (fréquences simples) :
    /*
    if (!gameState.soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'move') {
        oscillator.frequency.value = 500;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'win') {
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.2;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'draw') {
        oscillator.frequency.value = 300;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    }
    */
}

// ========== Gestion des modales ==========
function showGameOverModal(result, winner) {
    const modal = document.getElementById('game-over-modal');
    const title = document.getElementById('modal-title');
    const message = document.getElementById('modal-message');
    const icon = document.getElementById('modal-icon');

    if (result === 'win') {
        icon.textContent = '🎉';
        title.textContent = 'Victoire !';
        
        if (winner === 'X') {
            message.textContent = 'Le joueur X a gagné !';
        } else {
            message.textContent = gameState.gameMode === 'ai' 
                ? "L'ordinateur a gagné !" 
                : 'Le joueur O a gagné !';
        }
    } else {
        icon.textContent = '🤝';
        title.textContent = 'Match nul !';
        message.textContent = 'Aucun joueur n\'a gagné cette partie.';
    }

    modal.classList.add('active');
}

function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const messageElement = document.getElementById('confirm-message');
    const yesBtn = document.getElementById('confirm-yes');

    messageElement.textContent = message;

    // Nettoyer les anciens listeners
    const newYesBtn = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

    // Ajouter le nouveau listener
    newYesBtn.addEventListener('click', onConfirm);

    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// ========== Navigation au clavier (accessibilité) ==========
document.addEventListener('keydown', (e) => {
    // Échap pour fermer les modales
    if (e.key === 'Escape') {
        closeModal('game-over-modal');
        closeModal('confirm-modal');
    }
});

// ========== Console log pour debug ==========
console.log('XO Arena initialisé avec succès ! 🎮');
