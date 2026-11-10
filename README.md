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

## 3. Instalação e Execução

### 3.1 Ambiente
- **Linguagem e Versão:** Python 3.10+ (ou superior) e JavaScript ES2022 (nativo no navegador).
- **Servidor ou Ambiente Local:**
  - Servidor embutido do Python (`server.py`), ou
  - XAMPP / Apache (`htdocs`), ou
  - Extensão Live Server (VS Code).
- **Bibliotecas e Dependências:**
  - **Zero dependências externas** no backend (utiliza os módulos nativos `http.server`, `socketserver`, `json` e `urllib` da biblioteca padrão do Python).
  - No frontend, utiliza JavaScript e CSS nativos. Não requer comandos de compilação ou instalação como `npm install` ou `composer install`.
- **Sistema Operacional Testado:** Windows 10 / Windows 11 (também compatível com Linux e macOS).

---

### 3.2 Banco de Dados
- **SGBD e Versão:** MySQL 8.0+ ou MariaDB 10.4+ (padrão XAMPP/WampServer).
- **Nome do Banco de Dados:** `conectaro_db`
- **Caminho do Script SQL:** [`database.sql`](./database.sql)
  - **Como Executar via Terminal:**
    ```bash
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS conectaro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    mysql -u root -p conectaro_db < database.sql
    ```
  - **Como Executar via phpMyAdmin:**
    Acesse `http://localhost/phpmyadmin`, crie o banco `conectaro_db` com collation `utf8mb4_unicode_ci` e na aba **Importar**, envie o arquivo `database.sql`.

#### Modelo de Tabelas do Banco de Dados:

| Tabela | Campos principais | Chave primária | Relacionamentos |
| :--- | :--- | :--- | :--- |
| **Usuario** | id_usuario, nome, email, senha_hash, telefone, tipo_usuario, cidade, data_cadastro | id_usuario | — |
| **PerfilProfissional** | id_perfil, id_usuario, descricao_experiencia, cidade, regiao_atendimento, media_avaliacao, total_avaliacoes, recem_cadastrado, avatar_url, verificado | id_perfil | id_usuario → Usuario.id_usuario |
| **CategoriaServico** | id_categoria, nome_categoria, descricao, icone, ativo | id_categoria | — |
| **ServicoProfissional** | id_servico_prof, id_perfil, id_categoria, descricao_modalidade | id_servico_prof | id_perfil → PerfilProfissional.id_perfil<br>id_categoria → CategoriaServico.id_categoria |
| **SolicitacaoServico** | id_solicitacao, id_cliente, id_profissional, id_categoria, descricao_necessidade, endereco_atendimento, status, data_solicitacao, data_finalizacao | id_solicitacao | id_cliente → Usuario.id_usuario<br>id_profissional → PerfilProfissional.id_perfil<br>id_categoria → CategoriaServico.id_categoria |
| **Avaliacao** | id_avaliacao, id_solicitacao, nota, comentario, data_avaliacao | id_avaliacao | id_solicitacao → SolicitacaoServico.id_solicitacao |
| **Denuncia** | id_denuncia, id_denunciante, id_alvo_usuario, id_alvo_avaliacao, motivo, status, data_registro | id_denuncia | id_denunciante → Usuario.id_usuario |

- **Dados Iniciais (Seed Data):** O arquivo `database.sql` **já insere automaticamente**:
  - 8 categorias de serviços essenciais de Rondônia (Informática, Elétrica, Hidráulica, Design, Fotografia, Aulas, Reformas, Estética).
  - 5 contas de usuários de teste com perfis diversificados (1 Cliente, 3 Prestadores autônomos de Porto Velho, 1 Administrador).
  - 3 perfis profissionais ativos, incluindo profissional recém-formado do IFRO para teste da regra de equidade de visibilidade.
  - 1 Trigger SQL (`trg_atualizar_media_avaliacao`) para cálculo automático e recálculo da nota média ao registrar avaliações.

---

### 3.3 Variáveis de Ambiente
O repositório possui o arquivo [`.env.example`](./.env.example). Para configurar seu ambiente local:
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
   *(No Windows PowerShell: `Copy-Item .env.example .env`)*

2. Explicação de cada variável:

```ini
# .env.example
PORT=8000                               # Porta TCP onde o servidor HTTP local escutará
ENVIRONMENT=development                # Ambiente de execução (development ou production)
DB_HOST=localhost                       # Endereço do servidor MySQL/MariaDB
DB_PORT=3306                            # Porta padrão do MySQL
DB_NAME=conectaro_db                    # Nome do banco de dados relacional
DB_USER=root                            # Usuário do banco de dados
DB_PASS=                                # Senha do usuário do banco (em branco no XAMPP)
SESSION_SECRET=chave_secreta_local      # Segredo para assinatura de sessão/token
```

---

### 3.4 Passo a Passo de Instalação

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/rayyafn/conectaro.git
   ```

2. **Acessar o diretório do projeto e verificar dependências:**
   ```bash
   cd conectaro
   ```
   *(Não é necessário executar comando de instalação de dependências, pois o projeto utiliza a biblioteca padrão do Python e JavaScript nativo).*

3. **Criar o banco `conectaro_db` e importar `database.sql`:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS conectaro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   mysql -u root -p conectaro_db < database.sql
   ```
   *(Ou importe o arquivo `database.sql` pelo phpMyAdmin)*.

4. **Copiar `.env.example` para `.env` e ajustar os dados do banco local:**
   - No Linux/macOS:
     ```bash
     cp .env.example .env
     ```
   - No Windows (PowerShell):
     ```powershell
     Copy-Item .env.example .env
     ```

5. **Iniciar o servidor:**
   - **Comando exato via Python:**
     ```bash
     python server.py
     ```
   - **Ou no caso do XAMPP:**
     Copie a pasta `conectaro` para `C:\xampp\htdocs\conectaro` e clique em **Start** no Apache pelo painel do XAMPP.

6. **Abrir no navegador o endereço exato:**
   - Se rodando via `server.py`:
     `http://localhost:8000`
   - Se rodando via XAMPP:
     `http://localhost/conectaro`
   - Ou acessar a versão publicada no GitHub Pages:
     `https://rayyafn.github.io/conectaro/`

---

## 4. Estrutura de Arquivos da Plataforma

```
conectaro/
│
├── .env.example         # Exemplo de configuração de variáveis de ambiente locais
├── .gitignore           # Regras de exclusão para versionamento Git
├── index.html           # Interface principal completa, moderna e responsiva
├── styles.css           # Folha de estilos e Design System (Amazônia & Tech)
├── app.js               # Lógica de negócio, motor de IA heurística e equidade
├── database.sql         # Script SQL relacional (DDL, DML, triggers e integridade)
├── server.py            # Servidor HTTP local e API REST (zero dependências externas)
├── package.json         # Metadados do projeto
└── README.md            # Documentação técnica e acadêmica completa da spec
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
