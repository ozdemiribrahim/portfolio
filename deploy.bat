@echo off
chcp 65001 >nul
title Portfolio Deployment Tool
color 0A

echo.
echo 🌟 ================================
echo 🚀 PORTFOLIO DEPLOYMENT TOOL
echo 🌟 ================================
echo.

:: Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git bulunamadı! Git'i yükleyin: https://git-scm.com/
    pause
    exit /b 1
)

:: Move to dist directory
cd /d "f:\Work\_Ibra\Portfolio\dist"

echo 📁 Working directory: %cd%
echo.

:: Initialize git if not already initialized
if not exist .git (
    echo 🔧 Git repository başlatılıyor...
    git init
    git branch -M main
    echo ✅ Git repository başlatıldı!
    echo.
) else (
    echo ✅ Git repository zaten mevcut
    echo.
)

:: Configure git user (show current and allow changes)
echo 📋 Mevcut Git yapılandırması:
for /f "tokens=2*" %%i in ('git config --global user.name 2^>nul') do echo    👤 Kullanıcı: %%i %%j
for /f "tokens=2*" %%i in ('git config --global user.email 2^>nul') do echo    📧 Email: %%i %%j
echo.

:: Ask if user wants to change git configuration
echo ❓ Git hesap bilgilerinizi değiştirmek ister misiniz? (y/N):
set /p change_user=""
if /i "%change_user%"=="y" (
    echo.
    echo 🔧 Yeni Git yapılandırması:
    set /p git_name="👤 GitHub kullanıcı adınız: "
    set /p git_email="📧 GitHub email adresiniz: "
    
    if not "%git_name%"=="" (
        git config --global user.name "%git_name%"
        echo ✅ Kullanıcı adı güncellendi: %git_name%
    )
    if not "%git_email%"=="" (
        git config --global user.email "%git_email%"
        echo ✅ Email güncellendi: %git_email%
    )
) else (
    :: Use existing global configuration
    for /f "tokens=2*" %%i in ('git config --global user.name 2^>nul') do set git_name=%%i %%j
    for /f "tokens=2*" %%i in ('git config --global user.email 2^>nul') do set git_email=%%i %%j
    
    :: If no global config exists, ask for it
    if "%git_name%"=="" (
        echo.
        echo ⚠️  Git kullanıcı adı bulunamadı!
        set /p git_name="👤 GitHub kullanıcı adınız: "
        git config --global user.name "%git_name%"
    )
    
    if "%git_email%"=="" (
        echo.
        echo ⚠️  Git email bulunamadı!
        set /p git_email="📧 GitHub email adresiniz: "
        git config --global user.email "%git_email%"
    )
)

echo.
echo 👤 Aktif Git User: %git_name%
echo 📧 Aktif Git Email: %git_email%
echo.

:: Add all files
echo 📦 Dosyalar staging area'ya ekleniyor...
git add .

:: Check if there are changes to commit
git diff --staged --quiet
if errorlevel 1 (
    echo ✅ Değişiklikler bulundu, commit yapılıyor...
    git commit -m "Portfolio deployment - %date% %time%"
    echo ✅ Commit başarılı!
) else (
    echo ℹ️  Commit edilecek değişiklik bulunamadı
)
echo.

:: Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 GitHub repository URL'i gerekli!
    echo.
    echo 📝 GitHub'da repository oluşturmak için:
    echo    1. https://github.com/new adresine git
    echo    2. Repository adı girin (örn: ibrahim-portfolio)
    echo    3. Public seçin
    echo    4. Create repository tıklayın
    echo.
    set /p repo_url="🔗 GitHub repository URL'ini girin (https://github.com/username/repo.git): "
    
    git remote add origin !repo_url!
    echo ✅ Remote origin eklendi: !repo_url!
    echo.
) else (
    for /f %%i in ('git remote get-url origin') do set existing_url=%%i
    echo ✅ Remote origin mevcut: !existing_url!
    echo.
)

:: Push to GitHub
echo 🚀 GitHub'a push yapılıyor...
git push -u origin main

if errorlevel 1 (
    echo ❌ Push işlemi başarısız!
    echo 💡 Muhtemel çözümler:
    echo    1. GitHub'da repository oluşturuldu mu?
    echo    2. Repository URL'i doğru mu?
    echo    3. GitHub'da oturum açıldı mı?
    echo.
    echo 🔧 Manuel push için:
    echo    git push -u origin main
    echo.
    pause
) else (
    echo ✅ Push başarılı!
    echo.
    echo 🌟 ================================
    echo ✅ DEPLOYMENT BAŞARILI!
    echo 🌟 ================================
    echo.
    echo 📋 Sonraki Adımlar:
    echo.
    echo 1️⃣  GitHub repository'nize gidin
    echo 2️⃣  Settings ^> Pages sekmesine tıklayın
    echo 3️⃣  Source: Deploy from a branch seçin
    echo 4️⃣  Branch: main seçin
    echo 5️⃣  Save butonuna tıklayın
    echo.
    echo 🌐 Portfolio'nuz yaklaşık 5 dakika içinde şu adreste yayında olacak:
    for /f %%i in ('git remote get-url origin') do set repo_url=%%i
    set repo_url=!repo_url:https://github.com/=!
    set repo_url=!repo_url:.git=!
    echo    https://!repo_url:.git=!
    echo.
    echo 🎉 Tebrikler! Portfolio'nuz hazır!
)

echo.
pause
