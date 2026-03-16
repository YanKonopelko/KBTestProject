import { _decorator, Component, Prefab, Node, instantiate } from 'cc';
import { CounterPlaceInfo } from './CounterPlaceInfo';
import { CurrencyCounter } from './CurrencyCounter';
import { CurrenciesDataManager } from './Currency/CurrenciesDataManager';
import { Wallet } from './Data/Wallet';
const { ccclass, property } = _decorator;

@ccclass('SceneController')
export class SceneController extends Component {
    @property({ type: Prefab }) private counterPrefab: Prefab = null;
    @property({ type: [CounterPlaceInfo] }) private counterPlaces: CounterPlaceInfo[] = [];
    private wallet: Wallet;
    protected start(): void {
        this.wallet = new Wallet();
        this.wallet.Load();
        this.InitCounters();
    }

    private InitCounters() {
        this.counterPlaces.forEach(element => {
            var counterNode = instantiate(this.counterPrefab);
            counterNode.setParent(element.NodeParent);
            counterNode.setPosition(0, 0, 0);
            var counterComponent = counterNode.getComponent(CurrencyCounter);
            var currencyInfo = CurrenciesDataManager.Instance.GetInfo(element.Type)
            counterComponent.Init(currencyInfo.Type, currencyInfo.Icon, this.wallet);
        });
    }
}

