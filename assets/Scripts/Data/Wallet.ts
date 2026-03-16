import { math } from "cc";
import { ECurrencyType } from "../Currency/ECurrencyType";
import { CustomActionWithTwoParam } from "../Utills/CustomActions";


export class Wallet {
    public static readonly SAVE_KEY = 'Wallet_Save';

    private currencies: Map<ECurrencyType, number> = new Map<ECurrencyType, number>();
    private onCurrencyValueChange: CustomActionWithTwoParam<ECurrencyType, number> = new CustomActionWithTwoParam<ECurrencyType, number>();

    public get OnCurrencyValueChange(): CustomActionWithTwoParam<ECurrencyType, number> {
        return this.onCurrencyValueChange;
    }

    public Load() {
        this.FromJson(JSON.parse(localStorage.getItem(Wallet.SAVE_KEY)));
    }

    public Save() {
        localStorage.setItem(Wallet.SAVE_KEY, JSON.stringify(this.AsJson()));
    }

    public AddCurrencyAmmount(type: ECurrencyType, amount: number): number {
        if (!this.currencies.has(type)) {
            this.currencies.set(type, 0);
        }
        var newValue = math.clamp(this.currencies.get(type) + amount, 0, Number.MAX_SAFE_INTEGER);
        this.currencies.set(type, newValue);
        this.onCurrencyValueChange.Invoke(type, newValue);
        this.Save();
        return newValue;
    }

    public GetCurrencyAmmount(type: ECurrencyType): number {
        if (this.currencies.has(type)) {
            return this.currencies.get(type);
        }
        return 0;
    }

    private FromJson(jsonObject: Object) {

        if (!jsonObject) return;

        var curs: [] | null = jsonObject["currencies"] ? jsonObject["currencies"] : null;
        if (curs && curs.length > 0) {
            this.currencies = new Map<ECurrencyType, number>();
            curs.forEach(item => {
                this.currencies.set(item["Key"], item["Value"]);
            });
        }
    }

    private AsJson(): Object {
        var jsonObject: Object = new Object();
        var curs = [];
        this.currencies.forEach((value, key) => {
            var item = new Object();
            item["Key"] = key;
            item["Value"] = value;
            curs.push(item);
        });
        jsonObject["currencies"] = curs;
        return jsonObject;
    }
}