<?php

namespace app\api\controller\v1;

use app\api\controller\Base;
use app\common\model\AdminModel;
use app\common\model\CharacterModel;
use think\Request;
use think\db;

class Character extends Base
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
        $db = new CharacterModel();
        $field = '*';
        return json($db->_lists($limit, $page, $field));
    }
    public function getrank(Request $request)
    {
        $limit = $request->param('limit') ? $request->param('limit') : 10;
        $page = $request->param('page') ? $request->param('page') : 1;
        $zoneid = $request->param('zoneid');
        $order = $request->Param('order') ? $request->Param('order') . ' DESC' : 'id ASC';
        $db = new CharacterModel();
        $field = '*';
        return json($db->_listCondiOrder($limit, $page, $field, [['zone_id', '=', $zoneid]], $order));
    }
    public function usePoint(Request $request)
    {
        $data = $request->param();
        $db = new CharacterModel();
        $db->_incSave($data);
        $decVal = 0;
        // 遍历传入的增量数据，过滤出需要增量更新的字段
        foreach ($data as $key => $value) {
            // 假设增量字段名是以 'inc_' 开头，且值为增量值
            if (strpos($key, 'inc_') === 0 && is_numeric($value)) {
                $decVal += $value;
            }
        }
        $res = $db->_incSave([
            'id' => $data['id'],
            'inc_points' => -$decVal,
        ]);
        if ($res) {
            return json(['code' => 0, 'msg' => '操作成功']);
        } else
            return json(['code' => 1, 'msg' => '操作失败']);
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
        $db = new CharacterModel();
        return json($db->_update($data));
    }
    public function add(Request $request)
    {
        $data = $request->param();
        //先创建背包
        $bagId =  Db::name('bag')->insertGetId([
            'status' => 1,
        ]);
        if (!$bagId)
            return json(['code' => 1, 'msg' => '角色创建失败,错误001']);
        $newData = [
            'admin_id' => $this->aid,
            'zone_id' => $data['zone_id'],
            'name' => $data['name'],
            'bag_id' => $bagId,
            'country' => $data['country'],
            'job' => $data['job'],
            'gender' => $data['gender'],
            'head' => $data['head'],
        ];
        $characterId = Db::name('character')->insertGetId($newData);
        if (!$characterId)
            return json(['code' => 2, 'msg' => '角色创建失败,错误002']);

        $dbCharacter = new CharacterModel();
        $characterData = $dbCharacter->where([['id', '=', $characterId]])->field('admin_id,zone_id,hp,mp', true)->select();
        if (empty($characterData))
            return json(['code' => 3, 'msg' => '角色创建失败,错误003']);
        return json(['code' => 0, 'msg' => '角色创建成功', 'data' => $characterData[0]]);
    }
    public function incSave(Request $request)
    {
        $data = $request->param();
        $db = new CharacterModel();
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
