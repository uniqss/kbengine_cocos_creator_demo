//    Copyright (C) 2016-2018 __COMPANY_NAME
//    All rights reserved
//
//    created by zone at 2018-10-19 18:27

const {ccclass, property, disallowMultiple, menu} = cc._decorator


export var g_CreateManager:CreateManager
@ccclass
@disallowMultiple
export class CreateManager extends cc.Component {
    @property(cc.Prefab)
    Avatar:cc.Prefab=null
    @property(cc.Prefab)
    GameObject:cc.Prefab=null
    @property(cc.Prefab)
    Gate:cc.Prefab=null
    @property(cc.Prefab)
    Monster:cc.Prefab=null
    @property(cc.Prefab)
    NPC:cc.Prefab=null
    onLoad() {
        g_CreateManager=this
    }

    createEntity(name){
        return cc.instantiate(this[name])
    }

    onDestroy() {
        g_CreateManager=null
    }
}