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
if (usuarioLogado) {
    const nome = document.getElementById("nomeUsuario");
    nome.innerHTML = usuarioLogado.nome;
    const email = document.getElementById("emailUsuario");
    email.innerHTML = usuarioLogado.email;

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
  let media;
  for (let i = 0; i < notas.length; i++) {
    s += Number(notas[i]);
    c += 1;
  }
  if (c !== 0) {
    media = s / c;
  } else {
    media = "Sem avaliações";
  }
  const qtdNotas = document.getElementById("qtdNotas");
  qtdNotas.innerHTML = media.toFixed(2);

  async function carregarCurtidos() {
    const section = document.getElementById("listaCurtidos");

    for (let i = 0; i < usuarioLogado.curtidos.length; i++) {
      let serie;
      let filme;
      let nome;
      let linkHref;
      let imagemSrc;

      if (String(usuarioLogado.curtidos[i]).startsWith("tt")) {
        filme = await buscarFilme(usuarioLogado.curtidos[i]);
        nome = filme.Title;
        linkHref = "mediaFilme.html";
        if (filme.Poster == "N/A") {
          imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        } else {
          imagemSrc = filme.Poster;
        }
      } else {
        serie = await buscarSerie(usuarioLogado.curtidos[i]);
        nome = serie.name;
        linkHref = "media.html";
        if (serie.image == null) {
          imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        } else {
          imagemSrc = serie.image.medium;
        }
      }
      const cartao = document.createElement("div");
      cartao.className = "col-6 col-md-4 col-lg-2";

      const a = document.createElement("a");
      a.href = linkHref;
      a.className = "media-card";
      a.addEventListener("click", () => {
    if (String(usuarioLogado.curtidos[i]).startsWith("tt")) {
        localStorage.setItem("FilmeSelecionado", filme.imdbID);
    } else {
        localStorage.setItem("serieSelecionada", nome);
    }
});

      const imagem = document.createElement("img");
      imagem.className = "img-fluid";

      const titulo = document.createElement("div");
      titulo.className = "media-title";
      titulo.innerText = nome;

      if (imagemSrc === "https://via.placeholder.com/210x295?text=Sem+Imagem") {
        const semImagem = document.createElement("img");
        semImagem.className = "img-fluid";
        semImagem.src = imagemSrc;
        a.appendChild(semImagem);
        titulo.className = "media-title";
        titulo.style.opacity = "1";
        a.appendChild(titulo);
      } else {
        imagem.src = imagemSrc;
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
      let serie;
      let filme;
      let nome;
      let linkHref;
      let imagemSrc;

      if (String(usuarioLogado.watchlist[i]).startsWith("tt")) {
        filme = await buscarFilme(usuarioLogado.watchlist[i]);
        nome = filme.Title;
        linkHref = "mediaFilme.html";
        if (filme.Poster == "N/A") {
          imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        } else {
          imagemSrc = filme.Poster;
        }
      } else {
        serie = await buscarSerie(usuarioLogado.watchlist[i]);
        nome = serie.name;
        linkHref = "media.html";
        if (serie.image == null) {
          imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        } else {
          imagemSrc = serie.image.medium;
        }
      }
      const cartao = document.createElement("div");
      cartao.className = "col-6 col-md-4 col-lg-2";

      const a = document.createElement("a");
      a.href = linkHref;
      a.className = "media-card";
      a.addEventListener("click", () => {
    if (String(usuarioLogado.watchlist[i]).startsWith("tt")) {
        localStorage.setItem("FilmeSelecionado", filme.imdbID);
    } else {
        localStorage.setItem("serieSelecionada", nome);
    }
});

      const imagem = document.createElement("img");
      imagem.className = "img-fluid";

      const titulo = document.createElement("div");
      titulo.className = "media-title";
      titulo.innerText = nome;

      if (imagemSrc === "https://via.placeholder.com/210x295?text=Sem+Imagem") {
        const semImagem = document.createElement("img");
        semImagem.className = "img-fluid";
        semImagem.src = imagemSrc;
        a.appendChild(semImagem);
        titulo.className = "media-title";
        titulo.style.opacity = "1";
        a.appendChild(titulo);
      } else {
        imagem.src = imagemSrc;
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
      let serie;
      let filme;
      let nome;
      let linkHref;
      let imagemSrc;

      if (String(id[i]).startsWith("tt")) {
        filme = await buscarFilme(id[i]);
        nome = filme.Title;
        linkHref = "mediaFilme.html";
        if (filme.Poster == "N/A") {
          imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        } else {
          imagemSrc = filme.Poster;
        }
      } else {
        serie = await buscarSerie(id[i]);
        nome = serie.name;
        linkHref = "media.html";
        if (serie.image == null) {
          imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        } else {
          imagemSrc = serie.image.medium;
        }
      }
      const cartao = document.createElement("div");
      cartao.className = "col-6 col-md-4 col-lg-2";

      const a = document.createElement("a");
      a.href = linkHref;
      a.className = "media-card";
      a.addEventListener("click", () => {
    if (String(id[i]).startsWith("tt")) {
        localStorage.setItem("FilmeSelecionado", filme.imdbID);
    } else {
        localStorage.setItem("serieSelecionada", nome);
    }
});

      const imagem = document.createElement("img");
      imagem.className = "img-fluid";

      const titulo = document.createElement("div");
      titulo.className = "media-title";
      titulo.innerText = nome;

      const nota = document.createElement("div");
nota.innerText = 'Nota: ' + notas[i];
nota.className = "text-center";

      if (imagemSrc === "https://via.placeholder.com/210x295?text=Sem+Imagem") {
        const semImagem = document.createElement("img");
        semImagem.className = "img-fluid";
        semImagem.src = imagemSrc;
        a.appendChild(semImagem);
        titulo.className = "media-title";
        titulo.style.opacity = "1";
        a.appendChild(titulo);
      } else {
        imagem.src = imagemSrc;
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

  async function buscarFilme(id) {
    const resposta = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=11b03a97`,
    );
    const dados = await resposta.json();
    return dados;
  }


const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");
btnSalvarEdicao.addEventListener("click", () => {
  const nome = document.getElementById("editarNome").value || usuarioLogado.nome;
  const email = document.getElementById("editarEmail").value.toLowerCase() || usuarioLogado.email;
  const senha = document.getElementById("editarSenha").value || usuarioLogado.senha;
  const confirmacaoSenha = document.getElementById(
    "editarConfirmacaoSenha",
  ).value || usuarioLogado.senha;
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios === null) {
    usuarios = [];
  }

    if (senha !== confirmacaoSenha) {
    alert("As senhas não coincidem.");
    return;
  } else if (senha.length < 6) {
    alert("A senha deve conter pelo menos 6 caracteres.");
    return;
  } else if (!document.getElementById("editarEmail").checkValidity()) {
    alert("Digite um email válido.");
    return;
  }

  for (const usuario of usuarios) {
    if (usuario.email === email && usuario.email !== usuarioLogado.email) {
      alert("Email já cadastrado.");
      return;
    } else if (usuario.nome.toLowerCase() === nome.toLowerCase() && usuario.nome !== usuarioLogado.nome) {
      alert("Nome de usuário já cadastrado.");
      return;
    }
  }
  const mensagem = `Confirmar alterações?\nNome: ${nome}\nEmail: ${email}\nSenha: ${senha}`;
const confirmado = confirm(mensagem);
if (!confirmado) return;

  

usuarioLogado.nome = nome;
usuarioLogado.senha = senha;

for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === usuarioLogado.email) {
        usuarios[i].nome = nome;
        usuarios[i].email = email;
usuarioLogado.email = email;
        usuarios[i].senha = senha;
        break;
    }
}
localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Conta atualizada com sucesso");
  const modalEl = document.getElementById("editarPerfilModal");
const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
modal.hide();
mostrarPerfil(usuarioLogado);
location.reload();
});




  carregarWatchlist();
  carregarCurtidos();
  carregarAvaliados();
}
