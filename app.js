// app.js - Curso STEAM con Supabase backend y gamificación completa

// ==================== CONFIGURACIÓN DE SUPABASE ====================
// ⚠️ IMPORTANTE: Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = "https://grkjhzkgcmackbafqudu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya2poemtnY21hY2tiYWZxdWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjg5MzQsImV4cCI6MjA5NjcwNDkzNH0.2nVTRlhey6HkGs_KZxtCaEp8L2QrvD0NUwY8ZFwZVHY";

supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== VARIABLES GLOBALES ====================
let currentUser = null;
let currentModule = 1;
let currentCardIndex = 0;
let modulesData = courseData.modules;
let progress = null;
let db = null;
let currentAvatar = "👨‍🏫";
let currentCardStartTime = null;
let currentCardId = null;

// ==================== AVATARES ====================
const avatars = ["👨‍🏫", "👩‍🏫", "🧑‍🚀", "👩‍🔬", "🧙‍♂️", "🦸‍♀️", "🐧", "🤖", "🦉", "⭐"];

// ==================== PREMIOS ====================
const prizes = [
    { id: "prize1", name: "📚 Guía STEAM", desc: "Libro digital exclusivo", xpCost: 150, icon: "📚", sponsor: null },
    { id: "prize2", name: "🎓 Certificado Avanzado", desc: "Reconocimiento adicional", xpCost: 200, icon: "🎓", sponsor: null },
    { id: "prize3", name: "🧩 Kit de materiales", desc: "Para tu salón de clases", xpCost: 500, icon: "🧩", sponsor: "Próximamente" },
    { id: "prize4", name: "☕ Coffee Break", desc: "Gift card", xpCost: 100, icon: "☕", sponsor: null },
    { id: "prize5", name: "📱 Asesoría 1:1", desc: "30 min con Profe Billy", xpCost: 300, icon: "📱", sponsor: null }
];

// ==================== LOGROS ====================
const badges = {
    firstCard: { id: "firstCard", name: "🌱 Primer paso", desc: "Completaste tu primera tarjeta", icon: "🌱", xpReward: 10 },
    module1: { id: "module1", name: "📘 Explorador STEAM", desc: "Completaste el Módulo 1", icon: "📘", xpReward: 50 },
    module2: { id: "module2", name: "🔧 Constructor", desc: "Completaste el Módulo 2", icon: "🔧", xpReward: 50 },
    module3: { id: "module3", name: "🧠 Metodólogo", desc: "Completaste el Módulo 3", icon: "🧠", xpReward: 50 },
    module4: { id: "module4", name: "📊 Evaluador", desc: "Completaste el Módulo 4", icon: "📊", xpReward: 50 },
    module5: { id: "module5", name: "🇬🇹 Agente de cambio", desc: "Completaste el Módulo 5", icon: "🇬🇹", xpReward: 50 },
    quizMaster: { id: "quizMaster", name: "🎯 Maestro de quizzes", desc: "10 quizzes correctos", icon: "🎯", xpReward: 30 },
    feedbackGiver: { id: "feedbackGiver", name: "💬 Tu voz importa", desc: "Diste feedback en 3 módulos", icon: "💬", xpReward: 40 },
    examPass: { id: "examPass", name: "🎓 Certificado STEAM", desc: "Aprobaste el examen final", icon: "🎓", xpReward: 100 },
    allModules: { id: "allModules", name: "🏆 STEAM Master", desc: "Completaste todos los módulos", icon: "🏆", xpReward: 200 },
    streak7: { id: "streak7", name: "🔥 Racha de 7 días", desc: "7 días seguidos aprendiendo", icon: "🔥", xpReward: 100 },
    streak30: { id: "streak30", name: "⚡ Leyenda", desc: "30 días de racha", icon: "⚡", xpReward: 500 },
    level5: { id: "level5", name: "🌟 Nivel 5", desc: "Alcanzaste el Nivel 5", icon: "🌟", xpReward: 100 }
};

// ==================== MISIONES DIARIAS ====================
const dailyMissionsList = [
    { id: "mission1", name: "📖 Completa 3 tarjetas", target: 3, type: "cards", reward: 30, current: 0 },
    { id: "mission2", name: "✅ Responde 2 quizzes", target: 2, type: "quizzes", reward: 25, current: 0 },
    { id: "mission3", name: "⭐ Gana 50 XP hoy", target: 50, type: "xp", reward: 20, current: 0 }
];

// ==================== INICIALIZAR INDEXEDDB ====================
function initDB() {
    return new Promise((resolve, reject) => {
        if (db) { resolve(db); return; }
        const request = indexedDB.open("SteamCourseDB", 3);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => { db = request.result; resolve(db); };
        request.onupgradeneeded = (event) => {
            const dbEvent = event.target.result;
            if (!dbEvent.objectStoreNames.contains("progressCache")) {
                dbEvent.createObjectStore("progressCache", { keyPath: "userId" });
            }
        };
    });
}

function saveToLocalCache(userId, data) {
    return initDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction("progressCache", "readwrite");
            const store = tx.objectStore("progressCache");
            store.put({ userId, data, updatedAt: Date.now() });
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    });
}

function loadFromLocalCache(userId) {
    return initDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction("progressCache", "readonly");
            const store = tx.objectStore("progressCache");
            const request = store.get(userId);
            request.onsuccess = () => resolve(request.result?.data);
            request.onerror = () => reject(request.error);
        });
    });
}

// ==================== SINCRONIZACIÓN CON SUPABASE ====================
async function syncWithSupabase() {
    if (!currentUser || !progress) return;
    
    updateSyncStatus("syncing", "Sincronizando...");
    
    try {
        const { error } = await supabase
            .from('progress')
            .upsert({
                user_id: currentUser.id,
                email: currentUser.email,
                current_module: currentModule,
                current_card: currentCardIndex,
                completed_cards: progress.completedCards || [],
                xp: progress.xp || 0,
                level: progress.level || 1,
                badges: progress.badges || [],
                redeemed_prizes: progress.redeemedPrizes || [],
                quiz_correct_count: progress.quizCorrectCount || 0,
                streak: progress.streak || 0,
                last_activity_date: progress.lastActivityDate || new Date().toISOString().split('T')[0],
                daily_missions: progress.dailyMissions || {},
                raffle_tickets: progress.raffleTickets || 0,
                module_feedback: progress.moduleFeedback || {},
                nps_history: progress.npsHistory || [],
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
        
        if (error) throw error;
        
        await saveToLocalCache(currentUser.id, progress);
        updateSyncStatus("online", "✓ Sincronizado");
        setTimeout(() => updateSyncStatus("online", "✓ Sincronizado"), 2000);
        
    } catch (error) {
        console.error("Error sync:", error);
        updateSyncStatus("offline", "⚠️ Sin conexión");
        await saveToLocalCache(currentUser.id, progress);
    }
}

async function loadFromSupabase() {
    if (!currentUser) return null;
    
    try {
        const { data, error } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        
        if (data) {
            return {
                completedCards: data.completed_cards || [],
                xp: data.xp || 0,
                level: data.level || 1,
                badges: data.badges || [],
                redeemedPrizes: data.redeemed_prizes || [],
                quizCorrectCount: data.quiz_correct_count || 0,
                streak: data.streak || 0,
                lastActivityDate: data.last_activity_date,
                dailyMissions: data.daily_missions || {},
                raffleTickets: data.raffle_tickets || 0,
                moduleFeedback: data.module_feedback || {},
                npsHistory: data.nps_history || []
            };
        }
        return null;
    } catch (error) {
        console.error("Error loading:", error);
        return await loadFromLocalCache(currentUser.id);
    }
}

// ==================== AUTENTICACIÓN ====================
async function loginWithEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        currentUser = data.user;
        currentAvatar = currentUser.user_metadata?.avatar || "👨‍🏫";
        document.getElementById("avatarPreview").innerHTML = currentAvatar;
        
        const cloudProgress = await loadFromSupabase();
        
        if (cloudProgress) {
            progress = cloudProgress;
            currentModule = cloudProgress.current_module || 1;
            currentCardIndex = cloudProgress.current_card || 0;
        } else {
            progress = {
                completedCards: [],
                moduleFeedback: {},
                npsHistory: [],
                xp: 0,
                level: 1,
                badges: [],
                redeemedPrizes: [],
                quizCorrectCount: 0,
                streak: 0,
                lastActivityDate: new Date().toISOString().split('T')[0],
                dailyMissions: {},
                raffleTickets: 0
            };
        }
        
        initExistingModuleDates();
        checkDailyStreak();
        loadDailyMissions();
        await syncWithSupabase();
        return true;
    } catch (error) {
        showLoginError(error.message);
        return false;
    }
}

async function registerWithEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email, password,
            options: { data: { avatar: "👨‍🏫", created_at: new Date().toISOString() } }
        });
        if (error) throw error;
        
        currentUser = data.user;
        currentAvatar = "👨‍🏫";
        
        progress = {
            completedCards: [],
            moduleFeedback: {},
            npsHistory: [],
            xp: 0,
            level: 1,
            badges: [],
            redeemedPrizes: [],
            quizCorrectCount: 0,
            streak: 1,
            lastActivityDate: new Date().toISOString().split('T')[0],
            dailyMissions: {},
            raffleTickets: 0
        };
        
        checkDailyStreak();
        loadDailyMissions();
        await syncWithSupabase();
        showToast("¡Registro exitoso! Bienvenido al curso", "success");
        return true;
    } catch (error) {
        showLoginError(error.message);
        return false;
    }
}


async function logout() {
    await supabase.auth.signOut();
    currentUser = null;
    progress = null;
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("mainApp").classList.add("hidden");
}

async function checkExistingSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        currentAvatar = currentUser.user_metadata?.avatar || "👨‍🏫";
        document.getElementById("avatarPreview").innerHTML = currentAvatar;
        
        const cloudProgress = await loadFromSupabase();
        if (cloudProgress) {
            progress = cloudProgress;
            currentModule = cloudProgress.current_module || 1;
            currentCardIndex = cloudProgress.current_card || 0;
        } else {
            progress = {
                completedCards: [], moduleFeedback: {}, npsHistory: [], xp: 0, level: 1,
                badges: [], redeemedPrizes: [], quizCorrectCount: 0, streak: 0,
                lastActivityDate: new Date().toISOString().split('T')[0],
                dailyMissions: {}, raffleTickets: 0
            };
        }
        
        initExistingModuleDates();
        checkDailyStreak();
        loadDailyMissions();

        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");
        loadSavedProgress();
        renderCard();
        updateUI();
        checkBadges();
        displayReferralLink();
        checkReferrerReward();
        if (!localStorage.getItem('onboardingDone')) setTimeout(startOnboarding, 800);
        return true;
    }
    return false;
}

function showLoginError(msg) {
    const errorDiv = document.getElementById("loginError");
    errorDiv.textContent = msg;
    errorDiv.classList.remove("hidden");
    setTimeout(() => errorDiv.classList.add("hidden"), 3000);
}

// ==================== FUNCIONES DE GAMIFICACIÓN ====================
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function updateUI() {
    if (!progress) return;
    const module = modulesData[currentModule-1];
    if (!module) return;

    const totalCards = module.cards.length;
    const cardCounter = document.getElementById("cardCounter");
    if (cardCounter) cardCounter.innerText = `${currentCardIndex + 1} / ${totalCards}`;

    const moduleBadge = document.getElementById("moduleBadge");
    if (moduleBadge) moduleBadge.innerHTML = `Módulo ${currentModule} / 5`;

    const totalAll = modulesData.reduce((acc, m) => acc + m.cards.length, 0);
    const completedTotal = progress.completedCards?.length || 0;
    const coursePercent = Math.round((completedTotal / totalAll) * 100);
    const courseProgressBar = document.getElementById("courseProgressBar");
    if (courseProgressBar) courseProgressBar.style.width = `${coursePercent}%`;
    const courseProgressPercent = document.getElementById("courseProgressPercent");
    if (courseProgressPercent) courseProgressPercent.innerText = `${coursePercent}%`;

    const xpDisplay = document.getElementById("xpDisplay");
    if (xpDisplay) xpDisplay.innerText = progress.xp || 0;
    const levelDisplay = document.getElementById("levelDisplay");
    if (levelDisplay) levelDisplay.innerText = `Nv.${progress.level || 1}`;

    // Mostrar nombre/email y foto en perfil
    if (currentUser) {
        const emailEl = document.getElementById("userEmailDisplay");
        if (emailEl) emailEl.textContent = getDisplayName();
        const photo = progress?.dailyMissions?.profilePhoto;
        if (photo) updateProfilePhotoDisplay(photo);
    }

    updateStreakDisplay();

    // Botón de certificado en perfil
    const certBtn = document.getElementById('certDownloadBtn');
    if (certBtn) {
        const examScore = progress.dailyMissions?.examScore;
        if (examScore !== undefined) {
            certBtn.classList.remove('hidden');
            window._lastExamScore = examScore;
        } else {
            certBtn.classList.add('hidden');
        }
    }
}

function updateSyncStatus(status, message) {
    const syncSpan = document.getElementById("syncStatus");
    if (syncSpan) syncSpan.innerHTML = message;
    const syncIcon = document.querySelector("#syncIndicator i");
    if (syncIcon) {
        if (status === "syncing") syncIcon.className = "fas fa-spinner fa-spin text-yellow-500";
        else if (status === "offline") syncIcon.className = "fas fa-cloud-upload-alt text-gray-400";
        else syncIcon.className = "fas fa-cloud-upload-alt text-green-500";
    }
}

function saveProgress() {
    if (!progress) return;
    localStorage.setItem("steamProgressBackup", JSON.stringify(progress));
    if (navigator.onLine && currentUser) {
        syncWithSupabase();
    } else if (currentUser) {
        saveToLocalCache(currentUser.id, progress);
    }
    updateUI();
    checkBadges();
}

function addXP(amount, reason) {
    if (!progress) return;
    progress.xp += amount;
    showToast(`+${amount} XP ✨ (${reason})`, "success");
    
    const newLevel = Math.floor(progress.xp / 200) + 1;
    if (newLevel > progress.level) {
        progress.level = newLevel;
        showToast(`🎉 ¡SUBISTE AL NIVEL ${newLevel}!`, "levelup");
        if (newLevel === 5 && !progress.badges.includes("level5")) unlockBadge("level5");
        if (newLevel === 10) generateLevelCertificate(newLevel);
        progress.raffleTickets = (progress.raffleTickets || 0) + 1;
    }
    
    updateMissionProgress("xp", amount);
    saveProgress();
    updateUI();
}

function unlockBadge(badgeId) {
    if (progress.badges.includes(badgeId)) return;
    const badge = badges[badgeId];
    if (!badge) return;
    progress.badges.push(badgeId);
    addXP(badge.xpReward, `Logro: ${badge.name}`);
    showToast(`🏅 ¡NUEVO LOGRO! ${badge.name} (+${badge.xpReward} XP)`, "badge");
    saveProgress();
}

function checkBadges() {
    if (!progress) return;
    if (progress.completedCards.length >= 1 && !progress.badges.includes("firstCard")) unlockBadge("firstCard");
    
    let modulesCompleted = 0;
    for (let i = 1; i <= modulesData.length; i++) {
        const moduleCards = modulesData[i-1].cards.length;
        let completedInModule = 0;
        for (let j = 0; j < moduleCards; j++) {
            if (progress.completedCards.includes(`${i}-${j}`)) completedInModule++;
        }
        if (completedInModule === moduleCards) {
            modulesCompleted++;
            if (i === 1 && !progress.badges.includes("module1")) unlockBadge("module1");
            if (i === 2 && !progress.badges.includes("module2")) unlockBadge("module2");
            if (i === 3 && !progress.badges.includes("module3")) unlockBadge("module3");
            if (i === 4 && !progress.badges.includes("module4")) unlockBadge("module4");
            if (i === 5 && !progress.badges.includes("module5")) unlockBadge("module5");
        }
    }
    if (modulesCompleted === modulesData.length && !progress.badges.includes("allModules")) unlockBadge("allModules");
    if ((progress.quizCorrectCount || 0) >= 10 && !progress.badges.includes("quizMaster")) unlockBadge("quizMaster");
    const feedbackCount = Object.keys(progress.moduleFeedback || {}).length;
    if (feedbackCount >= 3 && !progress.badges.includes("feedbackGiver")) unlockBadge("feedbackGiver");
}

function checkDailyStreak() {
    const today = new Date().toISOString().split("T")[0];
    const lastActivity = progress.lastActivityDate;
    
    if (!lastActivity) {
        progress.streak = 1;
        progress.lastActivityDate = today;
        saveProgress();
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    
    if (lastActivity === today) return;
    else if (lastActivity === yesterdayStr) {
        progress.streak = (progress.streak || 0) + 1;
        progress.lastActivityDate = today;
        saveProgress();
        if (progress.streak === 7 && !progress.badges.includes("streak7")) unlockBadge("streak7");
        if (progress.streak === 30 && !progress.badges.includes("streak30")) unlockBadge("streak30");
        if (progress.streak % 5 === 0) addXP(20, `Racha de ${progress.streak} días`);
    } else {
        if (progress.streak > 1) showToast(`😢 Se rompió tu racha de ${progress.streak} días`, "warning");
        progress.streak = 1;
        progress.lastActivityDate = today;
        saveProgress();
    }
    updateStreakDisplay();
}

function updateStreakDisplay() {
    const streakSpan = document.getElementById("streakDisplay");
    if (streakSpan) streakSpan.innerText = progress.streak || 0;
}

// ==================== MISIONES DIARIAS ====================
function loadDailyMissions() {
    const today = new Date().toISOString().split("T")[0];
    const savedMissions = progress.dailyMissions || {};
    
    if (savedMissions.date !== today) {
        const newMissions = dailyMissionsList.map(m => ({ ...m, current: 0, completed: false, claimed: false }));
        progress.dailyMissions = { date: today, missions: newMissions };
        saveProgress();
    }
    renderDailyMissions();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const hoursLeft = Math.round((tomorrow - new Date()) / (1000 * 60 * 60));
    const resetSpan = document.getElementById("missionsReset");
    if (resetSpan) resetSpan.innerText = `Reinicia en ${hoursLeft}h`;
}

function renderDailyMissions() {
    const container = document.getElementById("missionsList");
    if (!container) return;
    const missions = progress.dailyMissions?.missions || [];
    if (missions.length === 0) {
        container.innerHTML = '<div class="text-gray-400 text-center">¡Completa misiones para ganar XP extra!</div>';
        return;
    }
    let html = "";
    missions.forEach(mission => {
        const progressPercent = Math.min((mission.current / mission.target) * 100, 100);
        html += `<div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-1">
                <span>${mission.completed ? (mission.claimed ? "✅" : "🔓") : "⏳"}</span>
                <span class="${mission.completed ? 'text-green-600' : 'text-gray-600'}">${mission.name}</span>
                <span class="text-yellow-600">(+${mission.reward} XP)</span>
            </div>
            <div class="w-24 bg-gray-200 rounded-full h-1.5"><div class="bg-yellow-500 h-1.5 rounded-full" style="width: ${progressPercent}%"></div></div>
            ${mission.completed && !mission.claimed ? `<button data-mission="${mission.id}" class="claim-mission-btn bg-green-500 text-white text-[10px] px-2 py-0.5 rounded hover:bg-green-600 transition">Reclamar</button>` : ''}
        </div>`;
    });
    container.innerHTML = html;
    document.querySelectorAll('.claim-mission-btn').forEach(btn => {
        btn.addEventListener('click', () => claimMissionReward(btn.dataset.mission));
    });
}

function updateMissionProgress(type, amount = 1) {
    const missions = progress.dailyMissions?.missions || [];
    let updated = false;
    missions.forEach(mission => {
        if (!mission.completed && mission.type === type) {
            mission.current += amount;
            if (mission.current >= mission.target) {
                mission.completed = true;
                showToast(`🎯 ¡Misión completada: ${mission.name}! Reclama tu recompensa`, "success");
            }
            updated = true;
        }
    });
    if (updated) { saveProgress(); renderDailyMissions(); }
}

function claimMissionReward(missionId) {
    const missions = progress.dailyMissions?.missions || [];
    const mission = missions.find(m => m.id === missionId);
    if (mission && mission.completed && !mission.claimed) {
        mission.claimed = true;
        addXP(mission.reward, `Misión: ${mission.name}`);
        saveProgress();
        renderDailyMissions();
    }
}

function generateLevelCertificate(level) {
    const canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F3F4F6'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 10; ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = '#1E3A8A'; ctx.font = 'bold 24px Arial'; ctx.fillText(`CERTIFICADO DE NIVEL ${level}`, 150, 100);
    ctx.font = '18px Arial'; ctx.fillStyle = '#333';
    ctx.fillText(`Otorgado a: ${currentUser.email || currentUser.id.substring(0, 10)}`, 120, 180);
    ctx.fillText(`Por alcanzar el Nivel ${level} en el Curso STEAM`, 120, 250);
    ctx.fillText(`Fecha: ${new Date().toLocaleDateString()}`, 200, 320);
    const link = document.createElement('a');
    link.download = `certificado_nivel_${level}.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast(`📜 Certificado de Nivel ${level} generado`, "success");
}

// ==================== FUNCIONES BASE DEL CURSO ====================
function renderCard() {
    const module = modulesData[currentModule-1];
    if (!module) return;
    const card = module.cards[currentCardIndex];
    if (!card) return;
    const container = document.getElementById("cardContainer");
    if (!container) return;
    
    // Iniciar tracking de tiempo
    if (currentCardId) stopCardTracking();
    currentCardId = card.id || `${currentModule}-${currentCardIndex}`;
    startCardTracking();
    
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (card.type === "content") {
        // Habilitar navegación normal en tarjetas de contenido
        if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = "1"; }

        const cardId = `${currentModule}-${currentCardIndex}`;
        if (!progress.completedCards.includes(cardId)) {
            progress.completedCards.push(cardId);
            updateMissionProgress("cards", 1);
            saveProgress();
        }

        const theme = (typeof MODULE_THEME !== 'undefined' && MODULE_THEME[currentModule]) || { primary:'#0097A7', soft:'#E0F7FA' };
        const illus = (typeof MODULE_ILLUSTRATIONS !== 'undefined' && MODULE_ILLUSTRATIONS[currentModule]) || '';
        const totalCards = module.cards.length;
        const profeName = getDisplayName();
        const cardContent = (card.content || '').replace(/Profe Billy/g, profeName);
        const cardExtra   = (card.extra   || '').replace(/Profe Billy/g, profeName);

        container.innerHTML = `
        <div class="content-card" id="activeCard">
            <div class="card-banner" style="background:${theme.primary}">
                <div class="card-banner-svg">${illus}</div>
                <p class="card-banner-sub">${module.title} &nbsp;·&nbsp; ${currentCardIndex+1} de ${totalCards}</p>
            </div>
            <div class="card-body">
                <h2>${card.title}</h2>
                <p>${cardContent}</p>
                ${cardExtra ? `
                <div class="card-key-insight" style="background:${theme.soft};border-color:${theme.primary};color:${theme.primary}">
                    <span style="font-weight:700">💡 Dato clave:</span> ${cardExtra}
                </div>` : ''}
            </div>
            ${card.project ? `
            <div class="card-footer">
                <button onclick="showProjectModal(${JSON.stringify(card).replace(/"/g,'&quot;')})"
                    class="w-full text-white font-bold py-2.5 rounded-2xl text-sm transition flex items-center justify-center gap-2"
                    style="background:${theme.primary}">
                    📋 Ver instrucciones para implementar en clase
                </button>
            </div>` : ''}
            <div class="card-swipe-hint">
                <i class="fas fa-arrow-left"></i> &nbsp;desliza para navegar&nbsp; <i class="fas fa-arrow-right"></i>
            </div>
        </div>`;

    } else if (card.type === "quiz") {
        // Bloquear botón Siguiente hasta responder correctamente
        if (nextBtn) { nextBtn.disabled = true; nextBtn.style.opacity = "0.4"; }

        let optionsHtml = "";
        card.options.forEach((opt, idx) => {
            optionsHtml += `
            <button class="quiz-option w-full text-left p-3 rounded-2xl mb-2" data-opt="${idx}">
                <span class="option-letter">${String.fromCharCode(65+idx)}</span>
                <span class="text-gray-700 text-sm font-medium">${opt}</span>
            </button>`;
        });

        const quizSvg = (typeof QUIZ_SVG !== 'undefined') ? QUIZ_SVG : '';
        const quizThemePrimary = '#4f46e5';

        container.innerHTML = `
        <div class="quiz-card" id="activeCard">
            <div class="card-banner" style="background:${quizThemePrimary}">
                <div class="card-banner-svg">${quizSvg}</div>
                <p class="card-banner-sub">✅ &nbsp;Quiz · Módulo ${currentModule}</p>
            </div>
            <div class="card-body">
                <h2>${card.question}</h2>
                <div id="quizOptions">${optionsHtml}</div>
                <div id="quizFeedback" class="hidden mt-3 p-3 rounded-2xl text-sm font-medium"></div>
                <p id="quizHint" class="text-center text-xs text-gray-400 mt-3">
                    <i class="fas fa-hand-pointer"></i> Selecciona una respuesta para continuar
                </p>
            </div>
        </div>`;

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                // Desactivar todos los botones tras responder
                document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

                const selected = parseInt(btn.dataset.opt);
                const isCorrect = (selected === card.correct);
                const feedbackDiv = document.getElementById('quizFeedback');
                const hint = document.getElementById('quizHint');
                if (hint) hint.classList.add('hidden');

                // Marcar visualmente la opción seleccionada
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
                if (!isCorrect) {
                    // Mostrar también la correcta
                    document.querySelectorAll('.quiz-option').forEach(b => {
                        if (parseInt(b.dataset.opt) === card.correct) b.classList.add('correct');
                    });
                }

                if (feedbackDiv) {
                    feedbackDiv.classList.remove('hidden');
                    if (isCorrect) {
                        feedbackDiv.className = 'mt-3 p-3 rounded-2xl text-sm font-medium bg-green-50 text-green-700 border border-green-200';
                        feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> ¡Correcto! ${card.explanation}`;
                        const cardId = `${currentModule}-${currentCardIndex}`;
                        if (!progress.completedCards.includes(cardId)) {
                            progress.completedCards.push(cardId);
                            addXP(10, `Quiz correcto: ${card.title}`);
                            progress.quizCorrectCount = (progress.quizCorrectCount || 0) + 1;
                            updateMissionProgress("quizzes", 1);
                            saveProgress();
                        }
                        // Habilitar Siguiente (el usuario avanza manualmente)
                        if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = "1"; }
                    } else {
                        feedbackDiv.className = 'mt-3 p-3 rounded-2xl text-sm font-medium bg-red-50 text-red-700 border border-red-200';
                        feedbackDiv.innerHTML = `<i class="fas fa-times-circle"></i> Incorrecto. ${card.explanation}
                            <button onclick="goToRefCard()" class="mt-2 block w-full text-center text-xs font-bold text-indigo-600 hover:underline py-1">← Repasar tarjeta relacionada</button>`;
                        if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = "1"; }
                    }
                }
            });
        });
    }
    initSwipe();
}

function startCardTracking() {
    if (currentCardId) {
        currentCardStartTime = Date.now();
    }
}

function stopCardTracking() {
    if (currentCardId && currentCardStartTime && currentUser) {
        const timeSpent = Math.round((Date.now() - currentCardStartTime) / 1000);
        if (timeSpent > 0) {
            supabase.from('resource_views').insert({
                resource_type: 'card',
                resource_id: currentCardId,
                user_id: currentUser.id,
                time_spent_seconds: Math.min(timeSpent, 300)
            }).then(({ error: e }) => { if (e) console.log("Track error:", e); });
        }
        currentCardStartTime = null;
    }
}

function animateCard(direction) {
    const card = document.getElementById('activeCard');
    if (!card) return;
    card.classList.remove('slide-in-left','slide-in-right');
    void card.offsetWidth; // reflow
    card.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
}

function showComingSoon() {
    showToast('🎁 ¡Muy pronto! Los premios estarán disponibles próximamente.');
}

function goToNextCard() {
    const module = modulesData[currentModule-1];
    if (!module) return;
    if (currentCardIndex + 1 < module.cards.length) {
        currentCardIndex++;
        saveProgress();
        renderCard();
        animateCard('next');
        updateMissionProgress("cards", 1);
    } else if (currentModule < modulesData.length) {
        stopCardTracking();
        showModuleComplete(currentModule, () => askModuleFeedback(currentModule));
    } else {
        stopCardTracking();
        showModuleComplete(currentModule, () => askModuleFeedback(currentModule));
    }
}

function goToPrevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        saveProgress();
        renderCard();
        animateCard('prev');
    } else if (currentModule > 1) {
        currentModule--;
        const prevModule = modulesData[currentModule-1];
        currentCardIndex = prevModule.cards.length - 1;
        saveProgress();
        renderCard();
    }
}

function askModuleFeedback(moduleId) {
    if (progress.moduleFeedback?.[moduleId]) { continueToNextModule(); return; }
    const moduleName = modulesData[moduleId-1].title;
    const feedbackHtml = `<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl max-w-md w-full p-6"><h2 class="text-xl font-bold text-indigo-800 mb-2">📝 ¿Cómo te fue en ${moduleName}?</h2><div class="mb-4"><label class="block font-medium mb-2">Satisfacción (1-5)</label><div class="flex gap-2 justify-between" id="ratingStars">${[1,2,3,4,5].map(n => `<button data-rating="${n}" class="rating-star text-3xl text-gray-300 hover:text-yellow-400 transition">★</button>`).join('')}</div><input type="hidden" id="selectedRating" value="0"></div><div class="mb-4"><label class="block font-medium mb-2">NPS (0-10): ¿Recomendarías este curso a otro docente?</label><div class="grid grid-cols-5 gap-1">${[0,1,2,3,4,5,6,7,8,9,10].map(n => `<button data-nps="${n}" class="nps-btn w-9 h-9 rounded-full bg-gray-200 hover:bg-indigo-500 hover:text-white transition text-sm">${n}</button>`).join('')}</div><input type="hidden" id="selectedNPS" value="-1"></div><div class="mb-4"><textarea id="feedbackComment" rows="3" class="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Comentario o sugerencia (opcional)"></textarea></div><div class="flex gap-2"><button id="submitFeedbackBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full flex-1 transition">Enviar</button><button id="skipFeedbackBtn" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition">Omitir</button></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', feedbackHtml);
    
    document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            document.getElementById('selectedRating').value = rating;
            document.querySelectorAll('.rating-star').forEach((s, i) => { if (i < rating) s.classList.add('text-yellow-400'); else s.classList.remove('text-yellow-400'); });
        });
    });
    document.querySelectorAll('.nps-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nps = parseInt(btn.dataset.nps);
            document.getElementById('selectedNPS').value = nps;
            document.querySelectorAll('.nps-btn').forEach(b => { b.classList.remove('bg-indigo-500', 'text-white'); b.classList.add('bg-gray-200'); });
            btn.classList.add('bg-indigo-500', 'text-white');
        });
    });
    document.getElementById('submitFeedbackBtn').addEventListener('click', () => {
        const rating = parseInt(document.getElementById('selectedRating').value);
        const nps = parseInt(document.getElementById('selectedNPS').value);
        const comment = document.getElementById('feedbackComment').value;
        if (rating === 0) { alert("Por favor, selecciona una calificación de 1 a 5"); return; }
        if (nps === -1) { alert("Por favor, selecciona un puntaje NPS del 0 al 10"); return; }
        progress.moduleFeedback[moduleId] = { moduleName, rating, nps, comment, timestamp: new Date().toISOString(), moduleId };
        progress.npsHistory = progress.npsHistory || [];
        progress.npsHistory.push({ moduleId, moduleName, nps, timestamp: new Date().toISOString() });
        // Guardar también en tabla feedback para que el admin lo pueda ver
        supabase.from('feedback').insert({
            user_id: currentUser.id,
            module_id: moduleId,
            module_name: moduleName,
            rating,
            nps,
            comment: comment || null,
            created_at: new Date().toISOString()
        }).then(({ error: e }) => { if (e) console.log("Feedback insert error:", e); });
        addXP(20, `Feedback módulo ${moduleId}`);
        saveProgress();
        document.querySelector('.fixed.bg-black.bg-opacity-50').remove();
        continueToNextModule();
    });
    document.getElementById('skipFeedbackBtn').addEventListener('click', () => {
        document.querySelector('.fixed.bg-black.bg-opacity-50').remove();
        continueToNextModule();
    });
}

// ==================== BLOQUEO DE MÓDULOS ====================
// Para usuarios existentes que ya avanzaron, marcamos todos los módulos anteriores
// al actual como desbloqueados desde hoy (no retroactivo = no castigo).
function initExistingModuleDates() {
    if (!progress || !currentModule) return;
    const today = new Date().toISOString().split('T')[0];
    for (let m = 2; m <= currentModule; m++) {
        if (!getModuleStartDate(m)) {
            setModuleStartDate(m, today);
            setModuleEarlyUnlock(m); // se considera desbloqueado
        }
    }
}

const XP_UNLOCK_COST = 200;
const DAYS_PER_MODULE = 7;

function getModuleStartDate(moduleNum) {
    if (moduleNum === 1) return null; // módulo 1 siempre disponible
    const dm = progress?.dailyMissions || {};
    return dm[`moduleStart_${moduleNum}`] || null;
}

function setModuleStartDate(moduleNum, dateStr) {
    if (!progress.dailyMissions) progress.dailyMissions = {};
    progress.dailyMissions[`moduleStart_${moduleNum}`] = dateStr;
}

function isModuleEarlyUnlocked(moduleNum) {
    const dm = progress?.dailyMissions || {};
    return dm[`moduleEarlyUnlock_${moduleNum}`] === true;
}

function setModuleEarlyUnlock(moduleNum) {
    if (!progress.dailyMissions) progress.dailyMissions = {};
    progress.dailyMissions[`moduleEarlyUnlock_${moduleNum}`] = true;
}

function daysUntilUnlock(moduleNum) {
    const startDate = getModuleStartDate(moduleNum);
    if (!startDate) return DAYS_PER_MODULE;
    const start = new Date(startDate);
    const now = new Date();
    const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return Math.max(0, DAYS_PER_MODULE - diffDays);
}

function isModuleLocked(moduleNum) {
    if (moduleNum <= 1) return false;
    if (isModuleEarlyUnlocked(moduleNum)) return false;
    const startDate = getModuleStartDate(moduleNum);
    if (!startDate) return true; // nunca se desbloqueó
    return daysUntilUnlock(moduleNum) > 0;
}

async function unlockModuleWithXP(moduleNum) {
    const cost = XP_UNLOCK_COST;
    if ((progress.xp || 0) < cost) {
        showToast(`Necesitas ${cost} XP para desbloquear este módulo. Tienes ${progress.xp || 0} XP.`, 'error');
        return;
    }
    if (!isModuleLocked(moduleNum)) {
        showToast('Este módulo ya está disponible.', 'info');
        return;
    }
    progress.xp -= cost;
    setModuleEarlyUnlock(moduleNum);
    setModuleStartDate(moduleNum, new Date().toISOString().split('T')[0]);
    saveProgress();
    showToast(`🔓 ¡Módulo ${moduleNum} desbloqueado! (-${cost} XP)`, 'success');
    renderModulesTab();
    updateUI();
}

function renderModulesTab() {
    const container = document.getElementById('modulesIndexList');
    if (!container || !modulesData) return;

    const totalModules = modulesData.length;
    let html = '';

    for (let i = 1; i <= totalModules; i++) {
        const mod = modulesData[i - 1];
        const theme = (typeof MODULE_THEME !== 'undefined') ? MODULE_THEME[i] : { primary: '#0097A7', soft: '#E0F7FA' };
        const illus = (typeof MODULE_ILLUSTRATIONS !== 'undefined') ? MODULE_ILLUSTRATIONS[i] : '';

        const locked = isModuleLocked(i);
        const isCurrentMod = (i === currentModule);
        const isCompleted = (i < currentModule);
        const daysLeft = locked ? daysUntilUnlock(i) : 0;
        const xpAvail = progress?.xp || 0;
        const canPayXP = xpAvail >= XP_UNLOCK_COST;

        // Cards seen in this module
        const modCards = mod.cards || [];
        const modCardIds = modCards.map(c => c.id);
        const seenInMod = modCardIds.filter(id => (progress?.completedCards || []).includes(id)).length;
        const pct = modCards.length > 0 ? Math.round((seenInMod / modCards.length) * 100) : 0;

        let statusBadge = '';
        let actionBtn = '';
        let opacity = '';

        if (locked) {
            opacity = 'opacity-60';
            statusBadge = `<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">🔒 ${daysLeft}d</span>`;
            actionBtn = canPayXP
                ? `<button onclick="unlockModuleWithXP(${i})" class="mt-3 w-full text-sm font-bold py-2 rounded-xl text-white" style="background:${theme.primary}">
                       🔓 Desbloquear con ${XP_UNLOCK_COST} XP
                   </button>`
                : `<p class="mt-2 text-xs text-slate-400 text-center">Disponible en ${daysLeft} día${daysLeft !== 1 ? 's' : ''} · o con ${XP_UNLOCK_COST} XP</p>`;
        } else if (isCompleted) {
            statusBadge = `<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">✅ Completado</span>`;
            actionBtn = `<button onclick="goToModule(${i})" class="mt-3 w-full text-sm font-semibold py-2 rounded-xl border-2" style="color:${theme.primary};border-color:${theme.primary}">
                             Repasar módulo
                         </button>`;
        } else if (isCurrentMod) {
            statusBadge = `<span class="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style="background:${theme.primary}">▶ En curso</span>`;
            actionBtn = `<button onclick="goToModule(${i})" class="mt-3 w-full text-sm font-bold py-2 rounded-xl text-white" style="background:${theme.primary}">
                             Continuar →
                         </button>`;
        } else {
            statusBadge = `<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">○ Disponible</span>`;
            actionBtn = `<button onclick="goToModule(${i})" class="mt-3 w-full text-sm font-bold py-2 rounded-xl text-white" style="background:${theme.primary}">
                             Comenzar →
                         </button>`;
        }

        html += `
        <div class="rounded-2xl overflow-hidden shadow-sm border border-slate-100 ${opacity}">
            <div class="flex items-center gap-3 p-3" style="background:${theme.soft}">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${theme.primary}">
                    <div class="w-9 h-9">${illus}</div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Módulo ${i}</span>
                        ${statusBadge}
                    </div>
                    <p class="text-sm font-bold text-slate-800 leading-tight mt-0.5 truncate">${mod.title}</p>
                </div>
            </div>
            <div class="bg-white px-4 py-3">
                <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>${seenInMod} / ${modCards.length} tarjetas</span>
                    <span>${pct}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="h-1.5 rounded-full" style="width:${pct}%;background:${theme.primary};transition:width .4s"></div>
                </div>
                ${actionBtn}
            </div>
        </div>`;
    }

    container.innerHTML = html;
}

function goToModule(modNum) {
    if (isModuleLocked(modNum)) {
        showToast(`El módulo ${modNum} está bloqueado.`, 'error');
        return;
    }
    currentModule = modNum;
    // Find first unseen card index for this module, or restart at 0
    const mod = modulesData[modNum - 1];
    let startIdx = 0;
    if (mod) {
        const seen = progress?.completedCards || [];
        const firstUnseen = mod.cards.findIndex(c => !seen.includes(c.id));
        startIdx = firstUnseen >= 0 ? firstUnseen : 0;
    }
    currentCardIndex = startIdx;
    switchTab('home');
    renderCard();
    animateCard('next');
}

function continueToNextModule() {
    const nextModule = currentModule + 1;
    if (nextModule > modulesData.length) {
        // Curso terminado
        currentModule = nextModule;
        currentCardIndex = 0;
        saveProgress();
        renderCard();
        animateCard('next');
        return;
    }

    // Si el siguiente módulo no tiene fecha de inicio, asignamos hoy
    if (!getModuleStartDate(nextModule)) {
        setModuleStartDate(nextModule, new Date().toISOString().split('T')[0]);
        saveProgress();
    }

    if (isModuleLocked(nextModule)) {
        const days = daysUntilUnlock(nextModule);
        const xp = progress?.xp || 0;
        const canPay = xp >= XP_UNLOCK_COST;
        const theme = (typeof MODULE_THEME !== 'undefined') ? MODULE_THEME[nextModule] : { primary: '#0097A7' };
        const mod = modulesData[nextModule - 1];

        const html = `
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <div class="text-center mb-4">
                    <div class="text-4xl mb-2">🔒</div>
                    <h3 class="text-lg font-bold text-slate-800">Módulo ${nextModule} bloqueado</h3>
                    <p class="text-sm text-slate-500 mt-1">${mod?.title || ''}</p>
                </div>
                <p class="text-sm text-slate-600 text-center mb-4">
                    Este módulo estará disponible en <strong>${days} día${days !== 1 ? 's' : ''}</strong>.<br>
                    O puedes desbloquearlo ahora gastando <strong>${XP_UNLOCK_COST} XP</strong>.
                </p>
                <p class="text-center text-sm mb-5">Tu XP actual: <strong>${xp} ⚡</strong></p>
                <div class="space-y-2">
                    ${canPay ? `<button id="payXPBtn" class="w-full py-3 rounded-xl text-white font-bold text-sm" style="background:${theme.primary}">
                        🔓 Desbloquear ahora (${XP_UNLOCK_COST} XP)
                    </button>` : `<p class="text-center text-xs text-slate-400">Necesitas ${XP_UNLOCK_COST - xp} XP más para desbloqueo anticipado</p>`}
                    <button id="goModulosBtn" class="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm">
                        Ver mis módulos
                    </button>
                    <button id="closeModLockBtn" class="w-full py-2 text-slate-400 text-sm">Cerrar</button>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', html);
        const overlay = document.body.lastElementChild;
        overlay.querySelector('#closeModLockBtn')?.addEventListener('click', () => overlay.remove());
        overlay.querySelector('#goModulosBtn')?.addEventListener('click', () => { overlay.remove(); switchTab('modulos'); });
        if (canPay) {
            overlay.querySelector('#payXPBtn')?.addEventListener('click', async () => {
                overlay.remove();
                await unlockModuleWithXP(nextModule);
                if (!isModuleLocked(nextModule)) continueToNextModule();
            });
        }
        return;
    }

    currentModule = nextModule;
    currentCardIndex = 0;
    saveProgress();
    renderCard();
    animateCard('next');
}

let touchStartX = 0;
function initSwipe() {
    const card = document.getElementById('activeCard');
    if (!card) return;
    card.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    card.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diffX) > 50) { if (diffX > 0) goToPrevCard(); else goToNextCard(); }
    });
}

// ==================== MODALES ====================
function showBadgesModal() {
    let badgesHtml = "";
    Object.values(badges).forEach(badge => {
        const unlocked = progress.badges.includes(badge.id);
        badgesHtml += `<div class="bg-gray-50 rounded-xl p-3 text-center ${unlocked ? 'border-2 border-yellow-400' : 'opacity-50'}"><div class="text-4xl mb-1">${badge.icon}</div><div class="font-bold text-sm">${badge.name}</div><div class="text-xs text-gray-500">${badge.desc}</div>${unlocked ? '<span class="text-green-500 text-xs"><i class="fas fa-check"></i> Desbloqueado</span>' : `<span class="text-gray-400 text-xs">+${badge.xpReward} XP</span>`}</div>`;
    });
    document.getElementById('badgesList').innerHTML = badgesHtml;
    document.getElementById('badgesModal').classList.remove('hidden');
}

function shareBadges() {
    const badgesList = progress.badges.map(b => badges[b]?.name || b).join(", ");
    const text = `🎓 He completado ${progress.badges.length} logros en el Curso STEAM de Profe Billy! Mi nivel: ${progress.level} | XP: ${progress.xp} #STEAM #ProfeBilly`;
    if (navigator.share) {
        navigator.share({ title: "Mis logros STEAM", text: text }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text);
        showToast("📋 Texto copiado al portapapeles", "info");
    }
}

function showRedeemModal() {
    let prizesHtml = "";
    prizes.forEach(prize => {
        const alreadyRedeemed = progress.redeemedPrizes?.includes(prize.id);
        prizesHtml += `<div class="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
            <div><div class="text-2xl">${prize.icon}</div><div class="font-bold">${prize.name}</div><div class="text-xs text-gray-500">${prize.desc}</div><div class="text-xs text-yellow-600"><i class="fas fa-star"></i> ${prize.xpCost} XP</div>${prize.sponsor ? `<div class="text-xs text-green-600">Patrocinado por: ${prize.sponsor}</div>` : ''}</div>
            ${!alreadyRedeemed && progress.xp >= prize.xpCost ? `<button data-prize="${prize.id}" data-cost="${prize.xpCost}" class="redeem-prize-btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm transition">Canjear</button>` : (alreadyRedeemed ? '<span class="text-gray-400 text-sm"><i class="fas fa-check"></i> Canjeado</span>' : '<span class="text-gray-400 text-sm">❌ XP insuficiente</span>')}
        </div>`;
    });
    document.getElementById('prizesList').innerHTML = prizesHtml;
    document.getElementById('xpForRedeem').innerText = progress.xp;
    document.getElementById('redeemModal').classList.remove('hidden');
    document.querySelectorAll('.redeem-prize-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prizeId = btn.dataset.prize;
            const cost = parseInt(btn.dataset.cost);
            if (progress.xp >= cost && !progress.redeemedPrizes?.includes(prizeId)) {
                progress.xp -= cost;
                progress.redeemedPrizes = progress.redeemedPrizes || [];
                progress.redeemedPrizes.push(prizeId);
                saveProgress();
                showToast(`🎁 ¡Canjeaste ${prizes.find(p => p.id === prizeId).name}!`, "success");
                showRedeemModal();
            }
        });
    });
    const tickets = progress.raffleTickets || 0;
    const raffleInfo = document.getElementById("raffleInfo");
    if (raffleInfo) raffleInfo.innerHTML = `🎫 ${tickets} boletos de sorteo acumulados (cada 500 XP = 1 boleto)`;
}

async function showRanking() {
    const listEl = document.getElementById("rankingList");
    listEl.innerHTML = `<div class="text-center py-6 text-gray-400"><i class="fas fa-spinner fa-spin text-xl"></i></div>`;
    document.getElementById("rankingModal").classList.remove("hidden");

    const { data, error } = await supabase
        .from('progress')
        .select('user_id, email, xp, level, daily_missions')
        .order('xp', { ascending: false })
        .limit(10);

    if (error || !data?.length) {
        listEl.innerHTML = `<div class="text-center text-gray-400 py-6">No hay datos de ranking aún.<br><span class="text-xs">Si eres el único que aparece, contacta al administrador para habilitar lectura pública en la tabla <em>progress</em> de Supabase.</span></div>`;
        return;
    }

    const medals = ['🥇','🥈','🥉'];
    let html = "";
    data.forEach((user, idx) => {
        const isMe = user.user_id === currentUser.id;
        const fullName = user.daily_missions?.fullName;
        const displayName = fullName || (user.email ? user.email.split('@')[0] : `Docente ${idx+1}`);
        const medal = medals[idx] || `${idx+1}.`;
        html += `
        <div class="flex items-center gap-3 p-3 rounded-2xl ${isMe ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50'} mb-2">
            <span class="text-xl w-8 text-center">${medal}</span>
            <div class="flex-1 min-w-0">
                <p class="font-bold text-gray-800 text-sm truncate">${displayName}${isMe ? ' <span class="text-yellow-600">(Tú)</span>' : ''}</p>
                <p class="text-xs text-gray-400">Nivel ${user.level || 1}</p>
            </div>
            <div class="text-right">
                <p class="font-bold text-yellow-600 text-sm">⭐ ${(user.xp || 0).toLocaleString()}</p>
                <p class="text-xs text-gray-400">XP</p>
            </div>
        </div>`;
    });
    listEl.innerHTML = html;
}

// ==================== COMPARTIR · REFERIDOS · EVIDENCIA ====================

// ── Compartir en redes (50 XP/día) ──────────────────────────────────────
async function shareApp() {
    const today = new Date().toISOString().split('T')[0];
    const lastShare = progress?.dailyMissions?.lastShareDate;
    const alreadyToday = lastShare === today;

    // Dar XP antes de abrir el share (la promesa de navigator.share no siempre resuelve)
    if (!alreadyToday) {
        if (!progress.dailyMissions) progress.dailyMissions = {};
        progress.dailyMissions.lastShareDate = today;
        addXP(50, 'Compartir el curso');
        saveProgress();
        showToast('🎉 +50 XP por compartir el curso', 'success');
    } else {
        showToast('Ya compartiste hoy. Vuelve mañana por más XP 😊', 'success');
    }

    const link = getReferralLink();
    const text = '🚀 Estoy aprendiendo metodología STEAM con el Curso STEAM 2.0 de 1bot · edoo. ¡Únete gratis y transforma tu aula!';

    try {
        if (navigator.share) {
            await navigator.share({ title: 'Curso STEAM 2.0', text, url: link });
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + link)}`, '_blank');
        }
    } catch (_) { /* usuario canceló el share dialog */ }
}

// ── Referidos ────────────────────────────────────────────────────────────
function getReferralLink() {
    const code = currentUser?.id || '';
    return `${window.location.origin}${window.location.pathname}?ref=${code}`;
}

function displayReferralLink() {
    const el = document.getElementById('referralLinkDisplay');
    if (el && currentUser) el.value = getReferralLink();
}

function copyReferralLink() {
    const link = getReferralLink();
    navigator.clipboard.writeText(link).catch(() => {
        const el = document.getElementById('referralLinkDisplay');
        if (el) { el.select(); document.execCommand('copy'); }
    });
    showToast('🔗 ¡Link copiado! Compártelo con tus colegas', 'success');
}

// Llamar al registrarse: si la URL tiene ?ref=ID, el nuevo usuario gana 50 XP
async function checkReferralBonus() {
    const params = new URLSearchParams(window.location.search);
    const referrerId = params.get('ref');
    if (!referrerId || referrerId === currentUser?.id) return;
    if (progress?.dailyMissions?.referralBonusClaimed) return;

    const { data } = await supabase.from('progress').select('user_id').eq('user_id', referrerId).maybeSingle();
    if (!data) return; // código inválido

    if (!progress.dailyMissions) progress.dailyMissions = {};
    progress.dailyMissions.referralBonusClaimed = true;
    progress.dailyMissions.referredBy = referrerId;
    addXP(50, 'Inscripción por referido');
    saveProgress();
    showToast('🎉 +50 XP por unirte con el enlace de un colega', 'success');
    window.history.replaceState({}, '', window.location.pathname); // limpiar URL
}

// Llamar al iniciar sesión: cobra XP pendiente por referidos
async function checkReferrerReward() {
    if (!currentUser || !progress) return;
    try {
        const { data, error } = await supabase
            .from('progress')
            .select('user_id')
            .filter('daily_missions->>referredBy', 'eq', currentUser.id);
        if (error || !data) return;

        const total = data.length;
        const claimed = progress.dailyMissions?.claimedReferrals || 0;
        const pending = total - claimed;

        const countEl = document.getElementById('referralCountDisplay');
        if (countEl) countEl.textContent = total > 0
            ? `${total} docente${total !== 1 ? 's' : ''} se inscribió${total !== 1 ? 'eron' : ''} con tu enlace`
            : 'Aún nadie ha usado tu enlace';

        if (pending > 0) {
            if (!progress.dailyMissions) progress.dailyMissions = {};
            progress.dailyMissions.claimedReferrals = total;
            addXP(pending * 100, `${pending} referido${pending !== 1 ? 's' : ''} nuevo${pending !== 1 ? 's' : ''}`);
            saveProgress();
            showToast(`🎉 +${pending * 100} XP por ${pending} docente${pending !== 1 ? 's' : ''} que se inscribió${pending !== 1 ? 'eron' : ''} con tu enlace`, 'success');
        }
    } catch (_) {}
}

// ── Evidencia de práctica (80 XP por módulo, máx. 1 por módulo) ─────────
function showEvidenceModal() {
    const evidences = progress?.dailyMissions?.evidencias || [];
    const listEl = document.getElementById('evidencesList');
    const prevEl = document.getElementById('previousEvidences');

    // Marcar módulos ya subidos en el select
    const select = document.getElementById('evidenceModuleSelect');
    if (select) {
        [...select.options].forEach(opt => {
            if (!opt.value) return;
            const done = evidences.find(e => String(e.moduleId) === opt.value);
            opt.textContent = opt.textContent.replace(' ✓', '');
            if (done) opt.textContent += ' ✓';
        });
    }

    if (evidences.length > 0) {
        prevEl?.classList.remove('hidden');
        if (listEl) listEl.innerHTML = evidences.map(e => `
            <div class="relative rounded-xl overflow-hidden aspect-square bg-slate-100">
                <img src="${e.url}" class="w-full h-full object-cover">
                <span class="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">M${e.moduleId}</span>
            </div>`).join('');
    } else {
        prevEl?.classList.add('hidden');
    }

    // Limpiar estado del form
    document.getElementById('evidenceFileInput').value = '';
    document.getElementById('evidencePreviewImg').classList.add('hidden');
    document.getElementById('evidenceModuleSelect').value = '';

    document.getElementById('evidenceModal').classList.remove('hidden');
}

async function submitEvidence() {
    const moduleId = document.getElementById('evidenceModuleSelect').value;
    const file = document.getElementById('evidenceFileInput').files[0];

    if (!moduleId) { showToast('Selecciona un módulo', 'success'); return; }
    if (!file) { showToast('Selecciona una imagen', 'success'); return; }
    if (file.size > 5 * 1024 * 1024) { showToast('La imagen debe ser menor a 5 MB', 'success'); return; }

    const existing = (progress.dailyMissions?.evidencias || []).find(e => String(e.moduleId) === moduleId);
    if (existing) { showToast(`Ya subiste evidencia del módulo ${moduleId}`, 'success'); return; }

    const btn = document.getElementById('submitEvidenceBtn');
    btn.textContent = 'Subiendo…';
    btn.disabled = true;

    const saveEvidence = (url) => {
        if (!progress.dailyMissions) progress.dailyMissions = {};
        if (!progress.dailyMissions.evidencias) progress.dailyMissions.evidencias = [];
        progress.dailyMissions.evidencias.push({ url, moduleId: parseInt(moduleId), date: new Date().toISOString() });
        addXP(80, `Evidencia módulo ${moduleId}`);
        saveProgress();
        document.getElementById('evidenceModal').classList.add('hidden');
        showToast(`🎉 +80 XP por tu evidencia del módulo ${moduleId}`, 'success');
    };

    try {
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `${currentUser.id}/mod${moduleId}_${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from('evidencias').upload(path, file);
        if (error) throw error;
        const { data: urlData } = supabase.storage.from('evidencias').getPublicUrl(path);
        saveEvidence(urlData.publicUrl);
    } catch (_) {
        // Fallback: guardar en base64 local si Storage no está disponible
        const reader = new FileReader();
        reader.onload = ev => saveEvidence(ev.target.result);
        reader.readAsDataURL(file);
    } finally {
        btn.textContent = 'Subir evidencia y ganar XP';
        btn.disabled = false;
    }
}

// ==================== EDICIÓN DE PERFIL ====================
function updateProfilePhotoDisplay(src) {
    const img = document.getElementById('profilePhotoPreview');
    const emoji = document.getElementById('avatarPreview');
    if (src) {
        img.src = src;
        img.classList.remove('hidden');
        emoji.style.display = 'none';
    } else {
        img.classList.add('hidden');
        emoji.style.display = '';
    }
}

function showEditProfile() {
    const modal = document.getElementById('editProfileModal');
    const nameInput = document.getElementById('fullNameInput');
    const editImg = document.getElementById('editPhotoImg');
    const editEmoji = document.getElementById('editPhotoEmoji');

    nameInput.value = progress?.dailyMissions?.fullName || '';

    const photo = progress?.dailyMissions?.profilePhoto;
    if (photo) {
        editImg.src = photo;
        editImg.classList.remove('hidden');
        editEmoji.style.display = 'none';
    } else {
        editImg.classList.add('hidden');
        editEmoji.style.display = '';
        editEmoji.textContent = currentAvatar || '👨‍🏫';
    }

    modal.classList.remove('hidden');
}

document.getElementById('editProfileBtn')?.addEventListener('click', showEditProfile);
document.getElementById('closeEditProfileBtn')?.addEventListener('click', () => {
    document.getElementById('editProfileModal').classList.add('hidden');
});

document.getElementById('photoFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const src = ev.target.result;
        const editImg = document.getElementById('editPhotoImg');
        const editEmoji = document.getElementById('editPhotoEmoji');
        editImg.src = src;
        editImg.classList.remove('hidden');
        editEmoji.style.display = 'none';
    };
    reader.readAsDataURL(file);
});

document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
    const name = document.getElementById('fullNameInput').value.trim();
    const photoSrc = document.getElementById('editPhotoImg').src;
    const hasPhoto = !document.getElementById('editPhotoImg').classList.contains('hidden');

    if (!progress.dailyMissions) progress.dailyMissions = {};
    if (name) progress.dailyMissions.fullName = name;
    if (hasPhoto && photoSrc) progress.dailyMissions.profilePhoto = photoSrc;

    // Actualizar display en perfil
    const nameDisplay = document.getElementById('userEmailDisplay');
    if (nameDisplay && name) nameDisplay.textContent = name;
    if (hasPhoto && photoSrc) updateProfilePhotoDisplay(photoSrc);

    // Recompensar perfil completo (nombre + foto) una sola vez
    if (name && hasPhoto && !progress.dailyMissions.profileCompleteRewarded) {
        progress.dailyMissions.profileCompleteRewarded = true;
        addXP(30, 'Perfil completo');
        showToast('✅ Perfil actualizado · +30 XP por completar tu perfil 🎉', 'success');
    } else {
        showToast('✅ Perfil actualizado', 'success');
    }

    saveProgress();
    document.getElementById('editProfileModal').classList.add('hidden');
});

function showAvatarSelector() {
    let html = "";
    avatars.forEach(avatar => {
        const selected = currentAvatar === avatar ? "border-4 border-indigo-500" : "border-2 border-gray-200";
        html += `<button data-avatar="${avatar}" class="text-3xl p-2 rounded-full ${selected} hover:bg-gray-100 transition">${avatar}</button>`;
    });
    document.getElementById("avatarGrid").innerHTML = html;
    document.getElementById("avatarModal").classList.remove("hidden");
    document.querySelectorAll("[data-avatar]").forEach(btn => {
        btn.addEventListener("click", () => {
            currentAvatar = btn.dataset.avatar;
            progress.avatar = currentAvatar;
            document.getElementById("avatarPreview").innerHTML = currentAvatar;
            saveProgress();
            document.getElementById("avatarModal").classList.add("hidden");
            showToast("Avatar actualizado", "success");
            supabase.auth.updateUser({ data: { avatar: currentAvatar } });
        });
    });
}

// ==================== MODAL DE PROYECTO (Módulo 2) ====================
function showProjectModal(card) {
    const p = card.project;
    if (!p) return;
    const existing = document.getElementById('projectModal');
    if (existing) existing.remove();

    const stepsHtml = p.steps.map((s, i) =>
        `<div class="flex gap-3 mb-3">
            <div class="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">${i+1}</div>
            <p class="text-sm text-gray-700 leading-relaxed">${s}</p>
        </div>`).join('');

    const materialsHtml = p.materials.map(m =>
        `<span class="inline-block bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full mb-1 mr-1">${m}</span>`).join('');

    const disciplinesHtml = p.disciplines.map(d =>
        `<span class="inline-block bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full mb-1 mr-1">${d}</span>`).join('');

    const cardIdKey = `${currentModule}-${currentCardIndex}`;
    const modalHtml = `
    <div id="projectModal" class="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div class="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between z-10">
                <div>
                    <h2 class="text-lg font-bold text-indigo-900">📋 ${p.title}</h2>
                    <div class="flex gap-2 mt-1">
                        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">⏱ ${p.duration}</span>
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">📊 ${p.difficulty}</span>
                    </div>
                </div>
                <button onclick="document.getElementById('projectModal').remove()" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition text-lg leading-none">&times;</button>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-gray-800 mb-3">🎓 Pasos para implementar en clase</h3>
                ${stepsHtml}
                <div class="mt-4">
                    <h3 class="font-bold text-gray-800 mb-2">🧰 Materiales</h3>
                    <div>${materialsHtml}</div>
                </div>
                <div class="mt-4">
                    <h3 class="font-bold text-gray-800 mb-2">🔬 Disciplinas STEAM que integra</h3>
                    <div>${disciplinesHtml}</div>
                </div>
                <div class="mt-5 border-t border-gray-100 pt-4">
                    <h3 class="font-bold text-gray-800 mb-1">📸 Subir evidencias <span class="text-xs text-gray-400 font-normal">(opcional)</span></h3>
                    <p class="text-xs text-gray-500 mb-3">Comparte cómo lo aplicaste en tu clase. Puede ser una descripción o un enlace a fotos/video (Google Drive, YouTube, etc.).</p>
                    <textarea id="evidenceText" rows="3" placeholder="Describe cómo fue la actividad en tu clase..." class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2"></textarea>
                    <input id="evidenceUrl" type="url" placeholder="Enlace a fotos o video (opcional)" class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3">
                    <button onclick="submitEvidence('${cardIdKey}', '${p.title.replace(/'/g,'')}')" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-2xl text-sm transition">
                        📤 Enviar evidencia
                    </button>
                    <div id="evidenceStatus" class="mt-2 text-xs text-center text-gray-400"></div>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

async function submitEvidence(cardId, projectTitle) {
    if (!currentUser) { alert('Debes iniciar sesión'); return; }
    const text = document.getElementById('evidenceText')?.value.trim();
    const url  = document.getElementById('evidenceUrl')?.value.trim();
    if (!text && !url) { alert('Por favor escribe una descripción o agrega un enlace'); return; }

    const statusEl = document.getElementById('evidenceStatus');
    if (statusEl) statusEl.textContent = 'Enviando…';

    const { error } = await supabase.from('project_evidence').insert({
        user_id: currentUser.id,
        card_id: cardId,
        project_title: projectTitle,
        evidence_text: text || null,
        evidence_url: url || null
    });

    if (error) {
        if (statusEl) statusEl.textContent = `Error: ${error.message}`;
    } else {
        if (statusEl) { statusEl.textContent = '✅ ¡Evidencia enviada! Gracias por compartir.'; statusEl.className = 'mt-2 text-xs text-center text-green-600'; }
        if (document.getElementById('evidenceText')) document.getElementById('evidenceText').value = '';
        if (document.getElementById('evidenceUrl'))  document.getElementById('evidenceUrl').value = '';
        showToast('📸 ¡Evidencia enviada correctamente!', 'success');
        addXP(15, 'Evidencia de proyecto enviada');
    }
}

// ── Helper: nombre del docente logueado ──────────────────
function getDisplayName() {
    if (progress?.dailyMissions?.fullName) return progress.dailyMissions.fullName;
    if (!currentUser?.email) return 'Profe';
    const raw = currentUser.email.split('@')[0].replace(/[._-]/g, ' ');
    return raw.replace(/\b\w/g, c => c.toUpperCase());
}

// ── Helper: ir a la tarjeta de contenido anterior al quiz ──
function goToRefCard() {
    let idx = currentCardIndex - 1;
    const mod = modulesData[currentModule - 1];
    while (idx >= 0 && mod?.cards[idx]?.type !== 'content') idx--;
    if (idx >= 0) { currentCardIndex = idx; renderCard(); }
}

// ==================== EXAMEN FINAL (formato tarjeta) ====================
let examActive = false;
let examCurrentQ = 0;
let examAnswers = [];
let examQuestions = []; // subconjunto aleatorio para este intento

function _shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startExam() {
    const totalCards = modulesData.reduce((acc, m) => acc + m.cards.length, 0);
    const completed = progress.completedCards?.length || 0;
    if (completed < totalCards) {
        const unseen = [];
        modulesData.forEach((mod, modIdx) => {
            const missing = [];
            mod.cards.forEach((card, cardIdx) => {
                if (!progress.completedCards.includes(`${modIdx+1}-${cardIdx}`)) {
                    missing.push(`• Tarjeta ${cardIdx+1}: "${card.title}"`);
                }
            });
            if (missing.length) unseen.push(`\n📚 ${mod.title}:\n${missing.join('\n')}`);
        });
        const detail = document.createElement('div');
        detail.className = 'modal-sheet';
        detail.style.zIndex = '9999';
        detail.innerHTML = `<div class="modal-inner" style="max-height:80vh">
            <div class="modal-drag"></div>
            <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-bold text-slate-800">⚠️ Tarjetas pendientes</h3>
                <button onclick="this.closest('.modal-sheet').remove()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xl flex items-center justify-center">&times;</button>
            </div>
            <p class="text-sm text-slate-500 mb-4">Completa estas tarjetas antes del examen (faltan ${totalCards - completed}):</p>
            <div class="space-y-3 text-sm">
                ${unseen.map(block => `<div class="bg-red-50 border border-red-100 rounded-2xl p-3 text-red-700 whitespace-pre-line">${block.trim()}</div>`).join('')}
            </div>
        </div>`;
        document.getElementById('mainApp').appendChild(detail);
        return;
    }
    stopCardTracking();
    examActive = true;
    examCurrentQ = 0;
    // Mezclar y tomar 20 preguntas del banco
    const allQ = _shuffleArray(courseData.finalExam.questions);
    examQuestions = allQ.slice(0, 20);
    examAnswers = new Array(examQuestions.length).fill(null);
    switchTab('home');
    _hideNavBtns(true);
    _setTopBarExam(true);
    renderExamCard();
    animateCard('next');
}

function _hideNavBtns(hide) {
    const nb = document.getElementById('cardNavBar');
    if (nb) nb.style.display = hide ? 'none' : '';
}

function _setTopBarExam(active) {
    const badge = document.getElementById('moduleBadge');
    const label = badge?.previousElementSibling; // "CURSO STEAM" label
    const progressArea = document.querySelector('.top-bar .flex.items-center.gap-2');
    if (active) {
        if (badge) { badge.dataset.orig = badge.textContent; badge.textContent = 'Evaluación Final'; }
        if (label) { label.dataset.orig = label.textContent; label.textContent = 'EXAMEN FINAL'; }
        if (progressArea) progressArea.style.display = 'none';
    } else {
        if (badge?.dataset.orig) badge.textContent = badge.dataset.orig;
        if (label?.dataset.orig) label.textContent = label.dataset.orig;
        if (progressArea) progressArea.style.display = '';
    }
}

function renderExamCard() {
    const q = examQuestions[examCurrentQ];
    const total = examQuestions.length;
    const qNum = examCurrentQ + 1;
    const pct = Math.round((qNum / total) * 100);
    const saved = examAnswers[examCurrentQ];

    const examIllus = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 8 L44 22 H58 L47 31 L51 45 L40 36 L29 45 L33 31 L22 22 H36 Z" fill="rgba(255,255,255,0.92)"/>
        <circle cx="63" cy="60" r="11" stroke="rgba(255,255,255,0.75)" stroke-width="2"/>
        <text x="63" y="65" text-anchor="middle" font-size="13" fill="white" font-weight="bold">?</text>
        <circle cx="19" cy="57" r="7" fill="rgba(255,255,255,0.35)"/>
        <circle cx="19" cy="57" r="3.5" fill="rgba(255,255,255,0.65)"/>
    </svg>`;

    const optLetters = ['A','B','C','D'];
    const optsHtml = q.options.map((opt, i) => {
        const sel = saved === i;
        return `<button onclick="selectExamAnswer(${i})" data-opt="${i}"
            class="exam-opt w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium flex items-start gap-3 transition-all"
            style="${sel ? 'border-color:#7C3AED;background:#EDE9FE;color:#4C1D95' : 'border-color:#E2E8F0;background:white;color:#374151'}">
            <span class="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
                style="${sel ? 'background:#7C3AED;border-color:#7C3AED;color:white' : 'border-color:#CBD5E1;color:#64748B'}">${optLetters[i]}</span>
            <span class="leading-snug pt-0.5">${opt}</span>
        </button>`;
    }).join('');

    const isLast = examCurrentQ >= total - 1;
    const cardHtml = `<div id="activeCard" class="content-card">
        <div class="card-banner" style="background:linear-gradient(135deg,#5C35C5 0%,#7C3AED 100%)">
            <div class="card-banner-svg">${examIllus}</div>
            <p class="card-banner-sub">⭐ Examen Final &nbsp;·&nbsp; Pregunta ${qNum} de ${total}</p>
        </div>
        <div class="card-body">
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Progreso del examen</span><span>${pct}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:#7C3AED"></div>
            </div>
            <p style="font-size:1rem;font-weight:700;color:#1a202c;margin-bottom:1rem;line-height:1.45">${q.text}</p>
            <div class="space-y-2" id="examOptions">${optsHtml}</div>
        </div>
        <div class="card-footer">
            <button id="examNextBtn" onclick="goToNextExamCard()"
                class="w-full py-3 rounded-xl font-bold text-sm text-white transition-all"
                style="background:${saved !== null ? '#5C35C5' : '#C4B5FD'}"
                ${saved === null ? 'disabled' : ''}>
                ${isLast ? '✅ Ver mis resultados' : 'Siguiente pregunta →'}
            </button>
            <button onclick="exitExam()" class="w-full py-1.5 mt-1 text-slate-400 text-xs">Salir del examen</button>
        </div>
    </div>`;

    document.getElementById('cardContainer').innerHTML = cardHtml;
    // Swipe to advance (not back — exam is forward-only)
    let _tx = 0;
    const card = document.getElementById('activeCard');
    if (card) {
        card.addEventListener('touchstart', e => { _tx = e.changedTouches[0].screenX; }, { passive: true });
        card.addEventListener('touchend', e => {
            if (e.changedTouches[0].screenX - _tx < -50) goToNextExamCard();
        }, { passive: true });
    }
}

function selectExamAnswer(optIdx) {
    const q = examQuestions[examCurrentQ];
    const isCorrect = optIdx === q.correct;
    examAnswers[examCurrentQ] = optIdx;

    document.querySelectorAll('.exam-opt').forEach((btn, i) => {
        const circle = btn.querySelector('span');
        btn.disabled = true; // lock options after selecting
        if (i === q.correct) {
            // siempre resalta la correcta en verde
            btn.style.cssText = 'border-color:#16A34A;background:#F0FDF4;color:#14532D';
            circle.style.cssText = 'background:#16A34A;border-color:#16A34A;color:white';
        } else if (i === optIdx && !isCorrect) {
            // la elegida incorrecta en rojo
            btn.style.cssText = 'border-color:#DC2626;background:#FEF2F2;color:#7F1D1D';
            circle.style.cssText = 'background:#DC2626;border-color:#DC2626;color:white';
        } else {
            btn.style.cssText = 'border-color:#E2E8F0;background:white;color:#94A3B8';
            circle.style.cssText = 'border-color:#CBD5E1;color:#94A3B8';
        }
    });

    // Mostrar retroalimentación inline debajo de las opciones
    const opts = document.getElementById('examOptions');
    if (opts) {
        const fb = document.createElement('div');
        const optLetters = ['A','B','C','D'];
        fb.style.cssText = `margin-top:12px;padding:10px 14px;border-radius:14px;font-size:.82rem;line-height:1.5;
            background:${isCorrect ? '#F0FDF4' : '#FEF2F2'};
            border:1.5px solid ${isCorrect ? '#86EFAC' : '#FECACA'};
            color:${isCorrect ? '#14532D' : '#7F1D1D'}`;
        fb.innerHTML = `<strong>${isCorrect ? '✅ ¡Correcto!' : `❌ Incorrecto · La correcta era ${optLetters[q.correct]}`}</strong>` +
            (q.explanation ? `<br><span style="opacity:.85">${q.explanation}</span>` : '');
        opts.appendChild(fb);
    }

    const nb = document.getElementById('examNextBtn');
    if (nb) { nb.disabled = false; nb.style.background = '#5C35C5'; }
}

function goToNextExamCard() {
    if (examAnswers[examCurrentQ] === null) { showToast('Selecciona una respuesta para continuar'); return; }
    examCurrentQ++;
    if (examCurrentQ >= examQuestions.length) {
        showExamResults();
    } else {
        renderExamCard();
        animateCard('next');
    }
}

function showExamResults() {
    const exam = courseData.finalExam;
    let correct = 0;
    examQuestions.forEach((q, i) => { if (examAnswers[i] === q.correct) correct++; });
    const pct = Math.round((correct / examQuestions.length) * 100);
    const passed = pct >= exam.passingScore;

    if (passed && !progress.badges.includes("examPass")) unlockBadge("examPass");
    if (passed) addXP(100, "Examen aprobado");
    if (passed) {
        if (!progress.dailyMissions) progress.dailyMissions = {};
        progress.dailyMissions.examScore = pct;
        progress.dailyMissions.examDate = new Date().toISOString().split('T')[0];
        window._lastExamScore = pct;
        // Mostrar botón de certificado en perfil
        const certBtn = document.getElementById('certDownloadBtn');
        if (certBtn) certBtn.classList.remove('hidden');
    }
    saveProgress();

    const resultIllus = passed
        ? `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 10 L44 24 H58 L47 33 L51 47 L40 38 L29 47 L33 33 L22 24 H36 Z" fill="rgba(255,255,255,0.95)"/><circle cx="62" cy="62" r="9" fill="rgba(255,255,255,0.3)"/><path d="M57 62 L61 66 L68 58" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="10" width="48" height="60" rx="8" stroke="rgba(255,255,255,0.9)" stroke-width="2.5"/><line x1="26" y1="30" x2="54" y2="30" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/><line x1="26" y1="40" x2="54" y2="40" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/><line x1="26" y1="50" x2="42" y2="50" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/></svg>`;

    const cardHtml = `<div id="activeCard" class="content-card">
        <div class="card-banner" style="background:linear-gradient(135deg,${passed ? '#059669,#047857' : '#DC2626,#B91C1C'})">
            <div class="card-banner-svg">${resultIllus}</div>
            <p class="card-banner-sub" style="color:white;font-size:1rem;font-weight:800;opacity:1">
                ${passed ? '¡Aprobaste el examen!' : 'Sigue practicando'}
            </p>
            <p class="card-banner-sub" style="margin-top:2px">${correct} de ${examQuestions.length} correctas</p>
        </div>
        <div class="card-body" style="text-align:center">
            <div class="rounded-2xl p-4 mb-4" style="background:${passed ? '#F0FDF4' : '#FEF2F2'}">
                <p style="font-size:2.5rem;font-weight:900;color:${passed ? '#16A34A' : '#DC2626'};line-height:1">${pct}%</p>
                <p style="font-size:.8rem;font-weight:600;color:${passed ? '#15803D' : '#B91C1C'};margin-top:4px">
                    ${passed ? '¡Superaste el mínimo del ' + exam.passingScore + '%!' : 'Necesitas ' + exam.passingScore + '% para aprobar'}
                </p>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
                <div style="background:#F0FDF4;border-radius:12px;padding:12px">
                    <p style="font-size:1.5rem;font-weight:700;color:#16A34A">${correct}</p>
                    <p style="font-size:.75rem;color:#64748B;margin-top:2px">Correctas ✅</p>
                </div>
                <div style="background:#FEF2F2;border-radius:12px;padding:12px">
                    <p style="font-size:1.5rem;font-weight:700;color:#DC2626">${examQuestions.length - correct}</p>
                    <p style="font-size:.75rem;color:#64748B;margin-top:2px">Incorrectas ❌</p>
                </div>
            </div>
            ${passed ? `<button onclick="generateCertificateFromExam(${pct})" class="w-full py-3 rounded-xl font-bold text-white text-sm" style="background:#5C35C5;margin-bottom:8px">📜 Obtener mi certificado</button>` : ''}
            <button onclick="retryExam()" class="w-full py-3 rounded-xl font-bold text-sm" style="border:2px solid #E2E8F0;color:#475569;background:white;margin-bottom:4px">
                🔄 Reintentar examen
            </button>
            <button onclick="exitExam()" style="color:#94A3B8;font-size:.75rem;padding:6px;background:none;border:none;cursor:pointer;width:100%">Volver al curso</button>
        </div>
    </div>`;

    document.getElementById('cardContainer').innerHTML = cardHtml;
}

function retryExam() {
    examCurrentQ = 0;
    examAnswers = new Array(courseData.finalExam.questions.length).fill(null);
    renderExamCard();
    animateCard('next');
}

function exitExam() {
    examActive = false;
    examCurrentQ = 0;
    examAnswers = [];
    _hideNavBtns(false);
    _setTopBarExam(false);
    renderCard();
}

async function _imgToBase64(path) {
    try {
        const r = await fetch(path);
        if (!r.ok) return null;
        const blob = await r.blob();
        return new Promise(res => {
            const rd = new FileReader();
            rd.onloadend = () => res(rd.result);
            rd.readAsDataURL(blob);
        });
    } catch { return null; }
}

async function generateCertificateFromExam(percentage) {
    const nombre = getDisplayName();
    const fecha = new Date().toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' });

    // Intentar cargar imágenes reales; si no existen, usar fallback SVG
    const [logoSrc, firmaSrc] = await Promise.all([
        _imgToBase64('logo-1bot-edoo.png'),
        _imgToBase64('firma.png')
    ]);

    const logoHtml = logoSrc
        ? `<img src="${logoSrc}" alt="1bot · edoo" style="height:44px;object-fit:contain">`
        : `<span style="font-family:Arial Black,sans-serif;font-size:18px;font-weight:900;color:#0097A7">1bot <span style="color:#E91E63">·</span> edoo</span>`;

    const certHTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Certificado STEAM - ${nombre}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Inter',sans-serif; background:#F1F5F9; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:2rem; }
  .cert { background:white; width:800px; border-radius:24px; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,.15); }
  .cert-top { background:linear-gradient(135deg,#0097A7 0%,#00BCD4 50%,#4CAF50 100%); padding:36px 48px 28px; position:relative; overflow:hidden; }
  .cert-top::before { content:''; position:absolute; top:-40px; right:-40px; width:200px; height:200px; border-radius:50%; background:rgba(255,255,255,.08); }
  .cert-top::after  { content:''; position:absolute; bottom:-60px; left:20%; width:280px; height:280px; border-radius:50%; background:rgba(255,255,255,.05); }
  .steam-letters { font-size:13px; font-weight:900; letter-spacing:.25em; display:flex; gap:2px; margin-bottom:8px; }
  .s{color:#FFD600}.t{color:#FF5722}.e1{color:#4CAF50}.e2{color:#2196F3}.a{color:#E91E63}.m{color:#9C27B0}
  .cert-title    { color:white; font-size:26px; font-weight:900; line-height:1.2; }
  .cert-subtitle { color:rgba(255,255,255,.82); font-size:12.5px; margin-top:5px; }
  .cert-body  { padding:32px 48px; }
  .cert-otorga{ font-size:12px; color:#94A3B8; font-weight:600; text-transform:uppercase; letter-spacing:.12em; margin-bottom:6px; }
  .cert-nombre{ font-size:32px; font-weight:900; color:#0F172A; line-height:1.1; margin-bottom:18px; }
  .cert-desc  { font-size:14.5px; color:#475569; line-height:1.7; margin-bottom:22px; }
  .cert-desc strong { color:#0F172A; }
  .cert-meta  { display:flex; gap:20px; margin-bottom:28px; }
  .meta-pill  { background:#F8FAFC; border:1.5px solid #E2E8F0; border-radius:12px; padding:9px 16px; }
  .meta-pill .label { font-size:10.5px; color:#94A3B8; font-weight:600; text-transform:uppercase; letter-spacing:.08em; margin-bottom:2px; }
  .meta-pill .value { font-size:14px; color:#0F172A; font-weight:700; }
  .cert-footer{ display:flex; align-items:flex-end; justify-content:space-between; border-top:1.5px solid #F1F5F9; padding-top:20px; }
  .sign-block { text-align:center; }
  .sign-img   { height:70px; object-fit:contain; display:block; margin:0 auto 4px; }
  .sign-line  { width:180px; border-top:1.5px solid #CBD5E1; margin:0 auto 6px; }
  .sign-name  { font-size:12.5px; font-weight:700; color:#0F172A; }
  .sign-role  { font-size:11px; color:#64748B; }
  .brand-area { display:flex; flex-direction:column; align-items:flex-end; gap:10px; }
  .print-btn  { background:#0097A7; color:white; border:none; padding:10px 22px; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; }
  .print-btn:hover { background:#00838F; }
  @media print { body{background:none;padding:0} .cert{box-shadow:none;border-radius:0;width:100%} .print-btn{display:none} }
</style>
</head>
<body>
<div class="cert">
  <div class="cert-top">
    <div class="steam-letters">
      <span class="s">S</span><span class="t">T</span><span class="e1">E</span><span class="e2">E</span><span class="a">A</span><span class="m">M</span>
    </div>
    <h1 class="cert-title">Certificado de Finalización</h1>
    <p class="cert-subtitle">Curso STEAM para Docentes · Formación Profesional</p>
  </div>
  <div class="cert-body">
    <p class="cert-otorga">Se otorga a</p>
    <p class="cert-nombre">${nombre}</p>
    <p class="cert-desc">
      Por haber completado satisfactoriamente el <strong>Curso STEAM 2.0 para Docentes</strong>,
      demostrando competencias en la integración de Ciencia, Tecnología, Ingeniería, Emprendimiento,
      Arte y Matemáticas en entornos educativos, con un puntaje de
      <strong>${Math.round(percentage)}% en el examen final</strong>.
    </p>
    <div class="cert-meta">
      <div class="meta-pill"><div class="label">Puntaje</div><div class="value">${Math.round(percentage)}%</div></div>
      <div class="meta-pill"><div class="label">Duración</div><div class="value">10 horas</div></div>
      <div class="meta-pill"><div class="label">Emisión</div><div class="value">${fecha}</div></div>
    </div>
    <div class="cert-footer">
      <div class="sign-block">
        ${firmaSrc ? `<img class="sign-img" src="${firmaSrc}" alt="Firma">` : '<div style="height:70px"></div>'}
        <div class="sign-line"></div>
        <p class="sign-name">Billy Abraham Gómez Sac</p>
        <p class="sign-role">Gerente de Operaciones</p>
      </div>
      <div class="brand-area">
        ${logoHtml}
        <button class="print-btn" onclick="window.print()">⬇ Guardar PDF</button>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

    const win = window.open('', '_blank', 'width=860,height=640');
    if (win) {
        win.document.write(certHTML);
        win.document.close();
    } else {
        showToast('Permite ventanas emergentes para ver el certificado.', 'error');
    }
}

// ==================== ESTADÍSTICAS (Profe Billy) ====================
function showStatsPanel() {
    const statsContent = document.getElementById('statsContent');
    const npsValues = progress.npsHistory?.map(h => h.nps) || [];
    const promoters = npsValues.filter(n => n >= 9).length;
    const detractors = npsValues.filter(n => n <= 6).length;
    const npsScore = npsValues.length ? Math.round(((promoters - detractors) / npsValues.length) * 100) : 0;
    const ratings = Object.values(progress.moduleFeedback || {}).map(f => f.rating);
    const avgRating = ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : 0;
    statsContent.innerHTML = `<div class="space-y-4"><div class="grid grid-cols-2 gap-3"><div class="bg-indigo-50 p-3 rounded-xl text-center"><div class="text-2xl font-bold text-indigo-700">${avgRating}</div><div class="text-xs text-gray-600">⭐ Rating promedio</div></div><div class="bg-green-50 p-3 rounded-xl text-center"><div class="text-2xl font-bold text-green-700">${npsScore}</div><div class="text-xs text-gray-600">📊 NPS Score</div></div><div class="bg-blue-50 p-3 rounded-xl text-center"><div class="text-2xl font-bold text-blue-700">${progress.completedCards?.length || 0}</div><div class="text-xs text-gray-600">✅ Tarjetas completadas</div></div><div class="bg-purple-50 p-3 rounded-xl text-center"><div class="text-2xl font-bold text-purple-700">${progress.xp || 0}</div><div class="text-xs text-gray-600">⭐ XP totales</div></div></div><div class="bg-gray-100 p-3 rounded-xl"><h3 class="font-bold mb-2">🎯 Resumen ejecutivo</h3><p class="text-sm">📌 NPS: ${npsScore} ${npsScore >= 50 ? '✅ Excelente' : (npsScore >= 30 ? '📈 Bueno' : '⚠️ Por mejorar')}<br>📌 Promotores: ${promoters} de ${npsValues.length}<br>📌 Rating promedio: ${avgRating}/5 estrellas<br>📌 Racha actual: ${progress.streak || 0} días<br>📌 Logros desbloqueados: ${progress.badges?.length || 0}/${Object.keys(badges).length}</p></div></div>`;
    document.getElementById('statsPanel').classList.remove('hidden');
}

function exportStatsToCSV() {
    let csv = [["Modulo","Rating","NPS","Comentario","Fecha"]];
    Object.values(progress.moduleFeedback || {}).forEach(f => csv.push([`"${f.moduleName}"`, f.rating, f.nps, `"${(f.comment||"").replace(/"/g,'""')}"`, f.timestamp]));
    const blob = new Blob([csv.map(r=>r.join(",")).join("\n")], {type:"text/csv"});
    const link = document.createElement("a"); link.download = `estadisticas_steam_${new Date().toISOString().slice(0,19)}.csv`; link.href = URL.createObjectURL(blob); link.click();
    alert("✅ Datos exportados a CSV");
}

function clearStats() { if(confirm("⚠️ ¿Eliminar TODOS los datos de feedback?")){ progress.moduleFeedback={}; progress.npsHistory=[]; saveProgress(); showStatsPanel(); } }

// ==================== MODO PROFE ====================
const ADMIN_EMAIL = "profebillio@gmail.com";

function enableProfeMode() {
    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        alert("⛔ Solo el administrador puede activar este modo.");
        return;
    }
    if (progress.profeMode) return;
    progress.profeMode = true;
    saveProgress();
    document.getElementById("profeVideoBtn").classList.remove("hidden");
    alert("✅ Modo Profe activado. Ya puedes exportar guiones de video.");
    document.getElementById("profeVideoBtn").querySelector("button").addEventListener("click", () => exportModuleToVideo(currentModule));
}

function exportModuleToVideo(moduleId) {
    const module = modulesData[moduleId-1];
    if (!module) return;
    let script = `# GUION PARA VIDEO - MÓDULO ${module.id}: ${module.title}\n\n## 🎬 INTRO (30 segundos)\n"Hola, soy el Profe Billy. En este video vamos a aprender sobre ${module.title}. Al final tendrás un reto práctico."\n\n## 📚 CONTENIDO PRINCIPAL (5-7 minutos)\n`;
    const contentCards = module.cards.filter(c => c.type === "content");
    contentCards.forEach((card, idx) => { script += `### ${idx+1}. ${card.title}\n${card.content}\n${card.extra ? `💡 Dato extra: ${card.extra}\n` : ''}\n---\n\n`; });
    script += `## 🎯 RETO PARA EL DOCENTE QUE MIRA EL VIDEO\n"Identifica un problema de tu salón y escribe cómo lo resolverías con STEAM."\n\n## 📹 RECOMENDACIONES TÉCNICAS\n- Graba en horizontal (apaisado).\n- Usa buena luz natural frente a ti.\n- Duración ideal: 5-8 minutos.`;
    const blob = new Blob([script], {type:"text/plain"});
    const link = document.createElement("a"); link.download = `guion_video_modulo_${module.id}.txt`; link.href = URL.createObjectURL(blob); link.click();
    alert("✅ Guion descargado");
}

function loadSavedProgress() {
    if (progress?.current_module) currentModule = progress.current_module;
    if (progress?.current_card) currentCardIndex = progress.current_card;
    renderCard();
    updateUI();
    checkBadges();
}

// ==================== EVENT LISTENERS ====================
document.getElementById("showRegisterBtn")?.addEventListener("click", () => {
    document.getElementById("emailLoginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
});
document.getElementById("showLoginBtn")?.addEventListener("click", () => {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("emailLoginForm").classList.remove("hidden");
});
document.getElementById("doEmailLogin")?.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const success = await loginWithEmail(email, password);
    if (success) {
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");
        loadSavedProgress();
        displayReferralLink();
        checkReferrerReward();
        if (!localStorage.getItem('onboardingDone')) setTimeout(startOnboarding, 600);
    }
});
document.getElementById("doRegister")?.addEventListener("click", async () => {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    if (password.length < 6) { showLoginError("La contraseña debe tener al menos 6 caracteres"); return; }
    const success = await registerWithEmail(email, password);
    if (success) {
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");
        loadSavedProgress();
        displayReferralLink();
        await checkReferralBonus();
        // Mostrar onboarding solo a usuarios nuevos
        setTimeout(startOnboarding, 600);
    }
});
document.getElementById("logoutBtn")?.addEventListener("click", logout);
document.getElementById("nextBtn")?.addEventListener("click", goToNextCard);
document.getElementById("prevBtn")?.addEventListener("click", goToPrevCard);
document.getElementById("examBtn")?.addEventListener("click", startExam);
document.getElementById("badgesBtn")?.addEventListener("click", showBadgesModal);
document.getElementById("closeBadgesBtn")?.addEventListener("click", () => document.getElementById("badgesModal")?.classList.add("hidden"));
document.getElementById("shareBadgesBtn")?.addEventListener("click", shareBadges);
document.getElementById("redeemFloatBtn")?.addEventListener("click", showComingSoon);
document.getElementById("closeRedeemBtn")?.addEventListener("click", () => document.getElementById("redeemModal")?.classList.add("hidden"));
document.getElementById("rankingFloatBtn")?.addEventListener("click", showRanking);
document.getElementById("closeRankingBtn")?.addEventListener("click", () => document.getElementById("rankingModal")?.classList.add("hidden"));
document.getElementById("avatarFloatBtn")?.addEventListener("click", showAvatarSelector);
document.getElementById("closeAvatarBtn")?.addEventListener("click", () => document.getElementById("avatarModal")?.classList.add("hidden"));
document.getElementById("moduleBadge")?.addEventListener("dblclick", enableProfeMode);

// ── Nuevas actividades XP ────────────────────────────────────────────────
document.getElementById("shareAppBtn")?.addEventListener("click", shareApp);
document.getElementById("copyReferralBtn")?.addEventListener("click", copyReferralLink);
document.getElementById("uploadEvidenceBtn")?.addEventListener("click", showEvidenceModal);
document.getElementById("closeEvidenceBtn")?.addEventListener("click", () => document.getElementById("evidenceModal")?.classList.add("hidden"));
document.getElementById("submitEvidenceBtn")?.addEventListener("click", submitEvidence);
document.getElementById("evidenceFileInput")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById("evidencePreviewImg");
        img.src = ev.target.result;
        img.classList.remove("hidden");
        const dropText = document.getElementById("evidenceDropText");
        if (dropText) dropText.textContent = file.name;
    };
    reader.readAsDataURL(file);
});

// Toggle misiones diarias
document.getElementById("missionsToggle")?.addEventListener("click", () => {
    const panel = document.getElementById("dailyMissions");
    const chevron = document.getElementById("missionsChevron");
    const open = !panel.classList.contains("hidden");
    panel.classList.toggle("hidden", open);
    if (chevron) chevron.style.transform = open ? "" : "rotate(180deg)";
});
if (progress?.profeMode) { document.getElementById("profeVideoBtn").classList.remove("hidden"); }

document.getElementById("statsSecretBtn")?.addEventListener("click", () => {
    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        alert("⛔ Solo el administrador puede ver las estadísticas.");
        return;
    }
    showStatsPanel();
});
document.getElementById("closeStatsBtn")?.addEventListener("click", () => document.getElementById("statsPanel")?.classList.add("hidden"));
document.getElementById("exportStatsBtn")?.addEventListener("click", exportStatsToCSV);
document.getElementById("clearStatsBtn")?.addEventListener("click", clearStats);
document.getElementById("syncNowBtn")?.addEventListener("click", () => { if(currentUser) syncWithSupabase(); else alert("No hay sesión activa"); });

window.addEventListener("online", () => { updateSyncStatus("online", "Conectado"); if(currentUser) syncWithSupabase(); });
window.addEventListener("offline", () => updateSyncStatus("offline", "Sin conexión"));

initDB().then(() => console.log("Base de datos local lista"));
checkExistingSession();


if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');

// ==================== ANIMACIÓN COMPLETAR MÓDULO ====================
let _moduleCompleteCallback = null;
let _confettiFrame = null;
const _confettiColors = ['#FCC30A','#2BA848','#07B0E4','#E9A037','#E83C8D','#E52642','#FFFFFF','#5C35C5'];

function showModuleComplete(moduleId, callback) {
    _moduleCompleteCallback = callback;
    const module = modulesData[moduleId - 1];
    const theme = (typeof MODULE_THEME !== 'undefined' && MODULE_THEME[moduleId]) || { primary: '#07B0E4' };
    const illus = (typeof MODULE_ILLUSTRATIONS !== 'undefined' && MODULE_ILLUSTRATIONS[moduleId]) || '';

    const overlay = document.getElementById('moduleCompleteOverlay');
    overlay.style.background = `radial-gradient(ellipse at 40% 20%, ${theme.primary}f0 0%, #1A2B4Bfa 100%)`;

    const iconEl = document.getElementById('mcModuleIcon');
    iconEl.style.background = theme.primary;
    iconEl.innerHTML = illus;

    document.getElementById('mcModuleName').textContent = module?.title || `Módulo ${moduleId}`;
    // XP base por completar módulo (ya se suma en otros lugares, esto es solo display)
    const xpDisplay = [100, 120, 130, 140, 150][moduleId - 1] || 100;
    document.getElementById('mcXP').textContent = `+${xpDisplay} XP`;

    overlay.classList.remove('hidden');
    startConfetti();
    // Auto-dismiss a los 4 segundos
    setTimeout(closeModuleComplete, 4000);
}

function closeModuleComplete() {
    const overlay = document.getElementById('moduleCompleteOverlay');
    if (overlay.classList.contains('hidden')) return; // ya cerrado
    overlay.classList.add('hidden');
    stopConfetti();
    if (_moduleCompleteCallback) {
        const cb = _moduleCompleteCallback;
        _moduleCompleteCallback = null;
        setTimeout(cb, 200); // pequeña pausa antes del siguiente modal
    }
}

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 140 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1,
        w: Math.random() * 14 + 5,
        h: Math.random() * 7 + 3,
        color: _confettiColors[Math.floor(Math.random() * _confettiColors.length)],
        speed: Math.random() * 3.5 + 1.5,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.15,
        drift: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.4 + 0.6
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
            ctx.fill();
            ctx.restore();
            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.spin;
            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        _confettiFrame = requestAnimationFrame(draw);
    }
    draw();
}

function stopConfetti() {
    if (_confettiFrame) { cancelAnimationFrame(_confettiFrame); _confettiFrame = null; }
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

// ==================== ONBOARDING ====================
const ONBOARDING_SLIDES = [
    {
        emoji: '👋',
        bg: 'linear-gradient(135deg,#1A6B68 0%,#07B0E4 100%)',
        title: '¡Bienvenido al Curso STEAM 2.0!',
        desc: 'Aprenderás metodología <strong>STEAM</strong> a tu ritmo con tarjetas interactivas, quiz, logros y un <strong>certificado oficial</strong> al finalizar.',
        extra: 'Este tutorial rápido te explicará todo lo que necesitas saber para aprovechar el curso al máximo.'
    },
    {
        emoji: '📖',
        bg: 'linear-gradient(135deg,#FCC30A 0%,#E9A037 100%)',
        title: 'Las tarjetas de aprendizaje',
        desc: 'El contenido está organizado en <strong>tarjetas</strong>. Lee cada una y avanza tocando <strong>Siguiente →</strong> o deslizando la tarjeta hacia la izquierda.',
        extra: 'Puedes volver atrás con <strong>← Anterior</strong>. Tu progreso se guarda automáticamente — puedes cerrar la app y continuar donde lo dejaste.',
        icon: '👆 Desliza ← para avanzar'
    },
    {
        emoji: '🧩',
        bg: 'linear-gradient(135deg,#2BA848 0%,#07B0E4 100%)',
        title: 'Quiz al finalizar cada módulo',
        desc: 'Al terminar cada módulo habrá un <strong>quiz de práctica</strong> con preguntas de opción múltiple. Selecciona tu respuesta y toca para confirmar.',
        extra: 'Si te equivocas, <strong>verás la respuesta correcta y una explicación</strong>. El quiz es formativo — no afecta tu calificación pero sí te da XP.',
        list: ['✅ Respuesta correcta: +15 XP', '❌ Respuesta incorrecta: verás la explicación', '🔁 Puedes repasar el módulo antes de intentarlo']
    },
    {
        emoji: '⚡',
        bg: 'linear-gradient(135deg,#5C35C5 0%,#E83C8D 100%)',
        title: 'XP y niveles',
        desc: 'Ganas puntos de experiencia (<strong>XP</strong>) con cada actividad. Sube de nivel y desbloquea logros especiales.',
        extra: null,
        list: ['📖 Completar una tarjeta: +10 XP', '✅ Quiz correcto: +15 XP', '📝 Dar retroalimentación por módulo: +20 XP', '📤 Compartir el curso: +50 XP al día', '👥 Referir a un colega: +100 XP', '📸 Subir evidencia de práctica: +80 XP']
    },
    {
        emoji: '🗓️',
        bg: 'linear-gradient(135deg,#07B0E4 0%,#1A6B68 100%)',
        title: 'Los 5 módulos del curso',
        desc: 'El curso tiene <strong>5 módulos</strong> que cubren las disciplinas STEEAM. Cada módulo se desbloquea automáticamente <strong>7 días después</strong> de completar el anterior.',
        extra: '¿No puedes esperar? Desde la pestaña <strong>Módulos</strong> puedes gastar <strong>200 XP</strong> para desbloquear el siguiente de inmediato.',
        list: ['🟡 Módulo 1: ¿Qué es STEAM? Origen y evolución', '🟢 Módulo 2: Las 6 disciplinas STEEAM', '🔵 Módulo 3: Metodologías Activas', '🟠 Módulo 4: Evaluación en STEAM', '🩷 Módulo 5: Retos en Guatemala y adaptación']
    },
    {
        emoji: '📸',
        bg: 'linear-gradient(135deg,#E9A037 0%,#E52642 100%)',
        title: 'Sube evidencias de tu práctica',
        desc: 'Aplica lo aprendido en tu aula y sube una <strong>foto como evidencia</strong>. Ganarás <strong>80 XP</strong> por cada módulo que documentes.',
        extra: 'Ve a <strong>Perfil → Gana más XP → Evidencia de práctica</strong>. Puedes subir hasta 5 fotos (una por módulo) para un total de 400 XP extra.',
        list: ['📷 La foto puede ser de tu pizarrón, actividad con estudiantes o material creado', '✅ Se acepta JPG y PNG hasta 5 MB']
    },
    {
        emoji: '👤',
        bg: 'linear-gradient(135deg,#5C35C5 0%,#07B0E4 100%)',
        title: 'Tu perfil — edítalo antes de terminar',
        desc: 'En la pestaña <strong>Perfil</strong> puedes ver tu XP, nivel, logros y racha de días activos.',
        extra: '⚠️ <strong>Importante:</strong> antes de descargar tu certificado, toca el botón <strong>✏️ Editar</strong> y escribe tu <strong>nombre completo correctamente</strong>. Ese nombre aparecerá en el diploma. También puedes subir tu foto.'
    },
    {
        emoji: '🎓',
        bg: 'linear-gradient(135deg,#1A2B4B 0%,#5C35C5 100%)',
        title: 'El Examen Final y tu Certificado',
        desc: 'Cuando completes los 5 módulos, el botón <strong>Examen Final</strong> se activará. Son <strong>20 preguntas</strong> aleatorias del banco del curso.',
        extra: null,
        list: ['📊 Puntaje mínimo para aprobar: 70%', '🔁 Si no apruebas, puedes intentarlo de nuevo', '📄 Con nota aprobatoria, descarga tu certificado en PDF desde tu Perfil', '🏅 Las preguntas son aleatorias — cambian en cada intento']
    },
    {
        emoji: '🏆',
        bg: 'linear-gradient(135deg,#FCC30A 0%,#E83C8D 100%)',
        title: '¡Todo listo para empezar! 🚀',
        desc: 'Recuerda que el progreso se guarda en la nube. Puedes acceder al curso desde tu celular, tablet o computadora con la misma cuenta.',
        extra: '¿Tienes dudas durante el curso? Escríbele al administrador. ¡Mucho éxito y a aprender!',
        list: ['💡 Tip: activa el curso como app en tu celular (busca "Instalar" en el banner)', '📶 Funciona sin conexión gracias al modo offline', '🔔 Entra todos los días para mantener tu racha de XP']
    }
];

let _onboardingStep = 0;

function startOnboarding() {
    _onboardingStep = 0;
    renderOnboardingSlide();
    document.getElementById('onboardingOverlay').classList.remove('hidden');
}

function closeOnboarding() {
    document.getElementById('onboardingOverlay').classList.add('hidden');
    localStorage.setItem('onboardingDone', '1');
}

function renderOnboardingSlide() {
    const slide = ONBOARDING_SLIDES[_onboardingStep];
    const total = ONBOARDING_SLIDES.length;
    const isLast = _onboardingStep === total - 1;

    // Fondo dinámico
    const area = document.getElementById('onboardingSlideArea');
    area.style.background = slide.bg;
    document.getElementById('onboardingEmoji').textContent = slide.emoji;
    document.getElementById('onboardingTitle').textContent = slide.title;
    document.getElementById('onboardingDesc').innerHTML = slide.desc;

    // Extra o lista
    const extraEl = document.getElementById('onboardingExtra');
    let extraHtml = '';
    if (slide.list) {
        extraHtml += '<ul class="mt-3 space-y-2">' +
            slide.list.map(item => {
                const parts = item.split(' ');
                const icon = parts[0];
                const text = parts.slice(1).join(' ');
                return `<li class="flex items-start gap-2 text-sm text-slate-600"><span class="shrink-0 text-base">${icon}</span><span>${text}</span></li>`;
            }).join('') + '</ul>';
    }
    if (slide.extra) {
        extraHtml += `<div class="mt-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-500 leading-relaxed">${slide.extra}</div>`;
    }
    extraEl.innerHTML = extraHtml;

    // Puntos de progreso
    document.getElementById('onboardingDots').innerHTML = Array.from({ length: total }, (_, i) =>
        `<div class="h-2 rounded-full transition-all duration-300 ${i === _onboardingStep ? 'w-6 bg-cyan-500' : 'w-2 bg-slate-200'}"></div>`
    ).join('');

    // Botón
    const btn = document.getElementById('onboardingNextBtn');
    btn.textContent = isLast ? '¡Comenzar el curso! 🚀' : 'Siguiente →';
}

document.getElementById('onboardingNextBtn')?.addEventListener('click', () => {
    if (_onboardingStep < ONBOARDING_SLIDES.length - 1) {
        _onboardingStep++;
        renderOnboardingSlide();
    } else {
        closeOnboarding();
    }
});
document.getElementById('skipOnboardingBtn')?.addEventListener('click', closeOnboarding);

// ==================== INSTALACIÓN PWA ====================
let _deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _deferredInstallPrompt = e;
    // Mostrar banner solo si el usuario no lo descartó antes
    if (!localStorage.getItem('installDismissed')) {
        setTimeout(() => {
            document.getElementById('installBanner')?.classList.remove('hidden');
        }, 3000); // esperar 3s para no interrumpir la carga
    }
});

document.getElementById('installBtn')?.addEventListener('click', async () => {
    if (!_deferredInstallPrompt) return;
    document.getElementById('installBanner').classList.add('hidden');
    _deferredInstallPrompt.prompt();
    const { outcome } = await _deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') showToast('✅ ¡App instalada! Búscala en tu pantalla de inicio', 'success');
    _deferredInstallPrompt = null;
});

document.getElementById('dismissInstallBtn')?.addEventListener('click', () => {
    document.getElementById('installBanner').classList.add('hidden');
    localStorage.setItem('installDismissed', '1');
});

// Si ya está instalada como PWA, ocultar banner permanentemente
window.addEventListener('appinstalled', () => {
    document.getElementById('installBanner')?.classList.add('hidden');
    _deferredInstallPrompt = null;
    showToast('✅ ¡App instalada correctamente!', 'success');
});

// iOS: no dispara beforeinstallprompt — detectar y mostrar instrucciones manuales
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isInStandaloneMode = window.navigator.standalone === true;
if (isIOS && !isInStandaloneMode && !localStorage.getItem('installDismissed')) {
    setTimeout(() => {
        const banner = document.getElementById('installBanner');
        if (banner) {
            banner.querySelector('p.text-white\\/70').textContent =
                'Toca Compartir → "Añadir a pantalla de inicio"';
            banner.querySelector('#installBtn').textContent = 'Ver cómo';
            banner.querySelector('#installBtn').onclick = () => {
                alert('📱 Para instalar en iPhone/iPad:\n1. Toca el botón Compartir (⬆️) en Safari\n2. Desplázate y elige "Añadir a pantalla de inicio"\n3. Toca "Añadir"');
            };
            banner.classList.remove('hidden');
        }
    }, 3000);
}