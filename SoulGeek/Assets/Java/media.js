const serieSelecionada = localStorage.getItem("serieSelecionada");
async function buscarSerie() {
const resposta = await fetch(
      `https://api.tvmaze.com/search/shows?q=${serieSelecionada}`,
    );
const dados = await resposta.json();
const serie = dados[0];

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
}
else {
    descricao.innerHTML = serie.show.summary;
}

}
buscarSerie();

