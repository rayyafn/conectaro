-- =====================================================================
-- PROJETO CONECTARO - BANCO DE DADOS RELACIONAL (MYSQL / POSTGRESQL)
-- Seção 6 do Documento de Requisitos: Modelo de Dados (ConectaRO)
-- Autora: Evelyn Laí da Costa Caires (3º B Informática - IFRO)
-- Edital nº 03/2026 - Programa Centelha 3 Rondônia
-- =====================================================================

CREATE DATABASE IF NOT EXISTS conectaro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE conectaro_db;

-- 1. TABELA DE USUÁRIOS (Autenticação e Controle de Acesso - RF01, RF02, RNF01, RNF03)
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, -- RNF01: Armazenamento Criptografado (bcrypt/Argon2)
    telefone VARCHAR(20) NOT NULL,
    tipo_usuario ENUM('CLIENTE', 'PROFISSIONAL', 'ADMIN') NOT NULL DEFAULT 'CLIENTE',
    cidade VARCHAR(100) NOT NULL DEFAULT 'Porto Velho',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_usuario_email (email)
) ENGINE=InnoDB;

-- 2. TABELA DE PERFIL PROFISSIONAL (Dados do Prestador de Serviços - RF04, RF05)
CREATE TABLE IF NOT EXISTS PerfilProfissional (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    descricao_experiencia TEXT NOT NULL,
    cidade VARCHAR(100) NOT NULL DEFAULT 'Porto Velho',
    regiao_atendimento VARCHAR(255) NOT NULL, -- Bairros ou cidades atendidas em RO
    media_avaliacao DECIMAL(2,1) NOT NULL DEFAULT 0.0,
    total_avaliacoes INT NOT NULL DEFAULT 0,
    recem_cadastrado BOOLEAN NOT NULL DEFAULT TRUE, -- RF17 / CA04: Regra de Equidade de Visibilidade
    avatar_url VARCHAR(255) NULL,
    verificado BOOLEAN NOT NULL DEFAULT TRUE,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_perfil_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    INDEX idx_perfil_cidade (cidade)
) ENGINE=InnoDB;

-- 3. TABELA DE CATEGORIAS DE SERVIÇO (Catálogo de Especialidades Técnicas)
CREATE TABLE IF NOT EXISTS CategoriaServico (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    icone VARCHAR(50) DEFAULT '🛠️',
    ativo BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- 4. TABELA DE MODALIDADES DE SERVIÇO OFERECIDAS PELO PRESTADOR (RF04)
CREATE TABLE IF NOT EXISTS ServicoProfissional (
    id_servico_prof INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT NOT NULL,
    id_categoria INT NOT NULL,
    descricao_modalidade VARCHAR(255) NOT NULL,
    CONSTRAINT fk_servico_perfil FOREIGN KEY (id_perfil) REFERENCES PerfilProfissional(id_perfil) ON DELETE CASCADE,
    CONSTRAINT fk_servico_categoria FOREIGN KEY (id_categoria) REFERENCES CategoriaServico(id_categoria) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 5. TABELA DE SOLICITAÇÃO DE SERVIÇO (Demandas e Pedidos - RF07, RF08, RF09, RF10)
CREATE TABLE IF NOT EXISTS SolicitacaoServico (
    id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_profissional INT NOT NULL,
    id_categoria INT NOT NULL,
    descricao_necessidade TEXT NOT NULL, -- Texto livre inserido em linguagem comum (RF07)
    endereco_atendimento VARCHAR(255) NOT NULL,
    status ENUM('PENDENTE', 'ACEITO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE', -- RF10
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_finalizacao DATETIME NULL,
    CONSTRAINT fk_solicitacao_cliente FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT,
    CONSTRAINT fk_solicitacao_profissional FOREIGN KEY (id_profissional) REFERENCES PerfilProfissional(id_perfil) ON DELETE RESTRICT,
    CONSTRAINT fk_solicitacao_categoria FOREIGN KEY (id_categoria) REFERENCES CategoriaServico(id_categoria) ON DELETE RESTRICT,
    INDEX idx_solicitacao_status (status)
) ENGINE=InnoDB;

-- 6. TABELA DE AVALIAÇÃO (Histórico de Reputação e Feedback - RF11, RF12, RF13, CA05)
CREATE TABLE IF NOT EXISTS Avaliacao (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_solicitacao INT NOT NULL UNIQUE, -- Cada solicitação concluída gera no máximo uma avaliação (Seção 6.2)
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT NOT NULL,
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_avaliacao_solicitacao FOREIGN KEY (id_solicitacao) REFERENCES SolicitacaoServico(id_solicitacao) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. TABELA DE DENÚNCIAS E MODERAÇÃO ADMINISTRATIVA (RF18, CA06)
CREATE TABLE IF NOT EXISTS Denuncia (
    id_denuncia INT AUTO_INCREMENT PRIMARY KEY,
    id_denunciante INT NOT NULL,
    id_alvo_usuario INT NULL,
    id_alvo_avaliacao INT NULL,
    motivo TEXT NOT NULL,
    status ENUM('PENDENTE', 'ANALISADA', 'RESOLVIDA', 'DESCARTADA') NOT NULL DEFAULT 'PENDENTE',
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_denuncia_denunciante FOREIGN KEY (id_denunciante) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TRIGGER PARA RECÁLCULO AUTOMÁTICO DA MÉDIA DE AVALIAÇÃO (RF12)
-- =====================================================================
DELIMITER $$
CREATE TRIGGER trg_atualizar_media_avaliacao
AFTER INSERT ON Avaliacao
FOR EACH ROW
BEGIN
    DECLARE v_id_profissional INT;
    DECLARE v_media DECIMAL(2,1);
    DECLARE v_total INT;

    -- Localiza o profissional vinculado à solicitação avaliada
    SELECT id_profissional INTO v_id_profissional
    FROM SolicitacaoServico
    WHERE id_solicitacao = NEW.id_solicitacao;

    -- Calcula a nova média e o total de avaliações do prestador
    SELECT ROUND(AVG(a.nota), 1), COUNT(a.id_avaliacao)
    INTO v_media, v_total
    FROM Avaliacao a
    INNER JOIN SolicitacaoServico s ON a.id_solicitacao = s.id_solicitacao
    WHERE s.id_profissional = v_id_profissional;

    -- Atualiza o perfil profissional
    UPDATE PerfilProfissional
    SET media_avaliacao = v_media,
        total_avaliacoes = v_total,
        recem_cadastrado = FALSE
    WHERE id_perfil = v_id_profissional;
END$$
DELIMITER ;

-- =====================================================================
-- DADOS INICIAIS DE TESTE (SEED DATA)
-- =====================================================================
INSERT INTO CategoriaServico (nome_categoria, descricao, icone) VALUES
('Informática & Assistência Técnica', 'Manutenção preventiva e corretiva de computadores e notebooks', '💻'),
('Serviços Elétricos', 'Instalações elétricas residenciais, chuveiros e reparos gerais', '⚡'),
('Serviços Hidráulicos', 'Desentupimentos, detecção de vazamentos e consertos', '🔧'),
('Design Gráfico & Mídia', 'Criação de logomarcas, identidade visual e redes sociais', '🎨'),
('Fotografia & Audiovisual', 'Cobertura de eventos, ensaios fotográficos e formaturas', '📷'),
('Aulas Particulares & Reforço', 'Reforço de matemática, física, inglês e apoio ao ENEM', '📚'),
('Reformas & Pintura', 'Pintura residencial e pequenos reparos em alvenaria', '🖌️'),
('Estética & Cuidados', 'Serviços de beleza e estética com atendimento a domicílio', '✂️');

INSERT INTO Usuario (nome, email, senha_hash, telefone, tipo_usuario, cidade) VALUES
('Lucas Silva', 'lucas.silva@gmail.com', '$2b$12$e6yD61wV.g27XFzU/1K.u.xS3z/eB', '(69) 99201-1122', 'CLIENTE', 'Porto Velho'),
('Marcos Andrade', 'marcos.eletrica@gmail.com', '$2b$12$e6yD61wV.g27XFzU/1K.u.xS3z/eB', '(69) 98402-3344', 'PROFISSIONAL', 'Porto Velho'),
('Ana Paula Lima', 'ana.ti.rondonia@gmail.com', '$2b$12$e6yD61wV.g27XFzU/1K.u.xS3z/eB', '(69) 99312-5566', 'PROFISSIONAL', 'Porto Velho'),
('Gabriel Menezes', 'gabriel.ifro@gmail.com', '$2b$12$e6yD61wV.g27XFzU/1K.u.xS3z/eB', '(69) 99399-2211', 'PROFISSIONAL', 'Porto Velho'),
('Administrador ConectaRO', 'admin@conectaro.ro.gov.br', '$2b$12$e6yD61wV.g27XFzU/1K.u.xS3z/eB', '(69) 3216-5000', 'ADMIN', 'Porto Velho');

INSERT INTO PerfilProfissional (id_usuario, descricao_experiencia, cidade, regiao_atendimento, media_avaliacao, total_avaliacoes, recem_cadastrado) VALUES
(2, 'Eletricista residencial experiente com mais de 8 anos em Porto Velho.', 'Porto Velho', 'Areal, Olaria, Centro, Nova Porto Velho', 4.9, 14, FALSE),
(3, 'Técnica em Informática especializada em notebooks, redes Wi-Fi e montagem.', 'Porto Velho', 'Embratel, Agenor de Carvalho, Rio Madeira', 5.0, 18, FALSE),
(4, 'Estudante concluinte do Técnico em Informática no IFRO. Formatação e suporte.', 'Porto Velho', 'Zona Sul, Caladinho, Cohab', 0.0, 0, TRUE);
