<?php

namespace app\api\controller\v1;

use app\api\controller\Cross;
use app\common\model\AdminModel;
use app\common\model\InviteModel;
use Firebase\JWT\JWT;
use think\Controller;
use think\Request;

class RegAdmin extends Cross
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index(Request $request)
    {

        $data = $request->param();
        if (isset($data['invitecode']) && empty($data['invitecode'])) {
            return json(['code' => 1, 'msg' => '注册失败,邀请码不能为空']);
        }
        //判断是否有这个邀请码
        $dbInvite = new InviteModel();
        $res = $dbInvite->getListBycode($data['invitecode']);
        if (!$res) {
            return json(['code' => 2, 'msg' => '注册失败,邀请码不存在']);
        }
        $db = new AdminModel();
        $info = $db->where('username', $data['username'])->find();
        if ($info) {
            return json(['code' => 3, 'msg' => '注册失败,账号已存在']);
        }
        $data['password'] = md5($data['password']);
        $res = $db->save($data);
        if ($res) {
            return json(['code' => 0, 'msg' => '注册成功']);
        } else
            return json(['code' => 4, 'msg' => '注册失败,未知错误001']);
        // if ($info['password'] != md5($data['password'])) {
        //     return json(['code' => 0, 'msg' => '账号或密码错误']);
        // }
        // $key = 'api';
        // $payload = [
        //     'iss' => 'http://rbac',
        //     'aud' => 'http://rbac',
        //     'iat' => time(),
        //     'exp' => time()+60*60*24*12,
        //     'aid' => $info['id'],
        // ];

        // $token = JWT::encode($payload, $key, 'HS256');
        // return json(['code' => 1, 'msg' => '登录成功', 'token' => $token]);
    }
}
