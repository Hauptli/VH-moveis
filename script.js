document.addEventListener('DOMContentLoaded', () => {
  // === FORMULÁRIO WHATSAPP ===
  const telefoneInput = document.getElementById('telefone');
  const nomeInput = document.getElementById('nome');
  const servicoSelect = document.getElementById('servico');
  const mensagemTextarea = document.getElementById('mensagem');
  const btnEnviar = document.getElementById('enviarWhatsApp');

  // Formata o telefone no input enquanto digita, para padrão brasileiro
  telefoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 11); // Só números e máx. 11 dígitos

    if (val.length <= 2) {
      e.target.value = `(${val}`;
    } else if (val.length <= 6) {
      e.target.value = `(${val.substring(0, 2)}) ${val.substring(2)}`;
    } else if (val.length <= 10) {
      e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 6)}-${val.substring(6)}`;
    } else {
      e.target.value = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7)}`;
    }
  });

  // Bloqueia letras e símbolos no input do telefone
  telefoneInput.addEventListener('keypress', (e) => {
    const charCode = e.charCode || e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  });

  // Bloqueia colar texto que contenha letras ou símbolos
  telefoneInput.addEventListener('paste', (e) => {
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  });

  // Função para extrair só os números do telefone
  function extrairNumeros(valor) {
    return valor.replace(/\D/g, '').substring(0, 11);
  }

  // Clique no botão Enviar pelo WhatsApp
  btnEnviar.addEventListener('click', () => {
    const nome = nomeInput.value.trim();
    const telefoneRaw = telefoneInput.value;
    const telefone = extrairNumeros(telefoneRaw);
    const servico = servicoSelect.value;
    const mensagem = mensagemTextarea.value.trim();

    // Validações
    if (!nome) {
      alert('Por favor, preencha seu nome.');
      nomeInput.focus();
      return;
    }

    if (!telefone || telefone.length < 10) {
      alert('Por favor, informe um telefone válido com pelo menos 10 números.');
      telefoneInput.focus();
      return;
    }

    if (!servico) {
      alert('Por favor, selecione um tipo de serviço.');
      servicoSelect.focus();
      return;
    }

    // Monta mensagem para WhatsApp
    let texto = `Olá, meu nome é *${nome}*.%0A`;
    texto += `Gostaria de solicitar um orçamento para o serviço de *${servico}*.%0A`;
    if (mensagem) {
      texto += `Detalhes: ${mensagem}%0A`;
    }
    texto += `Meu telefone para contato é: ${telefone}`;

    const numeroWhatsApp = '5548984249938';
    const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
    window.open(url, '_blank');
  });

  // === MENU TOGGLER (RESPONSIVO) ===
  const toggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
});
