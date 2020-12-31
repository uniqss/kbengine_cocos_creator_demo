//    Copyright (C) 2016-2018 __COMPANY_NAME
//    All rights reserved
//
//    created by zone at 2018-10-19 18:31


import {KBEngineApp} from "./kbengine/KBEngine";
import {g_ServerNode} from "./ServerNode";

const {ccclass, property, disallowMultiple, menu} = cc._decorator

export var g_HelloLayer:HelloLayer
@ccclass
@disallowMultiple
export class HelloLayer extends cc.Component {
    @property(cc.EditBox)
    nameBox:cc.EditBox=null
    @property(cc.EditBox)
    passBox:cc.EditBox=null
    onLoad() {
        g_HelloLayer=this
    }
    start(){
        g_ServerNode.initServerApp()
        let s=cc.sys.localStorage.getItem("name")
        if(s){
            this.nameBox.string=s
        }
        s=cc.sys.localStorage.getItem("pass")
        if(s){
            this.passBox.string=s
        }
    }

    onEdit(){
        cc.sys.localStorage.setItem("name",this.nameBox.string)
        cc.sys.localStorage.setItem("pass",this.passBox.string)
    }

    onLoginSuccess(){
    }

    onButtonRegister(){
        cc.log("register ",this.nameBox.string,this.passBox.string)
        KBEngineApp.app.CreateAccount(this.nameBox.string,this.passBox.string,"kbengine_unity3d_demo")
    }

    onButtonLogin(){
        cc.log("login ",this.nameBox.string,this.passBox.string)
        KBEngineApp.app.Login(this.nameBox.string,this.passBox.string,"kbengine_unity3d_demo")
    }


    onDestroy() {

    }
}