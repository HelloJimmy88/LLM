# Cocos Snake Game

This is a simple implementation of the classic **Snake** game using **Cocos Creator**. The code is written in TypeScript and is compatible with the WeChat mini game platform.

## Structure

```
cocos-snake/
├── assets/             - Sample sprite images
│   ├── snake_head.png
│   ├── snake_body.png
│   └── food.png
├── src/
│   ├── SnakeGame.ts    - Main game logic
│   ├── SnakeSegment.ts - Snake segment component
│   └── Food.ts         - Food component
└── README.md
```

## Usage

1. Create a new Cocos Creator project (version 3.x recommended).
2. Copy the contents of the `src` folder into your project's `assets/scripts` directory.
3. Import the PNG files from the `assets` folder into your project's assets and assign them to the `SnakeGame` component properties (`headSprite`, `bodySprite`, and `foodSprite`).
4. Attach the `SnakeGame` component to an empty node in your scene.
5. Press **Play** to run the game. When building for WeChat mini games, use the Cocos Creator build panel and select the WeChat platform.

This code is a minimal example. You can extend it with additional features like score display, touch controls, or sound effects.
