var deleteAllNotes = document.querySelector('.delete_all_notes')
var addnotes = document.querySelector('.addNotes')


function showAllNotes(){
  if(localStorage.getItem('localnotes')){
    JSON.parse(localStorage.getItem('localnotes')).forEach(prod=>{
      renderNotes(prod)
    })
  }
}

addnotes.addEventListener('click', function(){
  var uniqueID = 'note'+Math.floor(Math.random()*1000)
  let note ={
    content:  document.querySelector('.textInput').value,
    title : document.querySelector('.tittle_input').value,
    'uniqueID': uniqueID
  }
  addNoteToLocalStorage(note)
  renderNotes(note)
})

function addNoteToLocalStorage(note){
  if(localStorage.getItem('localnotes')){
    var local = JSON.parse(localStorage.getItem('localnotes'))
    local = [...local, note]
    localStorage.setItem('localnotes' , JSON.stringify(local))
    console.log('element added in existing storage')
  }
  else{
    localStorage.setItem('localnotes' , JSON.stringify([note]))
    console.log('element added in new storage')
  }
}
  
function renderNotes(note)
{
  var div = document.createElement('div')
  var h3 = document.createElement('h3')
  var p = document.createElement('p')
  var delnote = document.createElement('button')

  div.classList.add('note', note.uniqueID)
  h3.innerHTML = note.title ;
  p.innerHTML = note.content; 
  delnote.textContent = 'Delete Note'
  delnote.id = 'delete_note'

  div.appendChild(h3)
  div.appendChild(p)
  div.appendChild(delnote)

  document.querySelector('.notes').appendChild(div);
  document.querySelector('.textInput').value = ''
  document.querySelector('.tittle_input').value =''

  delnote.addEventListener('click', function(){
    console.log('cicked')
    document.querySelector('.'+note.uniqueID).remove()

    //remove element from local storage
    var temp_arr = JSON.parse(localStorage.getItem('localnotes')).filter(prod=>{
      if(prod.uniqueID !=note.uniqueID){
        return true
      }
    })

    localStorage.setItem('localnotes', JSON.stringify(temp_arr))
  })
}

deleteAllNotes.addEventListener('click', function(){

  document.querySelectorAll('.note').forEach(prod=>{
    prod.remove()
  })
  localStorage.clear()

})


showAllNotes()