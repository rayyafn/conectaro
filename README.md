# CONECTARO — Plataforma Digital de Serviços para Rondônia

> **Simulado Programa Centelha 3 Rondônia — Fase 1 (Ideias Inovadoras)**  
> **Estudante:** Evelyn Laí da Costa Caires  
> **Turma:** 3º B Informática — IFRO (Instituto Federal de Educação, Ciência e Tecnologia de Rondônia)  
> **Vídeo Pitch:** [Assistir no YouTube](https://youtu.be/k0UBDftMMrY?is=LMC9Lgzv4qVHZ4Bt)

---

## 1. Visão Geral do Projeto

O **CONECTARO** é uma plataforma digital desenvolvida para solucionar a dificuldade de encontrar prestadores de serviços confiáveis de forma rápida e segura, além de combater a baixa visibilidade digital de trabalhadores autônomos e pequenos empreendedores no estado de Rondônia (com foco inicial na capital **Porto Velho** e expansão para **Ji-Paraná**, **Ariquemes**, **Cacoal**, **Vilhena** e demais municípios).

### Dados Socioeconômicos Relevantes (IBGE 2025):
- **Trabalho por conta própria no Brasil:** ~26,1 milhões de pessoas.
- **Taxa de informalidade nacional:** 38,1% da população ocupada.
- **Representatividade em Rondônia:** **35,3%** da população ocupada trabalha por conta própria (um dos maiores percentuais do país).
- **Gargalo:** Dependência excessiva de canais informais (grupos de WhatsApp, indicações boca a boca) e falta de plataformas focadas nas particularidades da região norte.

---

## 2. Diferenciais Inovadores

1. **Processamento Inteligente por Linguagem Natural (PLN / IA - RF15 & CA02):**
   O cliente pode descrever sua necessidade em linguagem cotidiana livre (ex: *"meu computador está muito lento e não abre programas"* ou *"chuveiro queimado e vazamento"*). O sistema interpreta a intenção e faz a categorização técnica imediata.
2. **Algoritmo com Regra de Equidade de Visibilidade (RF17 & CA04):**
   Diferente de plataformas nacionais (como o GetNinjas), onde apenas prestadores antigos com centenas de avaliações monopolizam o topo das buscas, o ConectaRO equilibra as recomendações, reservando posições nobres de destaque para **novos talentos e recém-cadastrados** (ex: recém-formados do IFRO).
3. **Foco e Identidade Regional em Rondônia:**
   Filtros inteligentes por cidades e bairros polos de Rondônia, valorizando o comércio de serviços da própria comunidade.

---

## 3. Estrutura de Arquivos da Plataforma

```
conectaro/
│
├── index.html           # Interface principal completa, moderna e responsiva
├── styles.css           # Folha de estilos personalizada (Cores Amazônia & Tech)
├── app.js               # Lógica de negócio, motor de IA heurística, equidade e armazenamento
├── database.sql         # Script SQL relacional (DDL, DML, triggers e integridade)
├── server.py            # Servidor HTTP local e API REST (zero dependências externas)
└── README.md            # Documentação técnica e acadêmica do projeto
```

---

## 4. Como Executar a Aplicação

### Opção 1: Abrir diretamente no Navegador (Mais Rápido)
Basta dar dois cliques no arquivo `index.html` ou abri-lo com qualquer navegador moderno (Google Chrome, Firefox, Microsoft Edge ou Safari). Toda a interatividade, armazenamento local (`localStorage`) e motor de IA funcionam instantaneamente sem necessidade de instalar nada!

### Opção 2: Executar via Servidor Python Local
No terminal (PowerShell / CMD), dentro da pasta do projeto, execute:
```bash
python server.py
```
Em seguida, abra o navegador e acesse:
```
http://localhost:8000
```

---

## 5. Mapeamento de Requisitos e Casos de Uso

| Código | Requisito / Caso de Uso | Como Testar na Plataforma |
| :--- | :--- | :--- |
| **UC01 / RF01** | Autocadastro de Usuários | Clique em "+ Cadastrar Serviço" no topo e crie contas de Cliente ou Prestador. |
| **RF02 / CA01** | Autenticação & Redirecionamento | Use o seletor rápido no topo para alternar entre Cliente, Eletricista, TI ou Admin. |
| **UC03 / RF03** | Recuperação de Senha | No rodapé, clique em "Recuperação de Senha" para simular o token seguro enviado ao e-mail. |
| **UC04 / RF07 / RF15 / CA02** | Busca em Linguagem Comum com IA | Na barra de busca, digite *"computador lento"* ou use os botões de amostra. A IA identificará a categoria técnica automaticamente. |
| **RF08 / RF09 / RF10 / UC05** | Ciclo de Solicitação de Serviço | Solicite um serviço, mude para o perfil do prestador no topo e veja os botões para *Aceitar*, *Iniciar* e *Concluir*. |
| **RF11 / RF12 / RF13 / CA05** | Avaliação & Recálculo de Média | Após o serviço ser concluído, avalie com estrelas e comentário. A média geral do profissional é recalculada em tempo real. |
| **RF14 / UC07** | Dashboard do Profissional | Acesse a aba "Painel do Prestador" para visualizar métricas, atendimentos em aberto e histórico. |
| **RF17 / CA04** | Regra de Equidade de Visibilidade | Alterne a chave *"Equidade Justa"*. Observe o profissional Gabriel Menezes (novato IFRO sem histórico) ganhar posição de destaque ao lado de veteranos. |
| **RF18 / UC09 / CA06** | Painel Administrativo & Moderação | Acesse "Painel Administrativo" para visualizar a distribuição das demandas em Rondônia e moderar denúncias. |

---

## 6. Modelo Relacional de Banco de Dados (`database.sql`)

O banco foi modelado com integridade referencial rígida:
- **`Usuario`**: Autenticação (hash de senhas), dados cadastrais e perfil de acesso (`CLIENTE`, `PROFISSIONAL`, `ADMIN`).
- **`PerfilProfissional`**: Dados do prestador, biografia, bairros/cidades de atendimento, média de avaliação e flag de recém-cadastrado.
- **`CategoriaServico`**: Áreas de atuação técnica em Rondônia.
- **`ServicoProfissional`**: Modalidades de serviços prestados associados à categoria.
- **`SolicitacaoServico`**: Registro das demandas em linguagem natural, localização e máquina de estados (`PENDENTE` -> `ACEITO` -> `EM_ANDAMENTO` -> `CONCLUIDO` -> `CANCELADO`).
- **`Avaliacao`**: Notas de 1 a 5, depoimentos reais e cálculo automatizado via trigger SQL.
- **`Denuncia`**: Moderação gerencial e proteção da comunidade conforme CA06 e LGPD.
