//TEM QUE FAZER MUDANÇAS
//NÃO ESTÁ FINALIZADO, MAS ESTÁ FUNCIONANDO

//Séries
let series = [];

async function carregarSeries() {
  try {
    const nomeSerie = document.getElementById("campoBusca").value.trim();
    if (nomeSerie === "") {
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
    p.innerText = "Carregando séries...";
    p.className = "fs-3 fw-bold text-center mt-5 text-secondary";
    section.appendChild(p);
    const resposta = await fetch(
      `https://api.tvmaze.com/search/shows?q=${nomeSerie}`,
    );
    series = await resposta.json();
    mostrarNaTela(series);
  } catch (erro) {
    const section = document.getElementById("resultados");
    section.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = erro;
    p.className = "text-danger fs-3 fw-bold text-center mt-3";
    section.appendChild(p);
  }
}
function mostrarNaTela(series) {
  const section = document.getElementById("resultados");
  section.innerHTML = "";

  if (series.length === 0) {
    const h3 = document.createElement("h3");
    h3.innerText = "Nenhuma Série encontrada";
    h3.className = "fw-bold text-center mt-5 text-secondary";
    section.appendChild(h3);
    return;
  }

  series.forEach((serie) => {
    const cartao = document.createElement("div");
    cartao.className = "col-6 col-md-4 col-lg-2";

    const a = document.createElement("a");
    a.addEventListener("click", () => {
      localStorage.setItem("serieSelecionada", serie.show.name);
    });
    a.href = `media.html`;
    a.className = "media-card";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid";

    const titulo = document.createElement("div");
    titulo.innerText = serie.show.name;
    titulo.className = "media-title";

    if (serie.show.image == null) {
      const semImagem = document.createElement("img");
      semImagem.className = "img-fluid";
      semImagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
      a.appendChild(semImagem);
      titulo.className = "media-title";
      titulo.style.opacity = "1";
      a.appendChild(titulo);
    } else {
      imagem.src = serie.show.image.original;
      a.appendChild(imagem);
      a.appendChild(titulo);
    }

    cartao.appendChild(a);
    section.appendChild(cartao);
  });
}
