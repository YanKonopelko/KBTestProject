import { _decorator, Button, Component, EventHandler, Label, Sprite, SpriteFrame } from 'cc';
import { ECurrencyType } from './Currency/ECurrencyType';
import { Wallet } from './Data/Wallet';
const { ccclass, property } = _decorator;

@ccclass('CurrencyCounter')
export class CurrencyCounter extends Component {
    @property({ type: Sprite }) private currencyIcon: Sprite = null;
    @property({ type: Label }) private currencyValueLabel: Label = null;
    @property({ type: Button }) private plusButton: Button = null;
    @property({ type: Button }) private minusButton: Button = null;

    private curencyType: ECurrencyType = null;
    private wallet: Wallet = null;

    protected onEnable(): void {
        var plusHandler = new EventHandler();
        plusHandler.component = "CurrencyCounter";
        plusHandler.handler = "CurrencyPlusFromButton";
        plusHandler.target = this.node;
        this.plusButton.clickEvents.push(plusHandler)

        var minusHandler = new EventHandler();
        minusHandler.component = "CurrencyCounter";
        minusHandler.handler = "CurrencyMinusFromButton";
        minusHandler.target = this.node;
        this.minusButton.clickEvents.push(minusHandler)

    }

    protected onDestroy(): void {
        this.plusButton.clickEvents = [];
        this.minusButton.clickEvents = [];
        if (this.wallet)
            this.wallet.OnCurrencyValueChange.UnSubscribe(this.TextUpdate, this);
    }

    public Init(type: ECurrencyType, spriteFrame: SpriteFrame, wallet: Wallet) {
        this.currencyIcon.spriteFrame = spriteFrame;
        this.curencyType = type;
        this.wallet = wallet;
        this.TextUpdate();
        this.wallet.OnCurrencyValueChange.Subscribe(this.TextUpdate, this);
    }

    private CurrencyPlusFromButton(event, amount: number = 100) {
        this.CurrencyPlus(amount);
    }

    private CurrencyMinusFromButton(event, amount: number = 100) {
        this.CurrencyMinus(amount);
    }

    public CurrencyPlus(amount: number = 100) {
        this.wallet.AddCurrencyAmmount(this.curencyType, amount);
    }

    public CurrencyMinus(amount: number = 100) {
        this.wallet.AddCurrencyAmmount(this.curencyType, -amount);
    }

    private TextUpdate() {
        this.currencyValueLabel.string = this.wallet.GetCurrencyAmmount(this.curencyType).toString();
    }
}


