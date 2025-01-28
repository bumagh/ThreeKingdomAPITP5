<?php

namespace app\api\controller\v1;

use app\api\controller\Base;
use app\common\model\TaskModel;
use think\Request;
use think\db;

class Task extends Base
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
        $db = new TaskModel();
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
        $list =  Db::table('task')
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
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $data = $request->param();
        $db = new TaskModel();
        if (isset($data['id']) && !empty($data['id'])) {
            $res = $db->save($data, ['id' => $data['id']]);
            if ($res) {
                return json(['code' => 0, 'msg' => '任务修改操作成功']);
            } else
                return json(['code' => 1, 'msg' => '任务修改操作失败1']);
        } else {
            $character_id = $data['character_id'];
            $status = $data['status'];
            $configid = $data['configid'];
            $newid =  Db::name('task')->insertGetId([
                'character_id' => $character_id,
                'configid' => $configid,
                'status' => $status,
            ]);
            if (!$newid)
                return json(['code' => 2, 'msg' => '任务创建操作失败2']);
            return  json(['code' => 0, 'msg' => '任务创建操作成功', 'data' => $newid]);
        }
    }

    public function incSave(Request $request)
    {
        $data = $request->param();
        $db = new TaskModel();
        return json($db->_incSave($data));
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
