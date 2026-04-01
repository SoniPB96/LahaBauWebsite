#!/bin/bash

# LAHA Website - Setup Script
# Führt die komplette Einrichtung automatisch durch

echo "🚀 LAHA Website - Automatische Einrichtung"
echo "=========================================="
echo ""

# Farben für Output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Schritt 1: Git Repository URL abfragen
echo -e "${BLUE}Schritt 1/5: Git Repository${NC}"
read -p "Gib deine Git Repo URL ein (z.B. https://github.com/user/repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo -e "${RED}❌ Keine URL angegeben. Abbruch.${NC}"
    exit 1
fi

# Schritt 2: Projekt klonen oder aktualisieren
echo -e "${BLUE}Schritt 2/5: Repository klonen${NC}"
PROJECT_NAME=$(basename "$REPO_URL" .git)

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  Ordner existiert bereits. Überspringe Klonen."
    cd "$PROJECT_NAME"
else
    git clone "$REPO_URL"
    cd "$PROJECT_NAME"
fi

echo -e "${GREEN}✓ Repository bereit${NC}"

# Schritt 3: Alte Struktur sichern
echo -e "${BLUE}Schritt 3/5: Backup erstellen${NC}"
BACKUP_DIR="../${PROJECT_NAME}_backup_$(date +%Y%m%d_%H%M%S)"
cp -r . "$BACKUP_DIR"
echo -e "${GREEN}✓ Backup erstellt in: $BACKUP_DIR${NC}"

# Schritt 4: Neue Struktur einsetzen
echo -e "${BLUE}Schritt 4/5: Neue Struktur einsetzen${NC}"

# Prüfe ob optimized-structure.zip im Parent-Ordner ist
if [ -f "../optimized-structure.zip" ]; then
    echo "Entpacke optimized-structure.zip..."
    unzip -o ../optimized-structure.zip -d ../temp_structure
    
    # Kopiere neue Dateien
    cp -r ../temp_structure/optimized-structure/src ./
    cp ../temp_structure/optimized-structure/package.json ./
    cp ../temp_structure/optimized-structure/vite.config.js ./
    cp ../temp_structure/optimized-structure/index.html ./
    
    # Falls .gitignore nicht existiert
    if [ ! -f ".gitignore" ]; then
        cp ../temp_structure/optimized-structure/.gitignore ./
    fi
    
    # Aufräumen
    rm -rf ../temp_structure
    
    echo -e "${GREEN}✓ Neue Struktur eingesetzt${NC}"
else
    echo -e "${RED}❌ optimized-structure.zip nicht gefunden${NC}"
    echo "Bitte ZIP im gleichen Ordner wie dieses Script platzieren."
    exit 1
fi

# Schritt 5: Dependencies installieren
echo -e "${BLUE}Schritt 5/5: Dependencies installieren${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installiert${NC}"
else
    echo -e "${RED}❌ Fehler bei npm install${NC}"
    exit 1
fi

# Fertig!
echo ""
echo "=========================================="
echo -e "${GREEN}✅ SETUP ABGESCHLOSSEN!${NC}"
echo "=========================================="
echo ""
echo "Was jetzt?"
echo ""
echo "1. Lokale Vorschau:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo "2. Auf Git pushen (live schalten):"
echo -e "   ${BLUE}git add .${NC}"
echo -e "   ${BLUE}git commit -m 'Neue optimierte Struktur'${NC}"
echo -e "   ${BLUE}git push${NC}"
echo ""
echo "3. Backup liegt hier:"
echo "   $BACKUP_DIR"
echo ""
echo "Viel Erfolg! 🚀"
