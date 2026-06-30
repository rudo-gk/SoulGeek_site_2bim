//TEM QUE FAZER MUDANÇAS
//NÃO ESTÁ FINALIZADO, MAS ESTÁ FUNCIONANDO

//Séries
let filmes = [];

async function carregarFilmes() {
  try {
    const nomeFilme = document.getElementById("campoBusca").value.trim();
    if (nomeFilme === "") {
      const section = document.getElementById("resultados");
      section.innerHTML = "";
      const p = document.createElement("p");
      p.innerText = "Por favor, digite o nome de um filme.";
      p.className = "fs-3 fw-bold text-center mt-5 text-secondary";
      section.appendChild(p);
      return;
    }
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = "Carregando filmes...";
    p.className = "fs-3 fw-bold text-center mt-5 text-secondary";
    section.appendChild(p);
    const resposta = await fetch(
      `http://www.omdbapi.com/?s=${nomeFilme}&apikey=11b03a97`,
    );
    filmes = await resposta.json();
    mostrarNaTela(filmes.Search);
  } catch (erro) {
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = erro;
    p.className = "text-danger fs-3 fw-bold text-center mt-3";
    section.appendChild(p);
  }
}
function mostrarNaTela(filmes) {
  const section = document.getElementById("resultados");
  section.innerHTML = "";

  if (filmes.length === 0) {
    const h3 = document.createElement("h3");
    h3.innerText = "Nenhuma Filme encontrado";
    h3.className = "fw-bold text-center mt-5 text-secondary";
    section.appendChild(h3);
    return;
  }

  filmes.forEach((filme) => {
    const cartao = document.createElement("div");
    cartao.className = "col-6 col-md-4 col-lg-2";

    const a = document.createElement("a");
    a.addEventListener("click", () => {
      localStorage.setItem("FilmeSelecionado", filme.imdbID);
    });
    a.href = `mediaFilme.html`;
    a.className = "media-card";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid";

    const titulo = document.createElement("div");
    titulo.innerText = filme.Title;
    titulo.className = "media-title";

    if (filme.Poster == "N/A") {
      const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
    } else {
      imagem.src = filme.Poster;
      a.appendChild(imagem);
      a.appendChild(titulo);
    }

    cartao.appendChild(a);
    section.appendChild(cartao);
  });
}
