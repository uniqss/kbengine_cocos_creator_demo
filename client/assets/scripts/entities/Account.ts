import Entity from "../kbengine/Entity";
import {RegisterScript} from "../kbengine/ExportEntity";
import {g_HelloLayer} from "../HelloLayer";
import {KBEngineApp} from "../kbengine/KBEngine";
import KBEEvent from "../kbengine/Event";

interface Avatars{
    values:AVATAR_INFOS[]
}
interface AVATAR_INFOS {
    dbid
    name
    roleType
    level
    data
}

export var g_Account
export class Account extends Entity {
    avatars:Avatars
    __init__() {
        super.__init__()
        g_Account=this
        window["g_Account"]=this

        g_HelloLayer.node.active=true
        g_HelloLayer.onLoginSuccess()
        this.BaseCall("reqAvatarList")
    }

    onReqAvatarList(infos) {
        this.avatars = infos;
        console.info("KBEAccount::onReqAvatarList: avatarsize=" + this.avatars.values.length);
        for (var i = 0; i < this.avatars.values.length; i++) {
            console.info("KBEAccount::onReqAvatarList: name" + i + "=" + this.avatars.values[i].name);
        }

        if(!this.avatars.values.length) {
            this.reqCreateAvatar(1, "这是我")
        }else{
            this.selectAvatarGame(this.avatars.values[0].dbid)
        }

    }

    onCreateAvatarResult(retcode, info) {
        if (retcode == 0) {
            this.avatars.values[info.dbid] = info;
            console.info("KBEAccount::onCreateAvatarResult: name=" + info.name);
            this.selectAvatarGame(info.dbid)
        }

        console.info("KBEAccount::onCreateAvatarResult: avatarsize=" + this.avatars.values.length + ", error=" + KBEngineApp.app.GetServerError(retcode));
    }


    onRemoveAvatar(dbid) {
        if (this.avatars["values"].length <= 0)
            return;

        var done = false;
        var values = [];
        for (var i = 0; i < this.avatars.values.length; i++) {
            if (this.avatars.values[i].dbid != dbid)
                values.push(this.avatars.values[i]);
            else
                done = true;
        }

        if (done) {
            this.avatars.values = values;
            console.info("Account::onRemoveAvatar: dbid=" + dbid);
        }
    }

    reqCreateAvatar(roleType, name) {
        this.BaseCall("reqCreateAvatar", roleType, name);
    }

    selectAvatarGame(dbid) {
        this.BaseCall("selectAvatarGame", dbid);
    }
    OnDestroy(){
        super.OnDestroy()
        g_Account=null
    }

}

RegisterScript("Account", Account);