<?php

namespace app\common\model;

use think\Model;

class GoodsModel extends BaseModel
{
    //
    protected $table = 'goods';
    public function getListByBagIdAndStatus($id, $status)
    {
        return $this->where([
            ['bag_id', '=', $id],
            ['status', '=', 1]
        ])->field('id,configid,count')->select();
    }
}
