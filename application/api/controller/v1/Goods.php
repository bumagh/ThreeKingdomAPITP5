<?php

namespace app\api\controller\v1;

use app\api\controller\Base;
use app\common\model\GoodsModel;
use think\Request;

class Goods extends Base
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
        $db = new GoodsModel();
        $field = '*';
        return json($db->_lists($limit, $page, $field));
    }
    public function getByBagId(Request $request)
    {
        $db = new GoodsModel();
        $data = $db->getListByBagIdAndStatus($request->param('bag_id'), 1);
        return json(['code' => 0, 'msg' => '获取物品信息成功', 'data' => ['bagItemDatas' => $data]]);
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
        $db = new GoodsModel();
        return json($db->_update($data));
    }

    public function incSave(Request $request)
    {
        $data = $request->param();
        $db = new GoodsModel();
        return json($db->_incSave($data));
    }
    public function incGoods(Request $request)
    {
        // 获取请求数据
        $data = $request->param();
        $bag_id = $data['bag_id'];
        $configid = $data['configid'];
        $count = $data['count'];

        // 创建模型实例
        $db = new GoodsModel();

        // 查找是否存在相应的记录
        $goodsInfo = $db->where([
            ['bag_id', '=', $bag_id],
            ['configid', '=', $configid]
        ])->find();

        if ($goodsInfo) {
            // 如果记录存在，执行 count 自增
            $res = $db->where([
                ['bag_id', '=', $bag_id],
                ['configid', '=', $configid]
            ])->inc('count', $count)->update();

            if ($res) {
                return json(['code' => 0, 'msg' => '操作成功']);
            } else {
                return json(['code' => 1, 'msg' => '操作失败']);
            }
        } else {
            // 如果记录不存在，直接保存新数据
            return json($db->_update($data));
        }
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
