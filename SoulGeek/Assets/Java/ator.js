
let atores = [];

async function carregarAtor() {
  try {
    const nomeAtor = document.getElementById("campoBusca").value.trim();
    if (nomeAtor === "") {
      const section = document.getElementById("resultados");
      section.innerHTML = "";
      const p = document.createElement("p");
      p.innerText = "Por favor, digite o nome de uma série.";
      p.className = "fs-3 fw-bold text-center mt-5 text-secondary";
      section.appendChild(p);
      return;
    }
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = "Carregando atores...";
    p.className = "fs-3 fw-bold text-center mt-5 text-secondary";
    section.appendChild(p);
    const resposta = await fetch(
      `https://api.tvmaze.com/people?q=${nomeAtor}`,
    );
    atores = await resposta.json();
    atores = atores.filter(ator => ator.name.toLowerCase().includes(nomeAtor.toLowerCase()));
    mostrarNaTela(atores);
  } catch (erro) {
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = erro;
    p.className = "text-danger fs-3 fw-bold text-center mt-3";
    section.appendChild(p);
  }
}
function mostrarNaTela(atores) {
  const section = document.getElementById("resultados");
  section.innerHTML = "";

  if (atores.length === 0) {
    const h3 = document.createElement("h3");
    h3.innerText = "Nenhuma Série encontrada";
    h3.className = "fw-bold text-center mt-5 text-secondary";
    section.appendChild(h3);
    return;
  }

  atores.forEach((ator) => {
    const cartao = document.createElement("div");
    cartao.className = "col-6 col-md-4 col-lg-2";

    const a = document.createElement("a");
    a.addEventListener("click", () => {
      localStorage.setItem("atorSelecionado", ator.name);
      carregarSerie(ator.id);
    });

    a.className = "media-card";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid";

    const titulo = document.createElement("div");
    titulo.innerText = ator.name;
    titulo.className = "media-title";

    if (ator.image == null) {
      const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
    } else {
      imagem.src = ator.image.medium;
      a.appendChild(imagem);
      a.appendChild(titulo);
    }

    cartao.appendChild(a);
    section.appendChild(cartao);
  });
}

async function carregarSerie(id){
    try {
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = "Carregando séries...";
    p.className = "fs-3 fw-bold text-center mt-5 text-secondary";
    section.appendChild(p);
    const resposta = await fetch(
      `https://api.tvmaze.com/people/${id}/castcredits?embed=show`,
    );
    let series = await resposta.json();
    mostrarSeriesDoAtor(series)
  } catch (erro) {
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = erro;
    p.className = "text-danger fs-3 fw-bold text-center mt-3";
    section.appendChild(p);
  }
}

function mostrarSeriesDoAtor(serie) {
  const section = document.getElementById("resultados");
  section.innerHTML = "";

  if (serie.length === 0) {
    const h3 = document.createElement("h3");
    h3.innerText = "Nenhuma Série encontrada";
    h3.className = "fw-bold text-center mt-5 text-secondary";
    section.appendChild(h3);
    return;
  }

  serie.forEach((serie) => {
    const cartao = document.createElement("div");
    cartao.className = "col-6 col-md-4 col-lg-2";

    const a = document.createElement("a");
    a.addEventListener("click", () => {
      localStorage.setItem("serieSelecionada", serie._embedded.show.name);
    });
    a.href = `media.html`;
    a.className = "media-card";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid";

    const titulo = document.createElement("div");
    const show = serie._embedded.show;
    titulo.innerText = show.name;
    titulo.className = "media-title";

    if (serie._embedded.show.image == null) {
      const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
    } else {
      imagem.src = serie._embedded.show.image.original;
      a.appendChild(imagem);
      a.appendChild(titulo);
    }

    cartao.appendChild(a);
    section.appendChild(cartao);
  });
}
