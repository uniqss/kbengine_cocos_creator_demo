//    Copyright (C) 2016-2018 __COMPANY_NAME
//    All rights reserved
//
//    created by zone at 2018-10-19 19:26

import {KBEngineApp} from "./kbengine/KBEngine";
import {g_Avatar} from "./entities/Avatar";

const {ccclass, property, disallowMultiple, menu} = cc._decorator


interface Control{
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean
}
export var g_WorldUILayer:WorldUILayer
@ccclass
@disallowMultiple
export class WorldUILayer extends cc.Component {
    controls:Control
    moveVector=cc.v2()
    onLoad() {
        this.controls={
            left:false,
            right:false,
            up:false,
            down:false
        }
        this.node.active=false
        g_WorldUILayer=this
        let target=this
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, target.keyDown, target);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, target.keyUp, target);
        let com=this
        com.node.on(cc.Node.EventType.MOUSE_DOWN, com.onMouseDown, com);
        com.node.on(cc.Node.EventType.MOUSE_UP, com.onMouseUp, com);
        com.node.on(cc.Node.EventType.MOUSE_MOVE, com.onMouseMove, com);
        com.node.on(cc.Node.EventType.MOUSE_WHEEL, com.onMouseWheel, com);
    }

    onButtonRelive(){
        if(g_Avatar)
            g_Avatar.CellCall("relive",100)
    }


    keyDown(event) {
        if (event.keyCode === cc.macro.KEY.a) {
            this.controls.left = true;
            this.onUpdateKey()
        } else if (event.keyCode === cc.macro.KEY.d) {
            this.controls.right = true;
            this.onUpdateKey()

        } else if (event.keyCode === cc.macro.KEY.w) {
            this.controls.up = true;
            this.onUpdateKey()

        } else if (event.keyCode === cc.macro.KEY.s) {
            this.controls.down = true;
            this.onUpdateKey()

        }
    }
    keyUp(event) {
        if (event.keyCode === cc.macro.KEY.a) {
            this.controls.left = false;
            this.onUpdateKey()

        } else if (event.keyCode === cc.macro.KEY.d) {
            this.controls.right = false;
            this.onUpdateKey()

        } else if (event.keyCode === cc.macro.KEY.w) {
            this.controls.up = false;
            this.onUpdateKey()

        } else if (event.keyCode === cc.macro.KEY.s) {
            this.controls.down = false;
            this.onUpdateKey()

        }
    }

    onMouseDown(event:cc.Event.EventMouse){}
    onMouseUp(event:cc.Event.EventMouse){}

    pToRadians(vec2:cc.Vec2) {
        return Math.atan2(vec2.x, vec2.y);
    }
    onMouseMove(event:cc.Event.EventMouse){
        let rod=this.pToRadians(event.getLocation().sub(cc.v2(cc.winSize.width/2,cc.winSize.height/2)))
        if(g_Avatar&&g_Avatar.ccNode)
            g_Avatar.clientSetDirection(rod)
    }
    onMouseWheel(event:cc.Event.EventMouse){}

    onUpdateKey(){
        var moveVector, player;
        moveVector = cc.v2();
        if (this.controls.left) {
            moveVector.addSelf(cc.v2(-1, 0));
        }
        if (this.controls.right) {
            moveVector.addSelf(cc.v2(1, 0));
        }
        if (this.controls.up) {
            moveVector.addSelf(cc.v2(0, 1));
        }
        if (this.controls.down) {
            moveVector.addSelf(cc.v2(0, -1));
        }
        moveVector.normalizeSelf()
        this.moveVector=moveVector
    }

    update(dt){
        if(g_Avatar&&g_Avatar.ccNode){
            let speed=300
            g_Avatar.clientSetPosition(g_Avatar.ccNode.position.add(this.moveVector.mul(speed*dt)))
        }
    }

    onDestroy() {
        let target=this
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, target.keyDown, target);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, target.keyUp, target);
    }
}