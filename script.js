/* ==================================================
   ELEMENTOS
================================================== */

const loginScreen =
    document.getElementById("loginScreen");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const registerUsername =
    document.getElementById("registerUsername");

const registerPassword =
    document.getElementById("registerPassword");

const registerName =
    document.getElementById("registerName");

const registerPhoto =
    document.getElementById("registerPhoto");

const registerPhotoPreview =
    document.getElementById("registerPhotoPreview");

const registerPhotoPreviewImg =
    document.getElementById("registerPhotoPreviewImg");

const casinoProfileName =
    document.getElementById("casinoProfileName");

const casinoProfilePhoto =
    document.getElementById("casinoProfilePhoto");

const bankProfileName =
    document.getElementById("bankProfileName");

const bankProfilePhoto =
    document.getElementById("bankProfilePhoto");

const loginButton =
    document.getElementById("loginButton");

const registerButton =
    document.getElementById("registerButton");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const loginError =
    document.getElementById("loginError");

const registerError =
    document.getElementById("registerError");


const home =
    document.getElementById("home");

const game =
    document.getElementById("game");

const adminPanel =
    document.getElementById("adminPanel");

const adminLogoutButton =
    document.getElementById("adminLogoutButton");

const adminBalance =
    document.getElementById("adminBalance");

const adminPlayers =
    document.getElementById("adminPlayers");

const adminTotalBets =
    document.getElementById("adminTotalBets");

const adminTotalLosses =
    document.getElementById("adminTotalLosses");

const adminCommission =
    document.getElementById("adminCommission");

const adminCommissionRate =
    document.getElementById("adminCommissionRate");

const adminTransactionList =
    document.getElementById("adminTransactionList");

const playButton =
    document.getElementById("playButton");

const backButton =
    document.getElementById("backButton");

const logoutButton =
    document.getElementById("logoutButton");


const chipsContainer =
    document.getElementById("chips-container");


/* ==================================================
   BANCO
================================================== */

const balanceButton =
    document.getElementById("balanceButton");

const bankModal =
    document.getElementById("bankModal");

const closeBank =
    document.getElementById("closeBank");

const bankBalance =
    document.getElementById("bankBalance");

const bankCardBalance =
    document.getElementById("bankCardBalance");

const bankCasinoBalance =
    document.getElementById(
        "bankCasinoBalance"
    );

const casinoBalance =
    document.getElementById(
        "casinoBalance"
    );

const amountButtons =
    document.querySelectorAll(
        ".amount-button"
    );

const transferButton =
    document.getElementById(
        "transferButton"
    );

const transferMessage =
    document.getElementById(
        "transferMessage"
    );

const historyList =
    document.getElementById(
        "historyList"
    );

const casinoDepositAmount =
    document.getElementById(
        "casinoDepositAmount"
    );

const casinoDepositButton =
    document.getElementById(
        "casinoDepositButton"
    );

const casinoDepositMessage =
    document.getElementById(
        "casinoDepositMessage"
    );

const MIN_CASINO_DEPOSIT = 500;


/* ==================================================
   COMPROVANTE
================================================== */

const receiptModal =
    document.getElementById(
        "receiptModal"
    );

const closeReceipt =
    document.getElementById(
        "closeReceipt"
    );

const closeReceiptButton =
    document.getElementById(
        "closeReceiptButton"
    );

const receiptAmount =
    document.getElementById(
        "receiptAmount"
    );

const receiptId =
    document.getElementById(
        "receiptId"
    );


/* ==================================================
   CONTA ATUAL
================================================== */

let currentUser =
    localStorage.getItem(
        "royalCasinoLoggedUser"
    );

/* ==================================================
   CONTA ADMINISTRATIVA — SIMULAÇÃO
================================================== */
const ADMIN_CONFIG = {
    username: "Massa_Galo",
    password: "Massa_Galo@2026",
    commissionRate: 0.05
};

function ensureAdminAccount() {
    const accounts = JSON.parse(localStorage.getItem("royalCasinoAccounts")) || {};
    const existing = accounts[ADMIN_CONFIG.username];

    if (!existing || !existing.isAdmin) {
        accounts[ADMIN_CONFIG.username] = {
            password: ADMIN_CONFIG.password,
            name: "Massa_Galo",
            profileImage: existing && existing.profileImage ? existing.profileImage : "",
            bankBalance: existing && Number.isFinite(existing.bankBalance) ? existing.bankBalance : 0,
            casinoBalance: 0,
            history: existing && Array.isArray(existing.history) ? existing.history : [],
            isAdmin: true,
            adminStats: existing && existing.adminStats ? existing.adminStats : {
                totalBets: 0,
                totalLosses: 0,
                totalCommission: 0,
                transactions: []
            }
        };
    } else {
        accounts[ADMIN_CONFIG.username].password = ADMIN_CONFIG.password;
        accounts[ADMIN_CONFIG.username].isAdmin = true;
        accounts[ADMIN_CONFIG.username].adminStats ||= {
            totalBets: 0, totalLosses: 0, totalCommission: 0, transactions: []
        };
    }

    localStorage.setItem("royalCasinoAccounts", JSON.stringify(accounts));
}

ensureAdminAccount();


let selectedAmount = 0;


/* ==================================================
   FORMATAÇÃO DE DINHEIRO
================================================== */

function formatMoney(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==================================================
   OBTER CONTA
================================================== */

function getUserAccount(username) {

    const accounts =
        JSON.parse(
            localStorage.getItem(
                "royalCasinoAccounts"
            )
        ) || {};


    return accounts[username];

}


/* ==================================================
   SALVAR CONTA
================================================== */

function saveUserAccount(
    username,
    account
) {

    const accounts =
        JSON.parse(
            localStorage.getItem(
                "royalCasinoAccounts"
            )
        ) || {};


    accounts[username] =
        account;


    localStorage.setItem(
        "royalCasinoAccounts",
        JSON.stringify(accounts)
    );

}



function readProfileImage(file) {
    return new Promise(function (resolve) {
        if (!file) {
            resolve("");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = function () {
            resolve("");
        };
        reader.readAsDataURL(file);
    });
}

/* ==================================================
   PRÉVIA DA FOTO DE PERFIL
================================================== */

registerPhoto.addEventListener("change", function () {

    const file = registerPhoto.files[0];

    if (!file) {
        registerPhotoPreview.classList.add("hidden");
        registerPhotoPreviewImg.removeAttribute("src");
        return;
    }

    if (!file.type.startsWith("image/")) {
        registerPhoto.value = "";
        registerPhotoPreview.classList.add("hidden");
        registerError.textContent = "Escolha uma imagem válida.";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        registerPhotoPreviewImg.src = event.target.result;
        registerPhotoPreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
});


/* ==================================================
   CADASTRO
================================================== */

registerButton.addEventListener(
    "click",
    async function () {


        const username =
            registerUsername.value.trim();

        const displayName =
            registerName.value.trim();

        const password =
            registerPassword.value;


        registerError.textContent = "";


        if (
            username.length < 3 ||
            password.length < 3 ||
            displayName.length < 2
        ) {

            registerError.textContent =
                "Preencha usuário, nome e senha corretamente (mínimo de 2 caracteres no nome e 3 nos demais).";

            return;

        }


        const accounts =
            JSON.parse(
                localStorage.getItem(
                    "royalCasinoAccounts"
                )
            ) || {};


        if (accounts[username]) {

            registerError.textContent =
                "Esse usuário já existe.";

            return;

        }


        /*
           CONTA INICIAL

           Banco = R$ 2.000

           Cassino = R$ 0
        */

        const profileImage =
            await readProfileImage(registerPhoto.files[0]);


        accounts[username] = {

            password: password,

            name: displayName,

            profileImage: profileImage,

            bankBalance: 2000,

            casinoBalance: 0,

            history: []

        };


        localStorage.setItem(
            "royalCasinoAccounts",
            JSON.stringify(accounts)
        );


        /*
           ENTRA AUTOMATICAMENTE
        */

        currentUser = username;


        localStorage.setItem(
            "royalCasinoLoggedUser",
            username
        );


        openCasino();

        registerName.value = "";
        registerUsername.value = "";
        registerPassword.value = "";
        registerPhoto.value = "";
        registerPhotoPreview.classList.add("hidden");

    }
);


/* ==================================================
   MOSTRAR CADASTRO
================================================== */

showRegister.addEventListener(
    "click",
    function () {

        loginForm.classList.add(
            "hidden"
        );

        registerForm.classList.remove(
            "hidden"
        );

        loginError.textContent = "";

    }
);


/* ==================================================
   MOSTRAR LOGIN
================================================== */

showLogin.addEventListener(
    "click",
    function () {

        registerForm.classList.add(
            "hidden"
        );

        loginForm.classList.remove(
            "hidden"
        );

        registerError.textContent = "";

    }
);


/* ==================================================
   LOGIN
================================================== */

loginButton.addEventListener(
    "click",
    function () {


        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value;


        const account =
            getUserAccount(
                username
            );


        loginError.textContent = "";


        if (!account) {

            loginError.textContent =
                "Usuário não encontrado.";

            return;

        }


        if (
            account.password !==
            password
        ) {

            loginError.textContent =
                "Senha incorreta.";

            return;

        }


        currentUser =
            username;


        localStorage.setItem(
            "royalCasinoLoggedUser",
            username
        );


        if (account.isAdmin && username === ADMIN_CONFIG.username) {
            openAdminPanel();
        } else {
            openCasino();
        }

    }
);


/* ==================================================
   PAINEL ADMINISTRATIVO — SIMULAÇÃO
================================================== */
function getAdminAccount() {
    const accounts = JSON.parse(localStorage.getItem("royalCasinoAccounts")) || {};
    return accounts[ADMIN_CONFIG.username];
}

function formatDateTime(date) {
    return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR");
}

function renderAdminPanel() {
    const admin = getAdminAccount();
    if (!admin || !admin.adminStats) return;

    const accounts = JSON.parse(localStorage.getItem("royalCasinoAccounts")) || {};
    const players = Object.values(accounts).filter(function (account) {
        return !account.isAdmin;
    });

    const stats = admin.adminStats;
    adminBalance.textContent = formatMoney(admin.bankBalance || 0);
    adminPlayers.textContent = String(players.length);
    adminTotalBets.textContent = formatMoney(stats.totalBets || 0);
    adminTotalLosses.textContent = formatMoney(stats.totalLosses || 0);
    adminCommission.textContent = formatMoney(stats.totalCommission || 0);
    adminCommissionRate.textContent = Math.round(ADMIN_CONFIG.commissionRate * 100) + "%";

    const transactions = Array.isArray(stats.transactions) ? stats.transactions : [];
    if (!transactions.length) {
        adminTransactionList.innerHTML = '<div class="admin-empty">Nenhuma perda registrada ainda.</div>';
        return;
    }

    adminTransactionList.innerHTML = transactions.slice(0, 25).map(function (tx) {
        return `
            <div class="admin-transaction">
                <div>
                    <strong>${tx.player}</strong>
                    <span>${tx.game} · ${tx.date}</span>
                </div>
                <div class="admin-transaction-values">
                    <strong>${formatMoney(tx.loss)}</strong>
                    <span>+ ${formatMoney(tx.commission)} comissão</span>
                </div>
            </div>`;
    }).join("");
}

function openAdminPanel() {
    if (loginScreen) loginScreen.classList.add("hidden");
    if (home) home.classList.add("hidden");
    if (game) game.classList.remove("active");
    if (adminPanel) adminPanel.classList.add("active");
    renderAdminPanel();
}

if (adminLogoutButton) {
    adminLogoutButton.addEventListener("click", function () {
        currentUser = null;
        localStorage.removeItem("royalCasinoLoggedUser");
        if (adminPanel) adminPanel.classList.remove("active");
        if (game) game.classList.remove("active");
        if (home) home.classList.add("hidden");
        if (loginScreen) loginScreen.classList.remove("hidden");
        loginUsername.value = "";
        loginPassword.value = "";
    });
}

/* ==================================================
   ABRIR CASSINO
================================================== */

function openCasino() {


    loginScreen.classList.add(
        "hidden"
    );


    home.classList.remove(
        "hidden"
    );


    updateBalances();


    createChips();

}


/* ==================================================
   LOGOUT
================================================== */

logoutButton.addEventListener(
    "click",
    function () {


        currentUser = null;


        localStorage.removeItem(
            "royalCasinoLoggedUser"
        );


        game.classList.remove(
            "active"
        );

        if (adminPanel) {
            adminPanel.classList.remove("active");
        }


        home.classList.add(
            "hidden"
        );


        loginScreen.classList.remove(
            "hidden"
        );


        loginUsername.value = "";

        loginPassword.value = "";

    }
);


/* ==================================================
   JOGAR
================================================== */

playButton.addEventListener(
    "click",
    function () {


        home.style.transition =
            "opacity .5s, transform .5s";


        home.style.opacity =
            "0";


        home.style.transform =
            "scale(1.08)";


        setTimeout(
            function () {

                game.classList.add(
                    "active"
                );

            },
            400
        );

    }
);


/* ==================================================
   VOLTAR
================================================== */

backButton.addEventListener(
    "click",
    function () {


        game.classList.remove(
            "active"
        );


        setTimeout(
            function () {

                home.style.opacity =
                    "1";

                home.style.transform =
                    "scale(1)";

            },
            300
        );

    }
);


/* ==================================================
   ATUALIZAR SALDOS
================================================== */

function updateBalances() {


    if (!currentUser)
        return;


    const account =
        getUserAccount(
            currentUser
        );


    if (!account)
        return;


    casinoBalance.textContent =
        formatMoney(
            account.casinoBalance
        );


    bankBalance.textContent =
        formatMoney(
            account.bankBalance
        );


    bankCardBalance.textContent =
        formatMoney(
            account.bankBalance
        );


    bankCasinoBalance.textContent =
        formatMoney(
            account.casinoBalance
        );


    // Perfil: usa o nome cadastrado.
    const displayName =
        account.name || currentUser;

    casinoProfileName.textContent =
        displayName;

    bankProfileName.textContent =
        displayName;


    // Foto opcional. Se não houver, mostra um avatar padrão.
    const photo = account.profileImage ||
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
                <rect width="128" height="128" rx="64" fill="#161b25"/>
                <circle cx="64" cy="48" r="22" fill="#b9c0cc"/>
                <path d="M25 112c5-27 22-40 39-40s34 13 39 40" fill="#b9c0cc"/>
            </svg>
        `);

    casinoProfilePhoto.src = photo;
    bankProfilePhoto.src = photo;

}



/* ==================================================
   ABRIR BANCO
================================================== */

balanceButton.addEventListener(
    "click",
    function () {

        updateBalances();

        renderHistory();

        bankModal.classList.add(
            "active"
        );

    }
);


/* ==================================================
   FECHAR BANCO
================================================== */

closeBank.addEventListener(
    "click",
    function () {

        bankModal.classList.remove(
            "active"
        );

    }
);


/* ==================================================
   ESCOLHER VALOR
================================================== */

amountButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function () {


                amountButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                selectedAmount =
                    Number(
                        button.dataset.amount
                    );


                transferMessage.textContent =
                    "Valor selecionado: " +
                    formatMoney(
                        selectedAmount
                    );

            }
        );

    }
);


/* ==================================================
   TRANSFERÊNCIA
================================================== */

transferButton.addEventListener(
    "click",
    function () {


        if (selectedAmount === 0) {

            transferMessage.textContent =
                "Escolha um valor primeiro.";

            transferMessage.style.color =
                "#d66b6b";

            return;

        }


        const account =
            getUserAccount(
                currentUser
            );


        /*
           VERIFICA SALDO
        */

        if (
            account.bankBalance <
            selectedAmount
        ) {

            transferMessage.textContent =
                "Saldo bancário insuficiente.";

            transferMessage.style.color =
                "#d66b6b";

            return;

        }


        /*
           REMOVE DO BANCO
        */

        account.bankBalance -=
            selectedAmount;


        /*
           ADICIONA AO CASSINO
        */

        account.casinoBalance +=
            selectedAmount;


        /*
           ID DA TRANSAÇÃO
        */

        const transactionId =
            generateTransactionId();


        /*
           DATA
        */

        const now =
            new Date();


        const transaction = {

            id: transactionId,

            amount: selectedAmount,

            date:
                now.toLocaleDateString(
                    "pt-BR"
                ),

            time:
                now.toLocaleTimeString(
                    "pt-BR"
                )

        };


        /*
           SALVA NO HISTÓRICO
        */

        account.history.unshift(
            transaction
        );


        /*
           MANTÉM APENAS 10
           TRANSFERÊNCIAS
        */

        account.history =
            account.history.slice(
                0,
                10
            );


        /*
           SALVA CONTA
        */

        saveUserAccount(
            currentUser,
            account
        );


        /*
           ATUALIZA INTERFACE
        */

        updateBalances();


        renderHistory();


        /*
           MOSTRA COMPROVANTE
        */

        receiptAmount.textContent =
            formatMoney(
                selectedAmount
            );


        receiptId.textContent =
            transactionId;


        receiptModal.classList.add(
            "active"
        );


        /*
           LIMPA SELEÇÃO
        */

        amountButtons.forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

            }
        );


        selectedAmount = 0;

        transferMessage.textContent = "";

    }
);


/* ==================================================
   DEPÓSITO: CASSINO -> BLOCKBANK
================================================== */

casinoDepositButton.addEventListener(
    "click",
    function () {

        const amount = Number(
            casinoDepositAmount.value
        );

        casinoDepositMessage.style.color = "#55aa80";

        if (!Number.isFinite(amount) || amount <= 0) {
            casinoDepositMessage.textContent =
                "Digite um valor válido para depositar.";
            casinoDepositMessage.style.color = "#d66b6b";
            return;
        }

        if (amount < MIN_CASINO_DEPOSIT) {
            casinoDepositMessage.textContent =
                "O depósito mínimo é de R$ 500,00.";
            casinoDepositMessage.style.color = "#d66b6b";
            return;
        }

        const account = getUserAccount(currentUser);

        if (!account) {
            casinoDepositMessage.textContent =
                "Conta não encontrada.";
            casinoDepositMessage.style.color = "#d66b6b";
            return;
        }

        if (account.casinoBalance < amount) {
            casinoDepositMessage.textContent =
                "Saldo do cassino insuficiente.";
            casinoDepositMessage.style.color = "#d66b6b";
            return;
        }

        account.casinoBalance -= amount;
        account.bankBalance += amount;

        const transactionId = generateTransactionId();
        const now = new Date();

        const transaction = {
            id: transactionId,
            amount: amount,
            type: "casino_to_bank",
            date: now.toLocaleDateString("pt-BR"),
            time: now.toLocaleTimeString("pt-BR")
        };

        account.history.unshift(transaction);
        account.history = account.history.slice(0, 10);

        saveUserAccount(currentUser, account);
        updateBalances();
        renderHistory();

        casinoDepositMessage.textContent =
            "Depósito concluído: " + formatMoney(amount) + " foi para o BlockBank.";

        casinoDepositAmount.value = "";

        receiptAmount.textContent = formatMoney(amount);
        receiptId.textContent = transactionId;
        receiptModal.classList.add("active");
    }
);


/* ==================================================
   GERAR ID
================================================== */

function generateTransactionId() {


    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    let id = "RC-";


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        id +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];

    }


    return id;

}


/* ==================================================
   HISTÓRICO
================================================== */

function renderHistory() {


    const account =
        getUserAccount(
            currentUser
        );


    if (
        !account ||
        account.history.length === 0
    ) {

        historyList.innerHTML = `

            <p class="empty-history">

                Nenhuma transferência
                realizada.

            </p>

        `;

        return;

    }


    historyList.innerHTML = "";


    account.history.forEach(
        function (transaction) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "history-item";


            item.innerHTML = `

                <div class="history-icon">
                    ↑
                </div>

                <div>

                    <strong>
                        Transferência
                    </strong>

                    <small>
                        ${transaction.date}
                        •
                        ${transaction.time}
                    </small>

                </div>

                <strong>
                    - ${formatMoney(
                        transaction.amount
                    )}
                </strong>

            `;


            historyList.appendChild(
                item
            );

        }
    );

}


/* ==================================================
   FECHAR COMPROVANTE
================================================== */

function closeReceiptModal() {

    receiptModal.classList.remove(
        "active"
    );

}


closeReceipt.addEventListener(
    "click",
    closeReceiptModal
);


closeReceiptButton.addEventListener(
    "click",
    closeReceiptModal
);


/* ==================================================
   FICHAS DO CASSINO
================================================== */

function createChip() {


    const chip =
        document.createElement(
            "div"
        );


    chip.className =
        "chip";


    chip.style.left =
        Math.random() * 100 + "%";


    const size =
        30 +
        Math.random() * 35;


    chip.style.width =
        size + "px";


    chip.style.height =
        size + "px";


    const duration =
        4 +
        Math.random() * 5;


    chip.style.animationDuration =
        duration + "s";


    chip.style.animationDelay =
        -(Math.random() * 8) + "s";


    chipsContainer.appendChild(
        chip
    );

}


function createChips() {


    chipsContainer.innerHTML = "";


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        createChip();

    }

}


/* ==================================================
   VERIFICAR LOGIN AO ABRIR
================================================== */

if (currentUser) {

    const account =
        getUserAccount(
            currentUser
        );


    if (account) {

        openCasino();

    } else {

        localStorage.removeItem(
            "royalCasinoLoggedUser"
        );

    }

}

/* ==================================================
   EFEITOS SONOROS DOS JOGOS
   Arquivos locais: /sounds/apostas.mp3, /sounds/vitoria.mp3, /sounds/perda.mp3
================================================== */

const gameSounds = {
    bets: new Audio("sounds/apostas.mp3"),
    win: new Audio("sounds/vitoria.mp3"),
    loss: new Audio("sounds/perda.mp3"),
    roulette: new Audio("sounds/roda_de_cassino.mp3"),
    dice: new Audio("sounds/dado.mp3"),
    streak5: new Audio("sounds/5_vitorias.mp3"),
    streak10: new Audio("sounds/amassa.mp3")
};

// Sequência de vitórias da sessão atual.
let consecutiveWins = 0;
const FIVE_WIN_STREAK = 5;
const BIG_WIN_STREAK = 10;

Object.values(gameSounds).forEach(function (audio) {
    audio.preload = "auto";
});

function playGameSound(type) {
    const audio = gameSounds[type];
    if (!audio) return;

    try {
        audio.pause();
        audio.currentTime = 0;
        const playback = audio.play();
        if (playback && typeof playback.catch === "function") {
            playback.catch(function () {
                // O navegador pode bloquear áudio até uma interação do usuário.
            });
        }
    } catch (error) {
        // O jogo continua funcionando mesmo se o navegador bloquear o áudio.
    }
}

function registerWinStreak() {
    consecutiveWins += 1;

    // A sequência de 10 também é uma sequência de 5, mas toca somente
    // o efeito mais forte para evitar dois áudios sobrepostos.
    if (consecutiveWins >= BIG_WIN_STREAK) {
        playGameSound("streak10");
    } else if (consecutiveWins >= FIVE_WIN_STREAK) {
        playGameSound("streak5");
    } else {
        playGameSound("win");
    }
}

function registerLoss() {
    consecutiveWins = 0;
    playGameSound("loss");
}

/* ==================================================
   JOGO DE DADOS 3D
   SIMULAÇÃO EDUCACIONAL
================================================== */

const diceGameButton = document.getElementById("diceGameButton");
const diceModal = document.getElementById("diceModal");
const closeDice = document.getElementById("closeDice");
const diceCube = document.getElementById("diceCube");
const diceResult = document.getElementById("diceResult");
const rollDiceButton = document.getElementById("rollDiceButton");
const diceChoices = document.querySelectorAll(".dice-choice");
const diceBetOptions = document.querySelectorAll("#diceBetOptions .bet-option");

let diceChoice = null;
let diceBet = 0;

function openGameModal(modal) {
    modal.classList.add("active");
}

function closeGameModal(modal) {
    modal.classList.remove("active");
}

if (diceGameButton) {
    diceGameButton.addEventListener("click", function () {
        diceResult.textContent = "Escolha um número (1–6) ou par/ímpar e uma aposta.";
        diceResult.className = "game-result-message";
        diceChoices.forEach(function (item) { item.classList.remove("active"); });
        openGameModal(diceModal);
        playGameSound("bets");
    });
}

if (closeDice) {
    closeDice.addEventListener("click", function () {
        closeGameModal(diceModal);
    });
}

diceChoices.forEach(function (button) {
    button.addEventListener("click", function () {
        diceChoices.forEach(function (item) { item.classList.remove("active"); });
        button.classList.add("active");
        diceChoice = button.dataset.choice;
    });
});

diceBetOptions.forEach(function (button) {
    button.addEventListener("click", function () {
        diceBetOptions.forEach(function (item) { item.classList.remove("selected"); });
        button.classList.add("selected");
        diceBet = Number(button.dataset.bet);
        diceResult.textContent = "Aposta selecionada: " + formatMoney(diceBet);
        diceResult.className = "game-result-message";
    });
});

function getCurrentAccount() {
    if (!currentUser) return null;
    return getUserAccount(currentUser);
}

function settleGame(amount, multiplier, won, gameName) {
    const account = getCurrentAccount();
    if (!account) return null;

    if (account.casinoBalance < amount) return null;

    // A aposta é retirada primeiro. Em caso de vitória,
    // o retorno total (incluindo a aposta) é creditado.
    account.casinoBalance -= amount;
    if (won) {
        account.casinoBalance += amount * multiplier;
    } else {
        // Comissão fictícia: somente uma pequena parte da perda
        // é contabilizada na conta administrativa da simulação.
        const commission = Number((amount * ADMIN_CONFIG.commissionRate).toFixed(2));
        const admin = getAdminAccount();
        if (admin) {
            admin.bankBalance = Number(admin.bankBalance || 0) + commission;
            admin.adminStats ||= { totalBets: 0, totalLosses: 0, totalCommission: 0, transactions: [] };
            admin.adminStats.totalLosses += amount;
            admin.adminStats.totalCommission += commission;
            admin.adminStats.transactions.unshift({
                player: account.name || currentUser,
                username: currentUser,
                game: gameName || "Jogo",
                loss: amount,
                commission: commission,
                date: formatDateTime(new Date())
            });
            admin.adminStats.transactions = admin.adminStats.transactions.slice(0, 100);
            saveUserAccount(ADMIN_CONFIG.username, admin);
        }
    }

    const admin = getAdminAccount();
    if (admin) {
        admin.adminStats ||= { totalBets: 0, totalLosses: 0, totalCommission: 0, transactions: [] };
        admin.adminStats.totalBets += amount;
        saveUserAccount(ADMIN_CONFIG.username, admin);
    }

    saveUserAccount(currentUser, account);
    updateBalances();
    return account.casinoBalance;
}

function setDiceFace(number) {
    // Faz a face sorteada ficar exatamente voltada para o jogador.
    // Mapeamento das faces no HTML:
    // frente=1, trás=6, direita=3, esquerda=4, topo=2, baixo=5.
    const transforms = {
        1: "rotateX(0deg) rotateY(0deg)",
        2: "rotateX(-90deg) rotateY(0deg)",
        3: "rotateX(0deg) rotateY(-90deg)",
        4: "rotateX(0deg) rotateY(90deg)",
        5: "rotateX(90deg) rotateY(0deg)",
        6: "rotateX(0deg) rotateY(180deg)"
    };
    diceCube.style.transform = transforms[number];
}

if (rollDiceButton) {
    rollDiceButton.addEventListener("click", function () {
        const account = getCurrentAccount();

        if (!account) return;
        if (!diceBet) {
            diceResult.textContent = "Escolha o valor da aposta.";
            diceResult.className = "game-result-message loss";
            return;
        }
        if (account.casinoBalance < diceBet) {
            diceResult.textContent = "Saldo insuficiente no cassino.";
            diceResult.className = "game-result-message loss";
            return;
        }

        rollDiceButton.disabled = true;
        playGameSound("dice");
        diceResult.textContent = "O dado está rolando...";
        diceResult.className = "game-result-message";
        diceCube.classList.remove("rolling");
        void diceCube.offsetWidth;
        diceCube.classList.add("rolling");

        const result = Math.floor(Math.random() * 6) + 1;
        const won = diceChoice === "even"
            ? result % 2 === 0
            : diceChoice === "odd"
                ? result % 2 !== 0
                : diceChoice === "number-" + result;

        setTimeout(function () {
            diceCube.classList.remove("rolling");
            setDiceFace(result);

            settleGame(diceBet, 2, won, "Dados");

            if (won) {
                const choiceLabel = diceChoice === "even" ? "PAR" : diceChoice === "odd" ? "ÍMPAR" : diceChoice.replace("number-", "número ");
                diceResult.textContent = "BOA! O dado caiu no " + result + ". Você escolheu " + choiceLabel + " e ganhou " + formatMoney(diceBet * 2) + " no total!";
                diceResult.className = "game-result-message win";
                registerWinStreak();
            } else {
                const choiceLabel = diceChoice === "even" ? "PAR" : diceChoice === "odd" ? "ÍMPAR" : diceChoice.replace("number-", "número ");
                diceResult.textContent = "O dado caiu no " + result + ". Você escolheu " + choiceLabel + " e perdeu " + formatMoney(diceBet) + ".";
                diceResult.className = "game-result-message loss";
                registerLoss();
            }

            rollDiceButton.disabled = false;
        }, 1250);
    });
}

/* ==================================================
   ROLETA SIMPLES
   Preto: 20% / 3x
   Vermelho: 70% / 1,5x
   Verde: 10% / 0x
================================================== */

const rouletteGameButton = document.getElementById("rouletteGameButton");
const rouletteModal = document.getElementById("rouletteModal");
const closeRoulette = document.getElementById("closeRoulette");
const rouletteWheel = document.getElementById("rouletteWheel");
const rouletteResult = document.getElementById("rouletteResult");
const spinRouletteButton = document.getElementById("spinRouletteButton");
const rouletteChoices = document.querySelectorAll(".roulette-choice");
const rouletteBetOptions = document.querySelectorAll("#rouletteBetOptions .bet-option");

let rouletteChoice = null;
let rouletteBet = 0;

if (rouletteGameButton) {
    rouletteGameButton.addEventListener("click", function () {
        rouletteResult.textContent = "Escolha uma cor e uma aposta.";
        rouletteResult.className = "game-result-message";
        openGameModal(rouletteModal);
        playGameSound("bets");
    });
}

if (closeRoulette) {
    closeRoulette.addEventListener("click", function () {
        closeGameModal(rouletteModal);
    });
}

rouletteChoices.forEach(function (button) {
    button.addEventListener("click", function () {
        rouletteChoices.forEach(function (item) { item.classList.remove("active"); });
        button.classList.add("active");
        rouletteChoice = button.dataset.color;
    });
});

rouletteBetOptions.forEach(function (button) {
    button.addEventListener("click", function () {
        rouletteBetOptions.forEach(function (item) { item.classList.remove("selected"); });
        button.classList.add("selected");
        rouletteBet = Number(button.dataset.bet);
        rouletteResult.textContent = "Aposta selecionada: " + formatMoney(rouletteBet);
        rouletteResult.className = "game-result-message";
    });
});

function rouletteOutcome() {
    const roll = Math.random() * 100;
    if (roll < 20) return "black";
    if (roll < 90) return "red";
    return "green";
}

function rouletteTargetRotation(outcome) {
    // Segmentos do disco: 10% cada, verde ocupa o último segmento.
    // O ponteiro permanece parado no topo; apenas o disco gira.
    const segmentCenter = {
        black: 45,
        red: 135,
        green: 315
    };
    const target = segmentCenter[outcome] || 45;
    return 1440 + (360 - target);
}

if (spinRouletteButton) {
    spinRouletteButton.addEventListener("click", function () {
        const account = getCurrentAccount();

        if (!account) return;
        if (!rouletteChoice) {
            rouletteResult.textContent = "Escolha uma cor primeiro.";
            rouletteResult.className = "game-result-message loss";
            return;
        }
        if (!rouletteBet) {
            rouletteResult.textContent = "Escolha o valor da aposta.";
            rouletteResult.className = "game-result-message loss";
            return;
        }
        if (account.casinoBalance < rouletteBet) {
            rouletteResult.textContent = "Saldo insuficiente no cassino.";
            rouletteResult.className = "game-result-message loss";
            return;
        }

        spinRouletteButton.disabled = true;
        rouletteResult.textContent = "A roleta está girando...";
        rouletteResult.className = "game-result-message";

        const rouletteAudio = gameSounds.roulette;
        // O giro fica sincronizado com o áudio "roda de cassino".
        // O arquivo enviado tem cerca de 12,6s, então a roleta permanece girando
        // por todo o efeito e só revela o resultado quando o áudio termina.
        const finishRoulette = function () {
            if (rouletteWheel.dataset.finishing === "1") return;
            rouletteWheel.dataset.finishing = "1";
            rouletteWheel.classList.remove("spinning");

            settleGame(rouletteBet, multiplier, won, "Roleta");

            const names = {
                black: "PRETO ⚫",
                red: "VERMELHO 🔴",
                green: "VERDE 🟢"
            };

            if (won) {
                rouletteResult.textContent = "BOA! Caiu " + names[outcome] + ". Retorno total: " + formatMoney(rouletteBet * multiplier) + ".";
                rouletteResult.className = "game-result-message win";
                registerWinStreak();
            } else {
                rouletteResult.textContent = "Caiu " + names[outcome] + ". Você perdeu " + formatMoney(rouletteBet) + ".";
                rouletteResult.className = "game-result-message loss";
                registerLoss();
            }

            spinRouletteButton.disabled = false;
            rouletteWheel.dataset.finishing = "0";
        };

        rouletteWheel.classList.remove("spinning");
        rouletteWheel.dataset.finishing = "0";
        rouletteWheel.style.setProperty("--roulette-end", "1440deg");
        void rouletteWheel.offsetWidth;

        const outcome = rouletteOutcome();
        rouletteWheel.style.setProperty("--roulette-end", rouletteTargetRotation(outcome) + "deg");

        // Usa a duração real do áudio para que o giro e o som terminem juntos.
        const audioDuration = rouletteAudio && Number.isFinite(rouletteAudio.duration) && rouletteAudio.duration > 0
            ? rouletteAudio.duration
            : 12.6;
        rouletteWheel.style.setProperty("--roulette-duration", audioDuration + "s");
        rouletteWheel.classList.add("spinning");

        const multiplier = outcome === "black" ? 3 : outcome === "red" ? 1.5 : 0;
        const won = outcome === rouletteChoice;

        // O áudio é iniciado pelo clique do usuário e o resultado só é liberado
        // no evento "ended". O fallback evita travamento caso o navegador não
        // dispare o evento por algum motivo.
        let fallbackTimer = null;
        const onRouletteAudioEnded = function () {
            if (fallbackTimer) clearTimeout(fallbackTimer);
            rouletteAudio.removeEventListener("ended", onRouletteAudioEnded);
            finishRoulette();
        };

        rouletteAudio.removeEventListener("ended", onRouletteAudioEnded);
        rouletteAudio.addEventListener("ended", onRouletteAudioEnded);
        playGameSound("roulette");

        fallbackTimer = setTimeout(function () {
            rouletteAudio.removeEventListener("ended", onRouletteAudioEnded);
            finishRoulette();
        }, Math.max(12000, audioDuration * 1000 + 500));
    });
}


/* ==================================================
   BLACKJACK 21 — SIMULAÇÃO EDUCACIONAL
================================================== */
const blackjackGameButton = document.getElementById("blackjackGameButton");
const blackjackModal = document.getElementById("blackjackModal");
const closeBlackjack = document.getElementById("closeBlackjack");
const blackjackBetOptions = document.querySelectorAll("#blackjackBetOptions .bet-option");
const dealBlackjack = document.getElementById("dealBlackjack");
const hitBlackjack = document.getElementById("hitBlackjack");
const standBlackjack = document.getElementById("standBlackjack");
const doubleBlackjack = document.getElementById("doubleBlackjack");
const dealerCards = document.getElementById("dealerCards");
const playerCards = document.getElementById("playerCards");
const dealerScore = document.getElementById("dealerScore");
const playerScore = document.getElementById("playerScore");
const blackjackStatus = document.getElementById("blackjackStatus");

let blackjackBet = 0;
let blackjackDeck = [];
let blackjackPlayerHand = [];
let blackjackDealerHand = [];
let blackjackRoundActive = false;
let blackjackHasActed = false;

const blackjackSuits = [
    { symbol:"♠", name:"spades", red:false },
    { symbol:"♥", name:"hearts", red:true },
    { symbol:"♦", name:"diamonds", red:true },
    { symbol:"♣", name:"clubs", red:false }
];
const blackjackRanks = [
    { rank:"A", value:11 }, { rank:"2", value:2 }, { rank:"3", value:3 },
    { rank:"4", value:4 }, { rank:"5", value:5 }, { rank:"6", value:6 },
    { rank:"7", value:7 }, { rank:"8", value:8 }, { rank:"9", value:9 },
    { rank:"10", value:10 }, { rank:"J", value:10 }, { rank:"Q", value:10 }, { rank:"K", value:10 }
];

function createBlackjackDeck() {
    const deck = [];
    blackjackSuits.forEach(function(suit) {
        blackjackRanks.forEach(function(item) {
            deck.push({ rank:item.rank, value:item.value, suit:suit.symbol, red:suit.red });
        });
    });
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function blackjackHandValue(hand) {
    let total = hand.reduce(function(sum, card) { return sum + card.value; }, 0);
    let aces = hand.filter(function(card) { return card.rank === "A"; }).length;
    while (total > 21 && aces > 0) { total -= 10; aces--; }
    return total;
}

function blackjackIsSoft(hand) {
    let total = hand.reduce(function(sum, card) { return sum + card.value; }, 0);
    return hand.some(function(card) { return card.rank === "A"; }) && total <= 21;
}

function blackjackCardElement(card, hidden, delay) {
    const el = document.createElement("div");
    el.className = "playing-card" + (card.red ? " red" : "") + (hidden ? " hidden-card" : "");
    el.style.setProperty("--card-rot", ((Math.random() * 6) - 3).toFixed(2) + "deg");
    el.style.animationDelay = delay + "ms";
    if (!hidden) {
        const face = ["J","Q","K"].includes(card.rank);
        el.innerHTML = `
            <span class="card-corner"><span class="rank">${card.rank}</span><span class="suit">${card.suit}</span></span>
            <span class="card-center">${face ? card.rank : card.suit}</span>
            <span class="card-corner bottom"><span class="rank">${card.rank}</span><span class="suit">${card.suit}</span></span>`;
        if (face) el.classList.add("face-card");
    }
    return el;
}

function renderBlackjackHands(revealDealer) {
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";
    blackjackDealerHand.forEach(function(card, index) {
        dealerCards.appendChild(blackjackCardElement(card, !revealDealer && index === 1, index * 100));
    });
    blackjackPlayerHand.forEach(function(card, index) {
        playerCards.appendChild(blackjackCardElement(card, false, index * 100));
    });
    playerScore.textContent = blackjackPlayerHand.length ? blackjackHandValue(blackjackPlayerHand) : "—";
    dealerScore.textContent = blackjackDealerHand.length ? (revealDealer ? blackjackHandValue(blackjackDealerHand) : blackjackDealerHand[0].value + "+") : "—";
}

function resetBlackjackTable() {
    blackjackPlayerHand = [];
    blackjackDealerHand = [];
    blackjackRoundActive = false;
    blackjackHasActed = false;
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";
    dealerScore.textContent = "—";
    playerScore.textContent = "—";
    blackjackStatus.className = "blackjack-status";
    blackjackStatus.textContent = "Escolha sua aposta para começar uma rodada.";
    dealBlackjack.disabled = false;
    hitBlackjack.disabled = true;
    standBlackjack.disabled = true;
    doubleBlackjack.disabled = true;
}

if (blackjackGameButton) {
    blackjackGameButton.addEventListener("click", function() {
        resetBlackjackTable();
        blackjackBetOptions.forEach(function(item) { item.classList.remove("selected"); });
        blackjackBet = 0;
        openGameModal(blackjackModal);
        playGameSound("bets");
    });
}
if (closeBlackjack) closeBlackjack.addEventListener("click", function() { closeGameModal(blackjackModal); });

blackjackBetOptions.forEach(function(button) {
    button.addEventListener("click", function() {
        if (blackjackRoundActive) return;
        blackjackBetOptions.forEach(function(item) { item.classList.remove("selected"); });
        button.classList.add("selected");
        blackjackBet = Number(button.dataset.bet);
        blackjackStatus.className = "blackjack-status";
        blackjackStatus.textContent = "Aposta selecionada: " + formatMoney(blackjackBet) + ". Clique em DISTRIBUIR CARTAS.";
    });
});

function blackjackEndRound(won, multiplier, message, lossAmount) {
    const amount = lossAmount || blackjackBet;
    settleGame(amount, multiplier, won, "Blackjack 21");
    blackjackRoundActive = false;
    dealBlackjack.disabled = false;
    hitBlackjack.disabled = true;
    standBlackjack.disabled = true;
    doubleBlackjack.disabled = true;
    blackjackStatus.textContent = message;
    blackjackStatus.className = "blackjack-status " + (won ? "win" : "loss");
    if (won) registerWinStreak(); else registerLoss();
}

function blackjackResolveDealer() {
    renderBlackjackHands(true);
    const drawDealer = function() {
        const value = blackjackHandValue(blackjackDealerHand);
        if (value < 17) {
            blackjackDealerHand.push(blackjackDeck.pop());
            renderBlackjackHands(true);
            setTimeout(drawDealer, 550);
            return;
        }
        const playerValue = blackjackHandValue(blackjackPlayerHand);
        const dealerValue = blackjackHandValue(blackjackDealerHand);
        if (dealerValue > 21 || playerValue > dealerValue) {
            blackjackEndRound(true, 2, dealerValue > 21 ? "BOA! O dealer estourou com " + dealerValue + ". Você venceu!" : "BOA! " + playerValue + " contra " + dealerValue + ". Você venceu!");
        } else if (playerValue === dealerValue) {
            settleGame(blackjackBet, 1, true, "Blackjack 21 - Empate");
            blackjackRoundActive = false;
            dealBlackjack.disabled = false; hitBlackjack.disabled = true; standBlackjack.disabled = true; doubleBlackjack.disabled = true;
            blackjackStatus.textContent = "EMPATE! As fichas da rodada foram devolvidas.";
            blackjackStatus.className = "blackjack-status";
        } else {
            blackjackEndRound(false, 0, "O dealer fez " + dealerValue + ". Você perdeu " + formatMoney(blackjackBet) + ".");
        }
    };
    setTimeout(drawDealer, 500);
}

function blackjackCheckInitial() {
    const playerNatural = blackjackPlayerHand.length === 2 && blackjackHandValue(blackjackPlayerHand) === 21;
    const dealerNatural = blackjackDealerHand.length === 2 && blackjackHandValue(blackjackDealerHand) === 21;
    if (playerNatural || dealerNatural) {
        renderBlackjackHands(true);
        if (playerNatural && dealerNatural) {
            settleGame(blackjackBet, 1, true, "Blackjack 21 - Empate");
            blackjackRoundActive = false; dealBlackjack.disabled = false;
            blackjackStatus.textContent = "BLACKJACK DOS DOIS! Empate — aposta devolvida.";
            blackjackStatus.className = "blackjack-status";
        } else if (playerNatural) {
            blackjackEndRound(true, 2.5, "BLACKJACK! 🂡 21 perfeito — retorno de " + formatMoney(blackjackBet * 2.5) + ".");
        } else {
            blackjackEndRound(false, 0, "O dealer abriu BLACKJACK. Você perdeu " + formatMoney(blackjackBet) + ".");
        }
        return true;
    }
    return false;
}

if (dealBlackjack) {
    dealBlackjack.addEventListener("click", function() {
        const account = getCurrentAccount();
        if (!account) return;
        if (!blackjackBet) { blackjackStatus.textContent = "Escolha o valor da aposta."; blackjackStatus.className = "blackjack-status loss"; return; }
        if (account.casinoBalance < blackjackBet) { blackjackStatus.textContent = "Saldo insuficiente no cassino."; blackjackStatus.className = "blackjack-status loss"; return; }

        blackjackDeck = createBlackjackDeck();
        blackjackPlayerHand = [blackjackDeck.pop(), blackjackDeck.pop()];
        blackjackDealerHand = [blackjackDeck.pop(), blackjackDeck.pop()];
        blackjackRoundActive = true;
        blackjackHasActed = false;
        dealBlackjack.disabled = true;
        hitBlackjack.disabled = false;
        standBlackjack.disabled = false;
        doubleBlackjack.disabled = false;
        blackjackStatus.className = "blackjack-status";
        blackjackStatus.textContent = "As cartas estão sendo distribuídas...";
        playGameSound("bets");
        renderBlackjackHands(false);
        setTimeout(function() {
            if (!blackjackRoundActive) return;
            if (!blackjackCheckInitial()) {
                blackjackStatus.textContent = "Sua vez. Compre, pare ou dobre.";
                if (blackjackHandValue(blackjackPlayerHand) === 21) blackjackResolveDealer();
            }
        }, 850);
    });
}

if (hitBlackjack) {
    hitBlackjack.addEventListener("click", function() {
        if (!blackjackRoundActive) return;
        blackjackHasActed = true;
        blackjackPlayerHand.push(blackjackDeck.pop());
        renderBlackjackHands(false);
        const value = blackjackHandValue(blackjackPlayerHand);
        if (value > 21) {
            blackjackEndRound(false, 0, "ESTOUROU! Você fez " + value + ".");
        } else if (value === 21) {
            blackjackStatus.textContent = "21! O dealer vai revelar as cartas...";
            blackjackResolveDealer();
        } else {
            blackjackStatus.textContent = "Você está com " + value + ". Quer comprar outra?";
        }
    });
}

if (standBlackjack) {
    standBlackjack.addEventListener("click", function() {
        if (!blackjackRoundActive) return;
        blackjackHasActed = true;
        blackjackStatus.textContent = "Você parou em " + blackjackHandValue(blackjackPlayerHand) + ". Revelando o dealer...";
        blackjackResolveDealer();
    });
}

if (doubleBlackjack) {
    doubleBlackjack.addEventListener("click", function() {
        if (!blackjackRoundActive || blackjackHasActed || blackjackPlayerHand.length !== 2) return;
        const account = getCurrentAccount();
        if (!account || account.casinoBalance < blackjackBet * 2) {
            blackjackStatus.textContent = "Saldo insuficiente para dobrar a aposta.";
            blackjackStatus.className = "blackjack-status loss";
            return;
        }
        blackjackBet *= 2;
        blackjackHasActed = true;
        blackjackPlayerHand.push(blackjackDeck.pop());
        renderBlackjackHands(false);
        const value = blackjackHandValue(blackjackPlayerHand);
        doubleBlackjack.disabled = true;
        if (value > 21) {
            blackjackEndRound(false, 0, "DOBROU E ESTOUROU! Você fez " + value + ".", blackjackBet);
        } else {
            blackjackStatus.textContent = "Aposta dobrada. Você fez " + value + ". Revelando o dealer...";
            blackjackResolveDealer();
        }
    });
}

/* Fechar os jogos clicando fora da janela */
[diceModal, rouletteModal, blackjackModal].forEach(function (modal) {
    if (!modal) return;
    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeGameModal(modal);
    });
});


/* ==================================================
   RESTAURAR SESSÃO
================================================== */
if (currentUser === ADMIN_CONFIG.username) {
    const restoredAdmin = getUserAccount(currentUser);
    if (restoredAdmin && restoredAdmin.isAdmin) {
        openAdminPanel();
    }
}
