// TROCA ENTRE MODAIS

const modalLogin = new bootstrap.Modal(document.getElementById("Login"));

const modalCadastro = new bootstrap.Modal(document.getElementById("SignIn"));

document.getElementById("abrirCadastro").addEventListener("click", (e) => {
  e.preventDefault();
  modalLogin.hide();
  modalCadastro.show();
});

document.getElementById("abrirLogin").addEventListener("click", (e) => {
  e.preventDefault();
  modalCadastro.hide();
  modalLogin.show();
});

//Cadastro de usuário
document.getElementById("btnCadastro").addEventListener("click", () => {
  const nome = document.getElementById("cadastroNome").value;
  const email = document.getElementById("cadastroEmail").value.toLowerCase();
  const senha = document.getElementById("cadastroSenha").value;
  const confirmacaoSenha = document.getElementById(
    "cadastroConfirmacaoSenha",
  ).value;
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios === null) {
    usuarios = [];
  }
  if (!nome || !email || !senha || !confirmacaoSenha) {
    alert("Preencha todos os campos.");
    return;
  } else if (senha !== confirmacaoSenha) {
    alert("As senhas não coincidem.");
    return;
  } else if (senha.length < 6) {
    alert("A senha deve conter pelo menos 6 caracteres.");
    return;
  } else if (!document.getElementById("cadastroEmail").checkValidity()) {
    alert("Digite um email válido.");
    return;
  }

  for (const usuario of usuarios) {
    if (usuario.email === email) {
      alert("Email já cadastrado.");
      return;
    } else if (usuario.nome.toLowerCase() === nome.toLowerCase()) {
      alert("Nome de usuário já cadastrado.");
      return;
    }
    if (usuario == null) {
      break;
    }
  }

  const usuarioLogado = {
    nome: nome,
    email: email,
    senha: senha,
  };

  usuarios.push(usuarioLogado);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  mostrarPerfil(usuarioLogado);
  alert("Conta criada com sucesso!");
  modalCadastro.hide();
});

// Login de usuário
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.toLowerCase();
  const senha = document.getElementById("loginSenha").value;
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios === null) {
    alert("Nenhum usuário cadastrado.");
    return;
  }

  for (const usuario of usuarios) {
    if (usuario.email === email && usuario.senha === senha) {
      let usuarioLogado = {
        nome: usuario.nome,
        email: usuario.email,
      };
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      mostrarPerfil(usuarioLogado);
      alert("Login realizado com sucesso!");
      modalLogin.hide();
      return;
    }
  }

  alert("Email ou senha incorretos.");
});

function mostrarPerfil(usuarioLogado) {
  document.getElementById("areaUsuario").innerHTML = `
        <button
            id="btnSair"
            class="btn btn-outline-light d-flex align-items-center gap-2"
            onclick="sair()"
        >
            <i class="bi bi-box-arrow-right"></i>
            Sair
        </button>
    
    <a
            href="../HTML/Pages/perfil.html"
            class="btn btn-outline-light d-flex align-items-center gap-2"
        >
            <i class="bi bi-person-circle"></i>
            ${usuarioLogado.nome}
        </a>
    `;
}

function sair() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (usuarioLogado !== null) {
  mostrarPerfil(usuarioLogado);
}
