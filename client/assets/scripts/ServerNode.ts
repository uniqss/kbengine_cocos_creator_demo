//    Copyright (C) 2016-2017 __COMPANY_NAME
//    All rights reserved
//
//    created by zone at 2017/9/26 22:54

import {KBEngineApp,KBEngineArgs} from "./kbengine/KBEngine";
import KBEEvent from "./kbengine/Event";

const {ccclass, property, disallowMultiple,executionOrder} = cc._decorator

export var g_ServerNode:ServerNode=null
@ccclass
@disallowMultiple
export class ServerNode extends cc.Component {
    @property
    ip="127.0.0.1"
    onLoad(){
        g_ServerNode=this
        this.installEvents()
        this.initServerApp()
    }

    installEvents(){
        //example
        KBEEvent.Register("onCreateAccountResult",this,this.onCreateAccountResult.bind(this))
        KBEEvent.Register("onDisconnected",this,this.onDisconnected.bind(this))
    }

    initServerApp():void {
        cc.log("init Server App")
        let args = new KBEngineArgs();
        args.address=this.ip
        args.port = 20013;
        KBEngineApp.Destroy();
        KBEngineApp.Create(args)
    }

    onCreateAccountResult(err, datas) {
        cc.log("onCreateAccountResult",err,datas)
    }

    onDisconnected(){
        KBEngineApp.Destroy()
        cc.log("连接断开")
        cc.director.loadScene("HelloScene")
    }

    onDestroy(){
        g_ServerNode=null
        KBEEvent.DeregisterObject(this)
    }
}