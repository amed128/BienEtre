import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const phases = [
{ id: 1, label: "Phase 1", weeks: "S1–S3", subtitle: "Réveil & décompression", color: "#06b6d4", bg: "#ecfeff", icon: "🌱", goal: "Activer les muscles profonds, décompresser les disques, soulager la douleur fessière droite." },
{ id: 2, label: "Phase 2", weeks: "S4–S7", subtitle: "Consolidation & marche", color: "#f59e0b", bg: "#fffbeb", icon: "🚶", goal: "Renforcer la ceinture profonde, introduire la marche active, améliorer l’endurance." },
{ id: 3, label: "Phase 3", weeks: "S8–S12", subtitle: "Progression & endurance", color: "#10b981", bg: "#ecfdf5", icon: "🏃", goal: "Introduire la course légère, renforcer globalement, ancrer les habitudes définitives." },
];

const weeklyPlans = {
1: [
{ day: "Lun", emoji: "💪", matin: "Dead Bug + Bird-Dog + Bercement bassin — 10 min", soir: "Jambes 90° + Piriforme droit × 3 + Psoas — 15 min", marche: null },
{ day: "Mar", emoji: "🚶", matin: "Activation transverse — 5 min", soir: "Marche douce 20 min + étirements 10 min", marche: "20 min" },
{ day: "Mer", emoji: "💪", matin: "Pont fessier + Dead Bug — 10 min", soir: "Piriforme droit × 3 + Ischio-jambiers", marche: null },
{ day: "Jeu", emoji: "🚶", matin: "Activation transverse — 5 min", soir: "Marche douce 20 min", marche: "20 min" },
{ day: "Ven", emoji: "💪", matin: "Dead Bug + Bird-Dog + Superman — 12 min", soir: "Étirements complets — 15 min", marche: null },
{ day: "Sam", emoji: "🌿", matin: "—", soir: "Marche tranquille 30 min en nature", marche: "30 min" },
{ day: "Dim", emoji: "😴", matin: "Genoux poitrine + Piriforme — 10 min", soir: "Repos total", marche: null, repos: true },
],
2: [
{ day: "Lun", emoji: "💪", matin: "Dead Bug + Bird-Dog + Planche coudes — 15 min", soir: "Étirements 15 min + Piriforme droit", marche: "30 min marche active" },
{ day: "Mar", emoji: "🚶", matin: "Activation + Pont fessier unilatéral", soir: "Marche 25 min", marche: "25 min" },
{ day: "Mer", emoji: "💪", matin: "Renforcement complet — 15 min", soir: "Étirements 15 min", marche: null },
{ day: "Jeu", emoji: "🚶", matin: "Activation transverse", soir: "Marche active 35 min", marche: "35 min" },
{ day: "Ven", emoji: "💪", matin: "Dead Bug + Planche latérale + Superman — 15 min", soir: "Étirements complets", marche: null },
{ day: "Sam", emoji: "🌿", matin: "—", soir: "Marche en nature 45 min", marche: "45 min" },
{ day: "Dim", emoji: "😴", matin: "Étirements doux — 10 min", soir: "Repos actif", marche: null, repos: true },
],
3: [
{ day: "Lun", emoji: "💪", matin: "Renforcement profond — 20 min", soir: "Étirements 15 min", marche: "30 min marche + 3×1 min trot" },
{ day: "Mar", emoji: "🚶", matin: "Activation + Gainage", soir: "Marche active 30 min", marche: "30 min" },
{ day: "Mer", emoji: "💪", matin: "Renforcement 20 min", soir: "Étirements + bain chaud lombaires", marche: null },
{ day: "Jeu", emoji: "🏃", matin: "Activation transverse", soir: "35 min — 20 marche + 5×1 min trot", marche: "35 min" },
{ day: "Ven", emoji: "💪", matin: "Renforcement complet — 20 min", soir: "Étirements complets", marche: null },
{ day: "Sam", emoji: "🌿", matin: "—", soir: "50 min — marche/trot alternés", marche: "50 min" },
{ day: "Dim", emoji: "😴", matin: "Étirements doux + piriforme", soir: "Repos total", marche: null, repos: true },
],
};

const walkPlan = [
{ phase: 1, week: "S1", type: "Marche douce", duration: "20 min × 3/sem", intensity: "Très facile", hr: "< 110 bpm", note: "Terrain plat, rythme conversation" },
{ phase: 1, week: "S2", type: "Marche douce", duration: "25 min × 4/sem", intensity: "Facile", hr: "< 115 bpm", note: "Dos droit, abdos légèrement contractés" },
{ phase: 1, week: "S3", type: "Marche active", duration: "30 min × 4/sem", intensity: "Facile", hr: "< 120 bpm", note: "Commencez à marcher un peu plus vite" },
{ phase: 2, week: "S4", type: "Marche active", duration: "35 min × 4/sem", intensity: "Modéré", hr: "120–130 bpm", note: "Légère côte si possible" },
{ phase: 2, week: "S5", type: "Marche active", duration: "40 min × 4/sem + longue", intensity: "Modéré", hr: "120–130 bpm", note: "Sortie longue 50 min le week-end" },
{ phase: 2, week: "S6", type: "Marche rapide", duration: "40 min × 4/sem", intensity: "Modéré–soutenu", hr: "130–140 bpm", note: "Bras actifs, foulée énergique" },
{ phase: 2, week: "S7", type: "Marche rapide", duration: "45 min × 4/sem", intensity: "Soutenu", hr: "130–140 bpm", note: "Introduire 2–3 × 1 min de trot léger" },
{ phase: 3, week: "S8", type: "Marche + trot", duration: "40 min × 4/sem", intensity: "Modéré", hr: "130–145 bpm", note: "5 min marche / 1 min trot × 5" },
{ phase: 3, week: "S9", type: "Marche + trot", duration: "40 min × 4/sem", intensity: "Modéré", hr: "130–145 bpm", note: "4 min marche / 2 min trot × 5" },
{ phase: 3, week: "S10", type: "Trot progressif", duration: "45 min × 4/sem", intensity: "Modéré–soutenu", hr: "140–150 bpm", note: "3 min marche / 3 min trot" },
{ phase: 3, week: "S11", type: "Course légère", duration: "45 min × 4/sem", intensity: "Soutenu", hr: "145–155 bpm", note: "2 min marche / 5 min course" },
{ phase: 3, week: "S12", type: "Course légère", duration: "50 min × 4/sem", intensity: "Soutenu", hr: "145–155 bpm", note: "Course continue 20 min si aucune douleur" },
];

const nutritionData = [
{ meal: "Réveil", icon: "🌅", time: "7h00", color: "#f59e0b", items: ["1 grand verre d’eau 300ml", "Eau tiède + jus de citron"] },
{ meal: "Petit-déjeuner", icon: "🥣", time: "7h30", color: "#10b981", items: ["Flocons d’avoine + fruits rouges", "Noix / amandes (magnésium)", "Thé vert ou café"] },
{ meal: "Collation matin", icon: "💧", time: "10h00", color: "#06b6d4", items: ["500ml d’eau", "Pause active bureau 2 min"] },
{ meal: "Déjeuner", icon: "🍽️", time: "12h30", color: "#3b82f6", items: ["Poisson gras 2×/semaine (saumon, sardines)", "Légumes verts (épinards, brocoli)", "Quinoa ou riz complet", "Huile d’olive vierge extra"] },
{ meal: "Collation après-midi", icon: "🥝", time: "15h30", color: "#06b6d4", items: ["500ml d’eau", "Kiwi ou orange (vitamine C)", "Pause active bureau"] },
{ meal: "Dîner", icon: "🥗", time: "19h00", color: "#10b981", items: ["Protéines maigres (poulet, œufs, légumineuses)", "Légumes colorés (poivron, tomate)", "Éviter fritures et sucres raffinés"] },
{ meal: "Coucher", icon: "🌙", time: "21h00", color: "#10b981", items: ["Tisane camomille (magnésium naturel)", "Dernier verre d’eau 250ml"] },
];

const antiInflamFoods = [
"🐟 Poissons gras (saumon, sardines, maquereau)",
"🫒 Huile d’olive extra vierge",
"🫐 Fruits rouges & baies",
"🥬 Légumes verts (épinards, brocoli, kale)",
"🌰 Noix, amandes, noisettes",
"🧄 Ail & curcuma frais",
"🍵 Thé vert",
"🍫 Chocolat noir > 70%",
];

const proInflamFoods = [
"🍟 Fritures & fast-food",
"🧁 Sucre raffiné & pâtisseries",
"🥩 Charcuteries & viandes transformées",
"🥤 Sodas & jus industriels sucrés",
"🍺 Alcool en excès",
"🧈 Graisses trans & margarines",
"🍞 Pain blanc & farines raffinées",
"🧂 Sel en excès",
];

const supplementsData = [
{ name: "Collagène marin", dose: "10g / jour", timing: "Matin à jeun", why: "Composant structural du disque intervertébral. Stimule la synthèse de cartilage discal.", icon: "🐟", priority: 1 },
{ name: "Magnésium bisglycinate", dose: "300–400mg / jour", timing: "Soir au coucher", why: "Détente musculaire profonde, qualité du sommeil, santé du cartilage. Le plus absorbable.", icon: "💊", priority: 1 },
{ name: "Oméga-3 (EPA/DHA)", dose: "2–3g / jour", timing: "Avec le repas", why: "Anti-inflammatoire naturel puissant. Réduit l’inflammation discale et raideur matinale.", icon: "🫐", priority: 1 },
{ name: "Vitamine D3 + K2", dose: "2000 UI D3 + 100µg K2", timing: "Matin avec repas", why: "Santé osseuse et vertébrale essentielle. K2 oriente le calcium vers les os, pas les artères.", icon: "☀️", priority: 2 },
{ name: "Curcuma + Pipérine", dose: "500mg × 2 / jour", timing: "Avec les repas", why: "Anti-inflammatoire puissant. La pipérine multiplie l’absorption par 20. Réduit douleur discale.", icon: "🌿", priority: 2 },
{ name: "Glucosamine + Chondroïtine", dose: "1500mg / jour", timing: "Avec repas", why: "Soutien direct du cartilage discal. Ralentit la dégénérescence. Effets visibles après 2–3 mois.", icon: "🦴", priority: 3 },
{ name: "Vitamine C", dose: "500–1000mg / jour", timing: "Avec le déjeuner", why: "Cofacteur indispensable à la synthèse du collagène. Antioxydant. Renforce l’effet du collagène marin.", icon: "🍊", priority: 3 },
];

const hydrationSchedule = [
{ time: "Réveil", amount: 300, icon: "🌅", note: "Avant tout — corps déshydraté après la nuit" },
{ time: "9h00", amount: 300, icon: "💪", note: "Pendant ou après les exercices" },
{ time: "11h00", amount: 300, icon: "💼", note: "Au bureau" },
{ time: "13h00", amount: 300, icon: "🍽️", note: "Pendant le repas" },
{ time: "15h30", amount: 300, icon: "💼", note: "Bureau — posez une bouteille sur le bureau" },
{ time: "17h30", amount: 300, icon: "🚶", note: "Après le bureau / pendant la marche" },
{ time: "19h30", amount: 300, icon: "🥗", note: "Pendant le dîner" },
{ time: "21h00", amount: 200, icon: "🌙", note: "Avant de dormir" },
];

const exercises = [
{ name: "Piriforme droit", tag: "⭐ PRIORITÉ ABSOLUE", timing: "Matin + Midi + Soir", reps: "45 sec × 3 — côté DROIT prioritaire", color: "#ef4444", bg: "#fef2f2", desc: "Sur le dos : croisez la cheville droite sur le genou gauche, ramenez vers vous avec les mains. Insistez nettement plus sur le côté droit — c’est le siège de votre douleur fessière.", steps: ["Allongez-vous sur le dos, genoux fléchis", "Croisez la cheville DROITE sur le genou gauche", "Ramenez le genou gauche vers votre poitrine avec les deux mains", "Sentez l’étirement profond dans la fesse droite", "Tenez 45 sec en respirant normalement"] },
{ name: "Dead Bug", tag: "⭐ EXERCICE CLÉ", timing: "Matin + Après bureau", reps: "5 sec × 8 répétitions", color: "#06b6d4", bg: "#ecfeff", desc: "Sur le dos, 4 membres en l’air. Rentrez le nombril, puis descendez lentement bras droit + jambe gauche sans décoller le bas du dos du sol.", steps: ["Allongez-vous sur le dos, genoux à 90° en l’air, bras tendus vers le plafond", "EXPIREZ et rentrez le nombril vers la colonne — tenez cette contraction", "Descendez lentement le bras DROIT et la jambe GAUCHE vers le sol (5 sec)", "Ne décollez JAMAIS le bas du dos du sol", "Revenez, alternez côté"] },
{ name: "Bird-Dog", tag: "💪 RENFORCEMENT", timing: "Matin", reps: "8–10 répétitions chaque côté", color: "#f59e0b", bg: "#fffbeb", desc: "À 4 pattes, dos parfaitement plat comme une table. Étendez bras droit + jambe gauche simultanément. Tenez 5 secondes. Aucune rotation du bassin.", steps: ["Mettez-vous à 4 pattes, dos plat (vérifiez avec une règle imaginaire)", "Activez le transverse : rentrez légèrement le nombril", "Tendez lentement le BRAS DROIT + JAMBE GAUCHE en même temps", "Tenez 5 secondes, bassin parfaitement stable", "Revenez et alternez"] },
{ name: "Pont fessier", tag: "💪 RENFORCEMENT", timing: "Matin + Soir", reps: "10–15 répétitions", color: "#3b82f6", bg: "#eff6ff", desc: "Allongé sur le dos, genoux fléchis. Montez le bassin en contractant les fesses. Descendez vertèbre par vertèbre.", steps: ["Allongé sur le dos, pieds à plat, genoux fléchis à 90°", "Contractez les abdominaux profonds avant de monter", "Soulevez le bassin en serrant fort les fesses", "Tenez 5 secondes en haut", "Redescendez vertèbre par vertèbre — lentement"] },
{ name: "Planche coudes", tag: "💪 GAINAGE", timing: "Matin", reps: "3 × 20 à 60 secondes", color: "#10b981", bg: "#ecfdf5", desc: "Corps en ligne droite parfaite, appui sur avant-bras et orteils. Rentrez le nombril. Ne retenez pas votre souffle.", steps: ["Appui sur les avant-bras et les orteils", "Corps en ligne parfaite : ni les fesses trop hautes, ni trop basses", "Rentrez le nombril vers la colonne", "Respirez normalement — ne bloquez JAMAIS la respiration", "Progressez de 20 sec vers 60 sec sur les semaines"] },
{ name: "Étirement psoas", tag: "🧘 ÉTIREMENT", timing: "Soir", reps: "40 sec × 2 — chaque côté", color: "#10b981", bg: "#ecfdf5", desc: "En fente avant, genou arrière au sol. Poussez le bassin vers l’avant. Le psoas tendu tire en permanence sur vos lombaires.", steps: ["Mettez-vous en fente avant, genou arrière posé au sol", "Gardez le dos droit, regard vers l’avant", "Poussez doucement le bassin vers l’avant", "Sentez l’étirement à l’avant de la cuisse arrière", "Tenez 40 secondes, changez de côté"] },
{ name: "Ischio-jambiers", tag: "🧘 ÉTIREMENT", timing: "Soir", reps: "40 sec × 2 — côté droit prioritaire", color: "#10b981", bg: "#ecfdf5", desc: "Sur le dos, une jambe tendue vers le plafond. Tension douce à l’arrière de la cuisse. Ne forcez pas — les ischio-jambiers tendus aggravent les lombaires.", steps: ["Allongé sur le dos, une jambe fléchie pied à plat", "Levez l’autre jambe tendue vers le plafond", "Tenez avec les deux mains derrière la cuisse", "Tension douce seulement — ne tirez pas fort", "Tenez 40 secondes, changez de côté — insistez sur le droit"] },
];

const phaseColor = { 1: "#06b6d4", 2: "#f59e0b", 3: "#10b981" };

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Plan() {
const [tab, setTab] = useState("programme");
const [phase, setPhase] = useState(1);
const [openEx, setOpenEx] = useState(null);
const [showWelcome, setShowWelcome] = useState(() => localStorage.getItem("bienetre_welcomed") !== "1");
const [activityTab, setActivityTab] = useState("exercices");

const tabs = [
{ id: "programme", label: "📅 Programme" },
{ id: "activites", label: "🏃 Activités" },
{ id: "nutrition", label: "🥗 Nutrition" },
{ id: "supplements", label: "💊 Compléments" },
{ id: "hydration", label: "💧 Hydratation" },
];

return (
<div style={{ fontFamily: "system-ui, sans-serif", background: "#f1f5f9", minHeight: "100vh", color: "#1e293b" }}>
<style>{`* { box-sizing: border-box; margin: 0; padding: 0; } .card { background: white; border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.07); } .btn { cursor: pointer; border: none; font-family: inherit; transition: all 0.18s; } .btn:hover { filter: brightness(1.08); transform: translateY(-1px); } .fade { animation: fadeUp 0.3s ease-out; } @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } } /* Stick figure animations */ @keyframes pirAnim { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-18deg) translateX(4px)} } @keyframes glowAnim { 0%,100%{opacity:0.15} 50%{opacity:0.55} } @keyframes armDown { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(68deg)} } @keyframes legDown { 0%,100%{transform:rotate(8deg)} 50%{transform:rotate(-68deg)} } @keyframes birdArm { 0%,35%,100%{transform:rotate(0deg)} 60%,80%{transform:rotate(-52deg)} } @keyframes birdLeg { 0%,35%,100%{transform:rotate(0deg)} 60%,80%{transform:rotate(48deg)} } @keyframes hipUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} } @keyframes arrowUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} } @keyframes breathe { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.05)} } @keyframes lunge { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-5px) rotate(-4deg)} } @keyframes ischRaise { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-28deg)} } .pir-leg { animation: pirAnim 3s ease-in-out infinite; transform-origin: 75px 74px; } .pir-glow { animation: glowAnim 2s ease-in-out infinite; } .db-arm { animation: armDown 3s ease-in-out infinite; transform-origin: 115px 68px; } .db-leg { animation: legDown 3s ease-in-out infinite; transform-origin: 58px 77px; } .bd-arm { animation: birdArm 3s ease-in-out infinite; transform-origin: 60px 62px; } .bd-leg { animation: birdLeg 3s ease-in-out infinite; transform-origin: 128px 76px; } .hip-body { animation: hipUp 2.5s ease-in-out infinite; transform-origin: 95px 98px; } .hip-arrow { animation: arrowUp 2.5s ease-in-out infinite; } .plank-body { animation: breathe 3s ease-in-out infinite; transform-origin: 128px 123px; } .lunge-torso { animation: lunge 3s ease-in-out infinite; transform-origin: 82px 88px; } .isc-leg { animation: ischRaise 3.5s ease-in-out infinite; transform-origin: 80px 80px; } .core-glow { animation: glowAnim 2.5s ease-in-out infinite; } .card-hover { transition: box-shadow 0.2s, transform 0.2s; } .card-hover:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.13); transform: translateY(-2px); } .card-elevated { box-shadow: 0 4px 16px rgba(0,0,0,0.11) !important; }
@media (max-width: 600px) {
  .week-card { display: flex !important; flex-wrap: wrap; align-items: flex-start; gap: 8px !important; }
  .week-day { flex-shrink: 0; width: 56px; }
  .week-marche { margin-left: auto; flex-shrink: 0; }
  .week-matin, .week-soir { width: 100%; }
  .walk-card { grid-template-columns: 52px 1fr !important; }
  .walk-duration { grid-column: 1 / -1; }
  .walk-intensity { grid-column: 1; }
  .walk-hr { grid-column: 2; }
  .meal-card { grid-template-columns: 56px 1fr !important; }
  .meal-items { grid-column: 1 / -1; }
}`}</style>

  {/* HEADER */}
  <div style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#0c4a6e 100%)", padding: "36px 24px 28px", textAlign: "center" }}>
    <div style={{ fontSize: "2.4rem", marginBottom: "6px" }}>🦴</div>
    <h1 style={{ fontSize: "clamp(1.3rem,4vw,2rem)", fontWeight: 900, color: "#fbbf24", marginBottom: "6px" }}>Plan de Récupération Complet</h1>
    <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Discopathie L4-L5 / L5-S1 · Protrusion paramédiane droite · 12 semaines</p>
    <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "16px", flexWrap: "wrap" }}>
      {phases.map(p => <div key={p.id} style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${p.color}55`, borderRadius: "50px", padding: "5px 14px", fontSize: "0.78rem", color: p.color, fontWeight: 700 }}>{p.icon} {p.label} · {p.weeks}</div>)}
    </div>
  </div>

  <div style={{ maxWidth: "980px", margin: "0 auto", padding: "24px 16px 90px" }}>

    {/* ════════════════ PROGRAMME ════════════════ */}
    {tab === "programme" && (
      <div className="fade">

        {/* Welcome card */}
        {showWelcome && (
          <div className="card card-elevated" style={{ padding: "18px 22px", marginBottom: "22px", background: "#fefce8", borderLeft: "5px solid #f59e0b", position: "relative" }}>
            <button onClick={() => { setShowWelcome(false); localStorage.setItem("bienetre_welcomed", "1"); }}
              style={{ position: "absolute", top: "12px", right: "14px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#94a3b8", lineHeight: 1 }}>✕</button>
            <div style={{ fontWeight: 900, fontSize: "1rem", color: "#92400e", marginBottom: "10px" }}>👋 Bienvenue — Par où commencer ?</div>
            <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>
                <b>Lisez votre plan hebdomadaire</b> ci-dessous — choisissez votre phase et suivez jour par jour.
              </li>
              <li style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>
                <b style={{ cursor: "pointer", color: "#f59e0b" }} onClick={() => { setTab("activites"); setActivityTab("exercices"); }}>Apprenez les 7 exercices clés →</b> regardez les animations et mémorisez les étapes.
              </li>
              <li style={{ fontSize: "0.85rem", color: "#ef4444", lineHeight: 1.5, fontWeight: 700 }}>
                ⭐ Priorité absolue : étirement Piriforme droit × 3 fois par jour, tous les jours.
              </li>
            </ol>
            <div style={{ marginTop: "12px", fontSize: "0.75rem", color: "#a16207" }}>Appuyez sur ✕ pour masquer définitivement.</div>
          </div>
        )}

        {/* Phase selector */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {phases.map(p => (
            <button key={p.id} className="btn" onClick={() => setPhase(p.id)}
              style={{ padding: "12px 20px", borderRadius: "50px", fontSize: "0.83rem", fontWeight: 800, background: phase === p.id ? p.color : "white", color: phase === p.id ? "white" : p.color, border: `2px solid ${p.color}` }}>
              {p.icon} {p.label} · {p.weeks}
            </button>
          ))}
        </div>

        {phases.filter(p => p.id === phase).map(p => (
          <div key={p.id}>
            <div className="card card-elevated" style={{ padding: "18px 22px", marginBottom: "18px", borderLeft: `5px solid ${p.color}`, background: p.bg }}>
              <div style={{ fontWeight: 900, fontSize: "1.05rem", color: p.color, marginBottom: "5px" }}>{p.icon} {p.label} · {p.weeks} — {p.subtitle}</div>
              <div style={{ fontSize: "0.87rem", color: "#475569" }}>🎯 <b>Objectif :</b> {p.goal}</div>
            </div>

            <div style={{ background: "#fffbeb", border: "2px solid #fbbf24", borderRadius: "12px", padding: "10px 16px", marginBottom: "18px", fontSize: "0.83rem", color: "#92400e", fontWeight: 700 }}>
              ⚠️ Si douleur dans la jambe droite pendant un exercice → arrêt immédiat et consultation.
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {weeklyPlans[p.id].map((d, i) => (
                <div key={i} className="card week-card" style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "56px 1fr 1fr 110px", gap: "10px", alignItems: "center", borderLeft: d.repos ? "4px solid #10b981" : `4px solid ${p.color}` }}>
                  <div className="week-day" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.3rem" }}>{d.emoji}</div>
                    <div style={{ fontWeight: 900, fontSize: "0.88rem", color: d.repos ? "#10b981" : p.color }}>{d.day}</div>
                  </div>
                  <div className="week-matin">
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", marginBottom: "3px" }}>🌅 Matin</div>
                    <div style={{ fontSize: "0.8rem", color: "#334155", fontWeight: 600, lineHeight: 1.4 }}>{d.matin}</div>
                  </div>
                  <div className="week-soir">
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", marginBottom: "3px" }}>🌙 Soir</div>
                    <div style={{ fontSize: "0.8rem", color: "#334155", fontWeight: 600, lineHeight: 1.4 }}>{d.soir}</div>
                  </div>
                  <div className="week-marche" style={{ textAlign: "center" }}>
                    {d.repos ? (
                      <div style={{ background: "#d1fae5", borderRadius: "10px", padding: "8px", fontSize: "0.75rem", fontWeight: 800, color: "#059669" }}>😴 Repos</div>
                    ) : d.marche ? (
                      <div style={{ background: `${p.color}18`, borderRadius: "10px", padding: "8px" }}>
                        <div style={{ fontSize: "1.1rem" }}>🚶</div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 800, color: p.color }}>{d.marche}</div>
                      </div>
                    ) : (
                      <div style={{ color: "#cbd5e1", fontSize: "0.75rem", fontWeight: 700 }}>—</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Daily rhythm */}
            <div className="card" style={{ padding: "20px 22px", marginTop: "20px" }}>
              <div style={{ fontWeight: 900, fontSize: "0.98rem", marginBottom: "14px" }}>⏰ Rythme quotidien — bureau inclus</div>
              {[
                ["7h00", "#fbbf24", "Réveil + routine matin 10–15 min (Dead Bug, Bird-Dog, Piriforme droit)"],
                ["8h–17h", "#06b6d4", "Bureau — activation transverse discrète toutes les heures"],
                ["Toutes 45 min", "#ef4444", "⚡ Levez-vous, marchez 2–3 min dans le couloir — règle non négociable"],
                ["12h30", "#10b981", "Déjeuner + marche 10 min après le repas"],
                ["17h30", "#3b82f6", "Jambes à 90° sur chaise 15 min — décompression post-bureau"],
                ["18h00", "#f59e0b", "Routine soir 10–15 min — étirements + renforcement léger"],
                ["20h00", "#10b981", "Marche 20–30 min si possible (meilleur ami de vos disques)"],
                ["21h30", "#10b981", "Coucher — dos + coussin sous genoux, ou côté + coussin entre genoux"],
              ].map(([time, color, text], i, arr) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ background: color + "22", color, borderRadius: "8px", padding: "3px 10px", fontSize: "0.78rem", fontWeight: 800, whiteSpace: "nowrap", minWidth: "105px", textAlign: "center", flexShrink: 0, paddingTop: "5px" }}>{time}</div>
                  <div style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 600, paddingTop: "4px", lineHeight: 1.45 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* ════════════════ ACTIVITÉS ════════════════ */}
    {tab === "activites" && (
      <div className="fade">

        {/* Sub-tabs */}
        <div style={{ display: "flex", background: "white", borderRadius: "14px", padding: "4px", gap: "4px", marginBottom: "22px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
          {[{ id: "exercices", label: "🏋️ Exercices" }, { id: "marche", label: "🚶 Marche & Course" }].map(t => (
            <button key={t.id} className="btn" onClick={() => setActivityTab(t.id)}
              style={{ flex: 1, padding: "11px 16px", borderRadius: "10px", fontSize: "0.88rem", fontWeight: 800,
                background: activityTab === t.id ? "#1e3a5f" : "transparent",
                color: activityTab === t.id ? "white" : "#64748b" }}>
              {t.label}
            </button>
          ))}
        </div>

        {activityTab === "exercices" && (
        <div className="fade">
        <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: "12px", padding: "12px 18px", marginBottom: "20px", fontSize: "0.85rem", fontWeight: 800, color: "#dc2626" }}>
          ⭐ PRIORITÉ ABSOLUE : étirement du piriforme DROIT — matin, midi (bureau), soir. C'est le geste le plus ciblé pour votre douleur fessière haute droite.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "18px" }}>
          {exercises.map((ex, i) => (
            <div key={i} className="card card-hover" style={{ overflow: "hidden", border: `2px solid ${openEx === i ? ex.color : "transparent"}`, cursor: "pointer", transition: "all 0.2s" }}
              onClick={() => setOpenEx(openEx === i ? null : i)}>
              {/* SVG animation */}
              <div style={{ background: ex.bg, padding: "16px", display: "flex", justifyContent: "center" }}>
                {i === 0 && ( // Piriforme
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="100" x2="170" y2="100" stroke="#fca5a5" strokeWidth="2"/>
                    <rect x="55" y="68" width="90" height="18" rx="9" fill="#ef4444" opacity="0.8"/>
                    <circle cx="155" cy="77" r="13" fill="#fbbf24"/>
                    <circle cx="150" cy="73" r="2.5" fill="#444"/><circle cx="158" cy="73" r="2.5" fill="#444"/>
                    <path d="M 146 102 Q 148 102 149 109" stroke="#a0522d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <line x1="65" y1="84" x2="60" y2="100" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <g className="pir-leg">
                      <line x1="75" y1="74" x2="56" y2="49" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="56" y1="49" x2="76" y2="68" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    </g>
                    <ellipse className="pir-glow" cx="72" cy="68" rx="17" ry="11" fill="#ef4444"/>
                    <text x="90" y="115" fontFamily="system-ui" fontSize="10" fill="#ef4444" textAnchor="middle" fontWeight="800">👉 Insistez côté DROIT</text>
                  </svg>
                )}
                {i === 1 && ( // Dead Bug
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="100" x2="170" y2="100" stroke="#a5f3fc" strokeWidth="2"/>
                    <rect x="45" y="68" width="90" height="18" rx="9" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="145" cy="77" r="13" fill="#fbbf24"/>
                    <circle cx="140" cy="73" r="2.5" fill="#444"/><circle cx="148" cy="73" r="2.5" fill="#444"/>
                    <ellipse className="core-glow" cx="90" cy="77" rx="26" ry="10" fill="#10b981"/>
                    <text x="90" y="60" fontFamily="system-ui" fontSize="8" fill="#10b981" textAnchor="middle" fontWeight="800">TRANSVERSE !</text>
                    <g className="db-arm">
                      <line x1="115" y1="68" x2="138" y2="44" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    </g>
                    <line x1="125" y1="70" x2="142" y2="50" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" opacity="0.25"/>
                    <g className="db-leg">
                      <line x1="58" y1="77" x2="36" y2="100" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    </g>
                    <line x1="68" y1="68" x2="68" y2="44" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" opacity="0.25"/>
                    <line x1="68" y1="44" x2="82" y2="44" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" opacity="0.25"/>
                    <text x="90" y="115" fontFamily="system-ui" fontSize="10" fill="#06b6d4" textAnchor="middle" fontWeight="800">Bras et jambe opposés</text>
                  </svg>
                )}
                {i === 2 && ( // Bird-Dog
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="108" x2="170" y2="108" stroke="#fde68a" strokeWidth="2"/>
                    <rect x="50" y="60" width="85" height="18" rx="9" fill="#f59e0b" opacity="0.8"/>
                    <circle cx="145" cy="69" r="12" fill="#fbbf24"/>
                    <circle cx="140" cy="65" r="2.5" fill="#444"/><circle cx="148" cy="65" r="2.5" fill="#444"/>
                    <text x="92" y="50" fontFamily="system-ui" fontSize="8" fill="#06b6d4" textAnchor="middle" fontWeight="800">DOS PLAT ←→</text>
                    <line x1="128" y1="78" x2="128" y2="108" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="60" y1="60" x2="60" y2="108" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <g className="bd-arm">
                      <line x1="60" y1="62" x2="24" y2="62" stroke="#10b981" strokeWidth="5" strokeLinecap="round"/>
                      <ellipse cx="18" cy="62" rx="7" ry="5" fill="#10b981"/>
                    </g>
                    <g className="bd-leg">
                      <line x1="128" y1="76" x2="164" y2="76" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"/>
                      <ellipse cx="170" cy="76" rx="7" ry="5" fill="#f59e0b"/>
                    </g>
                    <text x="90" y="118" fontFamily="system-ui" fontSize="10" fill="#f59e0b" textAnchor="middle" fontWeight="800">Bras G + Jambe D (et inversement)</text>
                  </svg>
                )}
                {i === 3 && ( // Pont fessier
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="108" x2="170" y2="108" stroke="#c4b5fd" strokeWidth="2"/>
                    <circle cx="158" cy="98" r="12" fill="#fbbf24"/>
                    <circle cx="153" cy="94" r="2.5" fill="#444"/><circle cx="161" cy="94" r="2.5" fill="#444"/>
                    <line x1="38" y1="108" x2="38" y2="82" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="22" y1="108" x2="52" y2="108" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    <line x1="56" y1="108" x2="56" y2="80" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="40" y1="108" x2="70" y2="108" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    <g className="hip-body">
                      <path d="M 40 104 Q 75 74 112 74 Q 138 74 158 94" stroke="#3b82f6" strokeWidth="7" fill="none" strokeLinecap="round"/>
                      <ellipse cx="78" cy="82" rx="22" ry="10" fill="#3b82f6" opacity="0.2"/>
                      <text className="hip-arrow" x="78" y="58" fontFamily="system-ui" fontSize="20" fill="#f59e0b" textAnchor="middle" fontWeight="900">↑</text>
                    </g>
                    <text x="90" y="118" fontFamily="system-ui" fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="800">Serrez les fesses en montant</text>
                  </svg>
                )}
                {i === 4 && ( // Planche
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="108" x2="170" y2="108" stroke="#a7f3d0" strokeWidth="2"/>
                    <g className="plank-body">
                      <rect x="55" y="88" width="110" height="20" rx="10" fill="#10b981" opacity="0.8"/>
                    </g>
                    <circle cx="175" cy="90" r="12" fill="#fbbf24"/>
                    <circle cx="170" cy="86" r="2.5" fill="#444"/><circle cx="178" cy="86" r="2.5" fill="#444"/>
                    <line x1="68" y1="108" x2="55" y2="108" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="70" y1="107" x2="62" y2="108" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    <line x1="58" y1="108" x2="58" y2="90" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="38" y1="108" x2="65" y2="108" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    <ellipse className="core-glow" cx="118" cy="98" rx="42" ry="8" fill="#10b981"/>
                    <line x1="58" y1="82" x2="172" y2="82" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5"/>
                    <text x="90" y="72" fontFamily="system-ui" fontSize="8.5" fill="#10b981" textAnchor="middle" fontWeight="800">← LIGNE DROITE →</text>
                    <text x="90" y="118" fontFamily="system-ui" fontSize="10" fill="#10b981" textAnchor="middle" fontWeight="800">Nombril rentré, respirez normalement</text>
                  </svg>
                )}
                {i === 5 && ( // Psoas
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="112" x2="170" y2="112" stroke="#a7f3d0" strokeWidth="2"/>
                    <line x1="58" y1="90" x2="58" y2="112" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="40" y1="112" x2="76" y2="112" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    <line x1="108" y1="87" x2="128" y2="112" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="110" y1="112" x2="140" y2="112" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
                    <g className="lunge-torso">
                      <line x1="82" y1="88" x2="87" y2="44" stroke="#10b981" strokeWidth="8" strokeLinecap="round"/>
                      <circle cx="88" cy="33" r="12" fill="#fbbf24"/>
                      <circle cx="83" cy="29" r="2.5" fill="#444"/><circle cx="91" cy="29" r="2.5" fill="#444"/>
                      <ellipse cx="82" cy="88" rx="16" ry="11" fill="#f59e0b" opacity="0.2"/>
                    </g>
                    <text x="62" y="97" fontFamily="system-ui" fontSize="16" fill="#f59e0b" fontWeight="900" style={{animation:"arrowUp 2.5s ease-in-out infinite"}}>→</text>
                    <text x="90" y="122" fontFamily="system-ui" fontSize="10" fill="#10b981" textAnchor="middle" fontWeight="800">Poussez le bassin vers l'avant</text>
                  </svg>
                )}
                {i === 6 && ( // Ischio
                  <svg viewBox="0 0 180 120" width="180" height="110">
                    <line x1="10" y1="105" x2="170" y2="105" stroke="#c7d2fe" strokeWidth="2"/>
                    <rect x="55" y="76" width="90" height="20" rx="10" fill="#10b981" opacity="0.8"/>
                    <circle cx="155" cy="86" r="12" fill="#fbbf24"/>
                    <circle cx="150" cy="82" r="2.5" fill="#444"/><circle cx="158" cy="82" r="2.5" fill="#444"/>
                    <line x1="65" y1="94" x2="60" y2="105" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                    <g className="isc-leg">
                      <line x1="80" y1="78" x2="80" y2="36" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="80" y1="78" x2="80" y2="36" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" opacity="0.18"/>
                      <ellipse cx="80" cy="31" rx="7" ry="5" fill="#fbbf24"/>
                    </g>
                    <text x="90" y="118" fontFamily="system-ui" fontSize="10" fill="#10b981" textAnchor="middle" fontWeight="800">Tension douce — ne forcez pas</text>
                  </svg>
                )}
              </div>

              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: ex.color, marginBottom: "3px" }}>{ex.tag}</div>
                <div style={{ fontSize: "0.98rem", fontWeight: 900, marginBottom: "5px" }}>{ex.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "10px", lineHeight: 1.45 }}>{ex.desc}</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span style={{ background: ex.color + "30", color: ex.color, borderRadius: "50px", padding: "3px 10px", fontSize: "0.78rem", fontWeight: 800 }}>{ex.reps}</span>
                  <span style={{ background: "#f1f5f9", color: "#64748b", borderRadius: "50px", padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700 }}>{ex.timing}</span>
                </div>

                {/* Steps accordion */}
                {openEx === i && (
                  <div style={{ marginTop: "12px", borderTop: `2px solid ${ex.color}30`, paddingTop: "12px" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: ex.color, marginBottom: "8px" }}>📋 ÉTAPES :</div>
                    {ex.steps.map((s, j) => (
                      <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: ex.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900, flexShrink: 0 }}>{j + 1}</div>
                        <div style={{ fontSize: "0.8rem", color: "#334155", lineHeight: 1.45, paddingTop: "2px" }}>{s}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: "12px", padding: "8px 0", fontSize: "0.85rem", color: ex.color, fontWeight: 700, cursor: "pointer" }}>{openEx === i ? "▲ Masquer les étapes" : "▼ Voir les étapes détaillées"}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "18px 22px", marginTop: "20px" }}>
          <div style={{ fontWeight: 900, color: "#dc2626", marginBottom: "12px" }}>🚫 À éviter absolument</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "9px" }}>
            {["Crunchs / relevés de buste", "Flexions jambes tendues debout", "Rotation + flexion combinées", "Squat chargé lourd", "Leg press jambes tendues", "Brasse coulée en natation"].map((item, i) => (
              <div key={i} style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "10px", padding: "9px 13px", fontSize: "0.8rem", fontWeight: 700, color: "#dc2626" }}>🚫 {item}</div>
            ))}
          </div>
        </div>
        </div>
        )}

        {activityTab === "marche" && (
        <div className="fade">
        <div className="card" style={{ padding: "16px 20px", marginBottom: "18px", background: "#f0fdf4", borderLeft: "4px solid #10b981" }}>
          <div style={{ fontWeight: 900, color: "#059669", marginBottom: "5px" }}>🏃 Progression marche → course sur 12 semaines</div>
          <div style={{ fontSize: "0.85rem", color: "#166534" }}>Vos protrusions sont "petites" selon le Dr Baur — la course est un objectif atteignable. Règle absolue : zéro douleur dans la jambe pendant ou après.</div>
        </div>

        <div className="card" style={{ padding: "18px 22px", marginBottom: "18px" }}>
          <div style={{ fontWeight: 900, fontSize: "0.95rem", marginBottom: "14px" }}>✅ La bonne technique de marche</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "10px" }}>
            {[["🦶","Foulée courte","Sous le centre de gravité — pas le talon en avant"],["💪","Bras actifs","Balancés naturellement, pas croisés sur la poitrine"],["🧍","Dos droit","Regard horizon, épaules relâchées, tête haute"],["🫁","Abdos contractés","Légèrement, tout au long de la marche"]].map(([icon, title, desc], i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: "12px", padding: "13px 15px" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{icon}</div>
                <div style={{ fontWeight: 800, fontSize: "0.85rem", marginBottom: "4px" }}>{title}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: "9px" }}>
          {walkPlan.map((w, i) => (
            <div key={i} className="card walk-card" style={{ padding: "13px 17px", display: "grid", gridTemplateColumns: "52px 90px 1fr 110px 90px", gap: "10px", alignItems: "center", borderLeft: `4px solid ${phaseColor[w.phase]}` }}>
              <div style={{ fontWeight: 900, color: phaseColor[w.phase], textAlign: "center", fontSize: "0.92rem" }}>{w.week}</div>
              <div style={{ background: phaseColor[w.phase] + "30", borderRadius: "8px", padding: "4px 8px", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: phaseColor[w.phase] }}>{w.type}</div>
              </div>
              <div className="walk-duration">
                <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#334155" }}>{w.duration}</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>{w.note}</div>
              </div>
              <div className="walk-intensity" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700 }}>Intensité</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#475569" }}>{w.intensity}</div>
              </div>
              <div className="walk-hr" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700 }}>Fréq. cardiaque</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: phaseColor[w.phase] }}>{w.hr}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "18px 22px", marginTop: "18px" }}>
          <div style={{ fontWeight: 900, marginBottom: "12px" }}>🚦 Règle des 3 feux</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[["🟢","Feu vert","#22c55e","#f0fdf4","#86efac","Aucune douleur → Continuez et progressez la semaine suivante"],["🟡","Feu orange","#f59e0b","#fffbeb","#fde68a","Légère gêne disparaissant en 1h → Maintenez, ne progressez pas"],["🔴","Feu rouge","#ef4444","#fef2f2","#fca5a5","Douleur jambe / fourmillements / douleur > 2h → Arrêt, consultez"]].map(([icon, title, color, bg, border, desc], i) => (
              <div key={i} style={{ background: bg, border: `2px solid ${border}`, borderRadius: "12px", padding: "14px 12px" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{icon}</div>
                <div style={{ fontWeight: 900, fontSize: "0.85rem", color, marginBottom: "5px" }}>{title}</div>
                <div style={{ fontSize: "0.76rem", color: "#475569", lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
        )}

      </div>
    )}

    {/* ════════════════ NUTRITION ════════════════ */}
    {tab === "nutrition" && (
      <div className="fade">
        <div className="card" style={{ padding: "16px 20px", marginBottom: "18px", background: "#f0fdf4", borderLeft: "4px solid #10b981" }}>
          <div style={{ fontWeight: 800, color: "#059669", fontSize: "0.88rem" }}>🥗 Objectif : alimentation anti-inflammatoire, pro-collagène et hydratante. Vos disques sont composés à 80% d'eau et de collagène — ce que vous mangez impacte directement leur récupération.</div>
        </div>

        {/* Meal plan */}
        <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
          {nutritionData.map((meal, i) => (
            <div key={i} className="card meal-card" style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "70px 100px 1fr", gap: "14px", alignItems: "center", borderLeft: `4px solid ${meal.color}` }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem" }}>{meal.icon}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: meal.color }}>{meal.time}</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: "0.85rem", color: "#1e293b" }}>{meal.meal}</div>
              <div className="meal-items" style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {meal.items.map((item, j) => (
                  <span key={j} style={{ background: meal.color + "30", color: meal.color, borderRadius: "50px", padding: "3px 11px", fontSize: "0.76rem", fontWeight: 700 }}>✓ {item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Good vs bad */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="card" style={{ padding: "18px 20px", borderTop: "4px solid #10b981" }}>
            <div style={{ fontWeight: 900, color: "#059669", marginBottom: "12px", fontSize: "0.95rem" }}>✅ Aliments anti-inflammatoires</div>
            {antiInflamFoods.map((item, i) => (
              <div key={i} style={{ fontSize: "0.83rem", padding: "6px 0", borderBottom: i < antiInflamFoods.length - 1 ? "1px solid #f0fdf4" : "none", color: "#334155" }}>{item}</div>
            ))}
          </div>
          <div className="card" style={{ padding: "18px 20px", borderTop: "4px solid #ef4444" }}>
            <div style={{ fontWeight: 900, color: "#dc2626", marginBottom: "12px", fontSize: "0.95rem" }}>❌ À réduire fortement</div>
            {proInflamFoods.map((item, i) => (
              <div key={i} style={{ fontSize: "0.83rem", padding: "6px 0", borderBottom: i < proInflamFoods.length - 1 ? "1px solid #fef2f2" : "none", color: "#334155" }}>{item}</div>
            ))}
          </div>
        </div>

        {/* Key nutrients */}
        <div className="card" style={{ padding: "18px 22px", marginTop: "16px" }}>
          <div style={{ fontWeight: 900, fontSize: "0.95rem", marginBottom: "14px" }}>🔑 Nutriments clés pour vos disques</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              { icon: "🐟", name: "Collagène", role: "Structure du disque", source: "Bouillon d'os, gélatine, poissons" },
              { icon: "🍊", name: "Vitamine C", role: "Synthèse du collagène", source: "Kiwi, orange, poivron rouge" },
              { icon: "🫐", name: "Oméga-3", role: "Anti-inflammatoire", source: "Saumon, sardines, noix" },
              { icon: "🌿", name: "Magnésium", role: "Détente musculaire", source: "Amandes, épinards, cacao" },
              { icon: "💧", name: "Eau", role: "Hydratation du noyau discal", source: "2,3L/jour minimum" },
              { icon: "☀️", name: "Vitamine D", role: "Santé osseuse & vertébrale", source: "Soleil, poissons gras, œufs" },
            ].map((n, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: "12px", padding: "12px 14px" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "5px" }}>{n.icon}</div>
                <div style={{ fontWeight: 900, fontSize: "0.85rem", marginBottom: "3px" }}>{n.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, marginBottom: "3px" }}>{n.role}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{n.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ════════════════ COMPLÉMENTS ════════════════ */}
    {tab === "supplements" && (
      <div className="fade">
        <div className="card" style={{ padding: "16px 20px", marginBottom: "18px", background: "#fffbeb", borderLeft: "4px solid #f59e0b" }}>
          <div style={{ fontWeight: 800, color: "#92400e", fontSize: "0.87rem" }}>💊 Consultez votre médecin avant de commencer tout complément. Ce programme est basé sur les données disponibles concernant la santé discale et le cartilage.</div>
        </div>

        {/* Priority legend */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "18px", flexWrap: "wrap" }}>
          {[["#ef4444","Priorité 1","Fondamentaux — commencez par là"],["#f59e0b","Priorité 2","Renforcez après 3–4 semaines"],["#10b981","Priorité 3","Optimisation sur le long terme"]].map(([color, label, desc], i) => (
            <div key={i} style={{ background: "white", border: `2px solid ${color}`, borderRadius: "10px", padding: "8px 14px", display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: color, flexShrink: 0 }}/>
              <div>
                <div style={{ fontWeight: 900, fontSize: "0.78rem", color }}>{label}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {supplementsData.map((s, i) => {
            const pColor = s.priority === 1 ? "#ef4444" : s.priority === 2 ? "#f59e0b" : "#10b981";
            const pBg = s.priority === 1 ? "#fef2f2" : s.priority === 2 ? "#fffbeb" : "#f0fdf4";
            return (
              <div key={i} className="card" style={{ padding: "18px 20px", borderTop: `4px solid ${pColor}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{ fontSize: "2rem" }}>{s.icon}</div>
                  <span style={{ background: pBg, color: pColor, borderRadius: "50px", padding: "3px 11px", fontSize: "0.7rem", fontWeight: 900 }}>Priorité {s.priority}</span>
                </div>
                <div style={{ fontWeight: 900, fontSize: "1rem", marginBottom: "5px" }}>{s.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "12px", lineHeight: 1.5 }}>{s.why}</div>
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  <span style={{ background: "#f1f5f9", borderRadius: "50px", padding: "4px 12px", fontSize: "0.78rem", fontWeight: 800, color: "#475569" }}>💊 {s.dose}</span>
                  <span style={{ background: "#f1f5f9", borderRadius: "50px", padding: "4px 12px", fontSize: "0.78rem", fontWeight: 700, color: "#64748b" }}>⏰ {s.timing}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack synergy */}
        <div className="card" style={{ padding: "20px 22px", marginTop: "20px", background: "#f0fdf4", border: "2px solid #a7f3d0" }}>
          <div style={{ fontWeight: 900, fontSize: "0.98rem", color: "#059669", marginBottom: "14px" }}>💡 Stack quotidien optimal — comment les regrouper</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
              { time: "🌅 Matin à jeun", color: "#f59e0b", items: ["Collagène marin 10g", "Vitamine C 500mg", "Vitamine D3 2000 UI + K2"] },
              { time: "🍽️ Avec les repas", color: "#10b981", items: ["Oméga-3 2–3g", "Curcuma + Pipérine 500mg", "Glucosamine 1500mg"] },
              { time: "🌙 Soir au coucher", color: "#10b981", items: ["Magnésium bisglycinate 300–400mg", "Tisane camomille"] },
            ].map((stack, i) => (
              <div key={i} style={{ background: "white", borderRadius: "12px", padding: "14px 16px", border: `1.5px solid ${stack.color}30` }}>
                <div style={{ fontWeight: 900, fontSize: "0.83rem", color: stack.color, marginBottom: "10px" }}>{stack.time}</div>
                {stack.items.map((item, j) => (
                  <div key={j} style={{ fontSize: "0.79rem", color: "#334155", padding: "3px 0", borderBottom: j < stack.items.length - 1 ? "1px solid #f1f5f9" : "none" }}>✓ {item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ════════════════ HYDRATATION ════════════════ */}
    {tab === "hydration" && (
      <div className="fade">
        <div className="card" style={{ padding: "16px 20px", marginBottom: "18px", background: "#eff6ff", borderLeft: "4px solid #3b82f6" }}>
          <div style={{ fontWeight: 800, color: "#1d4ed8", fontSize: "0.88rem" }}>💧 Objectif : 2,3 litres par jour minimum. Le noyau de vos disques intervertébraux est composé à 80% d'eau. La déshydratation accélère directement la dégénérescence discale.</div>
        </div>

        {/* Visual daily schedule */}
        <div className="card" style={{ padding: "22px 24px", marginBottom: "18px" }}>
          <div style={{ fontWeight: 900, fontSize: "0.98rem", marginBottom: "18px", textAlign: "center" }}>💧 Répartition sur la journée — 2 300 ml</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
            {hydrationSchedule.map((h, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "4px" }}>{h.icon}</div>
                <div style={{ fontWeight: 900, fontSize: "0.92rem", color: "#3b82f6" }}>{h.amount} ml</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#94a3b8", marginBottom: "2px" }}>{h.time}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.3 }}>{h.note}</div>
                <div style={{ height: "6px", background: "#dbeafe", borderRadius: "3px", marginTop: "6px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min((h.amount / 300) * 100, 100)}%`, background: "#3b82f6", borderRadius: "3px" }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontWeight: 900, fontSize: "0.95rem", color: "#3b82f6", background: "#eff6ff", borderRadius: "10px", padding: "10px" }}>
            Total journalier : 2 300 ml 💧
          </div>
        </div>

        {/* Tips */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "13px", marginBottom: "18px" }}>
          {[
            { icon: "🌅", title: "Le matin en premier", tip: "300ml avant le café. C'est le moment où le corps est le plus déshydraté. Vos disques se réhydratent la nuit — aidez le processus.", color: "#f59e0b" },
            { icon: "🍋", title: "Eau citronnée", tip: "Citron dans l'eau du matin. La vitamine C stimule directement la synthèse de collagène discal.", color: "#10b981" },
            { icon: "☕", title: "Café & thé", tip: "Max 2 cafés/jour. Diurétiques — compensez avec 200ml d'eau supplémentaire après chaque café.", color: "#3b82f6" },
            { icon: "🥤", title: "Sodas & alcool", tip: "À éviter. Pro-inflammatoires ET déshydratants — doublement nuisibles pour vos disques.", color: "#ef4444" },
            { icon: "🫙", title: "Bouteille au bureau", tip: "Posez 1L d'eau sur votre bureau. Objectif simple : la finir avant 17h.", color: "#06b6d4" },
            { icon: "💦", title: "Jours d'effort", tip: "Ajoutez 300–500ml les jours de marche ou d'exercice. La sudation déshydrate les disques.", color: "#3b82f6" },
          ].map((t, i) => (
            <div key={i} className="card" style={{ padding: "16px 18px", borderTop: `3px solid ${t.color}` }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "5px" }}>{t.icon}</div>
              <div style={{ fontWeight: 900, fontSize: "0.87rem", marginBottom: "5px" }}>{t.title}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.45 }}>{t.tip}</div>
            </div>
          ))}
        </div>

        {/* Urine color chart */}
        <div className="card" style={{ padding: "18px 22px" }}>
          <div style={{ fontWeight: 900, fontSize: "0.95rem", marginBottom: "14px" }}>🔍 Indicateur d'hydratation — couleur des urines</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { color: "#fefce8", label: "Presque incolore", status: "✅ Parfait", textColor: "#ca8a04" },
              { color: "#fef9c3", label: "Jaune très pâle", status: "✅ Très bien", textColor: "#a16207" },
              { color: "#fef08a", label: "Jaune pâle", status: "✅ Bon", textColor: "#854d0e" },
              { color: "#fde047", label: "Jaune moyen", status: "⚠️ Buvez plus", textColor: "#713f12" },
              { color: "#ca8a04", label: "Jaune foncé", status: "❌ Déshydraté", textColor: "#7c2d12" },
              { color: "#92400e", label: "Brun / orangé", status: "🚨 Urgence", textColor: "#dc2626" },
            ].map((u, i) => (
              <div key={i} style={{ textAlign: "center", flex: "1", minWidth: "80px" }}>
                <div style={{ height: "30px", background: u.color, borderRadius: "8px", border: "1.5px solid #e2e8f0", marginBottom: "5px" }}/>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "3px" }}>{u.label}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: u.textColor }}>{u.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

  </div>

  <div style={{ textAlign: "center", padding: "20px", background: "#e2e8f0", color: "#94a3b8", fontSize: "0.76rem", borderTop: "2px solid #cbd5e1" }}>
    Plan personnalisé basé sur votre IRM (Dr Baur) — Discopathie L4-L5 / L5-S1, protrusion paramédiane droite. Consultez votre kinésithérapeute et médecin pour le suivi.
  </div>

  {/* BOTTOM NAV */}
  <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "2px solid #e2e8f0", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "6px 0 8px", zIndex: 100 }}>
    {tabs.map(t => {
      const emoji = t.label.split(" ")[0];
      const name = t.label.split(" ").slice(1).join(" ").split("&")[0].trim();
      const active = tab === t.id;
      return (
        <button key={t.id} onClick={() => setTab(t.id)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "6px 10px", flex: 1 }}>
          <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{emoji}</span>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, color: active ? "#3b82f6" : "#94a3b8", whiteSpace: "nowrap" }}>{name}</span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: active ? "#3b82f6" : "transparent", marginTop: "1px" }}></span>
        </button>
      );
    })}
  </div>
</div>

);
}
