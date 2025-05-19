import { _decorator, Component, Node, Vec3, input, Input, KeyCode, EventKeyboard, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SnakeGame')
export class SnakeGame extends Component {
    @property(SpriteFrame)
    headSprite: SpriteFrame = null!;

    @property(SpriteFrame)
    bodySprite: SpriteFrame = null!;

    @property(SpriteFrame)
    foodSprite: SpriteFrame = null!;

    @property
    moveInterval: number = 0.2; // time between moves in seconds

    private direction: Vec3 = new Vec3(1, 0, 0);
    private segments: Node[] = [];
    private elapsed: number = 0;
    private food: Node | null = null;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.spawnInitialSnake();
        this.spawnFood();
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private spawnInitialSnake() {
        const head = this.createSegment(true);
        head.parent = this.node;
        this.segments.push(head);
    }

    private spawnFood() {
        if (this.food) {
            this.food.destroy();
        }
        this.food = this.createFood();
        this.food.parent = this.node;
        const x = Math.floor(Math.random() * 10 - 5) * 40;
        const y = Math.floor(Math.random() * 10 - 5) * 40;
        this.food.setPosition(x, y, 0);
    }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                if (this.direction.y === 0) this.direction.set(0, 1, 0);
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                if (this.direction.y === 0) this.direction.set(0, -1, 0);
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                if (this.direction.x === 0) this.direction.set(-1, 0, 0);
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                if (this.direction.x === 0) this.direction.set(1, 0, 0);
                break;
        }
    }

    update(dt: number) {
        this.elapsed += dt;
        if (this.elapsed >= this.moveInterval) {
            this.elapsed = 0;
            this.moveSnake();
        }
    }

    private moveSnake() {
        const head = this.segments[0];
        const newPos = head.position.clone().add(new Vec3(this.direction.x * 40, this.direction.y * 40, 0));

        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i].setPosition(this.segments[i - 1].position);
        }
        head.setPosition(newPos);

        if (this.food && head.position.equals(this.food.position)) {
            this.extendSnake();
            this.spawnFood();
        }
    }

    private createSegment(isHead: boolean): Node {
        const node = new Node();
        const sprite = node.addComponent(Sprite);
        sprite.spriteFrame = isHead ? this.headSprite : this.bodySprite;
        const transform = node.addComponent(UITransform);
        transform.setContentSize(40, 40);
        return node;
    }

    private createFood(): Node {
        const node = new Node();
        const sprite = node.addComponent(Sprite);
        sprite.spriteFrame = this.foodSprite;
        const transform = node.addComponent(UITransform);
        transform.setContentSize(40, 40);
        return node;
    }

    private extendSnake() {
        const newSegment = this.createSegment(false);
        const last = this.segments[this.segments.length - 1];
        newSegment.parent = this.node;
        newSegment.setPosition(last.position);
        this.segments.push(newSegment);
    }
}
