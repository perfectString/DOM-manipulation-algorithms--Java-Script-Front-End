const baseURL = 'http://localhost:3030/jsonstore/matches/'

const hostInput = document.getElementById('host')
const scoreInput = document.getElementById('score')
const guestInput = document.getElementById('guest')

const addBtn = document.getElementById('add-match')
const editBtn = document.getElementById('edit-match')
const loadBtn = document.getElementById('load-matches')

const list = document.getElementById('list')

let currentEdit = null;

loadBtn.addEventListener('click', onLoad)
addBtn.addEventListener('click', onAdd)
editBtn.addEventListener('click', onEdit)

async function onLoad() {
  const response = await fetch(baseURL)
  const data = await response.json()

  list.innerHTML = ''
  editBtn.disabled = true
  addBtn.disabled = false
  currentEdit = null

  const matches = Array.isArray(data)
    ? data
    : Object.values(data)

  for (const match of matches) {
    const li = document.createElement('li')
    li.className = 'match'

    const infoDiv = document.createElement('div')
    infoDiv.className = 'info'

    const hostP = document.createElement('p')
    hostP.textContent = match.host

    const scoreP = document.createElement('p')
    scoreP.textContent = match.score

    const guestP = document.createElement('p')
    guestP.textContent = match.guest

    const buttonsDiv = document.createElement('div')
    buttonsDiv.className = 'btn-wrapper'

    const changeBtn = document.createElement('button')
    changeBtn.className = 'change-btn'
    changeBtn.textContent = 'Change'

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.textContent = 'Delete'

    infoDiv.appendChild(hostP)
    infoDiv.appendChild(scoreP)
    infoDiv.appendChild(guestP)
    buttonsDiv.appendChild(changeBtn)
    buttonsDiv.appendChild(deleteBtn)

    li.appendChild(infoDiv)
    li.appendChild(buttonsDiv)

    li.dataset.id = match._id
    list.appendChild(li)

    changeBtn.addEventListener('click', () => {
      hostInput.value = match.host
      scoreInput.value = match.score
      guestInput.value = match.guest

      currentEdit = match._id

      addBtn.disabled = true
      editBtn.disabled = false
    })

    deleteBtn.addEventListener('click', () => {
      onDelete(match._id)
    })
  }
}

async function onAdd(e) {
    e.preventDefault()

    const host = hostInput.value.trim()
    const score = scoreInput.value.trim()
    const guest = guestInput.value.trim()

    if (host === '' || score === '' || guest === '') {
        return;
    }

    await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, score, guest })
    })

    /*await onLoad()*/
    clearInputs()
}

async function onEdit(e) {
    e.preventDefault()
    editBtn.disabled = false
    addBtn.disabled = true

    if(!currentEdit){
        return
    }

    
    
    const host = hostInput.value.trim()
    const score = scoreInput.value.trim()
    const guest = guestInput.value.trim()
    
    if (host === '' || score === '' || guest === '') {
       return;
    }
  await fetch(`${baseURL}${currentEdit}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, score, guest, _id: currentEdit })
    })

    await onLoad()
    clearInputs()
    editBtn.disabled = true
    addBtn.disabled = false
}

async function onDelete(id) {
    await fetch(`${baseURL}${id}`, {
    method: 'DELETE'
})


await onLoad()
}

function clearInputs() {
    hostInput.value = ''
    scoreInput.value = ''
    guestInput.value = ''
    currentEdit = null
    editBtn.disabled = true
    addBtn.disabled = false
}