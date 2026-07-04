// Recupera os votos salvos no celular/computador do usuário, ou começa do zero (10 e 5)
let votosBrasil = parseInt(localStorage.getItem('votosBrasil')) || 10;
let votosNoruega = parseInt(localStorage.getItem('votosNoruega')) || 5;

function votar(time) {
    // Adiciona o voto ao time clicado
    if (time === 'brasil') votosBrasil++;
    if (time === 'noruega') votosNoruega++;

    // Salva os novos totais na memória do navegador
    localStorage.setItem('votosBrasil', votosBrasil);
    localStorage.setItem('votosNoruega', votosNoruega);

    // Mostra o resultado atualizado na tela
    atualizarGrafico();
}

function atualizarGrafico() {
    const total = votosBrasil + votosNoruega;
    const pctBrasil = Math.round((votosBrasil / total) * 100);
    const pctNoruega = Math.round((votosNoruega / total) * 100);

    // Substitui os números de 0% pelas porcentagens reais
    document.getElementById('porcentagem-brasil').innerText = pctBrasil;
    document.getElementById('porcentagem-noruega').innerText = pctNoruega;
    
    // Faz o bloco invisível do resultado aparecer na tela
    document.getElementById('resultado-enquete').style.display = 'block';
}
// Ativa a função quando o botão do Brasil for clicado
document.getElementById('btn-brasil').addEventListener('click', function() {
    votar('brasil');
});

// Ativa a função quando o botão da Noruega for clicado
document.getElementById('btn-noruega').addEventListener('click', function() {
    votar('noruega');
});
// Recupera os votos salvos ou começa do zero se for a primeira vez
let votosSim = parseInt(localStorage.getItem('votosSim')) || 0;
let votosNao = parseInt(localStorage.getItem('votosNao')) || 0;
function votar(opcao) {

    if (opcao === 'sim') votosSim++;
    if (opcao === 'nao') votosNao++;




    // Salva os novos totais na memória
    localStorage.setItem('votosSim', votosSim);
    localStorage.setItem('votosNao', votosNao);

    atualizarGrafico();
}

function atualizarGrafico() {
    const total = votosSim + votosNao;
    
    // Evita divisão por zero se ninguém votou ainda
    const pctSim = total > 0 ? Math.round((votosSim / total) * 100) : 0;
    const pctNao = total > 0 ? Math.round((votosNao / total) * 100) : 0;

    // Substitui os números na tela pelas porcentagens reais
    document.getElementById('porcentagem-brasil').innerText = 'Sim: ' + pctSim + '%';
    document.getElementById('porcentagem-noruega').innerText = 'Não: ' + pctNao + '%';

    // Faz o bloco invisível do resultado aparecer na tela
    document.getElementById('resultado-enquete').style.display = 'block';
}
// Vincula os cliques dos botões e muda as cores
document.getElementById('btn-brasil').addEventListener('click', function() {
    votar('sim');
    
    document.getElementById('btn-brasil').style.background = '#00ff88'; // Verde
    document.getElementById('btn-noruega').style.background = '#ffffff'; // Branco
});

document.getElementById('btn-noruega').addEventListener('click', function() {
    votar('nao');
    
    document.getElementById('btn-noruega').style.background = '#00ff88'; // Verde
    document.getElementById('btn-brasil').style.background = '#ffcc00'; // Amarelo
});



  
 

function votar(opcao) {
    const mensagem = document.getElementById("mensagem-voto");
    mensagem.style.display = "block";
    mensagem.innerHTML = `Você votou em: <strong>${opcao}</strong>!`;
    
    // Seleciona todos os botões da enquete
    const botoes = document.querySelectorAll('.btn-enquete');
    
    botoes.forEach(botao => {
        // Desativa o botão para não votar duas vezes
        botao.disabled = true;
        
        // Se for o botão que o usuário clicou, muda para verde. Se não, fica cinza escuro.
        if (botao.textContent === opcao) {
            botao.style.backgroundColor = "#2ecc71"; // Verde de sucesso
            botao.style.color = "#ffffff";
        } else {
            botao.style.backgroundColor = "#334155"; // Cinza para a opção não escolhida
            botao.style.opacity = "0.5";
        }
    });
}
// Função para salvar o palpite do usuário
function salvarPalpite() {
    const golsCanada = document.getElementById('palpite-canada').value;
    const golsMarrocos = document.getElementById('palpite-marrocos').value;
    const msg = document.getElementById('msg-sucesso');

    // Validação básica se os campos estão preenchidos
    if (golsCanada === "" || golsMarrocos === "") {
        alert("Por favor, preencha o placar dos dois times antes de salvar!");
        return;
    }

    // Criando o objeto do palpite
    const palpite = {
        canada: golsCanada,
        marrocos: golsMarrocos,
        dataSalva: new Date().toLocaleString()
    };

    // Salvando no navegador do usuário
    localStorage.setItem('palpite_copa_can_mar', JSON.stringify(palpite));

    // Mostrando mensagem de sucesso na tela
    msg.innerText = `Palpite salvo com sucesso! (${golsCanada} x ${golsMarrocos})`;
    msg.style.display = 'block';
}

// Carregar o palpite caso o usuário já tenha votado antes e recarregado a página
window.addEventListener('DOMContentLoaded', () => {
    const palpiteSalvo = localStorage.getItem('palpite_copa_can_mar');
    if (palpiteSalvo) {
        const dados = JSON.parse(palpiteSalvo);
        document.getElementById('palpite-canada').value = dados.canada;
        document.getElementById('palpite-marrocos').value = dados.marrocos;
        
        const msg = document.getElementById('msg-sucesso');
        msg.innerText = `Você já deu seu palpite: (${dados.canada} x ${dados.marrocos})`;
        msg.style.display = 'block';
    }
});
// Função genérica para salvar palpites individuais
function salvarPalpite(idJogo, idTimeA, idTimeB, idMsg) {
    const golsTimeA = document.getElementById(idTimeA).value;
    const golsTimeB = document.getElementById(idTimeB).value;
    const msgArea = document.getElementById(idMsg);

    if (golsTimeA === "" || golsTimeB === "") {
        alert("Por favor, preencha o placar dos dois times antes de salvar!");
        return;
    }

    const palpite = {
        golsA: golsTimeA,
        golsB: golsTimeB,
        dataSalva: new Date().toLocaleString()
    };

    // Salva usando uma chave única para cada partida (ex: palpite_copa_can_mar ou palpite_copa_par_fra)
    localStorage.setItem(`palpite_copa_${idJogo}`, JSON.stringify(palpite));

    msgArea.innerText = `Palpite salvo! (${golsTimeA} x ${golsTimeB})`;
    msgArea.style.display = 'block';
}

// Carrega os palpites guardados ao abrir ou atualizar a página
window.addEventListener('DOMContentLoaded', () => {
    // Restaurar Jogo 1
    const palpiteJogo1 = localStorage.getItem('palpite_copa_can_mar');
    if (palpiteJogo1) {
        const dados = JSON.parse(palpiteJogo1);
        document.getElementById('palpite-canada').value = dados.golsA;
        document.getElementById('palpite-marrocos').value = dados.golsB;
        document.getElementById('msg-can-mar').innerText = `Palpite enviado: (${dados.golsA} x ${dados.golsB})`;
        document.getElementById('msg-can-mar').style.display = 'block';
    }

    // Restaurar Jogo 2
    const palpiteJogo2 = localStorage.getItem('palpite_copa_par_fra');
    if (palpiteJogo2) {
        const dados = JSON.parse(palpiteJogo2);
        document.getElementById('palpite-paraguai').value = dados.golsA;
        document.getElementById('palpite-franca').value = dados.golsB;
        document.getElementById('msg-par-fra').innerText = `Palpite enviado: (${dados.golsA} x ${dados.golsB})`;
        document.getElementById('msg-par-fra').style.display = 'block';
    }
});
function executarPesquisa() {
    // 1. Pega o termo digitado e transforma em letras minúsculas
    const termo = document.getElementById('campo-pesquisa').value.toLowerCase().trim();
    
    if (termo === "") {
        alert("Por favor, digite algo para buscar!");
        return;
    }

    // 2. Seleciona os elementos da página onde a busca vai procurar os textos
    const blocosConteudo = document.querySelectorAll('p, li, h2, h3, span');
    let encontrado = false;

    // 3. Limpa destaques de pesquisas anteriores
    document.querySelectorAll('.destaque-pesquisa').forEach(el => {
        el.classList.remove('destaque-pesquisa');
    });

    // 4. Varre os elementos para achar a palavra digitada
    for (let elemento of blocosConteudo) {
        if (elemento.textContent.toLowerCase().includes(termo)) {
            // Adiciona a classe de destaque visual
            elemento.classList.add('destaque-pesquisa');
            
            // Faz a tela rolar suavemente até o conteúdo encontrado
            elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            encontrado = true;
            break; // Para no primeiro resultado que encontrar
        }
    }

    if (!encontrado) {
        alert("Nenhum resultado encontrado para essa busca.");
    }
}

// Faz a busca funcionar também ao apertar a tecla 'Enter' no teclado
document.getElementById('campo-pesquisa')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        executarPesquisa();
    }
});
function verificarHorariosDosJogos() {
    const agora = new Date();
    
    // Define a data de hoje: 4 de Julho de 2026
    const ano = 2026;
    const mes = 6; // Julho no JS é 6 (começa em 0)
    const dia = 4;

    // Horários limite dos jogos de hoje (Horário de Brasília)
    const horarioLimiteJogo1 = new Date(ano, mes, dia, 12, 0, 0); // 14:00
    const horarioLimiteJogo2 = new Date(ano, mes, dia, 12, 0, 0); // 18:00

    // Verifica Jogo 1 (Canadá vs Marrocos)
    if (agora >= horarioLimiteJogo1) {
        const btn1 = document.querySelector("button[onclick*='can_mar']");
        if (btn1) {
            btn1.disabled = true;
            btn1.innerText = "Palpites Encerrados";
            btn1.style.backgroundColor = "#555";
            btn1.style.cursor = "not-allowed";
        }
    }

    // Verifica Jogo 2 (Paraguai vs França)
    if (agora >= horarioLimiteJogo2) {
        const btn2 = document.querySelector("button[onclick*='par_fra']");
        if (btn2) {
            btn2.disabled = true;
            btn2.innerText = "Palpites Encerrados";
            btn2.style.backgroundColor = "#555";
            btn2.style.cursor = "not-allowed";
        }
    }
}

// Executa a checagem assim que a página carrega
window.addEventListener('DOMContentLoaded', () => {
    verificarHorariosDosJogos();
});
function enviarMensagemChat() {
    const campoNome = document.getElementById('chat-nome');
    const campoMsg = document.getElementById('chat-mensagem');
    const containerChat = document.querySelector('.chat-mensagens-container') || document.querySelector('#chat-nome').parentElement.previousElementSibling;

    let nome = campoNome.value.trim();
    let msg = campoMsg.value.trim();

    if (nome === "") nome = "Anônimo";
    if (msg === "") {
        alert("Digite uma mensagem antes de enviar!");
        return;
    }

    // Cria o balão da nova mensagem
    const novoBalao = document.createElement('div');
    novoBalao.className = 'msg-card';
    novoBalao.innerHTML = `
        <span class="msg-autor">${nome}</span>
        <span class="noticia-data-chat">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <p class="msg-texto">${msg}</p>
    `;

    // Coloca a mensagem dentro do chat
    containerChat.appendChild(novoBalao);

    // Limpa apenas o campo da mensagem para você digitar a próxima
    campoMsg.value = "";
    
    // Rola o chat para baixo automaticamente para ver a nova mensagem
    containerChat.scrollTop = containerChat.scrollHeight;
}
