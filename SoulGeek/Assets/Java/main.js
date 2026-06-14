
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (usuarioLogado !== null) {
  mostrarPerfil(usuarioLogado);
}

const elLogin = document.getElementById("Login");
const elSignIn = document.getElementById("SignIn");



if (elLogin && elSignIn) {
    const modalLogin = new bootstrap.Modal(elLogin);
    const modalCadastro = new bootstrap.Modal(elSignIn);

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

    // Cadastro de usuário
    document.getElementById("btnCadastro").addEventListener("click", () => {
        const nome = document.getElementById("cadastroNome").value;
        const email = document.getElementById("cadastroEmail").value.toLowerCase();
        const senha = document.getElementById("cadastroSenha").value;
        const confirmacaoSenha = document.getElementById("cadastroConfirmacaoSenha").value;
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        if (usuarios === null) { usuarios = []; }

        if (!nome || !email || !senha || !confirmacaoSenha) {
            alert("Preencha todos os campos."); return;
        } else if (senha !== confirmacaoSenha) {
            alert("As senhas não coincidem."); return;
        } else if (senha.length < 6) {
            alert("A senha deve conter pelo menos 6 caracteres."); return;
        } else if (!document.getElementById("cadastroEmail").checkValidity()) {
            alert("Digite um email válido."); return;
        }

        for (const usuario of usuarios) {
            if (usuario.email === email) { alert("Email já cadastrado."); return; }
            else if (usuario.nome.toLowerCase() === nome.toLowerCase()) { alert("Nome de usuário já cadastrado."); return; }
        }

        const novoUsuario = { nome, email, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
        mostrarPerfil(novoUsuario);
        alert("Conta criada com sucesso!");
        modalCadastro.hide();
    });

    // Login de usuário
    document.getElementById("btnLogin").addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.toLowerCase();
        const senha = document.getElementById("loginSenha").value;
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        if (usuarios === null) { alert("Nenhum usuário cadastrado."); return; }

        for (const usuario of usuarios) {
            if (usuario.email === email && usuario.senha === senha) {
                const logado = { nome: usuario.nome, email: usuario.email };
                localStorage.setItem("usuarioLogado", JSON.stringify(logado));
                mostrarPerfil(logado);
                alert("Login realizado com sucesso!");
                modalLogin.hide();
                return;
            }
        }
        alert("Email ou senha incorretos.");
    });
}

function mostrarPerfil(usuarioLogado) {
  document.getElementById("areaUsuario").innerHTML = `
    <button id="btnExcluir" class="btn btn-outline-danger d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#ExcluirModal">
        <i class="bi bi-trash"></i>
        Excluir Conta
    </button> 
    <div class="modal fade" id="ExcluirModal" tabindex="-1" aria-labelledby="ExcluirModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ExcluirModalLabel">Excluir Conta</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Você tem certeza que deseja excluir sua conta? Esta ação é irreversível.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" onclick="excluirConta()">Excluir Conta</button>
      </div>
    </div>
  </div>
</div>       
  
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
function excluirConta() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarioLogado.email === usuarios[i].email) {
      usuarios.splice(i, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Conta excluída com sucesso.");
      location.reload();
      return;
    }
  }
}

// ===== TEMA CLARO/ESCURO =====
const checkbox = document.getElementById('btnClaroEscuro');

// Quando a página carrega, aplica o tema salvo
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    checkbox.checked = false;
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    checkbox.checked = true;
}

// Quando o botão é clicado, alterna o tema
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('tema', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('tema', 'dark');
    }
});
