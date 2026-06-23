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
    imagem.src = serie.show.image.medium;
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
}

const btnSalvarNota = document.getElementById("btnSalvarNota");

btnSalvarNota.addEventListener("click", () => {
    const nota = document.getElementById("notaUsuario").value;
    console.log(serieAtual.show.id);
    console.log(nota);
});

buscarSerie();
