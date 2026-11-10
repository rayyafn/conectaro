#!/usr/bin/env python3
"""
CONECTARO - Servidor Local e API REST
Projeto Simulado Centelha 3 Rondônia - Fase 1
Autora: Evelyn Laí da Costa Caires (3º B Informática - IFRO)

Servidor HTTP de alto desempenho e zero dependências externas.
Executa a interface web e disponibiliza endpoints REST para simulação do backend.
"""

import http.server
import socketserver
import json
import os
import urllib.parse

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ConectaroRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        
        # Endpoint de status da API (RF08 / Section 8)
        if parsed_url.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "plataforma": "CONECTARO",
                "versao": "1.0.0",
                "status": "online",
                "ambiente": "Rondônia / IFRO Campus Porto Velho",
                "uptime": "99.9% (RNF08)",
                "estudante": "Evelyn Laí da Costa Caires"
            }
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            return

        # Endpoint de métricas regionais (RF18)
        if parsed_url.path == '/api/metricas-rondonia':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            data = {
                "trabalhadores_autonomos_br": "26.1 milhões (2025)",
                "taxa_informalidade_br": "38.1%",
                "autonomos_rondonia_ibge": "35.3% da população ocupada",
                "cidades_polo": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Cacoal", "Vilhena"],
                "demandas_ativas": 38,
                "profissionais_conectados": 124
            }
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
            return

        # Para arquivos estáticos normais (HTML, CSS, JS)
        super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)

        # Endpoint de recomendação por PLN / Linguagem Natural (RF15 & CA02)
        if parsed_url.path == '/api/nlp-analyze':
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)
            try:
                raw_text = post_body.decode('utf-8', errors='replace')
                payload = json.loads(raw_text)
                query = payload.get('query', '').lower()

                category = "Informática & Assistência Técnica"
                cat_id = "cat_inf"
                if any(w in query for w in ['chuveiro', 'eletricista', 'tomada', 'fio', 'curto']):
                    category = "Serviços Elétricos"
                    cat_id = "cat_ele"
                elif any(w in query for w in ['cano', 'torneira', 'pia', 'vazando', 'encanador']):
                    category = "Serviços Hidráulicos"
                    cat_id = "cat_hid"
                elif any(w in query for w in ['logo', 'arte', 'design', 'redes']):
                    category = "Design Gráfico & Mídia"
                    cat_id = "cat_des"

                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                res = {
                    "sucesso": True,
                    "categoria_identificada": category,
                    "categoria_id": cat_id,
                    "confianca": 0.96,
                    "regra_equidade_aplicada": True
                }
                self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                err = {"erro": str(e)}
                self.wfile.write(json.dumps(err).encode('utf-8'))
            return

        super().do_POST()

import sys

def run_server():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ConectaroRequestHandler) as httpd:
        print("=" * 65)
        print("CONECTARO - Plataforma Digital de Servicos de Rondonia")
        print(f"Servidor ativo em: http://localhost:{PORT}")
        print("Estudante: Evelyn Lai da Costa Caires - 3 B Informatica (IFRO)")
        print("=" * 65)
        print("Pressione Ctrl+C para encerrar o servidor a qualquer momento.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado com sucesso.")

if __name__ == '__main__':
    run_server()
