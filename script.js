// ==============================
// 初期設定
// ==============================

// BGMの要素とボタンの要素を取得
const bgm = document.getElementById("bgm");
const toggleBtn = document.getElementById("toggle-music"); // ボタンのIDを修正
const startScreen = document.getElementById("start-screen"); // start-screenを取得

// ページがロードされたら初期化する
window.addEventListener("DOMContentLoaded", () => {
    setupBGM();           // BGMの初期設定
    setupFirstClick();     // 最初のクリックで音楽再生
    setupToggleButton();   // 音楽ON/OFFボタンの設定
});

// ==============================
// BGMを準備する関数
// ==============================
function setupBGM() {
    bgm.volume = 1.0;    // 音量を設定 (0〜1の範囲)
    bgm.pause();         // 初期状態で音楽を停止
    toggleBtn.style.display = "block"; // ボタンを表示
    toggleBtn.textContent = "♪ BGM OFF";  // ボタンの初期テキストを「♪ OFF」に設定
}

// ==============================
// 最初のクリックでBGM再生する関数
// ==============================
function setupFirstClick() {
    // 最初のクリックで音楽を再生する
    document.body.addEventListener("click", () => {
        bgm.play();  // 音楽を再生
        toggleBtn.textContent = "♪ BGM OFF";  // ボタンテキストを「♪ OFF」に変更
    }, { once: true }); // 1回だけ反応する
}

// ==============================
// 音楽ON/OFFボタンを設定する関数
// ==============================
function setupToggleButton() {
    if (!toggleBtn) return; // ボタンがなかったら何もしない

    toggleBtn.addEventListener("click", () => {
        if (bgm.paused) {
            bgm.play(); // 音楽を再生
            toggleBtn.textContent = "♪ BGM OFF"; // ボタンのテキストを「♪ OFF」に変更
        } else {
            bgm.pause(); // 音楽を停止
            toggleBtn.textContent = "♪ BGM ON";  // ボタンのテキストを「♪ ON」に変更
        }
    });
}

let selectedCharacter = null;

const items = {
    R: {
        body: [
/*            { name: "ボディ-MW", src: "images/Rbody_mw.webp" }, *//*デフォルトなので選択肢から除外*/
            { name: "ボディ-SW", src: "images/Rbody_sw.webp" },
            { name: "ボディ-G", src: "images/Rbody_g.webp" },
            { name: "ボディ-B", src: "images/Rbody_b.webp" },
            { name: "ボディ-CY", src: "images/Rbody_cy.webp" },
            { name: "ボディ-LBR", src: "images/Rbody_lbr.webp" },
            { name: "ボディ-N", src: "images/Rbody_n.webp" },
            { name: "ボディ-P", src: "images/Rbody_p.webp" },
            { name: "ボディ-PUR", src: "images/Rbody_pur.webp" },
            { name: "ボディ-WI", src: "images/Rbody_wi.webp" }
        ],
        eyes: [
            { name: "eyes_b", src: "images/eyes_b.webp", icon: "images/icons/eyes_b_icon.webp" },
            { name: "eyes_dbl", src: "images/eyes_dbl.webp", icon: "images/icons/eyes_dbl_icon.webp" },
            { name: "eyes_ibl", src: "images/eyes_ibl.webp", icon: "images/icons/eyes_ibl_icon.webp" },
            { name: "eyes_lbl", src: "images/eyes_lbl.webp", icon: "images/icons/eyes_lbl_icon.webp" },
            { name: "eyes_p", src: "images/eyes_p.webp", icon: "images/icons/eyes_p_icon.webp" },
            { name: "eyes_pur", src: "images/eyes_pur.webp", icon: "images/icons/eyes_pur_icon.webp" },
            { name: "eyes_y", src: "images/eyes_y.webp", icon: "images/icons/eyes_y_icon.webp" },
            { name: "eyes_ygr", src: "images/eyes_ygr.webp", icon: "images/icons/eyes_ygr_icon.webp" },
            { name: "eyes_y_dbl", src: "images/eyes_y_dbl.webp", icon: "images/icons/eyes_y_dbl_icon.webp" },
            { name: "eyes_y_lbl", src: "images/eyes_y_lbl.webp", icon: "images/icons/eyes_y_lbl_icon.webp" },
            { name: "eyes_y_p", src: "images/eyes_y_p.webp", icon: "images/icons/eyes_y_p_icon.webp" },
            { name: "eyes_y_ygr", src: "images/eyes_y_ygr.webp", icon: "images/icons/eyes_y_ygr_icon.webp" },
            { name: "eyes_y_b", src: "images/eyes_y_b.webp", icon: "images/icons/eyes_y_b_icon.webp" },
            { name: "eyes_y_pur", src: "images/eyes_y_pur.webp", icon: "images/icons/eyes_y_pur_icon.webp" },
            { name: "eyes_b_X", src: "images/eyes_b_X.webp", icon: "images/icons/eyes_b_X_icon.webp" }
        ],
        clothes: [
            { name: "cos_ribbon_b", src: "images/cos_ribbon_b.webp", icon: "images/icons/cos_ribbon_b_icon.webp" },
            { name: "cos_ribbon_bl", src: "images/cos_ribbon_bl.webp", icon: "images/icons/cos_ribbon_bl_icon.webp" },
            { name: "cos_ribbon_pur", src: "images/cos_ribbon_pur.webp", icon: "images/icons/cos_ribbon_pur_icon.webp" },
            { name: "cos_ribbon_w", src: "images/cos_ribbon_w.webp", icon: "images/icons/cos_ribbon_w_icon.webp" },
            { name: "cos_heart", src: "images/cos_heart.webp", icon: "images/icons/cos_heart_icon.webp" },
            { name: "cos_cothic_b", src: "images/cos_cothic_b.webp", icon: "images/icons/cos_cothic_b_icon.webp" },
            { name: "cos_cothic_w", src: "images/cos_cothic_w.webp", icon: "images/icons/cos_cothic_w_icon.webp" },

        ],
        hair: [
            { name: "Rheart", src: "images/Rheart.webp", icon: "images/icons/heart_icon.webp" },
            { name: "Rleft_rings", src: "images/Rleft_rings.webp", icon: "images/icons/left_rings_icon.webp" },
            { name: "Rusaribbon_abl", src: "images/Rusaribbon_abl.webp", icon: "images/icons/Rusaribbon_abl_icon.webp" },
            { name: "Rusaribbon_b", src: "images/Rusaribbon_b.webp", icon: "images/icons/Rusaribbon_b_icon.webp" },
            { name: "Rusaribbon_br", src: "images/Rusaribbon_br.webp", icon: "images/icons/Rusaribbon_br_icon.webp" },
            { name: "Rusaribbon_ibl", src: "images/Rusaribbon_ibl.webp", icon: "images/icons/Rusaribbon_ibl_icon.webp" },
            { name: "Rusaribbon_lpur", src: "images/Rusaribbon_lpur.webp", icon: "images/icons/Rusaribbon_lpur_icon.webp" },
            { name: "Rusaribbon_mbr", src: "images/Rusaribbon_mbr.webp", icon: "images/icons/Rusaribbon_mbr_icon.webp" },
            { name: "Rusaribbon_mw", src: "images/Rusaribbon_mw.webp", icon: "images/icons/Rusaribbon_mw_icon.webp" },
            { name: "Rusaribbon_n", src: "images/Rusaribbon_n.webp", icon: "images/icons/Rusaribbon_n_icon.webp" },
            { name: "Rusaribbon_rp", src: "images/Rusaribbon_rp.webp", icon: "images/icons/Rusaribbon_rp_icon.webp" },
            { name: "Rusaribbon_rr", src: "images/Rusaribbon_rr.webp", icon: "images/icons/Rusaribbon_rr_icon.webp" },
            { name: "Rusaribbon_sw", src: "images/Rusaribbon_sw.webp", icon: "images/icons/Rusaribbon_sw_icon.webp" },

        ],


        ac2: [
            { name: "Rmofu", src: "images/Rmofu.webp", icon: "images/icons/mofu_icon.webp" },
            { name: "Rflowre_b_y", src: "images/Rflowre_b_y.webp", icon: "images/icons/Rflowre_b_y_icon.webp" },
            { name: "Rflowre_r_p", src: "images/Rflowre_r_p.webp", icon: "images/icons/Rflowre_r_p_icon.webp" },
            { name: "Rflowre_y_r", src: "images/Rflowre_y_r.webp", icon: "images/icons/Rflowre_y_r_icon.webp" },
            
        ],

        ac3: [
            { name: "big_center_b", src: "images/big_center_b.webp", icon: "images/icons/big_center_b_icon.webp" },
            { name: "big_center_r", src: "images/big_center_r.webp", icon: "images/icons/big_center_r_icon.webp" },
            { name: "big_center_w", src: "images/big_center_w.webp", icon: "images/icons/big_center_w_icon.webp" },
            { name: "Rbig_side_w", src: "images/Rbig_side_w.webp", icon: "images/icons/big_side_w_icon.webp" },
            { name: "Rbig_side_r", src: "images/Rbig_side_r.webp", icon: "images/icons/big_side_r_icon.webp" },
            { name: "Rbig_side_b", src: "images/Rbig_side_b.webp", icon: "images/icons/big_side_b_icon.webp" },
            { name: "Rsmall_side_abl", src: "images/Rsmall_side_abl.webp", icon: "images/icons/small_side_abl_icon.webp" },
            { name: "Rsmall_side_b", src: "images/Rsmall_side_b.webp", icon: "images/icons/small_side_b_icon.webp" },
            { name: "Rsmall_side_br", src: "images/Rsmall_side_br.webp", icon: "images/icons/small_side_br_icon.webp" },
            { name: "Rsmall_side_ibl", src: "images/Rsmall_side_ibl.webp", icon: "images/icons/small_side_ibl_icon.webp" },
            { name: "Rsmall_side_lpur", src: "images/Rsmall_side_lpur.webp", icon: "images/icons/small_side_lpur_icon.webp" },
            { name: "Rsmall_side_mbr", src: "images/Rsmall_side_mbr.webp", icon: "images/icons/small_side_mbr_icon.webp" },
            { name: "Rsmall_side_mw", src: "images/Rsmall_side_mw.webp", icon: "images/icons/small_side_mw_icon.webp" },
            { name: "Rsmall_side_n", src: "images/Rsmall_side_n.webp", icon: "images/icons/small_side_n_icon.webp" },
            { name: "Rsmall_side_rp", src: "images/Rsmall_side_rp.webp", icon: "images/icons/small_side_rp_icon.webp" },
            { name: "Rsmall_side_rr", src: "images/Rsmall_side_rr.webp", icon: "images/icons/small_side_rr_icon.webp" },
            { name: "Rsmall_side_sw", src: "images/Rsmall_side_sw.webp", icon: "images/icons/small_side_sw_icon.webp" },
            { name: "small_center_abl", src: "images/small_center_abl.webp", icon: "images/icons/small_center_abl_icon.webp" },
            { name: "small_center_b", src: "images/small_center_b.webp", icon: "images/icons/small_center_b_icon.webp" },
            { name: "small_center_br", src: "images/small_center_br.webp", icon: "images/icons/small_center_br_icon.webp" },
            { name: "small_center_ibl", src: "images/small_center_ibl.webp", icon: "images/icons/small_center_ibl_icon.webp" },
            { name: "small_center_lpur", src: "images/small_center_lpur.webp", icon: "images/icons/small_center_lpur_icon.webp" },
            { name: "small_center_mbr", src: "images/small_center_mbr.webp", icon: "images/icons/small_center_mbr_icon.webp" },
            { name: "small_center_mw", src: "images/small_center_mw.webp", icon: "images/icons/small_center_mw_icon.webp" },
            { name: "small_center_n", src: "images/small_center_n.webp", icon: "images/icons/small_center_n_icon.webp" },
            { name: "small_center_rp", src: "images/small_center_rp.webp", icon: "images/icons/small_center_rp_icon.webp" },
            { name: "small_center_rr", src: "images/small_center_rr.webp", icon: "images/icons/small_center_rr_icon.webp" },
            { name: "small_center_sw", src: "images/small_center_sw.webp", icon: "images/icons/small_center_sw_icon.webp" },
        ]

    },

    C: {
        body: [
            { name: "ボディ-SW", src: "images/Cbody_sw.webp" },
            { name: "ボディ-G", src: "images/Cbody_g.webp" },
            { name: "ボディ-B", src: "images/Cbody_b.webp" },
            { name: "ボディ-CY", src: "images/Cbody_cy.webp" },
            { name: "ボディ-LBR", src: "images/Cbody_lbr.webp" },
            { name: "ボディ-N", src: "images/Cbody_n.webp" },
            { name: "ボディ-P", src: "images/Cbody_p.webp" },
            { name: "ボディ-PUR", src: "images/Cbody_pur.webp" },
            { name: "ボディ-WI", src: "images/Cbody_wi.webp" }
        ],
        eyes: [
            { name: "eyes_b", src: "images/eyes_b.webp", icon: "images/icons/eyes_b_icon.webp" },
            { name: "eyes_dbl", src: "images/eyes_dbl.webp", icon: "images/icons/eyes_dbl_icon.webp" },
            { name: "eyes_ibl", src: "images/eyes_ibl.webp", icon: "images/icons/eyes_ibl_icon.webp" },
            { name: "eyes_lbl", src: "images/eyes_lbl.webp", icon: "images/icons/eyes_lbl_icon.webp" },
            { name: "eyes_p", src: "images/eyes_p.webp", icon: "images/icons/eyes_p_icon.webp" },
            { name: "eyes_pur", src: "images/eyes_pur.webp", icon: "images/icons/eyes_pur_icon.webp" },
            { name: "eyes_y", src: "images/eyes_y.webp", icon: "images/icons/eyes_y_icon.webp" },
            { name: "eyes_ygr", src: "images/eyes_ygr.webp", icon: "images/icons/eyes_ygr_icon.webp" },
            { name: "eyes_y_dbl", src: "images/eyes_y_dbl.webp", icon: "images/icons/eyes_y_dbl_icon.webp" },
            { name: "eyes_y_lbl", src: "images/eyes_y_lbl.webp", icon: "images/icons/eyes_y_lbl_icon.webp" },
            { name: "eyes_y_p", src: "images/eyes_y_p.webp", icon: "images/icons/eyes_y_p_icon.webp" },
            { name: "eyes_y_ygr", src: "images/eyes_y_ygr.webp", icon: "images/icons/eyes_y_ygr_icon.webp" },
            { name: "eyes_y_b", src: "images/eyes_y_b.webp", icon: "images/icons/eyes_y_b_icon.webp" },
            { name: "eyes_y_pur", src: "images/eyes_y_pur.webp", icon: "images/icons/eyes_y_pur_icon.webp" },
            { name: "eyes_b_X", src: "images/eyes_b_X.webp", icon: "images/icons/eyes_b_X_icon.webp" }
        ],
        clothes: [
            { name: "cos_ribbon_b", src: "images/cos_ribbon_b.webp", icon: "images/icons/cos_ribbon_b_icon.webp" },
            { name: "cos_ribbon_bl", src: "images/cos_ribbon_bl.webp", icon: "images/icons/cos_ribbon_bl_icon.webp" },
            { name: "cos_ribbon_pur", src: "images/cos_ribbon_pur.webp", icon: "images/icons/cos_ribbon_pur_icon.webp" },
            { name: "cos_ribbon_w", src: "images/cos_ribbon_w.webp", icon: "images/icons/cos_ribbon_w_icon.webp" },
            { name: "cos_heart", src: "images/cos_heart.webp", icon: "images/icons/cos_heart_icon.webp" },
            { name: "cos_cothic_b", src: "images/cos_cothic_b.webp", icon: "images/icons/cos_cothic_b_icon.webp" },
            { name: "cos_cothic_w", src: "images/cos_cothic_w.webp", icon: "images/icons/cos_cothic_w_icon.webp" },
        ],

        hair: [
            { name: "Cpearl", src: "images/Cpearl.webp", icon: "images/icons/Cpearl_icon.webp" },

            { name: "Cheart", src: "images/Cheart.webp", icon: "images/icons/heart_icon.webp" },
            { name: "Cleft_rings", src: "images/Cleft_rings.webp", icon: "images/icons/left_rings_icon.webp" },
            { name: "Cbijou_bl", src: "images/Cbijou_bl.webp", icon: "images/icons/Cbijou_bl_icon.webp" },
            { name: "Cbijou_gr", src: "images/Cbijou_gr.webp", icon: "images/icons/Cbijou_gr_icon.webp" },
            { name: "Cbijou_lbl", src: "images/Cbijou_lbl.webp", icon: "images/icons/Cbijou_lbl_icon.webp" },
            { name: "Cbijou_p", src: "images/Cbijou_p.webp", icon: "images/icons/Cbijou_p_icon.webp" },
            { name: "Cbijou_pur", src: "images/Cbijou_pur.webp", icon: "images/icons/Cbijou_pur_icon.webp" },
            { name: "Cbijou_r", src: "images/Cbijou_r.webp", icon: "images/icons/Cbijou_r_icon.webp" },
            { name: "Cbijou_y", src: "images/Cbijou_y.webp", icon: "images/icons/Cbijou_y_icon.webp" },
            { name: "Cbijou_ygr", src: "images/Cbijou_ygr.webp", icon: "images/icons/Cbijou_ygr_icon.webp" },
        ],

        ac2: [
            { name: "Cmofu", src: "images/Cmofu.webp", icon: "images/icons/mofu_icon.webp" },
            { name: "Cstone_bl", src: "images/Cstone_bl.webp", icon: "images/icons/Cstone_bl_icon.webp" },
            { name: "Cstone_gr", src: "images/Cstone_gr.webp", icon: "images/icons/Cstone_gr_icon.webp" },
            { name: "Cstone_lbl", src: "images/Cstone_lbl.webp", icon: "images/icons/Cstone_lbl_icon.webp" },
            { name: "Cstone_p", src: "images/Cstone_p.webp", icon: "images/icons/Cstone_p_icon.webp" },
            { name: "Cstone_pur", src: "images/Cstone_pur.webp", icon: "images/icons/Cstone_pur_icon.webp" },
            { name: "Cstone_r", src: "images/Cstone_r.webp", icon: "images/icons/Cstone_r_icon.webp" },
            { name: "Cstone_y", src: "images/Cstone_y.webp", icon: "images/icons/Cstone_y_icon.webp" },
            { name: "Cstone_ygr", src: "images/Cstone_ygr.webp", icon: "images/icons/Cstone_ygr_icon.webp" },
        ],


        ac3: [
            { name: "Cbig_side_w", src: "images/Cbig_side_w.webp", icon: "images/icons/big_side_w_icon.webp" },
            { name: "Cbig_side_r", src: "images/Cbig_side_r.webp", icon: "images/icons/big_side_r_icon.webp" },
            { name: "Cbig_side_b", src: "images/Cbig_side_b.webp", icon: "images/icons/big_side_b_icon.webp" },

            { name: "big_center_w", src: "images/big_center_w.webp", icon: "images/icons/big_center_w_icon.webp" },
            { name: "big_center_r", src: "images/big_center_r.webp", icon: "images/icons/big_center_r_icon.webp" },
            { name: "big_center_b", src: "images/big_center_b.webp", icon: "images/icons/big_center_b_icon.webp" },

            { name: "small_center_abl", src: "images/small_center_abl.webp", icon: "images/icons/small_center_abl_icon.webp" },
            { name: "small_center_b", src: "images/small_center_b.webp", icon: "images/icons/small_center_b_icon.webp" },
            { name: "small_center_br", src: "images/small_center_br.webp", icon: "images/icons/small_center_br_icon.webp" },
            { name: "small_center_ibl", src: "images/small_center_ibl.webp", icon: "images/icons/small_center_ibl_icon.webp" },
            { name: "small_center_lpur", src: "images/small_center_lpur.webp", icon: "images/icons/small_center_lpur_icon.webp" },
            { name: "small_center_mbr", src: "images/small_center_mbr.webp", icon: "images/icons/small_center_mbr_icon.webp" },
            { name: "small_center_mw", src: "images/small_center_mw.webp", icon: "images/icons/small_center_mw_icon.webp" },
            { name: "small_center_n", src: "images/small_center_n.webp", icon: "images/icons/small_center_n_icon.webp" },
            { name: "small_center_rp", src: "images/small_center_rp.webp", icon: "images/icons/small_center_rp_icon.webp" },
            { name: "small_center_rr", src: "images/small_center_rr.webp", icon: "images/icons/small_center_rr_icon.webp" },
            { name: "small_center_sw", src: "images/small_center_sw.webp", icon: "images/icons/small_center_sw_icon.webp" },

            { name: "Csmall_side_abl", src: "images/Csmall_side_abl.webp", icon: "images/icons/small_side_abl_icon.webp" },
            { name: "Csmall_side_b", src: "images/Csmall_side_b.webp", icon: "images/icons/small_side_b_icon.webp" },
            { name: "Csmall_side_br", src: "images/Csmall_side_br.webp", icon: "images/icons/small_side_br_icon.webp" },
            { name: "Csmall_side_ibl", src: "images/Csmall_side_ibl.webp", icon: "images/icons/small_side_ibl_icon.webp" },
            { name: "Csmall_side_lpur", src: "images/Csmall_side_lpur.webp", icon: "images/icons/small_side_lpur_icon.webp" },
            { name: "Csmall_side_mbr", src: "images/Csmall_side_mbr.webp", icon: "images/icons/small_side_mbr_icon.webp" },
            { name: "Csmall_side_mw", src: "images/Csmall_side_mw.webp", icon: "images/icons/small_side_mw_icon.webp" },
            { name: "Csmall_side_n", src: "images/Csmall_side_n.webp", icon: "images/icons/small_side_n_icon.webp" },
            { name: "Csmall_side_rp", src: "images/Csmall_side_rp.webp", icon: "images/icons/small_side_rp_icon.webp" },
            { name: "Csmall_side_rr", src: "images/Csmall_side_rr.webp", icon: "images/icons/small_side_rr_icon.webp" },
            { name: "Csmall_side_sw", src: "images/Csmall_side_sw.webp", icon: "images/icons/small_side_sw_icon.webp" },
        ]
    }
};

let selectedItems = { body: null, eyes: null, clothes: null, hair: null, ac2: null, ac3:null };
let currentCategory = "eyes";

// ボタンを取得
const buttons = document.querySelectorAll('button');

// ===== スタートボタンの処理 =====
function goToCharacterSelect() {

    // トップ画面（start-screen）を非表示にして、（select-screen）を表示
    // スクリーン切り替え
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("select-screen").style.display = "block";

}

// ===== キャラ選択時の処理 =====
function selectCharacter(characterId) {
    selectedCharacter = characterId;

    console.log("選ばれたキャラ", characterId);

    document.getElementById("select-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    const charaArea = document.getElementById("character-area");
    charaArea.innerHTML = ""; // 既存の画像をクリア

    const baseParts = ["base", "body", "eyes", "clothes", "hair", "ac2", "ac3"]; /*キャラパーツ一覧*/
    selectedItems = {}; /*選択中のパーツを管理する箱*/

    baseParts.forEach(part => {
        const img = document.createElement("img"); /*パーツの一覧を1個ずつimg画像を作る*/
        img.id = `character-${part}`; /*画像にIDをつけて、後で操作しやすく、例えばcharacter-eyesとか*/
        img.style.display = part === "base" ? "block" : "none"; /*最初は体だけ表示、他は隠す*/

        if (part === "base") {
            img.src = `images/${characterId}body_mw.webp`;
        } else {
            img.src = "";
        }

        charaArea.appendChild(img);
        selectedItems[part] = null;
    });

    showItems("body");
}
function showItems(category) {
    currentCategory = category;
    const list = document.getElementById("item-list");
    list.innerHTML = "";

    const categoryItems = items[selectedCharacter][category];

    categoryItems.forEach((item, index) => {
        const img = document.createElement("img");
        // ↓ ここで特定カテゴリだけアイコン画像を変更
        if (category === "eyes" || category === "hair" || category === "ac2" || category === "ac3") {
            // 例：item.icon にアイコン画像のパスを指定しておけばそちらを表示
            img.src = item.icon || item.src; // iconがあればそれを、なければ通常の画像
        } else {
            img.src = item.src;
        }

        img.alt = item.name;
        img.style.cursor = "pointer";

        const isSelected = selectedItems[category] === index;

        if (category === "eyes") {
            // 丸くするためのスタイル
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.borderRadius = "50%";
            img.style.objectFit = "cover";
            img.style.border = isSelected ? "3px solid deeppink" : "1px solid #ccc";
        } else {
            // 通常スタイル
            img.style.width = "80px";
            img.style.border = isSelected ? "3px solid deeppink" : "1px solid #ccc";
        }

        img.onclick = () => {
            const partImg = document.getElementById(`character-${category}`);
            // すでに選択されていた場合：選択を解除
            if (isSelected) {
                selectedItems[category] = null;
                partImg.src = "";
                partImg.style.display = "none";
            } else {
                // 新しく選択された場合：画像を表示
                selectedItems[category] = index;
                partImg.src = item.src;
                partImg.style.display = "block";
            }

            // 👇ここが追加部分！ bodyが選ばれているかどうかで base を制御
            const baseImg = document.getElementById("character-base");
            if (category === "body") {
                if (selectedItems["body"] === null) {
                    baseImg.src = `images/${selectedCharacter}body_mw.webp`;
                    baseImg.style.display = "block";
                } else {
                    baseImg.style.display = "none";
                }
            }
            showItems(category);
        };

        list.appendChild(img);
    });

    const buttons = document.querySelectorAll(".category-button");
    buttons.forEach(btn => btn.classList.remove("active"));

    buttons.forEach(btn => {
        const label = btn.textContent;
        if (
            (category === "body" && label === "ボディ") ||
            (category === "eyes" && label === "アイ") ||
            (category === "clothes" && label === "コスチューム") ||
            (category === "hair" && label === "アクセサリー") ||
            (category === "ac2" && label === "アクセサリー2") ||
            (category === "ac3" && label === "アクセサリー3") 
        ) {
            btn.classList.add("active");
        }
    });
}

function goBack() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("select-screen").style.display = "block";
}

// リセットボタン：全パーツを外す
function resetItems() {
    for (let part of ["body", "eyes", "clothes", "hair", "ac2", "ac3"]) {
        selectedItems[part] = null;
        const partImg = document.getElementById(`character-${part}`);
        partImg.src = "";
        partImg.style.display = "none";
    }
    // ✅ base画像を再表示させる
    const baseImg = document.getElementById("character-base");
    baseImg.style.display = "block";
    baseImg.src = `images/${selectedCharacter}body_mw.webp`;

    showItems(currentCategory);
}

function openSaveLoad() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("save-load-screen").style.display = "block";
    renderSaveSlots();
}

function closeSaveLoad() {
    document.getElementById("save-load-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
}

// スロットを描画（保存画像も表示）
function renderSaveSlots() {
    const container = document.getElementById("slots-container");
    container.innerHTML = "";

    for (let i = 1; i <= 4; i++) {
        const key = `favorite_${selectedCharacter}_${i}`;
        const data = JSON.parse(localStorage.getItem(key));

        const slot = document.createElement("div");
        slot.className = "slot";

        // 保存された画像プレビュー
        if (data) {
            const preview = document.createElement("div");
            preview.style.position = "relative";
            preview.style.width = "120px";
            preview.style.height = "130px";
            preview.style.margin = "0 auto";

            const base = document.createElement("img");
            base.src = `images/${selectedCharacter}body_mw.webp`; // ← png → webp に変更
            base.style.position = "absolute";
            base.style.top = 0;
            base.style.left = 0;
            base.style.width = "100%";

            preview.appendChild(base);

            for (let part in data) {
                const index = data[part];
                if (index !== null) {
                    // 安全にアクセスするためにチェックを追加
                    const item = items[selectedCharacter]?.[part]?.[index];
                    if (item && item.src) {
                        const itemImg = document.createElement("img");
                        itemImg.src = item.src;
                        itemImg.style.position = "absolute";
                        itemImg.style.top = 0;
                        itemImg.style.left = 0;
                        itemImg.style.width = "100%";
                        preview.appendChild(itemImg);
                    } else {
                        console.warn("プレビュー用のアイテムが見つかりませんでした:", selectedCharacter, part, index);
                    }
                }
            }

            slot.appendChild(preview);
        } else {
            const noData = document.createElement("p");
            noData.textContent = "データなし";
            slot.appendChild(noData);
        }

        // 保存・読み込みボタン
        if (i !== 4) {
        const saveBtn = document.createElement("button");
        saveBtn.textContent = `保存 ${i} `;
        saveBtn.onclick = () => {
            localStorage.setItem(key, JSON.stringify(selectedItems));
            alert(`保存枠 ${i} に保存しました！`);
            renderSaveSlots();
        };
            slot.appendChild(saveBtn);
        }

        const loadBtn = document.createElement("button");
        loadBtn.textContent = `読み込み`;
        loadBtn.onclick = () => {
            const confirmed = confirm("今のコーディネートから変更してよろしいですか？");
            if (!confirmed) return;

            const data = JSON.parse(localStorage.getItem(key));
            if (data) {
                selectedItems = data;
                // 各パーツを順番に処理する
                for (let part in selectedItems) {
                    const index = selectedItems[part]; // 保存された選択肢（null か 数字）

                    const partImg = document.getElementById(`character-${part}`);
                    if (index !== null) {
                        const item = items[selectedCharacter][part][index];
                        partImg.src = item.src;
                        partImg.style.display = "block";
                    } else {
                        partImg.src = "";
                        partImg.style.display = "none";
                    }
                }

                // ✅ base表示を更新（←この位置！）
                const baseImg = document.getElementById("character-base");
                if (selectedItems["body"] === null) {
                    baseImg.src = `images/${selectedCharacter}body_mw.webp`;
                    baseImg.style.display = "block";
                } else {
                    baseImg.style.display = "none";
                }
                closeSaveLoad();
                showItems(currentCategory);
                alert(`保存枠 ${i} を読み込みました！`);
            } else {
                alert(`保存枠 ${i} にはデータがありません。`);
            }
        };
        slot.appendChild(loadBtn);

        container.appendChild(slot);
    }
}

// 完成ボタン取得
const compleButton = document.getElementById("comple-button");

// ===== 効果音の準備 、完成画面用=====
const compSound = document.getElementById("compSound");

compleButton.onclick = () => {

    // --- 画面遷移前にアニメーション対象をリセット ---
    const frame = document.getElementById('frameImage');
    const thankText = document.getElementById('thankText');
    const bagClose = document.getElementById('bagClose');
    const bagOpen = document.getElementById('bagOpen');


    // 対象要素を初期状態に戻す（hidden付与、アニメーション用クラス削除）
    [frame, thankText, bagClose, bagOpen].forEach(el => {
        el.classList.add('hidden');  // hiddenクラスを追加
        el.classList.remove('fadeIn', 'zoomIn_t', 'fadeIn1', 'zoomOut', 'zoomIn', 'fadeOut', 'fadeIn2'); // アニメーション系クラスだけ削除
    });

    // 1. キャラクターを自動保存（枠4）
    const autoSaveKey = `favorite_${selectedCharacter}_4`;
    localStorage.setItem(autoSaveKey, JSON.stringify(selectedItems));
    // 2. メッセージを表示
    alert("コーディネートを自動保存しました！");

    // 2. 画面切り替え（game-screen → comple-screen）
    document.getElementById("game-screen").style.display = "none";
    const compleScreen = document.getElementById("comple-screen");
    compleScreen.style.display = "block";


    // 実行タイミングを遅らせるための処理（効果音と表示）
    setTimeout(() => {
        // ✅ 効果音を再生
        const compSound = document.getElementById("compSound");
        if (compSound) {
            compSound.currentTime = 0;
            compSound.play().catch(err => {
                console.warn("音声再生エラー:", err);
            });
        }

        // ✅ キャラ表示を開始（効果音と同じタイミング）
        const container = document.getElementById("completion-container");
        container.innerHTML = ""; // 念のためここで空にするのが安全

        const characterContainer = document.createElement("div");
        characterContainer.className = "anime-object hidden";
        container.appendChild(characterContainer);

        const bodyImg = document.createElement("img");
        bodyImg.src = `images/${selectedCharacter}body_mw.webp`;
        characterContainer.appendChild(bodyImg);

        const parts = ["body", "eyes", "clothes", "hair", "ac2", "ac3"];
        parts.forEach(part => {
            const index = selectedItems[part];
            if (index !== null) {
                const partImg = document.createElement("img");
                partImg.src = items[selectedCharacter][part][index].src;
                characterContainer.appendChild(partImg);
            }

        });


    // ステップ0：frameを最初に表示
    frame.classList.remove('hidden');
    frame.classList.add('fadeIn');

    // ステップ0.5：Thank you表示（zoomIn）
    setTimeout(() => {
        thankText.classList.remove('hidden');
        thankText.classList.add('zoomIn_t');
    }, 1200);

    // ステップ1：bag_close 表示 → 消す
    setTimeout(() => {
        bagClose.classList.remove('hidden');
        bagClose.classList.add('fadeIn1');
    }, 2400);

    setTimeout(() => {
        bagClose.classList.remove('fadeIn');
        bagClose.classList.add('zoomOut');
    }, 4400);

    // ステップ2：bag_open 表示 → 消す
    setTimeout(() => {
        bagClose.classList.add('hidden');
        bagOpen.classList.remove('hidden');
        bagOpen.classList.add('zoomIn');
    }, 4700);

    setTimeout(() => {
        bagOpen.classList.remove('zoomIn');
        bagOpen.classList.add('fadeOut');
    }, 5800);

    // ステップ3：icon_body 表示（アニメF）
    setTimeout(() => {
        bagOpen.classList.add('hidden');
        characterContainer.classList.remove('hidden');
        characterContainer.classList.add('fadeIn2');
    }, 7600);

    // 6. 画面下部に「トップ画面に戻る」ボタン表示
    setTimeout(() => {
        const backBtn = document.createElement("button");
        backBtn.textContent = "トップ画面へ";
        backBtn.className = "back-to-top"; // ← ここでCSSのクラス名だけ指定
        backBtn.onclick = () => {
            compleScreen.style.display = "none";
            document.getElementById("start-screen").style.display = "block";
        };
        container.appendChild(backBtn);

    // 6. 画面下部に「ハニットHP」ボタン表示
    const linkBtn = document.createElement("button");
    linkBtn.textContent = "ハニットHPへ"; // ← ボタンに表示する文字
    linkBtn.className = "back-to-top";
    linkBtn.style.marginTop = "380px"; // 「トップへ戻る」より下に見せるため余白を変更
    linkBtn.onclick = () => {
        window.open("https://hanitto8210.storeinfo.jp/", "_blank"); // ← 任意リンク（新しいタブで開く）
    };
    container.appendChild(linkBtn);
    }, 8000);
    }, 50); // 0.05秒待ってから実行

};
