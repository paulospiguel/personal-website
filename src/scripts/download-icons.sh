#!/bin/bash

echo "📥 A descarregar ícones das skills..."

mkdir -p public/skills

# Remover ficheiro inválido
rm -f public/skills/0.svg

# Função para descarregar um ícone
download_icon() {
    local name="$1"
    local url="$2"
    echo "📦 A descarregar ${name}.svg..."
    
    if curl -f -s "$url" -o "public/skills/${name}.svg"; then
        # Verificar se o ficheiro não está vazio
        if [ -s "public/skills/${name}.svg" ]; then
            echo "✅ ${name}.svg descarregado com sucesso!"
        else
            echo "❌ ${name}.svg está vazio, a remover..."
            rm -f "public/skills/${name}.svg"
        fi
    else
        echo "❌ Erro ao descarregar ${name}.svg"
    fi
}

# Descarregar todos os ícones necessários
download_icon "javascript" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
download_icon "react" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
download_icon "react-native" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
download_icon "nodejs" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
download_icon "nextjs" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
download_icon "docker" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
download_icon "html" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
download_icon "css" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
download_icon "git" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
download_icon "aws" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
download_icon "azure" "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
echo ""
echo "📋 Verificação final dos ficheiros:"
for file in public/skills/*.svg; do
    if [ -f "$file" ] && [ -s "$file" ]; then
        echo "✅ $(basename "$file") - OK"
    fi
done

echo ""
echo "🎉 Processo concluído! Agora tens todos os ícones necessários."