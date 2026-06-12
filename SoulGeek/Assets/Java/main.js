// CADASTRO
document.getElementById("btnCadastro").addEventListener("click", () => {
  const campoEmail = document.getElementById("cadEmail");
  const usuario = {
    nome: document.getElementById("cadNome").value,
    email: document.getElementById("cadEmail").value,
    senha: document.getElementById("cadSenha").value,
  };
  if (!usuario.nome || !usuario.email || !usuario.senha) {
    alert("Preencha todos os campos.");
    return;
  }
  else if (usuario.senha.length < 6) {
    alert("A senha deve conter pelo menos 6 caracteres.");
    return;
  }
  else if (!campoEmail.checkValidity()) {
    alert("Digite um email válido.");
    return;
}


  localStorage.setItem("usuario", JSON.stringify(usuario));
  mostrarPerfil(usuario);

  alert("Conta criada com sucesso!");
  modalCadastro.hide();
});

// LOGIN
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;

  const senha = document.getElementById("loginSenha").value;

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if(!email || !senha){
    alert("Preencha email e senha.");
    return;
}

  if (usuario && email === usuario.email && senha === usuario.senha) {
    mostrarPerfil(usuario);
    alert("Login realizado com sucesso!");
    modalLogin.hide();
  } else {
    alert("Email ou senha incorretos.");
  }
});

// TROCA ENTRE MODAIS

const modalLogin = new bootstrap.Modal(document.getElementById("Login"));

const modalCadastro = new bootstrap.Modal(document.getElementById("SignIn"));

document.getElementById("abrirCadastro").addEventListener("click", (e) => {
  e.preventDefault();

  modalLogin.hide();

  setTimeout(() => {
    modalCadastro.show();
  });
});

document.getElementById("abrirLogin").addEventListener("click", (e) => {
  e.preventDefault();

  modalCadastro.hide();

  setTimeout(() => {
    modalLogin.show();
  });
});

function mostrarPerfil(usuario){

    document.getElementById("areaUsuario").innerHTML = `
        <a
            href="perfil.html"
            class="btn btn-outline-light d-flex align-items-center gap-2"
        >
            <i class="bi bi-person-circle"></i>
            ${usuario.nome}
        </a>
    `;

    document.getElementById("btnComecarAgora").style.display = "none";

}

const usuarioSalvo = JSON.parse(
  localStorage.getItem("usuario")
);

if (usuarioSalvo) {
  mostrarPerfil(usuarioSalvo);
}
