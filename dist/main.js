/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three_examples_jsm_geometries_ConvexGeometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/geometries/ConvexGeometry */ "./node_modules/three/examples/jsm/geometries/ConvexGeometry.js");
// 23FI010 上野 詠太




class ThreeJSContainer {
    scene;
    light;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x495ed));
        renderer.shadowMap.enabled = false;
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();
        // 床
        const floorWidth = 30; // 床の幅
        const floorDepth = 30; // 床の奥行
        const floorHeight = 0.5; // 床の厚み
        const floorYPosition = -3.5; // 基準となる位置
        const floorGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(floorWidth, floorHeight, floorDepth); // 床のジオメトリ
        const floorTexture = textureLoader.load('floor.jpeg'); // テクスチャを読み込む
        floorTexture.wrapS = three__WEBPACK_IMPORTED_MODULE_3__.RepeatWrapping; // 水平方向にテクスチャを繰り返し表示
        floorTexture.wrapT = three__WEBPACK_IMPORTED_MODULE_3__.RepeatWrapping; // 垂直方向にテクスチャを繰り返し表示
        floorTexture.repeat.set(5, 5); // 繰り返し回数
        const floorMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ map: floorTexture }); // テクスチャをマテリアルとして適用
        const floor = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(floorGeometry, floorMaterial); // メッシュを作成
        floor.position.set(0, floorYPosition, 0); // 位置を指定
        this.scene.add(floor); // シーンに追加
        // 水槽台
        const standWidth = 15; // 水槽台の幅
        const standHeight = 1.5; // 水槽台の高さ
        const standDepth = 10; // 水槽台の奥行
        const standGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(standWidth, standHeight, standDepth); // 水槽台のジオメトリ
        const standMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0x8B4513 }); // 茶色っぽい色
        const stand = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(standGeometry, standMaterial); // メッシュを作成
        stand.position.set(0, floorYPosition + (floorHeight / 2) + (standHeight / 2), 0); // 水槽台が床の上に乗るよう計算
        this.scene.add(stand); // シーンに追加
        // 壁
        const wallHeight = 10; // 壁の高さ
        const wallThickness = 0.2; // 壁の厚み
        const wallMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ map: textureLoader.load('wall.jpeg') }); // テクスチャに壁の画像を使用したマテリアルを作成
        // 後ろの壁
        const backWall = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(floorWidth, wallHeight, wallThickness), wallMaterial); // 後ろの壁のメッシュを作成
        backWall.position.set(0, floorYPosition + wallHeight / 2, -floorDepth / 2 + wallThickness / 2); // 床の後ろの端に合うよう計算
        // 右の壁
        const rightWall = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(wallThickness, wallHeight, floorDepth), wallMaterial); // 右の壁のメッシュを作成
        rightWall.position.set(floorWidth / 2 - wallThickness / 2, floorYPosition + wallHeight / 2, 0); // 床の右端に合うように計算
        // 左の壁
        const leftWall = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(wallThickness, wallHeight, floorDepth), wallMaterial); // 左の壁のメッシュを作成
        leftWall.position.set(-floorWidth / 2 + wallThickness / 2, floorYPosition + wallHeight / 2, 0); // 床の左端に合うように計算
        // 作った壁をシーンに追加
        this.scene.add(backWall);
        this.scene.add(rightWall);
        this.scene.add(leftWall);
        // 水槽
        const tankWidth = standWidth * 0.9; // 水槽の幅 (水槽台よりも一回り小さく)
        const tankHeight = 7; // 水槽の高さ
        const tankDepth = standDepth * 0.9; // 水槽の奥行 (水槽台よりも一回り小さく)
        const frameThickness = 0.2; // 水槽の枠、ガラスの厚み (後に使用)
        const cornerSize = frameThickness * 0.7; // 支柱の1辺の大きさ
        const tankGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group(); // 水槽を構成するパーツを管理する用のグループ
        const blackMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0x000000 }); // 水槽上部と下部の黒枠の色
        const greenMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0x2E8B57 }); // 四隅の支柱の色
        const glassMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.1, side: three__WEBPACK_IMPORTED_MODULE_3__.DoubleSide }); // ガラスのマテリアル, opacity 0.1で透明度を高く設定
        // 水槽の各パーツを作成する関数
        const createBox = (width, height, depth, material, position = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3()) => {
            const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(width, height, depth), material);
            mesh.position.copy(position);
            return mesh;
        };
        // 下の黒枠
        const bottomFrame = createBox(tankWidth + frameThickness * 2, frameThickness, tankDepth + frameThickness * 2, blackMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, -tankHeight / 2, 0)); // 水槽に枠の厚み分を足して囲むようにして、水槽の底面部分に配置
        tankGroup.add(bottomFrame); // グループに追加
        // 上の黒枠
        const topFrameBarLength = tankWidth; // 水槽の幅と同じ
        const topFrameSideBarLength = tankDepth; // 水槽の奥行と同じ
        const topFrameYPos = tankHeight / 2; // Y軸方向の基準位置
        // 中心が空洞になるように上部に4つの枠を作成 (X方向とZ方向に2つずつ)
        const topFrameXBar1 = createBox(topFrameBarLength, frameThickness, frameThickness, blackMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, topFrameYPos, tankDepth / 2 + frameThickness / 2));
        const topFrameXBar2 = createBox(topFrameBarLength, frameThickness, frameThickness, blackMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, topFrameYPos, -tankDepth / 2 - frameThickness / 2));
        const topFrameZBar1 = createBox(frameThickness, frameThickness, topFrameSideBarLength, blackMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(tankWidth / 2 + frameThickness / 2, topFrameYPos, 0));
        const topFrameZBar2 = createBox(frameThickness, frameThickness, topFrameSideBarLength, blackMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-tankWidth / 2 - frameThickness / 2, topFrameYPos, 0));
        // グループに追加
        tankGroup.add(topFrameXBar1);
        tankGroup.add(topFrameXBar2);
        tankGroup.add(topFrameZBar1);
        tankGroup.add(topFrameZBar2);
        // 四隅の支柱
        const cornerHeight = tankHeight + frameThickness * 2 - 0.6; // 支柱の高さ
        const cornerYPos = 0; // Y軸方向の基準位置
        // 四隅に支柱を作成
        const corner1 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(tankWidth / 2 + frameThickness / 2 - cornerSize / 2, cornerYPos, tankDepth / 2 + frameThickness / 2 - cornerSize / 2));
        const corner2 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-tankWidth / 2 - frameThickness / 2 + cornerSize / 2, cornerYPos, tankDepth / 2 + frameThickness / 2 - cornerSize / 2));
        const corner3 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(tankWidth / 2 + frameThickness / 2 - cornerSize / 2, cornerYPos, -tankDepth / 2 - frameThickness / 2 + cornerSize / 2));
        const corner4 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-tankWidth / 2 - frameThickness / 2 + cornerSize / 2, cornerYPos, -tankDepth / 2 - frameThickness / 2 + cornerSize / 2));
        // グループに追加
        tankGroup.add(corner1);
        tankGroup.add(corner2);
        tankGroup.add(corner3);
        tankGroup.add(corner4);
        // ガラス (水槽の側面)
        const glassThickness = frameThickness; // ガラスの厚み
        const glassYPos = 0; // Y軸方向の基準位置
        // 水槽の四方向にガラスの側面を作成
        const glassFront = createBox(tankWidth, tankHeight, glassThickness, glassMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, glassYPos, tankDepth / 2));
        const glassBack = createBox(tankWidth, tankHeight, glassThickness, glassMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, glassYPos, -tankDepth / 2));
        const glassLeft = createBox(glassThickness, tankHeight, tankDepth, glassMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-tankWidth / 2, glassYPos, 0));
        const glassRight = createBox(glassThickness, tankHeight, tankDepth, glassMaterial, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(tankWidth / 2, glassYPos, 0));
        // グループに追加
        tankGroup.add(glassFront);
        tankGroup.add(glassBack);
        tankGroup.add(glassLeft);
        tankGroup.add(glassRight);
        tankGroup.position.set(0, floorYPosition + (floorHeight / 2) + standHeight + tankHeight / 2, 0); // 水槽全体を水槽台の中心に来るように配置する
        this.scene.add(tankGroup); // シーンに水槽を追加
        // 水面
        const waterSurfaceWidth = tankWidth + 0.1; // 水面の幅
        const waterSurfaceDepth = tankDepth + 0.1; // 水槽の奥行
        const waterSurfaceYPos = (tankHeight / 1.9) - (frameThickness / 1.9); // 水面のY座標 黒枠より若干低く
        const waterSurfaceGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(waterSurfaceWidth, waterSurfaceDepth); // 水面の形状
        const waterSurfaceMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({
            color: 0x4488FF,
            transparent: true,
            opacity: 0.6,
            roughness: 0.2,
            metalness: 0.5,
            side: three__WEBPACK_IMPORTED_MODULE_3__.DoubleSide // 両面表示
        });
        const waterSurface = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(waterSurfaceGeometry, waterSurfaceMaterial); // メッシュの作成
        waterSurface.rotation.x = -Math.PI / 2; // 水平にする(デフォルトが垂直なので)
        waterSurface.position.set(0, waterSurfaceYPos, 0); // 位置指定
        tankGroup.add(waterSurface); // グループに追加
        // 砂
        const sandWidth = tankWidth - frameThickness * 0.5; // 砂の幅
        const sandDepth = tankDepth - frameThickness * 0.5; // 砂の奥行
        const sandHeight = 0.7; // 砂の厚み
        const sandGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry(sandWidth, sandHeight, sandDepth); // 砂の形状
        const sandTexture = textureLoader.load('sand.jpeg'); // 砂の画像を読み込む
        sandTexture.wrapS = three__WEBPACK_IMPORTED_MODULE_3__.RepeatWrapping; // 水平方向に繰り返し表示
        sandTexture.wrapT = three__WEBPACK_IMPORTED_MODULE_3__.RepeatWrapping; // 垂直方向に繰り返し表示
        sandTexture.repeat.set(2, 2); // 繰り返し回数
        const sandMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ map: sandTexture }); // マテリアルを作成(砂の画像を適用)
        const sand = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(sandGeometry, sandMaterial); // メッシュを作成
        sand.position.set(0, -tankHeight / 2 + sandHeight / 2 + frameThickness, 0); // 位置指定
        tankGroup.add(sand); // グループに追加
        // 水草
        const customPlantMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({ color: 0x66ff66 }); // マテリアル(複数回使用)
        // 水草を作成する関数
        const createCustomAquaticPlant = (x, z, scaleFactor) => {
            const plantGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group(); // 茎と葉を管理する用のグループ
            const mainStemHeight = 1.6 * scaleFactor; // 水草の高さを変動させる
            const stem = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.CylinderGeometry(0.05 * scaleFactor, 0.07 * scaleFactor, mainStemHeight, 8), customPlantMaterial); // 葉となる円柱を作成
            stem.position.y = mainStemHeight / 2; // ローカル原点に合わせるためY軸方向に移動
            plantGroup.add(stem); // グループに追加
            const segmentCount = 5; // 葉の段数
            // それぞれの段に葉となる円錐を作成
            for (let i = 0; i < segmentCount; i++) {
                const y = (i + 1) * (mainStemHeight / (segmentCount + 1)); // Y座標を計算
                const radius = (0.25 - i * 0.03) * scaleFactor; // 円錐の向き調整
                const cone = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.ConeGeometry(radius, 0.3 * scaleFactor, 8), customPlantMaterial); // 円柱形状を作成
                cone.position.y = y; // 円錐のY座標
                cone.rotation.x = Math.PI; // 円錐の向きを調整
                plantGroup.add(cone); // グループに追加
            }
            const plantBaseY = -tankHeight / 2 + sandHeight + frameThickness; // 水草が砂の上に来るように調整
            plantGroup.position.set(x, plantBaseY, z); // 位置指定
            return plantGroup; // 完成した水草の形状を返す
        };
        // 関数を呼び出して3種類の大きさの水草を作成
        const largePlant = createCustomAquaticPlant(tankWidth * 0.25, tankDepth * 0.15, 1.5); // Xは水槽中央より右、Zは少し手前、スケール1.2
        const mediumPlant = createCustomAquaticPlant(tankWidth * 0.35, -tankDepth * 0.1, 1.2); // Xは右寄り、Zは少し奥、スケール0.9
        const smallPlant = createCustomAquaticPlant(tankWidth * 0.15, -tankDepth * 0.25, 0.9); // Xは少し右、Zは奥寄り、スケール0.7
        // それぞれの水草をグループに追加
        tankGroup.add(largePlant);
        tankGroup.add(mediumPlant);
        tankGroup.add(smallPlant);
        // 岩
        const rockMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({
            color: 0x555555,
            roughness: 1.0,
            metalness: 0.0,
            flatShading: true // 平らなシェーディング
        });
        // 岩を作成する関数
        const createRockFormation = (x, z, overallScale) => {
            const rockGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group(); // 複数の岩を管理する用のグループ
            const baseCount = 8; // 岩の数
            for (let i = 0; i < baseCount; i++) {
                const rand = Math.random(); // 0から1の間のランダムな数値を生成
                let geo;
                // randの値に応じてランダムなジオメトリを選択
                if (rand < 0.3) {
                    geo = new three__WEBPACK_IMPORTED_MODULE_3__.BoxGeometry((0.3 + Math.random() * 0.2) * overallScale, (0.2 + Math.random() * 0.3) * overallScale, (0.2 + Math.random() * 0.2) * overallScale);
                }
                else if (rand < 0.7) {
                    geo = new three__WEBPACK_IMPORTED_MODULE_3__.SphereGeometry((0.25 + Math.random() * 0.1) * overallScale, 6, 4); // 分割数を低くしてゴツゴツ感を出す
                }
                else {
                    geo = new three__WEBPACK_IMPORTED_MODULE_3__.ConeGeometry((0.15 + Math.random() * 0.1) * overallScale, 0.3 * overallScale, 6); // 分割数を低く
                }
                const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geo, rockMaterial); // メッシュを作成
                // 作成した岩の相対位置、回転、大きさをランダムに設定
                mesh.position.set((Math.random() - 0.5) * (1.0 * overallScale), (Math.random() - 0.5) * (0.3 * overallScale), (Math.random() - 0.5) * (1.0 * overallScale));
                mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                const s = (0.8 + Math.random() * 0.5) * overallScale;
                mesh.scale.set(s, s, s);
                rockGroup.add(mesh); //　作成した岩をグループに追加
            }
            const rockBaseY = -tankHeight / 2 + sandHeight + frameThickness; // 岩が砂の上に来るように調整
            rockGroup.position.set(x, rockBaseY, z); // 位置指定
            return rockGroup; // 作成した岩のグループを返す
        };
        const rockFormation = createRockFormation(-tankWidth * 0.3, tankDepth * 0.1, 1.5); // 岩を作成する関数を呼び出して、水槽の左側に配置
        tankGroup.add(rockFormation); // グループに追加
        // 魚
        // 魚を作成する関数
        const createFish = (x, y, z, bodyColor, initialRotationY, scaleFactor = 1.0) => {
            const fishGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group(); // 魚の胴体と尾びれを管理するグループ
            // 胴体部分
            const bodyMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({
                color: bodyColor,
                roughness: 0.7,
                metalness: 0.1,
                flatShading: true
            });
            // 胴体の形状
            const bodyPoints = [
                new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0.5, 0, 0),
                new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(-0.5, 0, 0),
                new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0.2, 0.15),
                new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, -0.2, 0.15),
                new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0.1, -0.1),
                new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, -0.1, -0.1),
            ];
            const bodyGeometry = new three_examples_jsm_geometries_ConvexGeometry__WEBPACK_IMPORTED_MODULE_2__.ConvexGeometry(bodyPoints); // 魚の形状を作成
            const bodyMesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(bodyGeometry, bodyMaterial); // メッシュを作成
            fishGroup.add(bodyMesh); // グループに胴体を追加
            // 尾びれ部分
            const tailMaterial = new three__WEBPACK_IMPORTED_MODULE_3__.MeshStandardMaterial({
                color: bodyColor,
                roughness: 0.6,
                metalness: 0.1,
                flatShading: true
            });
            const tailGeometry = new three__WEBPACK_IMPORTED_MODULE_3__.ConeGeometry(0.15, 0.3, 3); // 円錐形状で尾びれっぽい形状を作成
            const tail = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(tailGeometry, tailMaterial); // メッシュを作成
            tail.rotation.z = Math.PI / 2; // 向き調整 z軸
            tail.rotation.y = Math.PI; // 向き調整 y軸
            tail.position.set(-0.65, 0, 0); // 胴体の後ろにくっつくように配置
            fishGroup.add(tail); // グループに尾びれを追加
            fishGroup.scale.set(scaleFactor, scaleFactor, scaleFactor); // サイズの調整
            fishGroup.position.set(x, y, z); // 位置調整
            fishGroup.rotation.y = initialRotationY; // 初期状態の向き
            return { fishGroup, tail }; // 作成した魚とアニメーション用に尾びれを返す
        };
        const fishYMin = -tankHeight / 2 + sandHeight + frameThickness + 0.5; // 砂の表面より少し上
        const fishYMax = waterSurfaceYPos - 0.5; // 水面より少し下
        const fishColors = [0xff0000, 0x0000ff, 0x00ff00, 0x800080, 0xffff00]; // 赤, 青, 緑, 紫, 黄
        const fishes = []; // 魚のグループと尾びれを保存する配列
        const initialRotationStandard = 0; // 赤、緑、紫の魚の初期方向
        const initialRotationOpposite = Math.PI; // 青、黄色の魚の初期方向
        // 関数を呼び出して色やサイズ、向きが違う魚を5匹作成
        const fishData1 = createFish(tankWidth * 0.2, (fishYMin + fishYMax) * 2, tankDepth * 0.2, fishColors[0], initialRotationStandard, 1.0);
        const fishData2 = createFish(-tankWidth * 0.1, (fishYMin + fishYMax) * 1.2, -tankDepth * 0.1, fishColors[1], initialRotationOpposite, 0.8);
        const fishData3 = createFish(0, (fishYMin + fishYMax) * 0.8, 0, fishColors[2], initialRotationStandard, 0.9);
        const fishData4 = createFish(tankWidth * 0.01, (fishYMin + fishYMax) * 0.001 - 1, -tankDepth * 0.25, fishColors[3], initialRotationStandard, 0.7);
        const fishData5 = createFish(-tankWidth * 0.4, (fishYMin + fishYMax) * 0.3, tankDepth * 0.15, fishColors[4], initialRotationOpposite, 0.65);
        // 魚をそれぞれグループに追加
        tankGroup.add(fishData1.fishGroup);
        tankGroup.add(fishData2.fishGroup);
        tankGroup.add(fishData3.fishGroup);
        tankGroup.add(fishData4.fishGroup);
        tankGroup.add(fishData5.fishGroup);
        // 配列に追加 (アニメーションに使用)
        fishes.push(fishData1);
        fishes.push(fishData2);
        fishes.push(fishData3);
        fishes.push(fishData4);
        fishes.push(fishData5);
        // --- 魚のアニメーション ---
        // 魚の泳ぐ範囲を指定
        const minX = -tankWidth / 2 + 1;
        const maxX = tankWidth / 2 - 1;
        const minZ = -tankDepth / 2 + 1;
        const maxZ = tankDepth / 2 - 1;
        // 各魚に対してアニメーションを適用
        fishes.forEach(fishData => {
            const fishGroup = fishData.fishGroup;
            const tail = fishData.tail;
            // 尾びれアニメーション 左右に振り子のように揺らすことで泳いでいる風に見せる
            const animateTail = () => {
                new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tail.rotation).to({ y: Math.PI + 0.3 }, 500).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).start(); // yoyoはアニメーションが終了すると逆再生
                new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(tail.rotation).to({ y: Math.PI - 0.3 }, 500).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).delay(500).start();
            };
            animateTail();
            // 魚のアニメーション
            const startFishMovement = () => {
                const currentPos = fishGroup.position.clone(); // 現在位置を取得
                let currentRotationY = fishGroup.rotation.y; // Y軸回転の角度を取得
                let newAngle = currentRotationY + (Math.random() - 0.5) * Math.PI * 0.5; // 方向転換の際の方向の定義
                const margin = 1.0; // ガラス側面に近づいたと判断する距離
                let shouldTurn = false; // 衝突の有無を判断するフラグ
                const directionVector = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(Math.cos(currentRotationY), 0, Math.sin(currentRotationY)).clone().normalize(); // 魚の現在の移動方向
                // 衝突の予測用に次の目標位置を仮で計算
                const predictiveMoveDistance = 5;
                const predictiveX = currentPos.x + directionVector.x * predictiveMoveDistance;
                const predictiveZ = currentPos.z + directionVector.z * predictiveMoveDistance;
                if (predictiveX > maxX - margin && directionVector.x > 0) { // 右の壁に接近かつ右向き
                    newAngle = currentRotationY + Math.PI; // 180度反転
                    shouldTurn = true;
                }
                else if (predictiveX < minX + margin && directionVector.x < 0) { // 左の壁に接近かつ左向き
                    newAngle = currentRotationY + Math.PI; // 180度反転
                    shouldTurn = true;
                }
                newAngle = newAngle % (Math.PI * 2);
                if (newAngle < 0)
                    newAngle += Math.PI * 2; // 角度を0〜2πの範囲に正規化
                const moveDistance = 5 + Math.random() * 3; // 移動距離を維持する
                // 衝突の際に魚が次に目指すX, Z座標を定義
                const targetX = currentPos.x + Math.cos(newAngle) * moveDistance;
                const targetZ = currentPos.z + Math.sin(newAngle) * moveDistance;
                const targetY = currentPos.y; // 上下移動はしない
                // 魚の泳ぐ範囲を超えないように制限
                const finalTargetX = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.clamp(targetX, minX, maxX);
                const finalTargetZ = three__WEBPACK_IMPORTED_MODULE_3__.MathUtils.clamp(targetZ, minZ, maxZ);
                const targetPos = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(finalTargetX, targetY, finalTargetZ); // 魚が目指す3D座標
                const distance = currentPos.distanceTo(targetPos); // 現在位置から目指す3D座標までの距離を計算
                // 魚がスタックしないようにする処理
                if (distance < 0.1 && shouldTurn) {
                    fishGroup.rotation.y = Math.random() * Math.PI * 2;
                    startFishMovement();
                    return;
                }
                // 魚が切り返すようにアニメーション
                new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween({ rotationY: currentRotationY }).to({ rotationY: newAngle }, 500).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out).onUpdate((obj) => {
                    fishGroup.rotation.y = obj.rotationY;
                })
                    // 魚がスタックしたりフリーズするのを防ぐ
                    .onComplete(() => {
                    if (distance < 0.1) {
                        startFishMovement();
                        return;
                    }
                    new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(currentPos).to(targetPos, distance * 300 + 1000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.InOut).onUpdate(() => {
                        fishGroup.position.copy(currentPos);
                    })
                        .onComplete(() => {
                        startFishMovement();
                    })
                        .start();
                })
                    .start();
            };
            startFishMovement();
        });
        //ライトの設定
        const ambientLight = new three__WEBPACK_IMPORTED_MODULE_3__.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        this.light = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 0.8);
        this.light.position.set(20, 20, 20);
        this.light.lookAt(0, 0, 0);
        this.scene.add(this.light);
        let update = (time) => {
            // 毎フレーム呼び出される
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(time);
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 12));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-943a82"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0ksTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEosTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFNUksZ0JBQWdCO1FBQ2hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMs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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMjNGSTAxMCDkuIrph44g6Kmg5aSqXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5pbXBvcnQgeyBDb252ZXhHZW9tZXRyeSB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9nZW9tZXRyaWVzL0NvbnZleEdlb21ldHJ5JztcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHg0OTVlZCkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCBjYW1lcmEpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyDjgrfjg7zjg7Pjga7kvZzmiJAo5YWo5L2T44GnMeWbnilcbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuXG4gICAgICAgIC8vIOW6ilxuICAgICAgICBjb25zdCBmbG9vcldpZHRoID0gMzA7ICAvLyDluorjga7luYVcbiAgICAgICAgY29uc3QgZmxvb3JEZXB0aCA9IDMwOyAgLy8g5bqK44Gu5aWl6KGMXG4gICAgICAgIGNvbnN0IGZsb29ySGVpZ2h0ID0gMC41OyAgICAvLyDluorjga7ljprjgb9cbiAgICAgICAgY29uc3QgZmxvb3JZUG9zaXRpb24gPSAtMy41OyAgICAvLyDln7rmupbjgajjgarjgovkvY3nva5cbiAgICAgICAgY29uc3QgZmxvb3JHZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShmbG9vcldpZHRoLCBmbG9vckhlaWdodCwgZmxvb3JEZXB0aCk7ICAgLy8g5bqK44Gu44K444Kq44Oh44OI44OqXG4gICAgICAgIGNvbnN0IGZsb29yVGV4dHVyZSA9IHRleHR1cmVMb2FkZXIubG9hZCgnZmxvb3IuanBlZycpOyAgLy8g44OG44Kv44K544OB44Oj44KS6Kqt44G/6L6844KAXG4gICAgICAgIGZsb29yVGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nOyAgLy8g5rC05bmz5pa55ZCR44Gr44OG44Kv44K544OB44Oj44KS57mw44KK6L+U44GX6KGo56S6XG4gICAgICAgIGZsb29yVGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nOyAgLy8g5Z6C55u05pa55ZCR44Gr44OG44Kv44K544OB44Oj44KS57mw44KK6L+U44GX6KGo56S6XG4gICAgICAgIGZsb29yVGV4dHVyZS5yZXBlYXQuc2V0KDUsIDUpOyAgLy8g57mw44KK6L+U44GX5Zue5pWwXG4gICAgICAgIGNvbnN0IGZsb29yTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBtYXA6IGZsb29yVGV4dHVyZSB9KTsgICAgLy8g44OG44Kv44K544OB44Oj44KS44Oe44OG44Oq44Ki44Or44Go44GX44Gm6YGp55SoXG4gICAgICAgIGNvbnN0IGZsb29yID0gbmV3IFRIUkVFLk1lc2goZmxvb3JHZW9tZXRyeSwgZmxvb3JNYXRlcmlhbCk7IC8vIOODoeODg+OCt+ODpeOCkuS9nOaIkFxuICAgICAgICBmbG9vci5wb3NpdGlvbi5zZXQoMCwgZmxvb3JZUG9zaXRpb24sIDApOyAgIC8vIOS9jee9ruOCkuaMh+WumlxuICAgICAgICB0aGlzLnNjZW5lLmFkZChmbG9vcik7ICAvLyDjgrfjg7zjg7Pjgavov73liqBcblxuICAgICAgICAvLyDmsLTmp73lj7BcbiAgICAgICAgY29uc3Qgc3RhbmRXaWR0aCA9IDE1OyAgLy8g5rC05qe95Y+w44Gu5bmFXG4gICAgICAgIGNvbnN0IHN0YW5kSGVpZ2h0ID0gMS41OyAgICAvLyDmsLTmp73lj7Djga7pq5jjgZVcbiAgICAgICAgY29uc3Qgc3RhbmREZXB0aCA9IDEwOyAgLy8g5rC05qe95Y+w44Gu5aWl6KGMXG4gICAgICAgIGNvbnN0IHN0YW5kR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoc3RhbmRXaWR0aCwgc3RhbmRIZWlnaHQsIHN0YW5kRGVwdGgpOyAgIC8vIOawtOanveWPsOOBruOCuOOCquODoeODiOODqlxuICAgICAgICBjb25zdCBzdGFuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4OEI0NTEzIH0pOyAgLy8g6Iy26Imy44Gj44G944GE6ImyXG4gICAgICAgIGNvbnN0IHN0YW5kID0gbmV3IFRIUkVFLk1lc2goc3RhbmRHZW9tZXRyeSwgc3RhbmRNYXRlcmlhbCk7IC8vIOODoeODg+OCt+ODpeOCkuS9nOaIkFxuICAgICAgICBzdGFuZC5wb3NpdGlvbi5zZXQoMCwgZmxvb3JZUG9zaXRpb24gKyAoZmxvb3JIZWlnaHQgLyAyKSArIChzdGFuZEhlaWdodCAvIDIpLCAwKTsgICAvLyDmsLTmp73lj7DjgYzluorjga7kuIrjgavkuZfjgovjgojjgYboqIjnrpdcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3RhbmQpOyAgLy8g44K344O844Oz44Gr6L+95YqgXG5cbiAgICAgICAgLy8g5aOBXG4gICAgICAgIGNvbnN0IHdhbGxIZWlnaHQgPSAxMDsgLy8g5aOB44Gu6auY44GVXG4gICAgICAgIGNvbnN0IHdhbGxUaGlja25lc3MgPSAwLjI7IC8vIOWjgeOBruWOmuOBv1xuICAgICAgICBjb25zdCB3YWxsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmVMb2FkZXIubG9hZCgnd2FsbC5qcGVnJykgfSk7ICAvLyDjg4bjgq/jgrnjg4Hjg6Pjgavlo4Hjga7nlLvlg4/jgpLkvb/nlKjjgZfjgZ/jg57jg4bjg6rjgqLjg6vjgpLkvZzmiJBcblxuICAgICAgICAvLyDlvozjgo3jga7lo4FcbiAgICAgICAgY29uc3QgYmFja1dhbGwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoZmxvb3JXaWR0aCwgd2FsbEhlaWdodCwgd2FsbFRoaWNrbmVzcyksIHdhbGxNYXRlcmlhbCk7ICAgIC8vIOW+jOOCjeOBruWjgeOBruODoeODg+OCt+ODpeOCkuS9nOaIkFxuICAgICAgICBiYWNrV2FsbC5wb3NpdGlvbi5zZXQoMCwgZmxvb3JZUG9zaXRpb24gKyB3YWxsSGVpZ2h0IC8gMiwgLWZsb29yRGVwdGggLyAyICsgd2FsbFRoaWNrbmVzcyAvIDIpOyAvLyDluorjga7lvozjgo3jga7nq6/jgavlkIjjgYbjgojjgYboqIjnrpdcblxuICAgICAgICAvLyDlj7Pjga7lo4FcbiAgICAgICAgY29uc3QgcmlnaHRXYWxsID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KHdhbGxUaGlja25lc3MsIHdhbGxIZWlnaHQsIGZsb29yRGVwdGgpLCB3YWxsTWF0ZXJpYWwpOyAgIC8vIOWPs+OBruWjgeOBruODoeODg+OCt+ODpeOCkuS9nOaIkFxuICAgICAgICByaWdodFdhbGwucG9zaXRpb24uc2V0KGZsb29yV2lkdGggLyAyIC0gd2FsbFRoaWNrbmVzcyAvIDIsIGZsb29yWVBvc2l0aW9uICsgd2FsbEhlaWdodCAvIDIsIDApOyAvLyDluorjga7lj7Pnq6/jgavlkIjjgYbjgojjgYbjgavoqIjnrpdcblxuICAgICAgICAvLyDlt6bjga7lo4FcbiAgICAgICAgY29uc3QgbGVmdFdhbGwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkod2FsbFRoaWNrbmVzcywgd2FsbEhlaWdodCwgZmxvb3JEZXB0aCksIHdhbGxNYXRlcmlhbCk7ICAgIC8vIOW3puOBruWjgeOBruODoeODg+OCt+ODpeOCkuS9nOaIkFxuICAgICAgICBsZWZ0V2FsbC5wb3NpdGlvbi5zZXQoLWZsb29yV2lkdGggLyAyICsgd2FsbFRoaWNrbmVzcyAvIDIsIGZsb29yWVBvc2l0aW9uICsgd2FsbEhlaWdodCAvIDIsIDApOyAvLyDluorjga7lt6bnq6/jgavlkIjjgYbjgojjgYbjgavoqIjnrpdcblxuICAgICAgICAvLyDkvZzjgaPjgZ/lo4HjgpLjgrfjg7zjg7Pjgavov73liqBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYmFja1dhbGwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChyaWdodFdhbGwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChsZWZ0V2FsbCk7XG5cbiAgICAgICAgLy8g5rC05qe9XG4gICAgICAgIGNvbnN0IHRhbmtXaWR0aCA9IHN0YW5kV2lkdGggKiAwLjk7IC8vIOawtOanveOBruW5hSAo5rC05qe95Y+w44KI44KK44KC5LiA5Zue44KK5bCP44GV44GPKVxuICAgICAgICBjb25zdCB0YW5rSGVpZ2h0ID0gNzsgICAvLyDmsLTmp73jga7pq5jjgZVcbiAgICAgICAgY29uc3QgdGFua0RlcHRoID0gc3RhbmREZXB0aCAqIDAuOTsgLy8g5rC05qe944Gu5aWl6KGMICjmsLTmp73lj7DjgojjgorjgoLkuIDlm57jgorlsI/jgZXjgY8pXG4gICAgICAgIGNvbnN0IGZyYW1lVGhpY2tuZXNzID0gMC4yOyAvLyDmsLTmp73jga7mnqDjgIHjgqzjg6njgrnjga7ljprjgb8gKOW+jOOBq+S9v+eUqClcbiAgICAgICAgY29uc3QgY29ybmVyU2l6ZSA9IGZyYW1lVGhpY2tuZXNzICogMC43OyAvLyDmlK/mn7Hjga4x6L6644Gu5aSn44GN44GVXG5cbiAgICAgICAgY29uc3QgdGFua0dyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7ICAgIC8vIOawtOanveOCkuani+aIkOOBmeOCi+ODkeODvOODhOOCkueuoeeQhuOBmeOCi+eUqOOBruOCsOODq+ODvOODl1xuXG4gICAgICAgIGNvbnN0IGJsYWNrTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwMDAgfSk7ICAvLyDmsLTmp73kuIrpg6jjgajkuIvpg6jjga7pu5LmnqDjga7oibJcbiAgICAgICAgY29uc3QgZ3JlZW5NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweDJFOEI1NyB9KTsgIC8vIOWbm+maheOBruaUr+afseOBruiJslxuICAgICAgICBjb25zdCBnbGFzc01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4ODdDRUVCLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMC4xLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIH0pOyAvLyDjgqzjg6njgrnjga7jg57jg4bjg6rjgqLjg6ssIG9wYWNpdHkgMC4x44Gn6YCP5piO5bqm44KS6auY44GP6Kit5a6aXG5cbiAgICAgICAgLy8g5rC05qe944Gu5ZCE44OR44O844OE44KS5L2c5oiQ44GZ44KL6Zai5pWwXG4gICAgICAgIGNvbnN0IGNyZWF0ZUJveCA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZGVwdGg6IG51bWJlciwgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsLCBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyA9IG5ldyBUSFJFRS5WZWN0b3IzKCkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkod2lkdGgsIGhlaWdodCwgZGVwdGgpLCBtYXRlcmlhbCk7XG4gICAgICAgICAgICBtZXNoLnBvc2l0aW9uLmNvcHkocG9zaXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8g5LiL44Gu6buS5p6gXG4gICAgICAgIGNvbnN0IGJvdHRvbUZyYW1lID0gY3JlYXRlQm94KHRhbmtXaWR0aCArIGZyYW1lVGhpY2tuZXNzICogMiwgZnJhbWVUaGlja25lc3MsIHRhbmtEZXB0aCArIGZyYW1lVGhpY2tuZXNzICogMiwgYmxhY2tNYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgLXRhbmtIZWlnaHQgLyAyLCAwKSk7IC8vIOawtOanveOBq+aeoOOBruWOmuOBv+WIhuOCkui2s+OBl+OBpuWbsuOCgOOCiOOBhuOBq+OBl+OBpuOAgeawtOanveOBruW6lemdoumDqOWIhuOBq+mFjee9rlxuICAgICAgICB0YW5rR3JvdXAuYWRkKGJvdHRvbUZyYW1lKTsgLy8g44Kw44Or44O844OX44Gr6L+95YqgXG5cbiAgICAgICAgLy8g5LiK44Gu6buS5p6gXG4gICAgICAgIGNvbnN0IHRvcEZyYW1lQmFyTGVuZ3RoID0gdGFua1dpZHRoOyAgICAvLyDmsLTmp73jga7luYXjgajlkIzjgZhcbiAgICAgICAgY29uc3QgdG9wRnJhbWVTaWRlQmFyTGVuZ3RoID0gdGFua0RlcHRoOyAgICAvLyDmsLTmp73jga7lpaXooYzjgajlkIzjgZhcbiAgICAgICAgY29uc3QgdG9wRnJhbWVZUG9zID0gdGFua0hlaWdodCAvIDI7ICAgIC8vIFnou7jmlrnlkJHjga7ln7rmupbkvY3nva5cblxuICAgICAgICAvLyDkuK3lv4PjgYznqbrmtJ7jgavjgarjgovjgojjgYbjgavkuIrpg6jjgas044Gk44Gu5p6g44KS5L2c5oiQIChY5pa55ZCR44GoWuaWueWQkeOBqzLjgaTjgZrjgaQpXG4gICAgICAgIGNvbnN0IHRvcEZyYW1lWEJhcjEgPSBjcmVhdGVCb3godG9wRnJhbWVCYXJMZW5ndGgsIGZyYW1lVGhpY2tuZXNzLCBmcmFtZVRoaWNrbmVzcywgYmxhY2tNYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgdG9wRnJhbWVZUG9zLCB0YW5rRGVwdGggLyAyICsgZnJhbWVUaGlja25lc3MgLyAyKSk7XG4gICAgICAgIGNvbnN0IHRvcEZyYW1lWEJhcjIgPSBjcmVhdGVCb3godG9wRnJhbWVCYXJMZW5ndGgsIGZyYW1lVGhpY2tuZXNzLCBmcmFtZVRoaWNrbmVzcywgYmxhY2tNYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgdG9wRnJhbWVZUG9zLCAtdGFua0RlcHRoIC8gMiAtIGZyYW1lVGhpY2tuZXNzIC8gMikpO1xuICAgICAgICBjb25zdCB0b3BGcmFtZVpCYXIxID0gY3JlYXRlQm94KGZyYW1lVGhpY2tuZXNzLCBmcmFtZVRoaWNrbmVzcywgdG9wRnJhbWVTaWRlQmFyTGVuZ3RoLCBibGFja01hdGVyaWFsLCBuZXcgVEhSRUUuVmVjdG9yMyh0YW5rV2lkdGggLyAyICsgZnJhbWVUaGlja25lc3MgLyAyLCB0b3BGcmFtZVlQb3MsIDApKTtcbiAgICAgICAgY29uc3QgdG9wRnJhbWVaQmFyMiA9IGNyZWF0ZUJveChmcmFtZVRoaWNrbmVzcywgZnJhbWVUaGlja25lc3MsIHRvcEZyYW1lU2lkZUJhckxlbmd0aCwgYmxhY2tNYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjMoLXRhbmtXaWR0aCAvIDIgLSBmcmFtZVRoaWNrbmVzcyAvIDIsIHRvcEZyYW1lWVBvcywgMCkpO1xuXG4gICAgICAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuICAgICAgICB0YW5rR3JvdXAuYWRkKHRvcEZyYW1lWEJhcjEpO1xuICAgICAgICB0YW5rR3JvdXAuYWRkKHRvcEZyYW1lWEJhcjIpO1xuICAgICAgICB0YW5rR3JvdXAuYWRkKHRvcEZyYW1lWkJhcjEpO1xuICAgICAgICB0YW5rR3JvdXAuYWRkKHRvcEZyYW1lWkJhcjIpO1xuXG4gICAgICAgIC8vIOWbm+maheOBruaUr+afsVxuICAgICAgICBjb25zdCBjb3JuZXJIZWlnaHQgPSB0YW5rSGVpZ2h0ICsgZnJhbWVUaGlja25lc3MgKiAyIC0gMC42OyAvLyDmlK/mn7Hjga7pq5jjgZVcbiAgICAgICAgY29uc3QgY29ybmVyWVBvcyA9IDA7ICAgLy8gWei7uOaWueWQkeOBruWfuua6luS9jee9rlxuXG4gICAgICAgIC8vIOWbm+maheOBq+aUr+afseOCkuS9nOaIkFxuICAgICAgICBjb25zdCBjb3JuZXIxID0gY3JlYXRlQm94KGNvcm5lclNpemUsIGNvcm5lckhlaWdodCwgY29ybmVyU2l6ZSwgZ3JlZW5NYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjModGFua1dpZHRoIC8gMiArIGZyYW1lVGhpY2tuZXNzIC8gMiAtIGNvcm5lclNpemUgLyAyLCBjb3JuZXJZUG9zLCB0YW5rRGVwdGggLyAyICsgZnJhbWVUaGlja25lc3MgLyAyIC0gY29ybmVyU2l6ZSAvIDIpKTtcbiAgICAgICAgY29uc3QgY29ybmVyMiA9IGNyZWF0ZUJveChjb3JuZXJTaXplLCBjb3JuZXJIZWlnaHQsIGNvcm5lclNpemUsIGdyZWVuTWF0ZXJpYWwsIG5ldyBUSFJFRS5WZWN0b3IzKC10YW5rV2lkdGggLyAyIC0gZnJhbWVUaGlja25lc3MgLyAyICsgY29ybmVyU2l6ZSAvIDIsIGNvcm5lcllQb3MsIHRhbmtEZXB0aCAvIDIgKyBmcmFtZVRoaWNrbmVzcyAvIDIgLSBjb3JuZXJTaXplIC8gMikpO1xuICAgICAgICBjb25zdCBjb3JuZXIzID0gY3JlYXRlQm94KGNvcm5lclNpemUsIGNvcm5lckhlaWdodCwgY29ybmVyU2l6ZSwgZ3JlZW5NYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjModGFua1dpZHRoIC8gMiArIGZyYW1lVGhpY2tuZXNzIC8gMiAtIGNvcm5lclNpemUgLyAyLCBjb3JuZXJZUG9zLCAtdGFua0RlcHRoIC8gMiAtIGZyYW1lVGhpY2tuZXNzIC8gMiArIGNvcm5lclNpemUgLyAyKSk7XG4gICAgICAgIGNvbnN0IGNvcm5lcjQgPSBjcmVhdGVCb3goY29ybmVyU2l6ZSwgY29ybmVySGVpZ2h0LCBjb3JuZXJTaXplLCBncmVlbk1hdGVyaWFsLCBuZXcgVEhSRUUuVmVjdG9yMygtdGFua1dpZHRoIC8gMiAtIGZyYW1lVGhpY2tuZXNzIC8gMiArIGNvcm5lclNpemUgLyAyLCBjb3JuZXJZUG9zLCAtdGFua0RlcHRoIC8gMiAtIGZyYW1lVGhpY2tuZXNzIC8gMiArIGNvcm5lclNpemUgLyAyKSk7XG5cbiAgICAgICAgLy8g44Kw44Or44O844OX44Gr6L+95YqgXG4gICAgICAgIHRhbmtHcm91cC5hZGQoY29ybmVyMSk7XG4gICAgICAgIHRhbmtHcm91cC5hZGQoY29ybmVyMik7XG4gICAgICAgIHRhbmtHcm91cC5hZGQoY29ybmVyMyk7XG4gICAgICAgIHRhbmtHcm91cC5hZGQoY29ybmVyNCk7XG5cbiAgICAgICAgLy8g44Ks44Op44K5ICjmsLTmp73jga7lgbTpnaIpXG4gICAgICAgIGNvbnN0IGdsYXNzVGhpY2tuZXNzID0gZnJhbWVUaGlja25lc3M7ICAvLyDjgqzjg6njgrnjga7ljprjgb9cbiAgICAgICAgY29uc3QgZ2xhc3NZUG9zID0gMDsgICAgLy8gWei7uOaWueWQkeOBruWfuua6luS9jee9rlxuXG4gICAgICAgIC8vIOawtOanveOBruWbm+aWueWQkeOBq+OCrOODqeOCueOBruWBtOmdouOCkuS9nOaIkFxuICAgICAgICBjb25zdCBnbGFzc0Zyb250ID0gY3JlYXRlQm94KHRhbmtXaWR0aCwgdGFua0hlaWdodCwgZ2xhc3NUaGlja25lc3MsIGdsYXNzTWF0ZXJpYWwsIG5ldyBUSFJFRS5WZWN0b3IzKDAsIGdsYXNzWVBvcywgdGFua0RlcHRoIC8gMikpO1xuICAgICAgICBjb25zdCBnbGFzc0JhY2sgPSBjcmVhdGVCb3godGFua1dpZHRoLCB0YW5rSGVpZ2h0LCBnbGFzc1RoaWNrbmVzcywgZ2xhc3NNYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgZ2xhc3NZUG9zLCAtdGFua0RlcHRoIC8gMikpO1xuICAgICAgICBjb25zdCBnbGFzc0xlZnQgPSBjcmVhdGVCb3goZ2xhc3NUaGlja25lc3MsIHRhbmtIZWlnaHQsIHRhbmtEZXB0aCwgZ2xhc3NNYXRlcmlhbCwgbmV3IFRIUkVFLlZlY3RvcjMoLXRhbmtXaWR0aCAvIDIsIGdsYXNzWVBvcywgMCkpO1xuICAgICAgICBjb25zdCBnbGFzc1JpZ2h0ID0gY3JlYXRlQm94KGdsYXNzVGhpY2tuZXNzLCB0YW5rSGVpZ2h0LCB0YW5rRGVwdGgsIGdsYXNzTWF0ZXJpYWwsIG5ldyBUSFJFRS5WZWN0b3IzKHRhbmtXaWR0aCAvIDIsIGdsYXNzWVBvcywgMCkpO1xuXG4gICAgICAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuICAgICAgICB0YW5rR3JvdXAuYWRkKGdsYXNzRnJvbnQpO1xuICAgICAgICB0YW5rR3JvdXAuYWRkKGdsYXNzQmFjayk7XG4gICAgICAgIHRhbmtHcm91cC5hZGQoZ2xhc3NMZWZ0KTtcbiAgICAgICAgdGFua0dyb3VwLmFkZChnbGFzc1JpZ2h0KTtcblxuICAgICAgICB0YW5rR3JvdXAucG9zaXRpb24uc2V0KDAsIGZsb29yWVBvc2l0aW9uICsgKGZsb29ySGVpZ2h0IC8gMikgKyBzdGFuZEhlaWdodCArIHRhbmtIZWlnaHQgLyAyLCAwKTsgICAgLy8g5rC05qe95YWo5L2T44KS5rC05qe95Y+w44Gu5Lit5b+D44Gr5p2l44KL44KI44GG44Gr6YWN572u44GZ44KLXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRhbmtHcm91cCk7ICAvLyDjgrfjg7zjg7PjgavmsLTmp73jgpLov73liqBcblxuICAgICAgICAvLyDmsLTpnaJcbiAgICAgICAgY29uc3Qgd2F0ZXJTdXJmYWNlV2lkdGggPSB0YW5rV2lkdGggKyAwLjE7ICAvLyDmsLTpnaLjga7luYVcbiAgICAgICAgY29uc3Qgd2F0ZXJTdXJmYWNlRGVwdGggPSB0YW5rRGVwdGggKyAwLjE7ICAvLyDmsLTmp73jga7lpaXooYxcbiAgICAgICAgY29uc3Qgd2F0ZXJTdXJmYWNlWVBvcyA9ICh0YW5rSGVpZ2h0IC8gMS45KSAtIChmcmFtZVRoaWNrbmVzcyAvIDEuOSk7ICAgLy8g5rC06Z2i44GuWeW6p+aomSDpu5LmnqDjgojjgoroi6XlubLkvY7jgY9cblxuICAgICAgICBjb25zdCB3YXRlclN1cmZhY2VHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KHdhdGVyU3VyZmFjZVdpZHRoLCB3YXRlclN1cmZhY2VEZXB0aCk7IC8vIOawtOmdouOBruW9oueKtlxuICAgICAgICBjb25zdCB3YXRlclN1cmZhY2VNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgICAgICBjb2xvcjogMHg0NDg4RkYsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNiwgICAgLy8g6YCP5piO5bqmXG4gICAgICAgICAgICByb3VnaG5lc3M6IDAuMiwgLy8g6KGo6Z2i44Gu57KX44GVXG4gICAgICAgICAgICBtZXRhbG5lc3M6IDAuNSwgLy8g5Y+N5bCE5oSfXG4gICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIC8vIOS4oemdouihqOekulxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgd2F0ZXJTdXJmYWNlID0gbmV3IFRIUkVFLk1lc2god2F0ZXJTdXJmYWNlR2VvbWV0cnksIHdhdGVyU3VyZmFjZU1hdGVyaWFsKTsgICAgLy8g44Oh44OD44K344Ol44Gu5L2c5oiQXG4gICAgICAgIHdhdGVyU3VyZmFjZS5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyOyAvLyDmsLTlubPjgavjgZnjgoso44OH44OV44Kp44Or44OI44GM5Z6C55u044Gq44Gu44GnKVxuICAgICAgICB3YXRlclN1cmZhY2UucG9zaXRpb24uc2V0KDAsIHdhdGVyU3VyZmFjZVlQb3MsIDApOyAgLy8g5L2N572u5oyH5a6aXG4gICAgICAgIHRhbmtHcm91cC5hZGQod2F0ZXJTdXJmYWNlKTsgLy8g44Kw44Or44O844OX44Gr6L+95YqgXG5cbiAgICAgICAgLy8g56CCXG4gICAgICAgIGNvbnN0IHNhbmRXaWR0aCA9IHRhbmtXaWR0aCAtIGZyYW1lVGhpY2tuZXNzICogMC41OyAvLyDnoILjga7luYVcbiAgICAgICAgY29uc3Qgc2FuZERlcHRoID0gdGFua0RlcHRoIC0gZnJhbWVUaGlja25lc3MgKiAwLjU7IC8vIOegguOBruWlpeihjFxuICAgICAgICBjb25zdCBzYW5kSGVpZ2h0ID0gMC43OyAvLyDnoILjga7ljprjgb9cblxuICAgICAgICBjb25zdCBzYW5kR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoc2FuZFdpZHRoLCBzYW5kSGVpZ2h0LCBzYW5kRGVwdGgpOyAgIC8vIOegguOBruW9oueKtlxuICAgICAgICBjb25zdCBzYW5kVGV4dHVyZSA9IHRleHR1cmVMb2FkZXIubG9hZCgnc2FuZC5qcGVnJyk7ICAgIC8vIOegguOBrueUu+WDj+OCkuiqreOBv+i+vOOCgFxuICAgICAgICBzYW5kVGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nOyAgIC8vIOawtOW5s+aWueWQkeOBq+e5sOOCiui/lOOBl+ihqOekulxuICAgICAgICBzYW5kVGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nOyAgIC8vIOWeguebtOaWueWQkeOBq+e5sOOCiui/lOOBl+ihqOekulxuICAgICAgICBzYW5kVGV4dHVyZS5yZXBlYXQuc2V0KDIsIDIpOyAvLyDnubDjgorov5TjgZflm57mlbBcbiAgICAgICAgY29uc3Qgc2FuZE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgbWFwOiBzYW5kVGV4dHVyZSB9KTsgIC8vIOODnuODhuODquOCouODq+OCkuS9nOaIkCjnoILjga7nlLvlg4/jgpLpgannlKgpXG4gICAgICAgIGNvbnN0IHNhbmQgPSBuZXcgVEhSRUUuTWVzaChzYW5kR2VvbWV0cnksIHNhbmRNYXRlcmlhbCk7ICAgIC8vIOODoeODg+OCt+ODpeOCkuS9nOaIkFxuICAgICAgICBzYW5kLnBvc2l0aW9uLnNldCgwLCAtdGFua0hlaWdodCAvIDIgKyBzYW5kSGVpZ2h0IC8gMiArIGZyYW1lVGhpY2tuZXNzLCAwKTsgLy8g5L2N572u5oyH5a6aXG4gICAgICAgIHRhbmtHcm91cC5hZGQoc2FuZCk7ICAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuXG4gICAgICAgIC8vIOawtOiNiVxuICAgICAgICBjb25zdCBjdXN0b21QbGFudE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4NjZmZjY2IH0pOyAgICAvLyDjg57jg4bjg6rjgqLjg6so6KSH5pWw5Zue5L2/55SoKVxuXG4gICAgICAgIC8vIOawtOiNieOCkuS9nOaIkOOBmeOCi+mWouaVsFxuICAgICAgICBjb25zdCBjcmVhdGVDdXN0b21BcXVhdGljUGxhbnQgPSAoeDogbnVtYmVyLCB6OiBudW1iZXIsIHNjYWxlRmFjdG9yOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBsYW50R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTsgICAvLyDojI7jgajokYnjgpLnrqHnkIbjgZnjgovnlKjjga7jgrDjg6vjg7zjg5dcbiAgICAgICAgICAgIGNvbnN0IG1haW5TdGVtSGVpZ2h0ID0gMS42ICogc2NhbGVGYWN0b3I7ICAgLy8g5rC06I2J44Gu6auY44GV44KS5aSJ5YuV44GV44Gb44KLXG4gICAgICAgICAgICBjb25zdCBzdGVtID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4wNSAqIHNjYWxlRmFjdG9yLCAwLjA3ICogc2NhbGVGYWN0b3IsIG1haW5TdGVtSGVpZ2h0LCA4KSwgY3VzdG9tUGxhbnRNYXRlcmlhbCk7ICAgIC8vIOiRieOBqOOBquOCi+WGhuafseOCkuS9nOaIkFxuICAgICAgICAgICAgc3RlbS5wb3NpdGlvbi55ID0gbWFpblN0ZW1IZWlnaHQgLyAyOyAgIC8vIOODreODvOOCq+ODq+WOn+eCueOBq+WQiOOCj+OBm+OCi+OBn+OCgVnou7jmlrnlkJHjgavnp7vli5VcbiAgICAgICAgICAgIHBsYW50R3JvdXAuYWRkKHN0ZW0pOyAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudENvdW50ID0gNTsgLy8g6JGJ44Gu5q615pWwXG4gICAgICAgICAgICAvLyDjgZ3jgozjgZ7jgozjga7mrrXjgavokYnjgajjgarjgovlhobpjJDjgpLkvZzmiJBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnbWVudENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gKGkgKyAxKSAqIChtYWluU3RlbUhlaWdodCAvIChzZWdtZW50Q291bnQgKyAxKSk7ICAvLyBZ5bqn5qiZ44KS6KiI566XXG4gICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gKDAuMjUgLSBpICogMC4wMykgKiBzY2FsZUZhY3RvcjsgLy8g5YaG6YyQ44Gu5ZCR44GN6Kq/5pW0XG4gICAgICAgICAgICAgICAgY29uc3QgY29uZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Db25lR2VvbWV0cnkocmFkaXVzLCAwLjMgKiBzY2FsZUZhY3RvciwgOCksIGN1c3RvbVBsYW50TWF0ZXJpYWwpOyAvLyDlhobmn7HlvaLnirbjgpLkvZzmiJBcbiAgICAgICAgICAgICAgICBjb25lLnBvc2l0aW9uLnkgPSB5OyAgICAvLyDlhobpjJDjga5Z5bqn5qiZXG4gICAgICAgICAgICAgICAgY29uZS5yb3RhdGlvbi54ID0gTWF0aC5QSTsgIC8vIOWGhumMkOOBruWQkeOBjeOCkuiqv+aVtFxuICAgICAgICAgICAgICAgIHBsYW50R3JvdXAuYWRkKGNvbmUpOyAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGxhbnRCYXNlWSA9IC10YW5rSGVpZ2h0IC8gMiArIHNhbmRIZWlnaHQgKyBmcmFtZVRoaWNrbmVzczsgICAvLyDmsLTojYnjgYznoILjga7kuIrjgavmnaXjgovjgojjgYbjgavoqr/mlbRcbiAgICAgICAgICAgIHBsYW50R3JvdXAucG9zaXRpb24uc2V0KHgsIHBsYW50QmFzZVksIHopOyAgLy8g5L2N572u5oyH5a6aXG4gICAgICAgICAgICByZXR1cm4gcGxhbnRHcm91cDsgIC8vIOWujOaIkOOBl+OBn+awtOiNieOBruW9oueKtuOCkui/lOOBmVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOmWouaVsOOCkuWRvOOBs+WHuuOBl+OBpjPnqK7poZ7jga7lpKfjgY3jgZXjga7msLTojYnjgpLkvZzmiJBcbiAgICAgICAgY29uc3QgbGFyZ2VQbGFudCA9IGNyZWF0ZUN1c3RvbUFxdWF0aWNQbGFudCh0YW5rV2lkdGggKiAwLjI1LCB0YW5rRGVwdGggKiAwLjE1LCAxLjUpOyAvLyBY44Gv5rC05qe95Lit5aSu44KI44KK5Y+z44CBWuOBr+WwkeOBl+aJi+WJjeOAgeOCueOCseODvOODqzEuMlxuICAgICAgICBjb25zdCBtZWRpdW1QbGFudCA9IGNyZWF0ZUN1c3RvbUFxdWF0aWNQbGFudCh0YW5rV2lkdGggKiAwLjM1LCAtdGFua0RlcHRoICogMC4xLCAxLjIpOyAvLyBY44Gv5Y+z5a+E44KK44CBWuOBr+WwkeOBl+WlpeOAgeOCueOCseODvOODqzAuOVxuICAgICAgICBjb25zdCBzbWFsbFBsYW50ID0gY3JlYXRlQ3VzdG9tQXF1YXRpY1BsYW50KHRhbmtXaWR0aCAqIDAuMTUsIC10YW5rRGVwdGggKiAwLjI1LCAwLjkpOyAvLyBY44Gv5bCR44GX5Y+z44CBWuOBr+WlpeWvhOOCiuOAgeOCueOCseODvOODqzAuN1xuXG4gICAgICAgIC8vIOOBneOCjOOBnuOCjOOBruawtOiNieOCkuOCsOODq+ODvOODl+OBq+i/veWKoFxuICAgICAgICB0YW5rR3JvdXAuYWRkKGxhcmdlUGxhbnQpO1xuICAgICAgICB0YW5rR3JvdXAuYWRkKG1lZGl1bVBsYW50KTtcbiAgICAgICAgdGFua0dyb3VwLmFkZChzbWFsbFBsYW50KTtcblxuICAgICAgICAvLyDlsqlcbiAgICAgICAgY29uc3Qgcm9ja01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiAweDU1NTU1NSxcbiAgICAgICAgICAgIHJvdWdobmVzczogMS4wLFxuICAgICAgICAgICAgbWV0YWxuZXNzOiAwLjAsXG4gICAgICAgICAgICBmbGF0U2hhZGluZzogdHJ1ZSAgIC8vIOW5s+OCieOBquOCt+OCp+ODvOODh+OCo+ODs+OCsFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDlsqnjgpLkvZzmiJDjgZnjgovplqLmlbBcbiAgICAgICAgY29uc3QgY3JlYXRlUm9ja0Zvcm1hdGlvbiA9ICh4OiBudW1iZXIsIHo6IG51bWJlciwgb3ZlcmFsbFNjYWxlOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvY2tHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpOyAgICAvLyDopIfmlbDjga7lsqnjgpLnrqHnkIbjgZnjgovnlKjjga7jgrDjg6vjg7zjg5dcbiAgICAgICAgICAgIGNvbnN0IGJhc2VDb3VudCA9IDg7ICAgIC8vIOWyqeOBruaVsFxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7IC8vIDDjgYvjgokx44Gu6ZaT44Gu44Op44Oz44OA44Og44Gq5pWw5YCk44KS55Sf5oiQXG4gICAgICAgICAgICAgICAgbGV0IGdlbzogVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgLy8gcmFuZOOBruWApOOBq+W/nOOBmOOBpuODqeODs+ODgOODoOOBquOCuOOCquODoeODiOODquOCkumBuOaKnlxuICAgICAgICAgICAgICAgIGlmIChyYW5kIDwgMC4zKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLjMgKyBNYXRoLnJhbmRvbSgpICogMC4yKSAqIG92ZXJhbGxTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLjIgKyBNYXRoLnJhbmRvbSgpICogMC4zKSAqIG92ZXJhbGxTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLjIgKyBNYXRoLnJhbmRvbSgpICogMC4yKSAqIG92ZXJhbGxTY2FsZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZCA8IDAuNykge1xuICAgICAgICAgICAgICAgICAgICBnZW8gPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoKDAuMjUgKyBNYXRoLnJhbmRvbSgpICogMC4xKSAqIG92ZXJhbGxTY2FsZSwgNiwgNCk7IC8vIOWIhuWJsuaVsOOCkuS9juOBj+OBl+OBpuOCtOODhOOCtOODhOaEn+OCkuWHuuOBmVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbyA9IG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoKDAuMTUgKyBNYXRoLnJhbmRvbSgpICogMC4xKSAqIG92ZXJhbGxTY2FsZSwgMC4zICogb3ZlcmFsbFNjYWxlLCA2KTsgLy8g5YiG5Ymy5pWw44KS5L2O44GPXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIHJvY2tNYXRlcmlhbCk7IC8vIOODoeODg+OCt+ODpeOCkuS9nOaIkFxuXG4gICAgICAgICAgICAgICAgLy8g5L2c5oiQ44GX44Gf5bKp44Gu55u45a++5L2N572u44CB5Zue6Lui44CB5aSn44GN44GV44KS44Op44Oz44OA44Og44Gr6Kit5a6aXG4gICAgICAgICAgICAgICAgbWVzaC5wb3NpdGlvbi5zZXQoXG4gICAgICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqICgxLjAgKiBvdmVyYWxsU2NhbGUpLFxuICAgICAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAoMC4zICogb3ZlcmFsbFNjYWxlKSxcbiAgICAgICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogKDEuMCAqIG92ZXJhbGxTY2FsZSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG1lc2gucm90YXRpb24uc2V0KFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIE1hdGguUEksXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gKDAuOCArIE1hdGgucmFuZG9tKCkgKiAwLjUpICogb3ZlcmFsbFNjYWxlO1xuICAgICAgICAgICAgICAgIG1lc2guc2NhbGUuc2V0KHMsIHMsIHMpO1xuXG4gICAgICAgICAgICAgICAgcm9ja0dyb3VwLmFkZChtZXNoKTsgICAgLy/jgIDkvZzmiJDjgZfjgZ/lsqnjgpLjgrDjg6vjg7zjg5fjgavov73liqBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgcm9ja0Jhc2VZID0gLXRhbmtIZWlnaHQgLyAyICsgc2FuZEhlaWdodCArIGZyYW1lVGhpY2tuZXNzOyAvLyDlsqnjgYznoILjga7kuIrjgavmnaXjgovjgojjgYbjgavoqr/mlbRcbiAgICAgICAgICAgIHJvY2tHcm91cC5wb3NpdGlvbi5zZXQoeCwgcm9ja0Jhc2VZLCB6KTsgLy8g5L2N572u5oyH5a6aXG4gICAgICAgICAgICByZXR1cm4gcm9ja0dyb3VwOyAgIC8vIOS9nOaIkOOBl+OBn+WyqeOBruOCsOODq+ODvOODl+OCkui/lOOBmVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJvY2tGb3JtYXRpb24gPSBjcmVhdGVSb2NrRm9ybWF0aW9uKC10YW5rV2lkdGggKiAwLjMsIHRhbmtEZXB0aCAqIDAuMSwgMS41KTsgIC8vIOWyqeOCkuS9nOaIkOOBmeOCi+mWouaVsOOCkuWRvOOBs+WHuuOBl+OBpuOAgeawtOanveOBruW3puWBtOOBq+mFjee9rlxuICAgICAgICB0YW5rR3JvdXAuYWRkKHJvY2tGb3JtYXRpb24pOyAgIC8vIOOCsOODq+ODvOODl+OBq+i/veWKoFxuXG4gICAgICAgIC8vIOmtmlxuICAgICAgICAvLyDprZrjgpLkvZzmiJDjgZnjgovplqLmlbBcbiAgICAgICAgY29uc3QgY3JlYXRlRmlzaCA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCBib2R5Q29sb3I6IG51bWJlciwgaW5pdGlhbFJvdGF0aW9uWTogbnVtYmVyLCBzY2FsZUZhY3RvcjogbnVtYmVyID0gMS4wKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXNoR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTsgICAgLy8g6a2a44Gu6IO05L2T44Go5bC+44Gz44KM44KS566h55CG44GZ44KL44Kw44Or44O844OXXG4gICAgICAgICAgICAvLyDog7TkvZPpg6jliIZcbiAgICAgICAgICAgIGNvbnN0IGJvZHlNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IGJvZHlDb2xvcixcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDAuNyxcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IDAuMSxcbiAgICAgICAgICAgICAgICBmbGF0U2hhZGluZzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyDog7TkvZPjga7lvaLnirZcbiAgICAgICAgICAgIGNvbnN0IGJvZHlQb2ludHMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMC41LCAwLCAwKSxcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtMC41LCAwLCAwKSxcbiAgICAgICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLjIsIDAuMTUpLFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0wLjIsIDAuMTUpLFxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAuMSwgLTAuMSksXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTAuMSwgLTAuMSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3QgYm9keUdlb21ldHJ5ID0gbmV3IENvbnZleEdlb21ldHJ5KGJvZHlQb2ludHMpOyAgICAvLyDprZrjga7lvaLnirbjgpLkvZzmiJBcbiAgICAgICAgICAgIGNvbnN0IGJvZHlNZXNoID0gbmV3IFRIUkVFLk1lc2goYm9keUdlb21ldHJ5LCBib2R5TWF0ZXJpYWwpOyAgICAvLyDjg6Hjg4Pjgrfjg6XjgpLkvZzmiJBcbiAgICAgICAgICAgIGZpc2hHcm91cC5hZGQoYm9keU1lc2gpOyAgICAvLyDjgrDjg6vjg7zjg5fjgavog7TkvZPjgpLov73liqBcblxuICAgICAgICAgICAgLy8g5bC+44Gz44KM6YOo5YiGXG4gICAgICAgICAgICBjb25zdCB0YWlsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBib2R5Q29sb3IsXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAwLjYsXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAwLjEsXG4gICAgICAgICAgICAgICAgZmxhdFNoYWRpbmc6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdGFpbEdlb21ldHJ5ID0gbmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjE1LCAwLjMsIDMpOyAgLy8g5YaG6YyQ5b2i54q244Gn5bC+44Gz44KM44Gj44G944GE5b2i54q244KS5L2c5oiQXG4gICAgICAgICAgICBjb25zdCB0YWlsID0gbmV3IFRIUkVFLk1lc2godGFpbEdlb21ldHJ5LCB0YWlsTWF0ZXJpYWwpOyAgICAvLyDjg6Hjg4Pjgrfjg6XjgpLkvZzmiJBcbiAgICAgICAgICAgIHRhaWwucm90YXRpb24ueiA9IE1hdGguUEkgLyAyOyAvLyDlkJHjgY3oqr/mlbQgeui7uFxuICAgICAgICAgICAgdGFpbC5yb3RhdGlvbi55ID0gTWF0aC5QSTsgICAgLy8g5ZCR44GN6Kq/5pW0IHnou7hcbiAgICAgICAgICAgIHRhaWwucG9zaXRpb24uc2V0KC0wLjY1LCAwLCAwKTsgLy8g6IO05L2T44Gu5b6M44KN44Gr44GP44Gj44Gk44GP44KI44GG44Gr6YWN572uXG4gICAgICAgICAgICBmaXNoR3JvdXAuYWRkKHRhaWwpOyAgICAvLyDjgrDjg6vjg7zjg5fjgavlsL7jgbPjgozjgpLov73liqBcblxuICAgICAgICAgICAgZmlzaEdyb3VwLnNjYWxlLnNldChzY2FsZUZhY3Rvciwgc2NhbGVGYWN0b3IsIHNjYWxlRmFjdG9yKTsgLy8g44K144Kk44K644Gu6Kq/5pW0XG4gICAgICAgICAgICBmaXNoR3JvdXAucG9zaXRpb24uc2V0KHgsIHksIHopOyAgICAvLyDkvY3nva7oqr/mlbRcbiAgICAgICAgICAgIGZpc2hHcm91cC5yb3RhdGlvbi55ID0gaW5pdGlhbFJvdGF0aW9uWTsgICAgLy8g5Yid5pyf54q25oWL44Gu5ZCR44GNXG4gICAgICAgICAgICByZXR1cm4geyBmaXNoR3JvdXAsIHRhaWwgfTsgLy8g5L2c5oiQ44GX44Gf6a2a44Go44Ki44OL44Oh44O844K344On44Oz55So44Gr5bC+44Gz44KM44KS6L+U44GZXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZmlzaFlNaW4gPSAtdGFua0hlaWdodCAvIDIgKyBzYW5kSGVpZ2h0ICsgZnJhbWVUaGlja25lc3MgKyAwLjU7IC8vIOegguOBruihqOmdouOCiOOCiuWwkeOBl+S4ilxuICAgICAgICBjb25zdCBmaXNoWU1heCA9IHdhdGVyU3VyZmFjZVlQb3MgLSAwLjU7IC8vIOawtOmdouOCiOOCiuWwkeOBl+S4i1xuICAgICAgICBjb25zdCBmaXNoQ29sb3JzID0gWzB4ZmYwMDAwLCAweDAwMDBmZiwgMHgwMGZmMDAsIDB4ODAwMDgwLCAweGZmZmYwMF07IC8vIOi1pCwg6Z2SLCDnt5EsIOe0qywg6buEXG4gICAgICAgIGNvbnN0IGZpc2hlczogeyBmaXNoR3JvdXA6IFRIUkVFLkdyb3VwLCB0YWlsOiBUSFJFRS5NZXNoIH1bXSA9IFtdOyAvLyDprZrjga7jgrDjg6vjg7zjg5fjgajlsL7jgbPjgozjgpLkv53lrZjjgZnjgovphY3liJdcbiAgICAgICAgY29uc3QgaW5pdGlhbFJvdGF0aW9uU3RhbmRhcmQgPSAwOyAvLyDotaTjgIHnt5HjgIHntKvjga7prZrjga7liJ3mnJ/mlrnlkJFcbiAgICAgICAgY29uc3QgaW5pdGlhbFJvdGF0aW9uT3Bwb3NpdGUgPSBNYXRoLlBJOyAvLyDpnZLjgIHpu4ToibLjga7prZrjga7liJ3mnJ/mlrnlkJFcblxuICAgICAgICAvLyDplqLmlbDjgpLlkbzjgbPlh7rjgZfjgaboibLjgoTjgrXjgqTjgrrjgIHlkJHjgY3jgYzpgZXjgYbprZrjgpI15Yy55L2c5oiQXG4gICAgICAgIGNvbnN0IGZpc2hEYXRhMSA9IGNyZWF0ZUZpc2godGFua1dpZHRoICogMC4yLCAoZmlzaFlNaW4gKyBmaXNoWU1heCkgKiAyLCB0YW5rRGVwdGggKiAwLjIsIGZpc2hDb2xvcnNbMF0sIGluaXRpYWxSb3RhdGlvblN0YW5kYXJkLCAxLjApO1xuICAgICAgICBjb25zdCBmaXNoRGF0YTIgPSBjcmVhdGVGaXNoKC10YW5rV2lkdGggKiAwLjEsIChmaXNoWU1pbiArIGZpc2hZTWF4KSAqIDEuMiwgLXRhbmtEZXB0aCAqIDAuMSwgZmlzaENvbG9yc1sxXSwgaW5pdGlhbFJvdGF0aW9uT3Bwb3NpdGUsIDAuOCk7XG4gICAgICAgIGNvbnN0IGZpc2hEYXRhMyA9IGNyZWF0ZUZpc2goMCwgKGZpc2hZTWluICsgZmlzaFlNYXgpICogMC44LCAwLCBmaXNoQ29sb3JzWzJdLCBpbml0aWFsUm90YXRpb25TdGFuZGFyZCwgMC45KTtcbiAgICAgICAgY29uc3QgZmlzaERhdGE0ID0gY3JlYXRlRmlzaCh0YW5rV2lkdGggKiAwLjAxLCAoZmlzaFlNaW4gKyBmaXNoWU1heCkgKiAwLjAwMSAtIDEsIC10YW5rRGVwdGggKiAwLjI1LCBmaXNoQ29sb3JzWzNdLCBpbml0aWFsUm90YXRpb25TdGFuZGFyZCwgMC43KTtcbiAgICAgICAgY29uc3QgZmlzaERhdGE1ID0gY3JlYXRlRmlzaCgtdGFua1dpZHRoICogMC40LCAoZmlzaFlNaW4gKyBmaXNoWU1heCkgKiAwLjMsIHRhbmtEZXB0aCAqIDAuMTUsIGZpc2hDb2xvcnNbNF0sIGluaXRpYWxSb3RhdGlvbk9wcG9zaXRlLCAwLjY1KTtcblxuICAgICAgICAvLyDprZrjgpLjgZ3jgozjgZ7jgozjgrDjg6vjg7zjg5fjgavov73liqBcbiAgICAgICAgdGFua0dyb3VwLmFkZChmaXNoRGF0YTEuZmlzaEdyb3VwKTtcbiAgICAgICAgdGFua0dyb3VwLmFkZChmaXNoRGF0YTIuZmlzaEdyb3VwKTtcbiAgICAgICAgdGFua0dyb3VwLmFkZChmaXNoRGF0YTMuZmlzaEdyb3VwKTtcbiAgICAgICAgdGFua0dyb3VwLmFkZChmaXNoRGF0YTQuZmlzaEdyb3VwKTtcbiAgICAgICAgdGFua0dyb3VwLmFkZChmaXNoRGF0YTUuZmlzaEdyb3VwKTtcblxuICAgICAgICAvLyDphY3liJfjgavov73liqAgKOOCouODi+ODoeODvOOCt+ODp+ODs+OBq+S9v+eUqClcbiAgICAgICAgZmlzaGVzLnB1c2goZmlzaERhdGExKTtcbiAgICAgICAgZmlzaGVzLnB1c2goZmlzaERhdGEyKTtcbiAgICAgICAgZmlzaGVzLnB1c2goZmlzaERhdGEzKTtcbiAgICAgICAgZmlzaGVzLnB1c2goZmlzaERhdGE0KTtcbiAgICAgICAgZmlzaGVzLnB1c2goZmlzaERhdGE1KTtcblxuICAgICAgICAvLyAtLS0g6a2a44Gu44Ki44OL44Oh44O844K344On44OzIC0tLVxuXG4gICAgICAgIC8vIOmtmuOBruazs+OBkOevhOWbsuOCkuaMh+WumlxuICAgICAgICBjb25zdCBtaW5YID0gLXRhbmtXaWR0aCAvIDIgKyAxO1xuICAgICAgICBjb25zdCBtYXhYID0gdGFua1dpZHRoIC8gMiAtIDE7XG4gICAgICAgIGNvbnN0IG1pblogPSAtdGFua0RlcHRoIC8gMiArIDE7XG4gICAgICAgIGNvbnN0IG1heFogPSB0YW5rRGVwdGggLyAyIC0gMTtcblxuICAgICAgICAvLyDlkITprZrjgavlr77jgZfjgabjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLpgannlKhcbiAgICAgICAgZmlzaGVzLmZvckVhY2goZmlzaERhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlzaEdyb3VwID0gZmlzaERhdGEuZmlzaEdyb3VwO1xuICAgICAgICAgICAgY29uc3QgdGFpbCA9IGZpc2hEYXRhLnRhaWw7XG4gICAgICAgICAgICAvLyDlsL7jgbPjgozjgqLjg4vjg6Hjg7zjgrfjg6fjg7Mg5bem5Y+z44Gr5oyv44KK5a2Q44Gu44KI44GG44Gr5o+644KJ44GZ44GT44Go44Gn5rOz44GE44Gn44GE44KL6aKo44Gr6KaL44Gb44KLXG4gICAgICAgICAgICBjb25zdCBhbmltYXRlVGFpbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4odGFpbC5yb3RhdGlvbikudG8oeyB5OiBNYXRoLlBJICsgMC4zIH0sIDUwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuSW5PdXQpLnlveW8odHJ1ZSkucmVwZWF0KEluZmluaXR5KS5zdGFydCgpOyAgLy8geW95b+OBr+OCouODi+ODoeODvOOCt+ODp+ODs+OBjOe1guS6huOBmeOCi+OBqOmAhuWGjeeUn1xuICAgICAgICAgICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0YWlsLnJvdGF0aW9uKS50byh7IHk6IE1hdGguUEkgLSAwLjMgfSwgNTAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5Jbk91dCkueW95byh0cnVlKS5yZXBlYXQoSW5maW5pdHkpLmRlbGF5KDUwMCkuc3RhcnQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbmltYXRlVGFpbCgpO1xuXG4gICAgICAgICAgICAvLyDprZrjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RmlzaE1vdmVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSBmaXNoR3JvdXAucG9zaXRpb24uY2xvbmUoKTsgIC8vIOePvuWcqOS9jee9ruOCkuWPluW+l1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Um90YXRpb25ZID0gZmlzaEdyb3VwLnJvdGF0aW9uLnk7ICAgIC8vIFnou7jlm57ou6Ljga7op5LluqbjgpLlj5blvpdcbiAgICAgICAgICAgICAgICBsZXQgbmV3QW5nbGUgPSBjdXJyZW50Um90YXRpb25ZICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogTWF0aC5QSSAqIDAuNTsgICAgLy8g5pa55ZCR6Lui5o+b44Gu6Zqb44Gu5pa55ZCR44Gu5a6a576pXG4gICAgICAgICAgICAgICAgY29uc3QgbWFyZ2luID0gMS4wOyAvLyDjgqzjg6njgrnlgbTpnaLjgavov5HjgaXjgYTjgZ/jgajliKTmlq3jgZnjgovot53pm6JcbiAgICAgICAgICAgICAgICBsZXQgc2hvdWxkVHVybiA9IGZhbHNlOyAvLyDooZ3nqoHjga7mnInnhKHjgpLliKTmlq3jgZnjgovjg5Xjg6njgrBcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvblZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKE1hdGguY29zKGN1cnJlbnRSb3RhdGlvblkpLCAwLCBNYXRoLnNpbihjdXJyZW50Um90YXRpb25ZKSkubm9ybWFsaXplKCk7ICAgLy8g6a2a44Gu54++5Zyo44Gu56e75YuV5pa55ZCRXG4gICAgICAgICAgICAgICAgLy8g6KGd56qB44Gu5LqI5ris55So44Gr5qyh44Gu55uu5qiZ5L2N572u44KS5Luu44Gn6KiI566XXG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZGljdGl2ZU1vdmVEaXN0YW5jZSA9IDU7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZGljdGl2ZVggPSBjdXJyZW50UG9zLnggKyBkaXJlY3Rpb25WZWN0b3IueCAqIHByZWRpY3RpdmVNb3ZlRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZGljdGl2ZVogPSBjdXJyZW50UG9zLnogKyBkaXJlY3Rpb25WZWN0b3IueiAqIHByZWRpY3RpdmVNb3ZlRGlzdGFuY2U7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZGljdGl2ZVggPiBtYXhYIC0gbWFyZ2luICYmIGRpcmVjdGlvblZlY3Rvci54ID4gMCkgeyAvLyDlj7Pjga7lo4HjgavmjqXov5HjgYvjgaTlj7PlkJHjgY1cbiAgICAgICAgICAgICAgICAgICAgbmV3QW5nbGUgPSBjdXJyZW50Um90YXRpb25ZICsgTWF0aC5QSTsgLy8gMTgw5bqm5Y+N6LuiXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFR1cm4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlZGljdGl2ZVggPCBtaW5YICsgbWFyZ2luICYmIGRpcmVjdGlvblZlY3Rvci54IDwgMCkgeyAvLyDlt6bjga7lo4HjgavmjqXov5HjgYvjgaTlt6blkJHjgY1cbiAgICAgICAgICAgICAgICAgICAgbmV3QW5nbGUgPSBjdXJyZW50Um90YXRpb25ZICsgTWF0aC5QSTsgLy8gMTgw5bqm5Y+N6LuiXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFR1cm4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld0FuZ2xlID0gbmV3QW5nbGUgJSAoTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdBbmdsZSA8IDApIG5ld0FuZ2xlICs9IE1hdGguUEkgKiAyOyAgLy8g6KeS5bqm44KSMOOAnDLPgOOBruevhOWbsuOBq+ato+imj+WMllxuXG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZURpc3RhbmNlID0gNSArIE1hdGgucmFuZG9tKCkgKiAzOyAvLyDnp7vli5Xot53pm6LjgpLntq3mjIHjgZnjgotcbiAgICAgICAgICAgICAgICAvLyDooZ3nqoHjga7pmpvjgavprZrjgYzmrKHjgavnm67mjIfjgZlYLCBa5bqn5qiZ44KS5a6a576pXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0WCA9IGN1cnJlbnRQb3MueCArIE1hdGguY29zKG5ld0FuZ2xlKSAqIG1vdmVEaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRaID0gY3VycmVudFBvcy56ICsgTWF0aC5zaW4obmV3QW5nbGUpICogbW92ZURpc3RhbmNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFkgPSBjdXJyZW50UG9zLnk7ICAgLy8g5LiK5LiL56e75YuV44Gv44GX44Gq44GEXG5cbiAgICAgICAgICAgICAgICAvLyDprZrjga7ms7PjgZDnr4Tlm7LjgpLotoXjgYjjgarjgYTjgojjgYbjgavliLbpmZBcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5hbFRhcmdldFggPSBUSFJFRS5NYXRoVXRpbHMuY2xhbXAodGFyZ2V0WCwgbWluWCwgbWF4WCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmluYWxUYXJnZXRaID0gVEhSRUUuTWF0aFV0aWxzLmNsYW1wKHRhcmdldFosIG1pblosIG1heFopO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKGZpbmFsVGFyZ2V0WCwgdGFyZ2V0WSwgZmluYWxUYXJnZXRaKTsgICAvLyDprZrjgYznm67mjIfjgZkzROW6p+aomVxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gY3VycmVudFBvcy5kaXN0YW5jZVRvKHRhcmdldFBvcyk7ICAvLyDnj77lnKjkvY3nva7jgYvjgonnm67mjIfjgZkzROW6p+aomeOBvuOBp+OBrui3nembouOCkuioiOeul1xuXG4gICAgICAgICAgICAgICAgLy8g6a2a44GM44K544K/44OD44Kv44GX44Gq44GE44KI44GG44Gr44GZ44KL5Yem55CGXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMC4xICYmIHNob3VsZFR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgZmlzaEdyb3VwLnJvdGF0aW9uLnkgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RmlzaE1vdmVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyDprZrjgYzliIfjgorov5TjgZnjgojjgYbjgavjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICAgICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4oeyByb3RhdGlvblk6IGN1cnJlbnRSb3RhdGlvblkgfSkudG8oeyByb3RhdGlvblk6IG5ld0FuZ2xlIH0sIDUwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KS5vblVwZGF0ZSgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpc2hHcm91cC5yb3RhdGlvbi55ID0gb2JqLnJvdGF0aW9uWTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAvLyDprZrjgYzjgrnjgr/jg4Pjgq/jgZfjgZ/jgorjg5Xjg6rjg7zjgrrjgZnjgovjga7jgpLpmLLjgZBcbiAgICAgICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMC4xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRGaXNoTW92ZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4oY3VycmVudFBvcykudG8odGFyZ2V0UG9zLCBkaXN0YW5jZSAqIDMwMCArIDEwMDApLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLkluT3V0KS5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlzaEdyb3VwLnBvc2l0aW9uLmNvcHkoY3VycmVudFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRGaXNoTW92ZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzdGFydEZpc2hNb3ZlbWVudCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL+ODqeOCpOODiOOBruioreWumlxuICAgICAgICBjb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjcpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC44KTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoMjAsIDIwLCAyMCk7XG4gICAgICAgIHRoaXMubGlnaHQubG9va0F0KDAsIDAsIDApO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICBsZXQgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIOavjuODleODrOODvOODoOWRvOOBs+WHuuOBleOCjOOCi1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKHRpbWUpO1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG5cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxMikpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHItOTQzYTgyXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9