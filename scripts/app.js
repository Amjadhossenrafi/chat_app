//dom queries
const chatlist = document.querySelector('.chat-list')
const newMessage = document.querySelector('.text-input-form')
const changeUserNameBtn = document.querySelector('.change-name-button')
const changeUserNameContainer = document.querySelector(
  '.change-username-container',
)
const cut = document.querySelector('.cross')
const changeUserNameForm = document.querySelector('.change-username-form')
const rooms = document.querySelector('.channel-selector-container')
//class instances
const chatUi = new ChatUi(chatlist)
const chatroom = new Chatroom(
  'genaral',
  localStorage.getItem('chat_app_username'),
)
//getting chats and rendering
chatroom.getChats((change) => {
  chatUi.render(change.doc.data())
})
//adding new chats
newMessage.addEventListener('submit', (e) => {
  e.preventDefault()
  if (newMessage.text.value.trim()) {
    chatroom
      .addChat(newMessage.text.value.trim())
      .then(() => {})
      .catch((err) => console.error(err))
    newMessage.reset()
  }
})
//updating the chatroom
rooms.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatUi.clear()
    chatroom.updateroom(e.target.getAttribute('id'))
    chatroom.getChats((change) => {
      chatUi.render(change.doc.data())
    })
  }
})

//checking if there is a username stored in the localstorage
window.addEventListener('load', (e) => {
  if (!localStorage.chat_app_username) {
    changeUserNameContainer.style.display = 'flex'
  }
})
//changing and adding the username
changeUserNameBtn.addEventListener('click', (e) => {
  changeUserNameContainer.style.display = 'flex'
})
cut.addEventListener('click', (e) => {
  changeUserNameContainer.style.display = 'none'
})
changeUserNameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (changeUserNameForm.username.value.trim()) {
    chatroom.updatename(changeUserNameForm.username.value.trim())
    changeUserNameContainer.style.display = 'none'
    changeUserNameForm.reset()
  }
})
