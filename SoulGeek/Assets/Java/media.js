const serieSelecionada = localStorage.getItem("serieSelecionada");
let serieAtual;
async function buscarSerie() {
  const resposta = await fetch(
    `https://api.tvmaze.com/search/shows?q=${serieSelecionada}`,
  );
  const dados = await resposta.json();
  const serie = dados[0];
  serieAtual = serie;

  const titulo = document.getElementById("titulo");
  titulo.innerText = serie.show.name;

  const imagem = document.getElementById("imagem");
  if (serie.show.image == null) {
    imagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
  } else {
    imagem.src = serie.show.image.original;
  }
  const descricao = document.getElementById("descricao");
  if (serie.show.summary == null) {
    descricao.innerText = "Sem descrição disponível.";
  } else {
    descricao.innerHTML = serie.show.summary;
  }

  const genero = document.getElementById("generos");
  genero.innerHTML = serie.show.genres;

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const interacoesUsuario = document.getElementById("interacoesUsuario");
  if (usuarioLogado === null) {
    interacoesUsuario.style.display = "none";
  }
  const id = serieAtual.show.id;
  if (usuarioLogado.notas && usuarioLogado.notas[id]) {
    document.getElementById("notaUsuario").value = usuarioLogado.notas[id];
    document.getElementById("notaExibida").innerHTML =
      "Sua nota: " + usuarioLogado.notas[id] + "/5";
  }

  const btnLike = document.getElementById("btnLike");

  let jaCurtiu = false;

  for (let i = 0; i < usuarioLogado.curtidos.length; i++) {
    if (usuarioLogado.curtidos[i] === id) {
      jaCurtiu = true;
      break;
    }
  }

  if (jaCurtiu) {
    btnLike.classList.remove("btn-danger");
    btnLike.classList.add("btn-success");
    btnLike.innerHTML = '<i class="bi bi-heart-fill"></i> Curtido';
  }

  const btnWatchlist = document.getElementById("btnWatchlist");

  let jaAssistiu = false;

  for (let i = 0; i < usuarioLogado.watchlist.length; i++) {
    if (usuarioLogado.watchlist[i] === id) {
      jaAssistiu = true;
      break;
    }
  }

  if (jaAssistiu) {
    btnWatchlist.classList.remove("btn-warning");
    btnWatchlist.classList.add("btn-success");
    btnWatchlist.innerHTML = '<i class="bi bi-clock-history"></i> Adicionado';
  }
}

const btnSalvarNota = document.getElementById("btnSalvarNota");

btnSalvarNota.addEventListener("click", () => {
  const nota = document.getElementById("notaUsuario").value;
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const id = serieAtual.show.id;
  usuarioLogado.notas[id] = nota;
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === usuarioLogado.email) {
      usuarios[i].notas[id] = nota;
      break;
    }
  }
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  location.reload();
});

const btnLike = document.getElementById("btnLike");

btnLike.addEventListener("click", () => {
  const id = serieAtual.show.id;
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  let jaCurtiu = false;

  for (let i = 0; i < usuarioLogado.curtidos.length; i++) {
    if (usuarioLogado.curtidos[i] === id) {
      jaCurtiu = true;
      usuarioLogado.curtidos.splice(i, 1); // remove
      location.reload();
      break;
    }
  }

  if (jaCurtiu === false) {
    usuarioLogado.curtidos.push(id); // adiciona
  }
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === usuarioLogado.email) {
      usuarios[i].curtidos = usuarioLogado.curtidos;
      location.reload();
      break;
    }
  }
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  console.log(usuarioLogado.curtidos);
});

const btnWatchlist = document.getElementById("btnWatchlist");
btnWatchlist.addEventListener("click", () => {
  const id = serieAtual.show.id;
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  let jaAssistiu = false;

  for (let i = 0; i < usuarioLogado.watchlist.length; i++) {
    if (usuarioLogado.watchlist[i] === id) {
      jaAssistiu = true;
      usuarioLogado.watchlist.splice(i, 1); // remove
      location.reload();
      break;
    }
  }

  if (jaAssistiu === false) {
    usuarioLogado.watchlist.push(id); // adiciona
  }

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === usuarioLogado.email) {
      usuarios[i].watchlist = usuarioLogado.watchlist;
      location.reload();
      break;
    }
  }
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  console.log(usuarioLogado.watchlist);
});

buscarSerie();
