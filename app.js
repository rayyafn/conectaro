/**
 * CONECTARO - Plataforma Digital de Conexão de Serviços em Rondônia
 * Projeto Acadêmico baseado no Edital nº 03/2026 - Programa Centelha 3 Rondônia
 * Autora: Evelyn Laí da Costa Caires (3º B Informática - IFRO)
 * 
 * Atende aos Casos de Uso (UC01 a UC09), Requisitos Funcionais (RF01 a RF18)
 * e Critérios de Aceite (CA01 a CA06).
 */

// Chaves de armazenamento LocalStorage
const STORAGE_KEYS = {
  USERS: 'conectaro_users',
  PROFILES: 'conectaro_profiles',
  CATEGORIES: 'conectaro_categories',
  REQUESTS: 'conectaro_requests',
  REVIEWS: 'conectaro_reviews',
  CURRENT_USER: 'conectaro_current_user',
  EQUITY_ENABLED: 'conectaro_equity_enabled',
  REPORTS: 'conectaro_reports'
};

// DADOS INICIAIS (SEED)
const INITIAL_CATEGORIES = [
  { id: 'cat_inf', name: 'Informática & Assistência Técnica', icon: '💻', desc: 'Manutenção de computadores, notebooks, redes e instalação de softwares' },
  { id: 'cat_ele', name: 'Serviços Elétricos', icon: '⚡', desc: 'Instalações elétricas residenciais, chuveiros, tomadas e quadros de energia' },
  { id: 'cat_hid', name: 'Serviços Hidráulicos', icon: '🔧', desc: 'Desentupimentos, reparo de vazamentos, encanamento e torneiras' },
  { id: 'cat_des', name: 'Design Gráfico & Mídia', icon: '🎨', desc: 'Logomarcas, identidade visual, banners e gestão de mídias sociais' },
  { id: 'cat_fot', name: 'Fotografia & Audiovisual', icon: '📷', desc: 'Cobertura de eventos, ensaios fotográficos, formaturas e edição de vídeo' },
  { id: 'cat_aul', name: 'Aulas Particulares & Reforço', icon: '📚', desc: 'Reforço escolar, matemática, física, inglês e redação para o ENEM' },
  { id: 'cat_ref', name: 'Reformas & Pintura', icon: '🖌️', desc: 'Pintura de paredes, pequenos reparos, acabamento e reformas em geral' },
  { id: 'cat_est', name: 'Estética & Cuidados', icon: '✂️', desc: 'Cortes de cabelo a domicílio, manicure, maquiagem e cuidados pessoais' }
];

const INITIAL_USERS = [
  { id: 'u_cli_1', nome: 'Lucas Silva', email: 'lucas.silva@gmail.com', telefone: '(69) 99201-1122', tipo: 'CLIENTE', cidade: 'Porto Velho' },
  { id: 'u_pro_1', nome: 'Marcos Andrade', email: 'marcos.eletrica@gmail.com', telefone: '(69) 98402-3344', tipo: 'PROFISSIONAL', cidade: 'Porto Velho' },
  { id: 'u_pro_2', nome: 'Ana Paula Lima', email: 'ana.ti.rondonia@gmail.com', telefone: '(69) 99312-5566', tipo: 'PROFISSIONAL', cidade: 'Porto Velho' },
  { id: 'u_pro_3', nome: 'Thiago Rocha', email: 'thiago.encanador@gmail.com', telefone: '(69) 99233-7788', tipo: 'PROFISSIONAL', cidade: 'Ji-Paraná' },
  { id: 'u_pro_4', nome: 'Beatriz Vasconcelos', email: 'beatriz.design@gmail.com', telefone: '(69) 98114-9900', tipo: 'PROFISSIONAL', cidade: 'Porto Velho' },
  { id: 'u_pro_5', nome: 'Gabriel Menezes', email: 'gabriel.ifro@gmail.com', telefone: '(69) 99399-2211', tipo: 'PROFISSIONAL', cidade: 'Porto Velho' }, // Recém-cadastrado IFRO para testar Equidade RF17
  { id: 'u_pro_6', nome: 'Juliana Santos', email: 'juliana.aulas@gmail.com', telefone: '(69) 98444-5511', tipo: 'PROFISSIONAL', cidade: 'Ariquemes' },
  { id: 'u_pro_7', nome: 'Carlos Eduardo', email: 'carlos.fotopv@gmail.com', telefone: '(69) 99222-8844', tipo: 'PROFISSIONAL', cidade: 'Cacoal' },
  { id: 'u_adm_1', nome: 'Administração ConectaRO', email: 'admin@conectaro.ro.gov.br', telefone: '(69) 3216-5000', tipo: 'ADMIN', cidade: 'Porto Velho' }
];

const INITIAL_PROFILES = [
  {
    id_perfil: 'p1',
    id_usuario: 'u_pro_1',
    categoria_id: 'cat_ele',
    categoria_nome: 'Serviços Elétricos',
    cidade: 'Porto Velho',
    bairros: 'Areal, Olaria, Centro, Nova Porto Velho',
    experiencia: 'Eletricista residencial com mais de 8 anos de experiência prática. Especialista em resolução de curtos, troca de fiação, instalação de chuveiros e dimensionamento de disjuntores.',
    modalidades: ['Troca de fiação', 'Instalação de padrão e chuveiros', 'Reparo em tomadas e disjuntores', 'Laudos elétricos simples'],
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 4.9,
    total_avaliacoes: 14,
    recem_cadastrado: false,
    verificado: true
  },
  {
    id_perfil: 'p2',
    id_usuario: 'u_pro_2',
    categoria_id: 'cat_inf',
    categoria_nome: 'Informática & Assistência Técnica',
    cidade: 'Porto Velho',
    bairros: 'Embratel, Agenor de Carvalho, Rio Madeira, Flodoaldo Pontes Pinto',
    experiencia: 'Técnica especializada em diagnóstico e conserto de computadores, notebooks lentos, formatação limpa com backup, remoção de vírus e configuração de redes Wi-Fi empresariais e domésticas.',
    modalidades: ['Formatação com backup', 'Limpeza interna e troca de pasta térmica', 'Upgrade de SSD e memória RAM', 'Configuração de roteadores e Wi-Fi'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 5.0,
    total_avaliacoes: 18,
    recem_cadastrado: false,
    verificado: true
  },
  {
    id_perfil: 'p3',
    id_usuario: 'u_pro_3',
    categoria_id: 'cat_hid',
    categoria_nome: 'Serviços Hidráulicos',
    cidade: 'Ji-Paraná',
    bairros: 'Dois de Abril, Casa Preta, Nova Brasília',
    experiencia: 'Encanador profissional com atendimento rápido em Ji-Paraná. Localização precisa de vazamentos não visíveis, desentupimento de ralos e pias, instalação de registros e boias de caixa d’água.',
    modalidades: ['Localização de vazamentos', 'Desentupimento de esgotos e pias', 'Instalação de torneiras e registros', 'Limpeza e manutenção de caixas d’água'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 4.8,
    total_avaliacoes: 9,
    recem_cadastrado: false,
    verificado: true
  },
  {
    id_perfil: 'p4',
    id_usuario: 'u_pro_4',
    categoria_id: 'cat_des',
    categoria_nome: 'Design Gráfico & Mídia',
    cidade: 'Porto Velho',
    bairros: 'Atendimento online em todo o Estado de Rondônia',
    experiencia: 'Designer visual com foco no fortalecimento de marcas para pequenos negócios locais. Criação de identidades visuais marcantes, logotipos, posts para Instagram e materiais impressos como cardápios e panfletos.',
    modalidades: ['Criação de Logomarca e Identidade', 'Artes para Redes Sociais', 'Cardápios digitais e impressos', 'Banners e fachadas comerciais'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 4.9,
    total_avaliacoes: 11,
    recem_cadastrado: false,
    verificado: true
  },
  {
    id_perfil: 'p5',
    id_usuario: 'u_pro_5',
    categoria_id: 'cat_inf',
    categoria_nome: 'Informática & Assistência Técnica',
    cidade: 'Porto Velho',
    bairros: 'Zulmira, Caladinho, Cohab, Zona Sul de Porto Velho',
    experiencia: 'Estudante concluinte do Curso Técnico em Informática do IFRO. Grande domínio prático em manutenção de computadores, formatação, otimização de máquinas lentas, instalação de periféricos e suporte amigável.',
    modalidades: ['Otimização de sistema operacional', 'Instalação de programas e antivírus', 'Recuperação de arquivos excluídos', 'Atendimento rápido na Zona Sul'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 0.0,
    total_avaliacoes: 0,
    recem_cadastrado: true, // Recém cadastrado para acionar regra de equidade RF17 e CA04!
    verificado: true
  },
  {
    id_perfil: 'p6',
    id_usuario: 'u_pro_6',
    categoria_id: 'cat_aul',
    categoria_nome: 'Aulas Particulares & Reforço',
    cidade: 'Ariquemes',
    bairros: 'Setor 01, Setor 03, Marechal Rondon',
    experiencia: 'Licenciada em Matemática com didática paciente e focada em resultados. Aulas de reforço para ensino fundamental e médio, preparação para vestibulares e concursos públicos de Rondônia.',
    modalidades: ['Reforço de Matemática Fundamental', 'Física e Álgebra para Ensino Médio', 'Aulas preparatórias para Concursos', 'Apoio em tarefas escolares'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 5.0,
    total_avaliacoes: 1,
    recem_cadastrado: true,
    verificado: true
  },
  {
    id_perfil: 'p7',
    id_usuario: 'u_pro_7',
    categoria_id: 'cat_fot',
    categoria_nome: 'Fotografia & Audiovisual',
    cidade: 'Cacoal',
    bairros: 'Centro, Liberdade, Teixeirão',
    experiencia: 'Fotógrafo profissional especializado em ensaios externos na região central de Rondônia, formaturas, fotos corporativas para perfis profissionais e cobertura de aniversários.',
    modalidades: ['Ensaios individuais e de casal', 'Fotos corporativas para LinkedIn/Instagram', 'Cobertura de eventos familiares', 'Edição de fotos profissional'],
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    media_avaliacao: 4.7,
    total_avaliacoes: 7,
    recem_cadastrado: false,
    verificado: true
  }
];

const INITIAL_REQUESTS = [
  {
    id_solicitacao: 'req_101',
    id_cliente: 'u_cli_1',
    cliente_nome: 'Lucas Silva',
    id_profissional: 'p2',
    profissional_nome: 'Ana Paula Lima',
    id_categoria: 'cat_inf',
    categoria_nome: 'Informática & Assistência Técnica',
    descricao_necessidade: 'Notebook Dell travando constantemente após atualização do Windows. Preciso urgente para trabalho remoto.',
    cidade: 'Porto Velho',
    bairro: 'Centro',
    data_solicitacao: '2026-10-18 10:15',
    status: 'CONCLUIDO',
    avaliado: true
  },
  {
    id_solicitacao: 'req_102',
    id_cliente: 'u_cli_1',
    cliente_nome: 'Lucas Silva',
    id_profissional: 'p1',
    profissional_nome: 'Marcos Andrade',
    id_categoria: 'cat_ele',
    categoria_nome: 'Serviços Elétricos',
    descricao_necessidade: 'Disjuntor geral da casa está desarmando toda vez que ligo o ar-condicionado na sala.',
    cidade: 'Porto Velho',
    bairro: 'Olaria',
    data_solicitacao: '2026-10-19 14:30',
    status: 'EM_ANDAMENTO',
    avaliado: false
  },
  {
    id_solicitacao: 'req_103',
    id_cliente: 'u_cli_1',
    cliente_nome: 'Lucas Silva',
    id_profissional: 'p5',
    profissional_nome: 'Gabriel Menezes',
    id_categoria: 'cat_inf',
    categoria_nome: 'Informática & Assistência Técnica',
    descricao_necessidade: 'Instalação de SSD de 500GB e cópia dos meus arquivos em um PC desktop antigo.',
    cidade: 'Porto Velho',
    bairro: 'Cohab',
    data_solicitacao: '2026-10-20 09:00',
    status: 'PENDENTE',
    avaliado: false
  }
];

const INITIAL_REVIEWS = [
  {
    id_avaliacao: 'rev_1',
    id_solicitacao: 'req_101',
    id_profissional: 'p2',
    cliente_nome: 'Lucas Silva',
    nota: 5,
    comentario: 'Excelente profissional! Atendeu pontualmente em Porto Velho, fez o backup completo e deixou o computador voando. Super recomendo!',
    data_avaliacao: '2026-10-18 17:40'
  },
  {
    id_avaliacao: 'rev_2',
    id_solicitacao: 'req_old_1',
    id_profissional: 'p1',
    cliente_nome: 'Clara Meireles',
    nota: 5,
    comentario: 'O Marcos trocou toda a fiação antiga do meu apartamento. Serviço limpo e passou muita segurança.',
    data_avaliacao: '2026-10-12 11:20'
  },
  {
    id_avaliacao: 'rev_3',
    id_solicitacao: 'req_old_2',
    id_profissional: 'p4',
    cliente_nome: 'Rodrigo Fernandes',
    nota: 5,
    comentario: 'A identidade visual criada para minha lanchonete ficou linda! Entendeu exatamente o que eu queria.',
    data_avaliacao: '2026-10-05 16:15'
  }
];

const INITIAL_REPORTS = [
  {
    id_denuncia: 'den_1',
    tipo: 'PERFIL',
    alvo_nome: 'Perfil de Teste Suspeito',
    motivo: 'Número de telefone inexistente e fotos não autorizadas',
    status: 'PENDENTE',
    data: '2026-10-19 15:30'
  }
];

// GERENCIADOR DE ESTADO
class ConectaroState {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.resetFactoryDefaults();
    }
  }

  resetFactoryDefaults() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(INITIAL_PROFILES));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0])); // Começa como Lucas (Cliente)
    localStorage.setItem(STORAGE_KEYS.EQUITY_ENABLED, 'true'); // Regra de equidade ligada por padrão
  }

  getUsers() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'); }
  getProfiles() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) || '[]'); }
  getCategories() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]'); }
  getRequests() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || '[]'); }
  getReviews() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]'); }
  getReports() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]'); }
  
  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : INITIAL_USERS[0];
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  isEquityEnabled() {
    return localStorage.getItem(STORAGE_KEYS.EQUITY_ENABLED) !== 'false';
  }

  setEquityEnabled(val) {
    localStorage.setItem(STORAGE_KEYS.EQUITY_ENABLED, val ? 'true' : 'false');
  }

  saveRequests(reqs) { localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(reqs)); }
  saveReviews(revs) { localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(revs)); }
  saveProfiles(profs) { localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profs)); }
  saveUsers(users) { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); }
  saveReports(reports) { localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports)); }
}

const state = new ConectaroState();

// MOTOR DE PROCESSAMENTO INTELIGENTE (IA / NLP - RF15 & CA02)
const ConectaroAI = {
  knowledgeBase: [
    {
      catId: 'cat_inf',
      catName: 'Informática & Assistência Técnica',
      keywords: ['computador', 'notebook', 'pc', 'lento', 'lentidão', 'trava', 'travando', 'windows', 'formatar', 'formatação', 'vírus', 'tela azul', 'ssd', 'memória', 'teclado', 'mouse', 'impressora', 'programas', 'office', 'ligar', 'não liga', 'cooler', 'pasta térmica', 'wifi', 'internet', 'backup']
    },
    {
      catId: 'cat_ele',
      catName: 'Serviços Elétricos',
      keywords: ['eletricista', 'chuveiro', 'curto', 'tomada', 'fiação', 'disjuntor', 'energia', 'luz', 'lâmpada', 'faísca', 'cheiro de queimado', 'tensão', 'padrão', '110v', '220v', 'quadro de força', 'choque']
    },
    {
      catId: 'cat_hid',
      catName: 'Serviços Hidráulicos',
      keywords: ['encanador', 'cano', 'vazando', 'vazamento', 'torneira', 'pia', 'ralo', 'infiltração', 'esgoto', 'desentupir', 'desentupimento', 'descarga', 'caixa d’água', 'pressão de água', 'goteira', 'sifão']
    },
    {
      catId: 'cat_des',
      catName: 'Design Gráfico & Mídia',
      keywords: ['logo', 'logomarca', 'identidade visual', 'banner', 'arte', 'flyer', 'panfleto', 'redes sociais', 'instagram', 'post', 'social media', 'cartão de visita', 'fachada', 'design', 'vetor']
    },
    {
      catId: 'cat_fot',
      catName: 'Fotografia & Audiovisual',
      keywords: ['foto', 'fotógrafo', 'fotografia', 'ensaio', 'casamento', 'aniversário', 'formatura', 'evento', 'vídeo', 'filmagem', 'edição de vídeo', 'book', 'câmera', 'fotos']
    },
    {
      catId: 'cat_aul',
      catName: 'Aulas Particulares & Reforço',
      keywords: ['aula', 'reforço', 'matemática', 'física', 'português', 'química', 'inglês', 'estudo', 'prova', 'enem', 'concurso', 'professor', 'professora', 'ensino', 'escola', 'tarefa']
    },
    {
      catId: 'cat_ref',
      catName: 'Reformas & Pintura',
      keywords: ['pintor', 'pintura', 'tinta', 'parede', 'reforma', 'reboco', 'pedreiro', 'azulejo', 'piso', 'telhado', 'gesso', 'rachadura', 'massa corrida']
    },
    {
      catId: 'cat_est',
      catName: 'Estética & Cuidados',
      keywords: ['corte', 'cabelo', 'cabeleireiro', 'manicure', 'pedicure', 'unha', 'maquiagem', 'barba', 'barbeiro', 'estética', 'massagem', 'depilação']
    }
  ],

  analyzeQuery(text) {
    if (!text || text.trim().length === 0) return null;
    const lower = text.toLowerCase();
    
    let bestMatch = null;
    let maxMatches = 0;
    let matchedKeywords = [];

    for (const item of this.knowledgeBase) {
      const hits = item.keywords.filter(kw => lower.includes(kw));
      if (hits.length > maxMatches) {
        maxMatches = hits.length;
        bestMatch = item;
        matchedKeywords = hits;
      }
    }

    if (bestMatch && maxMatches > 0) {
      // Cálculo de confiança simulado
      const confidence = Math.min(99, 70 + (maxMatches * 10));
      return {
        matched: true,
        catId: bestMatch.catId,
        catName: bestMatch.catName,
        keywords: matchedKeywords,
        confidence: confidence
      };
    }

    return { matched: false };
  }
};

// ALGORITMO DE RECOMENDAÇÃO COM REGRA DE EQUIDADE (RF16, RF17 & CA04)
function getRecommendedProfiles(categoryFilter = '', cityFilter = '', equityActive = true) {
  let list = state.getProfiles();
  const users = state.getUsers();

  // Acoplar dados do usuário
  list = list.map(p => {
    const user = users.find(u => u.id === p.id_usuario) || {};
    return { ...p, nome: user.nome, email: user.email, telefone: user.telefone };
  });

  // Filtros
  if (categoryFilter) {
    list = list.filter(p => p.categoria_id === categoryFilter);
  }
  if (cityFilter && cityFilter !== 'todas') {
    list = list.filter(p => p.cidade.toLowerCase() === cityFilter.toLowerCase());
  }

  if (!equityActive) {
    // Modelo Convencional (GetNinjas tradicional): ordena estritamente por nota média e número de avaliações.
    // Prejudica novos profissionais que não possuem avaliações prévias!
    return list.sort((a, b) => {
      if (b.media_avaliacao !== a.media_avaliacao) return b.media_avaliacao - a.media_avaliacao;
      return b.total_avaliacoes - a.total_avaliacoes;
    });
  }

  // MODELO INOVADOR CONECTARO (EQUIDADE DE VISIBILIDADE REGIONAL - CA04):
  // Separa veteranos e recém-cadastrados, intercalando novatos qualificados em posições de destaque.
  const veterans = list.filter(p => !p.recem_cadastrado && p.total_avaliacoes > 1).sort((a, b) => b.media_avaliacao - a.media_avaliacao);
  const newcomers = list.filter(p => p.recem_cadastrado || p.total_avaliacoes <= 1);

  const balancedList = [];
  let vIndex = 0;
  let nIndex = 0;

  // Intercala: 1 novato a cada 2 veteranos para dar visibilidade justa e equilibrada!
  while (vIndex < veterans.length || nIndex < newcomers.length) {
    if (vIndex < veterans.length) balancedList.push(veterans[vIndex++]);
    if (nIndex < newcomers.length) balancedList.push(newcomers[nIndex++]);
    if (vIndex < veterans.length) balancedList.push(veterans[vIndex++]);
  }

  return balancedList;
}

// RENDERIZAÇÃO DA INTERFACE
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupMobileMenu();
  setupRoleSwitcher();
  setupCategories();
  setupSmartSearch();
  setupEquityToggle();
  renderProfessionals();
  setupModals();
  updateHeaderUserInfo();
});

// NAVEGAÇÃO ENTRE ABAS (DESKTOP E MOBILE)
function setupNavigation() {
  const links = document.querySelectorAll('.nav-link[data-tab], .mobile-nav-link[data-tab]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  // Atualiza abas desktop
  document.querySelectorAll('.nav-link[data-tab]').forEach(l => l.classList.remove('active'));
  const activeDesktopLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  if (activeDesktopLink) activeDesktopLink.classList.add('active');

  // Atualiza abas mobile
  document.querySelectorAll('.mobile-nav-link[data-tab]').forEach(l => l.classList.remove('active'));
  const activeMobileLink = document.querySelector(`.mobile-nav-link[data-tab="${tabId}"]`);
  if (activeMobileLink) activeMobileLink.classList.add('active');

  // Fecha o menu mobile se estiver aberto
  closeMobileMenu();

  // Exibe a aba de destino
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'tab-pro-dashboard') {
      renderProDashboard();
    } else if (tabId === 'tab-client-dashboard') {
      renderClientDashboard();
    } else if (tabId === 'tab-admin') {
      renderAdminDashboard();
    }
  }
}

// MENU MOBILE ACESSÍVEL (SEM SOBREPOSIÇÃO)
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Fechar ao pressionar a tecla Escape (Acessibilidade)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Fechar ao clicar fora do cabeçalho
  document.addEventListener('click', (e) => {
    const header = document.getElementById('site-header');
    if (header && !header.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Fechar automaticamente se a tela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (toggleBtn && drawer) {
    drawer.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }
}

function closeMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (toggleBtn && drawer) {
    drawer.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }
}

window.closeMobileMenu = closeMobileMenu;

// ROLE SWITCHER (CLIENTE, PROFISSIONAL, ADMIN)
function setupRoleSwitcher() {
  const select = document.getElementById('role-select');
  if (!select) return;

  const currentUser = state.getCurrentUser();
  select.value = currentUser.id;

  select.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    const users = state.getUsers();
    const found = users.find(u => u.id === selectedId);
    if (found) {
      state.setCurrentUser(found);
      updateHeaderUserInfo();
      showToast(`Perfil alterado para: ${found.nome} (${found.tipo})`, 'info');
      
      // Redireciona para o painel correspondente conforme CA01
      if (found.tipo === 'PROFISSIONAL') {
        switchTab('tab-pro-dashboard');
      } else if (found.tipo === 'ADMIN') {
        switchTab('tab-admin');
      } else {
        switchTab('tab-client-dashboard');
      }
    }
  });
}

function updateHeaderUserInfo() {
  const current = state.getCurrentUser();
  const userNameEl = document.getElementById('current-user-display');
  const userRoleEl = document.getElementById('current-role-badge');
  if (userNameEl) userNameEl.textContent = current.nome;
  if (userRoleEl) {
    userRoleEl.textContent = current.tipo;
    userRoleEl.className = `regional-badge ${current.tipo.toLowerCase()}`;
  }
}

// HELPER PARA ÍCONES VETORIAIS SVG EM VEZ DE EMOJIS (MODERNO & PROFISSIONAL)
function getCategorySvgIcon(catId) {
  switch (catId) {
    case 'cat_inf':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/><line x1="12" x2="12" y1="16" y2="20"/></svg>`;
    case 'cat_ele':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 Z"/></svg>`;
    case 'cat_hid':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    case 'cat_des':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;
    case 'cat_fot':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`;
    case 'cat_aul':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/><path d="M6 14h6"/></svg>`;
    case 'cat_ref':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="16" height="6" x="2" y="2" rx="2"/><path d="M10 8v4a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2v4"/><rect width="4" height="6" x="16" y="16" rx="1"/></svg>`;
    case 'cat_est':
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`;
    default:
      return `<svg class="cat-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
  }
}

// RENDERIZAÇÃO DE CATEGORIAS
function setupCategories() {
  const container = document.getElementById('categories-grid');
  if (!container) return;

  const cats = state.getCategories();
  container.innerHTML = cats.map(c => `
    <div 
      class="category-chip ${activeCategoryFilter === c.id ? 'active' : ''}" 
      data-cat-id="${c.id}" 
      onclick="selectCategoryFilter('${c.id}')"
      role="button"
      tabindex="0"
      aria-pressed="${activeCategoryFilter === c.id ? 'true' : 'false'}"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); selectCategoryFilter('${c.id}');}"
      title="${c.desc || c.name}"
    >
      <div class="category-icon-wrapper">
        ${getCategorySvgIcon(c.id)}
      </div>
      <span class="category-name">${c.name}</span>
      <span class="category-check-indicator" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
    </div>
  `).join('');
}

let activeCategoryFilter = '';
let activeCityFilter = '';

window.selectCategoryFilter = function(catId) {
  if (activeCategoryFilter === catId) {
    activeCategoryFilter = '';
  } else {
    activeCategoryFilter = catId;
  }
  
  document.querySelectorAll('.category-chip').forEach(ch => {
    const isSelected = ch.getAttribute('data-cat-id') === activeCategoryFilter;
    if (isSelected) {
      ch.classList.add('active');
      ch.setAttribute('aria-pressed', 'true');
    } else {
      ch.classList.remove('active');
      ch.setAttribute('aria-pressed', 'false');
    }
  });

  renderProfessionals();
};

// BUSCA INTELIGENTE (RF07, RF15, CA02)
function setupSmartSearch() {
  const searchInput = document.getElementById('nlp-search-input');
  const searchBtn = document.getElementById('btn-smart-search');
  const citySelect = document.getElementById('search-city-filter');
  const feedbackBanner = document.getElementById('ai-feedback-banner');
  const feedbackDetails = document.getElementById('ai-feedback-details');

  function triggerSearch() {
    const text = searchInput.value.trim();
    activeCityFilter = citySelect ? citySelect.value : '';

    if (text) {
      const aiResult = ConectaroAI.analyzeQuery(text);
      if (aiResult && aiResult.matched) {
        activeCategoryFilter = aiResult.catId;
        
        // Atualiza chip de categoria
        document.querySelectorAll('.category-chip').forEach(ch => {
          const isSelected = ch.getAttribute('data-cat-id') === activeCategoryFilter;
          if (isSelected) {
            ch.classList.add('active');
            ch.setAttribute('aria-pressed', 'true');
          } else {
            ch.classList.remove('active');
            ch.setAttribute('aria-pressed', 'false');
          }
        });

        if (feedbackBanner && feedbackDetails) {
          feedbackDetails.innerHTML = `
            <strong>Inteligência ConectaRO identificou:</strong> Demanda compatível com 
            <span style="color:#4f46e5; font-weight:800;">${aiResult.catName}</span> 
            (Confiança estimada: ${aiResult.confidence}%).<br>
            <span style="font-size:0.8rem; color:#475569;">Termos analisados: <em>"${aiResult.keywords.join(', ')}"</em>. Exibindo prestadores em Rondônia com foco na sua necessidade.</span>
          `;
          feedbackBanner.classList.add('active');
        }
      } else {
        if (feedbackBanner) feedbackBanner.classList.remove('active');
      }
    } else {
      if (feedbackBanner) feedbackBanner.classList.remove('active');
    }

    renderProfessionals();
  }

  if (searchBtn) searchBtn.addEventListener('click', triggerSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        triggerSearch();
      }
    });
  }

  if (citySelect) {
    citySelect.addEventListener('change', () => {
      activeCityFilter = citySelect.value;
      renderProfessionals();
    });
  }

  // Exemplos rápidos para testar a IA
  document.querySelectorAll('.pill-sample').forEach(pill => {
    pill.addEventListener('click', () => {
      const sampleText = pill.getAttribute('data-sample');
      if (searchInput) {
        searchInput.value = sampleText;
        triggerSearch();
      }
    });
  });
}

// TOGGLE DE EQUIDADE (RF17 & CA04)
function setupEquityToggle() {
  const toggle = document.getElementById('equity-switch');
  if (!toggle) return;

  toggle.checked = state.isEquityEnabled();
  toggle.addEventListener('change', (e) => {
    state.setEquityEnabled(e.target.checked);
    showToast(
      e.target.checked
        ? 'Regra de Equidade ATIVADA: Novos autônomos recebem destaque proporcional.'
        : 'Regra de Equidade DESATIVADA: Exibição tradicional (somente maior histórico).',
      'info'
    );
    renderProfessionals();
  });
}

// RENDERIZAÇÃO DOS CARDS DE PROFISSIONAIS (RF06, RF13, RF16, RF17)
function renderProfessionals() {
  const grid = document.getElementById('professionals-grid');
  if (!grid) return;

  const equityActive = state.isEquityEnabled();
  const list = getRecommendedProfiles(activeCategoryFilter, activeCityFilter, equityActive);

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <span style="font-size: 2.5rem;">🔍</span>
        <h4 style="margin: 10px 0 6px; font-weight: 700; color:#334155;">Nenhum profissional encontrado com os filtros atuais</h4>
        <p style="color: #64748b; font-size: 0.9rem;">Tente selecionar outra categoria ou a opção "Todas as Cidades de Rondônia".</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 15px;" onclick="resetFilters()">Limpar Filtros</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(pro => {
    const isNewcomer = pro.recem_cadastrado || pro.total_avaliacoes <= 1;
    const boostClass = (equityActive && isNewcomer) ? 'boosted' : '';

    // ETIQUETAS DISCRETAS PARA AVALIAÇÕES E NOVOS PROFISSIONAIS
    let badgeHtml = '';
    if (equityActive && isNewcomer) {
      badgeHtml = `
        <div class="pro-discrete-badge newcomer" title="Regra de Equidade RF17 - Destaque de visibilidade para profissionais recém-cadastrados">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v8"/><path d="m4.93 10.93 4.24 4.24"/><path d="M2 18h8"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22 2 2"/></svg>
          <span>Novo Talento</span>
        </div>
      `;
    } else if (pro.total_avaliacoes > 0) {
      badgeHtml = `
        <div class="pro-discrete-badge rating" title="Nota média de avaliações dos clientes">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <strong>${pro.media_avaliacao.toFixed(1)}</strong>
          <span class="reviews-count">(${pro.total_avaliacoes})</span>
        </div>
      `;
    } else {
      badgeHtml = `
        <div class="pro-discrete-badge neutral">
          <span>Sem avaliações</span>
        </div>
      `;
    }

    // Modalidades/habilidades limitadas para evitar excesso de etiquetas
    let modalitiesHtml = '';
    if (pro.modalidades && pro.modalidades.length > 0) {
      const visible = pro.modalidades.slice(0, 3);
      const remaining = pro.modalidades.length - 3;
      modalitiesHtml = visible.map(m => `<span class="modal-chip">${m}</span>`).join('');
      if (remaining > 0) {
        modalitiesHtml += `<span class="modal-chip modal-chip-more">+${remaining} mais</span>`;
      }
    }

    return `
      <article class="pro-card ${boostClass}">
        <div class="pro-card-top-row">
          <div class="pro-avatar-wrapper">
            <img 
              src="${pro.avatar}" 
              alt="${pro.nome}" 
              class="pro-avatar" 
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'"
            >
          </div>
          <div class="pro-header-details">
            <div class="pro-title-badge-row">
              <h4 class="pro-name">${pro.nome}</h4>
              ${badgeHtml}
            </div>
            <span class="pro-cat-badge">${pro.categoria_nome}</span>
            <div class="pro-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${pro.cidade}, RO</span>
            </div>
          </div>
        </div>

        <p class="pro-bio" title="${pro.experiencia}">${pro.experiencia}</p>

        <div class="modalities-section">
          <span class="modalities-label">Habilidades & Serviços:</span>
          <div class="modalities-chips">
            ${modalitiesHtml}
          </div>
        </div>

        <div class="pro-actions">
          <button class="btn btn-outline btn-sm btn-pro-action-secondary" onclick="openProProfileModal('${pro.id_perfil}')">
            Ver Perfil Completo
          </button>
          <button class="btn btn-primary btn-sm btn-pro-action-primary" onclick="openRequestServiceModal('${pro.id_perfil}')">
            Solicitar Serviço
          </button>
        </div>
      </article>
    `;
  }).join('');
}

window.resetFilters = function() {
  activeCategoryFilter = '';
  activeCityFilter = '';
  const searchInput = document.getElementById('nlp-search-input');
  if (searchInput) searchInput.value = '';
  const feedbackBanner = document.getElementById('ai-feedback-banner');
  if (feedbackBanner) feedbackBanner.classList.remove('active');
  const citySelect = document.getElementById('search-city-filter');
  if (citySelect) citySelect.value = 'todas';
  document.querySelectorAll('.category-chip').forEach(ch => {
    ch.classList.remove('active');
    ch.setAttribute('aria-pressed', 'false');
  });
  renderProfessionals();
};

window.filterByCity = function(cityName) {
  switchTab('tab-home');
  activeCityFilter = cityName;
  const citySelect = document.getElementById('search-city-filter');
  if (citySelect) {
    citySelect.value = cityName;
  }
  renderProfessionals();
  const proSection = document.querySelector('.professionals-section');
  if (proSection) {
    proSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// MODAL DE PERFIL PROFISSIONAL COMPLETO (RF13 & CA03)
window.openProProfileModal = function(perfilId) {
  const profiles = state.getProfiles();
  const users = state.getUsers();
  const pro = profiles.find(p => p.id_perfil === perfilId);
  if (!pro) return;
  const user = users.find(u => u.id === pro.id_usuario) || {};

  const reviews = state.getReviews().filter(r => r.id_profissional === perfilId);

  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = `Perfil de ${user.nome || pro.nome}`;

  const reviewsListHtml = reviews.length > 0 ? reviews.map(r => `
    <div style="border-bottom: 1px solid #f1f5f9; padding: 10px 0;">
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <strong style="font-size:0.85rem; color:#1e293b;">${r.cliente_nome}</strong>
        <span style="color:#f59e0b; font-size:0.85rem;">${'★'.repeat(r.nota)}${'☆'.repeat(5-r.nota)}</span>
      </div>
      <p style="font-size:0.85rem; color:#475569; margin-bottom:4px;">"${r.comentario}"</p>
      <span style="font-size:0.75rem; color:#94a3b8;">${r.data_avaliacao}</span>
    </div>
  `).join('') : '<p style="color:#64748b; font-size:0.85rem; padding: 10px 0;">Ainda não há avaliações cadastradas. Seja o primeiro a contratar!</p>';

  modalBody.innerHTML = `
    <div style="display:flex; gap:16px; align-items:center; margin-bottom:16px;">
      <img src="${pro.avatar}" style="width:70px; height:70px; border-radius:50%; object-fit:cover; border:2px solid #cbd5e1;">
      <div>
        <h4 style="font-size:1.2rem; color:#0f172a; margin-bottom:2px;">${user.nome}</h4>
        <span style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:6px; font-size:0.75rem; font-weight:700;">${pro.categoria_nome}</span>
        <p style="font-size:0.82rem; color:#64748b; margin-top:4px;">📍 Atendimento em: ${pro.cidade}, RO (${pro.bairros || 'Vários bairros'})</p>
      </div>
    </div>

    <div style="margin-bottom:16px;">
      <h5 style="font-size:0.9rem; color:#1e293b; margin-bottom:6px;">Sobre o Profissional & Experiência:</h5>
      <p style="font-size:0.88rem; color:#475569; line-height:1.5;">${pro.experiencia}</p>
    </div>

    <div style="margin-bottom:16px;">
      <h5 style="font-size:0.9rem; color:#1e293b; margin-bottom:6px;">Modalidades de Serviços Prestados:</h5>
      <ul style="padding-left:20px; font-size:0.85rem; color:#334155;">
        ${(pro.modalidades || []).map(m => `<li style="margin-bottom:4px;">${m}</li>`).join('')}
      </ul>
    </div>

    <div style="background:#f8fafc; border-radius:10px; padding:14px; border:1px solid #e2e8f0; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h5 style="font-size:0.9rem; color:#1e293b; font-weight:700;">Avaliações de Clientes em Rondônia</h5>
        <span style="font-weight:700; color:#b45309; font-size:0.9rem;">Nota Média: ${pro.media_avaliacao > 0 ? pro.media_avaliacao.toFixed(1) : 'Nova'} ★</span>
      </div>
      <div>
        ${reviewsListHtml}
      </div>
    </div>

    <div style="display:flex; gap:10px; justify-content:flex-end;">
      <button class="btn btn-outline" onclick="closeGenericModal()">Fechar</button>
      <button class="btn btn-primary" onclick="closeGenericModal(); openRequestServiceModal('${pro.id_perfil}')">Solicitar Orçamento</button>
    </div>
  `;

  openGenericModal();
};

// MODAL DE SOLICITAÇÃO DE SERVIÇO (RF07, RF08 & UC04)
window.openRequestServiceModal = function(perfilId) {
  const profiles = state.getProfiles();
  const users = state.getUsers();
  const pro = profiles.find(p => p.id_perfil === perfilId);
  if (!pro) return;
  const userPro = users.find(u => u.id === pro.id_usuario) || {};

  const currentUser = state.getCurrentUser();

  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = `Solicitar Serviço para ${userPro.nome}`;

  modalBody.innerHTML = `
    <form id="request-service-form" onsubmit="handleSendServiceRequest(event, '${perfilId}', '${pro.categoria_id}', '${pro.categoria_nome}', '${userPro.nome}')">
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:12px; border-radius:8px; margin-bottom:16px; font-size:0.85rem; color:#166534;">
        Você está enviando uma solicitação direta para <strong>${userPro.nome}</strong> (${pro.categoria_nome}) em ${pro.cidade}, RO.
      </div>

      <div class="form-group">
        <label>Seu Nome (Cliente):</label>
        <input type="text" class="form-control" value="${currentUser.nome}" readonly style="background:#f1f5f9;">
      </div>

      <div class="form-group">
        <label>Telefone / WhatsApp para Contato:</label>
        <input type="text" id="req-phone" class="form-control" value="${currentUser.telefone || '(69) 9'}" required>
      </div>

      <div class="form-group">
        <label>Seu Bairro / Cidade em Rondônia:</label>
        <input type="text" id="req-location" class="form-control" placeholder="Ex: Bairro Liberdade, Porto Velho" value="Porto Velho" required>
      </div>

      <div class="form-group">
        <label>Descreva sua necessidade em linguagem comum (RF07):</label>
        <textarea id="req-description" class="search-textarea" rows="4" placeholder="Descreva o que está acontecendo ou o serviço que você precisa..." required></textarea>
      </div>

      <div class="form-group">
        <label>Data Preferencial para Atendimento:</label>
        <input type="date" id="req-date" class="form-control" required value="${new Date().toISOString().split('T')[0]}">
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
        <button type="button" class="btn btn-outline" onclick="closeGenericModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Confirmar e Enviar Pedido</button>
      </div>
    </form>
  `;

  openGenericModal();
};

window.handleSendServiceRequest = function(event, perfilId, catId, catName, proNome) {
  event.preventDefault();
  const currentUser = state.getCurrentUser();
  const desc = document.getElementById('req-description').value;
  const location = document.getElementById('req-location').value;
  const phone = document.getElementById('req-phone').value;

  const newRequest = {
    id_solicitacao: 'req_' + Date.now(),
    id_cliente: currentUser.id,
    cliente_nome: currentUser.nome,
    cliente_telefone: phone,
    id_profissional: perfilId,
    profissional_nome: proNome,
    id_categoria: catId,
    categoria_nome: catName,
    descricao_necessidade: desc,
    cidade: location,
    data_solicitacao: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'PENDENTE',
    avaliado: false
  };

  const requests = state.getRequests();
  requests.unshift(newRequest);
  state.saveRequests(requests);

  closeGenericModal();
  showToast('Solicitação de serviço enviada com sucesso! O prestador receberá no painel dele.', 'success');
  
  // Se for cliente, podemos navegar até o painel
  switchTab('tab-client-dashboard');
};

// PAINEL DO PROFISSIONAL (UC07, RF09, RF10 & RF14)
function renderProDashboard() {
  const container = document.getElementById('pro-dashboard-content');
  if (!container) return;

  const currentUser = state.getCurrentUser();
  const profiles = state.getProfiles();
  const myProfile = profiles.find(p => p.id_usuario === currentUser.id);

  if (!myProfile) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; background:white; border-radius:12px; border:1px solid #e2e8f0;">
        <h3>Você está logado como Cliente (${currentUser.nome})</h3>
        <p style="color:#64748b; margin:10px 0 20px;">Para visualizar o painel do prestador, selecione um prestador no Seletor de Perfil no topo (ex: Marcos Andrade ou Gabriel Menezes) ou cadastre seu perfil profissional.</p>
        <button class="btn btn-primary" onclick="openRegisterModal('PROFISSIONAL')">Quero ser um Prestador</button>
      </div>
    `;
    return;
  }

  const allRequests = state.getRequests();
  const myRequests = allRequests.filter(r => r.id_profissional === myProfile.id_perfil);

  const pending = myRequests.filter(r => r.status === 'PENDENTE').length;
  const active = myRequests.filter(r => r.status === 'ACEITO' || r.status === 'EM_ANDAMENTO').length;
  const completed = myRequests.filter(r => r.status === 'CONCLUIDO').length;

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
      <div>
        <h2 style="font-size:1.5rem; font-weight:800; color:#0f172a;">Painel do Profissional: ${currentUser.nome}</h2>
        <p style="color:#64748b; font-size:0.9rem;">Categoria: <strong>${myProfile.categoria_nome}</strong> | Cidade: <strong>${myProfile.cidade}, RO</strong></p>
      </div>
      <div>
        <button class="btn btn-outline btn-sm" onclick="openEditProfileModal('${myProfile.id_perfil}')" style="display:inline-flex; align-items:center; gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          <span>Editar Meu Perfil Digital</span>
        </button>
      </div>
    </div>

    <div class="dashboard-metrics-grid">
      <div class="metric-card">
        <div class="metric-icon amber" title="Solicitações Pendentes">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="metric-data">
          <h4>Solicitações Pendentes</h4>
          <span>${pending}</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon blue" title="Em Atendimento">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <div class="metric-data">
          <h4>Em Atendimento</h4>
          <span>${active}</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon green" title="Trabalhos Concluídos">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="metric-data">
          <h4>Trabalhos Concluídos</h4>
          <span>${completed}</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon purple" title="Nota de Reputação">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#8b5cf6" stroke="#7c3aed" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div class="metric-data">
          <h4>Nota de Reputação</h4>
          <span>${myProfile.media_avaliacao > 0 ? myProfile.media_avaliacao.toFixed(1) : 'Nova'}</span>
        </div>
      </div>
    </div>

    <div class="requests-container">
      <h3 style="font-size:1.15rem; font-weight:700; color:#0f172a; margin-bottom:16px;">Demandas Recebidas dos Clientes</h3>
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Necessidade / Descrição</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações Disponíveis (RF09/RF10)</th>
            </tr>
          </thead>
          <tbody>
            ${myRequests.length === 0 ? `<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:30px;">Nenhuma solicitação recebida até o momento.</td></tr>` : ''}
            ${myRequests.map(req => `
              <tr>
                <td>
                  <strong>${req.cliente_nome}</strong><br>
                  <span style="font-size:0.75rem; color:#64748b;">📍 ${req.cidade}</span>
                </td>
                <td style="max-width:320px;">
                  <p style="font-size:0.85rem; margin-bottom:2px;">${req.descricao_necessidade}</p>
                </td>
                <td style="font-size:0.8rem; color:#64748b;">${req.data_solicitacao}</td>
                <td>
                  <span class="status-badge ${req.status}">${req.status.replace('_', ' ')}</span>
                </td>
                <td>
                  ${renderProRequestActions(req)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderProRequestActions(req) {
  if (req.status === 'PENDENTE') {
    return `
      <div style="display:flex; gap:8px;">
        <button class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="updateRequestStatus('${req.id_solicitacao}', 'ACEITO')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Aceitar</span>
        </button>
        <button class="btn btn-outline btn-sm" style="color:#ef4444; border-color:#fca5a5; display:inline-flex; align-items:center; gap:5px;" onclick="updateRequestStatus('${req.id_solicitacao}', 'CANCELADO')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <span>Recusar</span>
        </button>
      </div>
    `;
  } else if (req.status === 'ACEITO') {
    return `
      <button class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="updateRequestStatus('${req.id_solicitacao}', 'EM_ANDAMENTO')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Iniciar Atendimento</span>
      </button>
    `;
  } else if (req.status === 'EM_ANDAMENTO') {
    return `
      <button class="btn btn-primary btn-sm" style="background:#10b981; border-color:#059669; display:inline-flex; align-items:center; gap:5px;" onclick="updateRequestStatus('${req.id_solicitacao}', 'CONCLUIDO')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Concluir Atendimento</span>
      </button>
    `;
  } else {
    return `<span style="font-size:0.8rem; color:#94a3b8; font-weight:600;">Atendimento Finalizado</span>`;
  }
}

window.updateRequestStatus = function(reqId, newStatus) {
  const reqs = state.getRequests();
  const target = reqs.find(r => r.id_solicitacao === reqId);
  if (target) {
    target.status = newStatus;
    state.saveRequests(reqs);
    showToast(`Status da solicitação atualizado para: ${newStatus}`, 'success');
    renderProDashboard();
    renderClientDashboard();
  }
};

// PAINEL DO CLIENTE (UC04, UC05, UC06, RF11 & CA05)
function renderClientDashboard() {
  const container = document.getElementById('client-dashboard-content');
  if (!container) return;

  const currentUser = state.getCurrentUser();
  const allRequests = state.getRequests();
  const myRequests = allRequests.filter(r => r.id_cliente === currentUser.id);

  container.innerHTML = `
    <div style="margin-bottom:24px;">
      <h2 style="font-size:1.5rem; font-weight:800; color:#0f172a;">Minhas Solicitações de Serviços</h2>
      <p style="color:#64748b; font-size:0.9rem;">Acompanhe o andamento das solicitações feitas aos profissionais de Rondônia.</p>
    </div>

    <div class="requests-container">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Profissional</th>
              <th>Área / Categoria</th>
              <th>Descrição do Pedido</th>
              <th>Data</th>
              <th>Status Atual</th>
              <th>Avaliação & Feedback (RF11)</th>
            </tr>
          </thead>
          <tbody>
            ${myRequests.length === 0 ? `<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:30px;">Você ainda não fez solicitações de serviço. Utilize a busca na página inicial!</td></tr>` : ''}
            ${myRequests.map(req => `
              <tr>
                <td><strong>${req.profissional_nome}</strong></td>
                <td><span class="pro-cat-badge">${req.categoria_nome}</span></td>
                <td style="max-width:280px;"><p style="font-size:0.85rem;">${req.descricao_necessidade}</p></td>
                <td style="font-size:0.8rem; color:#64748b;">${req.data_solicitacao}</td>
                <td><span class="status-badge ${req.status}">${req.status.replace('_', ' ')}</span></td>
                <td>
                  ${req.status === 'CONCLUIDO' 
                    ? (req.avaliado 
                        ? `<span style="color:#10b981; font-size:0.8rem; font-weight:700; display:inline-flex; align-items:center; gap:4px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>Avaliado</span>`
                        : `<button class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:5px;" onclick="openReviewModal('${req.id_solicitacao}', '${req.id_profissional}', '${req.profissional_nome}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" stroke-width="1" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>Avaliar Atendimento</span></button>`)
                    : `<span style="color:#94a3b8; font-size:0.8rem;">Disponível após conclusão</span>`}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// MODAL DE AVALIAÇÃO (RF11, RF12, RF13 & CA05)
window.openReviewModal = function(solicitacaoId, proId, proNome) {
  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = `Avaliar Serviço de ${proNome}`;

  modalBody.innerHTML = `
    <form id="review-form" onsubmit="handleSaveReview(event, '${solicitacaoId}', '${proId}', '${proNome}')">
      <div style="text-align:center; margin-bottom:20px;">
        <p style="font-size:0.9rem; color:#475569; margin-bottom:10px;">Como foi o atendimento e a qualidade do trabalho executado?</p>
        <div class="rating-stars-input" id="stars-selector" style="justify-content:center;">
          <span class="star active" data-score="1" onclick="setReviewScore(1)">★</span>
          <span class="star active" data-score="2" onclick="setReviewScore(2)">★</span>
          <span class="star active" data-score="3" onclick="setReviewScore(3)">★</span>
          <span class="star active" data-score="4" onclick="setReviewScore(4)">★</span>
          <span class="star active" data-score="5" onclick="setReviewScore(5)">★</span>
        </div>
        <input type="hidden" id="review-score-val" value="5">
      </div>

      <div class="form-group">
        <label>Comentário e Feedback Detalhado:</label>
        <textarea id="review-comment" class="search-textarea" rows="4" placeholder="Conte como foi sua experiência, pontualidade, qualidade do serviço prestado..." required></textarea>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeGenericModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Registrar Avaliação e Publicar</button>
      </div>
    </form>
  `;

  openGenericModal();
};

window.setReviewScore = function(score) {
  document.getElementById('review-score-val').value = score;
  const stars = document.querySelectorAll('#stars-selector .star');
  stars.forEach((s, idx) => {
    if (idx < score) s.classList.add('active');
    else s.classList.remove('active');
  });
};

window.handleSaveReview = function(event, reqId, proId, proNome) {
  event.preventDefault();
  const currentUser = state.getCurrentUser();
  const nota = parseInt(document.getElementById('review-score-val').value);
  const comentario = document.getElementById('review-comment').value;

  const newReview = {
    id_avaliacao: 'rev_' + Date.now(),
    id_solicitacao: reqId,
    id_profissional: proId,
    cliente_nome: currentUser.nome,
    nota: nota,
    comentario: comentario,
    data_avaliacao: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  const reviews = state.getReviews();
  reviews.unshift(newReview);
  state.saveReviews(reviews);

  // Marcar solicitação como avaliada
  const requests = state.getRequests();
  const req = requests.find(r => r.id_solicitacao === reqId);
  if (req) req.avaliado = true;
  state.saveRequests(requests);

  // RECALCULAR MÉDIA DE AVALIAÇÃO AUTOMATICAMENTE (RF12)
  const profiles = state.getProfiles();
  const pro = profiles.find(p => p.id_perfil === proId);
  if (pro) {
    const proReviews = reviews.filter(r => r.id_profissional === proId);
    const sum = proReviews.reduce((acc, curr) => acc + curr.nota, 0);
    pro.media_avaliacao = Number((sum / proReviews.length).toFixed(1));
    pro.total_avaliacoes = proReviews.length;
    pro.recem_cadastrado = false; // Ganhou reputação
    state.saveProfiles(profiles);
  }

  closeGenericModal();
  showToast('Avaliação registrada com sucesso! A média do profissional foi recalculada.', 'success');
  renderClientDashboard();
  renderProfessionals();
};

// PAINEL ADMINISTRATIVO & MODERAÇÃO (UC09, RF18 & CA06)
function renderAdminDashboard() {
  const container = document.getElementById('admin-dashboard-content');
  if (!container) return;

  const users = state.getUsers();
  const profiles = state.getProfiles();
  const requests = state.getRequests();
  const reports = state.getReports();

  container.innerHTML = `
    <div style="margin-bottom:24px;">
      <h2 style="font-size:1.5rem; font-weight:800; color:#0f172a;">Painel Administrativo & Moderação Regional</h2>
      <p style="color:#64748b; font-size:0.9rem;">Monitoramento de demandas em Rondônia, moderação de denúncias e métricas de mercado autônomo.</p>
    </div>

    <div class="dashboard-metrics-grid">
      <div class="metric-card">
        <div class="metric-icon green" title="Profissionais Ativos Cadastrados">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="metric-data">
          <h4>Profissionais Ativos</h4>
          <span>${profiles.length}</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon blue" title="Municípios com Prestadores em Rondônia">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div class="metric-data">
          <h4>Cidades Atendidas em RO</h4>
          <span>6 Cidades</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon amber" title="População Ocupada por Conta Própria (IBGE)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
        </div>
        <div class="metric-data">
          <h4>Autonomia Regional</h4>
          <span>35,3% (IBGE)</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon purple" title="Fila de Ocorrências Pendentes de Análise">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="metric-data">
          <h4>Denúncias em Aberto</h4>
          <span>${reports.length}</span>
        </div>
      </div>
    </div>

    <!-- GRÁFICOS / BARRAS DE DEMANDA REGIONAL EM RONDÔNIA -->
    <div style="background:white; border-radius:12px; border:1px solid #e2e8f0; padding:20px; margin-bottom:25px;">
      <h4 style="font-size:1rem; font-weight:700; color:#0f172a; margin-bottom:14px;">Distribuição de Demandas por Região de Rondônia</h4>
      
      <div style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
          <span>Porto Velho (Capital)</span>
          <strong>62% das solicitações</strong>
        </div>
        <div style="height:10px; background:#e2e8f0; border-radius:10px; overflow:hidden;">
          <div style="width:62%; height:100%; background:#15803d;"></div>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
          <span>Ji-Paraná (Região Central)</span>
          <strong>18% das solicitações</strong>
        </div>
        <div style="height:10px; background:#e2e8f0; border-radius:10px; overflow:hidden;">
          <div style="width:18%; height:100%; background:#0284c7;"></div>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
          <span>Ariquemes (Vale do Jamari)</span>
          <strong>12% das solicitações</strong>
        </div>
        <div style="height:10px; background:#e2e8f0; border-radius:10px; overflow:hidden;">
          <div style="width:12%; height:100%; background:#f59e0b;"></div>
        </div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
          <span>Cacoal & Demais Cidades</span>
          <strong>8% das solicitações</strong>
        </div>
        <div style="height:10px; background:#e2e8f0; border-radius:10px; overflow:hidden;">
          <div style="width:8%; height:100%; background:#8b5cf6;"></div>
        </div>
      </div>
    </div>

    <!-- GESTÃO DE DENÚNCIAS E MODERAÇÃO (CA06) -->
    <div class="requests-container">
      <h3 style="font-size:1.15rem; font-weight:700; color:#0f172a; margin-bottom:16px;">Fila de Moderação e Gestão de Denúncias (CA06)</h3>
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Alvo da Ocorrência</th>
              <th>Motivo Relatado</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ação de Moderação</th>
            </tr>
          </thead>
          <tbody>
            ${reports.length === 0 ? `<tr><td colspan="6" style="text-align:center; color:#10b981; padding:20px;">Nenhuma denúncia pendente. Comunidade segura!</td></tr>` : ''}
            ${reports.map(rep => `
              <tr>
                <td><span class="pro-cat-badge">${rep.tipo}</span></td>
                <td><strong>${rep.alvo_nome}</strong></td>
                <td><p style="font-size:0.85rem;">${rep.motivo}</p></td>
                <td style="font-size:0.8rem; color:#64748b;">${rep.data}</td>
                <td><span class="status-badge PENDENTE">${rep.status}</span></td>
                <td>
                  <button class="btn btn-outline btn-sm" style="color:#ef4444; border-color:#fca5a5;" onclick="resolveReport('${rep.id_denuncia}')">
                    Remover e Notificar Usuário (CA06)
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.resolveReport = function(repId) {
  let reports = state.getReports();
  reports = reports.filter(r => r.id_denuncia !== repId);
  state.saveReports(reports);
  showToast('Denúncia moderada com sucesso. Registro removido e usuário advertido conforme CA06.', 'success');
  renderAdminDashboard();
};

// MODAIS AUXILIARES (CADASTRO, EDIÇÃO, RECUPERAÇÃO DE SENHA)
function setupModals() {
  const genericModal = document.getElementById('generic-modal');
  const closeBtn = document.getElementById('btn-close-generic-modal');
  if (closeBtn && genericModal) {
    closeBtn.addEventListener('click', closeGenericModal);
    genericModal.addEventListener('click', (e) => {
      if (e.target === genericModal) closeGenericModal();
    });
  }
}

function openGenericModal() {
  const m = document.getElementById('generic-modal');
  if (m) m.classList.add('active');
}

function closeGenericModal() {
  const m = document.getElementById('generic-modal');
  if (m) m.classList.remove('active');
}

window.closeGenericModal = closeGenericModal;

// MODAL DE CADASTRO (RF01)
window.openRegisterModal = function(defaultType = 'CLIENTE') {
  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = 'Criar Nova Conta no ConectaRO';

  modalBody.innerHTML = `
    <form id="register-user-form" onsubmit="handleUserRegistration(event)">
      <div class="form-group">
        <label>Tipo de Conta (RF01):</label>
        <select id="reg-type" class="form-select" onchange="toggleProRegisterFields(this.value)">
          <option value="CLIENTE" ${defaultType === 'CLIENTE' ? 'selected' : ''}>Contratante (Cliente em busca de serviços)</option>
          <option value="PROFISSIONAL" ${defaultType === 'PROFISSIONAL' ? 'selected' : ''}>Prestador de Serviços (Autônomo / Empreendedor)</option>
        </select>
      </div>

      <div class="form-group">
        <label>Nome Completo:</label>
        <input type="text" id="reg-nome" class="form-control" placeholder="Ex: Maria Ferreira" required>
      </div>

      <div class="form-group">
        <label>E-mail de Acesso:</label>
        <input type="email" id="reg-email" class="form-control" placeholder="seuemail@exemplo.com" required>
      </div>

      <div class="form-group">
        <label>Telefone / WhatsApp (DDD 69):</label>
        <input type="text" id="reg-telefone" class="form-control" placeholder="(69) 99999-0000" required>
      </div>

      <div class="form-group">
        <label>Cidade em Rondônia:</label>
        <select id="reg-cidade" class="form-select" required>
          <option value="Porto Velho">Porto Velho</option>
          <option value="Ji-Paraná">Ji-Paraná</option>
          <option value="Ariquemes">Ariquemes</option>
          <option value="Cacoal">Cacoal</option>
          <option value="Vilhena">Vilhena</option>
          <option value="Jaru">Jaru</option>
          <option value="Rolim de Moura">Rolim de Moura</option>
          <option value="Guajará-Mirim">Guajará-Mirim</option>
        </select>
      </div>

      <!-- CAMPOS EXCLUSIVOS DO PROFISSIONAL (RF04/RF05) -->
      <div id="pro-exclusive-fields" style="display:${defaultType === 'PROFISSIONAL' ? 'block' : 'none'}; background:#f8fafc; padding:14px; border-radius:8px; border:1px solid #cbd5e1; margin-bottom:16px;">
        <h5 style="font-size:0.85rem; color:#1e293b; margin-bottom:8px; font-weight:700;">Dados Profissionais (RF04)</h5>
        
        <div class="form-group">
          <label>Área Técnica de Atuação:</label>
          <select id="reg-categoria" class="form-select">
            ${state.getCategories().map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label>Resumo de Qualificações & Experiência:</label>
          <textarea id="reg-experiencia" class="form-control" rows="3" placeholder="Fale sobre seus anos de serviço, trabalhos realizados..."></textarea>
        </div>

        <div class="form-group">
          <label>Modalidades de Serviços (separadas por vírgula):</label>
          <input type="text" id="reg-modalidades" class="form-control" placeholder="Ex: Conserto, Instalação, Orçamento sem compromisso">
        </div>
      </div>

      <div class="form-group">
        <label>Senha de Acesso (RNF01 - Protegida por Hash):</label>
        <input type="password" id="reg-senha" class="form-control" placeholder="Mínimo 6 caracteres" required minlength="6">
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
        <button type="button" class="btn btn-outline" onclick="closeGenericModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Concluir Cadastro</button>
      </div>
    </form>
  `;

  openGenericModal();
};

window.toggleProRegisterFields = function(val) {
  const el = document.getElementById('pro-exclusive-fields');
  if (el) el.style.display = (val === 'PROFISSIONAL') ? 'block' : 'none';
};

window.handleUserRegistration = function(e) {
  e.preventDefault();
  const tipo = document.getElementById('reg-type').value;
  const nome = document.getElementById('reg-nome').value;
  const email = document.getElementById('reg-email').value;
  const telefone = document.getElementById('reg-telefone').value;
  const cidade = document.getElementById('reg-cidade').value;

  const users = state.getUsers();
  const newUserId = 'u_' + Date.now();
  const newUser = { id: newUserId, nome, email, telefone, tipo, cidade };
  users.push(newUser);
  state.saveUsers(users);

  if (tipo === 'PROFISSIONAL') {
    const catId = document.getElementById('reg-categoria').value;
    const catObj = state.getCategories().find(c => c.id === catId);
    const exp = document.getElementById('reg-experiencia').value || 'Profissional atuante na região de Rondônia.';
    const modStr = document.getElementById('reg-modalidades').value || 'Atendimento domiciliar, Orçamento';
    const modalidades = modStr.split(',').map(m => m.trim()).filter(Boolean);

    const profiles = state.getProfiles();
    const newProfile = {
      id_perfil: 'p_' + Date.now(),
      id_usuario: newUserId,
      categoria_id: catId,
      categoria_nome: catObj ? catObj.name : 'Serviços Gerais',
      cidade: cidade,
      bairros: 'Centro e bairros vizinhos',
      experiencia: exp,
      modalidades: modalidades,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      media_avaliacao: 0.0,
      total_avaliacoes: 0,
      recem_cadastrado: true,
      verificado: true
    };
    profiles.unshift(newProfile);
    state.saveProfiles(profiles);
  }

  state.setCurrentUser(newUser);
  updateHeaderUserInfo();
  closeGenericModal();
  showToast(`Bem-vindo(a) ao ConectaRO, ${nome}! Cadastro efetuado com sucesso.`, 'success');
  
  if (tipo === 'PROFISSIONAL') switchTab('tab-pro-dashboard');
  else switchTab('tab-home');
  renderProfessionals();
};

// MODAL DE EDIÇÃO DE PERFIL PROFISSIONAL (RF04 & CA03)
window.openEditProfileModal = function(perfilId) {
  const profiles = state.getProfiles();
  const pro = profiles.find(p => p.id_perfil === perfilId);
  if (!pro) return;

  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = 'Editar Perfil Profissional';

  modalBody.innerHTML = `
    <form id="edit-profile-form" onsubmit="handleSaveProfileEdit(event, '${perfilId}')">
      <div class="form-group">
        <label>Cidade de Atendimento:</label>
        <select id="edit-cidade" class="form-select">
          <option value="Porto Velho" ${pro.cidade === 'Porto Velho' ? 'selected' : ''}>Porto Velho</option>
          <option value="Ji-Paraná" ${pro.cidade === 'Ji-Paraná' ? 'selected' : ''}>Ji-Paraná</option>
          <option value="Ariquemes" ${pro.cidade === 'Ariquemes' ? 'selected' : ''}>Ariquemes</option>
          <option value="Cacoal" ${pro.cidade === 'Cacoal' ? 'selected' : ''}>Cacoal</option>
          <option value="Vilhena" ${pro.cidade === 'Vilhena' ? 'selected' : ''}>Vilhena</option>
        </select>
      </div>

      <div class="form-group">
        <label>Regiões / Bairros atendidos:</label>
        <input type="text" id="edit-bairros" class="form-control" value="${pro.bairros || ''}" required>
      </div>

      <div class="form-group">
        <label>Resumo de Experiências e Qualificações (RF04):</label>
        <textarea id="edit-experiencia" class="form-control" rows="4" required>${pro.experiencia}</textarea>
      </div>

      <div class="form-group">
        <label>Modalidades de Serviços (separadas por vírgula):</label>
        <input type="text" id="edit-modalidades" class="form-control" value="${(pro.modalidades || []).join(', ')}" required>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
        <button type="button" class="btn btn-outline" onclick="closeGenericModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
      </div>
    </form>
  `;

  openGenericModal();
};

window.handleSaveProfileEdit = function(e, perfilId) {
  e.preventDefault();
  const profiles = state.getProfiles();
  const pro = profiles.find(p => p.id_perfil === perfilId);
  if (pro) {
    pro.cidade = document.getElementById('edit-cidade').value;
    pro.bairros = document.getElementById('edit-bairros').value;
    pro.experiencia = document.getElementById('edit-experiencia').value;
    const modStr = document.getElementById('edit-modalidades').value;
    pro.modalidades = modStr.split(',').map(m => m.trim()).filter(Boolean);

    state.saveProfiles(profiles);
    closeGenericModal();
    showToast('Perfil profissional atualizado com sucesso!', 'success');
    renderProDashboard();
    renderProfessionals();
  }
};

// RECUPERAÇÃO DE SENHA (RF03 & UC03)
window.openRecoverPasswordModal = function() {
  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = 'Recuperação de Senha (UC03)';

  modalBody.innerHTML = `
    <form onsubmit="handlePasswordRecovery(event)">
      <p style="font-size:0.88rem; color:#475569; margin-bottom:14px;">
        Informe seu e-mail cadastrado. Um token de segurança temporário será gerado e enviado para seu correio eletrônico.
      </p>

      <div class="form-group">
        <label>E-mail Cadastrado:</label>
        <input type="email" id="rec-email" class="form-control" placeholder="seuemail@exemplo.com" required>
      </div>

      <div id="token-box" style="display:none; background:#ecfdf5; border:1px solid #6ee7b7; padding:12px; border-radius:8px; margin-bottom:14px; font-size:0.85rem; color:#065f46;">
        🔑 <strong>Token Seguro Enviado com Sucesso!</strong><br>
        Código gerado: <strong style="letter-spacing:2px; font-size:1.1rem; color:#047857;">RO-89421</strong><br>
        <small>Use este token para redefinir sua nova senha.</small>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-outline" onclick="closeGenericModal()">Fechar</button>
        <button type="submit" id="btn-send-token" class="btn btn-primary">Gerar Token por E-mail</button>
      </div>
    </form>
  `;

  openGenericModal();
};

window.handlePasswordRecovery = function(e) {
  e.preventDefault();
  const tokenBox = document.getElementById('token-box');
  const sendBtn = document.getElementById('btn-send-token');
  if (tokenBox) {
    tokenBox.style.display = 'block';
    if (sendBtn) sendBtn.textContent = 'Token Enviado!';
    showToast('Token de recuperação enviado para o e-mail informado!', 'info');
  }
};

// MODAL COM DADOS ACADÊMICOS DO SIMULADO CENTELHA 3 (EVELYN LAÍS - IFRO)
window.openProjectDetailsModal = function() {
  const modalBody = document.getElementById('generic-modal-body');
  const modalTitle = document.getElementById('generic-modal-title');
  if (!modalBody || !modalTitle) return;

  modalTitle.textContent = 'Projeto CONECTARO — Programa Centelha 3 Rondônia';

  modalBody.innerHTML = `
    <div style="font-size:0.88rem; color:#334155; line-height:1.6;">
      <div style="background:#eff6ff; border:1px solid #bfdbfe; padding:12px; border-radius:8px; margin-bottom:16px;">
        <strong style="color:#1e40af;">Identificação Acadêmica:</strong><br>
        • <strong>Estudante:</strong> Evelyn Laí da Costa Caires<br>
        • <strong>Turma:</strong> 3º B Informática — IFRO (Instituto Federal de Rondônia)<br>
        • <strong>Edital:</strong> Simulado Centelha 3 Rondônia — Fase 1 (Ideias Inovadoras)<br>
        • <strong>Vídeo Pitch:</strong> <a href="https://youtu.be/k0UBDftMMrY?is=LMC9Lgzv4qVHZ4Bt" target="_blank" style="color:#0284c7; text-decoration:underline; font-weight:700;">Assistir Pitch no YouTube</a>
      </div>

      <h5 style="color:#0f172a; font-weight:700; margin-bottom:6px;">Diferencial Inovador da Proposta (RF15 & RF17):</h5>
      <p style="margin-bottom:10px;">
        Ao contrário de plataformas nacionais amplas (como GetNinjas), o <strong>CONECTARO</strong> foca na realidade socioeconômica de Rondônia (onde <strong>35,3%</strong> dos trabalhadores atuam por conta própria).
      </p>
      <ul style="padding-left:20px; margin-bottom:14px;">
        <li><strong>Processamento Inteligente (IA):</strong> Interpreta pedidos em linguagem coloquial e conecta à categoria exata.</li>
        <li><strong>Regra de Equidade de Visibilidade:</strong> Evita que os profissionais com mais tempo monopolizem o topo, abrindo espaço para novos autônomos.</li>
        <li><strong>Foco Regional:</strong> Adaptado aos bairros e cidades do ecossistema de Rondônia.</li>
      </ul>

      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-primary" onclick="closeGenericModal()">Entendido</button>
      </div>
    </div>
  `;

  openGenericModal();
};

// TOAST NOTIFICATIONS
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
