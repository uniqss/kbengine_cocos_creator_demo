//    Copyright (C) 2016-2018 __COMPANY_NAME
//    All rights reserved
//
//    created by zone at 2018-10-19 19:00

import {GameObject} from "./GameObject";
import KBEDebug from "../kbengine/KBEDebug";
import {RegisterScript} from "../kbengine/ExportEntity";
import {Account} from "./Account";
import {g_HelloLayer} from "../HelloLayer";
import {Vector3} from "../kbengine/KBEMath";
import {g_WorldUILayer} from "../WorldUILayer";

export var g_Avatar
export class Avatar extends GameObject{
    __init__(){
        super.__init__()
        if(this.IsPlayer()) {
            g_Avatar = this
            window["g_Avatar"]=this
            g_HelloLayer.node.active=false
            g_WorldUILayer.node.active=true
        }
    }
    relive (type)
    {
        this.CellCall("relive", type);
    }

    useTargetSkill (skillID, targetID)
    {
        this.CellCall("useTargetSkill", skillID, targetID);
    }

    jump ()
    {
        this.CellCall("jump");
    }

    clientSetPosition(pos){
        if(!this.ccNode)
            return
        this.ccNode.position=pos
        this.position=this.vec2PosToVec3(pos)
        if(this.IsPlayer()){
            cc.find("WorldCamera").position=this.ccNode.position
        }
    }

    clientSetDirection(rad:number){
        if(!this.ccNode)
            return
        this.direction.z=rad
        this.set_direction()
    }

    set_position(){
        super.set_position()

    }

    onJump ()
    {
    }

    onAddSkill (skillID)
    {
        KBEDebug.INFO_MSG(this.className + "::onAddSkill(" + skillID + ")");
    }

    onRemoveSkill (skillID)
    {
        KBEDebug.INFO_MSG(this.className + "::onRemoveSkill(" + skillID + ")");
    }

    OnDestroy(){
        super.OnDestroy()
        g_Avatar=null
    }
}

RegisterScript("Avatar", Avatar);