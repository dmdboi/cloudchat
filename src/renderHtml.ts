export function renderHtml(datacenter: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en" x-data="chatApp()" x-init="init()">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CloudChat</title>

        <!-- Meta tags for SEO -->
        <meta name="description" content="Say hello to other users in Cloudflare's ${datacenter} datacenter!" />

        <meta name="author" content="@dmdboi" />
        <meta name="theme-color" content="#ffffff" />

        <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
        <style>
        body {
              font-family: 'Comic Sans MS', 'Comic Sans', cursive, Arial, sans-serif;
      margin: 0;
      padding: 0;
background: radial-gradient(circle, #0066cc 0%, #004080 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .login-container {
      background: transparent;
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      width: 300px;
      position: relative;
    }

    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
    }

    input[type="checkbox"] {
      margin-right: 5px;
    }

    .checkbox-container {
      text-align: left;
      margin-bottom: 15px;
    }

    .login-button {
      background-color: #0072bc;
      border: 2px solid #004a80;
      color: white;
      padding: 10px 30px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      margin-bottom: 10px;
    }

    .login-button:hover {
      background-color: #005fa3;
    }

    .link {
      display: block;
      color: #add8ff;
      text-decoration: none;
      margin: 6px 0;
      font-size: 14px;
    }

    .link:hover {
      text-decoration: underline;
    }

    .club-rules-button {
      background-color: #003366;
      border-radius: 20px;
      padding: 10px;
      color: white;
      font-weight: bold;
      display: inline-block;
      margin-top: 10px;
      font-size: 14px;
      text-decoration: none;
    }

    .sticky-note {
      position: absolute;
      right: -80px;
      top: 20px;
      background: #ffeb3b;
      color: black;
      padding: 10px;
      font-weight: bold;
      transform: rotate(-10deg);
      width: 120px;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    }

    .text-center {
      text-align: center;
    }

    .messages {
      background: #e0f7fa;
      border: 3px solid #0072bc;
      border-radius: 18px;
      box-shadow: 0 4px 12px #0072bc44;
      padding: 18px 16px 12px 16px;
      margin-bottom: 16px;
      height: 320px;
      overflow-y: auto;
      font-family: 'Comic Sans MS', 'Comic Sans', cursive, Arial, sans-serif;
      font-size: 1.08em;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .msg {
      display: flex;
      align-items: flex-end;
      margin-bottom: 0;
    }
    .msg-user {
      background: #fff;
      color: #0072bc;
      border: 2px solid #0072bc;
      border-radius: 12px;
      padding: 2px 10px;
      font-weight: bold;
      margin-right: 8px;
      font-family: 'Comic Sans MS', 'Comic Sans', cursive, Arial, sans-serif;
      font-size: 1em;
      box-shadow: 1px 2px 0 #b3e5fc;
    }
    .msg-content {
      color: #333;
      padding: 6px 14px;
      font-size: 1em;
      max-width: 320px;
      word-break: break-word;
      background: #fffde7;
      border: 2px solid #ffe082;
      border-radius: 16px;
      box-shadow: 1px 2px 0 #ffe082;
    }
    .send-form {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      margin-bottom: 0;
    }
    .send-form textarea {
      flex: 1;
      border-radius: 8px;
      border: 2px solid #0072bc;
      font-family: 'Comic Sans MS', 'Comic Sans', cursive, Arial, sans-serif;
      font-size: 1em;
      padding: 8px;
      resize: none;
      background: #e0f7fa;
      color: #222;
      min-height: 40px;
      max-height: 80px;
    }
    .send-form button {
      background: #0072bc;
      color: #fff;
      border: 2px solid #004a80;
      border-radius: 8px;
      font-size: 1em;
      padding: 10px 22px;
      font-family: 'Comic Sans MS', 'Comic Sans', cursive, Arial, sans-serif;
      cursor: pointer;
      box-shadow: 1px 2px 0 #b3e5fc;
      height: 40px;
      align-self: stretch;
      display: flex;
      align-items: center;
    }
    .send-form button:hover {
      background: #005fa3;
    }

    .server-list {
      margin-top: 20px;
      display: inline-block;
      text-align: left;
    }

    .server {
      border: 2px solid #0072bc;
      font-family: 'Comic Sans MS', 'Comic Sans', cursive, Arial, sans-serif;
      background-color: rgba(0, 102, 204, 0.8);
      border-radius: 25px;
      padding: 10px 20px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 460px;
    }

    .server-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .buddy-icon {
      width: 24px;
      height: 24px;
      background: #0cf;
      border-radius: 50%;
    }

    .server-name {
      font-weight: bold;
      font-size: 16px;
    }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="text-center">CloudChat</h1>

          <template x-if="!token">
            <form class="login-container" @submit.prevent="authMode === 'login' ? login() : create()">
              <label for="penguin-name">Chat Name:</label><br />
              <input type="text" id="penguin-name" x-model="username" required /><br />
              <label for="password">Password:</label><br />
              <input type="password" id="password" x-model="password" required /><br />

              <button class="login-button" type="submit" x-text="authMode === 'login' ? 'Login' : 'Create'"></button>

              <a href="#" class="link" @click.prevent="toggleAuth()"
                x-text="authMode === 'login' ? 'Don\\'t have an account?\\nCreate a free account now' : 'Already have an account?\\nLogin now'"></a>

              <div class="sticky-note">KEEP YOUR PASSWORD A SECRET</div>
              <div class="error" x-text="error"></div>
            </form>
          </template>
          <template x-if="token">
            <div>
              <div class="messages" id="messages">
                <template x-for="msg in messages" :key="msg.id">
                  <div class="msg">
                    <span class="msg-user" x-text="msg.username"></span>
                    <span class="msg-content" x-text="msg.content"></span>
                  </div>
                </template>
              </div>
              <form class="send-form" @submit.prevent="sendMessage()">
                <textarea x-model="message" rows="2" cols="30" placeholder="Type your message"></textarea>
                <button type="submit">Send</button>
              </form>
              <div class="error" x-text="error"></div>
            </div>
          </template>
          <div class="text-center" style="margin-top: 20px;">
            Powered by Cloudflare
          </div>

          <!-- Datacenters -->

          <template x-if="datacenters.length > 0">
            <div class="server-list">
              <template x-for="dc in datacenters" :key="dc.name">
                <div class="server">
                  <div class="server-info">
                    <div class="buddy-icon"></div>
                    <div class="server-name"
                      x-text="dc.name"></div>
                  </div>
                  <div class="population">
                    <span x-text="'🐧 ' + dc.count"></span>
                  </div>
                </div>
              </template>
            </div>
          </template>

        <script>
          function chatApp() {
            return {
              username: '',
              password: '',
              message: '',
              messages: [],
              token: localStorage.getItem('token') || '',
              authMode: 'login',
              error: '',
              poller: null,
              datacenters: [],
              async init() {
                if (this.token) await this.fetchMessages();
                this.startPolling();
                this.fetchDatacenters();
              },
              startPolling() {
                if (this.poller) clearInterval(this.poller);
                this.poller = setInterval(() => {
                  if (this.token) this.fetchMessages();
                }, 20000);
              },
              toggleAuth() {
                this.authMode = this.authMode === 'login' ? 'create' : 'login';
                this.error = '';
              },
              async create() {
                this.error = '';
                try {
                  const res = await fetch('/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: this.username, password: this.password })
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);
                  this.authMode = 'login';
                  this.error = 'Account created! Please login.';
                } catch (e) {
                  this.error = e.message;
                }
              },
              async login() {
                this.error = '';
                try {
                  const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: this.username, password: this.password })
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);
                  this.token = data.token;
                  localStorage.setItem('token', this.token);
                  await this.fetchMessages();
                } catch (e) {
                  this.error = e.message;
                }
              },
              async sendMessage() {
                this.error = '';
                if (!this.message.trim()) return;
                try {
                  const res = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.token
                    },
                    body: JSON.stringify({ message: this.message })
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);
                  this.message = '';
                  await this.fetchMessages();
                } catch (e) {
                  this.error = e.message;
                }
              },
              async fetchMessages() {
                this.error = '';
                try {
                  const res = await fetch('/get-messages', {
                    headers: { 'Authorization': 'Bearer ' + this.token }
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);
                  this.messages = data.messages || [];
                  this.scrollToBottom();
                } catch (e) {
                  this.error = e.message;
                }
              },
              logout() {
                this.token = '';
                localStorage.removeItem('token');
                this.messages = [];
                this.username = '';
                this.password = '';
                this.message = '';
                this.error = '';
              },
              scrollToBottom() {
                this.$nextTick(() => {
                  const el = document.getElementById('messages');
                  if (el) el.scrollTop = el.scrollHeight;
                });
              },
              async fetchDatacenters() {
                try {
                  const res = await fetch('/datacenters');
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);
                  this.datacenters = data.datacenters || [];
                } catch (e) {
                  console.error('Error fetching datacenters:', e.message);
                }
              }
            }
          }
        </script>
      </body>
    </html>
  `;
}
