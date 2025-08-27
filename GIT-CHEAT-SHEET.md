# 🚀 Git Bash Hızlı Komutlar (Cheat Sheet)

## ⚡ İLK DEPLOYMENT
```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio deployment"  
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## 🔄 GÜNCELLEMELER  
```bash
# Hızlı güncelleme
git add . && git commit -m "Portfolio updated" && git push

# Adım adım
git status           # değişiklikleri gör
git add .           # tümünü ekle  
git commit -m "Mesajınız"
git push
```

## 🔧 HESAP DEĞİŞTİRME
```bash
git config --global user.name "YeniKullanici" 
git config --global user.email "yeni@email.com"
```

## 🔍 KONTROL KOMUTLARI
```bash
git status          # durum
git log --oneline   # geçmiş
git remote -v       # remote URL
```

## 🆘 SORUN GİDERME
```bash
git pull origin main    # güncellemeleri çek
git push --force       # zorla push
git reset --soft HEAD~1 # son commit'i geri al
```

## 📝 COMMIT ÖRNEKLERİ
- "Yeni 3D projeler eklendi"
- "Portfolio tasarım güncellendi"  
- "Sosyal medya linkleri eklendi"
- "Bug fixes ve optimizasyon"

## 🌐 GITHUB PAGES
Repository → Settings → Pages → Deploy from branch → main → Save

## 🔑 AUTH SORUNLARI
Personal Access Token kullanın (şifre değil):
GitHub → Settings → Developer settings → Personal access tokens
