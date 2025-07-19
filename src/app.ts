// 23FI010 上野 詠太

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

class ThreeJSContainer {
    private scene: THREE.Scene;
    private light: THREE.Light;

    constructor() {

    }

    // 画面部分の作成(表示する枠ごとに)*
    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x495ed));
        renderer.shadowMap.enabled = false;

        //カメラの設定
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const orbitControls = new OrbitControls(camera, renderer.domElement);

        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render: FrameRequestCallback = (time) => {
            orbitControls.update();

            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    }

    // シーンの作成(全体で1回)
    private createScene = () => {
        this.scene = new THREE.Scene();
        const textureLoader = new THREE.TextureLoader();

        // 床
        const floorWidth = 30;  // 床の幅
        const floorDepth = 30;  // 床の奥行
        const floorHeight = 0.5;    // 床の厚み
        const floorYPosition = -3.5;    // 基準となる位置
        const floorGeometry = new THREE.BoxGeometry(floorWidth, floorHeight, floorDepth);   // 床のジオメトリ
        const floorTexture = textureLoader.load('floor.jpeg');  // テクスチャを読み込む
        floorTexture.wrapS = THREE.RepeatWrapping;  // 水平方向にテクスチャを繰り返し表示
        floorTexture.wrapT = THREE.RepeatWrapping;  // 垂直方向にテクスチャを繰り返し表示
        floorTexture.repeat.set(5, 5);  // 繰り返し回数
        const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });    // テクスチャをマテリアルとして適用
        const floor = new THREE.Mesh(floorGeometry, floorMaterial); // メッシュを作成
        floor.position.set(0, floorYPosition, 0);   // 位置を指定
        this.scene.add(floor);  // シーンに追加

        // 水槽台
        const standWidth = 15;  // 水槽台の幅
        const standHeight = 1.5;    // 水槽台の高さ
        const standDepth = 10;  // 水槽台の奥行
        const standGeometry = new THREE.BoxGeometry(standWidth, standHeight, standDepth);   // 水槽台のジオメトリ
        const standMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });  // 茶色っぽい色
        const stand = new THREE.Mesh(standGeometry, standMaterial); // メッシュを作成
        stand.position.set(0, floorYPosition + (floorHeight / 2) + (standHeight / 2), 0);   // 水槽台が床の上に乗るよう計算
        this.scene.add(stand);  // シーンに追加

        // 壁
        const wallHeight = 10; // 壁の高さ
        const wallThickness = 0.2; // 壁の厚み
        const wallMaterial = new THREE.MeshStandardMaterial({ map: textureLoader.load('wall.jpeg') });  // テクスチャに壁の画像を使用したマテリアルを作成

        // 後ろの壁
        const backWall = new THREE.Mesh(new THREE.BoxGeometry(floorWidth, wallHeight, wallThickness), wallMaterial);    // 後ろの壁のメッシュを作成
        backWall.position.set(0, floorYPosition + wallHeight / 2, -floorDepth / 2 + wallThickness / 2); // 床の後ろの端に合うよう計算

        // 右の壁
        const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, floorDepth), wallMaterial);   // 右の壁のメッシュを作成
        rightWall.position.set(floorWidth / 2 - wallThickness / 2, floorYPosition + wallHeight / 2, 0); // 床の右端に合うように計算

        // 左の壁
        const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, floorDepth), wallMaterial);    // 左の壁のメッシュを作成
        leftWall.position.set(-floorWidth / 2 + wallThickness / 2, floorYPosition + wallHeight / 2, 0); // 床の左端に合うように計算

        // 作った壁をシーンに追加
        this.scene.add(backWall);
        this.scene.add(rightWall);
        this.scene.add(leftWall);

        // 水槽
        const tankWidth = standWidth * 0.9; // 水槽の幅 (水槽台よりも一回り小さく)
        const tankHeight = 7;   // 水槽の高さ
        const tankDepth = standDepth * 0.9; // 水槽の奥行 (水槽台よりも一回り小さく)
        const frameThickness = 0.2; // 水槽の枠、ガラスの厚み (後に使用)
        const cornerSize = frameThickness * 0.7; // 支柱の1辺の大きさ

        const tankGroup = new THREE.Group();    // 水槽を構成するパーツを管理する用のグループ

        const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });  // 水槽上部と下部の黒枠の色
        const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });  // 四隅の支柱の色
        const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.1, side: THREE.DoubleSide }); // ガラスのマテリアル, opacity 0.1で透明度を高く設定

        // 水槽の各パーツを作成する関数
        const createBox = (width: number, height: number, depth: number, material: THREE.Material, position: THREE.Vector3 = new THREE.Vector3()) => {
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
            mesh.position.copy(position);
            return mesh;
        };

        // 下の黒枠
        const bottomFrame = createBox(tankWidth + frameThickness * 2, frameThickness, tankDepth + frameThickness * 2, blackMaterial, new THREE.Vector3(0, -tankHeight / 2, 0)); // 水槽に枠の厚み分を足して囲むようにして、水槽の底面部分に配置
        tankGroup.add(bottomFrame); // グループに追加

        // 上の黒枠
        const topFrameBarLength = tankWidth;    // 水槽の幅と同じ
        const topFrameSideBarLength = tankDepth;    // 水槽の奥行と同じ
        const topFrameYPos = tankHeight / 2;    // Y軸方向の基準位置

        // 中心が空洞になるように上部に4つの枠を作成 (X方向とZ方向に2つずつ)
        const topFrameXBar1 = createBox(topFrameBarLength, frameThickness, frameThickness, blackMaterial, new THREE.Vector3(0, topFrameYPos, tankDepth / 2 + frameThickness / 2));
        const topFrameXBar2 = createBox(topFrameBarLength, frameThickness, frameThickness, blackMaterial, new THREE.Vector3(0, topFrameYPos, -tankDepth / 2 - frameThickness / 2));
        const topFrameZBar1 = createBox(frameThickness, frameThickness, topFrameSideBarLength, blackMaterial, new THREE.Vector3(tankWidth / 2 + frameThickness / 2, topFrameYPos, 0));
        const topFrameZBar2 = createBox(frameThickness, frameThickness, topFrameSideBarLength, blackMaterial, new THREE.Vector3(-tankWidth / 2 - frameThickness / 2, topFrameYPos, 0));

        // グループに追加
        tankGroup.add(topFrameXBar1);
        tankGroup.add(topFrameXBar2);
        tankGroup.add(topFrameZBar1);
        tankGroup.add(topFrameZBar2);

        // 四隅の支柱
        const cornerHeight = tankHeight + frameThickness * 2 - 0.6; // 支柱の高さ
        const cornerYPos = 0;   // Y軸方向の基準位置

        // 四隅に支柱を作成
        const corner1 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new THREE.Vector3(tankWidth / 2 + frameThickness / 2 - cornerSize / 2, cornerYPos, tankDepth / 2 + frameThickness / 2 - cornerSize / 2));
        const corner2 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new THREE.Vector3(-tankWidth / 2 - frameThickness / 2 + cornerSize / 2, cornerYPos, tankDepth / 2 + frameThickness / 2 - cornerSize / 2));
        const corner3 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new THREE.Vector3(tankWidth / 2 + frameThickness / 2 - cornerSize / 2, cornerYPos, -tankDepth / 2 - frameThickness / 2 + cornerSize / 2));
        const corner4 = createBox(cornerSize, cornerHeight, cornerSize, greenMaterial, new THREE.Vector3(-tankWidth / 2 - frameThickness / 2 + cornerSize / 2, cornerYPos, -tankDepth / 2 - frameThickness / 2 + cornerSize / 2));

        // グループに追加
        tankGroup.add(corner1);
        tankGroup.add(corner2);
        tankGroup.add(corner3);
        tankGroup.add(corner4);

        // ガラス (水槽の側面)
        const glassThickness = frameThickness;  // ガラスの厚み
        const glassYPos = 0;    // Y軸方向の基準位置

        // 水槽の四方向にガラスの側面を作成
        const glassFront = createBox(tankWidth, tankHeight, glassThickness, glassMaterial, new THREE.Vector3(0, glassYPos, tankDepth / 2));
        const glassBack = createBox(tankWidth, tankHeight, glassThickness, glassMaterial, new THREE.Vector3(0, glassYPos, -tankDepth / 2));
        const glassLeft = createBox(glassThickness, tankHeight, tankDepth, glassMaterial, new THREE.Vector3(-tankWidth / 2, glassYPos, 0));
        const glassRight = createBox(glassThickness, tankHeight, tankDepth, glassMaterial, new THREE.Vector3(tankWidth / 2, glassYPos, 0));

        // グループに追加
        tankGroup.add(glassFront);
        tankGroup.add(glassBack);
        tankGroup.add(glassLeft);
        tankGroup.add(glassRight);

        tankGroup.position.set(0, floorYPosition + (floorHeight / 2) + standHeight + tankHeight / 2, 0);    // 水槽全体を水槽台の中心に来るように配置する
        this.scene.add(tankGroup);  // シーンに水槽を追加

        // 水面
        const waterSurfaceWidth = tankWidth + 0.1;  // 水面の幅
        const waterSurfaceDepth = tankDepth + 0.1;  // 水槽の奥行
        const waterSurfaceYPos = (tankHeight / 1.9) - (frameThickness / 1.9);   // 水面のY座標 黒枠より若干低く

        const waterSurfaceGeometry = new THREE.PlaneGeometry(waterSurfaceWidth, waterSurfaceDepth); // 水面の形状
        const waterSurfaceMaterial = new THREE.MeshStandardMaterial({
            color: 0x4488FF,
            transparent: true,
            opacity: 0.6,    // 透明度
            roughness: 0.2, // 表面の粗さ
            metalness: 0.5, // 反射感
            side: THREE.DoubleSide // 両面表示
        });
        const waterSurface = new THREE.Mesh(waterSurfaceGeometry, waterSurfaceMaterial);    // メッシュの作成
        waterSurface.rotation.x = -Math.PI / 2; // 水平にする(デフォルトが垂直なので)
        waterSurface.position.set(0, waterSurfaceYPos, 0);  // 位置指定
        tankGroup.add(waterSurface); // グループに追加

        // 砂
        const sandWidth = tankWidth - frameThickness * 0.5; // 砂の幅
        const sandDepth = tankDepth - frameThickness * 0.5; // 砂の奥行
        const sandHeight = 0.7; // 砂の厚み

        const sandGeometry = new THREE.BoxGeometry(sandWidth, sandHeight, sandDepth);   // 砂の形状
        const sandTexture = textureLoader.load('sand.jpeg');    // 砂の画像を読み込む
        sandTexture.wrapS = THREE.RepeatWrapping;   // 水平方向に繰り返し表示
        sandTexture.wrapT = THREE.RepeatWrapping;   // 垂直方向に繰り返し表示
        sandTexture.repeat.set(2, 2); // 繰り返し回数
        const sandMaterial = new THREE.MeshStandardMaterial({ map: sandTexture });  // マテリアルを作成(砂の画像を適用)
        const sand = new THREE.Mesh(sandGeometry, sandMaterial);    // メッシュを作成
        sand.position.set(0, -tankHeight / 2 + sandHeight / 2 + frameThickness, 0); // 位置指定
        tankGroup.add(sand);    // グループに追加

        // 水草
        const customPlantMaterial = new THREE.MeshStandardMaterial({ color: 0x66ff66 });    // マテリアル(複数回使用)

        // 水草を作成する関数
        const createCustomAquaticPlant = (x: number, z: number, scaleFactor: number) => {
            const plantGroup = new THREE.Group();   // 茎と葉を管理する用のグループ
            const mainStemHeight = 1.6 * scaleFactor;   // 水草の高さを変動させる
            const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * scaleFactor, 0.07 * scaleFactor, mainStemHeight, 8), customPlantMaterial);    // 葉となる円柱を作成
            stem.position.y = mainStemHeight / 2;   // ローカル原点に合わせるためY軸方向に移動
            plantGroup.add(stem);   // グループに追加
            const segmentCount = 5; // 葉の段数
            // それぞれの段に葉となる円錐を作成
            for (let i = 0; i < segmentCount; i++) {
                const y = (i + 1) * (mainStemHeight / (segmentCount + 1));  // Y座標を計算
                const radius = (0.25 - i * 0.03) * scaleFactor; // 円錐の向き調整
                const cone = new THREE.Mesh(new THREE.ConeGeometry(radius, 0.3 * scaleFactor, 8), customPlantMaterial); // 円柱形状を作成
                cone.position.y = y;    // 円錐のY座標
                cone.rotation.x = Math.PI;  // 円錐の向きを調整
                plantGroup.add(cone);   // グループに追加
            }
            const plantBaseY = -tankHeight / 2 + sandHeight + frameThickness;   // 水草が砂の上に来るように調整
            plantGroup.position.set(x, plantBaseY, z);  // 位置指定
            return plantGroup;  // 完成した水草の形状を返す
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
        const rockMaterial = new THREE.MeshStandardMaterial({
            color: 0x555555,
            roughness: 1.0,
            metalness: 0.0,
            flatShading: true   // 平らなシェーディング
        });

        // 岩を作成する関数
        const createRockFormation = (x: number, z: number, overallScale: number) => {
            const rockGroup = new THREE.Group();    // 複数の岩を管理する用のグループ
            const baseCount = 8;    // 岩の数

            for (let i = 0; i < baseCount; i++) {
                const rand = Math.random(); // 0から1の間のランダムな数値を生成
                let geo: THREE.BufferGeometry;
                // randの値に応じてランダムなジオメトリを選択
                if (rand < 0.3) {
                    geo = new THREE.BoxGeometry(
                        (0.3 + Math.random() * 0.2) * overallScale,
                        (0.2 + Math.random() * 0.3) * overallScale,
                        (0.2 + Math.random() * 0.2) * overallScale
                    );
                } else if (rand < 0.7) {
                    geo = new THREE.SphereGeometry((0.25 + Math.random() * 0.1) * overallScale, 6, 4); // 分割数を低くしてゴツゴツ感を出す
                } else {
                    geo = new THREE.ConeGeometry((0.15 + Math.random() * 0.1) * overallScale, 0.3 * overallScale, 6); // 分割数を低く
                }
                const mesh = new THREE.Mesh(geo, rockMaterial); // メッシュを作成

                // 作成した岩の相対位置、回転、大きさをランダムに設定
                mesh.position.set(
                    (Math.random() - 0.5) * (1.0 * overallScale),
                    (Math.random() - 0.5) * (0.3 * overallScale),
                    (Math.random() - 0.5) * (1.0 * overallScale)
                );
                mesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
                const s = (0.8 + Math.random() * 0.5) * overallScale;
                mesh.scale.set(s, s, s);

                rockGroup.add(mesh);    //　作成した岩をグループに追加
            }

            const rockBaseY = -tankHeight / 2 + sandHeight + frameThickness; // 岩が砂の上に来るように調整
            rockGroup.position.set(x, rockBaseY, z); // 位置指定
            return rockGroup;   // 作成した岩のグループを返す
        };

        const rockFormation = createRockFormation(-tankWidth * 0.3, tankDepth * 0.1, 1.5);  // 岩を作成する関数を呼び出して、水槽の左側に配置
        tankGroup.add(rockFormation);   // グループに追加

        // 魚
        // 魚を作成する関数
        const createFish = (x: number, y: number, z: number, bodyColor: number, initialRotationY: number, scaleFactor: number = 1.0) => {
            const fishGroup = new THREE.Group();    // 魚の胴体と尾びれを管理するグループ
            // 胴体部分
            const bodyMaterial = new THREE.MeshStandardMaterial({
                color: bodyColor,
                roughness: 0.7,
                metalness: 0.1,
                flatShading: true
            });
            // 胴体の形状
            const bodyPoints = [
                new THREE.Vector3(0.5, 0, 0),
                new THREE.Vector3(-0.5, 0, 0),
                new THREE.Vector3(0, 0.2, 0.15),
                new THREE.Vector3(0, -0.2, 0.15),
                new THREE.Vector3(0, 0.1, -0.1),
                new THREE.Vector3(0, -0.1, -0.1),
            ];
            const bodyGeometry = new ConvexGeometry(bodyPoints);    // 魚の形状を作成
            const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);    // メッシュを作成
            fishGroup.add(bodyMesh);    // グループに胴体を追加

            // 尾びれ部分
            const tailMaterial = new THREE.MeshStandardMaterial({
                color: bodyColor,
                roughness: 0.6,
                metalness: 0.1,
                flatShading: true
            });
            const tailGeometry = new THREE.ConeGeometry(0.15, 0.3, 3);  // 円錐形状で尾びれっぽい形状を作成
            const tail = new THREE.Mesh(tailGeometry, tailMaterial);    // メッシュを作成
            tail.rotation.z = Math.PI / 2; // 向き調整 z軸
            tail.rotation.y = Math.PI;    // 向き調整 y軸
            tail.position.set(-0.65, 0, 0); // 胴体の後ろにくっつくように配置
            fishGroup.add(tail);    // グループに尾びれを追加

            fishGroup.scale.set(scaleFactor, scaleFactor, scaleFactor); // サイズの調整
            fishGroup.position.set(x, y, z);    // 位置調整
            fishGroup.rotation.y = initialRotationY;    // 初期状態の向き
            return { fishGroup, tail }; // 作成した魚とアニメーション用に尾びれを返す
        };

        const fishYMin = -tankHeight / 2 + sandHeight + frameThickness + 0.5; // 砂の表面より少し上
        const fishYMax = waterSurfaceYPos - 0.5; // 水面より少し下
        const fishColors = [0xff0000, 0x0000ff, 0x00ff00, 0x800080, 0xffff00]; // 赤, 青, 緑, 紫, 黄
        const fishes: { fishGroup: THREE.Group, tail: THREE.Mesh }[] = []; // 魚のグループと尾びれを保存する配列
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
                new TWEEN.Tween(tail.rotation).to({ y: Math.PI + 0.3 }, 500).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).start();  // yoyoはアニメーションが終了すると逆再生
                new TWEEN.Tween(tail.rotation).to({ y: Math.PI - 0.3 }, 500).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).repeat(Infinity).delay(500).start();
            };
            animateTail();

            // 魚のアニメーション
            const startFishMovement = () => {
                const currentPos = fishGroup.position.clone();  // 現在位置を取得
                let currentRotationY = fishGroup.rotation.y;    // Y軸回転の角度を取得
                let newAngle = currentRotationY + (Math.random() - 0.5) * Math.PI * 0.5;    // 方向転換の際の方向の定義
                const margin = 1.0; // ガラス側面に近づいたと判断する距離
                let shouldTurn = false; // 衝突の有無を判断するフラグ

                const directionVector = new THREE.Vector3(Math.cos(currentRotationY), 0, Math.sin(currentRotationY)).normalize();   // 魚の現在の移動方向
                // 衝突の予測用に次の目標位置を仮で計算
                const predictiveMoveDistance = 5;
                const predictiveX = currentPos.x + directionVector.x * predictiveMoveDistance;
                const predictiveZ = currentPos.z + directionVector.z * predictiveMoveDistance;

                if (predictiveX > maxX - margin && directionVector.x > 0) { // 右の壁に接近かつ右向き
                    newAngle = currentRotationY + Math.PI; // 180度反転
                    shouldTurn = true;
                } else if (predictiveX < minX + margin && directionVector.x < 0) { // 左の壁に接近かつ左向き
                    newAngle = currentRotationY + Math.PI; // 180度反転
                    shouldTurn = true;
                }

                newAngle = newAngle % (Math.PI * 2);
                if (newAngle < 0) newAngle += Math.PI * 2;  // 角度を0〜2πの範囲に正規化

                const moveDistance = 5 + Math.random() * 3; // 移動距離を維持する
                // 衝突の際に魚が次に目指すX, Z座標を定義
                const targetX = currentPos.x + Math.cos(newAngle) * moveDistance;
                const targetZ = currentPos.z + Math.sin(newAngle) * moveDistance;
                const targetY = currentPos.y;   // 上下移動はしない

                // 魚の泳ぐ範囲を超えないように制限
                const finalTargetX = THREE.MathUtils.clamp(targetX, minX, maxX);
                const finalTargetZ = THREE.MathUtils.clamp(targetZ, minZ, maxZ);
                const targetPos = new THREE.Vector3(finalTargetX, targetY, finalTargetZ);   // 魚が目指す3D座標
                const distance = currentPos.distanceTo(targetPos);  // 現在位置から目指す3D座標までの距離を計算

                // 魚がスタックしないようにする処理
                if (distance < 0.1 && shouldTurn) {
                    fishGroup.rotation.y = Math.random() * Math.PI * 2;
                    startFishMovement();
                    return;
                }

                // 魚が切り返すようにアニメーション
                new TWEEN.Tween({ rotationY: currentRotationY }).to({ rotationY: newAngle }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate((obj) => {
                    fishGroup.rotation.y = obj.rotationY;
                })
                    // 魚がスタックしたりフリーズするのを防ぐ
                    .onComplete(() => {
                        if (distance < 0.1) {
                            startFishMovement();
                            return;
                        }
                        new TWEEN.Tween(currentPos).to(targetPos, distance * 300 + 1000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(() => {
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        this.light = new THREE.DirectionalLight(0xffffff, 0.8);
        this.light.position.set(20, 20, 20);
        this.light.lookAt(0, 0, 0);
        this.scene.add(this.light);

        let update: FrameRequestCallback = (time) => {

            // 毎フレーム呼び出される
            TWEEN.update(time);

            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

}

window.addEventListener("DOMContentLoaded", init);

function init() {
    let container = new ThreeJSContainer();

    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(0, 0, 12));
    document.body.appendChild(viewport);
}
