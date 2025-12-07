// Simulated WebSocket - In production, replace with actual WebSocket connection
class ChatApp {
  constructor() {
    this.currentUser = null;
    this.currentRoom = null;
    this.rooms = {
      general: { name: 'General', users: new Set(), messages: [] },
      random: { name: 'Random', users: new Set(), messages: [] },
      tech: { name: 'Tech Talk', users: new Set(), messages: [] },
    };
    this.activeUsers = new Set();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadInitialRooms();
  }

  setupEventListeners() {
    // Login
    document.getElementById('login-btn').addEventListener('click', () => this.login());
    document.getElementById('username-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.login();
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => this.logout());

    // Create Room
    document.getElementById('create-room-btn').addEventListener('click', () => this.createRoom());
    document.getElementById('new-room-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.createRoom();
    });

    // Send Message
    document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
    document.getElementById('message-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Formatting buttons
    document.querySelectorAll('.format-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.applyFormatting(e.target.dataset.format));
    });
  }

  login() {
    const username = document.getElementById('username-input').value.trim();
    const errorMsg = document.getElementById('error-message');

    if (!username) {
      errorMsg.textContent = 'Please enter a username';
      return;
    }
    if (username.length < 3) {
      errorMsg.textContent = 'Username must be at least 3 characters';
      return;
    }
    if (this.activeUsers.has(username.toLowerCase())) {
      errorMsg.textContent = 'Username already taken. Please choose another.';
      return;
    }

    this.currentUser = username;
    this.activeUsers.add(username.toLowerCase());
    document.getElementById('current-username').textContent = username;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    errorMsg.textContent = '';
  }

  logout() {
    if (this.currentRoom) this.leaveRoom(this.currentRoom);
    this.activeUsers.delete(this.currentUser.toLowerCase());
    this.currentUser = null;
    this.currentRoom = null;
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('chat-container').style.display = 'none';
    document.getElementById('username-input').value = '';
  }

  loadInitialRooms() {
    this.renderRoomList();
  }

  renderRoomList() {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';
    Object.entries(this.rooms).forEach(([id, room]) => {
      const roomItem = document.createElement('div');
      roomItem.className = 'room-item';
      if (this.currentRoom === id) roomItem.classList.add('active');
      roomItem.innerHTML = `<div class="room-name">${room.name}</div><div class="room-users">${room.users.size} users online</div>`;
      roomItem.addEventListener('click', () => this.joinRoom(id));
      roomList.appendChild(roomItem);
    });
  }

  createRoom() {
    const roomName = document.getElementById('new-room-input').value.trim();
    if (!roomName) {
      alert('Please enter a room name');
      return;
    }
    const roomId = roomName.toLowerCase().replace(/\s/g, '-');
    if (this.rooms[roomId]) {
      alert('A room with this name already exists');
      return;
    }
    this.rooms[roomId] = { name: roomName, users: new Set(), messages: [] };
    document.getElementById('new-room-input').value = '';
    this.renderRoomList();
    this.joinRoom(roomId);
  }

  joinRoom(roomId) {
    if (this.currentRoom === roomId) return;
    if (this.currentRoom) this.leaveRoom(this.currentRoom);
    this.currentRoom = roomId;
    const room = this.rooms[roomId];
    room.users.add(this.currentUser);
    const joinMsg = { type: 'system', content: this.currentUser + ' joined the room', timestamp: new Date() };
    room.messages.push(joinMsg);
    document.getElementById('current-room-name').textContent = room.name;
    document.getElementById('message-input-container').classList.add('active');
    document.getElementById('no-room-selected')?.remove();
    this.renderMessages();
    this.renderRoomList();
  }

  leaveRoom(roomId) {
    const room = this.rooms[roomId];
    if (!room) return;
    room.users.delete(this.currentUser);
    const leaveMsg = { type: 'system', content: this.currentUser + ' left the room', timestamp: new Date() };
    room.messages.push(leaveMsg);
    this.renderRoomList();
  }

  sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();
    if (!content || !this.currentRoom) return;
    const message = { type: 'user', author: this.currentUser, content: content, timestamp: new Date() };
    this.rooms[this.currentRoom].messages.push(message);
    input.value = '';
    this.renderMessages();
  }

  renderMessages() {
    const container = document.getElementById('messages-container');
    const room = this.rooms[this.currentRoom];
    container.innerHTML = '';
    room.messages.forEach((msg) => {
      if (msg.type === 'system') {
        const div = document.createElement('div');
        div.className = 'system-message';
        div.textContent = msg.content;
        container.appendChild(div);
      } else {
        const div = document.createElement('div');
        div.className = msg.author === this.currentUser ? 'message own' : 'message';
        const formattedContent = this.parseFormatting(msg.content);
        div.innerHTML = `<div class="message-header"><span class="message-author">${msg.author}</span><span class="message-time">${this.formatTime(msg.timestamp)}</span></div><div class="message-content">${formattedContent}</div>`;
        container.appendChild(div);
      }
    });
    container.scrollTop = container.scrollHeight;
  }

  parseFormatting(text) {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: inherit; text-decoration: underline;">$1</a>');
    return formatted;
  }

  applyFormatting(format) {
    const input = document.getElementById('message-input');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);
    let formattedText;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        const url = prompt('Enter URL');
        if (url) formattedText = `[${selectedText}](${url})`;
        break;
    }

    if (formattedText) {
      input.value = input.value.substring(0, start) + formattedText + input.value.substring(end);
      input.focus();
      input.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }
  }

  formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
}

// Initialize the app
const chatApp = new ChatApp();
