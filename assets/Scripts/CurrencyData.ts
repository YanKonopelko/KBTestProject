import { _decorator, Enum, SpriteFrame } from 'cc';
import { ECurrencyType } from './ECurrencyType';

const { ccclass, property } = _decorator;

@ccclass('CurrencyData')
export class CurrencyData {
    @property({type:Enum(ECurrencyType)}) private type:ECurrencyType = ECurrencyType.Diamond;
    @property({type:SpriteFrame}) private icon:SpriteFrame = null;

    public get Type():ECurrencyType{
        return this.type;
    }

    public get Icon():SpriteFrame{
        return this.icon;
    }
}