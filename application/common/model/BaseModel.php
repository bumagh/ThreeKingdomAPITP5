<?php

namespace app\common\model;

use think\Model;

class BaseModel extends Model
{
    protected $pk;
    protected $table;
    protected function initialize()
    {
        parent::initialize();
        $this->pk = $this->getPk();
        $this->table = $this->getTable();
    }
    public function _update($data)
    {
        if (isset($data['id']) && !empty($data['id'])) {
            $res = $this->save($data, ['id' => $data['id']]);
        } else {
            $res = $this->save($data);
        }
        if ($res) {
            return ['code' => 0, 'msg' => '操作成功'];
        } else
            return ['code' => 1, 'msg' => '操作失败'];
    }
    public function _del($data)
    {
        $res = $this->where('id', $data)->delete();
        if ($res)
            return ['code' => 0, 'msg' => '操作成功'];
        else
            return ['code' => 1, 'msg' => '操作失败'];
    }
    public function _lists($limit, $page, $field)
    {
        $list = $this->limit($limit)->page($page)->field($field)->select();
        if ($list) {
            $count = $this->count('id');
            return ['code' => 0, 'msg' => '获取成功', 'data' => $list, 'count' => $count];
        } else
            return ['code' => 0, 'msg' => '没数据'];
    }
}
