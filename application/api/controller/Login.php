<?php

namespace app\api\controller;

use app\common\model\AdminModel;
use Firebase\JWT\JWT;
use think\Controller;
use think\Request;
use app\common\model\ZoneModel;

class Login extends Cross
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index(Request $request)
    {

        $data = $request->param();
        $db = new AdminModel();

        $info = $db->where('username', $data['username'])->find();
        if (!$info) {
            return json(['code' => 1, 'msg' => '不存在']);
        }
        if ($info['password'] != md5($data['password'])) {
            return json(['code' => 2, 'msg' => '账号或密码错误']);
        }
        $key = 'api';
        $payload = [
            'iss' => 'http://rbac',
            'aud' => 'http://rbac',
            'iat' => time(),
            'exp' => time() + 60 * 60 * 24 * 365,
            'aid' => $info['id'],
        ];
        $zoneDb = new ZoneModel();
        $zoneList = $zoneDb->_lists(10, 1, 'id,name,index,status,tag,player_counts');
        if (!isset($zoneList['data'])) {
            return json(['code' => 3, 'msg' => '数据错误']);
        }
        $token = JWT::encode($payload, $key, 'HS256');
        return json(['code' => 0, 'msg' => '登录成功', 'data' => [
            'token' => $token,
            'zoneList' => $zoneList['data']
        ]]);
    }

  
}
