window.addEventListener("load", solve);

function solve() {
   const titleInput = document.getElementById('title')
   const authorInput = document.getElementById('author')
   const summeryInput = document.getElementById('summary')

   const draftList = document.getElementById('draft-list')
   const publishList = document.getElementById('published-list')

   const addBtn = document.getElementById('add-btn')

   addBtn.addEventListener('click', onAdd)

   function onAdd(e) {
      e.preventDefault()

      const title = titleInput.value.trim()
      const author = authorInput.value.trim()
      const summery = summeryInput.value.trim()

      if (title === '' || author === '' || summery === '') {
         return
      }

      const li = document.createElement('li')
      const article = document.createElement('article')

      const titleP = document.createElement('p')
      titleP.textContent = `${title}`
      const authorP = document.createElement('p')
      authorP.textContent = `${author}`
      const summeryP = document.createElement('p')
      summeryP.textContent = `${summery}`

      article.appendChild(titleP)
      article.appendChild(authorP)
      article.appendChild(summeryP)


      const buttonDiv = document.createElement('div');
      buttonDiv.className = 'buttons'

      const editBtn = document.createElement('button')
      editBtn.className = 'edit-btn'
      editBtn.textContent = 'Edit'

      const approveBtn = document.createElement('button')
      approveBtn.className = 'approve-btn'
      approveBtn.textContent = 'Approve'

      buttonDiv.appendChild(editBtn)
      buttonDiv.appendChild(approveBtn)

      li.appendChild(article)
      li.appendChild(buttonDiv)

      draftList.appendChild(li)

      titleInput.value = '';
      authorInput.value = '';
      summeryInput.value = '';


      addBtn.disabled = true

      editBtn.addEventListener('click', onEdit)
      approveBtn.addEventListener('click', onApprove)

   }

   function onEdit(e) {
      const li = e.currentTarget.parentElement.parentElement
      const paragraphs = li.querySelectorAll('article p')

      titleInput.value = paragraphs[0].textContent
      authorInput.value = paragraphs[1].textContent
      summeryInput.value = paragraphs[2].textContent

      li.remove()
      addBtn.disabled = false

   }

   function onApprove(e) {
      const li = e.currentTarget.parentElement.parentElement
      const article = li.querySelector('article')

      const buttonDivs = li.querySelector('.buttons')
      buttonDivs.remove()

      const publishBtn = document.createElement('button')
      publishBtn.className = 'publish-btn'
      publishBtn.textContent = 'Publish'
      
      const approvedLi = document.createElement('li')
      approvedLi.appendChild(article)
      approvedLi.appendChild(publishBtn)

      li.remove()

      publishList.appendChild(approvedLi)
      addBtn.disabled = false

      publishBtn.addEventListener('click', onPublish)
   }

   function onPublish(e){
      const li = e.currentTarget.parentElement

      li.remove()
      addBtn.disabled = false

   }

}
