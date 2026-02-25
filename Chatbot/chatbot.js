// Coins Animation
const coinContainer = document.querySelector(".coins");

for(let i = 0; i < 10; i++){
    const coin = document.createElement("span");
    coin.innerHTML = "💰";
    coin.style.left = Math.random() * 100 + "%";
    coin.style.animationDuration = (Math.random() * 3 + 2) + "s"; // 2-5s
    coin.style.fontSize = (Math.random() * 30 + 20) + "px";
    coinContainer.appendChild(coin);
}

// ===== CHAT SCREEN TOGGLE =====
const chatBtn = document.getElementById("chatBtn");
const chatScreen = document.getElementById("chatScreen");
const closeChat = document.getElementById("closeChat");

chatBtn.addEventListener("click", () => {
    chatScreen.style.display = "flex";
});

closeChat.addEventListener("click", () => {
    chatScreen.style.display = "none";
})

// ===== CHAT SYSTEM FRONTEND PRO VERSION =====

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const newChatBtn = document.getElementById("newChatBtn");
const chatHistoryDiv = document.getElementById("chatHistory");
const chatBody = document.getElementById("chatBody");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

let chats = JSON.parse(localStorage.getItem("finsarthi_chats")) || {};
let currentChatId = null;

// ===== Sidebar Toggle =====
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});



// ===== Save Chats =====
function saveChats(){
    localStorage.setItem("finsarthi_chats", JSON.stringify(chats));
}// ===== Close Sidebar When Clicking Outside =====
document.addEventListener("click", (e) => {
    if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("active");
    }
});

// ===== Render Sidebar List =====
function renderChatList(){
    chatHistoryDiv.innerHTML = "<p class='history-title'>Your Chats</p>";

    Object.keys(chats).forEach(chatId => {
        const chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");

        if(chatId === currentChatId){
            chatItem.classList.add("active");
        }

        chatItem.textContent = chats[chatId].name || "New Chat";

        // Open Chat
       chatItem.addEventListener("click", () => {
    currentChatId = chatId;
    loadChat(chatId);
    renderChatList();
    sidebar.classList.remove("active"); // close after selecting
});

        // Delete Button
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = " 🗑";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            delete chats[chatId];
            if(currentChatId === chatId){
                currentChatId = null;
                chatBody.innerHTML = "";
            }
            saveChats();
            renderChatList();
        });

        chatItem.appendChild(deleteBtn);
        chatHistoryDiv.appendChild(chatItem);
    });
}

// ===== Load Chat =====
function loadChat(chatId){
    chatBody.innerHTML = "";

    chats[chatId].messages.forEach(msg => {
        addMessageToUI(msg.text, msg.type, false);
    });
}

// ===== Create New Chat =====
newChatBtn.addEventListener("click", () => {
    const id = "chat_" + Date.now();
    chats[id] = { name: "New Chat", messages: [] };
    currentChatId = id;
    saveChats();
    renderChatList();
    chatBody.innerHTML = "";
});

// ===== Send Message =====
function sendMessage(){
    const msg = userInput.value.trim();
    if(msg === "" || !currentChatId) return;

    addMessage(msg, "user-msg");

    userInput.value = "";

    // Typing Indicator
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message","bot-msg","typing");
    typingDiv.textContent = "Finsarthi is typing...";
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        typingDiv.remove();
        addMessage("Hello! I am Finsarthi. How can I assist you?", "bot-msg");
    }, 1000);
}

function addMessage(text, type){
    addMessageToUI(text, type, true);

    chats[currentChatId].messages.push({text, type});

    // Rename chat based on first message
    if(chats[currentChatId].messages.length === 1){
        chats[currentChatId].name = text.substring(0, 20);
    }

    saveChats();
    renderChatList();
}

function addMessageToUI(text, type, scroll = true){
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", type);
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);

    if(scroll){
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter") sendMessage();
});

// Initial Render
renderChatList();
