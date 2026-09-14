import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("room", "/assets/main-room.png");
  }

  create() {
    // Room background
    this.room = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "room"
    );

    this.fitRoom();

    // Temporary player marker.
    // We'll replace this with the proper character sprite next.
    this.player = this.add.circle(
      this.scale.width * 0.5,
      this.scale.height * 0.68,
      12,
      0xffffff
    );

    this.player.setDepth(10);

    // WASD
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Resize
    this.scale.on("resize", this.handleResize, this);
  }

  update() {
    const speed = 3;

    if (this.keys.W.isDown) {
      this.player.y -= speed;
    }

    if (this.keys.S.isDown) {
      this.player.y += speed;
    }

    if (this.keys.A.isDown) {
      this.player.x -= speed;
    }

    if (this.keys.D.isDown) {
      this.player.x += speed;
    }

    // Keep player inside the room.
    this.player.x = Phaser.Math.Clamp(
      this.player.x,
      this.scale.width * 0.15,
      this.scale.width * 0.85
    );

    this.player.y = Phaser.Math.Clamp(
      this.player.y,
      this.scale.height * 0.35,
      this.scale.height * 0.85
    );
  }

  fitRoom() {
    const width = this.scale.width;
    const height = this.scale.height;

    const scaleX = width / this.room.width;
    const scaleY = height / this.room.height;

    const scale = Math.max(scaleX, scaleY);

    this.room.setScale(scale);
    this.room.setPosition(width / 2, height / 2);
  }

  handleResize(gameSize) {
    const { width, height } = gameSize;

    this.room.setPosition(width / 2, height / 2);

    const scaleX = width / this.room.width;
    const scaleY = height / this.room.height;
    const scale = Math.max(scaleX, scaleY);

    this.room.setScale(scale);
  }
}