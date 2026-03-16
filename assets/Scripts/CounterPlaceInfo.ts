import { _decorator, Enum, Node } from 'cc';
import { ECurrencyType } from './Currency/ECurrencyType';

const { ccclass, property } = _decorator;

@ccclass('CounterPlaceInfo')
export class CounterPlaceInfo {
    @property({type:Node}) private nodeParent:Node = null;
    @property({type:Enum(ECurrencyType)}) private type:ECurrencyType = ECurrencyType.Diamond;

    public get NodeParent():Node{
        return this.nodeParent;
    }
    public get Type():ECurrencyType{
        return this.type;
    }
}