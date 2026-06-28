usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const perfilDeslogado = document.getElementById("perfilDeslogado");
const perfilLogado = document.getElementById("perfilLogado");
if (usuarioLogado === null) {
    perfilDeslogado.style.display = "block";
    perfilLogado.style.display = "none";
} else {
    perfilDeslogado.style.display = "none";
    perfilLogado.style.display = "block";
}
if(usuarioLogado){
const qtdCurtido = usuarioLogado.curtidos.length;
const qtdCurtidos = document.getElementById("qtdCurtidos");
qtdCurtidos.innerHTML = qtdCurtido;

const Watchlist = usuarioLogado.watchlist.length;
const qtdWatchlist = document.getElementById("qtdWatchlist");
qtdWatchlist.innerHTML = Watchlist;

const qtdNota = usuarioLogado.notas;
const notas = Object.values(qtdNota);
const id = Object.keys(qtdNota);
let s = 0;
let c = 0;
let media
for(let i = 0; i < notas.length; i++){
    s+=Number(notas[i]);
    c+=1;
}
if(c!== 0){
media = s/c;
}
else{
    media = "Sem avaliações"
}
const qtdNotas = document.getElementById("qtdNotas");
qtdNotas.innerHTML = media;

async function carregarCurtidos() {
    const section = document.getElementById("listaCurtidos");
    
    for (let i = 0; i < usuarioLogado.curtidos.length; i++) {
        
        const serie = await buscarSerie(usuarioLogado.curtidos[i]);
        
        const cartao = document.createElement("div");
        cartao.className = "col-6 col-md-4 col-lg-2";

        const a = document.createElement("a");
        a.href = "media.html";
        a.className = "media-card";

        const imagem = document.createElement("img");
        imagem.className = "img-fluid";

        const titulo = document.createElement("div");
        titulo.className = "media-title";
        titulo.innerText = serie.name;

        if(serie.image == null) { const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
        } else {
            imagem.src = serie.image.medium;
            a.appendChild(imagem);
            a.appendChild(titulo);
        }

        cartao.appendChild(a);
        section.appendChild(cartao);
    }
    
}

async function carregarWatchlist() {
    const section = document.getElementById("listaWatchlist");
    
    for (let i = 0; i < usuarioLogado.watchlist.length; i++) {
        
        const serie = await buscarSerie(usuarioLogado.watchlist[i]);
        
        const cartao = document.createElement("div");
        cartao.className = "col-6 col-md-4 col-lg-2";

        const a = document.createElement("a");
        a.href = "media.html";
        a.className = "media-card";

        const imagem = document.createElement("img");
        imagem.className = "img-fluid";

        const titulo = document.createElement("div");
        titulo.className = "media-title";
        titulo.innerText = serie.name;

        if(serie.image == null) { const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
        } else {
            imagem.src = serie.image.medium;
            a.appendChild(imagem);
            a.appendChild(titulo);
        }

        cartao.appendChild(a);
        section.appendChild(cartao);
    }
    
}

async function carregarAvaliados() {
    const section = document.getElementById("listaAvaliados");
    
    for (let i = 0; i < id.length; i++) {
        
        const serie = await buscarSerie(id[i]);
        
        const cartao = document.createElement("div");
        cartao.className = "col-6 col-md-4 col-lg-2";

        const a = document.createElement("a");
        a.href = "media.html";
        a.className = "media-card";

        const imagem = document.createElement("img");
        imagem.className = "img-fluid";

        const titulo = document.createElement("div");
        titulo.className = "media-title";
        titulo.innerText = serie.name;

        const nota = document.createElement("div");
nota.innerText = 'Nota: ' + notas[i];
nota.className = "text-center";


        if(serie.image == null) { const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
        } else {
            imagem.src = serie.image.medium;
            a.appendChild(imagem);
            a.appendChild(titulo);
        }

        cartao.appendChild(a);
        cartao.appendChild(nota);
        section.appendChild(cartao);
    }
    
}

async function buscarSerie(id) {
    const resposta = await fetch("https://api.tvmaze.com/shows/" + id);
    const dados = await resposta.json();
    return dados;
}
carregarWatchlist();
carregarCurtidos();
carregarAvaliados();
}
