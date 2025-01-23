<?php

namespace app\api\controller\v1;

use app\api\controller\Base;
use app\common\model\MessageModel;
use think\Request;
use think\db;

class Message extends Base
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index(Request $request)
    {
        $limit = $request->param('limit') ? $request->param('limit') : 10;
        $page = $request->param('page') ? $request->param('page') : 1;
        $db = new MessageModel();
        $field = 'status,id';
        $list = $db->limit($limit)->page($page)->order('create_time DESC')->field($field, true)->select();
        if ($list) {
            return json(['code' => 0, 'msg' => '获取成功', 'data' => $list]);
        } else
            return json(['code' => 0, 'msg' => '没数据']);
    }
    public function getlist(Request $request)
    {
        $limit = $request->param('limit') ? $request->param('limit') : 10;
        $page = $request->param('page') ? $request->param('page') : 1;
        $list =  Db::table('message')
            ->alias('msg')
            ->join('character cha', 'msg.character_id = cha.id')
            ->field('msg.character_id,msg.zone_id,msg.content,msg.type,msg.create_time,cha.head,cha.gender,cha.name')
            ->order('create_time DESC')
            ->limit($limit)
            ->select();
        // $list = $db->limit($limit)->page($page)->order('create_time DESC')->field($field, true)->select();
        if ($list) {
            return json(['code' => 0, 'msg' => '获取成功', 'data' => $list]);
        } else
            return json(['code' => 0, 'msg' => '没数据']);
    }
    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        //
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $data = $request->param();
        $db = new MessageModel();
        return json($db->_update($data));
    }

    public function incSave(Request $request)
    {
        $data = $request->param();
        $db = new MessageModel();
        return json($db->_incSave($data));
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        //
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete(Request $request)
    {
        // $id = $request->param('id');
        // $db = new AdminModel();
        // if ($id == 1)
        //     return json(['code' => 0, 'msg' => '无权限删除']);
        // $res = $db->where('id', $id)->delete();
        // if ($res)
        //     return json(['code' => 0, 'msg' => '操作成功']);
        // else
        //     return json(['code' => 1, 'msg' => '操作失败']);
    }
}
