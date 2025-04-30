// Parte degli upvote e downvote


const pulsantiUpvote = document.querySelectorAll('.upvote');
const pulsantiDownvote = document.querySelectorAll('.downvote');

for(const pulsanteUpvote of pulsantiUpvote)
{
  pulsanteUpvote.addEventListener('click',Upvote);
}

for(const pulsanteDownvote of pulsantiDownvote)
{
  pulsanteDownvote.addEventListener('click',Downvote);
}


function Upvote(event)
{
  const pulsante = event.currentTarget;
  const votiContainer = pulsante.parentNode // siamo su post-voto
  const contatore = votiContainer.querySelector('.contatore-voto');
  const pulsanteDownvote = votiContainer.querySelector('.downvote');
  const VotiCorrenti = parseInt(contatore.textContent);


  if(pulsante.classList.contains('votato'))
  {
    pulsante.classList.remove('votato');
    contatore.textContent = VotiCorrenti - 1;
  }
  else
  {
    if(pulsanteDownvote.classList.contains('votato'))
    {
      pulsanteDownvote.classList.remove('votato');
      contatore.textContent = VotiCorrenti + 2;
    }
    else
    {
      contatore.textContent = VotiCorrenti + 1;
    }
    pulsante.classList.add('votato');
  }
}



function Downvote(event)
{
  const pulsante = event.currentTarget;
  const votiContainer = pulsante.parentNode // siamo su post-voto
  const contatore = votiContainer.querySelector('.contatore-voto');
  const pulsanteUpvote = votiContainer.querySelector('.upvote');
  const VotiCorrenti = parseInt(contatore.textContent);


  if(pulsante.classList.contains('votato'))
  {
    pulsante.classList.remove('votato');
    contatore.textContent = VotiCorrenti + 1;
  }
  else
  {
    if(pulsanteUpvote.classList.contains('votato'))
    {
      pulsanteUpvote.classList.remove('votato');
      contatore.textContent = VotiCorrenti - 2;
    }
    else
    {
      contatore.textContent = VotiCorrenti - 1;
    }
    pulsante.classList.add('votato');
  }
}


// Parte per nascondere i commenti


const pulsantiNascondi = document.querySelectorAll('.toggle-commenti');
for (const pulsante of pulsantiNascondi) {
  pulsante.addEventListener("click", nascondiCommenti);
}

function nascondiCommenti(event) {
  const pulsante = event.currentTarget;
  const toggleContainer = pulsante.parentNode;
  const post = toggleContainer.parentNode;
  const commentiContainer = post.querySelector('.sezione-commenti');
  
  if (commentiContainer.classList.contains('nascosto')) 
  {
    commentiContainer.classList.remove('nascosto');
    pulsante.textContent = 'Nascondi commenti';
    pulsante.classList.remove('collapsed');
  } 
  else 
  {
    commentiContainer.classList.add('nascosto');
    pulsante.textContent = 'Mostra commenti';
    pulsante.classList.add('collapsed');
  }
}


// Parte per il tema chiaro/scuro


const tema = document.querySelector("#tema-toggle");

tema.addEventListener('click', cambioTema);

function cambioTema() {
  
  if (document.body.classList.contains('tema-chiaro')) 
  {
    document.body.classList.remove('tema-chiaro');
    tema.querySelector('.icona-tema').textContent = '☀️';
  } 
  else 
  {
    document.body.classList.add('tema-chiaro');
    tema.querySelector('.icona-tema').textContent = '🌙';
  }
}



// Cambio immagine in modo dinamico


const immagineCommento = document.querySelectorAll('.immagine-commento-cambiata');

for (const immagine of immagineCommento) {
  immagine.addEventListener('click', cambioImmagine);
  immagine.dataset.originale = immagine.src;
}

function cambioImmagine(event) {
  const immagine = event.currentTarget;

  
  if (immagine.classList.contains('alterata')) 
  {
    immagine.src = immagine.dataset.originale;
    immagine.classList.remove('alterata');
    immagine.alt = "Reddit";
  } 
  else 
  {
    immagine.src = "https://img.ai4business.it/wp-content/uploads/2023/12/06192701/Gemini.jpg";
    immagine.classList.add('alterata');
    immagine.alt = "Gemini";
  }
}



// Parte invia commento

const pulsanteInviaCommento = document.querySelectorAll('.pulsante_invia-commento');

for (const pulsante of pulsanteInviaCommento)
{
  pulsante.addEventListener('click', inviaCommento);
}

function inviaCommento(event)
{
  const pulsante = event.currentTarget;
  const sezioneVoti = pulsante.parentNode; // siamo su commento-sezione_voti
  const aggiungiCommento = sezioneVoti.parentNode; // siamo su aggiungi-commento
  const postFooter = aggiungiCommento.parentNode; // siamo su post-footer
  const sezioneCommenti = postFooter.parentNode; // siamo su sezione-commenti

  const testoCommento = aggiungiCommento.querySelector('.inserisci-commento');
  const textArea = testoCommento.value;

  if(textArea === '')
  {
    alert('Non puoi inviare un commento vuoto!');
    return;
  }

  const nuovoCommento = document.createElement('div');
  nuovoCommento.classList.add('commento');

  nuovoCommento.innerHTML = `
    <div class="commento-contenuto">
      <div class="header-commenti">
        <div class="avatar-commento">
          <img src="reddit-logo.png" alt="Avatar utente">
        </div>
        <div class="commenti-info">
          <h3 class="autore-commento">Tu</h3>
          <p class="testo-commento"></p>
        </div>
      </div>
    </div>
  `

  nuovoCommento.querySelector(".testo-commento").textContent = textArea;
  
  sezioneCommenti.appendChild(nuovoCommento);
  sezioneCommenti.appendChild(postFooter);

  testoCommento.value = '';
}



// Immagine modale

const immaginiPost = document.querySelectorAll('.immagine-post');
const modale = document.querySelector('#immagine-modale');
const immagineModale = document.querySelector('#img-modale');
const didascaliaModale = document.querySelector('.didascalia-modale');
const chiudiBtn = document.querySelector('.chiudi-modale');

for (const immagine of immaginiPost) {
  immagine.addEventListener('click', apriModale);
}

chiudiBtn.addEventListener('click', chiudiModale);


modale.addEventListener('click', chiudiModaleClick);
document.addEventListener('keydown', chiudiModaleEsc);

function chiudiModaleClick(event) {
  if (event.target === modale) {
    chiudiModale();
  }
}

function chiudiModaleEsc(event) {
  if (event.key === 'Escape') {
    chiudiModale();
  }
}

function apriModale(event) {
  const immagine = event.currentTarget;
  
  modale.classList.remove('nascosto');
  
  immagineModale.src = immagine.src;
  
  const post = immagine.parentNode.parentNode; // cosi andiamo in corpo-post e poi post
  const titoloPost = post.querySelector('.titolo-post');

  if(titoloPost)
    {
      didascaliaModale.textContent = titoloPost.textContent;
    }
    else
    {
      didascaliaModale.textContent = immagine.alt;
    }
  
  document.body.classList.add('no-scroll');
}

function chiudiModale() {
  modale.classList.add('nascosto');
  document.body.classList.remove('no-scroll');
}





// Menu mobile




const pulsanteMenuMobile = document.querySelector('.pulsante-menu-mobile');
const dropdownMenu = document.querySelector('.dropdown-menu');
const menuMobileContainer = document.querySelector('.menu-mobile-container');

pulsanteMenuMobile.addEventListener('click', toggleMenu);

function toggleMenu() {
  if(dropdownMenu.classList.contains('nascosto')) {
    dropdownMenu.classList.remove('nascosto');
  }
  else {
    dropdownMenu.classList.add('nascosto');
  }
}


document.addEventListener('click',cliccatoFuori);



function cliccatoFuori(event)
{
  if(!menuMobileContainer.contains(event.target))
  {
    dropdownMenu.classList.add('nascosto');
  }
}















// Parte API Reddit OAuth 2.0





function mostraRedditPost(postsData)
{
  const sezioneMain = document.querySelector(".sezione-main");
  let num_postsData = postsData.length;
  for(let i = 0; i < num_postsData; i++)
  {
    const postData = postsData[i].data;

    const post = document.createElement("article");
    post.className = "post";

    // Header
    const headerPost = document.createElement("div");
    headerPost.className = "header-post";
    headerPost.innerHTML = `
      <div class="post-info">
        <h3 class="titolo-post"></h3>
        <div class="user-info">
          <p class="utente-post"></p>
        </div>
      </div>
      <div class="subreddit-container">
        <div class="avatar-subreddit"><img alt="logo" /></div>
        <a class="pulsante-subreddit"></a>
      </div>
    `;
    headerPost.querySelector(".titolo-post").textContent = postData.title;
    headerPost.querySelector(".utente-post").textContent = "Posted by " + postData.author;
    const avatarImg = headerPost.querySelector("img");
    avatarImg.src = postData.subreddit + ".png";
    avatarImg.onerror = gestisciErroreImmagine;
    headerPost.querySelector(".pulsante-subreddit").textContent = "r/" + postData.subreddit;

    post.appendChild(headerPost);

    // Corpo del post
    const corpoPost = document.createElement("div");
    corpoPost.className = "corpo-post";

    if (postData.selftext) {
      const testo = document.createElement("p");
      testo.textContent = postData.selftext;
      corpoPost.appendChild(testo);
    }

    if (postData.url?.match(/\.(jpeg|jpg|gif|png)$/)) {
      const img = document.createElement("img");
      img.src = postData.url;
      img.alt = postData.title;
      img.className = "immagine-post";
      corpoPost.appendChild(img);
    } else if (postData.url && !postData.selftext) {
      const divLink = document.createElement("div");
      divLink.className = "post-link";
      divLink.innerHTML = `
        <a class="btn-esterno" target="_blank" rel="noopener noreferrer">
          <span class="icona-link">🔗</span>
          <span> Apri contenuto esterno</span>
        </a>
      `;
      divLink.querySelector("a").href = postData.url;
      corpoPost.appendChild(divLink);
    }

    post.appendChild(corpoPost);

    // Toggle commenti
    const toggle = document.createElement("div");
    toggle.className = "toggle-container";
    toggle.innerHTML = `<button class="toggle-commenti">Mostra commenti</button>`;
    post.appendChild(toggle);

    // Voti
    const voti = document.createElement("div");
    voti.className = "post-voto";
    voti.innerHTML = `
      <button class="pulsante-voto upvote">↑</button>
      <span class="contatore-voto"></span>
      <button class="pulsante-voto downvote">↓</button>
    `;
    voti.querySelector(".contatore-voto").textContent = postData.score;
    post.appendChild(voti);

    // Commenti
    const sezioneCommenti = document.createElement("div");
    sezioneCommenti.className = "sezione-commenti nascosto";
    sezioneCommenti.innerHTML = `
      <h4 class="titolo-commenti">Commenti</h4>
      <div class="commento">
        <div class="commento-contenuto">
          <div class="header-commenti">
            <div class="avatar-commento">
              <img src="reddit-logo.png" alt="Avatar utente" />
            </div>
            <div class="commenti-info">
              <h3 class="autore-commento">BotModeratore</h3>
              <p class="testo-commento">Scrivi quello che vuoi ma con moderazione</p>
            </div>
          </div>
        </div>
      </div>
      <div class="post-footer">
        <div class="aggiungi-commento">
          <div class="inserisci-commento-container">
            <textarea class="inserisci-commento" placeholder="Scrivi un commento..."></textarea>
          </div>
          <div class="commento-sezione_voti">
            <button class="pulsante_invia-commento">Invia Commento</button>
            <button class="pulsante_genera-ai">🤖 Genera commento AI</button>
          </div>
        </div>
      </div>
    `;

    post.appendChild(sezioneCommenti);


    sezioneMain.appendChild(post);

    const nuovoPulsanteUpvote = post.querySelector('.upvote');
    nuovoPulsanteUpvote.addEventListener('click', Upvote);
    
    const nuovoPulsanteDownvote = post.querySelector('.downvote');
    nuovoPulsanteDownvote.addEventListener('click', Downvote);
    
    const nuovaImmagine = post.querySelector('.immagine-post');
    if (nuovaImmagine) {
      nuovaImmagine.addEventListener('click', apriModale);
    }
    
    const nuovoToggle = post.querySelector('.toggle-commenti');
    if (nuovoToggle) {
      nuovoToggle.addEventListener('click', nascondiCommenti);
    }

    const NuovoPulsanteInviaCommento = post.querySelectorAll('.pulsante_invia-commento');
    for(const NuovoPulsante of NuovoPulsanteInviaCommento)
    {
      NuovoPulsante.addEventListener("click",inviaCommento);
    }

    const NuovipulsantiGeneraAI = post.querySelectorAll('.pulsante_genera-ai');
    for(const NuovopulsanteGeneraAI of NuovipulsantiGeneraAI)
    {
      NuovopulsanteGeneraAI.addEventListener('click',fetchGeneraCommentoAI)
    }

  }
}

function gestisciErroreImmagine() {
  this.src = 'reddit-logo.png';
}







function onRedditJson(json) 
{
  console.log("JSON Reddit ricevuto");

  const postsData = json.data.children;
  mostraRedditPost(postsData);
}




function onRedditResponse(response) 
{
  return response.json();
}




function fetchRedditPost(event) 
{
  event.preventDefault();
  const subreddit = event.currentTarget.dataset.subreddit;
  console.log("Recupero post da: r/" + subreddit);

  const randomParam = Date.now();
  
  fetch('https://oauth.reddit.com/r/' + subreddit + '/hot?limit=10&random=' + randomParam, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(onRedditResponse).then(onRedditJson);
}



// token reddit




function onTokenJson(json)
{
  token = json.access_token;
  console.log("Token ottenuto con successo!");
}



function onTokenResponse(response)
{
  return response.json();
}



const client_id = 'secret';
const client_secret = 'secret';

let token;

/*fetch("https://www.reddit.com/api/v1/access_token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);*/






const gamingLink = document.querySelector('.gaming-link a');
const sportLink = document.querySelector('.link-sport a');
const animeLink = document.querySelector('.link-anime a');
const filmLink = document.querySelector('.link-film_e_serie a');
const musicaLink = document.querySelector('.link-musica a');
const scienzeLink = document.querySelector('.link-scienze a');



gamingLink.addEventListener('click', fetchRedditPost);
sportLink.addEventListener('click', fetchRedditPost);
animeLink.addEventListener('click', fetchRedditPost);
filmLink.addEventListener('click', fetchRedditPost);
musicaLink.addEventListener('click', fetchRedditPost);
scienzeLink.addEventListener('click', fetchRedditPost);









// Parte API Google Gemini API (con key)








function mostraCommentoGenerato(rispostaAI, pulsante) 
{
  const textareaId = pulsante.dataset.textarea;
  const textarea = document.getElementById(textareaId);
  
  textarea.value = rispostaAI;
  
  pulsante.textContent = '🤖 Genera commento AI';
  pulsante.disabled = false;
}



function onGeminiJson(json) 
{
  console.log("JSON ricevuto");
  return json.candidates[0].content.parts[0].text;
}



function onGeminiResponse(response) 
{
  console.log("Richiesta ricevuta");
  return response.json();
}



function fetchGeneraCommentoAI(event) 
{
  event.preventDefault();
  
  const pulsante = event.currentTarget;
  const commentoSezioneVoti = pulsante.parentNode; // siamo su commento-sezione_voti
  const aggiungiCommento = commentoSezioneVoti.parentNode; // siamo su aggiungiCommento
  const textarea = aggiungiCommento.querySelector(".inserisci-commento");
  const post = pulsante.closest('.post');
  const titolo = post.querySelector('.titolo-post')?.textContent || "questo post";
  
  pulsante.textContent = '⏳ Generando...';
  pulsante.disabled = true;
  
  pulsante.dataset.textarea = textarea.id || "textarea-" + Date.now();
  if (!textarea.id) textarea.id = pulsante.dataset.textarea;
  
  fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + api_key, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: "Genera un commento breve e pertinente per un post di Reddit intitolato \"" + titolo + "\". Il commento deve essere informale, cordiale e non più lungo di 2 frasi."
        }]
      }]
    })
  })
  .then(onGeminiResponse).then(onGeminiJson).then(rispostaAI => mostraCommentoGenerato(rispostaAI, pulsante))
}


const api_key = 'secret';


const pulsantiGeneraAI = document.querySelectorAll('.pulsante_genera-ai');
for(const pulsanteGeneraAI of pulsantiGeneraAI)
{
  pulsanteGeneraAI.addEventListener('click',fetchGeneraCommentoAI)
}