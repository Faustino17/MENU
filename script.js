const menuData = {
    entradas: [
        { nome: "Gambas ao Alho", preco: 14000, desc: "Camarões premium salteados em alho e azeite." },
        { nome: "Azinhas Picantes", preco: 4500, desc: "Frango crocante com molho picante secreto." },
        { nome: "Chouriço Caseiro", preco: 3500, desc: "Grelhado na brasa com pão rústico." },
        { nome: "Choco Frito", preco: 4000, desc: "Tiras de choco tenras e crocantes." },
        { nome: "Moelas", preco: 3500, desc: "Estufadas lentamente em molho rico." },
        { nome: "Pica Pau", preco: 3500, desc: "Lombinhos de carne com picles artesanais." }
    ],
    sopas: [
        { nome: "Caldo de Peixe", preco: 4000, desc: "O autêntico sabor do mar de Luanda." },
        { nome: "Sopa de Feijão", preco: 2000, desc: "Cremosa e tradicional." },
        { nome: "Caldo Verde", preco: 2000, desc: "Clássico com chouriço e couve fina." },
        { nome: "Sopa de Batata", preco: 2500, desc: "Sabor da Pontuz no Ponto!" }
    ],
    carnes: [
        { nome: "Grelhada Mista (2 pax)", preco: 20000, desc: "Seleção premium de carnes na brasa." },
        { nome: "Picanha ao Alho", preco: 8500, desc: "Arroz, feijão preto e farofa." },
        { nome: "Magret de Pato", preco: 7500, desc: "Molho de laranja e risoto cremoso." },
        { nome: "Bitoque Pontuz", preco: 6000, desc: "Bife do lombo com ovo a cavalo." },
        { nome: "Churrasco", preco: 6000, desc: "Batata frita, arroz e feijão especial." }
    ],
    funge: [
        { nome: "Funge de Peito Alto", preco: 6000, desc: "Kizaca ou feijão de óleo de palma." },
        { nome: "Muamba de Galinha", preco: 6000, desc: "Galinha da terra com sabor ancestral." },
        { nome: "Funge com Carne Seca", preco: 7000, desc: "Acompanhado com feijão de banha." },
        { nome: "Funge com Calulu", preco: 7000, desc: "Peixe seco e fresco com kizaca." }
    ],
    peixes: [
        { nome: "Corvina Escalada", preco: 7000, desc: "Grelhada com legumes frescos." },
        { nome: "Moqueca de Peixe", preco: 7000, desc: "Arroz solto e pirão de peixe." },
        { nome: "Polvo à Lagareiro", preco: 8000, desc: "Batata a murro e azeite de alho." },
        { nome: "Choco Grelhado", preco: 6500, desc: "Batata cozida e molho de limão." }
    ],
    sobremesas: [
        { nome: "Mousse Maracujá", preco: 1700, desc: "Leve e refrescante." },
        { nome: "Pudim Caseiro", preco: 1500, desc: "Receita tradicional da casa." },
        { nome: "Bolo de Chocolate", preco: 900, desc: "Fatia húmida com cobertura de cacau." }
    ]
};

let carrinho = [];
let mesaNum = "";
let historicoAbas = ['entradas'];
let avalEstrelas = 0;

function entrar() {
    const mesaInput = document.getElementById("mesa");
    mesaNum = mesaInput.value;

    // Limite de 1 a 16 mesas
    if (!mesaNum || mesaNum < 1 || mesaNum > 16) {
        return alert("Por favor, indique uma mesa válida (1 a 16).");
    }

    const overlay = document.getElementById("loginOverlay");
    overlay.style.opacity = "0";
    overlay.style.transition = "0.8s";
    
    setTimeout(() => {
        overlay.classList.add("site-hidden");
        document.getElementById("app").classList.remove("site-hidden");
        document.getElementById("mesaDisplay").innerText = `MESA ${mesaNum}`;
        showTab('entradas', document.querySelector('.p-tab-item'));
    }, 800);
}

// SERVIÇOS DA MESA
function abrirMesaModal() {
    document.getElementById("numMesaModal").innerText = mesaNum;
    document.getElementById("mesaModal").classList.add("show");
}

function fecharMesaModal(e) {
    if(e.target.classList.contains('p-modal-overlay')) {
        e.target.classList.remove('show');
    }
}

function servicoRapido(tipo, texto) {
    const msg = `*PONTUZ - ${tipo}*%0A*MESA:* ${mesaNum}%0A*SOLICITAÇÃO:* ${texto}`;
    alert("O Garçom já foi notificado! Estaremos aí em instantes.");
    window.open(`https://wa.me/244955002054?text=${msg}`, '_blank');
    document.getElementById("mesaModal").classList.remove("show");
}

// AVALIAÇÃO
function abrirAvaliacao() {
    document.getElementById("mesaModal").classList.remove("show");
    document.getElementById("avalModal").classList.add("show");
}

function setStar(n) {
    avalEstrelas = n;
    const stars = document.querySelectorAll('.p-stars i');
    stars.forEach((s, i) => s.classList.toggle('active', i < n));
}

function fecharAval() {
    document.getElementById("avalModal").classList.remove("show");
}

function enviarAvaliacao() {
    const coment = document.getElementById("avalComentario").value;
    if(avalEstrelas === 0) return alert("Por favor, selecione as estrelas.");
    
    const estrelasTexto = "⭐".repeat(avalEstrelas);
    const msg = `*PONTUZ - AVALIAÇÃO*%0A*MESA:* ${mesaNum}%0A*NOTA:* ${estrelasTexto}%0A*COMENTÁRIO:* ${coment}`;
    
    alert("Obrigado pelo seu feedback! Isso ajuda-nos a melhorar.");
    window.open(`https://wa.me/244955002054?text=${msg}`, '_blank');
    fecharAval();
}

// CONVIDAR AMIGOS
function convidarAmigos() {
    const texto = "Vem conhecer o *Restaurante Pontuz* em Talatona! Comida incrível e ambiente sofisticado. 🍷🥩%0A%0ASe quiser ver o menu agora: " + window.location.href;
    window.open(`https://wa.me/?text=${texto}`, '_blank');
}

// NAVEGAÇÃO E MENU
function voltarCategorias() {
    if (historicoAbas.length > 1) {
        historicoAbas.pop(); 
        const abaAnterior = historicoAbas[historicoAbas.length - 1];
        const botoes = document.querySelectorAll('.p-tab-item');
        botoes.forEach(btn => {
            if (btn.innerText.toLowerCase().includes(abaAnterior)) {
                renderizarMenu(abaAnterior, btn);
            }
        });
    }
}

function showTab(category, btn) {
    if (historicoAbas[historicoAbas.length - 1] !== category) {
        historicoAbas.push(category);
    }
    renderizarMenu(category, btn);
}

function renderizarMenu(category, btn) {
    const grid = document.getElementById("menu");
    grid.innerHTML = "";
    document.querySelectorAll('.p-tab-item').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    menuData[category].forEach((item, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animation = `revealUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards ${i * 0.1}s`;
        card.style.opacity = "0";
        card.innerHTML = `
            <div class="card-content">
                <h4 class="card-title">${item.nome}</h4>
                <p class="card-desc">${item.desc}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
                    <span class="card-price">${item.preco.toLocaleString()} Kz</span>
                    <button onclick="addCarrinho('${item.nome}', ${item.preco}, this)" class="p-btn-add">+</button>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

function addCarrinho(nome, preco, btn) {
    carrinho.push({ nome, preco, id: Date.now() });
    btn.innerText = "✓";
    btn.style.background = "#fff";
    btn.style.color = "#000";
    setTimeout(() => { btn.innerText = "+"; btn.style.background = ""; btn.style.color = ""; }, 800);
    atualizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const list = document.getElementById("cartItems");
    const counts = document.querySelectorAll(".cart-count");
    let total = 0;
    list.innerHTML = "";
    carrinho.forEach(item => {
        total += item.preco;
        list.innerHTML += `
            <div class="p-cart-item">
                <div>
                    <div style="font-weight:bold; font-size:0.9rem">${item.nome}</div>
                    <div style="color:var(--gold); font-size:0.8rem">${item.preco.toLocaleString()} Kz</div>
                </div>
                <button onclick="removerItem(${item.id})" class="btn-remove"><i class="fas fa-trash-alt"></i></button>
            </div>`;
    });
    document.getElementById("total").innerText = `${total.toLocaleString()} Kz`;
    counts.forEach(c => c.innerText = carrinho.length);
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
    document.getElementById("cartOverlay").classList.toggle("show");
}

function finalizar() {
    if (carrinho.length === 0) return alert("O carrinho está vazio.");
    let msg = `*PONTUZ - PEDIDO MESA ${mesaNum}*%0A────────────────────%0A`;
    carrinho.forEach(i => msg += `• ${i.nome}%0A`);
    msg += `────────────────────%0A*TOTAL:* ${document.getElementById("total").innerText}`;
    window.open(`https://wa.me/244955002054?text=${msg}`);
}