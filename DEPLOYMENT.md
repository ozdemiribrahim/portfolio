# 🚀 Portfolio Deployment Scripts

Bu klasörde portfolio'nuzun deployment işlemlerini otomatikleştiren scriptler bulunmaktadır.

## 📁 Script Dosyaları

### `deploy.bat` - İlk Deployment
**Bu scripti ilk defa GitHub'a yükleme yaparken kullanın**

**Özellikler:**
- Git repository'sini otomatik başlatır
- Git kullanıcı bilgilerinizi ayarlar
- Dosyaları otomatik commit eder
- GitHub repository URL'ini sorar
- GitHub'a otomatik push yapar
- GitHub Pages kurulum talimatları verir

**Kullanım:**
1. `deploy.bat` dosyasına çift tıklayın
2. Git kullanıcı bilgilerinizi girin (ilk seferde)
3. GitHub repository URL'inizi girin
4. Script otomatik olarak push yapacak

### `update.bat` - Güncellemeler
**Portfolio'nuzda değişiklik yaptıktan sonra bu scripti kullanın**

**Özellikler:**
- Değişiklikleri otomatik tespit eder
- Commit mesajı girmenizi ister
- Otomatik commit ve push yapar
- Güncellenecek değişiklik yoksa uyarır

**Kullanım:**
1. Portfolio'nuzda değişiklik yapın
2. `update.bat` dosyasına çift tıklayın
3. Commit mesajı girin
4. Script otomatik olarak güncelleme yapacak

## 🎯 Kullanım Senaryosu

### İlk Defa Deploy Etme:
1. **GitHub'da yeni repository oluşturun**
   - https://github.com/new adresine gidin
   - Repository adı girin (örn: `ibrahim-portfolio`)
   - **Public** seçin
   - **Create repository** tıklayın

2. **Deploy scriptini çalıştırın**
   - `deploy.bat` dosyasına çift tıklayın
   - İstenenleri doldurun
   - GitHub repository URL'ini girin

3. **GitHub Pages'ı etkinleştirin**
   - Repository'nizde Settings > Pages'a gidin
   - Source: Deploy from a branch seçin
   - Branch: main seçin
   - Save tıklayın

### Güncelleme Yapma:
1. **Admin panelinde projelerinizi güncelleyin**
2. **Yeni build alın** (gerekirse)
3. **Update scriptini çalıştırın**
   - `update.bat` dosyasına çift tıklayın
   - Commit mesajı girin

## ⚡ Hızlı Komutlar

### Manuel Git Komutları:
```bash
# İlk deployment
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Güncellemeler
git add .
git commit -m "Portfolio updated"
git push
```

## 🔧 Sorun Giderme

### "Git bulunamadı" hatası:
- Git'i yükleyin: https://git-scm.com/download/win

### "Permission denied" hatası:
- GitHub'da oturum açın
- SSH key ekleyin veya HTTPS kullanın

### "Repository not found" hatası:
- Repository URL'ini kontrol edin
- Repository'nin public olduğundan emin olun

### Push başarısız:
- GitHub'da repository oluşturuldu mu?
- Internet bağlantınız var mı?
- Repository URL'i doğru mu?

## 🌟 Başarı!

Her şey doğru yapıldığında portfolio'nuz şu adreste yayında olacak:
```
https://github-kullanici-adiniz.github.io/repository-adi
```

## 📞 Yardım

Script hata verirse:
1. Hata mesajını okuyun
2. Yukarıdaki sorun giderme bölümünü kontrol edin  
3. Manuel git komutlarını kullanmayı deneyin
4. GitHub repository ayarlarını kontrol edin

**🎉 Kolay deployments!**
