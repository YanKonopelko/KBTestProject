import { _decorator, Component, director } from 'cc';
import { CurrencyData } from './CurrencyData';
import { ECurrencyType } from './ECurrencyType';

const { ccclass, property } = _decorator;
@ccclass('CurrenciesDataManager')
export class CurrenciesDataManager extends Component {

    private static instance: CurrenciesDataManager = null;

    public static get Instance(): CurrenciesDataManager {
        return this.instance;
    }

    protected start(): void {
        if (CurrenciesDataManager.instance) {
            this.node.destroy();
            return;
        }
        CurrenciesDataManager.instance = this;
        director.addPersistRootNode(this.node);
    }


    @property({ type: [CurrencyData] }) private data: CurrencyData[] = [];

    public GetInfo(type: ECurrencyType): CurrencyData {

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Type == type) {
                return this.data[i];
            }
        }

        console.warn(`Can not find data for type: ${type}`);
        return null;
    }

}

