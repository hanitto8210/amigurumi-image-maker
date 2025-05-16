スマホで表示するゲームの音の重複や連打時の遅延を減らせたいので、
同じ音声ファイルを複数の <audio> 要素に分けて使う方法で、下記のコードを書き直していただきたいです。

【html】
<body>
    <audio id="bgm" src="loop_maou_bgm.mp3" loop></audio>

    <!-- スタート画面 -->
    <audio id="se-choice" src="choice.mp3" preload="auto"></audio>
    <audio id="se-click" src="click.mp3" preload="auto"></audio>

    <div id="start-screen">
        <img src="topimage.png" alt="タイトル画像" style="width: 100%; max-width: 400px; display: block; margin: 30px auto;">
        <div class="start-button">
            <button class="start-btn" onclick="goToCharacterSelect()"><span class="start-text">START</span></button>
        </div>

    </div>

    <!-- キャラ選択画面 -->
    <div id="select-screen" style="display: none;">

        <span class="celect-text">Character Celect</span>

        <div class="character-choice">
            <img src="images/Rbody_mw.webp" alt="R" onclick="selectCharacter('R')">
            <img src="images/Cbody_mw.webp" alt="C" onclick="selectCharacter('C')">
        </div>
    </div>

    <!-- 着せ替え画面 -->
    <div id="game-screen" style="display: none;">
        <button id="back-button" onclick="goBack()">← 戻る</button>
        <button id="comple-button" onclick="goToCompletion()">完成！</button>

        <div id="game-container">
            <div id="character-area">
            </div>

            <div id="category-buttons">
                <button class="category-button" onclick="showItems('body')">
                    <img src="category_body.png" alt="ボディ" class="icon-img">
                </button>
                <button class="category-button" onclick="showItems('eyes')">
                    <img src="category_eyes.png" alt="アイ" class="icon-img">
                </button>
                <button class="category-button" onclick="showItems('clothes')">
                    <img src="category_clothes.png" alt="コスチューム" class="icon-img">
                </button>
                <button class="category-button" onclick="showItems('hair')">
                    <img src="category_head.png" alt="アクセサリー" class="icon-img">
                </button>

                <button class="category-button" onclick="showItems('ac2')">
                    <img src="category_head2.png" alt="アクセサリー2" class="icon-img">
                </button>

                <button class="category-button" onclick="showItems('ac3')">
                    <img src="category_head3.png" alt="アクセサリー3" class="icon-img">

            </button>
</div>

            <div id="item-list"></div>
        </div>

        <div id="save-load-buttons">
            <button onclick="resetItems()">リセット</button>
            <button onclick="openSaveLoad()">保存・読み込み</button>
        </div>

    </div>

    <!-- 完成画面 -->
    <div id="comple-screen" style="display: none;">
        <div class="container_back" id="con_back">

            <!-- 背面に表示されるフレーム -->
            <div class="frame hidden" id="frameImage">
                <img src="back_comple.webp" alt="Frame">
            </div>

            <div class="thankyou-text hidden" id="thankText">Thank you !</div>

        </div>

        <div class="container">

            <!-- アニメーション順に表示される画像たち -->


            <div class="anime-object hidden" id="bagClose">
                <img src="bag_close.png" alt="Bag Close">
            </div>
            <div class="anime-object hidden" id="bagOpen">
                <img src="bag_open.png" alt="Bag Open">
            </div>
        </div>



        <div id="completion-container">
           
        </div>
    </div>


        <!-- 保存・読み込み画面（初期は非表示） -->
        <div id="save-load-screen" style="display: none;">
            <button id="back-to-game" onclick="closeSaveLoad()">← 戻る</button>
            <span class="save-text">Save</span>
            <div id="slots-container"></div>
        </div>


        <div id="music-toggle-button">
            <button id="toggle-music">♪ OFF</button>
        </div>

        <script src="script.js"></script>
</body>
【js】
// ボタンを取得
const buttons = document.querySelectorAll('button');

// ===== 効果音の準備 =====
const choiceSound = document.getElementById("se-choice");
const clickSound = document.getElementById("se-click");

// ===== スタートボタンの処理 =====
function goToCharacterSelect() {
    // choice.mp3 を鳴らす
    choiceSound.currentTime = 0;
    choiceSound.play();

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

    const baseParts = ["base", "body", "eyes", "clothes", "hair", "ac2", "ac3"];
    selectedItems = {};

    baseParts.forEach(part => {
        const img = document.createElement("img");
        img.id = `character-${part}`;
        img.style.display = part === "base" ? "block" : "none";

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

// ===== 全ボタンにクリック音を追加（スタートボタン以外） =====
document.querySelectorAll("button").forEach(button => {
    if (button.id !== "start-btn") {
        button.addEventListener("click", () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    }
});

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
            if (isSelected) {
                selectedItems[category] = null;
                partImg.src = "";
                partImg.style.display = "none";
            } else {
                selectedItems[category] = index;
                partImg.src = item.src;
                partImg.style.display = "block";
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
                for (let part in selectedItems) {
                    const index = selectedItems[part];
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

    // 表示領域をクリア
    const container = document.getElementById("completion-container");
    container.innerHTML = "";

   /* setTimeout(() => {*/
        const characterContainer = document.createElement("div");
        characterContainer.className = "anime-object hidden";
        container.appendChild(characterContainer);

        // body画像
        const bodyImg = document.createElement("img");
        bodyImg.src = `images/${selectedCharacter}body_mw.webp`;
        characterContainer.appendChild(bodyImg);

        // 他のパーツ
        const parts = ["body", "eyes", "clothes", "hair", "ac2", "ac3"];
        parts.forEach(part => {
            const index = selectedItems[part];
            if (index !== null) {
                const partImg = document.createElement("img");
                partImg.src = items[selectedCharacter][part][index].src;
                characterContainer.appendChild(partImg);
            }
        });
