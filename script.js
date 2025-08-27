document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Portfolio Script Yüklendi - Static Edition');
    console.log('🌐 Static portfolio ready for production');
    
    // Load iconsSvg.js first
    const iconScript = document.createElement('script');
    iconScript.src = './data/iconsSvg.js';
    iconScript.onload = () => {
        console.log('✅ iconsSvg.js loaded');
        initializePortfolio();
    };
    iconScript.onerror = () => {
        console.warn('⚠️ iconsSvg.js failed to load, continuing without custom icons');
        initializePortfolio();
    };
    document.head.appendChild(iconScript);
});

function initializePortfolio() {
    // JSON tabanlı proje yükleme sistemi
    let projectsData = [];
    let iconsData = {};
    
    // JSON dosyasından projeleri yükle (Static Version)
    async function loadProjectsFromJSON() {
        try {
            console.log('🔄 JSON\'dan projeler yükleniyor...');
            
            const response = await fetch('./data/projects.json');
            const data = await response.json();
            
            if (data.projects) {
                projectsData = data.projects;
                console.log(`✅ ${projectsData.length} proje JSON'dan yüklendi`);
                
                // Portfolio sectionlarını oluştur
                await createPortfolioSections();
            } else {
                throw new Error('Projects data not found in JSON');
            }
        } catch (error) {
            console.warn('⚠️ JSON yüklemesi başarısız:', error.message);
            console.log('📭 Boş state gösteriliyor');
            showEmptyState();
        }
    }
    
    // Proje yüklemeyi başlat
    loadProjectsFromJSON();

    function showEmptyState() {
        const portfolioGridContainer = document.getElementById('portfolioGridContainer');
        if (portfolioGridContainer) {
            portfolioGridContainer.innerHTML = 
                '<div style="text-align: center; padding: 60px 20px; color: #666;">' +
                    '<h3>Henüz proje eklenmemiş</h3>' +
                    '<p>Projeler yükleniyor...</p>' +
                '</div>';
        }
    }

    // Kategoriye göre projeleri filtrele ve sırala
    function getProjectsByCategory(category) {
        return projectsData
            .filter(project => project.class === category)
            .sort((a, b) => {
                // Index'e göre sırala, yoksa id'ye göre
                const aIndex = a.index !== undefined ? a.index : (parseInt(a.id.split('-')[1]) || 0);
                const bIndex = b.index !== undefined ? b.index : (parseInt(b.id.split('-')[1]) || 0);
                return aIndex - bIndex;
            });
    }

    // --- Portfolio Sectionları Oluştur ---
    async function createPortfolioSections() {
        console.log('🔄 Portfolio sectionları oluşturuluyor...');
        
        await createPortfolioGrid();
        await createOtherGrid();
        await createSideList();
        
        console.log('✅ Tüm sectionlar oluşturuldu');
    }

    // --- Primary Grid ---
    async function createPortfolioGrid() {
        const container = document.getElementById('portfolioGridContainer');
        if (!container) {
            console.warn('portfolioGridContainer bulunamadı!');
            return;
        }

        const primaryProjects = getProjectsByCategory('primary');
        console.log('🎯 ' + primaryProjects.length + ' primary proje yükleniyor...');

        // Container'ı temizle
        container.innerHTML = '';

        primaryProjects.forEach(project => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('portfolio-card');
            if (project.gridSize) {
                gridItem.classList.add(`grid-size-${project.gridSize}`);
            }
            gridItem.dataset.projectId = project.id;

            // Ana görsel
            if (project.thumbnailImg && project.thumbnailImg.startsWith('svg:')) {
                // SVG thumbnail için div container kullan
                const svgContainer = document.createElement('div');
                svgContainer.classList.add('svg-thumbnail');
                
                const iconName = project.thumbnailImg.replace('svg:', '');
                // iconsSvg.js'den SVG'yi al - önce window.iconsSvg, sonra iconsData
                const svgContent = (window.iconsSvg && window.iconsSvg[iconName]) 
                    ? window.iconsSvg[iconName] 
                    : iconsData[iconName] || '<div>🖼️</div>';
                
                svgContainer.innerHTML = svgContent;
                svgContainer.style.width = '100%';
                svgContainer.style.height = '200px';
                svgContainer.style.display = 'flex';
                svgContainer.style.alignItems = 'center';
                svgContainer.style.justifyContent = 'center';
                svgContainer.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                
                // SVG'yi responsive yap
                const svg = svgContainer.querySelector('svg');
                if (svg) {
                    svg.style.width = '60%';
                    svg.style.height = '60%';
                    svg.style.maxWidth = '120px';
                    svg.style.maxHeight = '120px';
                }
                
                gridItem.appendChild(svgContainer);
            } else if (project.thumbnailImg) {
                // Normal image thumbnail
                const img = document.createElement('img');
                img.src = `./img/Portfolio/${project.thumbnailImg}`;
                img.alt = project.title || 'Proje Görseli';
                img.loading = 'lazy';
                gridItem.appendChild(img);
            }

            // Hover görseli
            if (project.thumbnailImgHover && !project.thumbnailImg?.startsWith('svg:')) {
                const hoverImg = document.createElement('img');
                hoverImg.src = `./img/Portfolio/${project.thumbnailImgHover}`;
                hoverImg.alt = project.title || 'Proje Hover Görseli';
                hoverImg.classList.add('portfolio-thumb-hover');
                hoverImg.loading = 'lazy';
                gridItem.appendChild(hoverImg);
            }

            // Sosyal medya linkleri
            if (project.socialLinks && Object.keys(project.socialLinks).length > 0) {
                const socialContainer = document.createElement('div');
                socialContainer.classList.add('portfolio-social-links');
                
                Object.entries(project.socialLinks).forEach(([platform, url]) => {
                    if (url && url.trim()) {
                        const socialLink = document.createElement('a');
                        socialLink.href = url;
                        socialLink.target = '_blank';
                        socialLink.rel = 'noopener noreferrer';
                        socialLink.classList.add('social-link', `social-${platform}`);
                        
                        // Platform ikonları
                        const icons = {
                            behance: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>`,
                            instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
                            linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
                            twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
                        };
                        
                        socialLink.innerHTML = icons[platform] || '🔗';
                        socialContainer.appendChild(socialLink);
                    }
                });
                
                gridItem.appendChild(socialContainer);
            }

            container.appendChild(gridItem);
        });

        // Masonry layout'u başlat
        setTimeout(() => {
            initMasonry();
        }, 100);
    }

    // --- Other Grid ---
    async function createOtherGrid() {
        const container = document.getElementById('otherGridContainer');
        if (!container) {
            console.warn('otherGridContainer bulunamadı!');
            return;
        }

        const otherProjects = getProjectsByCategory('other');
        console.log('🎯 ' + otherProjects.length + ' other proje yükleniyor...');

        // Container'ı temizle
        container.innerHTML = '';

        otherProjects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('other-card');
            card.dataset.projectId = project.id;

            const img = document.createElement('img');
            img.src = project.thumbnailImg.startsWith('svg:') 
                ? 'data:image/svg+xml;base64,' + btoa((window.iconsSvg && window.iconsSvg[project.thumbnailImg.replace('svg:', '')]) || iconsData[project.thumbnailImg.replace('svg:', '')] || '🖼️')
                : `./img/Portfolio/${project.thumbnailImg}`;
            img.alt = project.title || 'Proje Görseli';
            img.loading = 'lazy';
            card.appendChild(img);

            // Sosyal medya linkleri ekle
            if (project.socialLinks && Object.keys(project.socialLinks).length > 0) {
                const socialContainer = document.createElement('div');
                socialContainer.classList.add('portfolio-social-links');
                
                Object.entries(project.socialLinks).forEach(([platform, url]) => {
                    if (url && url.trim()) {
                        const socialLink = document.createElement('a');
                        socialLink.href = url;
                        socialLink.target = '_blank';
                        socialLink.rel = 'noopener noreferrer';
                        socialLink.classList.add('social-link', `social-${platform}`);
                        
                        // Platform ikonları
                        const icons = {
                            behance: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>`,
                            instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
                            linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
                            twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
                        };
                        
                        socialLink.innerHTML = icons[platform] || '🔗';
                        socialContainer.appendChild(socialLink);
                    }
                });
                
                card.appendChild(socialContainer);
            }

            container.appendChild(card);
        });
    }

    // --- Side List ---
    async function createSideList() {
        const container = document.getElementById('sideListContainer');
        if (!container) {
            console.warn('sideListContainer bulunamadı!');
            return;
        }

        const sideProjects = getProjectsByCategory('side');
        console.log('🎯 ' + sideProjects.length + ' side proje yükleniyor...');

        // Container'ı temizle
        container.innerHTML = '';

        sideProjects.forEach(project => {
            const row = document.createElement('div');
            row.classList.add('side-row');
            row.dataset.projectId = project.id;

            // Sol ikon
            const iconDiv = document.createElement('div');
            iconDiv.classList.add('side-icon');
            if (project.thumbnailImg && project.thumbnailImg.startsWith('svg:')) {
                const svgName = project.thumbnailImg.replace('svg:', '').trim();
                // Try window.iconsSvg first, then fall back to iconsData
                const svgContent = (window.iconsSvg && window.iconsSvg[svgName]) || iconsData[svgName];
                if (svgContent) {
                    iconDiv.innerHTML = svgContent;
                } else {
                    iconDiv.innerHTML = '📁'; // fallback
                }
            } else {
                iconDiv.innerHTML = '📁'; // fallback for non-SVG
            }
            row.appendChild(iconDiv);

            // Başlık
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('side-info');
            const title = document.createElement('span');
            title.classList.add('side-title');
            title.textContent = project.title || 'Başlık Yok';
            infoDiv.appendChild(title);
            if (project.description) {
                const desc = document.createElement('small');
                desc.textContent = project.description;
                infoDiv.appendChild(desc);
            }
            row.appendChild(infoDiv);

            // Sağ ok ikonu
            const arrowDiv = document.createElement('div');
            arrowDiv.classList.add('arrow');
            arrowDiv.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            row.appendChild(arrowDiv);

            container.appendChild(row);
        });
    }

    // --- Masonry Layout System ---
    let masonryInstance = null;
    let isLayouting = false;
    
    function initMasonry() {
        if (isLayouting) return;
        isLayouting = true;

        const container = document.getElementById('portfolioGridContainer');
        if (!container) {
            isLayouting = false;
            return;
        }

        const cards = Array.from(container.children);
        if (cards.length === 0) {
            isLayouting = false;
            return;
        }

        // Manuel masonry layout
        const columns = 4;
        const gap = 24;
        const containerWidth = container.offsetWidth;
        const cardWidth = (containerWidth - (gap * (columns - 1))) / columns;
        
        const columnHeights = new Array(columns).fill(0);
        const columnPositions = [];
        
        for (let i = 0; i < columns; i++) {
            columnPositions.push(i * (cardWidth + gap));
        }

        cards.forEach(card => {
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
            
            card.style.position = 'absolute';
            card.style.left = columnPositions[shortestColumnIndex] + 'px';
            card.style.top = columnHeights[shortestColumnIndex] + 'px';
            card.style.width = cardWidth + 'px';
            
            columnHeights[shortestColumnIndex] += card.offsetHeight + gap;
        });

        container.style.height = Math.max(...columnHeights) + 'px';
        isLayouting = false;
    }

    // Responsive masonry
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isLayouting = false;
            initMasonry();
        }, 100);
    });
}
