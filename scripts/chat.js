class Chatroom {
  constructor(room, username) {
    this.room = room
    this.username = username
    this.chats = db.collection('chats')
    this.unsub
  }
  async addChat(message) {
    const data = {
      username: this.username,
      room: this.room,
      message: message,
      created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    }
    const response = await this.chats.add(data)
    return response
  }
  getChats(callback) {
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            callback(change)
          }
        })
      })
  }
  updatename(username) {
    this.username = username
    localStorage.setItem('chat_app_username', username)
  }
  updateroom(room) {
    this.room = room
    console.log('room updated')
    if (this.unsub) {
      this.unsub()
    }
  }
}
