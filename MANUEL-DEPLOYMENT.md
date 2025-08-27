# 🚀 Manuel Git Deployment Yönergesi (Git Bash)

## 📋 Ön Hazırlık

### 1️⃣ GitHub Repository Oluşturun
```
1. https://github.com/new adresine git
2. Repository adı girin (örn: "ibrahim-portfolio") 
3. "Public" seçin
4. "Create repository" tıklayın
5. Repository URL'ini kopyalayın (örn: https://github.com/username/ibrahim-portfolio.git)
```

### 2️⃣ Git Bash'i dist/ klasöründe açın
```
1. dist/ klasörüne gidin
2. Sağ tık → "Git Bash Here" tıklayın
```

---

## 🔧 Git Yapılandırması (İlk Seferde)

### Mevcut yapılandırmayı kontrol edin:
```bash
git config --global user.name
git config --global user.email
```

### Farklı GitHub hesabı kullanmak istiyorsanız:
```bash
git config --global user.name "YeniKullaniciAdiniz"
git config --global user.email "yeni.email@gmail.com"
```

### Windows Credential temizleme (gerekirse):
```bash
# Eski GitHub credential'ları temizle
git config --global --unset credential.helper
# veya Windows Credential Manager'dan manuel silin
```

---

## 🚀 İlk Deployment (deploy.bat yerine)

```bash
# 1. Git repository başlat
git init
git branch -M main

# 2. Dosyaları staging area'ya ekle
git add .

# 3. İlk commit
git commit -m "Initial portfolio deployment"

# 4. Remote origin ekle (kendi URL'inizi yazın)
git remote add origin https://github.com/KULLANICI-ADINIZ/REPO-ADINIZ.git

# 5. GitHub'a push
git push -u origin main
```

### 📝 İlk push'ta şifre istenecek:
```
Username: github-kullanici-adiniz
Password: github-personal-access-token (şifreniz değil!)
```

---

## 🔄 Güncellemeler (update.bat yerine)

### Portfolio'nuzda değişiklik yaptıktan sonra:

```bash
# 1. Değişiklikleri kontrol et
git status

# 2. Değişiklikleri stage'e ekle
git add .

# 3. Commit yap
git commit -m "Portfolio güncellendi - yeni projeler eklendi"

# 4. GitHub'a push
git push
```

### 🎯 Hızlı güncelleme (tek komut):
```bash
git add . && git commit -m "Portfolio updated" && git push
```

---

## 🌐 GitHub Pages Kurulumu

### Repository'nizde GitHub Pages'ı etkinleştirin:
```
1. GitHub'da repository'nize git
2. Settings sekmesine tıklayın
3. Sol menüden "Pages" seçin
4. Source: "Deploy from a branch"
5. Branch: "main" seçin
6. Folder: "/ (root)" seçin  
7. "Save" tıklayın
```

### ✅ Portfolio'nuz şu adreste yayına girer:
```
https://KULLANICI-ADINIZ.github.io/REPO-ADINIZ
```

---

## 🔍 Yararlı Git Komutları

### Durumu kontrol etme:
```bash
git status                    # Değişiklikleri göster
git log --oneline            # Commit geçmişini göster
git remote -v                # Remote URL'leri göster
```

### Sorun giderme:
```bash
git pull origin main         # GitHub'dan güncellemeleri çek
git reset --soft HEAD~1      # Son commit'i geri al
git push --force             # Zorla push (dikkatli kullanın!)
```

### Branch işlemleri:
```bash
git branch                   # Mevcut branch'leri göster
git checkout -b new-feature  # Yeni branch oluştur ve geç
git merge new-feature        # Branch'i main'e merge et
```

---

## 🎯 Örnek Workflow

### ✨ Yeni proje ekleme workflow'u:
```bash
# 1. Admin panelinde yeni proje ekleyin
# 2. Yeni build alın (gerekirse)
# 3. Git Bash'i açın

cd /f/Work/_Ibra/Portfolio/dist

# 4. Değişiklikleri kontrol edin
git status

# 5. Güncelleyin
git add .
git commit -m "Yeni proje eklendi: [Proje Adı]"
git push

# 6. 2-3 dakika bekleyin, portfolio'nuz güncellenir!
```

---

## ❗ Önemli Notlar

### 🔐 GitHub Authentication:
- **Personal Access Token** kullanın (şifre değil)
- Settings > Developer settings > Personal access tokens > Generate new token
- **repo** ve **workflow** izinlerini verin

### 🚫 Ortak Hatalar:
```bash
# "Permission denied" hatası:
git remote set-url origin https://TOKEN@github.com/username/repo.git

# "Repository not found" hatası:  
# Repository URL'ini kontrol edin, Public olduğundan emin olun

# "Nothing to commit" mesajı:
# Normal - değişiklik yoksa commit gerekmez
```

### 🎨 Commit Mesajı Örnekleri:
```bash
git commit -m "Yeni 3D modelleme projeleri eklendi"
git commit -m "Portfolio tasarımı güncellendi" 
git commit -m "Sosyal medya linkleri eklendi"
git commit -m "Responsive design düzeltmeleri"
```

---

## 🎉 Başarı!

Bu yönergelerle portfolio'nuzü kolayca yönetebilirsiniz. Manuel olarak yapmak otomatik scriptlerden daha güvenilir ve kontrol edilebilir.

**Happy coding! 🚀**
