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
        ])->field('id,configid,count,status')->select();
    }
}
