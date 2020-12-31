//    Copyright (C) 2016-2018 __COMPANY_NAME

//    All rights reserved
//
//    created by zone at 2018-10-19 18:40


import Entity from "../kbengine/Entity";
import {g_CreateManager} from "../CreateManager";
import {Vector3} from "../kbengine/KBEMath";

export let RATIO=16

export class GameObject extends Entity{
    ccNode:cc.Node
    HP=0
    HP_Max=0
    name=""
    __init__ ()
    {
        super.__init__()
    }

    /*
        以下函数是实体的属性被设置时插件底层调用
        set_属性名称(), 想监听哪个属性就实现改函数，事件触发后由于world.js中监听了该事件，world.js会取出数据做行为表现。
        
        实际下列函数可以再抽象出一些层次 
        例如Combat.js对应服务端demo中的kbengine_demos_assets\scripts\cell\interfaces\Combat.py|CombatPropertys.py, 
        像HP、MP、recvDamage都属于战斗相关
        
        set_state可以放到State.js对应服务端的State.py
        这里请原谅我偷个懒， 全部放在逻辑实体基础对象了
    */

    OnEnterWorld(){
        let en=g_CreateManager.createEntity(this.className)
        cc.find("WorldLayer").addChild(en)
        this.ccNode=en
    }

    OnLeaveWorld(){
        if(this.ccNode) {
            this.ccNode.destroy()
            this.ccNode=null
        }
    }

    vec3PosToVec2(vec3){
        return cc.v2(vec3.x*RATIO,vec3.z*RATIO)
    }

    vec2PosToVec3(vec2){
        return new Vector3(vec2.x/RATIO,0,vec2.y/RATIO)
    }

    set_position(){
        if(this.ccNode)
            this.ccNode.position=this.vec3PosToVec2(this.position)
    }

    set_direction(){
        if(this.ccNode)
            this.ccNode.getChildByName("Body").rotation=this.direction.z*180/Math.PI
    }

    OnUpdateVolatileData(){
    }

    set_HP (old)
    {
        this._resetHP()
    }

    set_HP_Max (old)
    {
        this._resetHP()
    }

    _resetHP(){
        let per=0
        if(this.HP_Max) {
            per=this.HP/this.HP_Max
        }
        this.ccNode.getChildByName("HPBar").getComponent(cc.ProgressBar).progress=per
    }

    set_MP (old)
    {
    }

    set_MP_Max (old)
    {
    }

    set_level (old)
    {
    }

    set_name (old)
    {
        this.ccNode.getChildByName("Name").getComponent(cc.Label).string=this.name
    }

    set_state (old)
    {
    }

    set_subState (old)
    {
    }

    set_utype (old)
    {
    }

    set_uid (old)
    {
    }

    set_spaceUType (old)
    {
    }

    set_moveSpeed (old)
    {
    }

    set_modelScale (old)
    {
    }

    set_modelID (old)
    {
    }

    set_forbids (old)
    {
    }

    recvDamage (attackerID, skillID, damageType, damage)
    {
        cc.log("recvDamage")
        let n = new cc.Node
        let s = n.addComponent(cc.Label)
        s.string = "recvDamage " + damage
        n.position=this.ccNode.position.add(cc.v2(0,50))
        cc.find("WorldLayer").addChild(n)
        n.runAction(cc.sequence(cc.moveBy(0.5,0,50),
            cc.callFunc(()=>{
                n.destroy()
            })
        ))

    }
}