@echo off
chcp 65001 >nul
title GitHub Account Changer
color 0C

echo.
echo 🔄 ================================
echo 🔐 GITHUB HESAP DEĞİŞTİRİCİ
echo 🔄 ================================
echo.

:: Show current configuration
echo 📋 Mevcut Git yapılandırması:
for /f "tokens=2*" %%i in ('git config --global user.name 2^>nul') do echo    👤 Kullanıcı: %%i %%j
for /f "tokens=2*" %%i in ('git config --global user.email 2^>nul') do echo    📧 Email: %%i %%j
echo.

:: Show saved credentials
echo 🔑 Windows Credential Manager'da kayıtlı GitHub hesapları:
cmdkey /list | findstr "github" 2>nul
if errorlevel 1 (
    echo    ℹ️  Kayıtlı credential bulunamadı
) else (
    echo.
    echo 🗑️  Eski credential'ları temizlemek için 'c' tuşuna basın
)
echo.

echo ❓ Yapmak istediğiniz işlem:
echo    [1] Yeni GitHub hesabı yapılandır
echo    [2] Credential Manager'ı temizle
echo    [3] Mevcut yapılandırmayı göster
echo    [4] Çıkış
echo.

set /p choice="Seçiminiz (1-4): "

if "%choice%"=="1" goto configure_new
if "%choice%"=="2" goto clear_credentials
if "%choice%"=="3" goto show_config
if "%choice%"=="4" goto end

echo ❌ Geçersiz seçim!
pause
goto end

:configure_new
echo.
echo 🔧 Yeni GitHub hesabı yapılandırması:
echo ⚠️  Bu işlem global Git yapılandırmasını değiştirecek!
echo.

set /p confirm="Devam etmek istediğinizden emin misiniz? (y/N): "
if /i not "%confirm%"=="y" goto end

echo.
set /p new_name="👤 Yeni GitHub kullanıcı adınız: "
set /p new_email="📧 Yeni GitHub email adresiniz: "

if "%new_name%"=="" (
    echo ❌ Kullanıcı adı boş olamaz!
    pause
    goto end
)

if "%new_email%"=="" (
    echo ❌ Email boş olamaz!
    pause
    goto end
)

echo.
echo 🔄 Git yapılandırması güncelleniyor...
git config --global user.name "%new_name%"
git config --global user.email "%new_email%"

echo ✅ Git yapılandırması başarıyla güncellendi!
echo.
echo 🆕 Yeni yapılandırma:
echo    👤 Kullanıcı: %new_name%
echo    📧 Email: %new_email%
echo.
echo 💡 İlk push'ta GitHub hesabınıza giriş yapmanız istenecek
goto end

:clear_credentials
echo.
echo 🗑️  Windows Credential Manager temizleniyor...
echo ⚠️  Bu işlem tüm GitHub credential'larını silecek!
echo.

set /p confirm="Devam etmek istediğinizden emin misiniz? (y/N): "
if /i not "%confirm%"=="y" goto end

echo.
echo 🔄 GitHub credential'ları siliniyor...

:: Remove various GitHub credential entries
cmdkey /delete:"git:https://github.com" 2>nul
cmdkey /delete:"github.com" 2>nul  
cmdkey /delete:"https://github.com" 2>nul
cmdkey /delete:"git:github.com" 2>nul

:: Remove any entries containing github
for /f "tokens=2" %%i in ('cmdkey /list ^| findstr "github" 2^>nul') do (
    cmdkey /delete:"%%i" 2>nul
)

echo ✅ Credential'lar temizlendi!
echo 💡 Sonraki push'ta yeni hesap bilgileriniz istenecek
goto end

:show_config
echo.
echo 📋 Detaylı Git yapılandırması:
echo.
git config --global --list | findstr "user\." 2>nul
if errorlevel 1 (
    echo ❌ Git yapılandırması bulunamadı!
)
echo.
echo 🔑 Windows Credential Manager:
cmdkey /list | findstr "github" 2>nul
if errorlevel 1 (
    echo    ℹ️  GitHub credential'ı bulunamadı
)
goto end

:end
echo.
echo 🎯 ================================
echo ✅ İŞLEM TAMAMLANDI!
echo 🎯 ================================
echo.
echo 📝 Sonraki adımlar:
echo    1. deploy.bat veya update.bat çalıştırın
echo    2. İlk push'ta GitHub şifrenizi girin
echo    3. GitHub hesabınız artık değiştirildi!
echo.
pause
