@echo off
chcp 65001 >nul
title Portfolio Update Tool
color 0B

echo.
echo 🔄 ================================
echo 📝 PORTFOLIO UPDATE TOOL
echo 🔄 ================================
echo.

cd /d "f:\Work\_Ibra\Portfolio\dist"

:: Git kullanıcı bilgilerini göster
echo 📋 Mevcut Git yapılandırması:
for /f "tokens=2*" %%i in ('git config --global user.name 2^>nul') do echo    👤 Kullanıcı: %%i %%j
for /f "tokens=2*" %%i in ('git config --global user.email 2^>nul') do echo    📧 Email: %%i %%j
echo.

:: Kullanıcı bilgilerini değiştirme seçeneği
echo ❓ Git hesap bilgilerinizi değiştirmek ister misiniz? (y/N):
set /p change_user=""
if /i "%change_user%"=="y" (
    echo.
    echo 🔧 Yeni Git yapılandırması:
    set /p git_user="👤 GitHub kullanıcı adınız: "
    set /p git_email="📧 GitHub email adresiniz: "
    
    if not "!git_user!"=="" (
        git config --global user.name "!git_user!"
        echo ✅ Kullanıcı adı güncellendi: !git_user!
    )
    if not "!git_email!"=="" (
        git config --global user.email "!git_email!"
        echo ✅ Email güncellendi: !git_email!
    )
    echo.
)

setlocal enabledelayedexpansion

:: Check for changes
git status --porcelain >nul
if errorlevel 1 (
    echo ❌ Git repository bulunamadı!
    echo 💡 Önce deploy.bat çalıştırın
    pause
    exit /b 1
)

echo 📋 Değişiklikleri kontrol ediliyor...
git status --short

:: Check if there are any changes
for /f %%i in ('git status --porcelain ^| wc -l') do set changes=%%i
if %changes%==0 (
    echo ✅ Güncellenecek değişiklik bulunamadı!
    echo.
    pause
    exit /b 0
)

echo.
echo 📦 Güncellemeler bulundu!
set /p commit_msg="💭 Commit mesajı girin (Enter = 'Portfolio updated'): "
if "%commit_msg%"=="" set commit_msg=Portfolio updated

echo.
echo 🔄 Güncellemeler uygulanıyor...

:: Add, commit and push
git add .
git commit -m "%commit_msg% - %date% %time%"

if errorlevel 1 (
    echo ❌ Commit başarısız!
    pause
    exit /b 1
)

echo 🚀 GitHub'a push yapılıyor...
git push

if errorlevel 1 (
    echo ❌ Push başarısız!
    echo 💡 Manuel push için: git push
    pause
    exit /b 1
)

echo.
echo 🌟 ================================
echo ✅ GÜNCELLEME BAŞARILI!
echo 🌟 ================================
echo.
echo 🌐 Portfolio'nuz birkaç dakika içinde güncellenecek!
for /f %%i in ('git remote get-url origin') do set repo_url=%%i
set repo_url=%repo_url:https://github.com/=%
set repo_url=%repo_url:.git=%
echo    https://%repo_url%
echo.
echo 🎉 Güncelleme tamamlandı!

pause
